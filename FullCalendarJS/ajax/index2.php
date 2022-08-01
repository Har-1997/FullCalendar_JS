<?php
    $db = mysqli_connect("localhost", "root", "", 'calendarjs');
    
    $db -> set_charset("utf8");
     // es nra hamara vor event-i chapere popoxem u mna pahpanvi
    if(isset($_POST['infoTiltle'], $_POST['oldInfoId'], $_POST['oldInfoStart'], $_POST['oldInfoEnd'], $_POST['newInfoStart'], $_POST['newInfoEnd'])){
        $infoTiltle = $_POST['infoTiltle'];
        $oldInfoId = $_POST['oldInfoId'];
        $oldInfoStart = $_POST['oldInfoStart'];
        $oldInfoEnd = $_POST['oldInfoEnd'];
        $newInfoStart = $_POST['newInfoStart'];
        $newInfoEnd = $_POST['newInfoEnd'];
        $resizeEventId = $_POST['resizeEventId'];
        
        $q = mysqli_query($db, 'SELECT * FROM `calendar_one`');
        foreach($q as $key => $value){
        
            if($value['id'] == $resizeEventId){
                mysqli_query($db, "UPDATE `calendar_one` SET  `start_date`= '$newInfoStart', `end_date`= '$newInfoEnd' WHERE `id` = '$value[id]' ");
                echo $newInfoStart.'/'.$newInfoEnd;
            }
        }
    }

    //  es nra hamara vor event-i texe poxem u pahpanvi inqe
    if(isset($_POST['dropOldInfoId'], $_POST['dropOldInfoStart'], $_POST['dropOldInfoEnd'], $_POST['dropInfoTiltle'], $_POST['dropNewInfoStart'], $_POST['dropNewInfoEnd'], $_POST['dropNewID'])){
        $dropOldInfoId = $_POST['dropOldInfoId'];
        $dropOldInfoStart = $_POST['dropOldInfoStart'];
        $dropOldInfoEnd = $_POST['dropOldInfoEnd'];
        $dropInfoTiltle = $_POST['dropInfoTiltle'];
        $dropNewInfoStart = $_POST['dropNewInfoStart'];
        $dropNewInfoEnd = $_POST['dropNewInfoEnd'];
        $dropNewID = $_POST['dropNewID'];
        $dropEventId = $_POST['dropEventId'];

        $p = mysqli_query($db, 'SELECT * FROM `calendar_one`');
        foreach($p as $key => $value){
            if( $value['id'] == $dropEventId){
                mysqli_query($db, "UPDATE `calendar_one` SET  `start_date`= '$dropNewInfoStart', `end_date`= '$dropNewInfoEnd', `user_bit_id` = '$dropNewID' WHERE `id` = '$value[id]' ");
                echo $dropNewInfoStart."/".$dropNewInfoEnd."/".$dropNewID;
            }

        }
    }

    //  es nra hamara vor event-i vra sexmem inqe  popup-e baci u vren textov grac lini infon
    if(isset($_POST['clickTitle'], $_POST['clickBitrixId'], $_POST['clickStartInfo'], $_POST['clickEndInfo'])){
        $clickTitle = $_POST['clickTitle'];
        $clickBitrixId = $_POST['clickBitrixId'];
        $clickStartInfo = $_POST['clickStartInfo'];
        $clickEndInfo = $_POST['clickEndInfo'];
        $clickId = $_POST['clickId'];

        $qqq = mysqli_query($db, "SELECT * FROM `calendar_two`");
        foreach ($qqq as $key => $value) {
            if($value['other_id'] == $clickId){
                echo $value['home_id']."/".$value['address_street']."/".$value['address_building']."/".$value['address_house']."/";
            }
        }

        $qq = mysqli_query($db, "SELECT * FROM `calendar_one`");
        foreach($qq as $key => $value){
            if($value['id'] == $clickId){
                echo $value['notes_text']. "/" .$value['from_work'];
            }
        }
    }

    // es en pahna vor eventi vra click es anum berum popup-e u talis em cucadrvac kanachov nerkuma evente
    if(isset($_POST['clickTitleTwo'], $_POST['clickBitrixIdTwo'], $_POST['clickStartInfoTwo'], $_POST['clickEndInfoTwo'])){
  
        $clickTitleTwo = $_POST['clickTitleTwo'];
        $clickBitrixIdTwo = $_POST['clickBitrixIdTwo'];
        $clickStartInfoTwo = $_POST['clickStartInfoTwo'];
        $clickEndInfoTwo = $_POST['clickEndInfoTwo'];
        $clickGreenColorId = $_POST['clickGreenColorId'];

        $qqq = mysqli_query($db, "SELECT * FROM `calendar_one`");

        foreach($qqq as $key => $value){
            if($value['id'] == $clickGreenColorId){
                mysqli_query($db, "UPDATE `calendar_one` SET  `show`= '1' WHERE `id` = '$value[id]' ");
            }
            // es else if-e nra hamara vor ete es ajax-ov sarqum em stex popoxakans start-i u end-i urish dzeva berum
            // data-n jamnela cuyc talis dra hamar es arandznacnum em amsative hamematum u bazayi amsatvi het (de bazayumela amsative senc menak amsov orov grac)
            // u talis em vor ete brnuma sax show-n mek sarqi.
            // Bayc qani vor vercreci arden tvyal iventi id-n bazayic el petq chi es kode
            // else if($value['action'] == $clickTitleTwo && $value['user_bit_id'] == $clickBitrixIdTwo && $value['start_date'] !== $clickStartInfoTwo && $value['end_date'] !== $clickEndInfoTwo){
            //     $pattern = "/[T\s:]/";
            //     $components = preg_split($pattern, $clickStartInfoTwo);
            //     $componentsTwo = preg_split($pattern, $clickEndInfoTwo);
            //     if($value['start_date'] == $components[0] && $value['end_date'] == $componentsTwo[0]){
            //         mysqli_query($db, "UPDATE `calendar_one` SET  `show`= '1' WHERE `id` = '$value[id]' ");
            //         echo $value['action']." ".$value['user_bit_id']." ".$value['start_date']." ".$value['end_date'];
            //     }
            // }
        }
    }

    //  es en hatvacna vor popoxum em event-e u talis em pahpanel ay et hatvacna
    if(isset($_POST['actionDB'], $_POST['bitrixIDDB'], $_POST['startDateDB'], $_POST['endDateDB'])){

        $actionDB = $_POST['actionDB'];
        $bitrixIDDB = $_POST['bitrixIDDB'];
        $startDateDB = $_POST['startDateDB'];
        $endDateDB = $_POST['endDateDB'];
        $notesText = $_POST['notesText'];

        $infoTitleChangeSave = $_POST['infoTitleChangeSave'];
        $infoBitIdChangeSave = $_POST['infoBitIdChangeSave'];
        $infoStartDChangeSave = $_POST['infoStartDChangeSave'];
        $InfoEndDChangeSave = $_POST['InfoEndDChangeSave'];
        $InfoEmployChangeSave = $_POST['InfoEmployChangeSave'];
        $dateDbId = $_POST['dateDbId'];

        $qpp = mysqli_query($db, "SELECT * FROM `calendar_one`");
        foreach ($qpp as $key => $value) {
            if($value['id'] == $dateDbId ){
                mysqli_query($db, "UPDATE `calendar_one` SET `action` = '$infoTitleChangeSave', `user_bit_id` = '$infoBitIdChangeSave', `start_date` = '$infoStartDChangeSave', `end_date` = '$InfoEndDChangeSave', `from_work` = '$InfoEmployChangeSave', `notes_text` = '$notesText'   WHERE `id` = '$value[id]' ");
                echo $value['id'].",", $value['action'].",", $value['user_bit_id'].",", $value['start_date'].",", $value['end_date'];
            }
        }

        $homeIdChange = $_POST['homeIdChange'];
        $streetChange = $_POST['streetChange'];
        $buildingChange = $_POST['buildingChange'];
        $houseChange = $_POST['houseChange'];

        $qppTwo = mysqli_query($db, "SELECT * FROM `calendar_two`");
        foreach ($qppTwo as $key => $value) {
            if($value['other_id'] == $dateDbId){
                mysqli_query($db, "UPDATE `calendar_two` SET `home_id` = '$homeIdChange', `address_street` = '$streetChange', `address_building` = '$buildingChange', `address_house` = '$houseChange' WHERE `other_id` = '$dateDbId' ");
            }
        }

    }

    // Es event-e delete anelu hamara grac
    if(isset($_POST['delEventTitle'], $_POST['delEventBtId'], $_POST['delEventStart'], $_POST['delEventEnd'])){
        $delEventTitle = $_POST['delEventTitle'];
        $delEventBtId = $_POST['delEventBtId'];
        $delEventStart = $_POST['delEventStart'];
        $delEventEnd = $_POST['delEventEnd'];
        $delEventId = $_POST['delEventId'];

        $queryInfo = mysqli_query($db, 'SELECT * FROM `calendar_one`');

        foreach($queryInfo as $key => $value){
            if($value['id'] == $delEventId){
                mysqli_query($db, "DELETE FROM `calendar_one` WHERE `id` = '$value[id]' ");
            }
        }

        $queryInfoTwo = mysqli_query($db, 'SELECT * FROM `calendar_two`');
        foreach ($queryInfoTwo as $key => $value) {
            if($value['other_id'] ==  $delEventId){
                mysqli_query($db, "DELETE FROM `calendar_two` WHERE `other_id` = '$delEventId' ");
            }
        }

    }
?>