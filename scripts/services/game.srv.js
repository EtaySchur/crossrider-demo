/**
 * Created by EtaySchur on 08/04/2016.
 */


angular.module('crossriderDemoApp')
    .service('GameService', function (appConstants) {
        var gameService,
            moves = 0,
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
                initBoard: function () {
                    board = [];
                    var indicator = 1;
                    for (var i = 0; i < appConstants.BOARD_SIZE; i++) {
                        var boardCell = {
                            value: null,
                            indicator: indicator

                        }
                        indicator += indicator;
                        board.push(boardCell);
                    }

                    return board;
                },
                pendingTurn: function () {
                    currentPlayerTurn = !currentPlayerTurn;
                    return currentPlayerTurn;
                },
                setCell: function (cell , currentPlayer) {
                    users[currentPlayer].score += cell.indicator;
                    cell.value = currentPlayer;
                    moves++;

                    if (this.checkForWin(currentPlayer)) {
                        this.setWinner(currentPlayer);
                        return false;
                    }
                    return true;
                },
                getCurrentPlayer: function () {
                    return currentPlayerTurn;
                },
                getNumberOfMoves: function () {
                    return moves;
                },
                checkForWin: function (currentPlayer) {
                    if ( moves <= 4) {
                        return false;
                    }
                    for (var i = 0; i < wins.length; i++) {
                        if ((wins[i] & users[currentPlayer].score) === wins[i]) {
                            return true;
                        }
                    }
                    return false;
                },
                setWinner: function (currentPlayer) {
                    users[currentPlayer].wins++;
                },
                setUsersInfo: function (usersInfo) {
                    users = usersInfo;
                },
                getUsersInfo : function(){
                    return users;
                },
                incTurnsCount : function(){
                    turnsCounter++;
                    return turnsCounter;
                },
                getNumberOfGames : function(){
                    return numOfGames;
                },
                incNumberOfGames : function(){
                    numOfGames++;
                    return numOfGames;
                },
                initNewMatch : function(){
                    board = this.initBoard();

                    moves = 0;
                    users[true].score = 0;
                    users[false].score = 0;
                    numOfGames++;
                    return {
                        board : board ,
                        currentPlayer : initPlayerTurn ,
                        users : users
                    }
                }
            };
        return gameService;
    });