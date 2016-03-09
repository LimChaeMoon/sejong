var path = jQuery("meta[name='path']").attr("path");
var csrf = jQuery("meta[name='code']").attr("th:content");

$(function() {
	var dates = $("#from, #to ").datepicker({
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		dateFormat: 'yy-mm-dd',
		showMonthAfterYear: true,
		yearSuffix: '년',
		maxDate:'+365d',
		onSelect: function( selectedDate ) { 
			var option = this.id == "from" ? "minDate" : "maxDate", 
					instance = $( this ).data( "datepicker" ), 
					date = $.datepicker.parseDate( 
							instance.settings.dateFormat || 
							$.datepicker._defaults.dateFormat, 
							selectedDate, instance.settings ); 
			dates.not( this ).datepicker( "option", option, date ); 
			}
	});
	
	$('input[name=startTime]').timepicker({
		minuteStep : 1
	});

	$('input[name=endTime]').timepicker({
		minuteStep : 1
	});
});




function calendarInsert() {
	var str = 'PM';
	
	if ($('input[name=title]').val() == "") {
		alert("제목을 입력하세요");
		return ;
	}
	
	if ($('input[name=startDate]').val() == "") {
		alert("시작일을 입력하세요");
		return ;
	}

	if ($('input[name=startTime]').val() == "") {
		alert("시작시간을 입력하세요");
		return ;
	}
	
	if ($('input[name=endDate]').val() == "") {
		alert("종료일을 입력하세요");
		return ;
	}

	if ($('input[name=endTime]').val() == "") {
		alert("종료시간을 입력하세요");
		return ;
	}
	
	var start = $('input[name=startDate]').val().split('-');
	var startYear = start[0];
	var startMonth = start[1];
	var startDate = start[2];
	
	var startTimepicker = $('input[name=startTime]').timepicker().data().timepicker;
	var startMer = startTimepicker.meridian;
	var startHours = startTimepicker.hour
	var startMinutes = startTimepicker.minute;
	
	if (startMer.toLowerCase() == str.toLowerCase()){
		if (startHours != 12) {
			startHours = startHours + 12;
		}
	} else {
		if (startHours < 10) {
			startHours = "0"+startHours;
		}
	}
	
	if (startMinutes < 10) {
		startMinutes = "0"+startMinutes;
	}
	

	var end = $('input[name=endDate]').val().split('-');
	var endYear = end[0];
	var endMonth = end[1];
	var endDate = end[2];
	
	var endTimepicker = $('input[name=endTime]').timepicker().data().timepicker;
	var endMer = endTimepicker.meridian;
	var endHours = endTimepicker.hour
	var endMinutes = endTimepicker.minute;
	
	if (endMer.toLowerCase() == str.toLowerCase()){
		if (endHours != 12) {
			endHours = endHours + 12;
		}
	} else {
		if (endHours < 10) {
			endHours = "0"+endHours;
		}
	}
	
	if (endMinutes < 10) {
		endMinutes = "0"+endMinutes;
	}	
	
	var sDate = new Date(startYear, startMonth, startDate, startHours, startMinutes, 0, 0);
	var eDate = new Date(endYear, endMonth, endDate, endHours, endMinutes, 0, 0);
	
	if (sDate.getTime() > eDate.getTime()) {
		alert("시작일이 종료일보다 늦게 등록 할 수 없습니다");
		return ;
	}
	if (sDate.getTime() == eDate.getTime()) {
		alert("시작일 시간과 종료일 시간과 같게 설정 할 수 없습니다.");
		return ;
	}
	
	$('input[name=startTime]').val(startHours+":"+startMinutes);
	$('input[name=endTime]').val(endHours+":"+endMinutes);
	
	document.calendarForm.submit(); 	
}












function calendarDetail(event) {
	$(".modal-body").empty();
	$("#button-group").empty();
	$("#cal_title").text('일정 상세 보기');
	
	var innerHTML = '';
	innerHTML += '<label>작성자 : </label>';
	innerHTML += '<span id="cal-email"></span> <br />';
	innerHTML += '<label>시작일 : </label>';
	innerHTML += '<span id="cal-start"></span> <br />';
	innerHTML += '<label>종료일 : </label>';
	innerHTML += '<span id="cal-end"></span> <br />';
	innerHTML += '<label>제목 : </label>';
	innerHTML += '<span id="cal-title"></span> <br />';
	innerHTML += '<pre id="cal-contents"></pre>';
	innerHTML += '<div id="button-group" class="form-group">';
	innerHTML += '<input type="hidden" name="calNo" value="'+event.calno+'">';
	innerHTML += '</div>';

	$(".modal-body").append(innerHTML);

	var eventParam = event;
	
	var startSplit = event.start._i.split('T');
	var endSplit = event.end._i.split('T');
	
	var startDate = startSplit[0];
	var startTime = startSplit[1];
	
	var endDate = endSplit[0];
	var endTime = endSplit[1];

	$('#myModal').modal('show');
	$('#cal-title').text(event.title);
	$('#cal-email').text(event.id);
	$('#cal-start').text(startDate + ' ' + startTime);
	$('#cal-end').text(endDate + ' ' + endTime );
	$('#cal-contents').text(event.contents);


	if (myId == event.id) {
		var update_input = '<a class="btn btn-default button" onclick="updateForm();">수정</a>';
		var del_input = '<a class="btn btn-default" button onclick="deleteCalendar('+event.calno+');">삭제</a>';
		$('#button-group').append(update_input).append(del_input);
	}

}


