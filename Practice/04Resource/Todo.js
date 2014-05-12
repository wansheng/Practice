var ngTodo = angular.module("ngTodo", ['ngResource']);

ngTodo.factory("TodoOperator", function ($resource,$http) {
    return {
        'Todos': $resource('https://sweltering-fire-4693.firebaseio.com/test/todos/.json')
        ,
        'Todo': $resource('https://sweltering-fire-4693.firebaseio.com/test/todos/:ID/.json', null, { 'update': { method: 'PUT' } })
    }
});

ngTodo.controller("todoController", function ($scope, TodoOperator) {

    $scope.Todos = [];
    $scope.TodoDueDate = now();
    $scope.DebugResponse = '';
    initial();

    $scope.AddToDo = function () {
        var id = getGuid();
        var newTodo = { Desc: $scope.TodoText, Done: false, DueDate: $scope.TodoDueDate, ID: id };
        TodoOperator.Todo.update({ ID: id }, newTodo);
        $scope.Todos.push(newTodo);
        $scope.TodoText = "";
    };
    $scope.RemoveCompleted = function () {
        for (var i = 0; i < $scope.Todos.length ; i++) {
            if ($scope.Todos[i].Done) {
                TodoOperator.Todo.remove($scope.Todos[i]);
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
        var todos = TodoOperator.Todo.get();
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