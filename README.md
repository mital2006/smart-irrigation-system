# Smart Irrigation System (IoT Demonstration Prototype)

A modern, responsive green-and-white web application representing an **IoT Smart Irrigation System** that tracks soil moisture, monitors plant conditions, and manages a simulated water pump.

> ⚠️ **Important Notice**: This application is an **intentionally INCOMPLETE prototype** created for educational demonstration and software consultation. Real physical sensors (ESP32/Arduino) are **NOT connected**. All telemetry values are explicitly simulated in the browser.

---

## 🌿 Implemented Features

1. **Dashboard Telemetry**:
   - **Soil Moisture Display**: Real-time percentage indicator and gradient level meter.
   - **Water Pump Actuator**: Clear **PUMP ON** / **PUMP OFF** state indicators with manual simulation controls.
   - **Plant Health Condition**: Dynamic botanical status mapping (Healthy & Hydrated, Low Moisture, Wilting Danger, Over-saturated).
   - **Ambient Microclimate**: Simulated DHT22 temperature and humidity context.

2. **Interactive Sensor Simulator**:
   - Continuous moisture slider (0% to 100%) for stress-testing.
   - Quick scenario presets: *Critical Drought (15%)*, *Low Moisture Alert (28%)*, *Optimal (55%)*, and *Saturated (88%)*.

3. **Critical Low Moisture Warning**:
   - Dynamic banner triggered whenever soil moisture drops beneath the **30% hydration threshold**.
   - Includes quick-action button to trigger simulated pump activation.

4. **Project Consultation & Engineering Roadmap**:
   - **Status**: `Incomplete`
   - **Priority**: `Medium`
   - **Progress**: Dynamic baseline starting at **40%** (3 of 7 tasks completed).
   - **Interactive Task Checklist**:
     - *Completed*: Dashboard UI, Soil moisture display, Basic project information.
     - *Pending*: Connect a real soil moisture sensor, Implement automatic pump control, Add hardware integration with ESP32 or Arduino, Perform final testing.
   - **Dynamic Progress Bar**: Recalculates and animates in real-time as tasks are checked or unchecked.

5. **Modern Design**:
   - Clean green-and-white botanical palette.
   - Fully responsive for mobile, tablet, and desktop viewports.

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch (Simplest)
Navigate to:
```
C:\Users\mital\.gemini\antigravity\scratch\smart-irrigation-system
```
Double-click `index.html` to open it in Google Chrome, Microsoft Edge, or Firefox.

### Option 2: PowerShell
Run the command:
```powershell
Start-Process "C:\Users\mital\.gemini\antigravity\scratch\smart-irrigation-system\index.html"
```

### Option 3: VS Code Live Server
Open the folder in VS Code and click **Go Live** or right-click `index.html` &rarr; **Open with Live Server**.

---

## 📁 File Structure

```
smart-irrigation-system/
├── index.html       # Semantic HTML5 layout, dashboard cards, simulation slider, consultation checklist
├── style.css        # Responsive green-and-white theme, interactive gauges, modern typography
├── script.js        # Moisture logic, alert thresholds, pump toggles, and dynamic checklist progress engine
└── README.md        # Technical specifications and local execution guide
```
