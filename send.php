<?php
if ((isset($_POST['name']) && $_POST['name'] != "")) { //Проверка отправилось ли наше поля name и не пустые ли они
    $to = 'busforward@gmail.com, info@adbk.ru'; //Почта получателя, через запятую можно указать сколько угодно адресов
    $subject = ''.$_POST['subject'].'';
    $message = '
    <html>
        <head>
            <title>' . $subject . '</title>
        </head>
        <body>
            <h2>Название формы: ' . $subject . '</h2>
            <p>Имя: ' . $_POST['name'] . '</p>
            <p>Телефон: ' . $_POST['tel'] . '</p>
            <p>Адрес сайта(если указано): ' . $_POST['site'] . '</p>
        </body>
    </html>';
    $headers = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $headers .= "From: ADBK <info>\r\n"; //Наименование и почта отправителя
    if (mail($to, $subject, $message, $headers)) {
        echo 'success';
    } else {
        echo 'error';
    }
}?>
