<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Starts the session
session_start();
require 'db.php';

header('Content-Type: application/json');

// Checks if the user is logged in
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    echo json_encode(['success' => false, 'message' => 'User not logged in.']);
    exit;
}

// Gets the logged-in users userID
$userID = $_SESSION['userID'];

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        try {
            $stmt = $pdo->prepare("SELECT ID, website, password FROM `manager` WHERE userID = ?");
            $stmt->execute([$userID]);
            $passwords = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(['success' => true, 'passwords' => $passwords]);
            exit;
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Error fetching passwords: ' . $e->getMessage()]);
            exit;
        }

    case 'POST': // Add a new password
        $website = isset($_POST['website']) ? trim($_POST['website']) : null;
        $password = isset($_POST['password']) ? trim($_POST['password']) : null;

        if (empty($website) || empty($password)) {
            echo json_encode(['success' => false, 'message' => 'Website and password are required.']);
            exit;
        }

        try {
            $stmt = $pdo->prepare("INSERT INTO `manager` (userID, website, password) VALUES (?, ?, ?)");
            $stmt->execute([$userID, $website, $password]);

            echo json_encode(['success' => true, 'message' => 'Password saved successfully.']);
            exit;
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Error saving password: ' . $e->getMessage()]);
            exit;
        }

    case 'PUT': // Update a password
        $inputData = json_decode(file_get_contents("php://input"), true);
        $id = isset($inputData['id']) ? $inputData['id'] : null;
        $newPassword = isset($inputData['password']) ? trim($inputData['password']) : null;

        if (empty($id) || empty($newPassword)) {
            echo json_encode(['success' => false, 'message' => 'ID and new password are required.']);
            exit;
        }

        try {
            $stmt = $pdo->prepare("UPDATE `manager` SET password = ? WHERE ID = ? AND userID = ?");
            $stmt->execute([$newPassword, $id, $userID]);

            if ($stmt->rowCount() > 0) {
                echo json_encode(['success' => true, 'message' => 'Password updated successfully.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Password not found or you do not have permission to update it.']);
            }
            exit;
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Error updating password: ' . $e->getMessage()]);
            exit;
        }

    case 'DELETE': // Delete a password
        $inputData = json_decode(file_get_contents("php://input"), true);
        $id = isset($inputData['id']) ? $inputData['id'] : null;

        if (empty($id)) {
            echo json_encode(['success' => false, 'message' => 'ID is required.']);
            exit;
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM `manager` WHERE ID = ? AND userID = ?");
            $stmt->execute([$id, $userID]);

            if ($stmt->rowCount() > 0) {
                echo json_encode(['success' => true, 'message' => 'Password deleted successfully.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Password not found or you do not have permission to delete it.']);
            }
            exit;
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Error deleting password: ' . $e->getMessage()]);
            exit;
        }

    default:
        echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
        exit;
}
?>


