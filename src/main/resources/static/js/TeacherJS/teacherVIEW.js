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
var id = localStorage.getItem("localTeacherId");
requestRead.open('GET', '../api/teacher/'+id, true)
requestRead.onload = function () {
	var data = JSON.parse(this.response);
	
	var card = document.createElement("div");
	card.setAttribute("id","card");
	card.setAttribute("class","card col-sm-6");
	var cardHeader = document.createElement("div");
	cardHeader.setAttribute("class","card-header text-white bg-primary");
	var cardHeaderText = document.createTextNode("Teacher details");
	cardHeader.appendChild(cardHeaderText);
	card.appendChild(cardHeader);
	
	var cardBody = document.createElement("div");
	cardBody.setAttribute("class","card-body");
	
	var form = document.createElement("div");
	form.setAttribute("class","form-floating");
	var formInputTeacherId = document.createElement("input");
	formInputTeacherId.setAttribute("id","inputTeacherId");
	formInputTeacherId.setAttribute("class","form-control bg-white");
	formInputTeacherId.type="number";
	formInputTeacherId.value=data.teacherId;
	formInputTeacherId.setAttribute("readonly",true);
	var formLabelTeacherId = document.createElement("label");
	formLabelTeacherId.setAttribute("for","inputTeacherId");
	var formLabelTeacherIdText = document.createTextNode("Teacher ID");
	formLabelTeacherId.appendChild(formLabelTeacherIdText);
	form.appendChild(formInputTeacherId);
	form.appendChild(formLabelTeacherId);
	cardBody.appendChild(form);
	
	var form = document.createElement("div");
	form.setAttribute("class","form-floating");
	var formInputTeacherFirstName = document.createElement("input");
	formInputTeacherFirstName.setAttribute("id","inputTeacherFirstName");
	formInputTeacherFirstName.setAttribute("class","form-control bg-white");
	formInputTeacherFirstName.type="text";
	formInputTeacherFirstName.value=data.teacherFirstName;
	formInputTeacherFirstName.setAttribute("readonly",true);
	var formLabelTeacherFirstName = document.createElement("label");
	formLabelTeacherFirstName.setAttribute("for","inputTeacherFirstName");
	var formLabelTeacherFirstNameText = document.createTextNode("First Name");
	formLabelTeacherFirstName.appendChild(formLabelTeacherFirstNameText);
	form.appendChild(formInputTeacherFirstName);
	form.appendChild(formLabelTeacherFirstName);
	cardBody.appendChild(form);
	
	var form = document.createElement("div");
	form.setAttribute("class","form-floating");
	var formInputTeacherLastName = document.createElement("input");
	formInputTeacherLastName.setAttribute("id","inputTeacherLastName");
	formInputTeacherLastName.setAttribute("class","form-control bg-white");
	formInputTeacherLastName.type="text";
	formInputTeacherLastName.value=data.teacherLastName;
	formInputTeacherLastName.setAttribute("readonly",true);
	var formLabelTeacherLastName = document.createElement("label");
	formLabelTeacherLastName.setAttribute("for","inputTeacherLastName");
	var formLabelTeacherLastNameText = document.createTextNode("Last Name");
	formLabelTeacherLastName.appendChild(formLabelTeacherLastNameText);
	form.appendChild(formInputTeacherLastName);
	form.appendChild(formLabelTeacherLastName);
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
			  localStorage.setItem("localTeacherId",data.teacherId);
			  window.open("/teachers/delete","_blank");
			  setTimeout(function(){
				  window.location.href = "/teachers";
			  },750);
			});
	
	buttonSave.addEventListener("click", function(){
		window.location.href = "/teachers/update";
	});
	
}
requestRead.send()