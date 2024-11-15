document.addEventListener('DOMContentLoaded', function () {
    // Set the body background
    const body = document.body;
    body.style.backgroundImage = "url('images/background.jpg')";
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";
    body.style.height = "100vh";
    body.style.display = "flex";
    body.style.justifyContent = "center";
    body.style.alignItems = "center";

    // Get the form container
    const formContainer = document.querySelector('.form-container');

    // Check if we are on the register page, login page, or home page based on the current URL
    if (window.location.pathname.includes('register.php')) {
        // If it's the register page, use 'signin.png' as the background
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
        // For the login page, use 'login.png' as the background
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
        // If it's the home page, set 'login.png' as the background image
        formContainer.style.backgroundImage = "url('images/login.png')";
        body.style.backgroundSize = "cover"; // Ensure the image covers the whole screen
        body.style.backgroundPosition = "center"; // Center the background image
        body.style.backgroundRepeat = "no-repeat"; // Prevent background repetition

        // Make the form container (profile-box) transparent without a solid background
        const profileBox = document.querySelector('.profile-box');
        if (profileBox) {
            profileBox.style.background = "none"; // No background for the profile box
            profileBox.style.boxShadow = "none"; // Remove any shadow
        }
    }

    
});
