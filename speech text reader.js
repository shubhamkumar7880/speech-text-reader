const main=document.querySelector('main');
const voicesSelect=document.getElementById('voices');
const textarea=document.getElementById('text');
const readBtn=document.getElementById('read');
const toggleBtn=document.getElementById('toggle');
const closeBtn=document.getElementById('close');

const data=[
{
    image: './speech/drink.jpg',
    text: "I'm Thirsty"
},
{
    image: './speech/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './speech/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './speech/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: './speech/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: './speech/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: './speech/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: './speech/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: './speech/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: './speech/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: './speech/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: './speech/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  }
];

data.forEach(createBox);

//create speech box
function createBox(item){
const box=document.createElement('div');
const { image, text }=item;
box.classList.add('box');
box.innerHTML=`
<img src="${image}" alt="${text}"/>
<p class="info">${text}</p>
`;

box.addEventListener('click', () => {
  setTextMessage(text);
  speakText();

  //add active effect

  box.classList.add('active');
  setTimeout(() => box.classList.remove('active'),800);
});

main.appendChild(box);
}

// init speech synth
const message=new SpeechSynthesisUtterance();

// store voices

let voices=[];

function getVoices(){
  voices=speechSynthesis.getVoices();
  voices.forEach(voice => {
    const option=document.createElement('option');

    option.value=voice.name;
    option.innerText=`${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);

  });
}
// set text
function setTextMessage(text){
  message.text=text;
}

// speak text
function speakText(){
  speechSynthesis.speak(message);
}

// set voice
function setVoice(e){
message.voice=voices.find(voice => voice.name===e.target.value);
}

 // toggle text box
 toggleBtn.addEventListener('click', () =>
 document.getElementById('text-box').classList.toggle('show')
 );

  // close button
  closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
  );

  // voices changed
  speechSynthesis.addEventListener('voiceschanged', getVoices);

  // change voice
  voicesSelect.addEventListener('change', setVoice);

  // Read Text button
  readBtn.addEventListener('click', () =>{
    setTextMessage(textarea.value);
    speakText();

  });
  getVoices();