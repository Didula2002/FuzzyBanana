<?php
// Start the session if needed
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Loading Screen</title>
    <style>
        /* General body styling */
        body {
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden; /* Hide scrollbars */
        }

        /* Video styling */
        video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover; /* Ensure the video covers the entire viewport */
            z-index: -1; /* Send the video behind other elements */
        }

        /* Start button styling */
        .start-button {
            position: absolute;
            bottom: 50px; /* Adjust the button position */
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 40px; /* Button size */
            font-size: 24px; /* Font size */
            font-weight: bold;
            color: #fff; /* White text */
            background-color: #23df33; /* Green background */
            border: none;
            border-radius: 10px; /* Rounded corners */
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        /* Hover effect for the start button */
        .start-button:hover {
            background-color: #1eb82b; /* Slightly darker green on hover */
           
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); /* Subtle shadow */
            
        }
    </style>
</head>
<body>
    <!-- Background video -->
    <video autoplay muted loop>
        <source src="images/loadingscreen.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>

    <!-- Start Button -->
    <button class="start-button" onclick="navigateToLogin()">START</button>

    <script>
        // JavaScript function to navigate to login.php
        function navigateToLogin() {
            window.location.href = 'login.php';
        }
    </script>
</body>
</html>
