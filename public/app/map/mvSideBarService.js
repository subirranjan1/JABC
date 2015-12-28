//angular.module('app').factory('mvSideBarService', function($rootscope) {
//    hideLeftSideBar=function(){
//        $("#menu-toggle").click(function(e) {
//            //console.log('Clicked');
//            e.preventDefault();
//            $("#wrapper").toggleClass("active");
//        });
//    }
//});

var module = angular.module('app', []);

module.service('userService', function(){
    console.log('I am Service');
    //this.users = ['John', 'James', 'Jake'];
});