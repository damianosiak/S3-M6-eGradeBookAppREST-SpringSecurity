const app = document.getElementById('root')
const container = document.createElement('div')
container.setAttribute('class', 'container')
app.appendChild(container)

var logout = document.createElement("button");
logout.setAttribute("class", "button btn-danger col-sm-1");
logout.setAttribute("style", "position: absolute; right:0px; top:0px;");
var logoutText=document.createTextNode("Logout");
logout.appendChild(logoutText);
app.appendChild(logout);

logout.addEventListener("click",function(){
	window.location.href="/logout";
})

var requestRead = new XMLHttpRequest()
var id = localStorage.getItem("localSubjectId");
//var id = 1;
requestRead.open('GET', '../api/subject/'+id, true)
requestRead.onload = function () {
	var data = JSON.parse(this.response);
	
	var card = document.createElement("div");
	card.setAttribute("id","card");
	card.setAttribute("class","card col-sm-6");
	var cardHeader = document.createElement("div");
	cardHeader.setAttribute("class","card-header text-white bg-primary");
	var cardHeaderText = document.createTextNode("Subject details");
	cardHeader.appendChild(cardHeaderText);
	card.appendChild(cardHeader);
	
	var cardBody = document.createElement("div");
	cardBody.setAttribute("class","card-body");
	
	var form = document.createElement("div");
	form.setAttribute("class","form-floating");
	var formInputSubjectId = document.createElement("input");
	formInputSubjectId.setAttribute("id","inputSubjectId");
	formInputSubjectId.setAttribute("class","form-control bg-white");
	formInputSubjectId.type="number";
	formInputSubjectId.value=data.subjectId;
	formInputSubjectId.setAttribute("readonly",true);
	var formLabelSubjectId = document.createElement("label");
	formLabelSubjectId.setAttribute("for","inputSubjectId");
	formLabelSubjectIdText = document.createTextNode("Subject ID");
	formLabelSubjectId.appendChild(formLabelSubjectIdText);
	form.appendChild(formInputSubjectId);
	form.appendChild(formLabelSubjectId);
	cardBody.appendChild(form);
	
	var form = document.createElement("div");
	form.setAttribute("class","form-floating");
	var formInputSubjectName = document.createElement("input");
	formInputSubjectName.setAttribute("id","inputSubjectName");
	formInputSubjectName.setAttribute("class","form-control bg-white");
	formInputSubjectName.type="text";
	formInputSubjectName.value=data.subjectName;
	formInputSubjectName.setAttribute("readonly",true);
	var formLabelSubjectName = document.createElement("label");
	formLabelSubjectName.setAttribute("for","inputSubjectName");
	formLabelSubjectNameText = document.createTextNode("Subject Name");
	formLabelSubjectName.appendChild(formLabelSubjectNameText);
	form.appendChild(formInputSubjectName);
	form.appendChild(formLabelSubjectName);
	cardBody.appendChild(form);
	
	var form = document.createElement("div");
	form.setAttribute("class","form-floating bg-white");
	var formInputSubjectTeacherId = document.createElement("input");
	formInputSubjectTeacherId.setAttribute("id","inputSubjectTeacherId");
	formInputSubjectTeacherId.setAttribute("class","form-control bg-white");
	formInputSubjectTeacherId.type="number";
	formInputSubjectTeacherId.type="hidden";
	form.hidden=true;
	formInputSubjectTeacherId.value=data.subjectTeacher.teacherId;
	var formLabelSubjectTeacherId = document.createElement("label");
	formLabelSubjectTeacherId.setAttribute("for","inputSubjectTeacherId");
	formLabelSubjectTeacherIdText = document.createTextNode("Subject Teacher ID");
	formLabelSubjectTeacherId.appendChild(formLabelSubjectTeacherIdText);
	form.appendChild(formInputSubjectTeacherId);
	form.appendChild(formLabelSubjectTeacherId);
	cardBody.appendChild(form);
	
	var form = document.createElement("div");
	form.setAttribute("class","form-floating");
	var formInputSubjectTeacherName = document.createElement("input");
	formInputSubjectTeacherName.setAttribute("id","inputSubjectTeacherName");
	formInputSubjectTeacherName.setAttribute("rows",3);
	formInputSubjectTeacherName.setAttribute("class","form-control bg-white");
	formInputSubjectTeacherName.type="text";
	formInputSubjectTeacherName.setAttribute("readonly",true);
	formInputSubjectTeacherName.value=data.subjectTeacher.teacherFirstName+" "+data.subjectTeacher.teacherLastName;
	var formLabelSubjectTeacherName = document.createElement("label");
	formLabelSubjectTeacherName.setAttribute("for","inputSubjectTeacherName");
	formLabelSubjectTeacherNameText = document.createTextNode("Teacher");
	formLabelSubjectTeacherName.appendChild(formLabelSubjectTeacherNameText);
	form.appendChild(formInputSubjectTeacherName);
	form.appendChild(formLabelSubjectTeacherName);
	cardBody.appendChild(form);
	
	card.appendChild(cardBody);
	
	var cardFooter = document.createElement("div");
	cardFooter.classList.add("card-footer");
	cardFooter.classList.add("text-muted");
	cardFooter.classList.add("text-end");
	
	var buttonBack = document.createElement("button");
	buttonBack.classList.add("btn");
	buttonBack.classList.add("btn-outline-warning");
	buttonBack.classList.add("me-md-2");
	var buttonBackText = document.createTextNode("Back");
	buttonBack.appendChild(buttonBackText);
	cardFooter.appendChild(buttonBack);
	
	var buttonDelete = document.createElement("button");
	buttonDelete.classList.add("btn");
	buttonDelete.classList.add("btn-outline-danger");
	buttonDelete.classList.add("me-md-2");
	var buttonDeleteText = document.createTextNode("Delete");
	buttonDelete.appendChild(buttonDeleteText);
	cardFooter.appendChild(buttonDelete);
	
	var buttonSave = document.createElement("button");
	buttonSave.classList.add("btn");
	buttonSave.classList.add("btn-outline-success");
	buttonSave.classList.add("btn-outline-info");
	var buttonSaveText = document.createTextNode("Update");
	buttonSave.appendChild(buttonSaveText);
	cardFooter.appendChild(buttonSave);
	
	card.appendChild(cardFooter);
	container.appendChild(card);
	
	buttonBack.addEventListener("click", function(){
		window.history.back();
	});
	
	buttonDelete.addEventListener ("click", function() {
			  var requestDelete = new XMLHttpRequest();
			  var url='../api/subject/'+data.subjectId;
			  requestDelete.open('DELETE', url, true);
			  requestDelete.send;
			  requestDelete.onload = function(){
					if(requestDelete.readyState==4 && requestDelete.status=="200"){
						alert("Deleted");
						window.location.href = "/subjects";
					}else{
						alert("Error");
					}
				}
				requestDelete.send();
			});
	
	buttonSave.addEventListener("click", function(){
		window.location.href = "/subjects/update";
	});
}
requestRead.send()