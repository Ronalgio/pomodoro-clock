//Globals

const container = document.getElementById("container");
const displayup = document.getElementById("displayup");
const displaydown = document.getElementById("displaydown");

const sessions = document.getElementById("sessions")
const plusS = document.getElementById("plusS")
const minusS = document.getElementById("minusS")

const breaks = document.getElementById("breaks")
const plusB = document.getElementById("plusB")
const minusB = document.getElementById("minusB")

const play = document.getElementById("play")
const reset = document.getElementById("reset")
const pause = document.getElementById("pause")
const stop = document.getElementById("stop")
const timer = document.getElementById("timer")
const timerTitle = document.getElementById("timertitle")

const buttons = document.querySelectorAll("buttons")


// initialize 

let sessionsValue = 25;
let breaksValue = 5;
let distance;
let startingTime;
let interval;
let hours = 0;
let minutes = 0;
let seconds = 0;
let temp;
let newTime; 
timerTitle.innerText = session.innerHTML;

// EventListeners

play.addEventListener ("click" , function () {
  startTimer();
  plusS.disabled = true;
  minusS.disabled = true;
  minusB.disabled = true;
  plusB.disabled = true;
  });

pause.addEventListener("click" , function () {
  clearInterval (interval);
  sessionsValue = (distance/(60*1000));
});

stop.addEventListener ("click" , function () {
  clearInterval (interval);
  sessionsValue = Number(sessions.innerText);
  displaySessions();
  plusS.disabled = false;
  minusS.disabled = false;
  minusB.disabled = false;
  plusB.disabled = false;

   });

reset.addEventListener ("click" , function () {
  clearInterval (interval);
  sessionsValue = 25;
  displaySessions();
  breaks.innerText = 5;
  sessions.innerText = 25;
  plusS.disabled = false;
  minusS.disabled = false;
  minusB.disabled = false;
  plusB.disabled = false;
});

plusS.addEventListener ("click" , function () {
  plusSessions();
  displaySessions ();
});

minusS.addEventListener ("click" , function () {
  minusSessions();
  displaySessions ();
});

plusB.addEventListener ("click" , function () {
  plusBreaks();
});

minusB.addEventListener ("click" , function () {
  minusBreaks();
});

buttons.forEach((button) => {
button.addEventListener("mouseover", function () {
 button.style.color = "#E4E4E4";
});
});

// functions

function startTimer (){
  interval = setInterval (timerDisplay);
  startingTime = new Date().getTime();
}

function plusSessions () {
  sessionsValue = sessionsValue + 1;
  sessions.innerText = sessionsValue;
}

function minusSessions () {
  if (sessionsValue > 1) {
    sessionsValue = sessionsValue - 1;
    sessions.innerText = sessionsValue;
    }}

function plusBreaks () {
  breaksValue = breaksValue + 1;
  breaks.innerText = breaksValue;
 }

function minusBreaks () {
  if (breaksValue > 1) {
    breaksValue = breaksValue - 1;
    breaks.innerText = breaksValue;
}}

function pad(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}
function displaySessions() {
  document.getElementById("timer").innerHTML =   pad(00) + ":"
  + pad(sessionsValue) + ":" + pad(00);
}


function timerDisplay (){

  let currentTime = new Date().getTime();
  let difference = currentTime - startingTime;
  distance = (sessionsValue * 60 * 1000) - difference;

  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  hours = pad(hours);
  minutes = pad(minutes);
  seconds= pad(seconds);
 
  document.getElementById("timer").innerHTML =   hours + ":"
  + minutes + ":" + seconds;

  if (distance<=0.1){
    clearInterval(interval);
    if (startingTime == newTime){
      sessionsValue = temp;
      startTimer();
      timerTitle.innerText = "Session";
    } else {
      breakTime();
    }
  }
}

function breakTime (){
  timerTitle.innerText = "Break";
  interval = setInterval (timerDisplay);
  newTime = new Date().getTime();
  startingTime = newTime;
  temp = sessionsValue;
  sessionsValue = breaksValue;
}