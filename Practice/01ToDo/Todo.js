function todoController($scope) {
    $scope.Todos = [];
    $scope.TodoDueDate = now();

    $scope.AddToDo = function () {
        $scope.Todos.push({ Desc: $scope.TodoText, Done: false,DueDate:$scope.TodoDueDate });
        $scope.TodoText = '';
    };
    $scope.RemoveCompleted = function () {
        for (var i = 0; i < $scope.Todos.length ; i++)
        {
            if ($scope.Todos[i].Done)
            {
                $scope.Todos.splice(i, 1);
                i--;
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
    $scope.pluralizer = {
        0: "Finished all",
        1: "Only one left! GJ",
        other:"{} items remain in your todo list."
    }
    function now() {
        var d = new Date();
        return d.getFullYear() + '-' + format2Digits(d.getMonth() + 1) + '-' + format2Digits(d.getDate());
       

    }
    function format2Digits(int2Format)
    {
        var string2Format = int2Format.toString();
        if (string2Format.length == 1)
        {
            return "0" + string2Format;
        }
        return string2Format
    }

}