<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($_FILES['uploaded-file'])) {
        echo 'No file part';
        exit;
    }
    $file = $_FILES['uploaded-file'];
    if ($file['name'] == '') {
        echo 'No selected file';
        exit;
    }
    $uploads_dir = 'uploads';
    if (!is_dir($uploads_dir)) {
        mkdir($uploads_dir, 0777, true);
    }
    $file_path = $uploads_dir . '/' . basename($file['name']);
    move_uploaded_file($file['tmp_name'], $file_path);

    function encryptFile($filePath, $key, $method) {
        $iv_length = openssl_cipher_iv_length($method);
        $iv = openssl_random_pseudo_bytes($iv_length);
        $plaintext = file_get_contents($filePath);
        $ciphertext = openssl_encrypt($plaintext, $method, $key, 0, $iv);

        if ($ciphertext === false) {
            echo 'Encryption failed';
            return;
        }

        file_put_contents($filePath . '.enc', $iv . $ciphertext);
    }

    $key = openssl_random_pseudo_bytes(32);
    $method = $_POST['encryption-method'];

    // Validate if method is supported
    if (in_array($method, openssl_get_cipher_methods())) {
        encryptFile($file_path, $key, $method);
        echo 'File encrypted successfully using ' . htmlspecialchars($method);
    } else {
        echo 'Unsupported encryption method: ' . htmlspecialchars($method);
    }
}
?>