<?php

if($_SERVER['REQUEST_METHOD']=="POST"){

    if(isset = $_POST['g-token'];
        $token = $_POST['g-token'];
        $url = 'https://www.google.com/recaptcha/api/siteverify';
        $data = array(
            'secret' =>'6LeFmZIoAAAAAIKjM1uzEuxL-i6piOqe8nryvNFk',
            'response' => $token
        );

        $options = array(
            'http' => array(
                'header' => "Content-Type: application/x-www-form-urlendcoded\r\n",
                'method' => 'POST',
                'content' => http_build_query($data)
            )
        );

        $context = stream_context_create($options);
        $result = file_get_contents($url,false, $context );
        $response = json_decode($result);

        if ($response->success && $response->score >= 0.5) {
            header('HTTP/1.1 200 OK');
        } else {
            header('HTTP/1.1 401 Unauthorized');
        }
        
        echo json_encode($response);
        exit();
        
    )
}