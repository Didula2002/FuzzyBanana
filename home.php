<?php

include 'config.php';
session_start();
$user_id = $_SESSION['user_id'];

if(!isset($user_id)){
   header('location:login.php');
}

if(isset($_GET['logout'])){
   unset($user_id);
   session_destroy();
   header('location:login.php');
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Settings</title> <!-- Added title -->

   <!-- Custom CSS file link -->
   <link rel="stylesheet" href="css/style.css">
   <script src="js/script.js" defer></script>
   <script src="js/settingsInfoMute.js" defer></script>
</head>
<body>
<div class="game-container">
    <!-- Top-right corner icons -->
    <div class="icons-container">
        <img src="images/settings.png" id="settings-icon" alt="Settings Icon" class="icon">
        <img src="images/info.png" id="info-icon" alt="Info Icon" class="icon">
        <img id="mute-icon" class="icon" src="images/mute_icon.png" alt="Mute Icon">
    </div>
<div class="profile-container">
   <div class="profile-box">
      <!-- Settings Title -->
      <h2 class="page-title">Settings</h2> <!-- Added the title -->

      <?php
         $select = mysqli_query($conn, "SELECT * FROM `user_form` WHERE id = '$user_id'") or die('query failed');
         if(mysqli_num_rows($select) > 0){
            $fetch = mysqli_fetch_assoc($select);
         }
         if($fetch['image'] == ''){
            echo '<img src="images/default-avatar.png" alt="Profile Picture" class="profile-pic">';
         }else{
            echo '<img src="uploaded_img/'.$fetch['image'].'" alt="Profile Picture" class="profile-pic">';
         }
      ?>
      <h3 class="profile-name"><?php echo $fetch['name']; ?></h3>
      <a href="update_profile.php" class="btn">Update Profile</a>
      <a href="home.php?logout=<?php echo $user_id; ?>" class="delete-btn">Logout</a>
      
   </div>
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
        <a href="update_profile.php" class="btn">Update Profile</a>
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
