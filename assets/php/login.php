<?php
session_start();
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST["username"]);
    $password = trim($_POST["password"]);

    if (empty($username) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Username and password are required.']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM Users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        $_SESSION['userID'] = $user['userID'];

        echo json_encode(['success' => true, 'message' => 'Login successful.']);
        exit;
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid username or password.']);
        exit;
    }
}
?>