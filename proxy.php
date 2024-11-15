<?php
// Display errors for debugging (remove in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

$apiUrl = 'http://marcconrad.com/uob/banana/api.php';
$response = null;

// Fetch a new puzzle with its solution
if ($_GET['action'] === 'fetch') {
    $apiUrl .= '?out=json&base64=yes';
    $response = @file_get_contents($apiUrl);

    if ($response !== false) {
        $data = json_decode($response, true);

        // Include the solution (for local validation)
        if (isset($data['solution'])) {
            $data['solution'] = base64_encode($data['solution']); // Obfuscate the solution
        }

        header('Content-Type: application/json');
        echo json_encode($data);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to connect to external API']);
    }
    exit();
}

// Handle invalid requests
http_response_code(400);
echo json_encode(['error' => 'Invalid request']);
?>
