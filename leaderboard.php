<?php
include 'config.php';
include 'footer.php';

session_start();

// Fetch leaderboard data from the database
function getLeaderboardData($conn, $searchName = null) {
    if ($searchName) {
        $query = "
            SELECT u.name, SUM(p.score) AS total_score
            FROM user_form u
            INNER JOIN player_stats p ON u.id = p.user_id
            WHERE u.name LIKE '%$searchName%'
            GROUP BY u.id
            ORDER BY total_score DESC
        ";
    } else {
        $query = "
            SELECT u.name, SUM(p.score) AS total_score
            FROM user_form u
            INNER JOIN player_stats p ON u.id = p.user_id
            GROUP BY u.id
            ORDER BY total_score DESC
            LIMIT 50
        ";
    }

    $result = mysqli_query($conn, $query);
    $leaderboard = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $leaderboard[] = [
            'name' => $row['name'],
            'total_score' => $row['total_score']
        ];
    }
    return $leaderboard;
}

// If this is an API call
if (isset($_GET['api'])) {
    header('Content-Type: application/json');
    $searchName = isset($_GET['name']) ? $_GET['name'] : null;
    echo json_encode(getLeaderboardData($conn, $searchName));
    exit();
}

// For rendering the HTML
$searchName = isset($_GET['name']) ? $_GET['name'] : null;
$leaderboard = getLeaderboardData($conn, $searchName);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
    <link rel="stylesheet" href="css/leaderboard.css">
    <script src="js/update_profile.js" defer></script>
</head>
<body>
    <div class="leaderboard-container">
        <h1 class="leaderboard-title">Leaderboard</h1>

        <!-- Search Bar -->
        <div class="search-container">
            <form method="get" action="leaderboard.php">
                <input type="text" name="name" placeholder="Search by Name" value="<?= htmlspecialchars($searchName) ?>" />
                <button type="submit">Search</button>
            </form>
        </div>

        <!-- Leaderboard Table -->
        <table class="leaderboard-table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Total Score</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!empty($leaderboard)): ?>
                    <?php foreach ($leaderboard as $index => $entry): ?>
                        <tr>
                            <td><?= $index + 1 ?></td>
                            <td><?= htmlspecialchars($entry['name']) ?></td>
                            <td><?= $entry['total_score'] ?></td>
                        </tr>
                    <?php endforeach; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="3">No results found.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</body>
</html>
