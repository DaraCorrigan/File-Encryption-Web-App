<?php
function decryptFile($filePath, $key, $method) {
    $iv_length = openssl_cipher_iv_length($method);
    $ciphertext = file_get_contents($filePath);
    $iv = substr($ciphertext, 0, $iv_length);
    $ciphertext = substr($ciphertext, $iv_length);

    $plaintext = openssl_decrypt($ciphertext, $method, $key, 0, $iv);
    if ($plaintext === false) {
        echo 'Decryption failed';
        return;
    }

    file_put_contents('decrypted_' . basename($filePath, '.enc'), $plaintext);
}

$key = openssl_random_pseudo_bytes(32);
$method = 'aes-256-cbc';
$file_path = 'path/to/encrypted/file.enc';

decryptFile($file_path, $key, $method);
echo 'File decrypted successfully';
?>