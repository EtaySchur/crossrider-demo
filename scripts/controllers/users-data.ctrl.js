/**
 * Created by EtaySchur on 08/04/2016.
 */


angular.module('crossriderDemoApp')
    .controller('UsersDataModalCtrl', UsersDataModalCtrl);

function UsersDataModalCtrl($scope, $uibModalInstance ) {
    'use strict';

    var vm = $scope;
    vm.users = {

    };

    vm.ok = function () {
        $uibModalInstance.close();
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
