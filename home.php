<?php

include 'config.php';
include 'footer.php';
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
$starsQuery = "SELECT level, stars FROM player_stats WHERE user_id = '$user_id'";
$starsResult = mysqli_query($conn, $starsQuery);

$starsData = [];
while ($row = mysqli_fetch_assoc($starsResult)) {
    $starsData[$row['level']] = $row['stars'];
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
   
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Settings</title> 

   
   <link rel="stylesheet" href="css/style.css">
   <link rel="stylesheet" href="css/levelsStyle.css">

   <script src="js/settingsInfoMute.js" defer></script>
   <script src="js/levels.js" defer></script>
</head>
<body>
<div class="game-container">
<a href="leaderboard.php" class="leaderboard-btn">Leaderboard</a>

    
    <div class="icons-container">
        <img src="images/settings.png" id="settings-icon" alt="Settings Icon" class="icon">
        <img src="images/info.png" id="info-icon" alt="Info Icon" class="icon">
        
    </div>

    <div class="level-buttons-container">
    <?php for ($i = 1; $i <= 10; $i++): ?>
        <div class="level-button-wrapper">
        <?php if (isset($starsData[$i])): ?>
                <div class="stars">
                    <?php for ($j = 0; $j < $starsData[$i]; $j++): ?>
                        <img src="images/star.png" alt="Star">
                    <?php endfor; ?>
                </div>
            <?php endif; ?>
            <button class="level-btn" data-level="<?php echo $i; ?>"><?php echo $i; ?></button>
            
        </div>
    <?php endfor; ?>
</div>

<!--<div class="profile-container">
   <div class="profile-box">
      
      <h2 class="page-title">Settings</h2>

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
</div>-->
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
