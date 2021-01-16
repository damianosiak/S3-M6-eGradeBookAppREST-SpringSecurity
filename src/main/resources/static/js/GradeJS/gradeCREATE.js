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
var id = localStorage.getItem("local");
requestRead.open('GET', '../api/teacher/', true)
requestRead.onload = function () {
	var data = JSON.parse(this.response);
	data = data.teacherList;
	
	var card = document.createElement("div");
	card.setAttribute("id","card");
	card.classList.add("card");
	card.classList.add("col-sm-6");
	var cardHeader = document.createElement("div");
	cardHeader.classList.add("card-header");
	cardHeader.classList.add("text-white");
	cardHeader.classList.add("bg-primary");
	var cardHeaderText = document.createTextNode("Create Grade");
	cardHeader.appendChild(cardHeaderText);
	card.appendChild(cardHeader);
	
	var cardBody = document.createElement("div");
	cardBody.classList.add("card-body");
	
	var requestStudents=new XMLHttpRequest();
	requestStudents.open("GET","../api/student/",true);
	requestStudents.onload=function(){
		var dataStudents=JSON.parse(this.response);
		dataStudents=dataStudents.studentList;
		
		var form = document.createElement("div");
		form.classList.add("form-floating");
		var formSelectStudent = document.createElement("select");
		formSelectStudent.setAttribute("id","selectStudent");
		formSelectStudent.classList.add("form-select");
		formSelectStudent.required=true;
		dataStudents.forEach((student)=>{
			var formSelectOptionStudent = document.createElement("option");
			formSelectOptionStudent.setAttribute("value",student.studentId);
			var formSelectOptionStudentText = document.createTextNode("ID: "+student.studentId+" | "+student.studentFirstName+" "+student.studentLastName);
			formSelectOptionStudent.appendChild(formSelectOptionStudentText);
			formSelectStudent.appendChild(formSelectOptionStudent);
		});
		var formSelectStudentLabel = document.createElement("label");
		formSelectStudentLabel.setAttribute("for","selectStudent");
		var formSelectStudentLabelText = document.createTextNode("Student");
		formSelectStudentLabel.appendChild(formSelectStudentLabelText);
		form.appendChild(formSelectStudent);
		form.appendChild(formSelectStudentLabel);
		cardBody.appendChild(form);
	}
	requestStudents.send();
	
	var form = document.createElement("div");
	form.classList.add("form-floating");
	var formInputGradeValue = document.createElement("input");
	formInputGradeValue.setAttribute("id","inputGradeValue");
	formInputGradeValue.classList.add("form-control");
	formInputGradeValue.type="number";
	formInputGradeValue.min=1;
	formInputGradeValue.max=6;
	formInputGradeValue.required=true;
	var formLabelGradeValue = document.createElement("label");
	formLabelGradeValue.setAttribute("for","inputGradeValue");
	formLabelGradeValueText = document.createTextNode("Grade Value");
	formLabelGradeValue.appendChild(formLabelGradeValueText);
	form.appendChild(formInputGradeValue);
	form.appendChild(formLabelGradeValue);
	cardBody.appendChild(form);
	
	var form = document.createElement("div");
	form.classList.add("form-floating");
	var formInputGradeDescription = document.createElement("input");
	formInputGradeDescription.setAttribute("id","inputGradeDescription");
	formInputGradeDescription.setAttribute("rows",3);
	formInputGradeDescription.classList.add("form-control");
	formInputGradeDescription.type="text";
	formInputGradeDescription.required=true;
	var formLabelGradeDescription = document.createElement("label");
	formLabelGradeDescription.setAttribute("for","inputGradeDescription");
	formLabelGradeDescriptionText = document.createTextNode("Grade Description");
	formLabelGradeDescription.appendChild(formLabelGradeDescriptionText);
	form.appendChild(formInputGradeDescription);
	form.appendChild(formLabelGradeDescription);
	cardBody.appendChild(form);
	
	var form = document.createElement("div");
	form.classList.add("form-floating");
	var formSelectTeacher = document.createElement("select");
	formSelectTeacher.setAttribute("id","selectTeacher");
	formSelectTeacher.classList.add("form-select");
	formSelectTeacher.required=true;
	data.forEach((teacher)=>{
		var formSelectOptionTeacher = document.createElement("option");
		formSelectOptionTeacher.setAttribute("value",teacher.teacherId);
		var formSelectOptionTeacherText = document.createTextNode("ID: "+teacher.teacherId+" | "+teacher.teacherFirstName+" "+teacher.teacherLastName);
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
		
		var vGradeValue = document.getElementById("inputGradeValue").value;
		var vGradeDescription = document.getElementById("inputGradeDescription").value;
		var vGradeTeacherId = document.getElementById("selectTeacher").value;
		var idOfSelectedStudent=document.getElementById("selectStudent").value;
		
		if(vGradeValue.length>0 && vGradeDescription.length>0 && vGradeTeacherId.length>0 && idOfSelectedStudent.length>0){
			fetch("../api/grade/", {
				method: "POST",
				body: JSON.stringify({
				gradeId: "",
				gradeValue: vGradeValue,
				gradeDescription: vGradeDescription,
				gradeTeacher:{
					teacherId: vGradeTeacherId
				}
			}),headers: {
				"Content-type": "application/json; charset=UTF-8"
				}
			})
			.then(response => response.json())
			.then(json => console.log(json))
			
			var thisGradeId=null;
			var readThisGradeId=new XMLHttpRequest();
			readThisGradeId.open("GET","../api/grade/",true);
			readThisGradeId.onload=function(){
				var dataAllGrades=JSON.parse(this.response);
				dataAllGrades=dataAllGrades.gradeList;
				dataAllGrades.forEach((grade)=>{
					thisGradeId=grade.gradeId;
				});
				thisGradeId++;
				var thisSelectedStudentGradesListOfIds=[];
				var myjson;
				var readSelectedStudent=new XMLHttpRequest();
				readSelectedStudent.open("GET","../api/student/"+idOfSelectedStudent,true);
				readSelectedStudent.onload=function(){
					var dataSelectedStudent=JSON.parse(this.response);
					var thisSelectedStudentFirstName=dataSelectedStudent.studentFirstName;
					var thisSelectedStudentLastName=dataSelectedStudent.studentLastName;
					var thisSelectedStudentGrades=dataSelectedStudent.studentGrades;
					
					thisSelectedStudentGrades.forEach((grade)=>{
						var tempArrayOfGradeObject={};
						tempArrayOfGradeObject.gradeId=grade.gradeId
						thisSelectedStudentGradesListOfIds.push(tempArrayOfGradeObject);
					})
					var tempArray={};
					tempArray.gradeId=thisGradeId;
					thisSelectedStudentGradesListOfIds.push(tempArray);
					myjson={studentId: idOfSelectedStudent, studentFirstName: thisSelectedStudentFirstName, studentLastName: thisSelectedStudentLastName, studentGrades: thisSelectedStudentGradesListOfIds};
					myjson=JSON.stringify(myjson);
					fetch("../api/student/"+idOfSelectedStudent,{
						method: "PUT",
						body: myjson,headers:{
							"Content-type": "application/json; charset:UTF-8"
						}
					});
					alert("Added");
					window.location.href = "/grades";
				}
				readSelectedStudent.send();
			}
			readThisGradeId.send();
		}else{
			alert("Fill required fields");
		}
	});
	buttonBack.addEventListener("click", function(){
		window.history.back();
	});
}
requestRead.send()