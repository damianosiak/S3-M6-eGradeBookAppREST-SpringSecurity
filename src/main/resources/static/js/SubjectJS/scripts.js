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
requestRead.open('GET', 'api/subject/', true)
requestRead.onload = function () {
	var data = JSON.parse(this.response)
	data = data.subjectList;
	
	var card = document.createElement("div");
	card.setAttribute("id","card");
	card.setAttribute("class","card col-sm-12");
	var cardHeader = document.createElement("div");
	cardHeader.setAttribute("class", "card-header text-white bg-primary");
	var cardHeaderText = document.createTextNode("All subjects");
	cardHeader.appendChild(cardHeaderText);
	card.appendChild(cardHeader);
	
	var cardBody = document.createElement("div");
	cardBody.setAttribute("class","card-body");
	
	var tbl = document.createElement("table");
	tbl.setAttribute("class","table table-hover table-bordered table-striped");
	var tblBody = document.createElement("tbody");
	
	var rowth = document.createElement("tr");
	rowth.setAttribute("class","table-primary");
	
	var thSubjectId = document.createElement("th");
	var thSubjectIdText = document.createTextNode("Subject ID");
	
	var thSubjectName = document.createElement("th");
	var thSubjectNameText = document.createTextNode("Subject Name");
	
	var thSubjectTeacher = document.createElement("th");
	var thSubjectTeacherText = document.createTextNode("Teacher");
	
	var thSubjectEdit = document.createElement("th");
	var thSubjectEditText = document.createTextNode("Action");
	
	thSubjectId.appendChild(thSubjectIdText);
	rowth.appendChild(thSubjectId);
	
	thSubjectName.appendChild(thSubjectNameText);
	rowth.appendChild(thSubjectName);
	
	thSubjectTeacher.appendChild(thSubjectTeacherText);
	rowth.appendChild(thSubjectTeacher);
	
	thSubjectEdit.appendChild(thSubjectEditText);
	rowth.appendChild(thSubjectEdit);
	
	tblBody.appendChild(rowth);
	var thSubjectId = document.createElement("th")
	
	if(requestRead.status >= 200 && requestRead.status < 400){
		data.forEach((subject)=>{
			var row = document.createElement("tr");
			
			var tdSubjectId = document.createElement("td");
			var tdSubjectIdText = document.createTextNode(subject.subjectId);
			
			var tdSubjectName = document.createElement("td");
			var tdSubjectNameText = document.createTextNode(subject.subjectName);
			
			var tdSubjectTeacher = document.createElement("td");
			var tdSubjectTeacherText = document.createTextNode(subject.subjectTeacher.teacherFirstName+" "+subject.subjectTeacher.teacherLastName);
			
			var tdSubjectEditDelete = document.createElement("td");
			tdSubjectEditDelete.setAttribute("class", "d-grid gap-2")
			
			var tdSubjectEditButton = document.createElement("button");
			var tdSubjectEditButtonText = document.createTextNode("Edit");
			tdSubjectEditButton.setAttribute("class","btn btn-outline-warning btn-sm");
			
			var tdSubjectViewButton = document.createElement("button");
			var tdSubjectViewButtonText = document.createTextNode("View");
			tdSubjectViewButton.setAttribute("class","btn btn-outline-success btn-sm");
			
			var tdSubjectDeleteButton = document.createElement("button");
			var tdSubjectDeleteButtonText = document.createTextNode("Delete");
			tdSubjectDeleteButton.setAttribute("class","btn-danger btn-sm");
			//tdSubjectEditButton.setAttribute("class","btn");
			
			tdSubjectId.appendChild(tdSubjectIdText);
			row.appendChild(tdSubjectId);
			
			tdSubjectName.appendChild(tdSubjectNameText);
			row.appendChild(tdSubjectName);
			
			tdSubjectTeacher.appendChild(tdSubjectTeacherText);
			row.appendChild(tdSubjectTeacher);
			
			tdSubjectEditButton.addEventListener("click", function(){
				localStorage.setItem("localSubjectId",subject.subjectId);
				window.location.href = "/subjects/update";
			});
			
			tdSubjectViewButton.appendChild(tdSubjectViewButtonText);
			tdSubjectEditDelete.appendChild(tdSubjectViewButton);
			row.appendChild(tdSubjectEditDelete);
			
			tdSubjectViewButton.addEventListener("click", function(){
				localStorage.setItem("localSubjectId",subject.subjectId);
				window.location.href = "/subjects/view";
			});
			
			tdSubjectEditButton.appendChild(tdSubjectEditButtonText);
			tdSubjectEditDelete.appendChild(tdSubjectEditButton);
			row.appendChild(tdSubjectEditDelete);
			
			tdSubjectDeleteButton.addEventListener ("click", function() {
			  var requestDelete = new XMLHttpRequest();
			  var url='/api/subject/'+subject.subjectId;
			  requestDelete.open('DELETE', url, true);
			  requestDelete.send;
			  requestDelete.onload = function(){
					if(requestDelete.readyState==4 && requestDelete.status=="200"){
						alert("Deleted");
						window.location.reload();
					}else{
						alert("Error");
					}
				}
				requestDelete.send();
			});
			
			tdSubjectDeleteButton.appendChild(tdSubjectDeleteButtonText);
			tdSubjectEditDelete.appendChild(tdSubjectDeleteButton);
			row.appendChild(tdSubjectEditDelete);
			
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
		window.location.href = "/subjects/new";
	});
}
requestRead.send()