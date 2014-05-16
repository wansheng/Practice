var ngTodo = angular.module("ngTodo", ['ngResource']);

ngTodo.factory("TodoOperator", function ($resource) {
    return {
        'Helper': $resource('https://sweltering-fire-4693.firebaseio.com/todos/:ID/.json', null, { 'insert': { method: 'PUT' } })
    }
});
ngTodo.directive("deleteButton", function () {
    return {
        restrict: "E",
        transclude: true,
        replace:true,
        template: '<button type="button" ng-click="DeleteTodo(todo)" ng-transclude>Delete</button>'
    };
});
ngTodo.controller("todoController", function ($scope, TodoOperator) {

    $scope.Todos = [];
    $scope.NewTodo = { Done: false, DueDate: now() };
    $scope.DebugResponse = '';
    initial();

    $scope.AddToDo = function () {
        var id = getGuid();
        $scope.NewTodo.ID = id;
        
        var newTodo = $.extend(true, {}, $scope.NewTodo);
        TodoOperator.Helper.insert({ ID: id }, newTodo);
        $scope.Todos.push(newTodo);
        $scope.NewTodo.Desc = "";
        $scope.NewTodo.ID = "";
    };
    $scope.DeleteTodo = function (todo) {
        if (confirm('Are you sure?')) {
            TodoOperator.Helper.remove(todo);
            var i = $scope.Todos.indexOf(todo);
            $scope.Todos.splice(i, 1);
        }
    };
    
    $scope.RemoveCompleted = function () {
        for (var i = 0; i < $scope.Todos.length ; i++) {
            if ($scope.Todos[i].Done) {
                TodoOperator.Helper.remove($scope.Todos[i]);
                $scope.Todos.splice(i, 1);
                i--
            }
        }
    };
    $scope.Remaining = function () {
        var count = 0;
        angular.forEach($scope.Todos, function (todo) {
            count += todo.Done ? 0 : 1;
        });
        return count;
    };
    $scope.Pluralizer = {
        0: "Finished all",
        1: "Only one left! GJ",
        other: "{} items remain in your todo list."
    }


    function initial() {
        var todos = TodoOperator.Helper.get();
        todos.$promise.then(function (todo) {
            $scope.Todos = [];
            for (var i in todos) {
                if (i == todos[i]["ID"]) {
                    $scope.Todos.push(todos[i]);
                }
            }

        });
    }
});