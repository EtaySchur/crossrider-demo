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
            users = {},
            wins = [7, 56, 448, 73, 146, 292, 273, 84],


            gameService = {
                initBoard           :   initBoard,
                setCell             :   setCell,
                getCurrentPlayer    :   getCurrentPlayer,
                getNumberOfMoves    :   getNumberOfMoves,
                checkForWin         :   checkForWin,
                setWinner           :   setWinner,
                getNumberOfGames    :   getNumberOfGames,
                incNumberOfGames    :   incNumberOfGames,
                initNewMatch        :   initNewMatch,
                initNewTournament   :   initNewTournament,
                isCellEmpty         :   isCellEmpty
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


        function isCellEmpty( cell ){
            return cell.value === null ? true : false;
        }


        function setCell(cell , currentPlayer) {
            users[currentPlayer].score += cell.indicator;
            cell.value = currentPlayer;
            moves++;

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
                    this.setWinner(currentPlayer);
                    return true;
                }
            }
            return false;
        }

        function setWinner(currentPlayer) {

            users[currentPlayer].wins++;
        }


        function getNumberOfGames(){
            return numOfGames;
        }

        function incNumberOfGames(){
            numOfGames++;
            return numOfGames;
        }

        function initNewMatch(){
            console.log(users);
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

        function initNewTournament( usersInfo ){
            numOfGames = 0;
            users = usersInfo;
        }
    }

})();