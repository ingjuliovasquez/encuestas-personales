<?php

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require_once "vendor/autoload.php";

// Set Data Form
$name = $_POST['name'];
$email = $_POST['email'];

//PHPMailer Object
$mail = new PHPMailer(true); //Argument true in constructor enables exceptions

//Enable SMTP debugging.
$mail->SMTPDebug = 3;
//Set PHPMailer to use SMTP.
$mail->isSMTP();
//Set SMTP host name
$mail->Host = "smtp.gmail.com";
//Set this to true if SMTP host requires authentication to send email
$mail->SMTPAuth = true;
//Provide username and password
$mail->Username = "ingjuliovasquez@gmail.com";
$mail->Password = "nzdhnwadxwhlwppl";
//If SMTP requires TLS encryption then set it
$mail->SMTPSecure = "tls";
//Set TCP port to connect to
$mail->Port = 587;

//From email address and name
$mail->From = "from@yourdomain.com";
$mail->FromName = "Encuestas Personales";

//To address and name
$mail->addAddress($email, $name);

//Send HTML or Plain Text email
$mail->isHTML(true);

// Activo condificacción utf-8
$mail->CharSet = 'UTF-8';

$mail->Subject = "¡Gracias por tu tiempo!";
$mail->Body = "Estimado usuario, hemos recibido su encuesta, la cual fue registrada con exito en nuestra base de datos, agradecemos mucho el tiempo que a dedicado. <br><br> Att: Equipo de Soporte.";

try {
    $mail->send();

    return json_encode(true);
} catch (Exception $e) {
    return json_encode("error al enviar el correo" . $e);
    echo "Mailer Error: " . $mail->ErrorInfo;
}
