let jsonData;
let calendar;


let jsonInfoDriver = $('#driverNameId').attr('data-attr');
let recurceIdInfo = JSON.parse(jsonInfoDriver);
let recuceArray = [];
for (let k = 0; k < recurceIdInfo.length; k++) {
    recuceArray.push({id: recurceIdInfo[k].id, title: recurceIdInfo[k].driverName});
}

let phpResultLoad = $('#demo').attr('data-attr');
let onloadResult = JSON.parse(phpResultLoad);

let printEvents = [];
for (let l = 0; l < onloadResult.length; l++) {
    printEvents.push({id: onloadResult[l].id, title: onloadResult[l].action, start: onloadResult[l].start_date, end: onloadResult[l].end_date, resourceId: onloadResult[l].recurce_id});
};
for (let ll = 0; ll < onloadResult.length; ll++) {
    if(onloadResult[ll].show == "1"){
        printEvents[ll].color = 'green';
    }
}

    let stringified = JSON.stringify(printEvents);
    localStorage.setItem('printEvents', stringified);
    
    let infoEventsBaza = localStorage.getItem("printEvents");
    let infoEvents = JSON.parse(infoEventsBaza);

initCalendar();
function initCalendar(){  

    $('.saveInfoBtn').on('click', function(){

        let action =  $('#selectType').val();
        let recurceId = $('#recurceIdSpan').html();
        let startInp = $('#startInp').val();
        let endInp = $('#endInp').val();
        let employeeId = $('#employeeId').val();
        let notesText = $('#notesText').val();

        let addressStreet = $('#addressStreet').val();
        let addressBuilding = $('#addressBuilding').val();
        let addressHouse = $('#addressHouse').val();
        let homeID = $('#homeID').val();

        let bitrixId = "petak";

        // let bitrixId = bitrixDealAdd(action, startInp, endInp);
        // console.log("es bitrixi id-na" + bitrixId);
        
        // if(selectType == ""){
        //     alert("Լրացրու տեսակը");
        //     return false;
        // }else if(homeID == ""){
        //     alert('Լրացրեք տան id-ն');
        //     return false;
        // }
        // else if(addressStreet == ""){
        //     alert("Քաղաքի անունը լրացրեք");
        //     return false;
        // }else if(addressBuilding == ""){
        //     alert('Լրացրու փողոցի անունը');
        //     return false;
        // }else if(addressHouse == ""){
        //     alert('Լրացրու բնակարանի թիվը');
        //     return false;
        // }else if(employeeId == ""){
        //     alert('Լրացրու աշխատակցի անունը');
        //     return false;
        // }
        
        $('#selectType').val('');
        $('#startInp').val('');
        $('#endInp').val('');
        $('#employeeId').val('');
        $('#notesText').val('');
        $('#homeID').val('');
        $('#addressStreet').val('');
        $('#addressBuilding').val('');
        $('#addressHouse').val('');

        $.ajax({
            url: 'ajax/index.php',
            type: 'POST',
            data: {
                "action": action,
                "recurceId": recurceId,
                "startInp": startInp,
                "endInp": endInp,
                "employeeId": employeeId,
                "notesText": notesText,

                'homeID': homeID,
                'addressStreet': addressStreet,
                'addressBuilding': addressBuilding,
                'addressHouse': addressHouse,

                'bitrixId': bitrixId

            },
            beforeSend: function() {
                $('#saveInfoBtn').prop("disabled", true);
            },
            success: function(result) {
                console.log(result);
                $('#saveInfoBtn').prop("disabled", false);
                jsonData = JSON.parse(result);
                if(jsonData !== undefined){            
                    let j = jsonData.length-1;
                    console.log('esa');
                    console.log(jsonData[j]);
                    obj = {
                        id: jsonData[j].id,
                        resourceId: [jsonData[j].recurce_id],
                        title: jsonData[j].action,
                        start: jsonData[j].start_date,
                        end: jsonData[j].end_date,
                        allDay: false,   
                    };
                    infoEvents.push(obj);
                    addEvent({
                        id: jsonData[j].id,
                        resourceId: [jsonData[j].recurce_id],
                        title: jsonData[j].action,
                        start: jsonData[j].start_date,
                        end: jsonData[j].end_date,
                        allDay: false
                    });
                } 
            }
        });
        $('#topapForMe').css({'display':'none'});
        $('.saveInfoBtn').off('click');
    });

    function commitEdit(event) {
        let id = event;
    
        let title = $('#selectType').val();
        let employeeId = $('#employeeId').val();
        let start = $('#startInp').val();
        let end = $('#endInp').val();
        let idEvent = $('#recurceIdSpan').html();
        let notesText = $('#notesText').val();
        
        calendar.getEventById(id).remove();

        for (let i = 0; i < infoEvents.length; i++) {
            if(infoEvents[i].id === id){
                infoEvents[i]={
                    id: id,
                    title: title,
                    start: start,
                    end: end,
                    resourceId: idEvent,
                    color: infoEvents[i].color
                };
                addEvent(infoEvents[i]);
            }
        }
            let stringifieded = JSON.stringify(infoEvents);
            let infoRefresh = localStorage.setItem('infoEvents', stringifieded);
    } 

    function Changecolor(info) {
        let id = info;
        calendar.getEventById(id).remove();
        for (let j = 0; j < infoEvents.length; j++) {
            if(infoEvents[j].id === id){
                infoEvents[j].color = "green";
                infoEvents[j].rec
                addEvent(infoEvents[j]);
            }
        }
    }

    function addEvent(event) {
        calendar.addEvent(event);
    }
    function saveEventsTable(){
        for (let i = 0; i < infoEvents.length; i++) {
            obj = {
                id: infoEvents[i].id,
                resourceId: infoEvents[i].resourceId,
                title: infoEvents[i].title,
                start: infoEvents[i].start,
                end: infoEvents[i].end,
            } 
            addEvent(obj);  
        }
    }
    $(document).ready( function(){
        for (let i = 0; i < infoEvents.length; i++) {
            obj = {
                id: infoEvents[i].id,
                resourceId: infoEvents[i].resourceId,
                title: infoEvents[i].title,
                start: infoEvents[i].start,
                end: infoEvents[i].end,
                color: infoEvents[i].color
            } 
            addEvent(obj);  
        }
    });

    var calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {  
        editable: true,
        selectable: true,
        refetchResourcesOnNavigate: true,
        initialView: 'resourceTimelineMonth',
        defaultView: 'month',
    
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
        },

        resources: recuceArray,

        eventDrop: function(info){
                        //  es nra hamara vor event-i texe poxem u pahpanvi inqe
            let dropOldInfoId = info.oldEvent._def.resourceIds[0];
            let dropOldInfoStart = info.oldEvent.startStr;
            let dropOldInfoEnd = info.oldEvent.endStr;
            let dropInfoTiltle = info.event.title; 
            let dropEventId = info.event.id;
            let dropNewInfoStart = info.event.startStr;
            let dropNewInfoEnd = info.event.endStr;
            let dropNewID = info.event._def.resourceIds[0];

            $.ajax({
                url: 'ajax/index2.php',
                type: 'POST',
                data: {
                    "dropOldInfoId": dropOldInfoId,
                    "dropOldInfoStart": dropOldInfoStart,
                    "dropOldInfoEnd": dropOldInfoEnd,
                    "dropInfoTiltle": dropInfoTiltle,
                    "dropNewInfoStart": dropNewInfoStart,
                    "dropNewInfoEnd": dropNewInfoEnd,
                    "dropNewID": dropNewID,
                    "dropEventId": dropEventId
                },
                success: function(result){
                    let newinfoDrop = result.split('/');
                    for (let j = 0; j < infoEvents.length; j++) {
                        if(infoEvents[j].id === dropEventId){
                            infoEvents[j].start = newinfoDrop[0];
                            infoEvents[j].end = newinfoDrop[1];
                            infoEvents[j].resourceId = newinfoDrop[2];
                        }
                    } 
                }
            });
        },
        
        eventResize: function(info) {
                    // es nra hamara vor event-i chapere popoxem u mna pahpanvi
            let oldInfoId = info.oldEvent._def.resourceIds;
            let oldInfoStart = info.oldEvent.startStr;
            let oldInfoEnd = info.oldEvent.endStr;
            let infoTiltle = info.event.title; 
            let resizeEventId = info.event.id;
            let newInfoStart = info.event.startStr;
            let newInfoEnd = info.event.endStr;
            
            $.ajax({
                url: 'ajax/index2.php',
                type: 'POST',
                data: {
                    "infoTiltle": infoTiltle,
                    "oldInfoId": oldInfoId[0],
                    "oldInfoStart": oldInfoStart,
                    "oldInfoEnd": oldInfoEnd,
                    "newInfoStart": newInfoStart,
                    "newInfoEnd": newInfoEnd,
                    "resizeEventId": resizeEventId,
                },
                success: function(result){
                    let newinfoResize = result.split('/');
                    for (let j = 0; j < infoEvents.length; j++) {
                        if(infoEvents[j].id === resizeEventId){
                            infoEvents[j].start = newinfoResize[0];
                            infoEvents[j].end = newinfoResize[1];
                        }
                    }
                }
            });     
        },

        eventClick: function(info, element) {
                        // es en pahna vor click em anum event-i vra u bacuma popup-e vren textov aranc inputi informacian tpaca
            $('#topapForMe').css({'display': 'block'});
            $('.formInfoTopap input,textarea,select').css({'display': 'none'});
            $('.crEventBtn').css({'display': 'none'});
            $('.btnClickEvent').css({'display': 'block'});
            $('.resfreshInfoCalendar').css({'display': 'block'});

            $('.closeBtn').on('click', function(){
                $('.formInfoTopap input,textarea,select').css({'display': 'block'});
                $('.btnClickEvent').css({'display': 'none'});
                $('.resfreshInfoCalendar').css({'display': 'none'});
                $('.crEventBtn').css({'display': 'block'});
                $('.btnChangeDel').css('display', 'none');

                $('#noChangeBtn').off('click');
                $('.btnChangeSave').off('click');
                $('.btnChangeDel').off('click');
            });
                  
            $('#titleSpan').html(info.event.title);
            $('#recurceIdSpan').html(info.event._def.resourceIds[0]);
            $('#startSpan').html(info.event.startStr);
            $('#endSpan').html(info.event.endStr);

            $.ajax({
                url: 'ajax/index2.php',
                type: 'POST',
                data: {
                    "clickTitle": info.event.title,
                    "clickRecurceId": info.event._def.resourceIds[0],
                    "clickStartInfo": info.event.startStr,
                    "clickEndInfo": info.event.endStr,
                    "clickId": info.event.id,
                },
                success: function(result){
                    let resultClick = result.split('/');
                    $('#homeIdSpan').html(resultClick[0]);
                    $('#oneAddressSpan').html(resultClick[1]);
                    $('#twoAddressSpan').html(resultClick[2]);
                    $('#threeAddressSpan').html(resultClick[3]);
                    $('#notesTextSpan').html(resultClick[4]);
                    $('#emloyeeIdSpan').html(resultClick[5]);
                }
            });

                                // es en pahna vor eventi vra click es anum beruma popup-e u talis em cucadrvac kanachov nerkuma evente
            $('#noChangeBtn').on('click', function(){
                $('#topapForMe').css({'display': 'none'}); 
                $.ajax({
                    url: 'ajax/index2.php',
                    type: 'POST',
                    data: {
                        "clickTitleTwo": info.event.title,
                        "clickRecurceIdTwo": info.event._def.resourceIds[0],
                        "clickStartInfoTwo": info.event.startStr,
                        "clickEndInfoTwo": info.event.endStr,
                        "clickGreenColorId": info.event.id,
                    },
                });
                Changecolor( info.event.id);

                $('#selectType').val('');
                $('#startInp').val('');
                $('#endInp').val('');
                $('#employeeId').val('');
                $('#notesText').val('');
                $('#homeID').val('');
                $('#addressStreet').val('');
                $('#addressBuilding').val('');
                $('#addressHouse').val('');

                $('#noChangeBtn').off('click');
                $('.btnChangeSave').off('click');
                $('.btnChangeDel').off('click');
            });

                        // es en hatvacna vor event-i vra click em anum u talis em popoxel inputnerna berum ira himikva informaciayov
            $('#changeBtn').on('click', function(){
 
                $('.formInfoTopap input,textarea,select').css({'display': 'block'});
                $('.resfreshInfoCalendar').css({'display': 'none'});
                $('.crEventBtn').css({'display': 'none'});
                $('.btnClickEvent').css({'display': 'none'});
                $('.btnChangeSave').css({'display': 'block'});
                $('.btnChangeDel').css({'display': 'block'});

                $('#selectType').val(info.event.title);
                $('#recurceIdSpan').html(info.event._def.resourceIds[0]);
                let startDateChange = (info.event.startStr).split('T');
                $('#startInp').val(startDateChange[0]);
                let endDateChange = (info.event.endStr).split('T');
                $('#endInp').val(endDateChange[0]);;
                
                $('#notesText').val($('#notesTextSpan').html());
                $('#employeeId').val($('#emloyeeIdSpan').html());  
                $('#homeID').val($('#homeIdSpan').html());
                $('#addressStreet').val( $('#oneAddressSpan').html());
                $('#addressBuilding').val($('#twoAddressSpan').html());
                $('#addressHouse').val($('#threeAddressSpan').html());

                $('.closeBtn').on('click', function(){
                    $('.btnChangeSave').css({'display': 'none'});
                    $('.btnChangeDel').css({'display': 'none'});
                    $('#selectType').val('');
                    $('#homeID').val('');
                    $('.oneAddress').val('');
                    $('.twoAddress').val('');
                    $('.threeAddress').val('');
                    $('.employeeId').val('');

                    $('.btnChangeSave').off('click');
                    $('#noChangeBtn').off('click');
                    $('.btnChangeDel').off('click');
                });
            });

                                //  es en hatvacna vor popoxum em event-e u talis em pahpanel ay et hatvacna
            $('.btnChangeSave').on('click', function(){

                idEventChange = info.event.id;
                commitEdit(idEventChange);  
                
                let infoTitleChangeSave = $('#selectType').val();
                let infoRecurceChangeSave = $('#recurceIdSpan').html();
                let infoStartDChangeSave = $('#startInp').val();
                let InfoEndDChangeSave = $('#endInp').val();
                let InfoEmployChangeSave = $('#employeeId').val();
                let notesText = $('#notesText').val();

                let homeIdChange = $('#homeID').val();
                let streetChange = $('#addressStreet').val();
                let buildingChange = $('#addressBuilding').val();
                let houseChange = $('#addressHouse').val();
                
                let actionDB = info.event.title;
                let recurceIDDB = info.event._def.resourceIds[0];
                let startDateDB = info.event.startStr;
                let endDateDB = info.event.endStr;
                let dateDbId = idEventChange;
                
                $.ajax({
                    url: 'ajax/index2.php',
                    type: 'POST',
                    data: {
                        "actionDB": actionDB,
                        "recurceIDDB": recurceIDDB,
                        "startDateDB": startDateDB,
                        "endDateDB": endDateDB,

                        "infoTitleChangeSave": infoTitleChangeSave,
                        "infoRecurceChangeSave": infoRecurceChangeSave,
                        "infoStartDChangeSave": infoStartDChangeSave,
                        "InfoEndDChangeSave": InfoEndDChangeSave,
                        "InfoEmployChangeSave": InfoEmployChangeSave,
                        "dateDbId": dateDbId,
                        "notesText": notesText,

                        'homeIdChange': homeIdChange,
                        'streetChange': streetChange,
                        'buildingChange': buildingChange,
                        'houseChange': houseChange
                    },
                });

                $('#topapForMe').css({'display':'none'});
                $('.btnChangeSave, .btnChangeDel').css({'display': 'none'});

                $('.btnChangeSave').off('click');
                $('#noChangeBtn').off('click');
                $('.btnChangeDel').off('click');
            });

            
                // Es event-e delete anelu hamara grac
            $('.btnChangeDel').on('click', function(){

                $('.btnChangeSave, .btnChangeDel').css('display', 'none');
                $('.crEventBtn').css('display','block');
                let delEventTitle = info.event.title;
                let delEventRecId = info.event._def.resourceIds[0];
                let delEventStart = info.event.startStr;
                let delEventEnd = info.event.endStr;
                let delEventId = info.event.id;
                
                $.ajax({
                    url: 'ajax/index2.php',
                    type: 'POST',
                    data: {
                        'delEventTitle': delEventTitle,
                        'delEventRecId': delEventRecId,
                        'delEventStart': delEventStart,
                        'delEventEnd': delEventEnd,
                        'delEventId': delEventId,
                    }
                })
                info.event.remove();
                $('#topapForMe').css('display', 'none');
                $('.btnChangeSave').off('click');
                $('#noChangeBtn').off('click');
                $('.btnChangeDel').off('click');
            });  
            if(info.event.backgroundColor == "green"){
                $('#noChangeBtn').css('display','none');
            }
        },
        
        events: [],

        dateClick: function(info) {
            $('#recurceIdSpan').html(info.resource.id);
            console.log($('#recurceIdSpan').html());
            $('.formInfoTopap input,textarea,select').css({'display': 'block'});
            $('.resfreshInfoCalendar').css({'display': 'none'});
            $('.crEventBtn').css({'display': 'block'});
            $('.btnClickEvent').css({'display': 'none'});
            $('.btnChangeSave').css({'display': 'none'});
            $('.btnChangeDel').css({'display': 'none'});
        },
            
        select: function(info) {
            $('#topapForMe').css({'display':'block'});
            $('#startInp').val(info.startStr);
            $('#endInp').val(info.endStr);
            $('#recurceIdSpan').html(info.resource.id);

            $('.resfreshInfoCalendar').css('display','none');
            $('.crEventBtn').css('display','block');
            $('.btnClickEvent').css('display','none');
            $('.inputs').css('display','block');
            $('#selectType').val('');
            $('#employeeId').val('');
            $('#notesText').val('');
            $('#homeID').val('');
            $('#addressStreet').val('');
            $('#addressBuilding').val('');
            $('#addressHouse').val('');
        },
    });
    $('.clearBtn, .closeBtn').on('click', function(){
        $('#topapForMe').css({'display':'none'});
        $('#btnChangeSave').css({'display': 'none'})
    })
    
    calendar.render();
}  








