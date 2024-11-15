document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const puzzleImage = document.getElementById('puzzle-image');
    const popupOverlay = document.getElementById('popup-overlay');
    const popupBox = document.getElementById('popup-box');
    const popupMessage = document.getElementById('popup-message'); // Title for popup
    const correctAnswerElement = document.getElementById('correct-answer'); // Correct answer placeholder
    const popupBtn = document.getElementById('popup-btn'); // Popup button
    const gameContainer = document.querySelector('.game-container');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('time');
    const buttons = document.querySelectorAll('.answer-btn');
    const levelElement = document.getElementById('level'); // Level display
    const muteIcon = document.getElementById('mute-icon'); // Mute/Unmute button

    // Settings and Info Popups
    const settingsIcon = document.getElementById('settings-icon');
    const infoIcon = document.getElementById('info-icon');
    const settingsPopupOverlay = document.getElementById('settings-popup-overlay');
    const infoPopupOverlay = document.getElementById('info-popup-overlay');
    const settingsPopupBox = document.getElementById('settings-popup-box');
    const infoPopupBox = document.getElementById('info-popup-box');
    const settingsCloseBtn = document.getElementById('settings-close-btn');
    const infoCloseBtn = document.getElementById('info-close-btn');

    // Game variables
    const proxyUrl = 'proxy.php';
    let score = 0;
    let level = 1; // Initialize level
    let timer = null;
    let timeLeft = 30;
    let canAnswer = true;
    let correctAnswer = null;
    let isPaused = false; // Flag to check if the timer is paused
    let isMuted = false;

    // Audio
    const backgroundMusic = new Audio('audio/background_music.mp3'); // Path to your background music
    backgroundMusic.loop = true; // Enable looping
    backgroundMusic.play(); // Start playing music when the game loads

    // Initialize popups with the same background as login.png
