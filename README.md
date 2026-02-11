⚙️ Real-Time Industrial Machine Health Monitoring using ESP32 & MATLAB

This project implements a multi-sensor based machine health monitoring system using ESP32, ESP-NOW, Firebase, and MATLAB for real-time data acquisition and fault analysis.

🚀 Features

📡 Real-time vibration, temperature, voltage, current, and RPM monitoring

⚡ High-frequency vibration sampling using ADXL345

🧠 Burst-mode raw vibration capture for FFT & envelope analysis

📊 MATLAB-based fault detection (FFT, RMS, Crest Factor, Kurtosis)

☁️ Cloud data storage using Firebase

🔄 Continuous real-time monitoring dashboard

🧱 System Architecture

Sensor Node (ESP32):

Collects vibration, temperature, voltage, current, RPM

Computes RMS values

Captures burst raw vibration data

Communication Node (ESP32):

Receives sensor packets via ESP-NOW

Uploads data to Firebase cloud

Cloud Layer:

Stores timestamped sensor data

MATLAB Analysis Layer:

Retrieves data from Firebase

Performs vibration analysis and fault detection

🧪 Sensors Used

ADXL345 – Vibration (X, Y, Z axis)

DS18B20 – Temperature

ZMPT101B – Voltage

ACS712 – Current

Hall Sensor – RPM

📊 Data Processing
RMS Monitoring

Used for continuous machine vibration trend monitoring.

FFT Analysis

Detects imbalance, misalignment, and mechanical faults.

Envelope Analysis

Used for bearing fault detection.

Statistical Features

Crest Factor

Kurtosis

Peak detection

📡 Communication

ESP-NOW used for low-latency wireless transmission

Dual-ESP32 architecture ensures:

Stable power

Reliable high-speed sampling

No Wi-Fi interference with sensor acquisition

☁️ Cloud Integration

Firebase stores real-time sensor data

Timestamp-based logging

MATLAB fetches and analyzes data automatically

🧠 MATLAB Analysis Output

Time-domain vibration plots

Frequency spectrum (FFT)

Envelope spectrum

Machine health index

Fault classification

📁 Project Structure
ESP32_Sensor_Node/
ESP32_Gateway_Node/
MATLAB_Analysis/
Firebase_Integration/
README.md

🎯 Applications

Industrial motor monitoring

Predictive maintenance

Fault diagnosis

Smart manufacturing

Condition-based monitoring systems
