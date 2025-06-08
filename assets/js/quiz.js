const quizdata = {
   math: [
    {
      question:'what is 2+2',
      options:[ "1","2","3","4" ],

    },

   ],
   english: [
    {
      question:'choose the correct spelling',
      options:[ "receive","recive","receve","receeve" ],
      correctanswer: "receive"
    },
    {
      question:'choose the correct spelling',
      options:[ "receive","recive","receve","receeve" ],
      correctanswer: "receive"
    },
    {
      question:'choose the correct spelling',
      options:[ "receive","recive","receve","receeve" ],
      correctanswer: "receive"
    },
   ],
   geography: [
    {
      question:'which planet is known as the red planet',
      options:[ "mars","jupiter","pluto","uranus" ], 
      correctanswer: "mars"
    },
    {
      question:'which planet is known as the dwarf planet',
      options:[ "mars","jupiter","pluto","uranus" ],
      correctanswer: "pluto" 

    },
   ]
};
 let selectedsubject = ""
function choosesubject(){
  const select = document.getElementById('subject-select');
   selectedsubject = select.value;
   if(selectedsubject!==""){
     startquiz();
   }else{
     document.getElementById('quizsection').innerHTML=" ";
   }
}
function  startquiz(){
  currentquestion= 0
  score = 0;
  selectedoption= ""
  
  document.getElementById('next-btn').disabled = true;
  showquestion();
}
function showquestion() {
  const questions = quizdata[selectedsubject];
  const questionobj = questions[currentquestion];

  document.getElementById('questiontext').innerText = questionobj.question;

  const optionscontainer = document.getElementById('options').innerHTML=""
   selectedoption="";
   document.getElementById('next-btn').disabled = true;

   questionobj.option.forEach(option => 
    {
      const btn = document.createElement('button');
      btn.innerText= option;
      btn.onclick = () => 
        selectedoption(btn, option);
      optionscontainer.appendChild(btn);
   });
}

function selectedoption(btn, option){
  document.querySelectorAll("#optionsbutton").forEach(btn =>{
    btn.style.backgroundcolor ="";

  });
  button.style.backgroundcolor ="lightblue";
  selectedoption = option;

  document.getElementById('next-btn').disabled = false;
}
function nextquestion(){
  const questions = quizdata[selectedsubject];
  const correct  = questions[currentquestion].correctanswer;

  if(selectedoption === correct){
    score++;
  }
  currentquestion++;
  if(currentquestion < questions.length){
    showquestion();
  }else{
    showresult();
  }
}

function showresult(){
   document.getElementById('quizsection').innerHTML = `
   <div> your score: ${score}/${quizdata[selectedsubject].length}</div>
   <button onclick="startquiz()">retry</button>`;
}