const initializePopups = () => {
    const backgroundImage = "url('images/login.png') no-repeat center center";
    const backgroundSize = "cover";

    // Apply to Settings Popup
    settingsPopupBox.style.background = backgroundImage;
    settingsPopupBox.style.backgroundSize = backgroundSize;

    // Apply to Info Popup
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


muteIcon.addEventListener('click', () => {
    if (isMuted) {
        backgroundMusic.play();
        muteIcon.src = 'images/unmute_icon.png'; // Switch to unmute icon
    } else {
        backgroundMusic.pause();
        muteIcon.src = 'images/mute_icon.png'; // Switch to mute icon
    }
    // Ensure size consistency
    muteIcon.style.width = "90px"; 
    muteIcon.style.height = "90px";
    isMuted = !isMuted; // Toggle mute state
});


    // Close all popups
    const closeAllPopups = () => {
        popupOverlay.style.display = 'none';
        settingsPopupOverlay.style.display = 'none';
        infoPopupOverlay.style.display = 'none';
    };

    // Pause the timer
    const pauseTimer = () => {
        if (!isPaused) {
            clearInterval(timer);
            isPaused = true;
        }
    };

    // Resume the timer
    const resumeTimer = () => {
        if (isPaused) {
            startTimer();
            isPaused = false;
        }
    };

    // Fetch a new puzzle
    const loadPuzzle = async () => {
        try {
            closeAllPopups(); // Close all popups when a new puzzle is loaded
            gameContainer.classList.remove('blur');

            const response = await fetch(`${proxyUrl}?action=fetch`);
            const data = await response.json();

            if (data.question && data.solution) {
                puzzleImage.src = `data:image/png;base64,${data.question}`;
                correctAnswer = atob(data.solution); // Decode the solution
                resetTimer();
                canAnswer = true;
            } else {
                throw new Error('Invalid puzzle data');
            }
        } catch (error) {
            console.error('Error loading puzzle:', error);
        }
    };

    // Show popup with background, correct answer, and button image
    const showPopup = (message, isCorrect) => {
        closeAllPopups(); // Close other popups before showing this one

        // Set popup background
        popupBox.style.background = "url('images/login.png') no-repeat center center";
        popupBox.style.backgroundSize = "cover"; // Ensure background fills the popup

        // Set the popup message content
        popupMessage.textContent = message;

        // Update the correct answer text
        correctAnswerElement.textContent = `Correct Answer: ${correctAnswer}`;

        // Change button background image dynamically
        if (isCorrect) {
            popupBtn.style.backgroundImage = "url('images/button2.png')"; // Path to correct button image
        } else {
            popupBtn.style.backgroundImage = "url('images/button2.png')"; // Path to incorrect button image
        }

        // Set button styles for proper image alignment and size
        popupBtn.style.backgroundSize = "contain"; // Ensure image fits within the button
        popupBtn.style.backgroundPosition = "center";
        popupBtn.style.backgroundRepeat = "no-repeat";
        popupBtn.style.width = "300px"; // Button width
        popupBtn.style.height = "150px"; // Button height

        popupOverlay.style.display = 'flex'; // Show the popup
        gameContainer.classList.add('blur'); // Blur the game container
    };

    // Close popup and proceed to the next level
    const closePopup = () => {
        popupOverlay.style.display = 'none'; // Hide the popup
        gameContainer.classList.remove('blur'); // Remove blur effect
        updateLevel(); // Increment and update the level
        loadPuzzle(); // Load the next puzzle
    };

    // Update the game level
    const updateLevel = () => {
        level++;
        levelElement.textContent = level; // Update level in the UI
    };

    // Check the user's answer
    const checkAnswer = (answer) => {
        if (!canAnswer) {
            showPopup('Time is Up!', false); // Show "Time is Up!" popup
            return;
        }

        if (answer === correctAnswer) {
            score += 10;
            scoreElement.textContent = score;
            showPopup('Correct!', true); // Show "Correct!" popup
        } else {
            showPopup('Incorrect!', false); // Show "Incorrect!" popup
        }
    };

    // Timer functions
    const startTimer = () => {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timerElement.textContent = timeLeft;
            } else {
                clearInterval(timer);
                showPopup('Time is Up!', false); // Show "Time is Up!" popup
                canAnswer = false;
            }
        }, 1000);
    };

    const resetTimer = () => {
        clearInterval(timer);
        timeLeft = 30;
        timerElement.textContent = timeLeft;
        startTimer();
    };

    // Open settings popup
    settingsIcon.addEventListener('click', () => {
        closeAllPopups(); // Close other popups
        pauseTimer(); // Pause the timer
        settingsPopupOverlay.style.display = 'flex';
    });

    // Close settings popup
    settingsCloseBtn.addEventListener('click', () => {
        settingsPopupOverlay.style.display = 'none';
        resumeTimer(); // Resume the timer
    });

    // Open info popup
    infoIcon.addEventListener('click', () => {
        closeAllPopups(); // Close other popups
        pauseTimer(); // Pause the timer
        infoPopupOverlay.style.display = 'flex'; // Show info popup
    });

    // Close info popup
    infoCloseBtn.addEventListener('click', () => {
        infoPopupOverlay.style.display = 'none'; // Hide info popup
        resumeTimer(); // Resume the timer
    });

    // Close popups when clicking outside the popup box
    settingsPopupOverlay.addEventListener('click', (e) => {
        if (e.target === settingsPopupOverlay) {
            settingsPopupOverlay.style.display = 'none';
            resumeTimer(); // Resume the timer
        }
    });

    infoPopupOverlay.addEventListener('click', (e) => {
        if (e.target === infoPopupOverlay) {
            infoPopupOverlay.style.display = 'none';
            resumeTimer(); // Resume the timer
        }
    });

    // Event listeners for answer buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.getAttribute('data-value');
            checkAnswer(answer);
        });
    });

    // Event listener for popup button
    popupBtn.addEventListener('click', closePopup);

    // Initialize and load the game
    initializePopups();
    loadPuzzle();
});
