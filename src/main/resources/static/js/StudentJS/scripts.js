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

requestRead.open('GET', 'api/student/', true)
requestRead.onload = function () {
	var data = JSON.parse(this.response)
	data = data.studentList;
	
	var card = document.createElement("div");
	card.setAttribute("id","card");
	card.setAttribute("class","card col-sm-12");
	var cardHeader = document.createElement("div");
	cardHeader.setAttribute("class", "card-header text-white bg-primary");
	var cardHeaderText = document.createTextNode("All Students");
	cardHeader.appendChild(cardHeaderText);
	card.appendChild(cardHeader);
	
	var cardBody = document.createElement("div");
	cardBody.setAttribute("class","card-body");
	
	var tbl = document.createElement("table");
	tbl.setAttribute("class","table table-hover table-bordered table-striped");
	var tblBody = document.createElement("tbody");
	
	var rowth = document.createElement("tr");
	rowth.setAttribute("class","table-primary");
	
	var thStudentId = document.createElement("th");
	var thStudentIdText = document.createTextNode("Student ID");
	
	var thStudentFirstName = document.createElement("th");
	var thStudentFirstNameText = document.createTextNode("Student First Name");
	
	var thStudentLastName = document.createElement("th");
	var thStudentLastNameText = document.createTextNode("Student Last Name");
	
	var thStudentEdit = document.createElement("th");
	var thStudentEditText = document.createTextNode("Action");
	
	thStudentId.appendChild(thStudentIdText);
	rowth.appendChild(thStudentId);
	
	thStudentFirstName.appendChild(thStudentFirstNameText);
	rowth.appendChild(thStudentFirstName);
	
	thStudentLastName.appendChild(thStudentLastNameText);
	rowth.appendChild(thStudentLastName);
	
	thStudentEdit.appendChild(thStudentEditText);
	rowth.appendChild(thStudentEdit);
	
	tblBody.appendChild(rowth);
	var thStudentId = document.createElement("th")
	
	if(requestRead.status >= 200 && requestRead.status < 400){
		data.forEach((student)=>{
			var row = document.createElement("tr");
			
			var tdStudentId = document.createElement("td");
			var tdStudentIdText = document.createTextNode(student.studentId);
			
			var tdStudentFirstName = document.createElement("td");
			var tdStudentFirstNameText = document.createTextNode(student.studentFirstName);
			
			var tdStudentLastName = document.createElement("td");
			var tdStudentLastNameText = document.createTextNode(student.studentLastName);
			
			var tdStudentEditDelete = document.createElement("td");
			tdStudentEditDelete.setAttribute("class", "d-grid gap-2")
			
			var tdStudentGradesButton=document.createElement("button");
			var tdStudentGradesButtonText=document.createTextNode("Grades");
			tdStudentGradesButton.setAttribute("class","btn btn-outline-info");
			
			var tdStudentEditButton = document.createElement("button");
			var tdStudentEditButtonText = document.createTextNode("Edit");
			tdStudentEditButton.setAttribute("class","btn btn-outline-warning btn-sm");
			
			var tdStudentViewButton = document.createElement("button");
			var tdStudentViewButtonText = document.createTextNode("View");
			tdStudentViewButton.setAttribute("class","btn btn-outline-success btn-sm");
			
			var tdStudentDeleteButton = document.createElement("button");
			var tdStudentDeleteButtonText = document.createTextNode("Delete");
			tdStudentDeleteButton.setAttribute("class","btn-danger btn-sm");
			
			tdStudentId.appendChild(tdStudentIdText);
			row.appendChild(tdStudentId);
			
			tdStudentFirstName.appendChild(tdStudentFirstNameText);
			row.appendChild(tdStudentFirstName);
			
			tdStudentLastName.appendChild(tdStudentLastNameText);
			row.appendChild(tdStudentLastName);
			
			tdStudentEditButton.addEventListener("click", function(){
				localStorage.setItem("localStudentId",student.studentId);
				window.location.href = "/students/update";
			});
			
			tdStudentViewButton.appendChild(tdStudentViewButtonText);
			tdStudentEditDelete.appendChild(tdStudentViewButton);
			row.appendChild(tdStudentEditDelete);
			
			tdStudentViewButton.addEventListener("click", function(){
				localStorage.setItem("localStudentId",student.studentId);
				window.location.href = "/students/view";
			});
			
			
			tdStudentGradesButton.addEventListener("click", function(){
				localStorage.setItem("localStudentId",student.studentId);
				window.location.href="/students/grades";
			});
			
			
			tdStudentGradesButton.appendChild(tdStudentGradesButtonText);
			tdStudentEditDelete.appendChild(tdStudentGradesButton);
			row.appendChild(tdStudentEditDelete);
			
			
			tdStudentEditButton.appendChild(tdStudentEditButtonText);
			tdStudentEditDelete.appendChild(tdStudentEditButton);
			row.appendChild(tdStudentEditDelete);
			
			tdStudentDeleteButton.addEventListener ("click", function() {
				localStorage.setItem("localStudentId",student.studentId);
				window.location.href = "/students/delete";
			});
			
			tdStudentDeleteButton.appendChild(tdStudentDeleteButtonText);
			tdStudentEditDelete.appendChild(tdStudentDeleteButton);
			row.appendChild(tdStudentEditDelete);
			
			tblBody.appendChild(row);
		})
	}
	
	tbl.appendChild(tblBody);
	
	cardBody.appendChild(tbl);
	
	card.appendChild(cardBody);
	
	var cardFooter = document.createElement("div");
	cardFooter.setAttribute("class","card-footer d-grid gap-2");
	
	var buttonNew = document.createElement("button");
	buttonNew.setAttribute("class","btn btn-success");
	var buttonNewText = document.createTextNode("Add new");
	buttonNew.appendChild(buttonNewText);
	cardFooter.appendChild(buttonNew);
	
	var buttonMenu=document.createElement("button");
	buttonMenu.setAttribute("class","btn btn-primary");
	var buttonMenuText=document.createTextNode("Menu");
	buttonMenu.appendChild(buttonMenuText);
	cardFooter.appendChild(buttonMenu);
	
	buttonMenu.addEventListener("click",function(){
		document.location.href="/menu";
	});
	
	card.appendChild(cardFooter);
	
	container.appendChild(card);
	
	buttonNew.addEventListener("click",function(){
		window.location.href = "/students/new";
	});
}
requestRead.send()