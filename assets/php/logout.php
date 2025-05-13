<?php
<?php
session_start();
session_destroy(); // Destroys the session
http_response_code(200); // Sends a success response
exit;
?>