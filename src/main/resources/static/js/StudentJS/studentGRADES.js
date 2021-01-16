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
var localStudentId=localStorage.getItem("localStudentId");
localStudentId=parseInt(localStudentId);
console.log(localStudentId);

requestRead.open('GET', '../api/grade/', true)
requestRead.onload = function () {
	var data = JSON.parse(this.response)
	data = data.gradeList;
	
	var card = document.createElement("div");
	card.setAttribute("id","card");
	card.classList.add("card");
	card.classList.add("col-sm-12");
	var cardHeader = document.createElement("div");
	cardHeader.classList.add("card-header");
	cardHeader.classList.add("text-white");
	cardHeader.classList.add("bg-primary");
	var cardHeaderText = document.createTextNode("All grades");
	cardHeader.appendChild(cardHeaderText);
	card.appendChild(cardHeader);
	
	var cardBody = document.createElement("div");
	cardBody.classList.add("card-body");
	
	var tbl = document.createElement("table");
	tbl.classList.add("table");
	tbl.classList.add("table-hover");
	tbl.classList.add("table-bordered");
	tbl.classList.add("table-striped");
	var tblBody = document.createElement("tbody");
	
	var rowth = document.createElement("tr");
	rowth.classList.add("table-primary");
	
	var thGradeId = document.createElement("th");
	var thGradeIdText = document.createTextNode("Grade ID");
	
	var thGradeStudent = document.createElement("th");
	var thGradeStudentText = document.createTextNode("Student");
	
	var thGradeValue = document.createElement("th");
	var thGradeValueText = document.createTextNode("Grade Value");
	
	var thGradeDescription = document.createElement("th");
	var thGradeDescriptionText = document.createTextNode("Grade Description");
	
	var thGradeTeacher = document.createElement("th");
	var thGradeTeacherText = document.createTextNode("Teacher");
	
	var thGradeEdit = document.createElement("th");
	var thGradeEditText = document.createTextNode("Action");
	
	thGradeId.appendChild(thGradeIdText);
	rowth.appendChild(thGradeId);
	
	thGradeStudent.appendChild(thGradeStudentText);
	rowth.appendChild(thGradeStudent);
	
	thGradeValue.appendChild(thGradeValueText);
	rowth.appendChild(thGradeValue);
	
	thGradeDescription.appendChild(thGradeDescriptionText);
	rowth.appendChild(thGradeDescription);
	
	thGradeTeacher.appendChild(thGradeTeacherText);
	rowth.appendChild(thGradeTeacher);
	
	thGradeEdit.appendChild(thGradeEditText);
	rowth.appendChild(thGradeEdit);
	
	tblBody.appendChild(rowth);
	var thGradeId = document.createElement("th")
	
	if(requestRead.status >= 200 && requestRead.status < 400){
		data.forEach((grade)=>{
			var row = document.createElement("tr");
			var truefalse;
			var tdGradeId = document.createElement("td");
			var tdGradeIdText = document.createTextNode(grade.gradeId);
			tdGradeId.appendChild(tdGradeIdText);
			row.appendChild(tdGradeId);
			var readGradeStudent=new XMLHttpRequest();
			readGradeStudent.open("GET","../api/student/",true);
			readGradeStudent.onload=function(){
				var dataStudent=JSON.parse(this.response);
				dataStudent=dataStudent.studentList;
				dataStudent.forEach((tgsStudent)=>{
					var tgsStudentId=tgsStudent.studentId;
					if(tgsStudentId===localStudentId){
						var allTGSGrades=tgsStudent.studentGrades;
						//console.log(allTGSGrades);
						var allGradesList=[];
						allTGSGrades.forEach((tgsGrade)=>{
							allGradesList.push(tgsGrade.gradeId);
						});
						//console.log(allGradesList);
						if(allGradesList.includes(grade.gradeId)){
							var tdStudentName=document.createElement("td");
							var tdStudentNameText=document.createTextNode(tgsStudent.studentFirstName+" "+tgsStudent.studentLastName+" (id: "+tgsStudent.studentId+")");
							tdStudentName.appendChild(tdStudentNameText);
							row.appendChild(tdStudentName);
							
							setTimeout(function(){
								var tdGradeValue = document.createElement("td");
								var tdGradeValueText = document.createTextNode(grade.gradeValue);
								
								var tdGradeDescription = document.createElement("td");
								var tdGradeDescriptionText = document.createTextNode(grade.gradeDescription);
								
								var tdGradeTeacher = document.createElement("td");
								if(grade.gradeTeacher){
									var tdGradeTeacherText = document.createTextNode(grade.gradeTeacher.teacherFirstName+" "+grade.gradeTeacher.teacherLastName);
								}else{
									var tdGradeTeacherText = document.createTextNode("null");
								}
								
								var tdGradeEditDelete = document.createElement("td");
								tdGradeEditDelete.classList.add("d-grid");
								tdGradeEditDelete.classList.add("gap-2");
								var tdGradeEditButton = document.createElement("button");
								var tdGradeEditButtonText = document.createTextNode("Edit");
								tdGradeEditButton.classList.add("btn");
								tdGradeEditButton.classList.add("btn-outline-warning");
								tdGradeEditButton.classList.add("btn-sm");
								
								var tdGradeViewButton = document.createElement("button");
								var tdGradeViewButtonText = document.createTextNode("View");
								tdGradeViewButton.setAttribute("class","btn btn-outline-success btn-sm");
								
								var tdGradeDeleteButton = document.createElement("button");
								var tdGradeDeleteButtonText = document.createTextNode("Delete");
								tdGradeEditButton.classList.add("btn");
								tdGradeDeleteButton.classList.add("btn-danger");
								tdGradeDeleteButton.classList.add("btn-sm");
								
								tdGradeValue.appendChild(tdGradeValueText);
								row.appendChild(tdGradeValue);
								
								tdGradeDescription.appendChild(tdGradeDescriptionText);
								row.appendChild(tdGradeDescription);
								
								tdGradeTeacher.appendChild(tdGradeTeacherText);
								row.appendChild(tdGradeTeacher);
								
								tdGradeEditButton.addEventListener("click", function(){
									localStorage.setItem("local",grade.gradeId);
									window.location.href = "/grades/update";
								});
								
								tdGradeViewButton.appendChild(tdGradeViewButtonText);
								tdGradeEditDelete.appendChild(tdGradeViewButton);
								row.appendChild(tdGradeEditDelete);
								
								tdGradeViewButton.addEventListener("click", function(){
									localStorage.setItem("local",grade.gradeId);
									window.location.href = "/grades/view";
								});
								
								tdGradeEditButton.appendChild(tdGradeEditButtonText);
								tdGradeEditDelete.appendChild(tdGradeEditButton);
								row.appendChild(tdGradeEditDelete);
								
								tdGradeDeleteButton.addEventListener("click",function(){
									localStorage.setItem("localGradeId",grade.gradeId);
									window.location.href = "/grades/delete";
								});
								
								tdGradeDeleteButton.appendChild(tdGradeDeleteButtonText);
								tdGradeEditDelete.appendChild(tdGradeDeleteButton);
								row.appendChild(tdGradeEditDelete);
								
								tblBody.appendChild(row);
							},750);
						}
					}
					
				});
			}
			readGradeStudent.send();
		})
	}
	tbl.appendChild(tblBody);
	
	cardBody.appendChild(tbl);
	
	card.appendChild(cardBody);
	
	var cardFooter = document.createElement("div");
	cardFooter.setAttribute("class","card-footer");
	
	var buttonNew = document.createElement("button");
	buttonNew.setAttribute("class","btn btn-success col-sm-1");
	var buttonNewText = document.createTextNode("Add new");
	buttonNew.appendChild(buttonNewText);
	cardFooter.appendChild(buttonNew);
	
	var buttonBack = document.createElement("button");
	buttonBack.setAttribute("class","btn btn-outline-warning col-sm-1 m-2");
	var buttonBackText = document.createTextNode("Back");
	buttonBack.appendChild(buttonBackText);
	cardFooter.appendChild(buttonBack);
	buttonBack.addEventListener("click",function(){
		window.history.back();
	});
	
	card.appendChild(cardFooter);
	
	container.appendChild(card);
	
	buttonNew.addEventListener("click",function(){
		window.location.href = "/grades/create";
	});
}
requestRead.send()