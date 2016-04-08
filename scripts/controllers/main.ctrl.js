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


function MainCtrl(GameService , $timeout , appConstants , $interval) {
    'use strict';
    var vm = this;
    vm.promise;
    vm.turnLengthInSeconds = appConstants.TURN_LENGTH;
    vm.gameSetting = {
        board : GameService.initBoard(),
        currentPlayer : GameService.getCurrentPlayer(),
        turnsCount : GameService.getTurnsCounter()
    }


    startNextTurn();
    //vm.board = GameService.initBoard();
    //vm.turnsCount = GameService.getTurnsCounter();



    vm.cellClicked = function ( cell  ){
        if(cell.value !==  null){
            return;
        }

        cell.value = GameService.getCurrentPlayer();
            if(GameService.setCell(cell)){
                vm.gameSetting.turnsCount++;
                $interval.cancel(vm.promise);
                startNextTurn();
            }else{
                alert('We have a winner !');
            }

    }

    function startNextTurn (){
        vm.turnLengthInSeconds = appConstants.TURN_LENGTH;
        vm.gameSetting.turnsCount++;
        vm.promise = $interval(function(){
            vm.turnLengthInSeconds--;
            if(vm.turnLengthInSeconds === 0){
                vm.gameSetting.currentPlayer =  GameService.pendingTurn();
                $interval.cancel(vm.promise);
                startNextTurn();
            }
        }, 1000);
        //$interval( function(){
        //    vm.turnLengthInSeconds--;
        //    if(vm.turnLengthInSeconds === 0){
        //        vm.gameSetting.currentPlayer =  GameService.pendingTurn();
        //        vm.gameSetting.turnsCount++;
        //        vm.turnLengthInSeconds = appConstants.TURN_LENGTH
        //    }
        //}, 1000);
    }



};

