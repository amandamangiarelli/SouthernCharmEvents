<?php

if (PHP_OS != 'Linux') {
    echo "Backup could not be performed: incorrect server OS";
    exit(1);
}

//makes backups directory if it does not exist
shell_exec('mkdir -p backups');

//echos data for each file in the folder
date_default_timezone_set("US/Eastern");
echo "<backups>";

function cmp($a, $b)
{
    if ($a == $b) return 0;

    $a2 = str_replace("backups/", "" , $a);
    $a2 = str_replace(".db", "" , $a2);

    $b2 = str_replace("backups/", "" , $b);
    $b2 = str_replace(".db", "" , $b2);

    error_log($a2 . ", " . $b2);
    return ((int) $a2 > (int) $b2) ? 1 : -1;
}

$files = glob('backups/*.db');
usort($files, "cmp");
foreach($files as $backup)
{
    $filename = str_replace("backups/", "" , $backup); //doesn't display folder name
    $filename = str_replace(".db", "" , $filename); //doesn't display .db
    $mtime = filemtime($backup); //gets unix timestamp of file modification time
    $mtime = Date("m/d/Y g:i A", $mtime); //formats the date nicely
    echo "<backup><backupNumber>$filename</backupNumber>";
    echo "<backupDateTime>$mtime</backupDateTime></backup>";
}
echo "</backups>";

?>