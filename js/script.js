
// set up game variables
// let score = 0;
let initialBait = 0;
let baitCount = 0;
let level = 'easy'
let gameOn = true;
let gamesPlayed = 0;

// if bait is clicked, increment score by 1
$('body').on('click', '.bait', function () {
    if (gameOn === true ){
        $(this).removeClass('not-clicked')
        $(this).addClass("clicked");    
        baitCount --;
        // score++;
        $('.score').html(baitCount);
    }
    // // $(this).hide();
    // if (gameOn === true) {
    // }
    // else {
    //     console.log("GAME IS OBVVERRRR");
    // }
});

// if non-bait is clicked, decrease score by 1
$('body').on('click', '.boot', function () {
    if (gameOn === false) {
        console.log("gameOn not true");
    } else {
        gameOn = false;
        $('.game-area').addClass("paused"); 
        setTimeout( function(){ 
            gameOn = true;
            $('.game-area').removeClass("paused");
          }  , 2000 );    
    }
});

// SET UP PLAYING BOARD FUNCTION
// declare initial function
let bait1 = "worm.svg";
let bait2 = "caterpillar.svg";
let boot1 = "boot.svg";
let boot2 = "boot-2.svg";
let gameBoardHTML = '';

// function to create board
function createGameBoard(count) {
    for (let i=0; i<count; i++){
        let randoNum = Math.floor(Math.random() * 100);
        // console.log(randoNum);
        if (randoNum < 20) {
            baitCount ++ ;
            gameBoardHTML += `<div class="card bait not-clicked"><img src="assets/${bait1}" alt="worm"></div>`;
        } else if (randoNum < 40) {
            baitCount ++ ;
            gameBoardHTML += `<div class="card bait not-clicked"><img src="assets/${bait2}" alt="worm"></div>`;
        } else if (randoNum < 70) {
            gameBoardHTML += `<div class="card boot not-clicked"><img src="assets/${boot1}" alt="worm"></div>`;
        } else {
            gameBoardHTML += `<div class="card boot not-clicked"><img src="assets/${boot2}" alt="worm"></div>`;
        }
    }
    initialBait = baitCount;
}

// function to change game difficulty setting
$('.level').on('click', function(){
    level = $(this).html().toLowerCase();
});

// function to control game length and logic
function playGame() {

    // creat board based on level of difficulty
    if (level === 'easy'){
        createGameBoard(32);
    } else if (level === 'medium') {
        createGameBoard(64);
    } else {
        createGameBoard(96);
    }

    // set gameLength and gameClock
    let gameLength = 10;
    let gameClock = gameLength + 4;

    // start countdown from 3
    $('.game-area .holder h2').html("READY?");  

    let countInterval = setInterval(timer, 800);
    function timer(){
        if (gameClock > (gameLength + 1)) {
            // continue countdown to game
            $('.game-area .holder h2').html(gameClock-(gameLength + 1));
            gameClock = gameClock -1;

        } else if (gameClock === (gameLength + 1)){
            // tell player the game is starting & how many bugs they have to get
            $('.game-area .holder h2').html("START!");
            $('.score').html(baitCount);
            gameClock = gameClock -1;

        } else if (gameClock === gameLength) {
            // populate game-area board with cards & set gam timer
            $('.game-area').html(gameBoardHTML);
            $('.timer').html(gameClock);
            gameClock = gameClock -1;

        } else if (gameClock > 0) {
            // count down game timer
            $('.timer').html(gameClock);
            gameClock = gameClock -1;

        } else {
            // time is up, game is over
            $('.timer').html("Times UP!");
            console.log(baitCount);
            if (baitCount > 0) {
                $('.result').html(`You missed ${baitCount} clicks! Try again?`);
            } else {
                $('.result').html(`You got all ${initialBait} clicks! YOU WIN!`);
            }
            gameOn = false;
            clearInterval(countInterval);
            $('.start').html("Restart");
        }
    }
}

// FUBCTION TO START GAME ON CLICK
$('.start').on('click', function(){
    if (gamesPlayed = 0 ){
        playGame();
    } else {
        gameOn = true;
        $('.game-area').html('<div class="holder"><h2></h2></div>');
        playGame();
    }
});



