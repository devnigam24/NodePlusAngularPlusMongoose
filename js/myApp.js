

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
    console.log(userObject);
    $http.post("/postUserData", userObject)
    .success(function (data, status) {
        console.log(data);
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

    $scope.addExp = function(){
            document.getElementById("jobExperience_form").reset();

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
    $scope.AddProject = function(){
     document.getElementById("projects_form").reset();
    }
    
    
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        var fd = new FormData();
        fd.append('file', file);
        $http.post("/multer",fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
          console.log("success!!");

           var fileNameUploaded = $("#fileUploaded").val().split("\\")[2];
                //window.location.href = "../uploads/"+fileNameUploaded;

            var myFile  =  "../uploads/"+fileNameUploaded ;
            var l = '<a href="' + myFile + '" >" ' + fileNameUploaded + ' </a>'
            //var l = "<a href="  + myFile + ">" + Download now! + "</a>"
            $("#down1").append( l );
        })
        .error(function(){
          console.log("error!!");
        });
    };
}]);

UserProfile.directive('fileModel', ['$parse', function ($parse) {
return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
};
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

    $scope.addEducation = function(){
                document.getElementById("education_form").reset();

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
    $scope.AddAchievement = function(){
                document.getElementById("acievements_form").reset();

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
    $http.post("/postUserSkill", skillsArray,$rootScope.userLoggedIn)
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
    $scope.BooleanVlueForEdit = true;
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

   $scope.viewProfile = function(){
        var url = '/getUserData/' + $scope.userInsessionID;
                $http.get(url).then(function (data) {
                    $scope.personalInfo = data.data
                    console.log("Personal Info");
                    // for User Job Experience
                         var url = '/getUserjobx/' + $scope.userInsessionID;
                         $http.get(url).then(function (data) {
                         $scope.jobExp = data.data;
                         console.log(data);
                             var url = '/getUserSkill/' + $scope.userInsessionID;
                                                     $http.get(url).then(function (data) {
                                                     $scope.userSkill = data.data;
                                                     console.log(data);
                                                     });
                                 var url = '/getUserProject/' + $scope.userInsessionID;
                                                     $http.get(url).then(function (data) {
                                                     $scope.userProject = data.data;
                                                     console.log(data);
                                                     });
                                 var url = '/getUserEducation/' + $scope.userInsessionID;
                                                      $http.get(url).then(function (data) {
                                                      $scope.userEducation = data.data;
                                                      console.log(data);
                                                      });
                                      var url = '/getUserAchievement/' + $scope.userInsessionID;
                                                     $http.get(url).then(function (data){
                                                     $scope.userAchievements = data.data;
                                                     console.log(data);
                                                     });

                         });

                }, function (err) {
                    console.log("error: ", err);
                });
   }

       $scope.editFieldsHere = function(){
            $("input[name='first_name']").removeAttr("disabled");
            $("input").each(function(){
            $(this).removeAttr("disabled");
            });
        }
       $scope.updateUser = function(info){
        console.log(info);
        console.log("session"+$scope.userInsessionID);
        $http.put("/updateUserData", info)
            .success(function (data, status) {
                console.log(data);
                console.log($rootScope);
                $rootScope.updateRootScope(data.email1,data.fname);
            })
            .error(function(){
                console.log("ye error");
            });
       }
       $scope.updateJobX = function(info){
               console.log(info);
               console.log("session"+$scope.userInsessionID);
               $http.put("/updateUserjobx", info,$rootScope.userLoggedIn)
                   .success(function (data, status) {
                       console.log(data);
                       console.log($rootScope);
                       //$rootScope.updateRootScope(data.email1,data.fname);
                   })
                   .error(function(){
                       console.log("ye error");
                   });
              }
       $scope.updateSkill = function (skillArray) {
       debugger;
                             $(".chip").each(function(){
                                 skillsArray.push(this.firstChild.textContent);
                             });
                             console.log(skillsArray);
                             //console.log("user in session "+$rootScope.getUserRootScope());
                              $http.put("/updateUserSkill", skillsArray,$rootScope.userLoggedIn)
                                                       .success(function (data, status) {
                                                           console.log(data);
                                                           console.log($rootScope);
                                                           //$rootScope.updateRootScope(data.email1,data.fname);
                                                       })
                                                       .error(function(){
                                                           console.log("ye error");
                                                       });
                         }
        $scope.editandcreatechips = function(){
            $("input[name='first_name']").removeAttr("disabled");
                        $("input").each(function(){
                        $(this).removeAttr("disabled");
                        });
            $("input[name='skills']").change(function(){
                var theHTML = '<div class="chip"><vidhi>'+$("input[name='skills']").val()+'</vidhi><i class="material-icons close">close</i></div>';
                $(theHTML).insertBefore($("input[name='skills']"));
                $("input[name='skills']").val("");
            });
        }

        //update Project
        $scope.updateProject = function(info){
                       console.log(info);
                       console.log("session"+$scope.userInsessionID);
                       $http.put("/updateUserProject", info,$rootScope.userLoggedIn)
                           .success(function (data, status) {
                               console.log(data);
                               console.log($rootScope);
                               //$rootScope.updateRootScope(data.email1,data.fname);
                           })
                           .error(function(){
                               console.log("ye error");
                           });
                      }
        //update education
        $scope.updateEducation = function(info){
                               console.log(info);
                               console.log("session"+$scope.userInsessionID);
                               $http.put("/updateUserEducation", info,$rootScope.userLoggedIn)
                                   .success(function (data, status) {
                                       console.log(data);
                                       console.log($rootScope);
                                       //$rootScope.updateRootScope(data.email1,data.fname);
                                   })
                                   .error(function(){
                                       console.log("ye error");
                                   });
                              }

        //update achievements
        $scope.updateAchievement = function(info){
                                       console.log(info);
                                       console.log("session"+$scope.userInsessionID);
                                       $http.put("/updateUserAchievement", info,$rootScope.userLoggedIn)
                                           .success(function (data, status) {
                                               console.log(data);
                                               console.log($rootScope);
                                               //$rootScope.updateRootScope(data.email1,data.fname);
                                           })
                                           .error(function(){
                                               console.log("ye error");
                                           });
                                      }

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

