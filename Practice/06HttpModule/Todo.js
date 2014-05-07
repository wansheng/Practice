var ngTodo = angular.module("ngTodo", []);

ngTodo.factory("TodoFactory", function ($http) {
    return {
        'getTodo': function ($scope) {
            $http({ method: 'GET', url: 'https://sweltering-fire-4693.firebaseio.com/todos/.json' })
            .success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                var a = data;
                todos = [];
                for (var i in a) {
                    todos.push(a[i]);
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

ngTodo.controller("todoController", function ($scope, TodoFactory) {

    $scope.Todos = [];
    $scope.Initialed = false;
    $scope.DebugResponse = '';
    initial();

    function initial() {
        TodoFactory.getTodo($scope);
    }
    $scope.addToDo = function () {
        $scope.newTodo = { desc: $scope.todoText, done: false, dueDate: $scope.todoDueDate };
        TodoFactory.postTodo($scope);
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