// function bitrixDealAdd (title, start, end ) {
//     console.log('dudu');
//     // es bitrixi hamara
    
//     var current = new Date();
//     var nextMonth = new Date();
//     nextMonth.setMonth(current.getMonth() + 1);
//     var date2str = function(d) 
//     {
//         return d.getFullYear() + '-' + paddatepart(1 + d.getMonth()) + '-' + paddatepart(d.getDate()) + 'T' + paddatepart(d.getHours()) + ':' + paddatepart(d.getMinutes()) + ':' + paddatepart(d.getSeconds()) + '+03:00';
//     };
//     var paddatepart = function(part)
//     {
//         return part >= 10 ? part.toString() : '0' + part.toString();
//     };
        
//     BX24.callMethod(
//         "crm.deal.add", 
//         {
//             fields:
//             { 
//                 "TITLE": title,
//                 "UF_CRM_1647859330166": start,  
//                 "UF_CRM_1647860309974": end,  
    
//             },
//             params: { "REGISTER_SONET_EVENT": "Y" }	
//         }, 
//         function(result) 
//         {
//             if(result.error())
//                 console.error(result.error());
//             else
//                 console.info("Создана сделка с ID " + result.data());
//                 return result.data();
//         }
//     );	
//     // $('.saveInfoBtn').off('click');

