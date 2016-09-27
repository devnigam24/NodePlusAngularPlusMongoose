

var UserProfile = angular.module('UserProfile', ['ngRoute']);

UserProfile.controller('UserProfileController', ['$rootScope', '$scope', '$http','$location', function ($rootScope, $scope, $http,$location) {
        $rootScope.updateRootScope = function(email,name){
            var userInSessionObject = {"emailID":email,"name":name};
            $rootScope.userLoggedIn = email;
            console.log("user in session object "+userInSessionObject);
            $http.post("/updateUserEmailID", userInSessionObject)
                .success(function (data, status) {
                    $location.path('/profileView');
                })
                .error(function(){
                    console.log("nope");
                });
        }
        
        $rootScope.getUserRootScope = function(){
            return  $rootScope.userLoggedIn;
        }
        
 }]);

/* Personal Information */

UserProfile.controller('personLInformationController',['$rootScope','$scope','$http',function($rootScope, $scope, $http){
    /* For Personal Information */
    $scope.saveInfo = function (user) {
    console.log("Hey");
    var userObject = angular.copy(user);
    $http.post("/postUserData", userObject)
    .success(function (data, status) {
        console.log(data.email1);
        console.log($rootScope);
        $rootScope.updateRootScope(data.email1,data.fname);
    })
    .error(function(){
        console.log("ye error");
    });
}
}]);




/* Job Experience */

UserProfile.controller('jobExperienceController',['$rootScope','$scope','$http',function($rootScope, $scope, $http){
    $scope.saveInfo = function (user) {
    console.log("jobx");
    console.log("user in session "+$rootScope.getUserRootScope());
    var userObject = angular.copy(user);
    $http.post("/postUserjobx", userObject,$rootScope.userLoggedIn)
    .success(function (data, status) {
        console.log("user in session "+$rootScope.userLoggedIn);
    })
    .error(function(){
        console.log("ye error");
    });
}
}]);




/* Project Information */

UserProfile.controller('projectController',['$rootScope','$scope','$http',function($rootScope, $scope, $http){
    $scope.saveProject = function (user) {
    console.log("Projects");
    console.log("user in session "+$rootScope.getUserRootScope());
    var userObject = angular.copy(user);
    $http.post("/postUserProject", userObject,$rootScope.userLoggedIn)
    .success(function (data, status) {
        console.log("user in session "+$rootScope.userLoggedIn);
    })
    .error(function(){
        console.log("ye error");
    });
}
}]);



/* Education Information*/

UserProfile.controller('educationController',['$rootScope','$scope','$http',function($rootScope, $scope, $http){
    $scope.saveEducation = function (user) {
    console.log("Education");
    console.log("user in session "+$rootScope.getUserRootScope());
    var userObject = angular.copy(user);
    $http.post("/postUserEducation", userObject,$rootScope.userLoggedIn)
    .success(function (data, status) {
        console.log("user in session "+$rootScope.userLoggedIn);
    })
    .error(function(){
        console.log("ye error");
    });
}
}]);



/* Achievements Information*/
UserProfile.controller('achievementsController',['$rootScope','$scope','$http',function($rootScope, $scope, $http){
    $scope.saveAchievement = function (user) {
    console.log("achievementsController");
    console.log("user in session "+$rootScope.getUserRootScope());
    var userObject = angular.copy(user);
    $http.post("/postUserAchievement", userObject,$rootScope.userLoggedIn)
    .success(function (data, status) {
        console.log("user in session "+$rootScope.userLoggedIn);
    })
    .error(function(){
        console.log("ye error");
    });
}
}]);


/* Skills Information*/
UserProfile.controller('skillController',['$rootScope','$scope','$http',function($rootScope, $scope, $http){
    
    $scope.saveInfo = function (skillArray) {
    $(".chip").each(function(){
        skillsArray.push(this.firstChild.textContent);
    });
    console.log(skillsArray);
    //console.log("user in session "+$rootScope.getUserRootScope());
    $http.post("/postUserSkill", skillsArray)
    .success(function (data, status) {
        console.log("user in session "+$rootScope.userLoggedIn);
    })
    .error(function(){
        console.log("ye error");
    });
}
}]);

/* Profile View */
UserProfile.controller('viewProfileController',['$rootScope','$scope','$http',function($rootScope, $scope, $http){
   $scope.init = function () {
       $http.get("/updateUserEmailID")
        .success(function (data, status) {
            $scope.userInSession = data.name;
            $scope.userInsessionID = data.emailID;
            console.log("user in session "+data);
        })
        .error(function(){
            console.log("ye error");
        });
   };
}]);



/* Routing */
UserProfile.config(function($routeProvider) {
    $routeProvider
    .when("/personalInformation", {
        templateUrl : "views/personal.html"
    })
    .when("/education", {
        templateUrl : "views/education.html"
    })
    .when("/skills", {
        templateUrl : "views/skills.html"
    })
    .when("/projects", {
        templateUrl : "views/projects.html"
    })
    .when("/jobExperience", {
            templateUrl : "views/jobExperience.html"
        })
    .when("/achievements", {
                templateUrl : "views/achievements.html"
            })
    .when("/profileView", {
                    templateUrl : "views/profileView.html"
                });
});

