/**
 * Created by EtaySchur on 08/04/2016.
 */




(function(){

    angular.module('crossriderDemoApp')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl(GameService , $uibModal , appConstants , $interval) {
        'use strict';
        var vm = this;
        vm.turnLengthInSeconds = appConstants.TURN_LENGTH;
        var timer;
        vm.cellClicked = cellClicked;

        function cellClicked( cell  ){
            if(cell.value !==  null){
                return;
            }
            //cell.value = GameService.getCurrentPlayer();
            if(GameService.setCell(cell ,  vm.gameSetting.currentPlayer)){
                if(GameService.getNumberOfMoves() === appConstants.BOARD_SIZE){
                    openEndGameModal(null);
                }else{
                    startNextTurn();
                }
            }else{
                openEndGameModal(vm.gameSetting.currentPlayer);
            }}

        ///////////////////Private///////////////////

        function _init(){
            var users = {
                    'X': {
                        score: 0,
                        name: "Avi",
                        wins: 0

                    },
                    'O': {
                        score: 0,
                        name: "shlomi",
                        wins: 0
                    }
                };
            GameService.initNewTournament(users);
            _playNewGame();
        }



        function _playNewGame(){
            vm.gameSetting = GameService.initNewMatch();
            console.log(vm.gameSetting);
            startNextTurn();
            vm.gameRunning = true;
        }


        vm.cellClicked = function ( cell  ){
            // Check if cell is empty
            if(!GameService.isCellEmpty(cell)){
                return;
            }

            // Setting cell value
            GameService.setCell(cell ,  vm.gameSetting.currentPlayer);

            // Check if we have a wiiner :)
            if(GameService.checkForWin(vm.gameSetting.currentPlayer)){
                openEndGameModal(vm.gameSetting.currentPlayer);
                return;
            };

            // Check if all moved were made and end game with draw
            if(GameService.getNumberOfMoves() === appConstants.BOARD_SIZE){
                openEndGameModal(null);
                return;
            }

            // Continue to next turn
            startNextTurn();
        }

        function startNextTurn (){
            $interval.cancel(timer);
            vm.gameSetting.currentPlayer = vm.gameSetting.currentPlayer === 'X' ? 'O' : 'X';
            vm.turnLengthInSeconds = appConstants.TURN_LENGTH;
            timer = $interval(function(){
                vm.turnLengthInSeconds--;
                if(vm.turnLengthInSeconds === 0){
                    var winner = vm.gameSetting.currentPlayer === 'X' ? 'O' : 'X'
                    GameService.setWinner(winner);
                    openEndGameModal(winner);

                }
            }, 1000);
        }

        function openEndTournamentModal(){
            vm.gameRunning = false;
            var modalInstance = $uibModal.open({
                animation: true ,
                backdrop : 'static'  ,
                templateUrl: 'partials/tournament-modal.html',
                controller: 'EndTournamentModalCtrl',
                resolve: {
                    gameSetting: function () {
                        return vm.gameSetting;
                    }
                }
            });


            modalInstance.result.then(function () {
                _init();
            }, function () {

            });
        }

        function openEndGameModal( winner ){
            vm.gameRunning = false;
            $interval.cancel(timer);

            var modalInstance = $uibModal.open({
                animation: true ,
                backdrop : 'static'  ,
                templateUrl: 'partials/modal.html',
                controller: 'ModalCtrl',
                resolve: {
                    gameSetting: function () {
                        return vm.gameSetting;
                    },
                    winner : function(){
                        return winner
                    }
                }
            });


            modalInstance.result.then(function () {
                console.log(GameService.getNumberOfGames());
                if(vm.gameSetting.users[vm.gameSetting.currentPlayer].wins === ((Math.ceil(appConstants.MAX_NUMBER_OF_GAMES / 2)))){
                    openEndTournamentModal();
                }else{
                    // Restart Match
                    _playNewGame();
                }
            }, function () {

            });
        }

        _init();

    };
})();


