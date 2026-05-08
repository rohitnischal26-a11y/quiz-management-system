const data = {
  movies: [
    { q: "Who directed Titanic?", a: ["Spielberg", "James Cameron", "Nolan", "Scorsese"], correct: 1 },
    { q: "Marvel hero Iron Man real name?", a: ["Steve", "Tony Stark", "Bruce", "Thor"], correct: 1 },
    { q: "Oscar award is for?", a: ["Sports", "Movies", "Music", "Science"], correct: 1 },
    { q: "Avatar released in?", a: ["2009", "2012", "2015", "2005"], correct: 0 },
    { q: "Bollywood is in?", a: ["USA", "UK", "India", "Canada"], correct: 2 },
    { q: "Fast & Furious is about?", a: ["Cars", "Planes", "Ships", "Trains"], correct: 0 },
    { q: "Joker is villain of?", a: ["Superman", "Batman", "Ironman", "Hulk"], correct: 1 },
    { q: "Harry Potter is?", a: ["Wizard", "Doctor", "Pilot", "King"], correct: 0 },
    { q: "Inception director?", a: ["Nolan", "Cameron", "Spielberg", "Tarantino"], correct: 0 }
  ],

  art: [
    { q: "Mona Lisa painter?", a: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"], correct: 1 },
    { q: "Starry Night artist?", a: ["Van Gogh", "Da Vinci", "Picasso", "Munch"], correct: 0 },
    { q: "Art of paper folding?", a: ["Origami", "Sketch", "Oil", "Clay"], correct: 0 },
    { q: "Sculpture is?", a: ["2D", "3D", "Sound", "Digital"], correct: 1 },
    { q: "Modern art started in?", a: ["19th century", "18th", "17th", "20th"], correct: 0 },
    { q: "Watercolor uses?", a: ["Water", "Oil", "Ink", "Sand"], correct: 0 },
    { q: "Famous painter Picasso nationality?", a: ["French", "Spanish", "Italian", "German"], correct: 1 },
    { q: "Drawing uses?", a: ["Pencil", "Hammer", "Knife", "Drill"], correct: 0 },
    { q: "Canvas used for?", a: ["Painting", "Cooking", "Coding", "Driving"], correct: 0 }
  ],

  football: [
    { q: "Football World Cup held every?", a: ["2", "3", "4", "5"], correct: 2 },
    { q: "Messi country?", a: ["Brazil", "Argentina", "Spain", "France"], correct: 1 },
    { q: "Cristiano Ronaldo country?", a: ["Portugal", "Spain", "Italy", "Brazil"], correct: 0 },
    { q: "Players in a team?", a: ["9", "10", "11", "12"], correct: 2 },
    { q: "Goalkeeper role?", a: ["Score", "Defend goal", "Coach", "Referee"], correct: 1 },
    { q: "FIFA stands for?", a: ["Football Org", "International Football", "Federation", "None"], correct: 2 },
    { q: "Ball shape?", a: ["Round", "Square", "Triangle", "Flat"], correct: 0 },
    { q: "Yellow card means?", a: ["Warning", "Goal", "Win", "Lose"], correct: 0 },
    { q: "Red card means?", a: ["Exit", "Win", "Draw", "Goal"], correct: 0 }
  ],

  electronics: [
    { q: "CPU full form?", a: ["Central Processing Unit", "Computer Unit", "Core Unit", "None"], correct: 0 },
    { q: "RAM is?", a: ["Storage", "Memory", "CPU", "GPU"], correct: 1 },
    { q: "Voltage unit?", a: ["Volt", "Ampere", "Ohm", "Watt"], correct: 0 },
    { q: "Current unit?", a: ["Volt", "Ampere", "Ohm", "Watt"], correct: 1 },
    { q: "Ohm measures?", a: ["Voltage", "Current", "Resistance", "Power"], correct: 2 },
    { q: "Transistor is?", a: ["Switch", "Battery", "Wire", "Fan"], correct: 0 },
    { q: "LED stands for?", a: ["Light Emitting Diode", "Lamp", "Laser", "Light Device"], correct: 0 },
    { q: "Battery stores?", a: ["Energy", "Water", "Data", "Air"], correct: 0 },
    { q: "Circuit needs?", a: ["Path", "Water", "Air", "Sound"], correct: 0 }
  ]
};

let questions = [];
let current = 0;
let score = 0;
let selected = null;

function startQuiz() {
  const topic = document.getElementById("topic").value;
  questions = shuffle(data[topic]).slice(0, 8);
  current = 0;
  score = 0;

  document.getElementById("start").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  loadQuestion();
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  const q = questions[current];
  document.getElementById("question").innerText = q.q;

  const ansDiv = document.getElementById("answers");
  ansDiv.innerHTML = "";

  q.a.forEach((ans, index) => {
    const btn = document.createElement("div");
    btn.innerText = ans;
    btn.classList.add("answer-btn");

    btn.onclick = () => {
      selected = index;
      document.querySelectorAll(".answer-btn").forEach(b => b.style.background = "#38bdf8");
      btn.style.background = "#22c55e";
    };

    ansDiv.appendChild(btn);
  });
}

function nextQuestion() {
  if (selected === questions[current].correct) {
    score++;
  }

  selected = null;
  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    document.querySelector(".container").innerHTML = `
      <h2>🎉 Finished</h2>
      <p>Score: ${score}/8</p>
      <button onclick="location.reload()">Restart</button>
    `;
  }
}