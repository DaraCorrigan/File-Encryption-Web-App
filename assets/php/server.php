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

    function encryptFile($filePath, $key) {
        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));
        $plaintext = file_get_contents($filePath);
        $ciphertext = openssl_encrypt($plaintext, 'aes-256-cbc', $key, 0, $iv);

        file_put_contents($filePath . '.enc', $iv . $ciphertext);
    }

    $key = openssl_random_pseudo_bytes(32);
    encryptFile($file_path, $key);

    echo 'File encrypted successfully';
}
?>