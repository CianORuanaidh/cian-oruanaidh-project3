// set up game variables
let initialBait = 0;
let baitCount = 0;
let level = 'easy'
let gameOn = true;
let gamesPlayed = 0;
// let gamesLost = 0;

$('.end-game-score .this-game, .end-game-score .total-games ').hide();
$('.score-holder').hide();


// FUNCTION FOR ON CLICK OF BAIT
// if bait is clicked, increment score by 1
$('body').on('click', '.not-clicked', function () {
    if (gameOn === true ){
        console.log('gameOn === true')
        $(this).removeClass('not-clicked')
        $(this).addClass("clicked");    
        baitCount --;
        // $('.score').html(baitCount);
    }
});

// FUNCTION FOR ON CLICK OF BOOT
// if non-bait is clicked, paused ability to click for 1.5 seconds
$('body').on('click', '.boot', function () {
    if (gameOn === false) {
        console.log("Game is over");
    } else {
        gameOn = false;
        $('.game-area').addClass("paused"); 
        setTimeout( function(){ 
            gameOn = true;
            $('.game-area').removeClass("paused");
          }  , 1500 );    
    }
});

// declare icons as variables
let bait1 = "worm.svg";
let bait2 = "caterpillar.svg";
let boot1 = "boot.svg";
let boot2 = "boot-2.svg";
let gameBoardHTML = '';

// FUNCTION TO CREATE GAME BOARD
// takes count variable based on game difficulty 
// & randomly creates cards based on type and icon
function createGameBoard(count) {
    gameBoardHTML = '';
    baitCount = 0;
    for (let i=0; i<count; i++){
        let randoNum = Math.floor(Math.random() * 100);
        if (randoNum < 20) {
            baitCount ++ ;
            gameBoardHTML += `<div class="card bait not-clicked"><img src="assets/${bait1}" alt="worm"></div>`;
        } else if (randoNum < 40) {
            baitCount ++ ;
            gameBoardHTML += `<div class="card bait not-clicked"><img src="assets/${bait2}" alt="worm"></div>`;
        } else if (randoNum < 70) {
            gameBoardHTML += `<div class="card boot"><img src="assets/${boot1}" alt="worm"></div>`;
        } else {
            gameBoardHTML += `<div class="card boot"><img src="assets/${boot2}" alt="worm"></div>`;
        }
    }
    initialBait = baitCount;
}

// FUNCTION TO CHANGE GAME DIFFICULTY SETTING
$('.level').on('click', function(){
    $('.level').removeClass("selected");
    $(this).addClass("selected");
    level = $(this).html().toLowerCase();
});

// MAIN FUNCTION TO CONTROL GAME LENGTH AND LOGIC
function playGame() {
    // console.log("played " + gamesPlayed);
    // create game board based on level of difficulty
    if (level === 'easy'){
        createGameBoard(32);
    } else if (level === 'medium') {
        createGameBoard(48);
    } else {
        createGameBoard(66);
    }

    // set gameLength and gameClock
    let gameLength = 10;
    let gameClock = gameLength + 4;

    // start mission countdown from 3
    $('.game-area .holder h2').html("READY?");  

    let countInterval = setInterval(timer, 800);
    function timer(){
        if (gameClock > (gameLength + 1)) {
            // continue countdown to game
            $('.game-area .holder h2').html(gameClock-(gameLength + 1));
            gameClock = gameClock -1;

        } else if (gameClock === (gameLength + 1)){
            // tell player the mission is starting & how many bugs they have to get
            $('.game-area .holder h2').html("START!");
            $('.score-holder .timer').html("-");
            $('.score-holder').show();
            // $('.score').html(baitCount);
            gameClock = gameClock -1;

        } else if (gameClock === gameLength) {
            // mission starts
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
            // check to see if player completed their mission
            if (baitCount > 0) {
                // send message if mission incomplete
                $('.result').html(`You missed ${baitCount} clicks! Try again?`);
            } else {
                // send mission if complete
                $('.result').html(`You got all ${initialBait} clicks! YOU WIN!`);
            }
            // populate scores
            $('.this-game .score').html((initialBait - baitCount) + "/" + initialBait);
            $('.this-game .percent').html((((initialBait - baitCount)/initialBait)*100).toFixed(0) + " %");
            $('.this-game .note').html("Game OVER");
            gamesPlayed ++;

            $('.end-game-score > h2').hide();
            $('.end-game-score .this-game, .end-game-score .total-games ').show();
            // console.log("played " + gamesPlayed);
            $('.total-games .played').html(gamesPlayed);

            // turn game off, clear interval & set star to restart
            gameOn = false;
            clearInterval(countInterval);
            $('.start').html("Restart");

            // Remove pop-out score board
            $('.score-holder').hide();
        }
    }
}

// function to start/restart game on click of start/restart button
$('.start').on('click', function(gamesPlayed){
    // console.log(gamesPlayed);
    if (gamesPlayed = 0 ){
        // console.log();
        playGame();
    } else {
        // if this is not 1st game, we need to reset .game-area html and set gameOn to be true
        gameOn = true;
        $('.game-area').html('<div class="holder"><h2></h2></div>');
        playGame();
    }
});



