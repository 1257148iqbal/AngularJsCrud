/// <reference path="../angular.min.js" />
/// <reference path="../angular-route.min.js" />

//Module Define
var app = angular.module('MainModule', ['ngRoute']);

//Web Api Address
var baseUrl = "http://localhost:51945/api/Product/";


//Route Configuer
//Two Parameters- $routeProvider and $locationProvider

app.config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', { templateUrl: '/Pages/Index.html' })
        .when('/Product', { templateUrl: '/Pages/Product.html', controller: 'ProductCtrl' })
        .otherwise({ redirectTo: '/' });

    $locationProvider.hashPrefix('');
});


app.factory('ProductFact', function ($http) {
    var factory = {};
    factory.GetProducts = function () {
        return $http.get(baseUrl);
    }

    factory.SaveProducts = function (obj) {
        return $http.post(baseUrl, obj);
    }

    factory.UpdateProducts = function(obj) {
        return $http.put(baseUrl, obj.ProductID, obj);
    }

    factory.DeleteProducts = function (id) {
        return $http.delete(baseUrl + id);
    }
    return factory;   

});


app.controller('ProductCtrl', function ($scope, ProductFact) {
    Init();
    function Init() {
        ProductFact.GetProducts().then(function (res) {
            $scope.ProductList = res.data;
        })
    }

    $scope.SaveProduct = function () {
        ProductFact.SaveProducts($scope.objProduct).then(function () {
            Init();
            Clear();
        })
    }


    $scope.EditProduct = function (id) {
        $scope.objProduct = id;
    }

    $scope.UpdateProduct = function () {
        ProductFact.UpdateProducts($scope.objProduct).then(function () {
            Init();
            Clear();
        })
    }

    $scope.DeleteProduct = function (id) {
        ProductFact.DeleteProducts(id).then(function () {
            Init();
        })
    }


    
    function Clear() {
        $scope.objProduct = null;
    };
});