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
requestRead.open('GET', '/api/subject/', true)
requestRead.onload = function () {
	var data = JSON.parse(this.response);
	data = data.teacherList;
	
	var card = document.createElement("div");
	card.setAttribute("id","card");
	card.setAttribute("class","card col-sm-6");
	var cardHeader = document.createElement("div");
	cardHeader.setAttribute("class","card-header text-white bg-primary");
	var cardHeaderText = document.createTextNode("Create subject");
	cardHeader.appendChild(cardHeaderText);
	card.appendChild(cardHeader);
	
	var cardBody = document.createElement("div");
	cardBody.setAttribute("class","card-body");
	
	var form = document.createElement("div");
	form.setAttribute("class","form-floating");
	var formInputSubjectName = document.createElement("input");
	formInputSubjectName.setAttribute("id","inputSubjectName");
	formInputSubjectName.setAttribute("class","form-control bg-white");
	formInputSubjectName.type="text";
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
	var buttonSaveText = document.createTextNode("Add");
	buttonSave.appendChild(buttonSaveText);
	cardFooter.appendChild(buttonSave);
	card.appendChild(cardFooter);
	container.appendChild(card);
	
	buttonSave.addEventListener("click", function(){
		
		var vSubjectName = document.getElementById("inputSubjectName").value;
		var vSubjectTeacherId = document.getElementById("selectTeacher").value;
		
		if(vSubjectName.length>0 && vSubjectTeacherId.length>0){
			fetch("/api/subject/", {
				method: "POST",
				body: JSON.stringify({
				subjectId: "",
				subjectName: vSubjectName,
				subjectTeacher:{
					teacherId: vSubjectTeacherId
				}
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
			})
			.then(response => response.json())
			.then(json => console.log(json))
			alert("Added");
			window.location.href = "/subjects";
		}else{
			alert("Fill required fields");
		}
	});
	
	buttonBack.addEventListener("click", function(){
		window.history.back();
	});
}
requestRead.send()