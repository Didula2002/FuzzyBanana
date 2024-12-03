document.addEventListener('DOMContentLoaded', function () {

    const body = document.body;
    body.style.backgroundImage = "url('images/update_profile_back.jpg')";
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";
    body.style.height = "100vh";
    body.style.display = "flex";
    body.style.justifyContent = "center";
    body.style.alignItems = "center";


    const formContainer = document.querySelector('.form-container');


    if (window.location.pathname.includes('register.php')) {
        
        formContainer.style.backgroundImage = "url('images/signin.png')";
        formContainer.style.width = "90%";
        formContainer.style.maxWidth = "1600px";
        formContainer.style.height = "800px";

        const button = document.querySelector('.btn');
        button.style.backgroundImage = "url('images/button2.png')";
        button.style.backgroundSize = "cover";
        button.style.backgroundPosition = "center";
        
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.transition = 'transform 0.3s ease';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });

    } else if (window.location.pathname.includes('login.php')) {
        
        formContainer.style.backgroundImage = "url('images/login.png')";
        
        const button = document.querySelector('.btn');
        button.style.backgroundImage = "url('images/button.png')";
        button.style.backgroundSize = "cover";
        button.style.backgroundPosition = "center";

        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.transition = 'transform 0.3s ease';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });

    } else if (window.location.pathname.includes('home.php')) {
        
        formContainer.style.backgroundImage = "url('images/login.png')";
        body.style.backgroundSize = "cover"; 
        body.style.backgroundPosition = "center"; 
        body.style.backgroundRepeat = "no-repeat";

        
        const profileBox = document.querySelector('.profile-box');
        if (profileBox) {
            profileBox.style.background = "none"; 
            profileBox.style.boxShadow = "none"; 
        }
    }

    
});
