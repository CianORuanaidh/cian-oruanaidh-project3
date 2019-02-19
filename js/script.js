$(document).ready(function() {

    // set up game variables
    let initialBait = 0;
    let baitCount = 0;
    let level = 'easy'
    let gameOn = true;
    let gamesPlayed = 0;
    let gameWon = false;

    // declare icons as variables
    let bait1 = "worm.svg";
    let alt1 = "Worm icon used in click bait game.";
    let bait2 = "caterpillar.svg";
    let alt2 = "Caterpillar icon used in click bait game.";
    let boot1 = "boot.svg";
    let alt3 = "Boot icon used in click bait game.";
    let boot2 = "boot-2.svg";
    let alt4 = "Second boot icon used in click bait game.";

    // set create string to hold game board html
    let gameBoardHTML = '';
    
    // hide score board content until the firts game is played
    $('.end-game-score .this-game, .end-game-score .total-games ').hide();
    $('.score-holder').hide();

    // FUNCTION FOR ON-CLICK OF BAIT
    // if bait is clicked, increment score by 1
    $('body').on('click', '.not-clicked', function () {
        if (gameOn === true ){
            $(this).removeClass('not-clicked')
            $(this).addClass("clicked");    
            baitCount --;
        }

        // if this is last bait to click end game
        if (baitCount === 0) {
            gameWon = true;
            $('.game-area').append('<h2 class="end-message">You Win! Play again?</h2>');
            gameClock = 0;
            gameOn = false;
            $('.score-holder').hide();
            endGame();
        }

    });

    // FUNCTION FOR ON-CLICK OF BOOT
    // if non-bait is clicked, paused ability to click
    $('body').on('click', '.boot', function () {
        if (gameOn === false) {
            // game is not currently being played, do nothing

        } else {
            // turn off game, add 'paused class to remove cursor
            gameOn = false;
            $('.game-area').addClass("paused"); 

            // wait 2 seconds then restart game and add back cursor
            setTimeout( function(){ 
                gameOn = true;
                $('.game-area').removeClass("paused");
            }  , 2000 );    
        }
    });

    // FUNCTION TO CREATE GAME BOARD
    // takes count variable based on game difficulty 
    // & randomly creates cards based on type and icon
    function createGameBoard(count) {
        for (let i=0; i<count; i++){
            let randoNum = Math.floor(Math.random() * 100);
            if (randoNum < 20) {
                baitCount ++ ;
                gameBoardHTML += `<div class="card bait jello not-clicked"><img src="assets/${bait1}" alt="${alt1}"></div>`;
            } else if (randoNum < 40) {
                baitCount ++ ;
                gameBoardHTML += `<div class="card bait jello not-clicked"><img src="assets/${bait2}" alt="${alt2}"></div>`;
            } else if (randoNum < 70) {
                gameBoardHTML += `<div class="card boot"><img src="assets/${boot1}" alt="${alt3}"></div>`;
            } else {
                gameBoardHTML += `<div class="card boot"><img src="assets/${boot2}" alt="${alt4}"></div>`;
            }
        }
        initialBait = baitCount;
    }

    // FUNCTION TO CHANGE GAME DIFFICULTY SETTING
    // when button is clicked change difficulty level
    $('.level').on('click', function(){
        
        // remove selected class form all .level elements
        $('.level').removeClass("selected");

        // add selected class to selected element
        $(this).addClass("selected");

        // set level
        level = $(this).html().toLowerCase();
    });


    // FUNCTION TO HIDE END GAME MESSAGE
    $('body').on('click', '.end-message', function(){
        // add selected class to selected element
        $(this).hide();
    });

    // END GAME FUN
    function endGame() {
        // populate scores
        $('.this-game .score').html((initialBait - baitCount) + "/" + initialBait);
        $('.this-game .percent').html((((initialBait - baitCount)/initialBait)*100).toFixed(0) + " %");
        $('.this-game .note').html("Game OVER");
        gamesPlayed ++;

        // hide holder text & timer clock
        $('.end-game-score > h2').hide();
        $('.score-holder').hide();

        // populate scores
        $('.end-game-score .this-game, .end-game-score .total-games ').show();
        $('.total-games .played').html(gamesPlayed);

        // update start button
        $('.start').html("Play again?");

        $('.card').removeClass('not-clicked');

    } // endGame() function

    // MAIN FUNCTION TO CONTROL GAME LENGTH AND LOGIC
    function playGame() {

        // create game board based on level of difficulty
        if (level === 'easy'){
            // if easy, ceate board with 24 elements
            createGameBoard(24);
        } else if (level === 'medium') {
            // if medium, ceate board with 36 elements
            createGameBoard(36);
        } else {
            // if difficult, ceate board with 48 elements
            createGameBoard(48);
        }

        // set gameLength and gameClock
        let gameLength = 10;
        // game clock inclue count down
        let gameClock = gameLength + 4;

        $('.game-area .holder h2').html("READY?");  

        let countInterval = setInterval(timer, 1000);
        function timer(){
            if (gameClock > (gameLength + 1)) {
                // continue countdown to game
                $('.game-area .holder h2').html(gameClock-(gameLength + 1));
                gameClock = gameClock -1;

            } else if (gameClock === (gameLength + 1)){
                // game will start in 1 second
                // tell player the mission is starting & how many bugs they have to get
                $('.game-area .holder h2').html("START!");

                // add timer elemet to page and set initial content as "-"
                $('.score-holder .timer').html("-");
                $('.score-holder').show();

                gameClock = gameClock -1;

            } else if (gameClock === gameLength) {
                // mission starts
                // populate game-area board with cards & set gam timer
                $('.game-area').html(gameBoardHTML);
                $('.timer').html(gameClock);

                gameClock = gameClock -1;

            } else if (gameClock > 0) {
                // game continues
                // count down game timer
                $('.timer').html(gameClock);
                gameClock = gameClock -1;

            } else {
                // time is up, run endGame() function
                endGame();

                // remove animation from non-clicked cards
                $('.card').removeClass('not-clicked');

                // turn game off, clear interval & set 'start' to 'play again?'
                gameOn = false;
                clearInterval(countInterval);

                if (gameWon === false) {
                    // time over, send 'you lose message'
                    $('.game-area').append('<h2 class="end-message">You lose! Play again?</h2>');
                }
            }

        } // timer() function

    } // playGame() function

    // function to start/restart game on click of start/restart button
    $('.start').on('click', function(gamesPlayed){
        if (gamesPlayed = 0 ){
            playGame();
        } else {
            // this is not 1st game 
            // reset gameBoardHHTML & baitCount
            gameBoardHTML = '';
            baitCount = 0;

            // set gameOn to be true and game Wone to be false
            gameWon = false;
            gameOn = true;

            // rest set game-are html with holder content
            $('.game-area').html('<div class="holder"><h2></h2></div>');
            
            playGame();
        }
    });

}); // end of document ready function


