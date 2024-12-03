document.addEventListener('DOMContentLoaded', () => {
    
    const puzzleImage = document.getElementById('puzzle-image');
    const popupOverlay = document.getElementById('popup-overlay');
    const popupBox = document.getElementById('popup-box');
    const popupMessage = document.getElementById('popup-message'); 
    const correctAnswerElement = document.getElementById('correct-answer'); 
    const popupBtn = document.getElementById('popup-btn'); 
    const gameContainer = document.querySelector('.game-container');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('time');
    const buttons = document.querySelectorAll('.answer-btn');
    const levelElement = document.getElementById('level'); 
    const muteIcon = document.getElementById('mute-icon'); 

    
    const settingsIcon = document.getElementById('settings-icon');
    const infoIcon = document.getElementById('info-icon');
    const settingsPopupOverlay = document.getElementById('settings-popup-overlay');
    const infoPopupOverlay = document.getElementById('info-popup-overlay');
    const settingsPopupBox = document.getElementById('settings-popup-box');
    const infoPopupBox = document.getElementById('info-popup-box');
    const settingsCloseBtn = document.getElementById('settings-close-btn');
    const infoCloseBtn = document.getElementById('info-close-btn');

    
    const proxyUrl = 'proxy.php';
    const updateScoreUrl = 'update_score.php';

    let score = 0;
    let correctAnswers = 0;
    let puzzlesCompleted = 0;

    const level = parseInt(levelElement.textContent);
    const puzzleLimits = [0, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26]; 

    const totalPuzzles = puzzleLimits[level];
    const starThresholds = { 1: 50, 2: 80 }; 
    let correctAnswer = null;

    let timer = null;
    let timeLeft = 30 - (level - 1) * 2; 
    let canAnswer = true;
    let isPaused = false; 
    let isMuted = false;


    const backgroundMusic = new Audio('audio/background_music.mp3'); 
    backgroundMusic.loop = true; 
    backgroundMusic.play(); 

    const initializePopups = () => {
    const backgroundImage = "url('images/login.png') no-repeat center center";
    const backgroundSize = "cover";


    settingsPopupBox.style.background = backgroundImage;
    settingsPopupBox.style.backgroundSize = backgroundSize;

    infoPopupBox.style.background = backgroundImage;
    infoPopupBox.style.backgroundSize = backgroundSize;

    const popupButtons = [settingsCloseBtn, infoCloseBtn]; 
    popupButtons.forEach(button => {
        button.style.backgroundImage = "url('images/button2.png')"; 
        button.style.backgroundSize = "contain"; 
        button.style.backgroundPosition = "center";
        button.style.backgroundRepeat = "no-repeat";
        button.style.width = "300px"; 
        button.style.height = "150px"; 
        button.style.border = "none"; 
        button.style.cursor = "pointer"; 
        button.style.outline = "none"; 
        button.style.marginTop = "20px"; 
    });
     
     settingsPopupOverlay.style.display = "none";
     infoPopupOverlay.style.display = "none";
};


muteIcon.addEventListener('click', () => {
    if (isMuted) {
        backgroundMusic.play();
        muteIcon.src = 'images/mute_icon.png'; 
    } else {
        backgroundMusic.pause();
        muteIcon.src = 'images/unmute_icon.png'; 
    }
    
    muteIcon.style.width = "90px"; 
    muteIcon.style.height = "90px";
    isMuted = !isMuted; 
});


    const closeAllPopups = () => {
        popupOverlay.style.display = 'none';
        settingsPopupOverlay.style.display = 'none';
        infoPopupOverlay.style.display = 'none';
    };

    const pauseTimer = () => {
        if (!isPaused) {
            clearInterval(timer);
            isPaused = true;
        }
    };


    const resumeTimer = () => {
        if (isPaused) {
            startTimer();
            isPaused = false;
        }
    };
    const finishLevel = async () => {
        
        const averageCorrectness = (correctAnswers / totalPuzzles) * 100 * 2;
        let stars = 1;
        if (averageCorrectness >= starThresholds[2]) stars = 3;
        else if (averageCorrectness >= starThresholds[1]) stars = 2;
    
        try {
            const response = await fetch(updateScoreUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: currentUserId, 
                    level,
                    stars,
                    score,
                    average_correctness: averageCorrectness.toFixed(2),
                }),
            });
            showFinalPopup(stars);
            const result = await response.json();
    
            if (result.success) {
                console.log("Data saved successfully. Displaying final popup...");
                showFinalPopup(stars); 
            } else {
                console.error("Failed to save data:", result.error);
                alert("An error occurred while saving your progress. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            
        }
    };
    
   
const showFinalPopup = (stars) => {
    closeAllPopups(); 


    popupBox.style.background = "url('images/login.png') no-repeat center center";
    popupBox.style.backgroundSize = "cover";


    popupMessage.innerHTML = `<h1 style="font-size: 24px; font-weight: bold; margin-bottom: 90px;">Level Complete!</h1>`;

    const scoreParagraph = document.createElement('p');
    scoreParagraph.textContent = `Score: ${score}`;
    scoreParagraph.style.fontSize = '20px';
    scoreParagraph.style.marginBottom = '20px';
    scoreParagraph.style.textAlign = 'center';
    popupMessage.appendChild(scoreParagraph);


    const starsContainer = document.createElement('div');
    starsContainer.style.display = 'flex';
    starsContainer.style.justifyContent = 'center';
    starsContainer.style.gap = '10px';
    starsContainer.style.marginBottom = '20px';

    for (let i = 0; i < stars; i++) {
        const starImage = document.createElement('img');
        starImage.src = 'images/star.png'; 
        starImage.alt = 'Star';
        starImage.style.width = '50px'; 
        starImage.style.height = '50px';
        starsContainer.appendChild(starImage);
    }
    const bunnyContainer = document.createElement('div');
    bunnyContainer.style.display = 'flex';
    bunnyContainer.style.justifyContent = 'center';
    bunnyContainer.style.marginBottom = '20px';

    for (let i = 0; i < stars; i++) {
        const bunnyImage = document.createElement('img');
        bunnyImage.src = 'images/rabbit.png'; 
        bunnyImage.alt = 'Star';
        bunnyImage.style.width = '100px'; 
        bunnyImage.style.height = '100px';
        bunnyContainer.appendChild(bunnyImage);
    }
    popupMessage.appendChild(starsContainer);

    popupBtn.textContent = "Home";
    popupBtn.style.backgroundImage = "url('images/button2.png')";
    popupBtn.style.backgroundSize = "contain";
    popupBtn.style.backgroundPosition = "center";
    popupBtn.style.backgroundRepeat = "no-repeat";
    popupBtn.style.width = "300px";
    popupBtn.style.height = "150px";

    popupBtn.onclick = () => {
        window.location.href = 'home.php'; 
    };

    popupOverlay.style.display = 'flex'; 
    gameContainer.classList.add('blur'); 
};

    
    
    
    const loadPuzzle = async () => {
        try {
            closeAllPopups();
            gameContainer.classList.remove('blur');
    
        const backgrounds = {
            1: 'images/back1.jpg',
            2: 'images/back2.jpg',
            3: 'images/back3.jpg',
            4: 'images/back4.jpg',
            5: 'images/back5.jpg',
            6: 'images/back1.jpg',
            7: 'images/back2.jpg',
            8: 'images/back3.jpg',
            9: 'images/back4.jpg',
            10: 'images/back5.jpg'
        };

        if (backgrounds[level]) {
            document.body.style.backgroundImage = `url('${backgrounds[level]}')`;
            document.body.style.backgroundSize = 'cover'; 
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.height = '100%'; 
            document.body.style.margin = '0'; 
            document.body.style.padding = '0';
            document.body.style.overflowX = 'hidden'; 
        }
            const response = await fetch(`${proxyUrl}?action=fetch`);
            const data = await response.json();
    
            if (data.question && data.solution) {
                puzzleImage.src = `data:image/png;base64,${data.question}`;
                correctAnswer = atob(data.solution); 
                resetTimer();
                canAnswer = true;
    
                attachButtonListeners(); 
            } else {
                throw new Error('Invalid puzzle data');
            }
        } catch (error) {
            console.error('Error loading puzzle:', error);
        }
    };


    const showPopup = (message, isCorrect) => {
        closeAllPopups(); 

       
        popupBox.style.background = "url('images/login.png') no-repeat center center";
        popupBox.style.backgroundSize = "cover"; 

       
        popupMessage.textContent = message;

        
        correctAnswerElement.textContent = `Correct Answer: ${correctAnswer}`;
        if (isCorrect) correctAnswers++;
        puzzlesCompleted++;
       
        if (isCorrect) {
            popupBtn.style.backgroundImage = "url('images/button2.png')"; 
        } else {
            popupBtn.style.backgroundImage = "url('images/button2.png')"; 
        }

        
        popupBtn.style.backgroundSize = "contain"; 
        popupBtn.style.backgroundPosition = "center";
        popupBtn.style.backgroundRepeat = "no-repeat";
        popupBtn.style.width = "300px"; 
        popupBtn.style.height = "150px"; 

        popupOverlay.style.display = 'flex'; 
        gameContainer.classList.add('blur'); 
    };

    
    const closePopup = () => {
        popupOverlay.style.display = 'none'; 
        gameContainer.classList.remove('blur'); 
        
        loadPuzzle(); 
    };

   
const checkAnswer = (answer) => {
    console.log('checkAnswer called');
    if (!canAnswer) {
        console.log('Already answered, skipping duplicate call');
        return;
    }

    canAnswer = false;

    if (answer === correctAnswer) {
        score += 10;
        scoreElement.textContent = score;
        showPopup('Correct!', true);
    } else {
        showPopup('Incorrect!', false);
    }

    puzzlesCompleted++;

    console.log(`Level: ${level}, Total Puzzles: ${totalPuzzles}, Puzzles Completed: ${puzzlesCompleted}`);

    
    if (puzzlesCompleted >= totalPuzzles) {
        popupBtn.addEventListener('click', () => {
            closeAllPopups();
            finishLevel();
        }, { once: true }); 
    } else {
        popupBtn.addEventListener('click', () => {
            closeAllPopups();
            loadPuzzle();
        }, { once: true }); 
    }
};
const attachButtonListeners = () => {
    buttons.forEach(button => {
        button.replaceWith(button.cloneNode(true)); 
    });

    const newButtons = document.querySelectorAll('.answer-btn');
    newButtons.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.getAttribute('data-value');
            checkAnswer(answer);
        });
    });
};

  
    const startTimer = () => {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timerElement.textContent = timeLeft;
            } else {
                clearInterval(timer);
                showPopup('Time is Up!', false); 
                canAnswer = false;
                if (puzzlesCompleted >= totalPuzzles) {
                    finishLevel();
                }
            }
        }, 1000);
    };

    const resetTimer = () => {
        clearInterval(timer);
        timeLeft = 30 - (level - 1) * 2;
        timerElement.textContent = timeLeft;
        startTimer();
    };

   
    settingsIcon.addEventListener('click', () => {
        closeAllPopups(); 
        pauseTimer(); 
        settingsPopupOverlay.style.display = 'flex';
    });

    
    settingsCloseBtn.addEventListener('click', () => {
        settingsPopupOverlay.style.display = 'none';
        resumeTimer();
    });

   
    infoIcon.addEventListener('click', () => {
        closeAllPopups(); 
        pauseTimer(); 
        infoPopupOverlay.style.display = 'flex'; 
    });

    
    infoCloseBtn.addEventListener('click', () => {
        infoPopupOverlay.style.display = 'none'; 
        resumeTimer();
    });

   
    settingsPopupOverlay.addEventListener('click', (e) => {
        if (e.target === settingsPopupOverlay) {
            settingsPopupOverlay.style.display = 'none';
            resumeTimer(); 
        }
    });

    infoPopupOverlay.addEventListener('click', (e) => {
        if (e.target === infoPopupOverlay) {
            infoPopupOverlay.style.display = 'none';
            resumeTimer(); 
        }
    });

    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.getAttribute('data-value');
            checkAnswer(answer);
        });
    });

   
    popupBtn.addEventListener('click', closePopup);

    initializePopups();
    loadPuzzle();
});
