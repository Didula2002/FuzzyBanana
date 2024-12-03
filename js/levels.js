document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game-container');

    const mapImagePath = 'images/map.png'; 
    const mapHeight = 8750; 
    const mapWidth = 1400; 

    
    gameContainer.style.backgroundImage = `url('${mapImagePath}')`;
    gameContainer.style.backgroundSize = 'cover'; 
    gameContainer.style.backgroundRepeat = 'no-repeat';
    gameContainer.style.backgroundPosition = 'top center';
    gameContainer.style.height = `${mapHeight}px`; 

   
    document.body.style.height = `${mapHeight}px`;
    document.body.style.overflowY = 'scroll';

    const levelPositions = [
        { top: 1030, left: '38%' },   
        { top: 1280, left: '57%' },  
        { top: 1630, left: '46%' }, 
        { top: 2030, left: '46%' }, 
        { top: 2270, left: '68%' }, 
        { top: 2670, left: '57%' },   
        { top: 3070, left: '72%' },  
        { top: 3470, left: '55%' },  
        { top: 3870, left: '44%' },  
        { top: 4270, left: '30%' }, 
    ];

    
    const levelButtonWrappers = document.querySelectorAll('.level-button-wrapper');

    levelButtonWrappers.forEach((wrapper, index) => {
        const position = levelPositions[index];

        wrapper.style.position = 'absolute';
        wrapper.style.top = `${position.top}px`;
        wrapper.style.left = position.left;
        wrapper.style.transform = 'translateX(-50%)'; 

        const button = wrapper.querySelector('.level-btn');
        if (button) {
            
            const buttonImagePath = 'images/levelbutton.png'; 
            button.style.backgroundImage = `url('${buttonImagePath}')`;
            button.style.backgroundSize = 'cover'; 
            button.style.backgroundPosition = 'center';
            button.style.width = '150px'; 
            button.style.height = '150px';
            button.style.borderRadius = '50%'; 
            button.style.border = 'none'; 
            button.style.cursor = 'pointer'; 
            button.style.transition = 'transform 0.3s ease'; 
            button.style.fontSize = '50px'; 
            button.style.color = '#53442f'; 
            button.style.fontWeight = 'bold'; 
            button.style.display = 'flex'; 
            button.style.justifyContent = 'center';
            button.style.alignItems = 'center';
            button.style.lineHeight = '0.9'; 
            button.style.paddingBottom = '35px'; 
        }

        const starsContainer = wrapper.querySelector('.stars');
        if (starsContainer) {
            starsContainer.style.position = 'absolute';
            starsContainer.style.top = '-70px'; 
            starsContainer.style.left = '50%';
            starsContainer.style.transform = 'translateX(-50%)';
            starsContainer.style.display = 'flex'; 
            starsContainer.style.gap = '7px'; 
        }

        button.addEventListener('click', () => {
            const level = button.getAttribute('data-level');
            window.location.href = `game.php?level=${level}`;
        });
    });
});