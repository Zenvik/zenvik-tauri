use regex::Regex;
use serialport::SerialPort;
use std::{
    io::Read,
    sync::{
        atomic::{AtomicBool, Ordering},
        Arc, Mutex,
    },
    thread,
    time::Duration,
};
use tauri::{AppHandle, Emitter, Manager, State};

#[derive(Default)]
struct SerialState(Mutex<Option<Arc<AtomicBool>>>);

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn parse_weight(raw: &str) -> f64 {
    let re = Regex::new(r"-?\d+(?:\.\d+)?").unwrap();
    let normalized = raw.replace(',', ".");
    re.find_iter(&normalized)
        .filter_map(|m| m.as_str().parse::<f64>().ok())
        .last()
        .unwrap_or(0.0)
}

fn spawn_serial_reader(
    app_handle: AppHandle,
    mut port: Box<dyn SerialPort>,
    stop_flag: Arc<AtomicBool>,
) {
    thread::spawn(move || {
        let mut buffer = String::new();
        let mut byte = [0u8; 1];

        while !stop_flag.load(Ordering::SeqCst) {
            match port.read(&mut byte) {
                Ok(0) => continue,
                Ok(_) => {
                    if let Ok(ch) = std::str::from_utf8(&byte) {
                        buffer.push_str(ch);
                        if ch == "=" {
                            let val = parse_weight(&buffer);
                            let payload = serde_json::json!({ "peso": val });
                            let _ = app_handle.emit("peso-actualizado", payload);
                            buffer.clear();
                        }
                    }
                }
                Err(err) if err.kind() == std::io::ErrorKind::TimedOut => {}
                Err(err) => {
                    eprintln!("Serial read error: {}", err);
                    thread::sleep(Duration::from_millis(50));
                }
            }
        }
    });
}

#[tauri::command]
fn list_serial_ports() -> Vec<String> {
    serialport::available_ports()
        .unwrap_or_default()
        .into_iter()
        .map(|p| p.port_name)
        .collect()
}

#[tauri::command]
fn start_serial(
    port_name: String,
    baud_rate: Option<u32>,
    app_handle: AppHandle,
    state: State<SerialState>,
) -> Result<(), String> {
    let mut guard = state.0.lock().unwrap();

    // Stop any existing reader before starting a new one
    if let Some(flag) = guard.take() {
        flag.store(true, Ordering::SeqCst);
    }

    let baud_rate = baud_rate.unwrap_or(9600);
    let port = serialport::new(&port_name, baud_rate)
        .data_bits(serialport::DataBits::Eight)
        .parity(serialport::Parity::None)
        .stop_bits(serialport::StopBits::One)
        .timeout(Duration::from_millis(100))
        .open()
        .map_err(|e| e.to_string())?;

    let stop_flag = Arc::new(AtomicBool::new(false));
    *guard = Some(stop_flag.clone());
    spawn_serial_reader(app_handle, port, stop_flag);
    Ok(())
}

#[tauri::command]
fn stop_serial(state: State<SerialState>) {
    if let Some(flag) = state.0.lock().unwrap().take() {
        flag.store(true, Ordering::SeqCst);
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(SerialState::default())
        .invoke_handler(tauri::generate_handler![
            greet,
            list_serial_ports,
            start_serial,
            stop_serial
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
