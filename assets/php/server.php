<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($_FILES['uploaded-file'])) {
        echo 'No file part';
        error_log('No file part');
        exit;
    }
    $file = $_FILES['uploaded-file'];
    if ($file['name'] == '') {
        echo 'No selected file';
        error_log('No selected file');
        exit;
    }
    $uploads_dir = 'uploads';
    if (!is_dir($uploads_dir)) {
        mkdir($uploads_dir, 0777, true);
        if (!is_dir($uploads_dir)) {
            echo 'Failed to create uploads directory';
            error_log('Failed to create uploads directory');
            exit;
        }
    }
    $file_path = $uploads_dir . '/' . basename($file['name']);
    if (!move_uploaded_file($file['tmp_name'], $file_path)) {
        echo 'Failed to move uploaded file';
        error_log('Failed to move uploaded file');
        exit;
    }

    function encryptFile($filePath, $key) {
        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));
        $plaintext = file_get_contents($filePath);
        $ciphertext = openssl_encrypt($plaintext, 'aes-256-cbc', $key, 0, $iv);

        file_put_contents($filePath . '.enc', $iv . $ciphertext);
    }

    $key = openssl_random_pseudo_bytes(32);
    encryptFile($file_path, $key);

    echo 'File encrypted successfully';
    error_log('File encrypted successfully');
}
?>





<!-- Original for old_server.php -->
 <!-- Put back eventually -->
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
