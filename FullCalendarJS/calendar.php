<!DOCTYPE html>
<html>
    <head>
        <meta charset='utf-8' />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" href="./css/fullCalendar.css" >
        <link rel="stylesheet" href="./css/fullCalendar.main.css">
        <link rel="stylesheet" href="./css/style.css">
        <title>
            fullCalendar
        </title>

    </head>
    <body>

        <?php
            $db = mysqli_connect("localhost", "root", "", 'calendarjs');

            $db -> set_charset("utf8");
            $sql = 'SELECT `id`, `action`, `user_bit_id`, `start_date`, `end_date`, `from_work`, `notes_text`, `show` FROM `calendar_one`';
            if($result = mysqli_query($db, $sql)){           
                    $infoTable = [];
                  
                    while ($row = mysqli_fetch_assoc($result)) 
                    {
                        $infoTable[] = $row;        
                    }
                    $jsonInfoAjax = json_encode($infoTable);
            }

            $recurseName = 'SELECT `id`, `driverName` FROM `driver_recurse`';
            if($rsultTwo = mysqli_query($db, $recurseName)){
                $drivMan = [];

                while ($rowTwo = mysqli_fetch_assoc($rsultTwo))
                {
                    $drivMan[] = $rowTwo;
                }
                $jsonInfoDriver = json_encode($drivMan);
            }

        ?>
        <div id='calendar'></div>
        
        <div id="topapForMe">
            <div>
                <div>
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle"></h5>
                    <button type="button" class="close closeBtn" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form action="" id='fornCalendar'>
                    <div class="modal-body">
                        <div action="" class="formInfoTopap">
                            <span>??????????</span>
                            <span id='titleSpan' class='resfreshInfoCalendar'></span>
                            <select id="selectType" class="form-control inputs" name='selectAction'>
                                <option>????????????????????????????</option>
                                <option>??????????????????????</option>
                                <option>????????????????????</option>
                                <option>??????</option> 
                            </select>
                            <span>?????????????????? Bitrix ID</span>
                            <span id='bitIdSpan' class=''></span>
                            <div class="startEndInfo">
                                <div class="startEndInfoOne">
                                    <span>??????????</span>
                                    <span id='startSpan' class='resfreshInfoCalendar'></span>
                                    <input type="date" class='form-control inputs' id="startInp" name='startDate'>
                                </div>
                                <div class="startEndInfoOne">
                                    <span>??????????</span>
                                    <span id='endSpan' class='resfreshInfoCalendar'></span>
                                    <input type="date" class='form-control inputs' id="endInp" name='endDate'>
                                </div>
                            </div>
                            <span>?????? ID</span>
                            <span id='homeIdSpan' class='resfreshInfoCalendar'></span>
                            <input type="text" class='topapInfoInp form-control inputs' id="homeID" name='homeID'>
                            <span>??????????</span>
                            <div class="infoAddress">
                                <span id='oneAddressSpan' class='resfreshInfoCalendar'></span>
                                <span id='twoAddressSpan' class='resfreshInfoCalendar'></span>
                                <span id='threeAddressSpan' class='resfreshInfoCalendar'></span>
                                <input type="text" class='form-control oneAddress inputs' name='street' id='addressStreet'>
                                <input type="text" class='form-control twoAddress inputs' name='building' id='addressBuilding'>
                                <input type="text" class='form-control threeAddress inputs' name='house' id='addressHouse'>
                            </div>
                            <span>??????????????????</span>
                            <span id='emloyeeIdSpan' class='resfreshInfoCalendar'></span>
                            <select class="employeeId form-control inputs" id="employeeId" name='fromWork'>
                                <option>????????</option>
                                <option>??????????</option>
                                <option>??????????</option>
                                <option>????????????</option>
                                <option>??????????</option>
                            </select>
                            <span>????????????????</span>
                            <span id='notesTextSpan' class='resfreshInfoCalendar'></span>
                            <textarea id="notesText" class="form-control inputs" name='notes'></textarea>
                        </div>
                    </div>
                    <div class="footerPopap">
                        <button type="button" id='saveInfoBtn' class="saveInfoBtn btn btn-primary crEventBtn" name='saveBtn'>??????????????????</button>
                        <button type="reset" class="clearBtn btn btn-primary crEventBtn">??????????</button>
                        <button type='button'  class='btn btn-primary btnClickEvent' id='noChangeBtn' name='colorGreen'>????????????????????</button>
                        <button type='button' class='btn btn-primary btnClickEvent' id='changeBtn'>??????????????</button>
                        <button type='button' id='btnChangeSave' class='btn btn-primary btnChangeSave'>????????????????</button>
                        <button type='button' class='btn btn-primary btnChangeDel'>?????????? ??????????????????????????</button>
                    </div>
                </form>  
                </div>
            </div>
        </div>
        <div id="demo" data-attr='<?=$jsonInfoAjax ?>'></div>
        <div id="driverNameId" data-attr='<?=$jsonInfoDriver ?>'></div>

        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

        <script src="./js/fullCalendar.js"></script>
        <script src="./js/fullCalendar.main.js"></script>

        <!-- <script src="//api.bitrix24.com/api/v1/"></script>     -->
        <script type="text/javascript" src="./js/jqueryAjax3.js"></script>
    </body>

</html>


