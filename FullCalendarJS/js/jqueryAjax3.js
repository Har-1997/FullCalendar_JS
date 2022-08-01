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
console.log(onloadResult);

let printEvents = [];
for (let l = 0; l < onloadResult.length; l++) {
    printEvents.push({id: onloadResult[l].id, title: onloadResult[l].action, start: onloadResult[l].start_date, end: onloadResult[l].end_date, resourceId: onloadResult[l].user_bit_id});
};
for (let ll = 0; ll < onloadResult.length; ll++) {
    if(onloadResult[ll].show == "1"){
        printEvents[ll].color = 'green';
    }
}

    // let stringified = JSON.stringify(printEvents);
    // localStorage.setItem('printEvents', stringified);
    
    // let infoEventsBaza = localStorage.getItem("printEvents");
    // let infoEvents = JSON.parse(infoEventsBaza);

initCalendar();
function initCalendar(){    
    $('.saveInfoBtn').on('click', function(){
        let action =  $('#selectType').val();
        let bitrixId = $('#bitIdSpan').html();
        let startInp = $('#startInp').val();
        let endInp = $('#endInp').val();
        let employeeId = $('#employeeId').val();
        let notesText = $('#notesText').val();

        let addressStreet = $('#addressStreet').val();
        let addressBuilding = $('#addressBuilding').val();
        let addressHouse = $('#addressHouse').val();
        let homeID = $('#homeID').val();

        // bitrixDealAdd(action, startInp, endInp);
        
        if(selectType == ""){
            alert("Լրացրու տեսակը");
            return false;
        }else if(homeID == ""){
            alert('Լրացրեք տան id-ն');
            return false;
        }
        else if(addressStreet == ""){
            alert("Քաղաքի անունը լրացրեք");
            return false;
        }else if(addressBuilding == ""){
            alert('Լրացրու փողոցի անունը');
            return false;
        }else if(addressHouse == ""){
            alert('Լրացրու բնակարանի թիվը');
            return false;
        }else if(employeeId == ""){
            alert('Լրացրու աշխատակցի անունը');
            return false;
        }
        
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
                "bitrixId": bitrixId,
                "startInp": startInp,
                "endInp": endInp,
                "homeID": homeID,
                "employeeId": employeeId,
                "notesText": notesText,

                'homeID': homeID,
                'addressStreet': addressStreet,
                'addressBuilding': addressBuilding,
                'addressHouse': addressHouse
            },
            beforeSend: function() {
                $('#saveInfoBtn').prop("disabled", true);
            },
            success: function(result) {
                $('#saveInfoBtn').prop("disabled", false);
                console.log(result)
                jsonData = JSON.parse(result);
                console.log(jsonData);

                if(jsonData !== undefined){            
                    let j = jsonData.length-1;
                    obj = {
                        id: jsonData[j].id,
                        resourceId: [jsonData[j].user_bit_id],
                        title: jsonData[j].action,
                        start: jsonData[j].start_date,
                        end: jsonData[j].end_date,
                        allDay: false,   
                    };
                    printEvents.push(obj);
                    addEvent(obj);
                } 
            }
        });
        $('#topapForMe').css({'display':'none'});
    });

    function commitEdit(event) {
        let id = event;
    
        let title = $('#selectType').val();
        let employeeId = $('#employeeId').val();
        let start = $('#startInp').val();
        let end = $('#endInp').val();
        let idEvent = $('#bitIdSpan').html();
        
        calendar.getEventById(id).remove();

        for (let i = 0; i < printEvents.length; i++) {
            if(printEvents[i].id === id){
                printEvents[i]={
                    id: id,
                    title: title,
                    employeeId: employeeId,
                    start: start,
                    end: end,
                    resourceId: idEvent,
                    color: printEvents[i].color
                };
                addEvent(printEvents[i]);
            }
        }
            // let stringifieded = JSON.stringify(infoEvents);
            // let infoRefresh = localStorage.setItem('infoEvents', stringifieded);
    } 

    function Changecolor(info) {
        let id = info;
        calendar.getEventById(id).remove();
        for (let j = 0; j < printEvents.length; j++) {
            if(printEvents[j].id === id){
                printEvents[j].color = "green";
                printEvents[j].rec
                addEvent(printEvents[j]);
            }
        }
    }

    function addEvent(event) {
        calendar.addEvent(event);
    }
    function saveEventsTable(){
        for (let i = 0; i < printEvents.length; i++) {
            obj = {
                id: printEvents[i].id,
                resourceId: printEvents[i].resourceId,
                title: printEvents[i].title,
                start: printEvents[i].start,
                end: printEvents[i].end,
            } 
            addEvent(obj);  
        }
    }
    $(document).ready( function(){
        for (let i = 0; i < printEvents.length; i++) {
            obj = {
                id: printEvents[i].id,
                resourceId: printEvents[i].resourceId,
                title: printEvents[i].title,
                start: printEvents[i].start,
                end: printEvents[i].end,
                color: printEvents[i].color
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
                    for (let j = 0; j < printEvents.length; j++) {
                        if(printEvents[j].id === dropEventId){
                            printEvents[j].start = newinfoDrop[0];
                            printEvents[j].end = newinfoDrop[1];
                            printEvents[j].resourceId = newinfoDrop[2];
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
                    for (let j = 0; j < printEvents.length; j++) {
                        if(printEvents[j].id === resizeEventId){
                            printEvents[j].start = newinfoResize[0];
                            printEvents[j].end = newinfoResize[1];
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
            $('#bitIdSpan').html(info.event._def.resourceIds[0]);
            $('#startSpan').html(info.event.startStr);
            $('#endSpan').html(info.event.endStr);

            $.ajax({
                url: 'ajax/index2.php',
                type: 'POST',
                data: {
                    "clickTitle": info.event.title,
                    "clickBitrixId": info.event._def.resourceIds[0],
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
                        "clickBitrixIdTwo": info.event._def.resourceIds[0],
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
                $('#bitIdSpan').html(info.event._def.resourceIds[0]);
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
                let infoBitIdChangeSave = $('#bitIdSpan').html();
                let infoStartDChangeSave = $('#startInp').val();
                let InfoEndDChangeSave = $('#endInp').val();
                let InfoEmployChangeSave = $('#employeeId').val();
                let notesText = $('#notesText').val();

                let homeIdChange = $('#homeID').val();
                let streetChange = $('#addressStreet').val();
                let buildingChange = $('#addressBuilding').val();
                let houseChange = $('#addressHouse').val();
                
                let actionDB = info.event.title;
                let bitrixIDDB = info.event._def.resourceIds[0];
                let startDateDB = info.event.startStr;
                let endDateDB = info.event.endStr;
                let dateDbId = idEventChange;
                
                $.ajax({
                    url: 'ajax/index2.php',
                    type: 'POST',
                    data: {
                        "actionDB": actionDB,
                        "bitrixIDDB": bitrixIDDB,
                        "startDateDB": startDateDB,
                        "endDateDB": endDateDB,
                        "infoTitleChangeSave": infoTitleChangeSave,
                        "infoBitIdChangeSave": infoBitIdChangeSave,
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
                let delEventBtId = info.event._def.resourceIds[0];
                let delEventStart = info.event.startStr;
                let delEventEnd = info.event.endStr;
                let delEventId = info.event.id;
                
                $.ajax({
                    url: 'ajax/index2.php',
                    type: 'POST',
                    data: {
                        'delEventTitle': delEventTitle,
                        'delEventBtId': delEventBtId,
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
            $('#bitIdSpan').html(info.resource.id);
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
            $('#bitIdSpan').html(info.resource.id);

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






