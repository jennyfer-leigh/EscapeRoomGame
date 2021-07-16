const head = document.getElementsByTagName('head')[0];
const open = document.getElementById('next');
const circles = document.querySelectorAll(".circle");
const start = document.querySelector(".start")
const game = document.querySelector('.game');
const instructions = document.querySelector('.instructions');
const clues = document.querySelectorAll('.clues');
const paragraphs = document.querySelectorAll('.clues > p');

const correctValue = new Audio('sounds/OpenChest03- Mono.wav');
const escape = new Audio('sounds/LeitmotivSurpriseAward01 - Stereo.wav');
const forest = new Audio('sounds/530415__klankbeeld__forest-summer-roond-020-200619-0186.wav')
const backgroundMusic = new Audio('sounds/OST 02 - DarkWizzardsMerchantITheDarkForest.wav')
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

const lock1 = 801;
const lock2 = 973;
const lock3 = 292;
const lock4 = 118;
const lock5 = 003;

let currentActive = 1;

start.addEventListener('click', () => {
    start.classList.add('active')
    backgroundMusic.play()
    roomClues()
    update()
})    
    
open.addEventListener('click', () =>{
    const firstNum = document.getElementById('firstNum').value;
    const secondNum = document.getElementById('secondNum').value;
    const thirdNum = document.getElementById('thirdNum').value;
    const combination = firstNum+secondNum+thirdNum;
    
    if (currentActive == 1 && combination == lock1){currentActive++; correctValue.play();}
    if (currentActive == 2 && combination == lock2){currentActive++; correctValue.play();}
    if (currentActive == 3 && combination == lock3){currentActive++; correctValue.play();}
    if (currentActive == 4 && combination == lock4){currentActive++; correctValue.play();}
    if (currentActive == 5 && combination == lock5){
        currentActive++; 
        open.textContent = 'Congratulations! You Escaped!'
        backgroundMusic.pause();
        correctValue.play(); 
        escape.play();
        forest.play()
    }

    if(currentActive > circles.length){currentActive = circles.length}    

    update()

    })
    
clues.forEach(clue =>
    clue.addEventListener('click', () => clue.classList.toggle('active')));

instructions.addEventListener('click', () => 
instructions.classList.toggle('active'));

function update(){
    classList()
    buttonDisable()
    backgroundImage()
    clearClues()
    roomClues()
    clearText()
    clueText()
    clearLock()
}

function classList(){
    circles.forEach((circle, idx) => {
        idx < currentActive ? circle.classList.add('active') : circle.classList.remove('active');
    })
}

function buttonDisable(){
    currentActive === circles.length ? next.disabled = true : next.disabled = false;
}

function backgroundImage(){
    game.style.backgroundImage = `url('images/${currentActive}.jpeg')`;

}

function clearClues(){
    let cssLink = document.querySelector('head > link:nth-child(7)');
    cssLink.remove();
}

function roomClues(){    
    const cssLink = document.createElement('link')
    cssLink.href = `room${currentActive}.css`
    cssLink.rel = "stylesheet"
    head.appendChild(cssLink);
}

function clearLock(){
    document.getElementById('firstNum').value = 0;
    document.getElementById('secondNum').value = 0;
    document.getElementById('thirdNum').value = 0;
}

function clearText(){
    paragraphs.forEach((paragraph) => {
        paragraph.textContent += '';
    })
}

function clueText(){
    const riddles = [
        
        ['If you multiply me by any other number, the answer will always remain the same.', 'Don’t you hate it when someone answers their own question? I do.', ' If each is the same number what equals 1000? _ _ _ + _ _ + _ + _ + _', 'A sandwich tried to get a reservation at a restaurant, but the waiter said they don’t serve food there.','There is an empty basket that is 50cm in diameter. How many eggs can you put in the basket?' ], 
        
        ['I am an odd number. Take away a letter and I am even.', 'There are three types of people: those who can count and those who can’t.' ,'What number becomes smaller when it is upside down?', 'Don’t spell part backward. It’s a trap.', 'A girl buys a dozen eggs. As she goes home, she breaks all but three of them. How many unbroken eggs does she have?'],
         
        ['If two is company and three is a crowd, what are four and five?', 'I recently saw a sign that said “Watch for Animals.” What a great deal!', 'If there are three apples and you take away two, how many apples do you have?', 'I’m throwing a space-themed party for my birthday but I don’t want to planet.', 'How many sides does a circle have?'], 

        ['A child blows 18 bubbles, then pops 6 and eats 7, then pops 5 and blows 1. How many are left?',  'I tried to do my paperwork but my pencil broke, so it was pointless.', 'How many times can you subtract the number 5 from 25?',  'Whoever invented knock-knock jokes deserves a no-bell prize.', 'What number can you subract half from to get 0?'],

        ['A grandfather, two fathers and two sons went to see a movie, together. Everyone bought one ticket. How many tickets did they buy?',  'I was addicted to the hokey pokey… but thankfully, I turned myself around', 'If you buy a rooster to get 1 egg each day, how many eggs will you have after a week?',  'I woke up this morning and forgot which side the sun rises from, then it dawned on me.', 'If it took 6 people 9 hours to build a barn, how long would it take 12 people to build the same barn?' ], 

        ['Thank you for taking the time to look at my game.',  'I learned alot while doing it.', 'I was trying to learn about vanilla Javascript and practice interacting with html and css.',  'If you are interested in seeing more, you can go to my GitHub', 'https://github.com/jennyfer-leigh' ]
    ]

    paragraphs.forEach((paragraph, idx) => {
        paragraph.textContent = riddles[currentActive - 1][idx];
    })
}

