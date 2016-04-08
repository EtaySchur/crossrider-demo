/**
 * Created by EtaySchur on 08/04/2016.
 */


angular.module('crossriderDemoApp')
    .service('GameService', function (appConstants) {
        var gameService,
            turnsCounter = 0,
            currentPlayerTurn = true,
            board = [],
            score = {
                true : 0 ,
                false : 0
            },
            xPlayerArray = [],
            wins = [7, 56, 448, 73, 146, 292, 273, 84],

        gameService = {
            initBoard: function () {
                var indicator = 1;
                for (var i = 0; i < appConstants.BOARD_SIZE; i++) {
                    var boardCell = {
                        value: null ,
                        indicator : indicator

                    }
                    console.log(boardCell);
                    indicator  += indicator;
                    board.push(boardCell);
                }

                return board;
            },
            pendingTurn: function () {
                currentPlayerTurn = !currentPlayerTurn;
                turnsCounter++;
                return currentPlayerTurn;
            },
            setCell : function ( cell ){
                console.log("Setting Cell Indicator " , cell.indicator);
                console.log("Turn # ",turnsCounter);
                score[currentPlayerTurn] +=  cell.indicator;
                console.log(score);
                cell.value = currentPlayerTurn;
                if(this.checkForWin()){
                    return false;
                }
                currentPlayerTurn = !currentPlayerTurn;
                turnsCounter++;
                return true;
            },
            getCurrentPlayer: function () {
                return currentPlayerTurn;
            },
            getTurnsCounter: function () {
                return turnsCounter;
            },
            checkForWin : function(){
                if(turnsCounter <= 4){
                    return false;
                }
                console.log(score[currentPlayerTurn]);
                for (var i = 0; i < wins.length; i++) {
                    if ((wins[i] & score[currentPlayerTurn]) === wins[i]) {
                        return true;
                    }
                }
                return false;
            }
        };
        return gameService;
    });