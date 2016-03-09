var totalSize = 0;

function sizeCheck(obj){

var size = obj.files[0].size;
totalSize += size;
console.log(totalSize);

var fileName = obj.value;
var idx = fileName.lastIndexOf(".")+1;
var idx2 = fileName.lastIndexOf("\\")+1;
var extension = (fileName.substr(idx, fileName.length)).toLowerCase();

var fileNameCheck = fileName.substring(idx2, fileName.length).toLowerCase();

	if (fileNameCheck.length != 0) {
		if (extension == 'php' || extension == 'jsp' || extension == 'asp' || extension == 'exe') {
			alert("해당 확장자는 업로드 하실 수 없습니다.");
			obj.value="";
		} else if (size > 20971520) {
			alert("업로드 가능한 총 용량은 20Mb 까지 입니다.");
			obj.value="";
		}
	}

}

function boardWriter() {
	var title = document.formBoard.title.value;
	var contents =  $('#contents').val(CKEDITOR.instances['contents'].getData());
	contents = contents.val();
	title = title.replace(/(^\s*)|(\s*$)/gi, "");
	contents = contents.replace(/(^\s*)|(\s*$)/gi, "");
	
	console.log(contents);
	
	if (title == '') {
		alert("제목을 입력하시기 바랍니다.");
	} else if (contents == '') {
		alert("내용을 입력하시기 바랍니다.");
	} else {
		document.formBoard.submit();		
	}
	
	
}

$(function(){
	$("#itemAdd").on("click", function(){
		var count = ($("input[name=file1]").length);

		if (count < 5) {
			var new_div = "<div class='fileList'>";
			new_div += '<input type="file" class="file1" name="file1" onchange="sizeCheck(this)" style="display : inline-block;">';
			new_div += '<input type="button" value="삭제" class="delete_item" >';
			new_div += '</div>';	
			$("#fileList").append(new_div);
		} else {
			alert("더 이상 추가하실 수 없습니다!");
		}
	})
})

$(document).on("click", ".delete_item", function() {
	var fileSize = $(this).prev()[0].files[0].size;
	if (fileSize != 'undefined') {
		totalSize -= fileSize;
	}
	$(this).parents(".fileList").remove();
});