// }




















////////////////////////////////////////////////////////////////////////////////////////

// es index.php faylna 
// <?php
//     // $db = mysqli_connect("localhost", "narek133213_user", "machtech0258", "narek133213_harut");
//     $db = mysqli_connect("localhost", "root", "", 'calendarjs');

//     $db -> set_charset("utf8");
//     if(isset($_POST["action"], $_POST["recurceId"], $_POST["startInp"], $_POST["endInp"], $_POST["homeID"], $_POST["employeeId"], $_POST["notesText"])){

//         $selectAction = $_POST['action'];
//         $recurceId = $_POST['recurceId'];
//         $startDate = $_POST['startInp'];
//         $endDate = $_POST['endInp'];
//         $fromWork = $_POST['employeeId'];
//         $notes = $_POST['notesText'];
//         $show = 0;
//         $homeID = $_POST['homeID'];
//         $addressStreet = $_POST['addressStreet'];
//         $addressBuilding = $_POST['addressBuilding'];
//         $addressHouse = $_POST['addressHouse'];
        
//         $bitrixId = $_POST['bitrixId'];
//         // echo $bitrixId;
//         $infoIdElem;

//         $sql = "INSERT INTO `calendar_one`(`action`, `recurce_id`, `start_date`, `end_date`, `from_work`, `notes_text`, `show`, `bitrix_id`) VALUES ('$selectAction','$recurceId','$startDate','$endDate','$fromWork','$notes', '$show', '$bitrixId')";
//         // echo $sql;
//         $saveDate = mysqli_query($db, $sql);

