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
        // Inserts the user details in the database
        $stmt = $pdo->prepare("INSERT INTO Users (username, password, `AES-256`, `AES-128`, `TripleDES`) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$username, $hashedPassword, $aes256Key, $aes128Key, $tripleDesKey]);

        // Retrieves the userID of the new user
        $userID = $pdo->lastInsertId();

        // Clears the session to prevent any conflicts with the previous users data
        session_unset();
        session_destroy();
        session_start();

        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        $_SESSION['userID'] = $userID; // Stores the userID in the session for tools like password manager

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