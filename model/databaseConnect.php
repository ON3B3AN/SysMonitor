<<<<<<< Updated upstream
<?php
$dsn = 'mysql:host=localhost;dbname=';
$username = '';
$password = '';

try {
    $db = new PDO($dsn, $username, $password);
} catch (PDOException $e) {
    exit;
}
=======
<?php
$dsn = 'mysql:host=localhost;dbname=';
$username = '';
$password = '';

try {
    $db = new PDO($dsn, $username, $password);
} catch (PDOException $e) {
    exit;
}
>>>>>>> Stashed changes
?>