//         $sqlReturn = mysqli_query($db, "SELECT * FROM `calendar_one`");
//         foreach ($sqlReturn as $key => $value) {
//             $infoIdElem = $value['id'];
//         }
//         $sqlTwo = "INSERT INTO `calendar_two`(`home_id`, `address_street`, `address_building`, `address_house`, `other_id`) VALUES ('$homeID', '$addressStreet', '$addressBuilding', '$addressHouse', '$infoIdElem')";
//         $saveDateTwo = mysqli_query($db, $sqlTwo);

//     }
        
//     $sql = 'SELECT `id`, `action`, `recurce_id`, `start_date`, `end_date`, `from_work`, `notes_text`, `show` FROM `calendar_one`';
//     if($result = mysqli_query($db, $sql))
//     {
//         $infoTable = [];
//         while ($row = mysqli_fetch_assoc($result)) 
//         {   
//             if($row['show'] == '0'){
//                 $infoTable[] = $row;        
//             }
//         }
//         $jsonInfoAjax = json_encode($infoTable);
//         echo $jsonInfoAjax;
//     }
// ?>








////////////////////////////////////////////////////////////////////////////////////////

// calendar.php faylna

// <!DOCTYPE html>
// <html>
//     <head>
//         <meta charset='utf-8' />
//         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
//         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
//         <link rel="stylesheet" href="./css/fullCalendar.css" >
//         <link rel="stylesheet" href="./css/fullCalendar.main.css">
//         <link rel="stylesheet" href="./css/style.css">
//         <title>
//             fullCalendar
//         </title>

