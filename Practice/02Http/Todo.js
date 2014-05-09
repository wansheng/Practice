function todoController ($scope, $http) {
    
    $scope.Todos = [];
    $scope.TodoDueDate = now();
    $scope.debugResponse = '';
    initial();

    function initial() {
        $http({ method: 'GET', url: 'https://sweltering-fire-4693.firebaseio.com/todos/.json' })
            .success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available

                $scope.Todos = [];
                if (data != "null")
                {
                    for (var i in data) {
                        $scope.Todos.push(data[i]);
                    }
                }
            }).error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert(data);
            });
    };
    $scope.addToDo = function () {
        var id = getGuid();
        var newTodo = { Desc: $scope.TodoText, Done: false, DueDate: $scope.TodoDueDate, ID: id };
        $http({ method: 'PUT', url: 'https://sweltering-fire-4693.firebaseio.com/todos/'+id+'/.json', data: newTodo })
        .success(function(data,status,headers,config){
            $scope.Todos.push(newTodo);
            $scope.TodoText = '';
            })
        .error(function (data, status, headers, config) {
            alert('error');
        })
    };
    $scope.Remaining = function () {
        var count = 0;
        angular.forEach($scope.Todos, function (todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };
    $scope.RemoveCompleted = function () {
        for (var i = 0; i < $scope.Todos.length ; i++) {
            if ($scope.Todos[i].Done) {
                RemoveServerTodo($scope.Todos[i]);
            }
        }
    };
    function RemoveServerTodo(deleteTodo) {
        $http({ method: 'DELETE', url: 'https://sweltering-fire-4693.firebaseio.com/todos/'+deleteTodo.ID+'.json', data: deleteTodo })
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
    };
    $scope.Pluralizer = {
        0: "Finished all",
        1: "Only one left! GJ",
        other: "{} items remain in your todo list."
    };
    function now() {
        var d = new Date();
        return d.getFullYear() + '-' + format2Digits(d.getMonth() + 1) + '-' + format2Digits(d.getDate());
    };
    function format2Digits(int2Format) {
        var string2Format = int2Format.toString();
        if (string2Format.length == 1) {
            return "0" + string2Format;
        }
        return string2Format
    };
    function getGuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                       .toString(16)
                       .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
               s4() + '-' + s4() + s4() + s4();
    }
};