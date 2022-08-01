

<?php
    $db = mysqli_connect("localhost", "root", "", 'calendarjs');

    $db -> set_charset("utf8");
    if(isset($_POST["action"], $_POST["bitrixId"], $_POST["startInp"], $_POST["endInp"], $_POST["homeID"], $_POST["employeeId"], $_POST["notesText"])){
        $selectAction = $_POST['action'];
        $bitrixId = $_POST['bitrixId'];
        $startDate = $_POST['startInp'];
        $endDate = $_POST['endInp'];
        $fromWork = $_POST['employeeId'];
        $notes = $_POST['notesText'];
        $show = 0;
        $JustBitId = 500000;

        $homeID = $_POST['homeID'];
        $addressStreet = $_POST['addressStreet'];
        $addressBuilding = $_POST['addressBuilding'];
        $addressHouse = $_POST['addressHouse'];
        $infoIdElem;

        // echo "$selectAction, $bitrixId, $startDate, $endDate, $fromWork, $notes, $homeID, $addressStreet, $addressBuilding, $addressHouse ";

        $sql1 = "INSERT INTO `calendar_one`(`action`, `user_bit_id`, `start_date`, `end_date`, `from_work`, `notes_text`, `show`, `bitrix_id`) VALUES ('$selectAction','$bitrixId','$startDate','$endDate','$fromWork','$notes', '$show', '$JustBitId')";
        $saveDate = mysqli_query($db, $sql1);

        $sqlReturn = mysqli_query($db, "SELECT * FROM `calendar_one`");
        foreach ($sqlReturn as $key => $value) {
            $infoIdElem = $value['id'];
        }

        $sqlTwo = "INSERT INTO `calendar_two`(`home_id`, `address_street`, `address_building`, `address_house`, `other_id`) VALUES ('$homeID', '$addressStreet', '$addressBuilding', '$addressHouse', '$infoIdElem')";
        $saveDateTwo = mysqli_query($db, $sqlTwo);
    }
        
    $sql = mysqli_query($db, "SELECT `id`, `action`, `user_bit_id`, `start_date`, `end_date`, `from_work`, `notes_text`, `show` FROM `calendar_one`");
    
    // echo $sql;
    if($result = $sql)
    {
        $infoTable = [];
        while ($row = mysqli_fetch_assoc($result)) 
        {   
            if($row['show'] == '0'){
                $infoTable[] = $row;    
            }
        }
        $jsonInfoAjax = json_encode($infoTable);
        echo $jsonInfoAjax;
    }
?>

