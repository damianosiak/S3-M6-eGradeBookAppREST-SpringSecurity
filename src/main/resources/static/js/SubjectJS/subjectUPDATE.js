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
requestRead.open('GET', '/api/subject/'+id, true)
requestRead.onload = function () {
	var data = JSON.parse(this.response);
	
	var card = document.createElement("div");
	card.setAttribute("id","card");
	card.setAttribute("class","card col-sm-6");
	var cardHeader = document.createElement("div");
	cardHeader.setAttribute("class","card-header text-white bg-primary");
	var cardHeaderText = document.createTextNode("Update subject");
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
	formInputSubjectId.hidden=true;
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
	formInputSubjectName.setAttribute("required",true);
	var formLabelSubjectName = document.createElement("label");
	formLabelSubjectName.setAttribute("for","inputSubjectName");
	formLabelSubjectNameText = document.createTextNode("Subject Name");
	formLabelSubjectName.appendChild(formLabelSubjectNameText);
	form.appendChild(formInputSubjectName);
	form.appendChild(formLabelSubjectName);
	cardBody.appendChild(form);
	
	var requestReadTeachers = new XMLHttpRequest()
	requestReadTeachers.open('GET', '/api/teacher/', true)
	requestReadTeachers.onload = function () {
		var dataTeachers = JSON.parse(this.response);
		dataTeachers = dataTeachers.teacherList;
		
		var form = document.createElement("div");
		form.classList.add("form-floating");
		var formSelectTeacher = document.createElement("select");
		formSelectTeacher.setAttribute("id","selectTeacher");
		formSelectTeacher.setAttribute("class","form-select");
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
		var gSubjectId = document.getElementById("inputSubjectId").value;
		var gSubjectName = document.getElementById("inputSubjectName").value;
		var gGradeTeacherId = document.getElementById("selectTeacher").value;
		//alert(gGradeTeacherId);
		fetch('../api/subject/'+id, {
			method: "PUT",
			body: JSON.stringify({
				subjectId: gSubjectId,
				subjectName: gSubjectName,
				subjectTeacher:{
					teacherId: gGradeTeacherId
				}
			}),headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		.then(response => response.json())
		.then(json => console.log(json))
		alert("Updated");
		window.location.href = "/subjects";
	});
}
requestRead.send()