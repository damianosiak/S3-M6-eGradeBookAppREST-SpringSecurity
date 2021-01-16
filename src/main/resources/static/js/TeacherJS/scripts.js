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

requestRead.open('GET', 'api/teacher/', true)
requestRead.onload = function () {
	var data = JSON.parse(this.response)
	data = data.teacherList;
	
	var card = document.createElement("div");
	card.setAttribute("id","card");
	card.setAttribute("class","card col-sm-12");
	var cardHeader = document.createElement("div");
	cardHeader.setAttribute("class", "card-header text-white bg-primary");
	var cardHeaderText = document.createTextNode("All Teachers");
	cardHeader.appendChild(cardHeaderText);
	card.appendChild(cardHeader);
	
	var cardBody = document.createElement("div");
	cardBody.setAttribute("class","card-body");
	
	var tbl = document.createElement("table");
	tbl.setAttribute("class","table table-hover table-bordered table-striped");
	var tblBody = document.createElement("tbody");
	
	var rowth = document.createElement("tr");
	rowth.setAttribute("class","table-primary");
	
	var thTeacherId = document.createElement("th");
	var thTeacherIdText = document.createTextNode("Teacher ID");
	
	var thTeacherFirstName = document.createElement("th");
	var thTeacherFirstNameText = document.createTextNode("Teacher First Name");
	
	var thTeacherLastName = document.createElement("th");
	var thTeacherLastNameText = document.createTextNode("Teacher Last Name");
	
	var thTeacherEdit = document.createElement("th");
	var thTeacherEditText = document.createTextNode("Action");
	
	thTeacherId.appendChild(thTeacherIdText);
	rowth.appendChild(thTeacherId);
	
	thTeacherFirstName.appendChild(thTeacherFirstNameText);
	rowth.appendChild(thTeacherFirstName);
	
	thTeacherLastName.appendChild(thTeacherLastNameText);
	rowth.appendChild(thTeacherLastName);
	
	thTeacherEdit.appendChild(thTeacherEditText);
	rowth.appendChild(thTeacherEdit);
	
	tblBody.appendChild(rowth);
	var thTeacherId = document.createElement("th")
	
	if(requestRead.status >= 200 && requestRead.status < 400){
		data.forEach((teacher)=>{
			var row = document.createElement("tr");
			
			var tdTeacherId = document.createElement("td");
			var tdTeacherIdText = document.createTextNode(teacher.teacherId);
			
			var tdTeacherFirstName = document.createElement("td");
			var tdTeacherFirstNameText = document.createTextNode(teacher.teacherFirstName);
			
			var tdTeacherLastName = document.createElement("td");
			var tdTeacherLastNameText = document.createTextNode(teacher.teacherLastName);
			
			var tdTeacherEditDelete = document.createElement("td");
			tdTeacherEditDelete.setAttribute("class", "d-grid gap-2")
			
			//var tdTeacheSubjectsButton=document.createElement("button");
			//var tdTeacherSubjectsButtonText=document.createTextNode("Subjects");
			
			var tdTeacherEditButton = document.createElement("button");
			var tdTeacherEditButtonText = document.createTextNode("Edit");
			tdTeacherEditButton.setAttribute("class","btn btn-outline-warning btn-sm");
			
			var tdTeacherViewButton = document.createElement("button");
			var tdTeacherViewButtonText = document.createTextNode("View");
			tdTeacherViewButton.setAttribute("class","btn btn-outline-success btn-sm");
			
			var tdTeacherDeleteButton = document.createElement("button");
			var tdTeacherDeleteButtonText = document.createTextNode("Delete");
			tdTeacherDeleteButton.setAttribute("class","btn-danger btn-sm");
			//tdTeacherEditButton.setAttribute("class","btn");
			
			tdTeacherId.appendChild(tdTeacherIdText);
			row.appendChild(tdTeacherId);
			
			tdTeacherFirstName.appendChild(tdTeacherFirstNameText);
			row.appendChild(tdTeacherFirstName);
			
			tdTeacherLastName.appendChild(tdTeacherLastNameText);
			row.appendChild(tdTeacherLastName);
			
			tdTeacherEditButton.addEventListener("click", function(){
				localStorage.setItem("localTeacherId",teacher.teacherId);
				window.location.href = "/teachers/update";
			});
			
			tdTeacherViewButton.appendChild(tdTeacherViewButtonText);
			tdTeacherEditDelete.appendChild(tdTeacherViewButton);
			row.appendChild(tdTeacherEditDelete);
			
			tdTeacherViewButton.addEventListener("click", function(){
				localStorage.setItem("localTeacherId",teacher.teacherId);
				window.location.href = "/teachers/view";
			});
			
			tdTeacherEditButton.appendChild(tdTeacherEditButtonText);
			tdTeacherEditDelete.appendChild(tdTeacherEditButton);
			row.appendChild(tdTeacherEditDelete);
			
			tdTeacherDeleteButton.addEventListener ("click", function() {
			  /*var requestDelete = new XMLHttpRequest();
			  var url='http://127.0.0.1:8080/api/teacher/'+teacher.teacherId;
			  requestDelete.open('DELETE', url, true);
			  requestDelete.send;
			  requestDelete.onload = function(){
					if(requestDelete.readyState==4 && requestDelete.status=="200"){
						alert("Deleted");
						window.location.reload();
					}else{
						alert("Warning:\nYou cannot delete this teacher because this teacher is related to some subject or grade.\nRemove these firstly.");
					}
				}
				requestDelete.send();*/
				localStorage.setItem("localTeacherId",teacher.teacherId);
				//window.location.href = "TeacherJS/teacherDELETE.html";
				window.open("/teachers/delete","_blank");
			});
			
			tdTeacherDeleteButton.appendChild(tdTeacherDeleteButtonText);
			tdTeacherEditDelete.appendChild(tdTeacherDeleteButton);
			row.appendChild(tdTeacherEditDelete);
			
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
		window.location.href = "/teachers/new";
	});
}
requestRead.send()