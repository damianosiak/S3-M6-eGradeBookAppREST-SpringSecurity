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
var id = localStorage.getItem("local");
requestRead.open('GET', '../api/grade/'+id, true)
requestRead.onload = function () {
	var data = JSON.parse(this.response);
	
	var card = document.createElement("div");
	card.setAttribute("id","card");
	card.classList.add("card");
	card.classList.add("col-sm-6");
	var cardHeader = document.createElement("div");
	cardHeader.classList.add("card-header");
	cardHeader.classList.add("text-white");
	cardHeader.classList.add("bg-primary");
	var cardHeaderText = document.createTextNode("Grade details");
	cardHeader.appendChild(cardHeaderText);
	card.appendChild(cardHeader);
	
	var cardBody = document.createElement("div");
	cardBody.classList.add("card-body");
	
	var form = document.createElement("div");
	form.classList.add("form-floating");
	var formInputGradeId = document.createElement("input");
	formInputGradeId.setAttribute("id","inputGradeId");
	formInputGradeId.classList.add("form-control");
	formInputGradeId.type="number";
	formInputGradeId.value=data.gradeId;
	formInputGradeId.setAttribute("readonly",true);
	formInputGradeId.classList.add("bg-white");
	var formLabelGradeId = document.createElement("label");
	formLabelGradeId.setAttribute("for","inputGradeId");
	formLabelGradeIdText = document.createTextNode("Grade ID");
	formLabelGradeId.appendChild(formLabelGradeIdText);
	form.appendChild(formInputGradeId);
	form.appendChild(formLabelGradeId);
	cardBody.appendChild(form);
	
	var form = document.createElement("div");
	form.classList.add("form-floating");
	var formInputGradeValue = document.createElement("input");
	formInputGradeValue.setAttribute("id","inputGradeValue");
	formInputGradeValue.classList.add("form-control");
	formInputGradeValue.type="number";
	formInputGradeValue.min=1;
	formInputGradeValue.max=6;
	formInputGradeValue.value=data.gradeValue;
	formInputGradeValue.setAttribute("readonly",true);
	formInputGradeValue.classList.add("bg-white");
	var formLabelGradeValue = document.createElement("label");
	formLabelGradeValue.setAttribute("for","inputGradeValue");
	formLabelGradeValueText = document.createTextNode("Grade Value");
	formLabelGradeValue.appendChild(formLabelGradeValueText);
	form.appendChild(formInputGradeValue);
	form.appendChild(formLabelGradeValue);
	cardBody.appendChild(form);
	
	var form = document.createElement("div");
	form.classList.add("form-floating");
	var formInputGradeDescription = document.createElement("input");
	formInputGradeDescription.setAttribute("id","inputGradeDescription");
	formInputGradeDescription.setAttribute("rows",3);
	formInputGradeDescription.classList.add("form-control");
	formInputGradeDescription.type="text";
	formInputGradeDescription.setAttribute("readonly",true);
	formInputGradeDescription.value=data.gradeDescription;
	formInputGradeDescription.classList.add("bg-white");
	var formLabelGradeDescription = document.createElement("label");
	formLabelGradeDescription.setAttribute("for","inputGradeDescription");
	formLabelGradeDescriptionText = document.createTextNode("Grade Description");
	formLabelGradeDescription.appendChild(formLabelGradeDescriptionText);
	form.appendChild(formInputGradeDescription);
	form.appendChild(formLabelGradeDescription);
	cardBody.appendChild(form);
	
	var form = document.createElement("div");
	form.classList.add("form-floating");
	var formInputGradeTeacherId = document.createElement("input");
	formInputGradeTeacherId.setAttribute("id","inputGradeTeacherId");
	formInputGradeTeacherId.classList.add("form-control");
	formInputGradeTeacherId.type="number";
	formInputGradeTeacherId.type="hidden";
	form.hidden=true;
	formInputGradeTeacherId.value=data.gradeTeacher.teacherId;
	var formLabelGradeTeacherId = document.createElement("label");
	formLabelGradeTeacherId.setAttribute("for","inputGradeTeacherId");
	formLabelGradeTeacherIdText = document.createTextNode("Grade Teacher ID");
	formLabelGradeTeacherId.appendChild(formLabelGradeTeacherIdText);
	form.appendChild(formInputGradeTeacherId);
	form.appendChild(formLabelGradeTeacherId);
	form.classList.add("bg-white");
	cardBody.appendChild(form);
	
	var form = document.createElement("div");
	form.classList.add("form-floating");
	var formInputGradeTeacherName = document.createElement("input");
	formInputGradeTeacherName.setAttribute("id","inputGradeTeacherName");
	formInputGradeTeacherName.setAttribute("rows",3);
	formInputGradeTeacherName.classList.add("form-control");
	formInputGradeTeacherName.type="text";
	formInputGradeTeacherName.setAttribute("readonly",true);
	formInputGradeTeacherName.value=data.gradeTeacher.teacherFirstName+" "+data.gradeTeacher.teacherLastName;
	formInputGradeTeacherName.classList.add("bg-white");
	var formLabelGradeTeacherName = document.createElement("label");
	formLabelGradeTeacherName.setAttribute("for","inputGradeTeacherName");
	formLabelGradeTeacherNameText = document.createTextNode("Teacher");
	formLabelGradeTeacherName.appendChild(formLabelGradeTeacherNameText);
	form.appendChild(formInputGradeTeacherName);
	form.appendChild(formLabelGradeTeacherName);
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
	var buttonSaveText = document.createTextNode("Update");
	buttonSave.appendChild(buttonSaveText);
	cardFooter.appendChild(buttonSave);
	
	card.appendChild(cardFooter);
	container.appendChild(card);
	
	buttonBack.addEventListener("click", function(){
		window.history.back();
	});
	
	buttonSave.addEventListener("click", function(){
		window.location.href = "/grades/update";
	});
}
requestRead.send()