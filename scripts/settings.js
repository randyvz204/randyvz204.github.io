document.addEventListener('DOMContentLoaded', () => {
    const settings = JSON.parse(localStorage.getItem('siteSettings')) || {};
    const saveNotification = document.getElementById('saveNotification');
    const tabTitleWarning = document.getElementById('tabTitleWarning');

    // Default settings
    const defaultSettings = {
        tabTitle: "My Awesome Site",
        tabIcon: "icon1.png",
        primaryColor: "#8B4513",
        secondaryColor: "#A0522D",
        accentColor: "#CD853F",
        animationStyle: "leaves",
    };

    // Initialize settings
    loadSettings();
    setupEventListeners();

    function loadSettings() {
        // Tab Customization
        if (settings.tabTitle) document.getElementById('tabTitle').value = settings.tabTitle;
        if (settings.tabIcon) document.getElementById('tabIcon').value = settings.tabIcon;

        // Theme Colors
        if (settings.primaryColor) document.getElementById('primaryColor').value = settings.primaryColor;
        if (settings.secondaryColor) document.getElementById('secondaryColor').value = settings.secondaryColor;
        if (settings.accentColor) document.getElementById('accentColor').value = settings.accentColor;

        // Apply theme colors
        applyThemeColors();

        // Background Animation
        if (settings.animationStyle) {
            const activeOption = document.querySelector(`[data-animation="${settings.animationStyle}"]`);
            if (activeOption) activeOption.classList.add('active');
            startAnimation(settings.animationStyle);
        }
    }

    function setupEventListeners() {
        // Tab Customization
        const tabTitleInput = document.getElementById('tabTitle');
        tabTitleInput.addEventListener('input', () => {
            if (tabTitleInput.value.length > 25) {
                tabTitleWarning.style.display = 'block';
            } else {
                tabTitleWarning.style.display = 'none';
                saveSettings();
            }
        });

        document.getElementById('tabIcon').addEventListener('change', () => {
            saveSettings();
        });

        // Theme Colors
        document.getElementById('primaryColor').addEventListener('input', () => {
            applyThemeColors();
            saveSettings();
        });

        document.getElementById('secondaryColor').addEventListener('input', () => {
            applyThemeColors();
            saveSettings();
        });

        document.getElementById('accentColor').addEventListener('input', () => {
            applyThemeColors();
            saveSettings();
        });

        // Background Animation
        document.querySelectorAll('.animation-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.animation-option').forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                settings.animationStyle = option.dataset.animation;
                startAnimation(option.dataset.animation);
                saveSettings();
            });
        });

        // Reset Settings Button
        document.getElementById('resetSettings').addEventListener('click', () => {
            resetSettings();
        });
    }

    function saveSettings() {
        settings.tabTitle = document.getElementById('tabTitle').value;
        settings.tabIcon = document.getElementById('tabIcon').value;
        settings.primaryColor = document.getElementById('primaryColor').value;
        settings.secondaryColor = document.getElementById('secondaryColor').value;
        settings.accentColor = document.getElementById('accentColor').value;

        localStorage.setItem('siteSettings', JSON.stringify(settings));
        showSaveNotification();

        // Apply immediate changes
        document.title = settings.tabTitle;
        applyThemeColors();
    }

    function applyThemeColors() {
        // Update CSS variables for theme colors
        document.body.style.setProperty('--primary-color', settings.primaryColor || '#8B4513');
        document.body.style.setProperty('--secondary-color', settings.secondaryColor || '#A0522D');
        document.body.style.setProperty('--accent-color', settings.accentColor || '#CD853F');

        // If an animation is active, restart it to apply new colors
        if (settings.animationStyle) {
            startAnimation(settings.animationStyle);
        }
    }

    function resetSettings() {
        Object.assign(settings, defaultSettings);
        localStorage.setItem('siteSettings', JSON.stringify(settings));
        loadSettings();
        showSaveNotification();
    }

    function showSaveNotification() {
        saveNotification.classList.add('show');
        setTimeout(() => saveNotification.classList.remove('show'), 2000);
    }
});