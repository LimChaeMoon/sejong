$.validator.addMethod("password", function(value, element) {
	return this.optional(element)
			|| /^(?=.*\d)(?=.*[a-zA-Z]).{6,15}$/i.test(value);
}, "비밀번호는 6자리~15자리 영문 숫자 조합으로 입력하세요.");

$(document).ready(function() {

	$("#memberJoin").validate({
		rules : {
			email : {
				required : true,
				email : true,
				remote : {
					url: "emailCheck",
					type : "get"
				}
			},
			name : {
				required : true,
				minlength : 2,
				maxlength : 5
			},
			pw : {
				required : true,
				password : true
			},
			repw : {
				required : true,
				equalTo : "#pw"
			},
			dept : {
				required : true
			},
			job : {
				required : true
			}
		},
		messages : {
			email : {
				required : "이메일을 입력해 주세요.",
				email : "이메일이 형식에 맞지 않습니다.",
				remote : "이미 가입된 이메일 입니다."
			},
			name : {
				required : "이름을 입력해 주세요.",
				minlength : "이름은 최소 {0}글자 입니다.",
				maxlength : "이름은 최대 {0}글자 입니다."
			},
			pw : {
				required : "비밀번호를 입력해 주세요."
			},
			repw : {
				required : "비밀번호 확인값을 입력해 주세요.",
				equalTo : "비밀번호 확인이 잘못되었습니다."
			},
			dept : {
				required : "부서를 입력하시기 바랍니다."
			},
			job : {
				required : "직책을 입력하시기 바랍니다."
			}
		}
	});
	
});

$(document).ready(function() {
	
	$("#memberModify").validate({
		rules : {
			name : {
				required : true,
				minlength : 2,
				maxlength : 5
			},
			pw : {
				required : true
			},
			newpw : {
				required : true,
				password : true
			},
			newpwre : {
				required : true,
				equalTo : "#newpw"
			},
			dept : {
				required : true
			},
			job : {
				required : true
			}
		},
		messages : {
			name : {
				required : "이름을 입력해 주세요.",
				minlength : "이름은 최소 {0}글자 입니다.",
				maxlength : "이름은 최대 {0}글자 입니다."
			},
			pw : {
				required : "기존 비밀번호를 입력해 주세요."
			},
			newpw : {
				required : "변경할 비밀번호를 입력해 주세요."
			},
			newpwre : {
				required : "다시 변경할 비밀번호를 입력해 주세요.",
				equalTo : "새 비밀번호와 새 비밀번호 확인이 잘못되었습니다."
			},
			dept : {
				required : "부서를 입력하시기 바랍니다."
			},
			job : {
				required : "직책을 입력하시기 바랍니다."
			}
		}
	});
	
});


$(document).ready(function() {

	$("#login").validate({
		rules : {
			email : {
				required : true,
				email : true
			},
			pw : {
				required : true
			}
		},
		messages : {
			email : {
				required : "이메일을 입력해 주세요.",
				email : "이메일이 형식에 맞지 않습니다."
			},
			pw : {
				required : "비밀번호를 입력해 주세요."
			}
		},
		// 키보드에 의한 검사 해제
		onkeyup : false,
		// 체크박스나 라디오 버튼은 클릭시마다 검사 해제
		onclick : false,
		// 포커스가 빠져나올 경우의 검사 해제
		onfocusout : false,
		// 에러 발생시 이벤트를 가로 챔
		showErrors : function(errorMap, errorList) {
			// 에러메시지 출력
			alert(errorList[0].message);
		}
	});
	
});