(function () {
    var $startBtn = $('.choosePlayerBtn'),
        $playBoardBtn = $('.playBoardBtn'),
        $homeScreen = $('#homeScreen'),
        gameCombination =
            [
             ['', '', ''],
             ['', '', ''],
             ['', '', '']
            ],
        playerLetter,
        movesCounter = 0;

    var theGame = {
        init: function () {
            this.startTheGame();
        },
        startTheGame: function () {
            $startBtn.click(function () {
                //Switch to the play screen
                $homeScreen.removeClass('active');
                $('#playBoardWindow').addClass('active');

                //Determine what player starts the game
                playerLetter = $(this).attr('id');
                theGame.makeMove();
            })
        },
        makeMove: function () {
            $playBoardBtn.click(function (e) {
                e.preventDefault();
                var $eventTarget = $(e.target);

                // Mark the btn with the letter of the player
                $eventTarget.addClass(playerLetter);

                //Get the number of the button that has been pressed
                // Update the score board
                var btnId = theGame.determineBtnId($eventTarget.attr('id'));
                theGame.updateGameCombination(playerLetter, btnId);

                //Pass the move to another player
                playerLetter == 'x' ? playerLetter = 'o' : playerLetter = 'x';

                movesCounter++;

                if (movesCounter > 4) {
                    var winnerName = theGame.checkForWinner(gameCombination);
                    setTimeout(function () {
                        if (winnerName === 'x') {
                            theGame.showTheWinner('X won');
                        } else if (winnerName === 'o') {
                            theGame.showTheWinner('O won');
                        } else if (movesCounter === 9) {
                            theGame.showTheWinner('Draw');
                        }
                    }, 300)

                }
            });
        },
        determineBtnId: function (btnId) {
            //Return the number of the btn that has been pressed
            var result = 0;
            switch (btnId) {
                case 'one':
                    result = 1;
                    break;
                case 'two':
                    result = 2;
                    break;
                case 'three':
                    result = 3;
                    break;
                case 'four':
                    result = 4;
                    break;
                case 'five':
                    result = 5;
                    break;
                case 'six':
                    result = 6;
                    break;
                case 'seven':
                    result = 7;
                    break;
                case 'eight':
                    result = 8;
                    break;
                case 'nine':
                    result = 9;
                    break;
                default:
                    result;
            }
            return result;
        },
        updateGameCombination: function (playerLetter, btnId) {
            var rowNumber;
            var cellNumber;

            //Determine the row and cell number and push values to corresponded places in the array
            if (btnId < 4) {
                rowNumber = 0;
                cellNumber = btnId - 1;
            } else if (btnId < 7) {
                rowNumber = 1;
                cellNumber = btnId - 4;
            } else {
                rowNumber = 2;
                cellNumber = btnId - 7;
            }

            gameCombination[rowNumber][cellNumber] = playerLetter;
        },
        checkForWinner: function (gameCombination) {
            var winnerName = 'none';
            var colValuesArray = [[],[],[]];
            var crossValuesArray = [[],[]];

            for (var i = 0, l = gameCombination.length; i < l; i++) {
                //Check if there are three same values in a row
                if ( !!gameCombination[i].reduce( function(a, b){ return (a === b) ? a : NaN; }) ) {
                    winnerName = gameCombination[i][0];
                    return winnerName;
                }

                //Create an array with cross board values
                if (i === 0) {
                    crossValuesArray[0].push(gameCombination[i][0]);
                    crossValuesArray[1].push(gameCombination[i][2]);
                } else if (i === 1) {
                    crossValuesArray[0].push(gameCombination[i][1]);
                    crossValuesArray[1].push(gameCombination[i][1]);
                } else {
                    crossValuesArray[1].push(gameCombination[i][0]);
                    crossValuesArray[0].push(gameCombination[i][2]);
                }

                //Create an array with column values
                for (var j = 0; j < 3; j++) {
                    colValuesArray[j].push(gameCombination[i][j]);
                }
            }

            var colCheck = theGame.checkTempArrayValues(colValuesArray);
            //Check what combination come first - col or cross
            colCheck === '' ? winnerName = theGame.checkTempArrayValues(crossValuesArray) : winnerName = colCheck;

            return winnerName;
        },
        checkTempArrayValues: function (array) {
            var winnerName = '';
            for (var i = 0, l = array.length; i < l; i++) {
                if ( !!array[i].reduce( function(a, b){ return (a === b) ? a : NaN; }) ) {
                    winnerName = array[i][0];
                }
            }
            return winnerName;
        },
        showTheWinner: function (winnerName) {
            alert(winnerName);
            window.location.reload(true);
        }
    };

    theGame.init();
})();