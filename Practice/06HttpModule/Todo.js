var ngTodo = angular.module("ngTodo", []);

ngTodo.factory("TodoOperator", function ($http) {
    return {
        'getTodo': function ($scope) {
            $http({ method: 'GET', url: 'https://sweltering-fire-4693.firebaseio.com/todos/.json' })
            .success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                //var a = data;
                todos = [];
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
        'postTodo': function ($scope) {
            $http({ method: 'POST', url: 'https://sweltering-fire-4693.firebaseio.com/todos/.json', data: $scope.newTodo })
      .success(function (data, status, headers, config) {
          alert('success');
          $scope.Todos.push($scope.newTodo);
          $scope.todoText = '';
      })
      .error(function (data, status, headers, config) {
          alert('error');
      })
        }
    }
})

ngTodo.controller("todoController", function ($scope, TodoOperator) {

    $scope.Todos = [];
    $scope.Initialed = false;
    $scope.DebugResponse = '';
    initial();

    function initial() {
        TodoOperator.getTodo($scope);
    }
    $scope.addToDo = function () {
        $scope.newTodo = { desc: $scope.todoText, done: false, dueDate: $scope.todoDueDate };
        TodoOperator.postTodo($scope);
    };

    $scope.remaining = function () {
        var count = 0;
        angular.forEach($scope.Todos, function (todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };
    $scope.pluralizer = {
        0: "Finished all",
        1: "Only one left! GJ",
        other: "{} items remain in your todo list."
    }
});