Lpad = function(str, len) {
	str = str + "";
	while (str.length < len) {
		str = "0" + str;
	}
	return str;
}


// / 사용자로부터 마우스 또는 키보드 이벤트가 없을경우의 자동로그아웃까지의 대기시간, 분단위
var iMinute = 20;

// 자동로그아웃 처리 몇초전에 경고를 보여줄지 설정하는 부분, 초단위
var noticeSecond = 55;

var iSecond = iMinute * 60;
var timerchecker = null;


initTimer = function() {
	// / //사용자부터 마우스 또는 키보드 이벤트가 발생했을경우 자동로그아웃까지의 대기시간을 다시 초기화
	if (window.event) {
		iSecond = iMinute * 60;
		;
		clearTimeout(timerchecker);
		coverFilmMain.style.visibility = 'hidden'; // // 입력방지 레이어 해제
		timer.style.visibility = 'hidden'; // / 자동로그아웃 경고레이어 해제
	}
	rMinute = parseInt(iSecond / 60);
	rSecond = iSecond % 60;
	if (iSecond > 0) {
		// ///지정한 시간동안 마우스, 키보드 이벤트가 발생되지 않았을 경우
		if (iSecond < noticeSecond) {
			coverFilmMain.style.visibility = 'visible'; // / 입력방지 레이어 활성
			timer.style.visibility = 'visible'; // / 자동로그아웃 경고레이어 활성
		}
		// /자동로그아웃 경고레이어에 경고문+남은 시간 보여주는 부분
		timer.innerHTML = "<span style='font-size:50px; '>자동 로그 아웃 </span> </h1> <span style='color : red; font-size:50px;'>"
				+ Lpad(rMinute, 2) + ":" + Lpad(rSecond, 2);
		iSecond--;
		timerchecker = setTimeout("initTimer()", 1000); // 1초 간격으로 체크
	} else {
		clearTimeout(timerchecker);
		alert("장시간 미사용으로 자동 로그아웃 처리되었습니다.");
		
		var form = document.createElement("form"); // form 엘리멘트 생성
		form.setAttribute("method", "post");
		form.setAttribute("action", "/sejong/member/logout");
		document.body.appendChild(form); // 현재 페이지에 form 엘리멘트 추가

		var input = document.createElement("input"); // input 엘리멘트 생성
		input.setAttribute("type", "hidden");
		input.setAttribute("name", "_csrf");
		input.setAttribute("value", jQuery("meta[name='code']").attr("th:content"));
		form.appendChild(input); // form 엘리멘트에 input 엘리멘트 추가

		form.submit(); // 전송
	}
}
onload = initTimer;// /현재 페이지 대기시간
document.onclick = initTimer; // / 현재 페이지의 사용자 마우스 클릭이벤트 캡춰
document.onkeypress = initTimer;// / 현재 페이지의 키보트 입력이벤트 캡춰

$(window).scroll(function(){
	$('#coverFilmMain').animate({top:$(window).scrollTop()+"px" },{queue: false, duration: 350});    
	$('#timer').animate({top:$(window).scrollTop()+"px" },{queue: false, duration: 350});    
});