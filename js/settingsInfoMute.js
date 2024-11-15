document.addEventListener('DOMContentLoaded', () => {
    // Global Background Setup
    document.body.style.backgroundImage = "url('images/background.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.height = "100vh";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";

    // DOM Elements
    const settingsPopupOverlay = document.getElementById('settings-popup-overlay');
    const infoPopupOverlay = document.getElementById('info-popup-overlay');
    const settingsPopupBox = document.getElementById('settings-popup-box');
    const infoPopupBox = document.getElementById('info-popup-box');
    const settingsCloseBtn = document.getElementById('settings-close-btn');
    const infoCloseBtn = document.getElementById('info-close-btn');
    const muteIcon = document.getElementById('mute-icon'); // Mute/Unmute button

    // Audio
    const backgroundMusic = new Audio('audio/background_music.mp3'); // Path to your background music
    backgroundMusic.loop = true; // Enable looping
    backgroundMusic.play(); // Start playing music when the page loads
    let isMuted = false;

    // Ensure popups have consistent backgrounds
    const initializePopups = () => {
        const backgroundImage = "url('images/login.png') no-repeat center center";
        const backgroundSize = "cover";

        settingsPopupBox.style.background = backgroundImage;
        settingsPopupBox.style.backgroundSize = backgroundSize;

        infoPopupBox.style.background = backgroundImage;
        infoPopupBox.style.backgroundSize = backgroundSize;

        // Dynamically set button background for settings and info popups
        const popupButtons = [settingsCloseBtn, infoCloseBtn]; // Include settings and info close buttons
        popupButtons.forEach(button => {
            button.style.backgroundImage = "url('images/button2.png')"; // Set button2.png as background
            button.style.backgroundSize = "contain"; // Ensure it fits within the button
            button.style.backgroundPosition = "center";
            button.style.backgroundRepeat = "no-repeat";
            button.style.width = "300px"; // Adjust width for visual consistency
            button.style.height = "150px"; // Adjust height for visual consistency
            button.style.border = "none"; // Remove any borders
            button.style.cursor = "pointer"; // Show pointer cursor
            button.style.outline = "none"; // Remove outline when focused
            button.style.marginTop = "20px"; // Add spacing between the button and other elements
        });

        // Ensure popups are hidden on load
        settingsPopupOverlay.style.display = "none";
        infoPopupOverlay.style.display = "none";
    };

    // Mute/Unmute functionality
    muteIcon.addEventListener('click', () => {
        if (isMuted) {
            backgroundMusic.play(); // Resume music
            muteIcon.src = 'images/unmute_icon.png'; // Change to unmute icon
        } else {
            backgroundMusic.pause(); // Pause music
            muteIcon.src = 'images/mute_icon.png'; // Change to mute icon
        }
        isMuted = !isMuted; // Toggle mute state
    });

    // Close all popups
    const closeAllPopups = () => {
        settingsPopupOverlay.style.display = "none";
        infoPopupOverlay.style.display = "none";
    };

    // Add hover effects for buttons
    const addButtonHoverEffects = (buttons) => {
        buttons.forEach((button) => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.1)';
                button.style.transition = 'transform 0.3s ease';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
            });
        });
    };

    // Event Listeners
    const settingsIcon = document.getElementById('settings-icon');
    const infoIcon = document.getElementById('info-icon');

    settingsIcon.addEventListener('click', () => {
        closeAllPopups();
        settingsPopupOverlay.style.display = "flex";
    });

    infoIcon.addEventListener('click', () => {
        closeAllPopups();
        infoPopupOverlay.style.display = "flex";
    });

    settingsCloseBtn.addEventListener('click', closeAllPopups);
    infoCloseBtn.addEventListener('click', closeAllPopups);

    // Initialize Popups and Buttons
    initializePopups();
    addButtonHoverEffects([settingsCloseBtn, infoCloseBtn]);
});