//     </head>
//     <body>

//         <?php
//             // $db = mysqli_connect("localhost", "narek133213_user", "machtech0258", "narek133213_harut");
//             $db = mysqli_connect("localhost", "root", "", 'calendarjs');

//             $db -> set_charset("utf8");
//             $sql = 'SELECT `id`, `action`, `recurce_id`, `start_date`, `end_date`, `from_work`, `notes_text`, `show` FROM `calendar_one`';
//             if($result = mysqli_query($db, $sql)){           
//                     $infoTable = [];
                  
//                     while ($row = mysqli_fetch_assoc($result)) 
//                     {
//                         $infoTable[] = $row;        
//                     }
//                     $jsonInfoAjax = json_encode($infoTable);
//             }

//             $recurseName = 'SELECT `id`, `driverName` FROM `driver_recurse`';
//             if($rsultTwo = mysqli_query($db, $recurseName)){
//                 $drivMan = [];

//                 while ($rowTwo = mysqli_fetch_assoc($rsultTwo))
//                 {
//                     $drivMan[] = $rowTwo;
//                 }
//                 $jsonInfoDriver = json_encode($drivMan);
//             }

//         ?>
//         <div id='calendar'></div>
        
//         <div id="topapForMe">
//             <div>
//                 <div>
//                 <div class="modal-header">
//                     <h5 class="modal-title" id="exampleModalLongTitle"></h5>
//                     <button type="button" class="close closeBtn" data-dismiss="modal" aria-label="Close">
//                     <span aria-hidden="true">&times;</span>
//                     </button>
//                 </div>
//                 <form action="" id='fornCalendar'>
//                     <div class="modal-body">
//                         <div action="" class="formInfoTopap">
//                             <span>Տեսակ</span>
//                             <span id='titleSpan' class='resfreshInfoCalendar'></span>
//                             <select id="selectType" class="form-control inputs" name='selectAction'>
//                                 <option>Ցուցադրություն</option>
//                                 <option>Նկարահանում</option>
//                                 <option>Գործարքներ</option>
//                                 <option>Այլ</option> 
//                             </select>
//                             <span>Հաճախորդի Bitrix ID</span>
//                             <span id='recurceIdSpan' class=''></span>
//                             <div class="startEndInfo">
//                                 <div class="startEndInfoOne">
//                                     <span>Սկսած</span>
//                                     <span id='startSpan' class='resfreshInfoCalendar'></span>
//                                     <input type="date" class='form-control inputs' id="startInp" name='startDate'>
//                                 </div>
//                                 <div class="startEndInfoOne">
//                                     <span>Մինչև</span>
//                                     <span id='endSpan' class='resfreshInfoCalendar'></span>
//                                     <input type="date" class='form-control inputs' id="endInp" name='endDate'>
//                                 </div>
//                             </div>
//                             <span>Տան ID</span>
//                             <span id='homeIdSpan' class='resfreshInfoCalendar'></span>
//                             <input type="text" class='topapInfoInp form-control inputs' id="homeID" name='homeID'>
//                             <span>Հասցե</span>
//                             <div class="infoAddress">
//                                 <span id='oneAddressSpan' class='resfreshInfoCalendar'></span>
//                                 <span id='twoAddressSpan' class='resfreshInfoCalendar'></span>
//                                 <span id='threeAddressSpan' class='resfreshInfoCalendar'></span>
//                                 <input type="text" class='form-control oneAddress inputs' name='street' id='addressStreet'>
//                                 <input type="text" class='form-control twoAddress inputs' name='building' id='addressBuilding'>
//                                 <input type="text" class='form-control threeAddress inputs' name='house' id='addressHouse'>
//                             </div>
//                             <span>Աշխատակից</span>
//                             <span id='emloyeeIdSpan' class='resfreshInfoCalendar'></span>
//                             <select class="employeeId form-control inputs" id="employeeId" name='fromWork'>
//                                 <option>Հայկ</option>
//                                 <option>Արտաշ</option>
//                                 <option>Գարիկ</option>
//                                 <option>Ֆելիքս</option>
//                                 <option>Կարեն</option>
//                             </select>
//                             <span>Նշումներ</span>
//                             <span id='notesTextSpan' class='resfreshInfoCalendar'></span>
//                             <textarea id="notesText" class="form-control inputs" name='notes'></textarea>
//                         </div>
//                     </div>
//                     <div class="footerPopap">
//                         <button type="button" id='saveInfoBtn' class="saveInfoBtn btn btn-primary crEventBtn" name='saveBtn'>Ավելացնել</button>
//                         <button type="reset" class="clearBtn btn btn-primary crEventBtn">Ջնջել</button>
//                         <button type='button'  class='btn btn-primary btnClickEvent' id='noChangeBtn' name='colorGreen'>Ցուցադրված</button>
//                         <button type='button' class='btn btn-primary btnClickEvent' id='changeBtn'>Փոփոխել</button>
//                         <button type='button' id='btnChangeSave' class='btn btn-primary btnChangeSave'>Պահպանել</button>
//                         <button type='button' class='btn btn-primary btnChangeDel'>Ջնջել ամբողջությամբ</button>
//                     </div>
//                 </form>  
//                 </div>
//             </div>
//         </div>
//         <div id="demo" data-attr='<?=$jsonInfoAjax ?>'></div>
//         <div id="driverNameId" data-attr='<?=$jsonInfoDriver ?>'></div>

