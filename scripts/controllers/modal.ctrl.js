/**
 * Created by EtaySchur on 08/04/2016.
 */


angular.module('crossriderDemoApp')
    .controller('EndMatchModalCtrl', EndMatchModalCtrl);

function EndMatchModalCtrl( $uibModalInstance , gameSetting , winner) {
    'use strict';

    var vm = this;
    vm.winner = winner;
    vm.modalTitle = winner !== null ? gameSetting.users[winner].name + ' won this game ! Congras ! ' : 'A drew ! Nice match ! ' ;
    vm.gameSetting = gameSetting;

    vm.ok = function () {
        $uibModalInstance.close();
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
