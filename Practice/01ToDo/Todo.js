function todoController($scope) {
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
    $scope.pluralizer = {
        0: "Finished all",
        1: "Only one left! GJ",
        other:"{} items remain in your todo list."
    }
}