
// SCOREING FUNCTIONS
let score = 0;
let gameOn = true;

// if bait is clicked, increment score by 1
$('body').on('click', '.bug', function () {
    if (gameOn === true) {
        score++;
        console.log(score);
        $('.score').html(score);
    }
    else {
        console.log("GAME IS OBVVERRRR");
    }
});

// if non-bait is clicked, decrease score by 1
$('body').on('click', '.boot', function () {
    if (score > 0) {
        score--;
    }
    console.log(score);
    $('.score').html(score);
});

// SET UP PLAYING BOARD FUNCTION
// declare initial function
let bugHtml = '<div class="card bug"><img src="assets/worm.svg" alt="worm"></div>';
let bootHtml = '<div class="card boot"><img src="assets/boot.svg" alt="worm"></div>';
let gameBoardHTML = '';

// function to create board
function createGameBoard(count) {
    for (let i=0; i<count; i++){
        let randoNum = Math.floor(Math.random() * 100);
        console.log(randoNum);
        if (randoNum < 40) {
            gameBoardHTML += bugHtml;
        } else {
            gameBoardHTML += bootHtml;
        } 
    }
}


function playGame() {
    let gameClock = 34;
    $('.game-area .holder h2').html(3);  
    let countInterval = setInterval(timer, 800);
    function timer(){
        if (gameClock > 31) {
            console.log(gameClock-31);
            gameClock = gameClock -1;
            $('.game-area .holder h2').html(gameClock-31);
        } else if (gameClock === 31){
            console.log("START!");
            gameClock = gameClock -1;
            $('.game-area .holder h2').html("START!");
        } else if (gameClock === 30) {
            $('.game-area').html(gameBoardHTML);
            $('.timer').html(gameClock);
            gameClock = gameClock -1;
        } else if (gameClock > 0) {
            $('.timer').html(gameClock);
            gameClock = gameClock -1;
        } else {
            console.log("GAME OVER!");
            $('.timer').html("Times UP!");
            gameOn = false;
            clearInterval(countInterval);
        }
    }
}

$('.start').on('click', function(){
    playGame();
});

// depending on level: create different sized board
$('.level').on('click', function(){
    level = $(this).html().toLowerCase();
    easyBoardHtml = "";
    if (level === 'easy'){
        createGameBoard(16);
    } else if (level === 'medium') {
        createGameBoard(32);
    } else {
        createGameBoard(48);
    }
});

