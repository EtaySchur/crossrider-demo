/**
 * Created by EtaySchur on 08/04/2016.
 */

///* @ngInject */
//module.exports = function MainCtrl( ) {
//    'use strict';
//    // Controller Params
//    var vm = this;
//
//};


angular.module('crossriderDemoApp')
    .controller('MainCtrl', MainCtrl);


function MainCtrl(GameService , $uibModal , appConstants , $interval) {
    'use strict';
    var vm = this;
    vm.turnLengthInSeconds = appConstants.TURN_LENGTH;
    vm.promise;

    vm.init = function(){
        vm.gameSetting = GameService.initNewMatch();
        console.log(vm.gameSetting);
        startNextTurn();
        vm.gameRunning = true;
    }

    vm.init();


    vm.cellClicked = function ( cell  ){
        if(cell.value !==  null){
            return;
        }

        cell.value = GameService.getCurrentPlayer();

            if(GameService.setCell(cell)){
                if(GameService.getNumberOfMoves() === appConstants.BOARD_SIZE){
                    GameService.incNumberOfGames();
                    openEndGameModal(null);
                }else{
                    startNextTurn();
                }
            }else{
                //GameService.incNumberOfGames();
                openEndGameModal(GameService.getCurrentPlayer());
            }

    }

    function startNextTurn (){
        //vm.gameSetting.turnsCount = GameService.incTurnsCount();
        $interval.cancel(vm.promise);
        vm.turnLengthInSeconds = appConstants.TURN_LENGTH;
        vm.promise = $interval(function(){
            vm.turnLengthInSeconds--;
            if(vm.turnLengthInSeconds === 0){
                vm.gameSetting.currentPlayer =  GameService.pendingTurn();
                $interval.cancel(vm.promise);
                startNextTurn();

            }
        }, 1000);
    }

    function openEndGameModal( winner ){
        $interval.cancel(vm.promise);
        vm.gameRunning = false;
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
                // Restart Match
                vm.init();
        }, function () {

        });
    }



};