//         <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
//         <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
//         <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
//         <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

//         <script src="./js/fullCalendar.js"></script>
//         <script src="./js/fullCalendar.main.js"></script>
        
//         <!-- <script src="//api.bitrix24.com/api/v1/"></script> -->
//         <script type="text/javascript" src="./js/jqueryAjax 3.js"></script>
//     </body>

// </html>






////////////////////////////////////////////////////////////////////////////////////////
// index2.php  faylna


// <?php
//     // $db = mysqli_connect("localhost", "narek133213_user", "machtech0258", "narek133213_harut");
//     $db = mysqli_connect("localhost", "root", "", 'calendarjs');
    
//     $db -> set_charset("utf8");
//      // es nra hamara vor event-i chapere popoxem u mna pahpanvi
//     if(isset($_POST['infoTiltle'], $_POST['oldInfoId'], $_POST['oldInfoStart'], $_POST['oldInfoEnd'], $_POST['newInfoStart'], $_POST['newInfoEnd'])){
//         $infoTiltle = $_POST['infoTiltle'];
//         $oldInfoId = $_POST['oldInfoId'];
//         $oldInfoStart = $_POST['oldInfoStart'];
//         $oldInfoEnd = $_POST['oldInfoEnd'];
//         $newInfoStart = $_POST['newInfoStart'];
//         $newInfoEnd = $_POST['newInfoEnd'];
//         $resizeEventId = $_POST['resizeEventId'];
        
