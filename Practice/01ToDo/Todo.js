function todoController($scope) {
    $scope.initialed = false;
    $scope.todos = [];
    $scope.addToDo = function () {
        $scope.todos.push({ desc: $scope.todoText, done: false,dueDate:$scope.todoDueDate });
        $scope.todoText = '';
    };
    $scope.remaining = function () {
        var count = 0;
        angular.forEach($scope.todos, function (todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };
    $scope.initial = function () {
        if ($scope.initialed) return;
        $scope.No = 0;
        $scope.todos.push({ desc: "A", done: true,dueDate:"2014-04-14" });
        $scope.todos.push({ desc: "B", done: false, dueDate: "2014-04-15" });
        $scope.initialed = true;
    };
    $scope.pluralizer = {
        0: "Finished all",
        1: "Only one left! GJ",
        other:"{} items remain in your todo list."
    }
}