var ngFirebase = angular.module("ngFirebase", []);

ngFirebase.factory("aFirebaseFactory", function () {
    return{
        fb: function() {
            return new Firebase('https://sweltering-fire-4693.firebaseio.com/todos/');
        } 
    };
});

ngFirebase.controller("todoController", function ($scope,aFirebaseFactory) {
    $scope.fb = aFirebaseFactory.fb();
    $scope.todos = [];
    $scope.initialed = false;

    $scope.fb.on('value', fbValueChanged);
    function fbValueChanged(snapeshot) {
        $scope.todos = snapeshot.val();
        if (!$scope.$$phase) {
            $scope.$apply();
        }
        $scope.initialed = true;
    }
    $scope.addToDo = function () {
        $scope.fb.push({ desc: $scope.todoText, done: false, dueDate: $scope.todoDueDate });
        $scope.todoText = '';
    };
    $scope.$watch(function () {
        var result = 0;
        angular.forEach($scope.todos, function (todo) {
            result += todo.done ? 1 : 0;
        });
        return result;
    }, function (newValue, oldValue) {
        if ($scope.initialed == true) {
            $scope.fb.set($scope.todos);
        }
    });
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
});