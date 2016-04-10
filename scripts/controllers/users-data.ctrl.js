/**
 * Created by EtaySchur on 08/04/2016.
 */


angular.module('crossriderDemoApp')
    .controller('UsersDataModalCtrl', UsersDataModalCtrl);

function UsersDataModalCtrl($uibModalInstance ) {
    'use strict';

    var vm = this;
    vm.users = {
        'X' : {
            score : 0 ,
            wins : 0
        } ,
        'O' : {
            score : 0 ,
            wins : 0
        }
    };

    vm.ok = function () {
        $uibModalInstance.close(vm.users);
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
