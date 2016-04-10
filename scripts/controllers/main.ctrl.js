/**
 * Created by EtaySchur on 08/04/2016.
 */




(function(){
    angular.module('crossriderDemoApp')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl(GameService , $uibModal , appConstants , $interval , $cookies) {
        'use strict';
        var vm = this;
        var timer;
        vm.turnLengthInSeconds = appConstants.TURN_LENGTH;
        vm.cellClicked = cellClicked;

        function cellClicked( cell  ){
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

            // Toggle user & continue to next turn
            vm.gameSetting.currentPlayer = GameService.togglePlayer(vm.gameSetting.currentPlayer);
            startTimer();
        }

        ///////////////////Private///////////////////

        function _init(){
            if($cookies.getObject('gameData')){
                // Getting Data From Cookie
                vm.gameSetting = $cookies.getObject('gameData');
                // Setting GameService Data
                GameService.setGameData(vm.gameSetting);

               // Check if last game state was in winning modal , if true , reload the winning modal
               if(GameService.checkForWin(vm.gameSetting.currentPlayer)){
                   openEndMatchModal(vm.gameSetting.currentPlayer);
               }else{
                   startTimer();
               }
            }else{
                openUsersModal();
                //var users = {
                //    'X': {
                //        score: 0,
                //        name: "Avi",
                //        wins: 0
                //
                //    },
                //    'O': {
                //        score: 0,
                //        name: "shlomi",
                //        wins: 0
                //    }
                //};
                //GameService.initNewTournament(users);
                //vm.gameSetting = GameService.initNewMatch();
            }
            //_play();


        }

        function startTimer(){
            vm.gameRunning = true;
            $interval.cancel(timer);
            //vm.gameSetting.currentPlayer = GameService.togglePlayer(vm.gameSetting.currentPlayer);
            // vm.gameSetting.currentPlayer = vm.gameSetting.currentPlayer === 'X' ? 'O' : 'X';
            console.log("This is my current play ",vm.gameSetting.currentPlayer);
            vm.turnLengthInSeconds = appConstants.TURN_LENGTH;
            timer = $interval(function(){
                vm.turnLengthInSeconds--;
                if(vm.turnLengthInSeconds === 0){
                    var winner = vm.gameSetting.currentPlayer === 'X' ? 'O' : 'X';
                    GameService.setWinner(winner);
                    openEndMatchModal(winner);

                }
            }, 1000);
        }



        function openUsersModal(){
            var modalInstance = $uibModal.open({
                animation: true ,
                backdrop : 'static'  ,
                templateUrl: 'partials/users-data-modal.html',
                controller: 'UsersDataModalCtrl',
                controllerAs : 'usersDataModalCtrl'

            });


            modalInstance.result.then(function (users) {
                GameService.initNewTournament(users);
                vm.gameSetting = GameService.initNewMatch();
            }, function () {

            });
        }

        function openEndTournamentModal(){
            GameService.endTournament();
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
                    vm.gameSetting = GameService.initNewMatch();

                    startTimer();
                }
            }, function () {

            });
        }

        // Init Game
        _init();

    };
})();


