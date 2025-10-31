<?php
/**
 * BOSS İnşaat - Contact Form Handler
 * 
 * This is a simple PHP script to handle contact form submissions.
 * Upload this file to your server if you want to use a custom backend.
 * 
 * Requirements:
 * - PHP 7.0 or higher
 * - Mail function enabled on server
 */

// Configuration
$to_email = "info@bossmuteahhitlik.com"; // Change this to your email
$subject_prefix = "New Contact from BOSS Müteahhitlik Website";

// Enable error reporting for debugging (disable in production)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get POST data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validation
$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required';
}

if (empty($email)) {
    $errors[] = 'Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email format';
}

if (empty($subject)) {
    $errors[] = 'Subject is required';
}

if (empty($message)) {
    $errors[] = 'Message is required';
}

// Return errors if validation fails
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Validation failed',
        'errors' => $errors
    ]);
    exit;
}

// Sanitize data
$name = htmlspecialchars($name);
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars($subject);
$message = htmlspecialchars($message);

// Prepare email
$email_subject = $subject_prefix . " - " . $subject;

$email_body = "
New contact form submission from BOSS İnşaat Website

Name: $name
Email: $email
Subject: $subject

Message:
$message

---
Sent from: " . $_SERVER['HTTP_HOST'] . "
IP Address: " . $_SERVER['REMOTE_ADDR'] . "
Date: " . date('Y-m-d H:i:s') . "
";

// Email headers
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$mail_sent = mail($to_email, $email_subject, $email_body, $headers);

if ($mail_sent) {
    // Success
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully'
    ]);
    
    // Optional: Log submission
    $log_file = 'contact_submissions.log';
    $log_entry = date('Y-m-d H:i:s') . " - $name ($email) - $subject\n";
    file_put_contents($log_file, $log_entry, FILE_APPEND);
    
} else {
    // Failure
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send message. Please try again later.'
    ]);
}

exit;
?>

