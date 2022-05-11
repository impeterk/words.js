
//flip tile on input
const animateTileFlipX = (tile) => {
    tile.classList.add("is-filled", "animate__animated", "animate__flipInX");
}

//flip each tile in row after submit
animateTileReveal = (row) => {
    row.querySelectorAll('.tile').forEach((tile, index) => {

        tile.classList.remove('animate__flipInX', 'animate__flipInY')
        
        setTimeout(() => {
            tile.style.visibility = 'visible'
            tile.classList.add('animate__flipInY', `animate__delay-${index}s`)
            
        },0);      
        
    })
    
}

//animates row with unknown word
const animateRowShake = (row) => {

   row.classList.remove("animate__headShake");

   setTimeout (() => {

    row.classList.add("animate__animated", "animate__headShake");
   }, 0);
}

//animates win!
const animateWin = (row) => {
    row.querySelectorAll('.tile').forEach((tile, index) => {
        tile.innerText = solution.charAt(index);
        tile.classList.remove('animate__flipInY');
        tile.classList.add('animate__heartBeat');
    })
}

//change color of tile in board and keyboard depending on char 
const highLightLettters = (row) => {

    let presentLetters = [];

    row.querySelectorAll('.tile').forEach((tile, index) => {
        
        tile.style.visibility = 'hidden'
        
        let letter = noAccent(word.charAt(index));
        let colorClass = 'wrong';
        
        if (normalizedSolution.includes(letter)) {
            //to count how many each char is in word
            function countOccurrences(arr, val) {
                return arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
            }

            let solutionArray = [];
             for(let letter of normalizedSolution) {
                solutionArray.push(letter);
            }

            if (!lettersInRow.correct.includes(letter) && !(countOccurrences(presentLetters, letter) >= countOccurrences(solutionArray, letter))) {
                colorClass = 'present';
                presentLetters.push(letter);
            }
        }
        
        if (normalizedSolution.charAt(index) === letter) {
            colorClass = 'correct';
        }
        
        tile.classList.add(colorClass);
    });
//adds color to keyboard tiles depenging on char
    document.querySelectorAll('.keyboard .tile').forEach((tile, index) => {
        let colorClass = '';

        if (lettersInRow.wrong.includes(tile.id)) {
            tile.classList.remove('keys');
            colorClass = 'wrong';
        }
        if (lettersInRow.present.includes(tile.id)) {
            tile.classList.remove('keys');
            colorClass = 'present';
        }
        if (lettersInRow.correct.includes(tile.id)) {
            tile.classList.remove('keys');
            colorClass = 'correct';
        }

        if (colorClass) {
            tile.classList.add(colorClass);
        }
    })

}
//animation after losing
const outOfTries = () =>{
    //let board = ;
    document.querySelector('.board').querySelectorAll('.tile').forEach((tile, index) => {
        tile.style.visibility = 'hidden'
        tile.className = 'tile';
        tile.classList.add("animate__animated", 'animate__flipInY');
        tile.innerText = ''; 
    });
    setTimeout(() => {
        let rowThird = document.querySelector(".row:nth-child(3)");
        rowThird.querySelectorAll('.tile').forEach((tile, index) => {
            tile.style.visibility = 'visible';
            tile.className = 'tile';
            tile.classList.add("is-filled", "animate__animated", 'animate__flipInY', 'loser',`animate__delay-${index}s`);
            tile.innerText = solution.charAt(index);
        })
    }, 500);
}