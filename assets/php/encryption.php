<?php
session_start();
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Checks if the user is logged in
    if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
        echo 'User not logged in.';
        exit;
    }

    // Gets the logged-in user's ID
    $userID = $_SESSION['userID'];

    // Checks if a file was uploaded
    if (!isset($_FILES['uploaded-file'])) {
        echo 'No file part';
        exit;
    }
    $file = $_FILES['uploaded-file'];
    if ($file['name'] == '') {
        echo 'No selected file';
        exit;
    }

    // Creates a folder for the user with the name as their userID if it doesn't already exist
    $userFolder = 'uploads/' . $userID;
    if (!is_dir($userFolder)) {
        mkdir($userFolder, 0777, true);
    }

    // Move the uploaded file to the users folder
    $file_path = $userFolder . '/' . basename($file['name']);
    move_uploaded_file($file['tmp_name'], $file_path);

    // Function to encrypt the file
    function encryptFile($filePath, $key, $method) {
        $iv_length = openssl_cipher_iv_length($method);
        $iv = openssl_random_pseudo_bytes($iv_length);
        $plaintext = file_get_contents($filePath);
        $ciphertext = openssl_encrypt($plaintext, $method, $key, 0, $iv);

        if ($ciphertext === false) {
            echo 'Encryption failed';
            return false;
        }

        file_put_contents($filePath . '.enc', $iv . $ciphertext);
        unlink($filePath);
        return true;
    }

$method = strtoupper($_POST['encryption-method']);
$methodMapping = [
    'AES-256-CBC' => 'AES-256',
    'AES-128-CBC' => 'AES-128',
    'DES-EDE3-CBC' => 'TripleDES',
];

if (!isset($methodMapping[$method])) {
    echo 'Unsupported encryption method: ' . htmlspecialchars($method);
    exit;
}

$columnName = $methodMapping[$method];

    // Retrieves the users unique encryption key for the selected method from the database
    try {
        $stmt = $pdo->prepare("SELECT `AES-256`, `AES-128`, `TripleDES` FROM `Users` WHERE userID = ?");
        $stmt->execute([$userID]);
        $userKeys = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$userKeys || empty($userKeys[$columnName])) {
            echo 'Encryption key for the selected method not found.';
            exit;
        }

        $key = $userKeys[$columnName]; // Gets the key for the selected encryption method
    } catch (PDOException $e) {
        echo 'Error retrieving encryption key: ' . $e->getMessage();
        exit;
    }

    // Encrypts the file
    if (encryptFile($file_path, $key, $method)) {
        echo 'File encrypted successfully using ' . htmlspecialchars($method);
    } else {
        echo 'File encryption failed.';
    }
}
?>


