/**
 * Created by EtaySchur on 08/04/2016.
 */


angular.module('crossriderDemoApp')
    .service('GameService', function (appConstants) {
        var gameService,
            turnsCounter = 0,
            currentPlayerTurn = true,
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
                    var indicator = 1;
                    for (var i = 0; i < appConstants.BOARD_SIZE; i++) {
                        var boardCell = {
                            value: null,
                            indicator: indicator

                        }
                        console.log(boardCell);
                        indicator += indicator;
                        board.push(boardCell);
                    }

                    return board;
                },
                pendingTurn: function () {
                    currentPlayerTurn = !currentPlayerTurn;
                    return currentPlayerTurn;
                },
                setCell: function (cell) {
                    console.log("Setting Cell Indicator ", cell.indicator);
                    console.log("Turn # ", turnsCounter);
                    console.log(users);
                    users[currentPlayerTurn].score += cell.indicator;
                    cell.value = currentPlayerTurn;
                    if (this.checkForWin()) {
                        this.setWinner();
                        return false;
                    }
                    currentPlayerTurn = !currentPlayerTurn;
                    return true;
                },
                getCurrentPlayer: function () {
                    return currentPlayerTurn;
                },
                getTurnsCounter: function () {
                    return turnsCounter;
                },
                checkForWin: function () {
                    if (turnsCounter <= 4) {
                        return false;
                    }
                    for (var i = 0; i < wins.length; i++) {
                        if ((wins[i] & users[currentPlayerTurn].score) === wins[i]) {
                            return true;
                        }
                    }
                    return false;
                },
                setWinner: function () {
                    users[currentPlayerTurn].wins++;
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
                }
            };
        return gameService;
    });