<?php

/*
 * Adam Richards 2013
 * 
 */

echo getData( $_POST['fileName']);

function getData($fileName)
{
    $f = fopen($fileName, "r");

    $array = array();

    while(!feof($f))
    {
        $line = fgets($f);

        $array[] = str_replace(array("\r", "\n"), '', $line);
    }

    fclose( $f );

    return json_encode($array);
}

?>
