<?php
// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require __DIR__ . '/../../vendor/autoload.php';

// Load environment variables from .env file
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        // Server settings
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable for verbose debug output
        $mail->isSMTP();                                            // Send using SMTP
        $mail->Host       = $_ENV['SMTP_HOST'];                       // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = $_ENV['SMTP_USER'];                 // SMTP username
        $mail->Password   = $_ENV['SMTP_PASS'];                    // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            // Enable implicit TLS encryption
        $mail->Port       = $_ENV['SMTP_PORT'];                                    // TCP port to connect to

        // Recipients
        $mail->setFrom(htmlspecialchars($_POST['email']), htmlspecialchars($_POST['name']));
        $mail->addAddress('mahxmotloung438@gmail.com', 'Moeketsi Motloung');     // Your receiving email

        // Content
        $mail->isHTML(false);                                  // Set email format to plain text
        $mail->Subject = 'New Message From Your Portfolio Website';
        $mail->Body    = "Name: " . htmlspecialchars($_POST['name']) . "\n";
        $mail->Body   .= "Email: " . htmlspecialchars($_POST['email']) . "\n\n";
        $mail->Body   .= "Message:\n" . htmlspecialchars($_POST['message']);

        $mail->send();
        echo "<script>alert('Your message has been sent successfully!'); window.location.href='../index.html#contact';</script>";
    } catch (Exception $e) {
        // For debugging, you could uncomment the line below
        // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        echo "<script>alert('Failed to send message. Please try again later.'); window.location.href='../index.html#contact';</script>";
    }
}
?>
