let info = {};
let fname, lname, email, country, age;
var x = 0;
let questions = [
  "Fav small letter",
  "a",
  "b",
  "c",
  "d",
  "Fav roman",
  "i",
  "ii",
  "iii",
  "iv",
  "Fav capital letter",
  "A",
  "B",
  "C",
  "D",
];

function validateForm() {
  fname = document.getElementById("fname");
  lname = document.getElementById("lname");
  email = document.getElementById("email");
  country = document.getElementById("country");
  age = document.getElementById("age");

  if (!fname.checkValidity()) {
    alert("First Name: \n"+age.validationMessage);
  } else if (!lname.checkValidity()) {
    alert("Last Name: \n"+age.validationMessage);
  } else if (!email.checkValidity()) {
    alert("Email: \n"+age.validationMessage);
  } else if (!age.checkValidity()) {
    alert("Age: \n"+age.validationMessage);
  } else {
    info = {
      fname: fname.value,
      lname: lname.value,
      email: email.value,
      country: country.value,
      age: age.value,
    };
    next();
  }
}

function validateAnswer() {
  let radios = document.getElementsByName("Opt");
  let length = radios.length;
  let error = true;
  for (var i = 0; i < length; i++) {
    if (radios[i].checked) {
      info[x] = radios[i].value;
      radios[i].checked = false;
      error = false;
      break;
    }
  }
  if (error) {
    alert("You must answer");
  }
  return error
}

function next() {
  if (x !== 0) {
    if(validateAnswer()){
      return
    }
    let radios = document.getElementsByName("Opt");
    let length = radios.length;
    for (var i = 0; i < length; i++) {
      if (radios[i].checked) {
        info[x] = radios[i].value;
        radios[i].checked = false;
        break;
      }
    }
    if(x==4){
      document.getElementById("view1").style.display = "none";
      document.getElementById("view2").style.display = "block";
      document.getElementById("info").innerHTML=displayInfo()
    }
  }else{
    document.getElementById("view0").style.display = "none";
    document.getElementById("view1").style.display = "block";
    x++;
  }

  document.getElementById("question").innerHTML = questions[(x - 1) * 5];
  for (var i = 1; i < 5; i++) {
    let ind = (x - 1) * 5 + i;
    let opt = document.getElementById("opt" + (i - 1));
    opt.innerHTML = questions[ind];
  }
  document.getElementById("progressTag").innerHTML="Progress: "+x+"/4"
  document.getElementById("progress").value= 25*x
  x++;
}

function back() {
  document.getElementById("progressTag").innerHTML="Progress: "+(x-2)+"/4"
  document.getElementById("progress").value= 25*(x-2)
  if (x == 2) {
    document.getElementById("view1").style.display = "none";
    x--;
    document.getElementById("view0").style.display = "block";
  }
  if( x== 5){
    document.getElementById("view2").style.display = "none";
    document.getElementById("view1").style.display = "block";
  }
  x--;
  document.getElementById("question").innerHTML = questions[(x - 2) * 5];
  for (var i = 1; i < 5; i++) {
    let ind = (x - 2) * 5 + i;
    let opt = document.getElementById("opt" + (i - 1));
    opt.innerHTML = questions[ind];
  }
}

function end(){
  document.getElementById("fname").value="";
  document.getElementById("lname").value="";
  document.getElementById("email").value="";
  document.getElementById("country").value="Europe";
  document.getElementById("age").value="";
  info ={}
  document.getElementById("view2").style.display = "none";
  document.getElementById("view0").style.display = "block";
  alert("Your answer has been submitted")
  document.getElementById("progressTag").innerHTML="Progress: 0/4"
  document.getElementById("progress").value= 0
}

function displayInfo() {
  let txt = "";
  txt += "Name: " + info.fname + " " + info.lname + "<br><br>";
  txt += "Email: " + info.email + "<br><br>";
  txt += "Country: " + info.country + "<br><br>";
  txt += "Age: " + info.age + "<br><br>";
  for (var i = 1; i < x; i++) {
    questionNum = (i - 1) * 5;
    answerNum = questionNum + parseInt(info[i + 1]) + 1;
    txt +=
      "Q" +
      i +
      ". " +
      questions[questionNum] +
      "<br>" +
      "Your answer was:" +
      questions[answerNum] +
      "<br><br>";
  }
  return txt;
}
