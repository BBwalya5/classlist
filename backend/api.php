<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "class_database";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set headers to allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Check request method
$method = $_SERVER['REQUEST_METHOD'];

// Handle GET request to retrieve class list
if ($method === 'GET') {
    // Retrieve class list data from the database
    $sql = "SELECT student_name, student_id FROM class_list";
    $result = $conn->query($sql);

    // Check if any rows were returned
    if ($result->num_rows > 0) {
        // Output data of each row
        $class_list = array();
        while($row = $result->fetch_assoc()) {
            $class_list[] = $row;
        }
        echo json_encode($class_list);
    } else {
        echo json_encode(array('message' => 'No students in the class list.'));
    }
}

// Handle POST request to add a new student to the class list
if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'];
    $id = $data['id'];

    // Insert data into the class_list table
    $sql = "INSERT INTO class_list (student_name, student_id) VALUES ('$name', '$id')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array('message' => 'Student added successfully'));
    } else {
        echo json_encode(array('message' => 'Error: ' . $conn->error));
    }
}

// Handle DELETE request to remove a student from the class list
if ($method === 'DELETE') {
    parse_str(file_get_contents("php://input"), $data);
    $id = $data['id'];

    // Delete student from the class_list table
    $sql = "DELETE FROM class_list WHERE student_id = '$id'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array('message' => 'Student deleted successfully'));
    } else {
        echo json_encode(array('message' => 'Error: ' . $conn->error));
    }
}

$conn->close();
?>
