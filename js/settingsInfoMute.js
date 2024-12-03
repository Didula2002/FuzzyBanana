document.addEventListener('DOMContentLoaded', () => {
    
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.height = "100vh";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";

    const settingsPopupOverlay = document.getElementById('settings-popup-overlay');
    const infoPopupOverlay = document.getElementById('info-popup-overlay');
    const settingsPopupBox = document.getElementById('settings-popup-box');
    const infoPopupBox = document.getElementById('info-popup-box');
    const settingsCloseBtn = document.getElementById('settings-close-btn');
    const infoCloseBtn = document.getElementById('info-close-btn');


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

    
    const closeAllPopups = () => {
        settingsPopupOverlay.style.display = "none";
        infoPopupOverlay.style.display = "none";
    };

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

    initializePopups();
    addButtonHoverEffects([settingsCloseBtn, infoCloseBtn]);
});
