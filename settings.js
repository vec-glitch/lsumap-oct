// settings.js - Website Settings Functionality

// Theme Toggle Functionality
function initializeThemeToggle() {
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            // Update active button
            document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Apply theme to document
            document.documentElement.setAttribute('data-theme', theme);
            
            // Save to localStorage
            localStorage.setItem('website-theme', theme);
            
            // Update meta theme-color for mobile browsers
            updateMetaThemeColor(theme);
        });
    });
}

// Function to update mobile browser theme color
function updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = theme === 'dark' ? '#1a1a1a' : '#00563F';
}

// Load saved theme on page load
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('website-theme') || 'light';
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update active button
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-theme') === savedTheme) {
            btn.classList.add('active');
        }
    });
    
    updateMetaThemeColor(savedTheme);
}

// Font Size Control
function initializeFontSizeControl() {
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const size = this.getAttribute('data-size');
            
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Apply font size
            document.body.className = document.body.className.replace(/\bfont-\w+\b/g, '');
            document.body.classList.add(`font-${size}`);
            
            // Save to localStorage
            localStorage.setItem('website-font-size', size);
        });
    });
}

// Load saved font size
function loadSavedFontSize() {
    const savedSize = localStorage.getItem('website-font-size') || 'medium';
    document.body.classList.add(`font-${savedSize}`);
    
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-size') === savedSize) {
            btn.classList.add('active');
        }
    });
}

// Add font size classes to CSS
function injectFontStyles() {
    const fontStyles = `
        .font-small { font-size: 14px; }
        .font-medium { font-size: 16px; }
        .font-large { font-size: 18px; }
        
        .font-small h1 { font-size: 1.8rem; }
        .font-medium h1 { font-size: 2.5rem; }
        .font-large h1 { font-size: 3rem; }
        
        .font-small h2 { font-size: 1.4rem; }
        .font-medium h2 { font-size: 1.8rem; }
        .font-large h2 { font-size: 2.2rem; }
        
        .font-small h3 { font-size: 1.1rem; }
        .font-medium h3 { font-size: 1.2rem; }
        .font-large h3 { font-size: 1.4rem; }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = fontStyles;
    document.head.appendChild(styleSheet);
}

// Color Scheme
function initializeColorScheme() {
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            
            document.querySelectorAll('.color-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            
            // Apply color scheme
            applyColorScheme(color);
            
            // Save to localStorage
            localStorage.setItem('website-color-scheme', color);
        });
    });
}

// Function to apply color scheme
function applyColorScheme(scheme) {
    const root = document.documentElement;
    
    // Reset to default first
    root.style.setProperty('--primary', '#00563F');
    root.style.setProperty('--primary-light', '#007B5E');
    root.style.setProperty('--accent', '#0b6f4e');
    
    // Apply selected scheme
    switch(scheme) {
        case 'blue':
            root.style.setProperty('--primary', '#1e40af');
            root.style.setProperty('--primary-light', '#3b82f6');
            root.style.setProperty('--accent', '#2563eb');
            break;
        case 'purple':
            root.style.setProperty('--primary', '#7c3aed');
            root.style.setProperty('--primary-light', '#8b5cf6');
            root.style.setProperty('--accent', '#7e22ce');
            break;
        case 'amber':
            root.style.setProperty('--primary', '#d97706');
            root.style.setProperty('--primary-light', '#f59e0b');
            root.style.setProperty('--accent', '#b45309');
            break;
        // default scheme is already set
    }
}

// Load saved color scheme
function loadSavedColorScheme() {
    const savedScheme = localStorage.getItem('website-color-scheme') || 'default';
    applyColorScheme(savedScheme);
    
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-color') === savedScheme) {
            option.classList.add('active');
        }
    });
}

// Clear Data Function
function initializeClearData() {
    document.querySelector('.danger-btn').addEventListener('click', function() {
        if(confirm('Are you sure you want to clear all site data? This will reset all your preferences.')) {
            clearAllSettings();
            alert('All settings have been reset to default.');
        }
    });
}

function clearAllSettings() {
    // Clear all stored preferences
    localStorage.removeItem('website-theme');
    localStorage.removeItem('website-font-size');
    localStorage.removeItem('website-color-scheme');
    localStorage.removeItem('website-toggles');
    localStorage.removeItem('website-selects');
    
    // Reset to default
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.className = '';
    applyColorScheme('default');
    
    // Update UI
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-theme') === 'light') {
            btn.classList.add('active');
        }
    });
    
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-size') === 'medium') {
            btn.classList.add('active');
        }
    });
    
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-color') === 'default') {
            option.classList.add('active');
        }
    });
    
    // Reset toggle switches to their default checked state
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = checkbox.hasAttribute('checked');
    });
    
    // Reset select dropdowns to first option
    document.querySelectorAll('.setting-select').forEach(select => {
        select.selectedIndex = 0;
    });
}

// Save Changes
function initializeSaveButton() {
    document.querySelector('.btn-primary').addEventListener('click', function() {
        // Get current toggle states
        const toggles = {};
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            toggles[checkbox.parentElement.previousElementSibling.querySelector('h3').textContent] = checkbox.checked;
        });
        
        // Get select values
        const selects = {};
        document.querySelectorAll('.setting-select').forEach(select => {
            selects[select.parentElement.previousElementSibling.querySelector('h3').textContent] = select.value;
        });
        
        // Save all settings
        localStorage.setItem('website-toggles', JSON.stringify(toggles));
        localStorage.setItem('website-selects', JSON.stringify(selects));
        
        alert('Settings have been saved successfully!');
    });
}

// Load saved toggles and selects
function loadSavedTogglesAndSelects() {
    const savedToggles = JSON.parse(localStorage.getItem('website-toggles') || '{}');
    const savedSelects = JSON.parse(localStorage.getItem('website-selects') || '{}');
    
    // Apply saved toggles
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        const settingName = checkbox.parentElement.previousElementSibling.querySelector('h3').textContent;
        if (savedToggles[settingName] !== undefined) {
            checkbox.checked = savedToggles[settingName];
        }
    });
    
    // Apply saved selects
    document.querySelectorAll('.setting-select').forEach(select => {
        const settingName = select.parentElement.previousElementSibling.querySelector('h3').textContent;
        if (savedSelects[settingName] !== undefined) {
            select.value = savedSelects[settingName];
        }
    });
}

// Reset to Default
function initializeResetButton() {
    document.querySelector('.btn-secondary').addEventListener('click', function() {
        if(confirm('Reset all settings to default values?')) {
            clearAllSettings();
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Inject font styles
    injectFontStyles();
    
    // Initialize theme functionality
    initializeThemeToggle();
    loadSavedTheme();
    
    // Initialize font size functionality
    initializeFontSizeControl();
    loadSavedFontSize();
    
    // Initialize color scheme functionality
    initializeColorScheme();
    loadSavedColorScheme();
    
    // Initialize buttons
    initializeClearData();
    initializeSaveButton();
    initializeResetButton();
    
    // Load saved toggles and selects
    loadSavedTogglesAndSelects();
    
    console.log('Settings page initialized successfully!');
});