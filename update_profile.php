<?php
include 'config.php';
session_start();
$user_id = $_SESSION['user_id'];

if (!isset($user_id)) {
    header('location:login.php');
    exit;
}

if (isset($_POST['update_profile'])) {
    // Fetch the data from the form
    $update_name = mysqli_real_escape_string($conn, $_POST['update_name']);
    $update_email = mysqli_real_escape_string($conn, $_POST['update_email']);

    // Update name and email
    mysqli_query($conn, "UPDATE `user_form` SET name = '$update_name', email = '$update_email' WHERE id = '$user_id'") or die('Query failed');

    // Password Update Logic (Only if the new password is entered)
    $new_pass = isset($_POST['new_pass']) ? mysqli_real_escape_string($conn, $_POST['new_pass']) : ''; // The new password (plain)
    $confirm_pass = isset($_POST['confirm_pass']) ? mysqli_real_escape_string($conn, $_POST['confirm_pass']) : ''; // The confirm password (plain)

    if (!empty($new_pass) || !empty($confirm_pass)) {
        // Compare New Password with Confirm Password
        if ($new_pass != $confirm_pass) {
            $message[] = 'New password and confirm password do not match!';
        } else {
            // Hash the new password
            $new_pass_hashed = md5($new_pass); // Hash the new password
            mysqli_query($conn, "UPDATE `user_form` SET password = '$new_pass_hashed' WHERE id = '$user_id'") or die('Query failed');
            $message[] = 'Password updated successfully!';
        }
    }

    // Handle Profile Image Update
    $update_image = $_FILES['update_image']['name'];
    $update_image_size = $_FILES['update_image']['size'];
    $update_image_tmp_name = $_FILES['update_image']['tmp_name'];
    $update_image_folder = 'uploaded_img/' . $update_image;

    if (!empty($update_image)) {
        if ($update_image_size > 2000000) {
            $message[] = 'Image is too large!';
        } else {
            $image_update_query = mysqli_query($conn, "UPDATE `user_form` SET image = '$update_image' WHERE id = '$user_id'") or die('Query failed');
            if ($image_update_query) {
                move_uploaded_file($update_image_tmp_name, $update_image_folder);
                $message[] = 'Image updated successfully!';
            }
        }
    }
}

// Fetch the user data
$select = mysqli_query($conn, "SELECT * FROM `user_form` WHERE id = '$user_id'") or die('Query failed');
if (mysqli_num_rows($select) > 0) {
    $fetch = mysqli_fetch_assoc($select);
} else {
    $fetch = [
        'name' => '',
        'email' => '',
        'image' => '',
        'password' => ''
    ];
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Profile</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/settingsInfoMute.js" defer></script>
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

    <div class="update-form-container">
        <form action="" method="post" enctype="multipart/form-data" class="update-profile-form">
            <h3>Update Profile</h3>

            <!-- Profile Picture -->
            <div class="update-profile-row">
                <div class="update-profile-picture">
                    <?php if (empty($fetch['image'])): ?>
                        <img src="images/default-avatar.png" alt="Default Avatar" class="update-profile-pic">
                    <?php else: ?>
                        <img src="uploaded_img/<?php echo $fetch['image']; ?>" alt="Profile Picture" class="update-profile-pic">
                    <?php endif; ?>
                </div>
            </div>

            <!-- Row 1: Name, Email, Image -->
            <div class="update-profile-row">
                <div class="update-input-group">
                    <label for="update_name">Username:</label>
                    <input type="text" name="update_name" id="update_name" value="<?php echo $fetch['name']; ?>" required>
                </div>
                <div class="update-input-group">
                    <label for="update_email">Email:</label>
                    <input type="email" name="update_email" id="update_email" value="<?php echo $fetch['email']; ?>" required>
                </div>
                <div class="update-input-group">
                    <label for="update_image">Profile Picture:</label>
                    <input type="file" name="update_image" id="update_image" accept="image/jpg, image/jpeg, image/png">
                </div>
            </div>

            <!-- Row 2: Password Field -->
            <div class="update-profile-row">
                <div class="update-input-group">
                    <label for="new_password">New Password:</label>
                    <input type="password" name="new_pass" id="new_password" placeholder="Enter New Password">
                </div>
                <div class="update-input-group">
                    <label for="confirm_password">Confirm New Password:</label>
                    <input type="password" name="confirm_pass" id="confirm_password" placeholder="Confirm New Password">
                </div>
            </div>

            <!-- Buttons -->
            <div class="update-profile-buttons">
                <input type="submit" name="update_profile" value="Update Profile" class="update-btn">
                <a href="home.php" class="update-back-btn">Go Back</a>
            </div>

            <!-- Show Messages -->
            <?php
                if (isset($message)) {
                    foreach ($message as $message) {
                        echo '<div class="message">'.$message.'</div>';
                    }
                }
            ?>
        </form>
    </div>
</div>

<!-- Settings Popup -->
<div class="popup-overlay" id="settings-popup-overlay">
    <div class="popup-box" id="settings-popup-box">
        <h3 class="settings-title">Settings</h3>

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