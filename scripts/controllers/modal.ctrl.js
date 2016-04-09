/**
 * Created by EtaySchur on 08/04/2016.
 */


angular.module('crossriderDemoApp')
    .controller('ModalCtrl', ModalCtrl);

function ModalCtrl($scope, $uibModalInstance , gameSetting , winner) {
    'use strict';

    var vm = $scope;
    vm.winner = winner;
    vm.modalTitle = winner !== null ? gameSetting.users[winner].name + ' won this game ! Congras ! ' : 'A drew ! Nice match ! ' ;
    vm.gameSetting = gameSetting;
    console.log("Game Settings ? ",gameSetting);

    vm.ok = function () {
        $uibModalInstance.close();
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};