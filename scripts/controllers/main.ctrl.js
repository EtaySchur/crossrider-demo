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
            if(GameService.setCell(cell ,  vm.gameSetting.currentPlayer)){
                if(GameService.getNumberOfMoves() === appConstants.BOARD_SIZE){
                    openEndMatchModal(null);
                }else{
                    startNextTurn();
                }
            }else{
                openEndMatchModal(vm.gameSetting.currentPlayer);
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
            _playNewMatch();
        }



        function _playNewMatch(){
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

            // Check if we have a winner :)
            if(GameService.checkForWin(vm.gameSetting.currentPlayer)){
                openEndMatchModal(vm.gameSetting.currentPlayer);
                return;
            };

            // Check if all moved were made and end game with draw
            if(GameService.getNumberOfMoves() === appConstants.BOARD_SIZE){
                openEndMatchModal(null);
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
                    openEndMatchModal(winner);

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
                controllerAs : 'endTournamentModalCtrl',
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

        function openEndMatchModal( winner ){
            vm.gameRunning = false;
            $interval.cancel(timer);

            var modalInstance = $uibModal.open({
                animation: true ,
                backdrop : 'static'  ,
                templateUrl: 'partials/modal.html',
                controller: 'EndMatchModalCtrl',
                controllerAs : 'endMatchCtrl',
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
                if(vm.gameSetting.users[vm.gameSetting.currentPlayer].wins === ((Math.ceil(appConstants.MAX_NUMBER_OF_GAMES / 2)))){
                    // Tournament End ...
                    openEndTournamentModal();
                }else{
                    // Still have games to play , play new match
                    _playNewMatch();
                }
            }, function () {

            });
        }

        // Init Game
        _init();

    };
})();


