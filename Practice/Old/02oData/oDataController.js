var oDataController = function ($scope, $http) {
    var result = $http.get("http://services.odata.org/V4/(S(rsic2wywbc53a3jc3fio1rm4))/OData/OData.svc/Products/");
    result.success(function (data) {
        $scope.items = data.value;
        
    });
}