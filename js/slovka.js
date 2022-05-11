// Start of stuff I wrote really badly
//reload button
document.getElementById('refresh').onclick = function () {
        location.reload(); 
}  

// rules hidden by default - open on link click
document.getElementById('rules').onclick = function () {
    document.getElementById('rules-box').classList.add("animate__animated", "animate__fadeIn");

    document.getElementById('rules-box').style.display = 'flex';
    document.getElementById('board').style.display = 'none';
    document.getElementById('keyboard').style.display= 'none';

    document.getElementById('rules-box').onclick = function () {
        document.getElementById('rules-box').style.display = 'none';
        document.getElementById('board').classList.add("animate__animated", "animate__fadeIn")
        document.getElementById('board').style.display = 'grid';
        document.getElementById('keyboard').style.display= 'grid';
        document.getElementById('keyboard').classList.add("animate__animated", "animate__fadeIn")
    }
} 
// End of really badly stuff.
// Start of not that bad 

//data
const maxWordLength = 5;
const maxTries = 6;

let word = '';
let tries = 1;
let solution = dictionary[Math.floor(Math.random() * dictionary.length)];
let noAccDic = dictionary.map(word => noAccent(word)); // dictionary without accents

let normalizedSolution = noAccent(solution);
//console.log(normalizedSolution);

let lettersInRow = {
    correct:[],
    present: [],
    wrong: [],
}

let canSubmit = true 

//KEYS
document.addEventListener('keydown', (event) => {
    
    if (event.key === 'Enter') {
        submitWord();
    }   
    
    else if (event.key === 'Backspace') {
        removeLetter();
    }   
    
    else {
        addLetter(event.key);
    }
    
})


//send
const submitWord = () => {
    if (word.length !== maxWordLength) return;
    if (!canSubmit) return;
    
    if (!noAccDic.includes(noAccent(word))) {
		animateRowShake(currentRow())
		return
	}
    findLetterInRow();
    animateTileReveal( currentRow());
    highLightLettters(currentRow());
    
    canSubmit = false;// to prevent submiting again in reveal animation
   let lastTile = currentRow().querySelector(':last-child');
   lastTile.addEventListener('animationend', () => {
       judgeResult();
    
   })     
}

//add letter
const addLetter = (char) => {
    if (word.length >= maxWordLength) return;
    
    //only letters
    
    if (/^\p{L}$/u.test(char)) {
        word = word + char;
        word = word.toLowerCase();
        
        let tile = currentTile();
        tile.innerText = noAccent(char);
        animateTileFlipX(tile);
    }
    
    //console.log(word);
}

//remove letter
const removeLetter = () => {
    if (word.length <= 0) return;
    
    let tile = currentTile();
    tile.innerText = " ";
    tile.className = 'tile';
    
    word = word.slice(0, -1);
    //console.log(word);
}

//tile update
const currentTile = () => {
    return currentRow().querySelector(":nth-child(" + word.length + ")");
}

//current row
const currentRow = () => {
    return document.querySelector(".row:nth-child(" + tries + ")");
}

//see how we  do

const judgeResult = () => {
    canSubmit = true;
    if (noAccent(word) === normalizedSolution) {
        animateWin(currentRow());
        canSubmit = false;
        tryAgain();
    } 
    else if (tries >= maxTries) {
        outOfTries();
        canSubmit = false;
        tryAgain();
    } 
    else {
        word = '';
        tries++;
    }
}

//goes through letter to check tiles for colors
const findLetterInRow = () => {
    let present = [];
    let correct = [];
    let wrong = [];
    
    [...word].forEach((letter, index) => {
        letter = noAccent(letter)
        if(normalizedSolution.charAt(index) === word.charAt(index)) {
            correct.push(letter);
        }
        else if (normalizedSolution.includes(letter)) {
            present.push(letter);
        }
        else {
            wrong.push(letter)
        }
    });
    
    lettersInRow = {
        present,
        correct,
        wrong,
    }
};

//removes accents
function noAccent (str) {
    return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

//change Enter key, to start Again at end of game
const tryAgain = () => {
  setTimeout(() =>{
    document.getElementById('Enter').className = 'tile correct';
    document.getElementById('Enter').innerText = 'znova ?';
    document.getElementById('Enter').onclick = function() {
      location.reload();
    }
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            location.reload();
        }
    })
  }, 1000)
}


//touch interface
const keyborad = document.querySelector('.keyboard');
keyborad.addEventListener('click', (event) => {
    
    if (event.target.nodeName !== 'BUTTON') {
    return
    }

    if (event.target.id === 'Enter') {
        submitWord();
    }   
    
    else if (event.target.id === 'Backspace') {
        removeLetter();
    }   
    
    else {
        addLetter(event.target.id);
    }
})