//         $q = mysqli_query($db, 'SELECT * FROM `calendar_one`');
//         foreach($q as $key => $value){
        
//             if($value['id'] == $resizeEventId){
//                 mysqli_query($db, "UPDATE `calendar_one` SET  `start_date`= '$newInfoStart', `end_date`= '$newInfoEnd' WHERE `id` = '$value[id]' ");
//                 echo $newInfoStart.'/'.$newInfoEnd;
//             }
//         }
//     }

//     //  es nra hamara vor event-i texe poxem u pahpanvi inqe
//     if(isset($_POST['dropOldInfoId'], $_POST['dropOldInfoStart'], $_POST['dropOldInfoEnd'], $_POST['dropInfoTiltle'], $_POST['dropNewInfoStart'], $_POST['dropNewInfoEnd'], $_POST['dropNewID'])){
//         $dropOldInfoId = $_POST['dropOldInfoId'];
//         $dropOldInfoStart = $_POST['dropOldInfoStart'];
//         $dropOldInfoEnd = $_POST['dropOldInfoEnd'];
//         $dropInfoTiltle = $_POST['dropInfoTiltle'];
//         $dropNewInfoStart = $_POST['dropNewInfoStart'];
//         $dropNewInfoEnd = $_POST['dropNewInfoEnd'];
//         $dropNewID = $_POST['dropNewID'];
//         $dropEventId = $_POST['dropEventId'];

//         $p = mysqli_query($db, 'SELECT * FROM `calendar_one`');
//         foreach($p as $key => $value){
//             if( $value['id'] == $dropEventId){
//                 mysqli_query($db, "UPDATE `calendar_one` SET  `start_date`= '$dropNewInfoStart', `end_date`= '$dropNewInfoEnd', `recurce_id` = '$dropNewID' WHERE `id` = '$value[id]' ");
//                 echo $dropNewInfoStart."/".$dropNewInfoEnd."/".$dropNewID;
//             }

//         }
//     }

//     //  es nra hamara vor event-i vra sexmem inqe  popup-e baci u vren textov grac lini infon
//     if(isset($_POST['clickTitle'], $_POST['clickRecurceId'], $_POST['clickStartInfo'], $_POST['clickEndInfo'])){
//         $clickTitle = $_POST['clickTitle'];
//         $clickRecurceId = $_POST['clickRecurceId'];
//         $clickStartInfo = $_POST['clickStartInfo'];
//         $clickEndInfo = $_POST['clickEndInfo'];
//         $clickId = $_POST['clickId'];

//         $qqq = mysqli_query($db, "SELECT * FROM `calendar_two`");
//         foreach ($qqq as $key => $value) {
//             if($value['other_id'] == $clickId){
//                 echo $value['home_id']."/".$value['address_street']."/".$value['address_building']."/".$value['address_house']."/";
//             }
//         }

//         $qq = mysqli_query($db, "SELECT * FROM `calendar_one`");
//         foreach($qq as $key => $value){
//             if($value['id'] == $clickId){
//                 echo $value['notes_text']. "/" .$value['from_work'];
//             }
//         }
//     }

//     // es en pahna vor eventi vra click es anum berum popup-e u talis em cucadrvac kanachov nerkuma evente
//     if(isset($_POST['clickTitleTwo'], $_POST['clickRecurceIdTwo'], $_POST['clickStartInfoTwo'], $_POST['clickEndInfoTwo'])){
  
//         $clickTitleTwo = $_POST['clickTitleTwo'];
//         $clickRecurceIdTwo = $_POST['clickRecurceIdTwo'];
//         $clickStartInfoTwo = $_POST['clickStartInfoTwo'];
//         $clickEndInfoTwo = $_POST['clickEndInfoTwo'];
//         $clickGreenColorId = $_POST['clickGreenColorId'];

//         $qqq = mysqli_query($db, "SELECT * FROM `calendar_one`");

