<?php
	include "sqldb.php";

	//$enterUser = $_POST['username'];
	//$enterPass = $_POST['password'];
	$secPass = password_hash($enterPass, PASSWORD_BCRYPT);

	$sql = "INSERT INTO accounts(username, password) VALUES " .
                "('$enterUser', '$secPass');";

	echo "Running SQL statement - <br>" . $sql . "<br>";

	if ($conn->query($sql) === TRUE)
	{
	    echo "Record Inserted <br>";
	    header("Location: ../index.php");
        }
	else
	{
            echo "An error has occured. Please try again.";
	}
?>