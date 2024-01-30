<?php

// echo json_encode(array_merge($_FILES, $_POST));
// echo json_encode($_FILES);
echo json_encode(file_get_contents("php://input"));