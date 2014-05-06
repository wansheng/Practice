function todoController ($scope, $http) {
    
    $scope.todos = [];
    $scope.initialed = false;
    $scope.debugResponse = 'not initial';
    initial();

    function initial() {
        $http({ method: 'GET', url: 'https://sweltering-fire-4693.firebaseio.com/todos/.json' })
            .success(function (data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        var a = data;
        $scope.todos = [];
        for (var i in a) {
            $scope.todos.push(a[i]);
        }
    }).error(function (data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert(data);
    });
    }
    $scope.addToDo = function () {
        //$scope.fb.push({ desc: $scope.todoText, done: false, dueDate: $scope.todoDueDate });
        //
        $scope.newTodo = { desc: $scope.todoText, done: false, dueDate: $scope.todoDueDate };
        $http({ method: 'POST', url: 'https://sweltering-fire-4693.firebaseio.com/todos/.json', data: $scope.newTodo })
        .success(function(data,status,headers,config){
            alert('success');
            $scope.todos.push($scope.newTodo);
            $scope.todoText = '';
            })
        .error(function (data, status, headers, config) {
            alert('error');
        })
            


    };
    
    $scope.remaining = function () {
        var count = 0;
        angular.forEach($scope.todos, function (todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };
    $scope.pluralizer = {
        0: "Finished all",
        1: "Only one left! GJ",
        other: "{} items remain in your todo list."
    }

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                       .toString(16)
                       .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
               s4() + '-' + s4() + s4() + s4();
    }
};