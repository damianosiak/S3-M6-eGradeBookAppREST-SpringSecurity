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

var card = document.createElement("div");
card.setAttribute("id","card");
card.setAttribute("class","card col-sm-6");
var cardHeader = document.createElement("div");
cardHeader.setAttribute("class","card-header text-white bg-primary");
var cardHeaderText = document.createTextNode("Create student");
cardHeader.appendChild(cardHeaderText);
card.appendChild(cardHeader);

var cardBody = document.createElement("div");
cardBody.setAttribute("class","card-body");

var form = document.createElement("div");
form.setAttribute("class","form-floating");
var formInputStudentFirstName = document.createElement("input");
formInputStudentFirstName.setAttribute("id","inputStudentFirstName");
formInputStudentFirstName.setAttribute("class","form-control bg-white");
formInputStudentFirstName.type="text";
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
var buttonSaveText = document.createTextNode("Add");
buttonSave.appendChild(buttonSaveText);
cardFooter.appendChild(buttonSave);
card.appendChild(cardFooter);
container.appendChild(card);

buttonSave.addEventListener("click", function(){
	
	var vStudentFirstName = document.getElementById("inputStudentFirstName").value;
	var vStudentLastName = document.getElementById("inputStudentLastName").value;
	
	if(vStudentFirstName.length>0 && vStudentLastName.length>0){
		fetch("../api/student/", {
			method: "POST",
			body: JSON.stringify({
				teacherId: "",
				studentFirstName: vStudentFirstName,
				studentLastName: vStudentLastName
			}),headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		.then(response => response.json())
		.then(json => console.log(json))
		alert("Added");
		window.location.href = "/students";
	}else{
		alert("Fill required fields");
	}
	
});

buttonBack.addEventListener("click", function(){
	window.history.back();
});