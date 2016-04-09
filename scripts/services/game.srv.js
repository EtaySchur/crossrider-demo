(function(){
    'use strict'
    /**
     * Created by EtaySchur on 08/04/2016.
     */


    angular
        .module('crossriderDemoApp')
        .service('GameService', GameService);

    function GameService(appConstants , $cookies) {
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
            console.log('I have Cookie ? ' , $cookies.get('board'));
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
            setCookiesData('board' , board);
            return board;
        }


        function isCellEmpty( cell ){
            return cell.value === null ? true : false;
        }


        function setCell(cell , currentPlayer) {
            users[currentPlayer].score += cell.indicator;
            cell.value = currentPlayer;
            moves++;
            setCookiesData('board' , board);
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

        function setBoardCookiesData ( key , value ){
            $cookieStore.put(key, []);
            var array = $cookieStore.get('key');
            array.push(value);
            $cookies.put( key ,value );
        }
    }

})();