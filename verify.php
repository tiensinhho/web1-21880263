<?php

if($_SERVER['REQUEST_METHOD']=="POST"){
    // $_POST = json_decode(file_get_contents('php://input'), true);
    if (isset($_POST) && isset($_POST['g-recaptcha-response'])) {
        $secretKey = '6LeFmZIoAAAAAIKjM1uzEuxL-i6piOqe8nryvNFk';
        $token = $_POST['g-recaptcha-response'];
        $ip = $_SERVER['REMOTE_ADDR'];

        $url = "https://www.google.com/recaptcha/api/siteverify?secret=".$secretKey."&response=".$token;
        $request = file_get_contents($url);
        $response = json_decode($request); 

        if ($response->success && $response->action == 'submit' && $response->score >= 0.5) {
            header('HTTP/1.1 200 OK');
        } else {
            header('HTTP/1.1 401 Unauthorized');
        }
        
        echo json_encode($response);
        exit();
    } 
}
?>