<?php

/*
 * Adam Richards 2013
 * 
 */

//echo var_dump($_POST);

if ( $_POST['action'] == "toggleChecked")
{
    echo writeChecked( $_POST['name'], $_POST['checked']);
}

function writeChecked($name, $checked)
{
    $f = fopen("./lists/list.txt", "r+");

    $foundPos = -1;
    
    while(!feof($f))
    {
        $curPos = ftell($f);
        
        $line = fgets($f);

        $line = str_replace(array("\r", "\n"), '', $line);
        
        if ( substr($line, 2) === $name )
        {
            $foundPos = $curPos;
            break;
        }
    }
    
    fseek( $f, $foundPos );
    
    fputs( $f, $checked == "true" ? "1" : "0");
    
    fclose( $f );
    
    // for now, just return new (single) state...
    // TODO: actual success condition...
    return $checked;
}
    
function unused($name, $checked)
{
    $f = fopen("./lists/list.txt", "r+");

    $array = array();
    
    while(!feof($f))
    {
        $line = fgets($f);

        $array[] = str_replace(array("\r", "\n"), '', $line);
    }
    
    foreach( $array as $line )
    {
        if ( substr($line, 2) == $name )
        {
            echo("name found");
            $line = (($checked ? "1" : "0") . " " . $name);
            echo("line is $line");
        }
    }
        
    foreach( $array as $line )
    {
        fwrite($f, $line + PHP_EOL);
    }

    fclose( $f );
}
    
?>
