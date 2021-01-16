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
	var cardHeaderText = document.createTextNode("Update Grade");
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
	formInputGradeId.type="hidden";
	form.hidden=true;
	formInputGradeId.value=data.gradeId;
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
	formInputGradeValue.required=true;
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
	formInputGradeDescription.value=data.gradeDescription;
	formInputGradeDescription.required=true;
	var formLabelGradeDescription = document.createElement("label");
	formLabelGradeDescription.setAttribute("for","inputGradeDescription");
	formLabelGradeDescriptionText = document.createTextNode("Grade Description");
	formLabelGradeDescription.appendChild(formLabelGradeDescriptionText);
	form.appendChild(formInputGradeDescription);
	form.appendChild(formLabelGradeDescription);
	cardBody.appendChild(form);

	var requestReadTeachers = new XMLHttpRequest()
	requestReadTeachers.open('GET', '../api/teacher/', true)
	requestReadTeachers.onload = function () {
		var dataTeachers = JSON.parse(this.response);
		dataTeachers = dataTeachers.teacherList;
		
		var form = document.createElement("div");
		form.classList.add("form-floating");
		var formSelectTeacher = document.createElement("select");
		formSelectTeacher.setAttribute("id","selectTeacher");
		formSelectTeacher.classList.add("form-select");
		formSelectTeacher.required=true;
		dataTeachers.forEach((teacher)=>{
			var formSelectOptionTeacher = document.createElement("option");
			formSelectOptionTeacher.setAttribute("value",teacher.teacherId);
			var formSelectOptionTeacherText = document.createTextNode(teacher.teacherFirstName+" "+teacher.teacherLastName);
			formSelectOptionTeacher.appendChild(formSelectOptionTeacherText);
			formSelectTeacher.appendChild(formSelectOptionTeacher);
		});
		var formSelectTeacherLabel = document.createElement("label");
		formSelectTeacherLabel.setAttribute("for","selectTeacher");
		var formSelectTeacherLabelText = document.createTextNode("Teacher");
		formSelectTeacherLabel.appendChild(formSelectTeacherLabelText);
		form.appendChild(formSelectTeacher);
		form.appendChild(formSelectTeacherLabel);
		cardBody.appendChild(form);
	};
	requestReadTeachers.send();
	
	card.appendChild(cardBody);
	
	var cardFooter = document.createElement("div");
	cardFooter.classList.add("card-footer");
	cardFooter.classList.add("text-muted");
	cardFooter.classList.add("text-end");
	
	var buttonBack = document.createElement("button");
	buttonBack.classList.add("btn");
	buttonBack.classList.add("btn-outline-warning");
	var buttonBackText = document.createTextNode("Back");
	buttonBack.appendChild(buttonBackText);
	
	cardFooter.appendChild(buttonBack);
	
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
		var gGradeId = document.getElementById("inputGradeId").value;
		var gGradeValue = document.getElementById("inputGradeValue").value;
		var gGradeDescription = document.getElementById("inputGradeDescription").value;
		var gGradeTeacherId = document.getElementById("selectTeacher").value;
		fetch('../api/grade/'+id, {
			method: "PUT",
			body: JSON.stringify({
				gradeId: gGradeId,
				gradeValue: gGradeValue,
				gradeDescription: gGradeDescription,
				gradeTeacher:{
					teacherId: gGradeTeacherId
				}
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		.then(response => response.json())
		.then(json => console.log(json))
		alert("Updated");
		window.location.href = "/grades";
	});
}
requestRead.send()