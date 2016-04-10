
/**
 * Created by EtaySchur on 08/04/2016.
 */


angular.module('crossriderDemoApp')
    .controller('EndTournamentModalCtrl', EndTournamentModalCtrl);

function EndTournamentModalCtrl( $uibModalInstance , gameSetting ) {
    'use strict';

    var vm = this;
    vm.gameSetting = gameSetting;
    vm.winner =  vm.gameSetting.users['X'].wins > vm.gameSetting.users['O'].wins ? vm.gameSetting.users['X'] : vm.gameSetting.users['O'];
    vm.ok = function () {
        $uibModalInstance.close();
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
