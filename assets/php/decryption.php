<?php
session_start();
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Checks if the user is logged in
    if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
        echo 'User not logged in.';
        exit;
    }

    // Gets the logged-in users ID
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

    // Creates a folder in the server for the user if it doesn't exist
    $userFolder = 'uploads/' . $userID;
    if (!is_dir($userFolder)) {
        mkdir($userFolder, 0777, true);
    }

    // Moves the uploaded file to the users folder
    $file_path = $userFolder . '/' . basename($file['name']);
    move_uploaded_file($file['tmp_name'], $file_path);

    // Function to decrypt the file
    function decryptFile($filePath, $key, $method) {
        $encryptedData = file_get_contents($filePath);
        $iv_length = openssl_cipher_iv_length($method);
        $iv = substr($encryptedData, 0, $iv_length);
        $ciphertext = substr($encryptedData, $iv_length);

        $plaintext = openssl_decrypt($ciphertext, $method, $key, 0, $iv);

        if ($plaintext === false) {
            echo 'Decryption failed';
            return false;
        }

        $decryptedFilePath = str_replace('.enc', '', $filePath);
        file_put_contents($decryptedFilePath, $plaintext);
        unlink($filePath);
        return true;
    }

$method = strtoupper($_POST['decryption-method']);
if (!str_contains($method, '-CBC')) {
    $method .= '-CBC';
}

$methodMapping = [
    'AES-256-CBC' => 'AES-256',
    'AES-128-CBC' => 'AES-128',
    'TRIPLE DES-CBC' => 'TripleDES',
];

if (!isset($methodMapping[$method])) {
    echo 'Unsupported decryption method: ' . htmlspecialchars($method);
    exit;
}

    $columnName = $methodMapping[$method];

    // Retrieves the user's decryption key for the selected method
    try {
        $stmt = $pdo->prepare("SELECT `AES-256`, `AES-128`, `TripleDES` FROM `Users` WHERE userID = ?");
        $stmt->execute([$userID]);
        $userKeys = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$userKeys || empty($userKeys[$columnName])) {
            echo 'Decryption key for the selected method not found.';
            exit;
        }

        $key = $userKeys[$columnName]; // Gets the key for the selected decryption method
    } catch (PDOException $e) {
        echo 'Error retrieving decryption key: ' . $e->getMessage();
        exit;
    }

    // Decrypts the file
    if (decryptFile($file_path, $key, $method)) {
        echo 'File decrypted successfully using ' . htmlspecialchars($method);
    } else {
        echo 'File decryption failed.';
    }
}
?>