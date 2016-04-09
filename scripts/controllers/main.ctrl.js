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
        vm.promise;
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

        ///////////////////Pivate///////////////////

        function _init(){
            vm.gameSetting = GameService.initNewMatch();
            console.log(vm.gameSetting);
            startNextTurn();
            vm.gameRunning = true;
        }

        //vm.init = function(){
        //    vm.gameSetting = GameService.initNewMatch();
        //    console.log(vm.gameSetting);
        //    startNextTurn();
        //    vm.gameRunning = true;
        //}
        //
        //vm.init();


        vm.cellClicked = function ( cell  ){
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
            }

        }

        function startNextTurn (){
            //vm.gameSetting.turnsCount = GameService.incTurnsCount();
            $interval.cancel(vm.promise);
            vm.gameSetting.currentPlayer = vm.gameSetting.currentPlayer === true ? false : true
            console.log("Current Player is not ",vm.gameSetting.currentPlayer);
            vm.turnLengthInSeconds = appConstants.TURN_LENGTH;
            vm.promise = $interval(function(){
                vm.turnLengthInSeconds--;
                if(vm.turnLengthInSeconds === 0){
                    // vm.gameSetting.currentPlayer =  GameService.pendingTurn();
                    $interval.cancel(vm.promise);
                    startNextTurn();

                }
            }, 1000);
        }

        function openEndTournamentModal(){
            vm.gameRunning = false;
            var modalInstance = $uibModal.open({
                animation: true ,
                templateUrl: 'partials/tournament-modal.html',
                controller: 'EndTournamentModalCtrl',
                resolve: {
                    gameSetting: function () {
                        return vm.gameSetting;
                    }
                }
            });


            modalInstance.result.then(function () {

            }, function () {

            });
        }

        function openEndGameModal( winner ){
            vm.gameRunning = false;
            $interval.cancel(vm.promise);

            var modalInstance = $uibModal.open({
                animation: true ,
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
                if(vm.gameSetting.users[vm.gameSetting.currentPlayer].wins === ((Math.ceil(appConstants.MAX_NUMBER_OF_GAMES / 2))) ||  GameService.getNumberOfGames() === appConstants.MAX_NUMBER_OF_GAMES){
                    openEndTournamentModal();
                }else{
                    // Restart Match
                    _init();
                }
            }, function () {

            });
        }

        _init();

    };
})();


