<?php

// https://github.com/pinceladasdaweb/Simple-PHP-Contact-Form/

$subject = 'A to Z Driving School - Booking';
$emailTo = 'Roni Henig<atozdrivingschool@gmail.com>';

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name    = stripslashes(trim($_POST['name']));
    $email   = stripslashes(trim($_POST['email']));
    $phone   = stripslashes(trim($_POST['phone']));
    $package = stripslashes(trim($_POST['package']));
    $message = stripslashes(trim($_POST['message']));
    $pattern = '/[\r\n]|Content-Type:|Bcc:|Cc:/i';

    if (preg_match($pattern, $name) || preg_match($pattern, $email) || preg_match($pattern, $subject)) {
        die("Header injection detected");
    }

    $emailIsValid = filter_var($email, FILTER_VALIDATE_EMAIL);

    if($name && $email && $emailIsValid && $subject && $message){
        $body = "<h1>A to Z Driving School - Booking via Website</h1>
                <p><strong>Customer Name</strong>: <br> $name </p>
                <p><strong>Customer Email</strong>: <br> $email </p>
                <p><strong>Customer Phone</strong>: <br> $phone </p>
                <p><strong>Package Selected</strong>: <br> $package </p>
                <p><strong>Message</strong>: <br> $message </p>";

        $headers  = 'MIME-Version: 1.1' . PHP_EOL;
        $headers .= 'Content-type: text/html; charset=utf-8' . PHP_EOL;
        $headers .= "From: $name <$email>" . PHP_EOL;
        $headers .= "Return-Path: $emailTo" . PHP_EOL;
        $headers .= "Reply-To: $name <$email>" . PHP_EOL;
        //$headers .= "X-Mailer: PHP/". phpversion() . PHP_EOL; // was flagging emails as spam

        mail($emailTo, $subject, $body, $headers);
        $emailSent = true;
    } else {
        $hasError = true;
    }
}
?>

<div class="text-left">
  <h3 class="heading-white heading-thank-you">Thank you for your enquiry!</h3>
  <p>
    One of our friendly staff will be in contact with you as soon as possible.
  </p>
</div>