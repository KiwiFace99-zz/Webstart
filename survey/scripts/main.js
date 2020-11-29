let info = {};
let fname, lname, email, country, age;
let tracker = 0;
const questions = [
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
  "Fav pet",
  "Cat",
  "Dog",
  "Fish",
  "Bird",
];
const numberOfQuestions = questions.length / 5 + 1;
const incrementAmount = 100 / numberOfQuestions;

window.onload = function () {
  document.getElementById("myBtn").addEventListener("click", validateForm);
  document.getElementById("next").addEventListener("click", next);
  document.getElementById("end").addEventListener("click", end);
  document.getElementById("firstBack").addEventListener("click", back);
  document.getElementById("lastBack").addEventListener("click", back);
  document.getElementById("progressTag").innerHTML =
    "Progress: " + tracker + "/" + numberOfQuestions;
};

function validateForm() {
  fname = document.getElementById("fname");
  lname = document.getElementById("lname");
  email = document.getElementById("email");
  country = document.getElementById("country");
  age = document.getElementById("age");

  if (!fname.checkValidity()) {
    alert("First Name: \n" + age.validationMessage);
  } else if (!lname.checkValidity()) {
    alert("Last Name: \n" + age.validationMessage);
  } else if (!email.checkValidity()) {
    alert("Email: \n" + age.validationMessage);
  } else if (!age.checkValidity()) {
    alert("Age: \n" + age.validationMessage);
  } else {
    info.fname = fname.value;
    info.lname = lname.value;
    info.email = email.value;
    info.country = country.value;
    info.age = age.value;
    next();
  }
}

function validateAnswer() {
  let radios = document.getElementsByName("Opt");
  let length = radios.length;
  let error = true;
  for (let i = 0; i < length; i++) {
    if (radios[i].checked) {
      info[tracker] = radios[i].value;
      radios[i].checked = false;
      error = false;
      break;
    }
  }
  if (error) {
    alert("You must answer");
  }
  return error;
}

function next() {
  if (tracker !== 0) {
    if (validateAnswer()) {
      return;
    }
    let radios = document.getElementsByName("Opt");
    let length = radios.length;
    for (let i = 0; i < length; i++) {
      if (radios[i].checked) {
        info[tracker] = radios[i].value;
        radios[i].checked = false;
        break;
      }
    }
    if (tracker == numberOfQuestions) {
      document.getElementById("view1").style.display = "none";
      document.getElementById("view2").style.display = "block";
      document.getElementById("info").innerHTML = displayInfo();
    }
  } else {
    document.getElementById("view0").style.display = "none";
    document.getElementById("view1").style.display = "block";
    tracker++;
  }

  document.getElementById("question").innerHTML = questions[(tracker - 1) * 5];
  for (let i = 1; i < 5; i++) {
    let ind = (tracker - 1) * 5 + i;
    let opt = document.getElementById("opt" + (i - 1));
    opt.innerHTML = questions[ind];
  }
  document.getElementById("progressTag").innerHTML =
    "Progress: " + tracker + "/" + numberOfQuestions;
  // document.getElementById("progress").value = 25 * tracker;
  moveBar(incrementAmount * tracker);
  let radios = document.getElementsByName("Opt");
  tracker++;
  if (info[tracker] !== undefined) {
    radios[info[tracker]].checked = true;
  }
}

function back() {
  document.getElementById("progressTag").innerHTML =
    "Progress: " + (tracker - 2) + "/" + numberOfQuestions;
  // document.getElementById("progress").value = 25 * (tracker - 2);
  moveBarBack(incrementAmount * (tracker - 2));
  if (tracker == 2) {
    document.getElementById("view1").style.display = "none";
    tracker--;
    document.getElementById("view0").style.display = "block";
  }
  if (tracker == numberOfQuestions + 1) {
    document.getElementById("view2").style.display = "none";
    document.getElementById("view1").style.display = "block";
  }
  tracker--;
  document.getElementById("question").innerHTML = questions[(tracker - 2) * 5];
  for (let i = 1; i < 5; i++) {
    let ind = (tracker - 2) * 5 + i;
    let opt = document.getElementById("opt" + (i - 1));
    opt.innerHTML = questions[ind];
  }
  let radios = document.getElementsByName("Opt");
  if (info[tracker] !== undefined) {
    radios[info[tracker]].checked = true;
  }
}

function end() {
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("country").value = "Europe";
  document.getElementById("age").value = "";
  info = {};
  tracker = 0;
  document.getElementById("view2").style.display = "none";
  document.getElementById("view0").style.display = "block";
  alert("Your answer has been submitted");
  document.getElementById("progressTag").innerHTML =
    "Progress: 0/" + numberOfQuestions;
  document.getElementById("progress").value = 0;
}

function displayInfo() {
  let txt = "";
  txt += "Name: " + info.fname + " " + info.lname + "<br><br>";
  txt += "Email: " + info.email + "<br><br>";
  txt += "Country: " + info.country + "<br><br>";
  txt += "Age: " + info.age + "<br><br>";
  for (let i = 1; i < tracker; i++) {
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

function moveBar(w) {
  let elem = document.getElementById("progress");
  let width = document.getElementById("progress").value;
  let id = setInterval(frame, 10);
  function frame() {
    if (width >= w) {
      clearInterval(id);
    } else {
      width++;
      elem.value = width;
    }
  }
}
function moveBarBack(w) {
  let elem = document.getElementById("progress");
  let width = document.getElementById("progress").value;
  let id = setInterval(frame, 10);
  function frame() {
    if (width <= w) {
      clearInterval(id);
    } else {
      width--;
      elem.value = width;
    }
  }
}