//         foreach($qqq as $key => $value){
//             if($value['id'] == $clickGreenColorId){
//                 mysqli_query($db, "UPDATE `calendar_one` SET  `show`= '1' WHERE `id` = '$value[id]' ");
//             }
//             // es else if-e nra hamara vor ete es ajax-ov sarqum em stex popoxakans start-i u end-i urish dzeva berum
//             // data-n jamnela cuyc talis dra hamar es arandznacnum em amsative hamematum u bazayi amsatvi het (de bazayumela amsative senc menak amsov orov grac)
//             // u talis em vor ete brnuma sax show-n mek sarqi.
//             // Bayc qani vor vercreci arden tvyal iventi id-n bazayic el petq chi es kode
//             // else if($value['action'] == $clickTitleTwo && $value['recurce_id'] == $clickRecurceIdTwo && $value['start_date'] !== $clickStartInfoTwo && $value['end_date'] !== $clickEndInfoTwo){
//             //     $pattern = "/[T\s:]/";
//             //     $components = preg_split($pattern, $clickStartInfoTwo);
//             //     $componentsTwo = preg_split($pattern, $clickEndInfoTwo);
//             //     if($value['start_date'] == $components[0] && $value['end_date'] == $componentsTwo[0]){
//             //         mysqli_query($db, "UPDATE `calendar_one` SET  `show`= '1' WHERE `id` = '$value[id]' ");
//             //         echo $value['action']." ".$value['recurce_id']." ".$value['start_date']." ".$value['end_date'];
//             //     }
//             // }
//         }
//     }

//     //  es en hatvacna vor popoxum em event-e u talis em pahpanel ay et hatvacna
//     if(isset($_POST['actionDB'], $_POST['recurceIDDB'], $_POST['startDateDB'], $_POST['endDateDB'])){

//         $actionDB = $_POST['actionDB'];
//         $recurceIDDB = $_POST['recurceIDDB'];
//         $startDateDB = $_POST['startDateDB'];
//         $endDateDB = $_POST['endDateDB'];
//         $notesText = $_POST['notesText'];

//         $infoTitleChangeSave = $_POST['infoTitleChangeSave'];
//         $infoRecurceChangeSave = $_POST['infoRecurceChangeSave'];
//         $infoStartDChangeSave = $_POST['infoStartDChangeSave'];
//         $InfoEndDChangeSave = $_POST['InfoEndDChangeSave'];
//         $InfoEmployChangeSave = $_POST['InfoEmployChangeSave'];
//         $dateDbId = $_POST['dateDbId'];

//         $qpp = mysqli_query($db, "SELECT * FROM `calendar_one`");
//         foreach ($qpp as $key => $value) {
//             if($value['id'] == $dateDbId ){
//                 mysqli_query($db, "UPDATE `calendar_one` SET `action` = '$infoTitleChangeSave', `recurce_id` = '$infoRecurceChangeSave', `start_date` = '$infoStartDChangeSave', `end_date` = '$InfoEndDChangeSave', `from_work` = '$InfoEmployChangeSave', `notes_text` = '$notesText'   WHERE `id` = '$value[id]' ");
//                 echo $value['id'].",", $value['action'].",", $value['recurce_id'].",", $value['start_date'].",", $value['end_date'];
//             }
//         }

//         $homeIdChange = $_POST['homeIdChange'];
//         $streetChange = $_POST['streetChange'];
//         $buildingChange = $_POST['buildingChange'];
//         $houseChange = $_POST['houseChange'];

//         $qppTwo = mysqli_query($db, "SELECT * FROM `calendar_two`");
//         foreach ($qppTwo as $key => $value) {
//             if($value['other_id'] == $dateDbId){
//                 mysqli_query($db, "UPDATE `calendar_two` SET `home_id` = '$homeIdChange', `address_street` = '$streetChange', `address_building` = '$buildingChange', `address_house` = '$houseChange' WHERE `other_id` = '$dateDbId' ");
//             }
//         }

//     }

//     // Es event-e delete anelu hamara grac
//     if(isset($_POST['delEventTitle'], $_POST['delEventRecId'], $_POST['delEventStart'], $_POST['delEventEnd'])){
//         $delEventTitle = $_POST['delEventTitle'];
//         $delEventRecId = $_POST['delEventRecId'];
//         $delEventStart = $_POST['delEventStart'];
//         $delEventEnd = $_POST['delEventEnd'];
//         $delEventId = $_POST['delEventId'];

//         $queryInfo = mysqli_query($db, 'SELECT * FROM `calendar_one`');

//         foreach($queryInfo as $key => $value){
//             if($value['id'] == $delEventId){
//                 mysqli_query($db, "DELETE FROM `calendar_one` WHERE `id` = '$value[id]' ");
//             }
//         }

//         $queryInfoTwo = mysqli_query($db, 'SELECT * FROM `calendar_two`');
//         foreach ($queryInfoTwo as $key => $value) {
//             if($value['other_id'] ==  $delEventId){
//                 mysqli_query($db, "DELETE FROM `calendar_two` WHERE `other_id` = '$delEventId' ");
//             }
//         }

//     }
// ?>