<?php
session_start();

//Checks if the user is logged in
$isLoggedIn = isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true;

//Returns a JSON response
header('Content-Type: application/json');
echo json_encode(['isLoggedIn' => $isLoggedIn, 'username' => $_SESSION['username'] ?? null]);
exit;
?>