function deleteCalendar(calno) {
	if (confirm("삭제하시겠습니까?") == true){
	    location.href= path+"/calendarDelete/"+calno;
	}else{
	    return;
	}
}

function calendarUpdate() {
	if (confirm("수정하시겠습니까?") == true){
		calendarInsert();
	}else{
		return;
	}
}




function updateForm() {
	var title = $('#cal-title').text();
	var email = $('#cal-email').text();
	var start = $('#cal-start').text();
	var end = $('#cal-end').text();
	var contents = $('#cal-contents').text();
	var calno = $('input[name=calNo]').val();
	
	
	var startDate = start.substring(0,10);
	var startTime = start.substring(11,16);
	var endDate = end.substring(0,10);
	var endTime = end.substring(11,16);

	$(".modal-body").empty();
	$("#cal_title").text('일정 수정');

	var innerHTML = '';
	innerHTML += '<form name="calendarForm" method="post" action="'+path+'/calendar/update">';
	innerHTML += '<input type="hidden" name="_csrf" value="'+csrf+'" >';
	innerHTML += '<input type="hidden" name="calNo" value="'+calno+'">';
	
	innerHTML += '<div class="form-group">'
	innerHTML += '<label>제목</label>'
	innerHTML += '<input type="text" class="form-control" name="title" value="'+title+'" placeholder="제목" required autofocus>';
	innerHTML += '</div>';
	
	innerHTML += '<div class="form-group">'
	innerHTML += '<label>내용</label>'
	innerHTML += '<textarea name="contents" class="form-control" rows="3">'+contents+'</textarea>';
	innerHTML += '</div>';
	
	innerHTML += '<div class="form-group">'
	innerHTML += '<label>시작일</label>'
	innerHTML += '<input type="text" name="startDate" id="from" class="form-control" value="'+startDate+'" required>';
	innerHTML += '</div>';		
	
	innerHTML += '<label>시작시간</label>'
	innerHTML += '<div class="input-group bootstrap-timepicker timepicker">'
	innerHTML += '<input id="startTime" type="text" name="startTime" class="form-control input-small" value="'+startTime+'" required>'
	innerHTML += '<span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>'
	innerHTML += '</div>';
	
	innerHTML += '<div class="form-group">'
	innerHTML += '<label>종료일</label>'
	innerHTML += '<input type="text" name="endDate" id="to" class="form-control" value="'+endDate+'" required>';
	innerHTML += '</div>';	
	
	innerHTML += '<label>종료시간</label>'
	innerHTML += '<div class="input-group bootstrap-timepicker timepicker">'
	innerHTML += '<input id="endTime" type="text" name="endTime" class="form-control input-small" value="'+endTime+'" required>'
	innerHTML += '<span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>'
	innerHTML += '</div>';
	
	innerHTML += '<div id="button-group" class="form-group">';
	innerHTML += '<button type="button" class="btn btn-default btn-lg button" onclick="calendarUpdate();">수정</button>';
	innerHTML += '</div>';
	innerHTML += '</form>';


$(".modal-body").append(innerHTML);

var dates = $('#from, #to').datepicker({
	prevText: '이전 달',
	nextText: '다음 달',
	monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	dayNames: ['일','월','화','수','목','금','토'],
	dayNamesShort: ['일','월','화','수','목','금','토'],
	dayNamesMin: ['일','월','화','수','목','금','토'],
	dateFormat: 'yy-mm-dd',
	showMonthAfterYear: true,
	yearSuffix: '년',
	maxDate:'+365d',
	onSelect: function( selectedDate ) { 
		var option = this.id == "from" ? "minDate" : "maxDate", 
				instance = $( this ).data( "datepicker" ), 
				date = $.datepicker.parseDate( 
						instance.settings.dateFormat || 
						$.datepicker._defaults.dateFormat, 
						selectedDate, instance.settings ); 
		dates.not( this ).datepicker( "option", option, date ); 
		}
});

var formTime = $('#startTime').timepicker({
	minuteStep : 1
});

var toTime = $('#endTime').timepicker({
	minuteStep : 1
});
	

}

function dateFormat(date) {
var yy = date.getFullYear();
var mm = date.getMonth()+1;
var dd = date.getDate();

if (mm < 10) {
	mm = "0"+mm;
}
if (dd < 10) {
	dd = "0"+dd;
}

return yy + "-"+ mm + "-"+ dd;
}
