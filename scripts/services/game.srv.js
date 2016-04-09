(function(){
    'use strict'
    /**
     * Created by EtaySchur on 08/04/2016.
     */


    angular
        .module('crossriderDemoApp')
        .service('GameService', GameService);

    function GameService(appConstants , $cookies) {

        var gameData = {
            moves : 0,
            numOfGames : 0,
            initPlayerTurn : false,
            board : [],
            users : {}
        };


        var wins = [7, 56, 448, 73, 146, 292, 273, 84],
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
            gameData.board = [];
            var indicator = 1;
            for (var i = 0; i < appConstants.BOARD_SIZE; i++) {
                var boardCell = {
                    value: null,
                    indicator: indicator
                };
                indicator += indicator;
                gameData.board.push(boardCell);
            }
            //setCookiesData('board' , board);
            return gameData.board;
        }


        function isCellEmpty( cell ){
            return cell.value === null ? true : false;
        }


        function setCell(cell , currentPlayer) {
            gameData.users[currentPlayer].score += cell.indicator;
            cell.value = currentPlayer;
            gameData.moves++;
            //setCookiesData('board' , board);
            return true;
        }

        function getCurrentPlayer() {
            return currentPlayerTurn;
        }

        function getNumberOfMoves() {
            return gameData.moves;
        }

        function checkForWin(currentPlayer) {
            if ( gameData.moves <= 4) {
                return false;
            }
            for (var i = 0; i < wins.length; i++) {
                if ((wins[i] & gameData.users[currentPlayer].score) === wins[i]) {
                    this.setWinner(currentPlayer);
                    return true;
                }
            }
            return false;
        }

        function setWinner(currentPlayer) {
            gameData.users[currentPlayer].wins++;
        }


        function getNumberOfGames(){
            return gameData.numOfGames;
        }

        function incNumberOfGames(){
            gameData.numOfGames++;
            return gameData.numOfGames;
        }

        function initNewMatch(){
            gameData.board = initBoard();
            gameData.moves = 0;
            gameData.users[true].score = 0;
            gameData.users[false].score = 0;
            gameData.numOfGames++;
            return {
                board : gameData.board ,
                currentPlayer : gameData.initPlayerTurn ,
                users : gameData.users
            };
        }

        function initNewTournament( usersInfo ){
            gameData.numOfGames = 0;
            gameData.users = usersInfo;
        }

        function setBoardCookiesData ( key , value ){
            $cookieStore.put(key, []);
            var array = $cookieStore.get('key');
            array.push(value);
            $cookies.put( key ,value );
        }
    }

})();