(function(){
    'use strict'
    /**
     * Created by EtaySchur on 08/04/2016.
     */


    angular
        .module('crossriderDemoApp')
        .service('GameService', GameService);

    function GameService(appConstants) {
        console.log(appConstants);
        var moves = 0,
            numOfGames = 0,
            initPlayerTurn = false,
            board = [],
            users = {
                true: {
                    score: 0,
                    name: "Avi",
                    wins: 0

                },
                false: {
                    score: 0,
                    name: "shlomi",
                    wins: 0
                }
            },
            wins = [7, 56, 448, 73, 146, 292, 273, 84],
            gameService = {
                initBoard           :   initBoard,
                setCell             :   setCell,
                getCurrentPlayer    :   getCurrentPlayer,
                getNumberOfMoves    :   getNumberOfMoves,
                checkForWin         :   checkForWin,
                setWinner           :   setWinner,
                setUsersInfo        :   setUsersInfo,
                getUsersInfo        :   getUsersInfo,
                incTurnsCount       :   incTurnsCount,
                getNumberOfGames    :   getNumberOfGames,
                incNumberOfGames    :   incNumberOfGames,
                initNewMatch        :   initNewMatch,
                initNewTournament   :   initNewTournament
            };
        ////////////////////////////////////////////////////////////////////////////////////////////////
        return gameService;

        function initBoard(){
            board = [];
            var indicator = 1;
            for (var i = 0; i < appConstants.BOARD_SIZE; i++) {
                var boardCell = {
                    value: null,
                    indicator: indicator
                };
                indicator += indicator;
                board.push(boardCell);
            }

            return board;
        }



        function setCell(cell , currentPlayer) {
            users[currentPlayer].score += cell.indicator;
            cell.value = currentPlayer;
            moves++;

            if (this.checkForWin(currentPlayer)) {
                this.setWinner(currentPlayer);
                return false;
            }
            return true;
        }

        function getCurrentPlayer() {
            return currentPlayerTurn;
        }

        function getNumberOfMoves() {
            return moves;
        }

        function checkForWin(currentPlayer) {
            if ( moves <= 4) {
                return false;
            }
            for (var i = 0; i < wins.length; i++) {
                if ((wins[i] & users[currentPlayer].score) === wins[i]) {
                    return true;
                }
            }
            return false;
        }

        function setWinner(currentPlayer) {
            users[currentPlayer].wins++;
        }

        function setUsersInfo(usersInfo) {
            users = usersInfo;
        }

        function getUsersInfo(){
            return users;
        }

        function incTurnsCount(){
            turnsCounter++;
            return turnsCounter;
        }

        function getNumberOfGames(){
            return numOfGames;
        }

        function incNumberOfGames(){
            numOfGames++;
            return numOfGames;
        }

        function initNewMatch(){
            board = this.initBoard();
            moves = 0;
            users[true].score = 0;
            users[false].score = 0;
            numOfGames++;
            return {
                board : board ,
                currentPlayer : initPlayerTurn ,
                users : users
            };
        }

        function initNewTournament(){
            numOfGames = 0;
            users = [];
        }
    }

})();