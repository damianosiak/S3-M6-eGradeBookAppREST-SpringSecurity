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
var id = localStorage.getItem("localStudentId");
requestRead.open('GET', '../api/student/'+id, true)
requestRead.onload = function () {
	var data = JSON.parse(this.response);
	
	var card = document.createElement("div");
	card.setAttribute("id","card");
	card.setAttribute("class","card col-sm-6");
	var cardHeader = document.createElement("div");
	cardHeader.setAttribute("class","card-header text-white bg-primary");
	var cardHeaderText = document.createTextNode("Update student");
	cardHeader.appendChild(cardHeaderText);
	card.appendChild(cardHeader);
	
	var cardBody = document.createElement("div");
	cardBody.setAttribute("class","card-body");
	
	var form = document.createElement("div");
	form.setAttribute("class","form-floating");
	var formInputStudentId = document.createElement("input");
	formInputStudentId.setAttribute("id","inputStudentId");
	formInputStudentId.setAttribute("class","form-control bg-white");
	formInputStudentId.type="number";
	formInputStudentId.value=data.studentId;
	formInputStudentId.setAttribute("readonly",true);
	formInputStudentId.hidden=true;
	var formLabelStudentId = document.createElement("label");
	formLabelStudentId.setAttribute("for","inputStudentId");
	var formLabelStudentIdText = document.createTextNode("Student ID");
	formLabelStudentId.appendChild(formLabelStudentIdText);
	form.appendChild(formInputStudentId);
	form.appendChild(formLabelStudentId);
	cardBody.appendChild(form);
	
	var form = document.createElement("div");
	form.setAttribute("class","form-floating");
	var formInputStudentFirstName = document.createElement("input");
	formInputStudentFirstName.setAttribute("id","inputStudentFirstName");
	formInputStudentFirstName.setAttribute("class","form-control bg-white");
	formInputStudentFirstName.type="text";
	formInputStudentFirstName.value=data.studentFirstName;
	formInputStudentFirstName.setAttribute("required",true);
	var formLabelStudentFirstName = document.createElement("label");
	formLabelStudentFirstName.setAttribute("for","inputStudentFirstName");
	var formLabelStudentFirstNameText = document.createTextNode("First Name");
	formLabelStudentFirstName.appendChild(formLabelStudentFirstNameText);
	form.appendChild(formInputStudentFirstName);
	form.appendChild(formLabelStudentFirstName);
	cardBody.appendChild(form);
	
	var form = document.createElement("div");
	form.setAttribute("class","form-floating");
	var formInputStudentLastName = document.createElement("input");
	formInputStudentLastName.setAttribute("id","inputStudentLastName");
	formInputStudentLastName.setAttribute("class","form-control bg-white");
	formInputStudentLastName.type="text";
	formInputStudentLastName.value=data.studentLastName;
	formInputStudentLastName.setAttribute("required",true);
	var formLabelStudentLastName = document.createElement("label");
	formLabelStudentLastName.setAttribute("for","inputStudentLastName");
	var formLabelStudentLastNameText = document.createTextNode("Last Name");
	formLabelStudentLastName.appendChild(formLabelStudentLastNameText);
	form.appendChild(formInputStudentLastName);
	form.appendChild(formLabelStudentLastName);
	cardBody.appendChild(form);
	
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
		var gStudentId = document.getElementById("inputStudentId").value;
		var gStudentFirstName = document.getElementById("inputStudentFirstName").value;
		var gStudentLastName = document.getElementById("inputStudentLastName").value;
		var gStudentGrades=data.studentGrades;
		//gStudentGrades=gStudentGrades.gradeList;
		console.log(gStudentGrades);
		var gStudentGradesIdsArray=[];
		gStudentGrades.forEach((grade)=>{
			var temp={};
			temp.gradeId=grade.gradeId;
			gStudentGradesIdsArray.push(temp);
		});
		//gStudentGradesIdsArray=JSON.stringify(gStudentGradesIdsArray);
		//console.log(gStudentGradesIdsArray);
		
		
		
		fetch('../api/student/'+id, {
			method: "PUT",
			body: JSON.stringify({
				studentId: gStudentId,
				studentFirstName: gStudentFirstName,
				studentLastName: gStudentLastName,
				studentGrades: gStudentGradesIdsArray
			}),headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		.then(response => response.json())
		.then(json => console.log(json))
		alert("Updated");
		window.location.href = "/students";
	});
}
requestRead.send()















