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

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $aes256Key = bin2hex(random_bytes(32));
    $aes128Key = bin2hex(random_bytes(16));
    $tripleDesKey = bin2hex(random_bytes(24));

    try {
        $stmt = $pdo->prepare("INSERT INTO Users (username, password, `AES-256`, `AES-128`, `TripleDES`) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$username, $hashedPassword, $aes256Key, $aes128Key, $tripleDesKey]);

        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;

        echo json_encode(['success' => true, 'message' => 'Registration successful.']);
        exit;
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            echo json_encode(['success' => false, 'message' => 'Username already taken.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
        }
        exit;
    }
}
?>