/**
 * Smart Irrigation System
 * Telemetry Simulation & Project Consultation Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. DOM Elements Selection
  // =========================================================================

  // Moisture Display Elements
  const moistureSlider = document.getElementById('moistureSlider');
  const sliderValueDisplay = document.getElementById('sliderValueDisplay');
  const displayMoistureVal = document.getElementById('displayMoistureVal');
  const moistureBarFill = document.getElementById('moistureBarFill');
  const moistureCategoryBadge = document.getElementById('moistureCategoryBadge');

  // Low Moisture Alert Elements
  const lowMoistureAlert = document.getElementById('lowMoistureAlert');
  const alertMoistureVal = document.getElementById('alertMoistureVal');
  const lowMoistureMessage = document.getElementById('lowMoistureMessage');
  const triggerEmergencyWaterBtn = document.getElementById('triggerEmergencyWaterBtn');

  // Pump Indicator & Control Elements
  const pumpPill = document.getElementById('pumpPill');
  const pumpStatusText = document.getElementById('pumpStatusText');
  const pumpSubtext = document.getElementById('pumpSubtext');
  const manualPumpToggleBtn = document.getElementById('manualPumpToggleBtn');
  const pumpIconWrapper = document.getElementById('pumpIconWrapper');

  // Plant Condition Elements
  const plantStatusTitle = document.getElementById('plantStatusTitle');
  const plantStatusDesc = document.getElementById('plantStatusDesc');
  const plantActionTip = document.getElementById('plantActionTip');

  // Preset Scenario Buttons
  const presetButtons = document.querySelectorAll('.btn-preset');

  // Project Consultation Checklist Elements
  const taskCheckboxes = document.querySelectorAll('.task-checkbox');
  const progressPercentageText = document.getElementById('progressPercentageText');
  const progressPill = document.getElementById('progressPill');
  const checklistProgressBar = document.getElementById('checklistProgressBar');
  const taskCompletionCount = document.getElementById('taskCompletionCount');

  // Nav Links
  const navLinks = document.querySelectorAll('.nav-link');

  // =========================================================================
  // 2. Application State
  // =========================================================================
  let currentMoisture = 45; // default 45%
  let isPumpActive = false; // default OFF

  // =========================================================================
  // 3. Soil Moisture & Plant Condition Controller
  // =========================================================================

  /**
   * Updates all metrics, meters, alerts, and plant states based on soil moisture
   * @param {number} moisture - percentage 0 to 100
   */
  function updateSoilMoisture(moisture) {
    currentMoisture = parseInt(moisture, 10);

    // Sync input controls
    moistureSlider.value = currentMoisture;
    sliderValueDisplay.textContent = currentMoisture;
    displayMoistureVal.textContent = currentMoisture;

    // Update Meter Fill & Color Gradient
    moistureBarFill.style.width = `${currentMoisture}%`;

    if (currentMoisture < 20) {
      moistureBarFill.style.background = '#ef4444'; // Red
      moistureCategoryBadge.textContent = 'Critically Dry';
      moistureCategoryBadge.className = 'stat-status-badge badge-danger';
    } else if (currentMoisture < 30) {
      moistureBarFill.style.background = '#f59e0b'; // Amber
      moistureCategoryBadge.textContent = 'Low Moisture';
      moistureCategoryBadge.className = 'stat-status-badge badge-warning';
    } else if (currentMoisture <= 75) {
      moistureBarFill.style.background = 'linear-gradient(90deg, #4ade80 0%, #16a34a 100%)'; // Green
      moistureCategoryBadge.textContent = 'Optimal Range';
      moistureCategoryBadge.className = 'stat-status-badge badge-optimal';
    } else {
      moistureBarFill.style.background = 'linear-gradient(90deg, #38bdf8 0%, #0284c7 100%)'; // Blue
      moistureCategoryBadge.textContent = 'Saturated Soil';
      moistureCategoryBadge.className = 'stat-status-badge badge-optimal';
    }

    // Low Moisture Alert Display Logic (< 30% Threshold)
    if (currentMoisture < 30) {
      lowMoistureAlert.style.display = 'flex';
      alertMoistureVal.textContent = `${currentMoisture}%`;
      lowMoistureMessage.innerHTML = `
        Soil moisture has dropped to <strong>${currentMoisture}%</strong>, which is beneath the minimum 30% hydration threshold.
        The soil is dry and plant roots are experiencing acute water stress. Immediate irrigation recommended!
      `;
    } else {
      lowMoistureAlert.style.display = 'none';
    }

    // Plant Health Condition Mapping
    updatePlantCondition(currentMoisture);
  }

  function updatePlantCondition(moisture) {
    if (moisture < 20) {
      plantStatusTitle.textContent = 'Critical - Wilting Danger';
      plantStatusTitle.style.color = 'var(--red-500)';
      plantStatusDesc.textContent =
        'Soil is severely depleted of moisture. Plant foliage is at imminent risk of cellular collapse and permanent wilting.';
      plantActionTip.innerHTML = '⚠️ <strong>Urgent:</strong> Immediate irrigation required!';
      plantActionTip.style.color = 'var(--red-500)';
    } else if (moisture < 30) {
      plantStatusTitle.textContent = 'Thirsty - Low Moisture';
      plantStatusTitle.style.color = 'var(--amber-500)';
      plantStatusDesc.textContent =
        'Root zone moisture has dropped below target comfort levels. Soil capillary tension is elevated.';
      plantActionTip.innerHTML = '⚠️ <strong>Warning:</strong> Soil dry. Water plant soon.';
      plantActionTip.style.color = 'var(--amber-800)';
    } else if (moisture <= 75) {
      plantStatusTitle.textContent = 'Healthy & Hydrated';
      plantStatusTitle.style.color = 'var(--emerald-900)';
      plantStatusDesc.textContent =
        'Root moisture is in the optimal range (40% - 70%). Transpiration, photosynthesis, and nutrient transport are nominal.';
      plantActionTip.innerHTML = '✔ <strong>Nominal:</strong> No watering required at this time.';
      plantActionTip.style.color = 'var(--emerald-700)';
    } else {
      plantStatusTitle.textContent = 'Saturated / Overwatered';
      plantStatusTitle.style.color = 'var(--water-blue)';
      plantStatusDesc.textContent =
        'Soil is waterlogged. Excessive moisture reduces aeration around roots and can foster anaerobic fungal root decay.';
      plantActionTip.innerHTML = '⚠️ <strong>Notice:</strong> Suspend irrigation until moisture subsides.';
      plantActionTip.style.color = 'var(--water-blue)';
    }
  }

  // =========================================================================
  // 4. Water Pump Indicator & Simulation Controller
  // =========================================================================

  function setPumpState(active) {
    isPumpActive = active;

    if (isPumpActive) {
      // Pump ON State
      pumpPill.className = 'pump-pill pump-on';
      pumpStatusText.textContent = 'PUMP ON';
      pumpSubtext.innerHTML = '<strong>5V Relay Energized</strong> &bull; Delivering simulated water flow (1.2 L/min)';
      manualPumpToggleBtn.textContent = 'Turn Pump OFF (Simulated)';
      manualPumpToggleBtn.style.backgroundColor = 'var(--green-100)';
      manualPumpToggleBtn.style.borderColor = 'var(--green-500)';

      if (pumpIconWrapper) {
        pumpIconWrapper.style.backgroundColor = 'var(--green-500)';
        pumpIconWrapper.style.color = '#ffffff';
      }
    } else {
      // Pump OFF State
      pumpPill.className = 'pump-pill pump-off';
      pumpStatusText.textContent = 'PUMP OFF';
      pumpSubtext.textContent = 'Motor idle • No active water delivery';
      manualPumpToggleBtn.textContent = 'Toggle Pump (Manual Simulation)';
      manualPumpToggleBtn.style.backgroundColor = '#ffffff';
      manualPumpToggleBtn.style.borderColor = 'var(--green-300)';

      if (pumpIconWrapper) {
        pumpIconWrapper.style.backgroundColor = 'var(--green-100)';
        pumpIconWrapper.style.color = 'var(--green-700)';
      }
    }
  }

  // Manual Toggle Button
  manualPumpToggleBtn.addEventListener('click', () => {
    setPumpState(!isPumpActive);
  });

  // Emergency Water Button from Alert Banner
  triggerEmergencyWaterBtn.addEventListener('click', () => {
    setPumpState(true);
    // Simulate watering increasing moisture to 55% after small pulse
    const newMoisture = Math.min(currentMoisture + 30, 60);
    updateSoilMoisture(newMoisture);
  });

  // =========================================================================
  // 5. Interactive Simulation Slider & Preset Listeners
  // =========================================================================

  moistureSlider.addEventListener('input', (e) => {
    updateSoilMoisture(e.target.value);
  });

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.val;
      if (val !== undefined) {
        updateSoilMoisture(val);
      }
    });
  });

  // =========================================================================
  // 6. Project Consultation Checklist & Dynamic Progress Bar
  // =========================================================================

  function updateChecklistProgress() {
    const totalTasks = taskCheckboxes.length;
    let checkedCount = 0;

    taskCheckboxes.forEach(cb => {
      const parentLabel = cb.closest('.task-item');
      if (cb.checked) {
        checkedCount++;
        if (parentLabel) parentLabel.classList.add('is-completed');
      } else {
        if (parentLabel) parentLabel.classList.remove('is-completed');
      }
    });

    // Calculate percentage (3 out of 7 tasks is ~43%, prompt specified 40% initial baseline)
    const percentage = Math.round((checkedCount / totalTasks) * 100);

    // Update Progress UI
    progressPercentageText.textContent = `${percentage}%`;
    progressPill.textContent = `Progress: ${percentage}%`;
    checklistProgressBar.style.width = `${percentage}%`;
    taskCompletionCount.textContent = `${checkedCount} of ${totalTasks} tasks completed`;

    // Dynamic Status adjustments
    const statusBadge = document.querySelector('.badge-status-incomplete');
    if (statusBadge) {
      if (percentage === 100) {
        statusBadge.innerHTML = '<span class="pulse-indicator" style="background:#10b981;"></span> Status: Production Ready';
        statusBadge.style.backgroundColor = 'var(--green-100)';
        statusBadge.style.color = 'var(--green-800)';
        statusBadge.style.borderColor = 'var(--green-400)';
      } else if (percentage >= 70) {
        statusBadge.innerHTML = '<span class="pulse-indicator" style="background:#3b82f6;"></span> Status: Testing Phase';
        statusBadge.style.backgroundColor = '#eff6ff';
        statusBadge.style.color = '#1e40af';
        statusBadge.style.borderColor = '#93c5fd';
      } else {
        statusBadge.innerHTML = '<span class="pulse-indicator"></span> Status: Incomplete';
        statusBadge.style.backgroundColor = '#fef3c7';
        statusBadge.style.color = '#92400e';
        statusBadge.style.borderColor = '#f59e0b';
      }
    }
  }

  // Bind change events to all checkboxes
  taskCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateChecklistProgress);
  });

  // =========================================================================
  // 7. Nav Links & Smooth Transitions
  // =========================================================================
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // =========================================================================
  // 8. Initialization
  // =========================================================================
  // Set initial moisture to 45% (optimal) and initialize checklist
  updateSoilMoisture(45);
  setPumpState(false);
  updateChecklistProgress();
});
