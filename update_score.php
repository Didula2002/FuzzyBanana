<?php
include 'config.php';
include 'footer.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['success' => false, 'error' => 'Invalid input']);
    exit;
}

$user_id = $data['user_id'];
$level = $data['level'];
$stars = $data['stars'];
$score = $data['score'];
$average_correctness = $data['average_correctness'];

// Sanitize inputs
$user_id = mysqli_real_escape_string($conn, $user_id);
$level = mysqli_real_escape_string($conn, $level);
$stars = mysqli_real_escape_string($conn, $stars);
$score = mysqli_real_escape_string($conn, $score);
$average_correctness = mysqli_real_escape_string($conn, $average_correctness);

// Check if level data already exists
$checkQuery = "SELECT * FROM player_stats WHERE user_id = '$user_id' AND level = '$level'";
$result = mysqli_query($conn, $checkQuery);

if (mysqli_num_rows($result) > 0) {
    $query = "UPDATE player_stats SET stars = '$stars', score = '$score', average_correctness = '$average_correctness' 
              WHERE user_id = '$user_id' AND level = '$level'";
} else {
    $query = "INSERT INTO player_stats (user_id, level, stars, score, average_correctness) 
              VALUES ('$user_id', '$level', '$stars', '$score', '$average_correctness')";
}

// Execute query
if (mysqli_query($conn, $query)) {
    // Update overall score
    $overallScoreQuery = "SELECT SUM(score) AS total_score FROM player_stats WHERE user_id = '$user_id'";
    $overallResult = mysqli_query($conn, $overallScoreQuery);
    $row = mysqli_fetch_assoc($overallResult);

    $totalScore = $row['total_score'];

    $updateUserQuery = "UPDATE user_form SET overall_score = '$totalScore' WHERE id = '$user_id'";
    mysqli_query($conn, $updateUserQuery);

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
}
?>
