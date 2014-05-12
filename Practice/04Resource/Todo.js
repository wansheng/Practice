var ngTodo = angular.module("ngTodo", ['ngResource']);

ngTodo.factory("TodoOperator", function ($resource,$http) {
    return {
        'Todos': $resource('https://sweltering-fire-4693.firebaseio.com/test/todos/.json')
        ,
        'Todo': $resource('https://sweltering-fire-4693.firebaseio.com/test/todos/:ID/.json', null, { 'update': { method: 'PUT' } })
        ,
        'GetTodo': function ($scope) {
            $http({ method: 'GET', url: 'https://sweltering-fire-4693.firebaseio.com/todos/.json' })
            .success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                todos = [];
                if (data != "null")
                for (var i in data) {
                    todos.push(data[i]);
                }
                $scope.Todos = todos;
            }).error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert(data);
            })
        },
        'AddTodo': function ($scope, newTodo) {

            $http({ method: 'PUT', url: 'https://sweltering-fire-4693.firebaseio.com/todos/' + newTodo.ID + '/.json', data: newTodo })
            .success(function (data, status, headers, config) {
                $scope.Todos.push(newTodo);
                $scope.TodoText = '';
            })
            .error(function (data, status, headers, config) {
                alert('error');
            })
        },
        'RemoveTodo': function ($scope, deleteTodo) {
            $http({ method: 'DELETE', url: 'https://sweltering-fire-4693.firebaseio.com/todos/' + deleteTodo.ID + '.json', data: deleteTodo })
     .success(function (data, status, headers, config) {
         for (var i = 0; i < $scope.Todos.length ; i++) {
             if ($scope.Todos[i].Done && $scope.Todos[i].Desc == deleteTodo.Desc && $scope.Todos[i].DueDate == deleteTodo.DueDate) {
                 $scope.Todos.splice(i, 1);
                 return;
             }
         }
     })
     .error(function (data, status, headers, config) {
         alert('error');
     })
        }
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
        //TodoOperator.GetTodo($scope);
        //TEST = TodoOperator.Todo;
        var todos = TodoOperator.Todo.get();
        todos.$promise.then(function (todo) {
            $scope.Todos = [];
            for (var i in todos) {
                if (i == todos[i]["ID"])
                {
                    $scope.Todos.push(todos[i]);
                }
            }

        });
    }
});