<?php

include 'config.php';
session_start();
$user_id = $_SESSION['user_id'];

if (!isset($user_id)) {
    header('location:login.php');
}

if (isset($_GET['logout'])) {
    unset($user_id);
    session_destroy();
    header('location:login.php');
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Banana Puzzle Game</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/gameScript.js" defer></script>
    <script src="js/script.js" defer></script>
</head>
<body>

<div class="game-container">
    <!-- Top-right corner icons -->
    <div class="icons-container">
        <img src="images/settings.png" id="settings-icon" alt="Settings Icon" class="icon">
        <img src="images/info.png" id="info-icon" alt="Info Icon" class="icon">
        <img id="mute-icon" class="icon" src="images/mute_icon.png" alt="Mute Icon">
    </div>

    <!-- Game Info -->
    <div class="game-info">
        <div class="score">Score: <span id="score">0</span></div>
        <div class="level">Level: <span id="level">1</span></div>
        <div class="timer">Time: <span id="time">30</span></div>
    </div>

    <!-- Rabbit Characters -->
    <div class="rabbits-container">
        <img src="images/search.gif" alt="Blue Rabbit" class="rabbit" id="left-rabbit">
        <img src="images/jump.gif" alt="Pink Rabbit" class="rabbit" id="right-rabbit">
    </div>

    <!-- Puzzle Container -->
    <div class="puzzle-container">
        <img id="puzzle-image" src="" alt="Puzzle" class="puzzle-image">
    </div>

    <!-- Answer Buttons -->
    <div class="answer-buttons">
        <button class="answer-btn" data-value="0">0</button>
        <button class="answer-btn" data-value="1">1</button>
        <button class="answer-btn" data-value="2">2</button>
        <button class="answer-btn" data-value="3">3</button>
        <button class="answer-btn" data-value="4">4</button>
        <button class="answer-btn" data-value="5">5</button>
        <button class="answer-btn" data-value="6">6</button>
        <button class="answer-btn" data-value="7">7</button>
        <button class="answer-btn" data-value="8">8</button>
        <button class="answer-btn" data-value="9">9</button>
    </div>
</div>

<!-- Popup Windows -->
<div class="popup-overlay" id="popup-overlay">
    <div class="popup-box" id="popup-box">
        <h3 id="popup-message"></h3> <!-- Title dynamically updated via JavaScript -->
        <p id="correct-answer" class="correct-answer"></p>
        <button class="popup-btn" id="popup-btn">Next</button> <!-- Updated text -->
    </div>
</div>

<div class="popup-overlay" id="settings-popup-overlay">
    <div class="popup-box" id="settings-popup-box">
        <!-- Settings Title -->
        <h3 class="settings-title">Settings</h3>

        <!-- PHP Code to Fetch Profile Picture and Name -->
        <?php
        $select = mysqli_query($conn, "SELECT * FROM `user_form` WHERE id = '$user_id'") or die('query failed');
        if (mysqli_num_rows($select) > 0) {
            $fetch = mysqli_fetch_assoc($select);
        }
        ?>

        <!-- Display Profile Picture -->
        <?php if ($fetch['image'] == ''): ?>
            <img src="images/default-avatar.png" alt="Profile Picture" class="settings-profile-pic">
        <?php else: ?>
            <img src="uploaded_img/<?php echo $fetch['image']; ?>" alt="Profile Picture" class="settings-profile-pic">
        <?php endif; ?>

        <!-- Display User Name -->
        <h2 class="settings-profile-name"><?php echo $fetch['name']; ?></h2>

        <!-- Logout Button -->
        <a href="home.php?logout=<?php echo $user_id; ?>" class="settings-logout-btn">Logout</a>

        <!-- Close Button -->
        <button class="popup-btn" id="settings-close-btn">Close</button>
    </div>
</div>


<!-- Info Popup -->
<div id="info-popup-overlay" class="popup-overlay">
    <div id="info-popup-box" class="popup-box">
        <h3 class="popup-title">Information</h3>
        <p class="info-text">
            Help Fuzzy get the banana! <br>
            Solve number puzzles to find the <br>correct number for the banana image. <br>
            Win bananas and make Bunny happy!
        </p>
        <img class="info-image" src="images/rabbit.png" alt="Fuzzy the Rabbit" />
        <button id="info-close-btn" class="popup-btn">Close</button>
    </div>
</div>

</body>
</html>
