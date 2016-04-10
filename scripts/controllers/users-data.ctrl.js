/**
 * Created by EtaySchur on 08/04/2016.
 */


angular.module('crossriderDemoApp')
    .controller('UsersDataModalCtrl', UsersDataModalCtrl);

function UsersDataModalCtrl($uibModalInstance ) {
    'use strict';

    var vm = this;
    vm.users = {
        'X' : {} ,
        'O' : {}
    };

    vm.ok = function () {
        $uibModalInstance.close(vm.users);
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
