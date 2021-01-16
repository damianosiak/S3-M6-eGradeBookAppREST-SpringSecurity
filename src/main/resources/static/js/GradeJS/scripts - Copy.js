const app = document.getElementById('root')
const container = document.createElement('div')
container.setAttribute('class', 'container')
app.appendChild(container)

var requestRead = new XMLHttpRequest()

requestRead.open('GET', 'http://127.0.0.1:8080/api/grade/', true)
requestRead.onload = function () {
	var data = JSON.parse(this.response)
	data = data.gradeList;
	
	var card = document.createElement("div");
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
		data.forEach((grade,index)=>{
			var row = document.createElement("tr");
			var tdGradeId = document.createElement("td");
			var tdGradeIdText = document.createTextNode(grade.gradeId);
			tdGradeId.appendChild(tdGradeIdText);
			row.appendChild(tdGradeId);
			var readGradeStudent=new XMLHttpRequest();
			readGradeStudent.open("GET","http://127.0.0.1:8080/api/student/",true);
			readGradeStudent.onload=function(){
				var dataStudent=JSON.parse(this.response);
				dataStudent=dataStudent.studentList;
				dataStudent.forEach((tgsStudent)=>{
					var allTGSGrades=tgsStudent.studentGrades;
					var allGradesList=[];
					allTGSGrades.forEach((tgsGrade)=>{
						allGradesList.push(tgsGrade.gradeId);
					});
					if(allGradesList.includes(grade.gradeId)){
						var tdStudentName=document.createElement("td");
						var tdStudentNameText=document.createTextNode(tgsStudent.studentFirstName+" "+tgsStudent.studentLastName+" (id: "+tgsStudent.studentId+")");
						tdStudentName.appendChild(tdStudentNameText);
						row.appendChild(tdStudentName);
					}
				});
			}
			
			readGradeStudent.send();
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
					window.location.href = "gradeUPDATE.html";
				});
				
				tdGradeViewButton.appendChild(tdGradeViewButtonText);
				tdGradeEditDelete.appendChild(tdGradeViewButton);
				row.appendChild(tdGradeEditDelete);
				
				tdGradeViewButton.addEventListener("click", function(){
					localStorage.setItem("local",grade.gradeId);
					window.location.href = "gradeVIEW.html";
				});
				
				tdGradeEditButton.appendChild(tdGradeEditButtonText);
				tdGradeEditDelete.appendChild(tdGradeEditButton);
				row.appendChild(tdGradeEditDelete);
				
				tdGradeDeleteButton.addEventListener("click",function(){
					localStorage.setItem("localGradeId",grade.gradeId);
					window.location.href = "gradeDELETE.html";
				});
				
				tdGradeDeleteButton.appendChild(tdGradeDeleteButtonText);
				tdGradeEditDelete.appendChild(tdGradeDeleteButton);
				row.appendChild(tdGradeEditDelete);
				
				tblBody.appendChild(row);
			},500);
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
		document.location.href="../../../templates/Grade/index.html";
	});
	
	card.appendChild(cardFooter);
	container.appendChild(card);
	
	buttonNew.addEventListener("click",function(){
		window.location.href = "gradeCREATE.html";
	});
}
requestRead.send()