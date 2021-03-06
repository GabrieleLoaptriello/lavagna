(function () {
    'use strict';

    angular
        .module('lavagna.components')
        .component('lvgDialogNewColumn', {
            templateUrl: 'app/components/dialog/new-column/dialog-new-column.html',
            bindings: {
                boardName: '<',
                columnsDefinition: '<'
            },
            controller: ['$mdDialog', 'Board', 'Notification', DialogNewColumnController]
        });

    function DialogNewColumnController($mdDialog, Board, Notification) {
        var ctrl = this;

        ctrl.cancel = cancel;
        ctrl.createColumn = createColumn;

        ctrl.processing = false;

        function cancel() {
            $mdDialog.hide();
        }

        function createColumn(columnToCreate) {
            ctrl.processing = true;
            Board.createColumn(ctrl.boardName, columnToCreate).then(function () {
                ctrl.processing = false;
                columnToCreate.name = null;
                columnToCreate.definition = null;
                $mdDialog.hide();
            }).catch(function () {
                ctrl.processing = false;
                Notification.addAutoAckNotification('error', { key: 'notification.board.create-column.error'}, false);
            });
        }
    }
}());
