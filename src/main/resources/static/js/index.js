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
card.setAttribute("class", "card col-sm-12");

var cardHeader=document.createElement("div");
cardHeader.setAttribute("class","card-header text-white bg-primary");
var cardHeaderText=document.createTextNode("eGradeBookAppREST: MENU");
cardHeader.appendChild(cardHeaderText);

var cardBody=document.createElement("div");
cardBody.setAttribute("class", "card-body");

var studentsButton=document.createElement("button");
studentsButton.setAttribute("class", "btn btn-outline-info col-sm-6 btn-block p-5");
var studentsButtonText=document.createTextNode("Students");
studentsButton.appendChild(studentsButtonText);

var gradesButton=document.createElement("button");
gradesButton.setAttribute("class", "btn btn-outline-info col-sm-6 btn-block p-5");
var gradesButtonText=document.createTextNode("Grades");
gradesButton.appendChild(gradesButtonText);

var subjectsButton=document.createElement("button");
subjectsButton.setAttribute("class", "btn btn-outline-info col-sm-6 btn-block p-5");
var subjectsButtonText=document.createTextNode("Subjects");
subjectsButton.appendChild(subjectsButtonText);

var teachersButton=document.createElement("button");
teachersButton.setAttribute("class", "btn btn-outline-info col-sm-6 btn-block p-5");
var teachersButtonText=document.createTextNode("Teachers");
teachersButton.appendChild(teachersButtonText);

cardBody.appendChild(studentsButton);
cardBody.appendChild(gradesButton);
cardBody.appendChild(subjectsButton);
cardBody.appendChild(teachersButton);

var cardFooter=document.createElement("div");
cardFooter.setAttribute("class","card-footer text-muted text-center");
//var cardFooterText=document.createTextNode("Damian Osiak\nAWSB Cieszyn\nNumer albumu: 40843\nInformatyka niestacjonarnie 3 semestr\n\ndamian.osiak@student.wsb.edu.pl");
var cardFooterText=document.createTextNode("Damian Osiak");
cardFooter.appendChild(cardFooterText);
var br=document.createElement("br");
cardFooter.appendChild(br);

cardFooterText=document.createTextNode("AWSB Cieszyn");
cardFooter.appendChild(cardFooterText);
var br=document.createElement("br");
cardFooter.appendChild(br);

cardFooterText=document.createTextNode("Numer albumu: 40843");
cardFooter.appendChild(cardFooterText);
var br=document.createElement("br");
cardFooter.appendChild(br);

cardFooterText=document.createTextNode("Informatyka niestacjonarnie 3 semestr");
cardFooter.appendChild(cardFooterText);
var br=document.createElement("br");
cardFooter.appendChild(br);

var cardFooterMail=document.createElement("a");
cardFooterMail.setAttribute("href","mailto:damian.osiak@student.wsb.edu.pl");
cardFooterMailText=document.createTextNode("damian.osiak@student.wsb.edu.pl");
cardFooterMail.appendChild(cardFooterMailText);
cardFooter.appendChild(cardFooterMail);

card.appendChild(cardHeader);
card.appendChild(cardBody);
card.appendChild(cardFooter);

container.appendChild(card);

studentsButton.addEventListener("click",function(){
	window.location.href="/students";
});

gradesButton.addEventListener("click",function(){
	window.location.href="/grades";
});

subjectsButton.addEventListener("click",function(){
	window.location.href="/subjects";
});

teachersButton.addEventListener("click",function(){
	window.location.href="/teachers";
});