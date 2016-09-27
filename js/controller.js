
var CarRent = angular.module('UserProfile', ['ngRoute']);
CarRent.controller('UserProfileController', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {


    $scope.addCars = function () {
        var url = '/addCarData';
        $http.get(url).then(function (data) {
            //$scope.addCarData = data.data.result;
            console.log($scope.carData1);

        }, function (err) {
            console.log("error: ", err);
        });
    }
    $scope.addCars();
    $scope.pass1 = "";
    $scope.email1 = "";
    $scope.checkEmail;
    $scope.dispCar = [];
    $scope.carType = [];
    $scope.dates3 = [];
    $scope.doSomething = function () {
        $('.slider').slider({ full_width: true, interval: 2000 });
        $('select').material_select();
    }

    $scope.doSomething1 = function () {
        //  $("#back").width(100).height(10);
        //$('body').css('background-image','url(images/thankyou3.jpg)');
        $("body").css({ "background-color": " PeachPuff  " });
        $scope.dispCar = [];
        $scope.carSedan = [];
        $scope.carSuv = [];
        $scope.carHatch = [];
        $scope.dates3 = [];
        var url = '/carData/' + $scope.a;
        $http.get(url).then(function (data) {
            $scope.carData1 = data.data.result;
            console.log($scope.carData1);

        }, function (err) {
            console.log("error: ", err);
        });
        console.log($scope.dispCar.length);

        dates2 = [];



    }



    $scope.getLoc = function () {
        $scope.a = $("#cityName option:selected").text();
        $scope.b = $("#carType option:selected").text();
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });

        var url = '/carData/' + $scope.a;
        $http.get(url).then(function (data) {
            console.log(data.data);
            console.log("hey");
            $location.path('/carInfo');

        }, function (err) {
            console.log("error: ", err);
        });
    };

    $scope.getLoc1 = function () {
        $scope.a = $("#cityName option:selected").text();
        $scope.b = $("#carType option:selected").text();
        console.log($scope.a);
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });

        var url = '/carData/' + $scope.a;
        $http.get(url).then(function (data) {
            console.log(data.data);
            console.log("hey");
            $location.path('/bookInfo');

        }, function (err) {
            console.log("error: ", err);
        });
    };



    $scope.loc = function () {

        $location.path('/locations');
    }

    $scope.home = function () {
        $location.path('/');
    }

    $scope.signUp = function () {
        $('#modal3').openModal();
    }

    $scope.newUser = function () {
        $('#modal4').openModal();
        $('#modal3').closeModal();

    }

    $scope.signUp1 = function () {
        if ($scope.pass1 == "" || $scope.email1 == "") {
            alert("enter username or password")
            $scope.pass1 = "";
            $scope.email1 = "";
        }
        else {
            $('#modal3').closeModal();
            console.log("hey")
            var url = '/userData';
            $http.get(url).then(function (data) {
                console.log(data.data)
                angular.forEach(data.data, function (value, key) {
                    console.log(value)
                    for (var i = 0; i < value.length; i++) {
                        console.log(value[i].email);
                        console.log(i)
                        if ($scope.email1 == value[i].email && $scope.pass1 == value[i].password) {
                            console.log("hey")
                            $location.path('/location');
                            break;

                        }
                        else if (i == value.length - 1) {
                            console.log(value.length)
                            alert("username or password incorrect");
                            $scope.pass1 = "";
                            $scope.email1 = "";
                        }
                    }
                });

            });
        }
    }

    $scope.register1 = function () {
        $('#modal4').closeModal();
        newUser = { "first_name": $scope.first_name2, "last_name": $scope.last_name2, "email": $scope.email2, "password": $scope.pass2 }
        $http.post("/userData", newUser).success(function (data, status) {
            console.log(data);
            $scope.home();
        });

    }

    //carId,carName,carRate,carAvailable,carType,carImg
    $scope.book = function (car3, type, car2) {
        console.log(car3)
        console.log(car3.img)
        //console.log(car2.car3)
        $scope.carImg = car3.img
        $scope.car_id = car3.car_id;
        $scope.car_type = type;
        $scope.car_name = car3.name;
        $scope.car_rate = car3.rate;
        $location.path('/bookingPage');
    }

    $scope.abtUs = function () {
        $location.path("/aboutus");
    }

    $scope.loc1 = function () {
        $location.path('/location');
    }

    $scope.getDate1 = function () {

        //geting the booked Dates info
        dates2 = [];
        $http.get("/carBookDetails/" + $scope.car_id).success(function (data, status) {
            console.log(data.result);
            //  dates2 =[new Date()];
            angular.forEach(data.result, function (value, key) {
                console.log(value)

                angular.forEach(value.bookingDate, function (value1, key) {
                    pickUp = value1.pickup.split('-');
                    drop = value1.drop.split('-');
                    start = new Date(pickUp[0], pickUp[1] - 1, pickUp[2]),
                        end = new Date(drop[0], drop[1] - 1, drop[2]),
                        year = start.getFullYear(),
                        month = start.getMonth()
                    day = start.getDate(),
                        dates1 = [start];
                    dates2.push(start)
                    while (dates1[dates1.length - 1] < end) {
                        datenew = new Date(year, month, ++day)
                        dates1.push(datenew);
                        dates2.push(datenew);

                        // dates2.push(new Date(year, month, ++day));
                    }
                    //date2.concat(dates1)
                    console.log(dates1)
                });
                console.log(dates2)
            });


            //console.log($scope.Date1.getTime());
            var SecondDate = $("#date2").val();
            $scope.dor = $("#date2").val();
            var FirstDate = $("#date1").val();
            $scope.dop = $("#date1").val();
            var dt2 = SecondDate.split('-');
            dt1 = FirstDate.split('-'),
                one = new Date(dt1[0], dt1[1] - 1, dt1[2]);
            year = one.getFullYear(),
                month = one.getMonth()
            day = one.getDate(),
                dates = [one];
            two = new Date(dt2[0], dt2[1] - 1, dt2[2]);
            console.log(day)
            while (dates[dates.length - 1] < two) {
                dates.push(new Date(year, month, ++day));
            }
            console.log(dates)
            console.log($scope.pickUp)
            console.log(two - one)
            console.log(new Date(dt2[0], dt2[1] - 1, dt2[2]));
            console.log(one.getDay())
            console.log(dt2[2]);
            console.log(dt2[1]);
            console.log(dt2[0]);
            console.log($("#time1").val());
            console.log($("#time2").val());
            var firstTime = $("#time1").val();
            $scope.pt = $("#time1").val();
            $scope.dt = $("#time2").val();
            secondTime = $("#time2").val();
            t1 = firstTime.split(':');
            t2 = secondTime.split(':');
            var pt1 = t1[1] / 60;
            var pt2 = t1[0];
            var totalTime1 = pt2[0] + pt1;
            console.log(totalTime1)
            var dt1 = t2[1] / 60;
            var dt2 = t2[0];
            var totalTime1 = pt2[0] + pt1;
            var totalTime2 = dt2[0] + dt1;
            var totalTime3 = (24 - totalTime2);
            var totalTime = totalTime3 + totalTime2;
            console.log(totalTime3);
            console.log(totalTime)
            var millisBetween = (two.getTime() - one.getTime());
            console.log(millisBetween * 2.7778e-7);

            var found = false;
            console.log(dates.length)
            for (var i = 0; i < dates2.length; i++) {
                checkdate = dates2[i];
                if (dates.map(Number).indexOf(+checkdate) != -1) {
                    found = true;
                    break;
                }

            }
            console.log(found);
            if (!found) {

                $scope.totalpayment = "$" + Math.round((millisBetween * 2.7778e-7) * ($scope.car_rate))
                $("#totalPay").show();
            }
            else {
                alert("the car is already booked")
            }
        });
    }


    $scope.pay = function () {
        carupdate = {
            userId: $scope.email1,
            pickup: $scope.dop,
            drop: $scope.dor
        };

        bookingDetail = {
            carid: $scope.car_id,
            carname: $scope.car_name,
            cartype: $scope.car_type,
            dop: $scope.dop,
            dor: $scope.dor,
            dt: $scope.dt,
            payment: $scope.totalpayment,
            pt: $scope.pt
        },
            console.log(bookingDetail);
        $http.put("/userData/" + $scope.email1, bookingDetail).success(function (data, status) {
            console.log(data);
            $("#pay1").show();
        });
        $http.put("/carBookDetails/" + $scope.car_id, carupdate).success(function (data, status) {
            console.log(data);
        })
    }

    $scope.checkInfo = function (car_id1) {
        dates2 = [];

        $http.get("/carBookDetails/" + car_id1).success(function (data, status) {
            console.log(data.result);
            flag1 = true;
            //  dates2 =[new Date()];
            angular.forEach(data.result, function (value, key) {
                console.log(value)

                angular.forEach(value.bookingDate, function (value1, key) {
                    pickUp = value1.pickup.split('-');
                    drop = value1.drop.split('-');
                    start = new Date(pickUp[0], pickUp[1] - 1, pickUp[2]),
                        end = new Date(drop[0], drop[1] - 1, drop[2]),
                        year = start.getFullYear(),
                        month = start.getMonth()
                    day = start.getDate(),
                        dates1 = [start];
                    dates2.push(start)
                    while (dates1[dates1.length - 1] < end) {
                        datenew = new Date(year, month, ++day)
                        dates1.push(datenew);
                        dates2.push(datenew);
                        flag1 = false;
                        // dates2.push(new Date(year, month, ++day));
                    }
                    //date2.concat(dates1)

                    console.log(dates1)
                });

                //  $('#modal5').openModal();
            });
            if (flag1) {
                $window.alert("No Cars Booked");

            }
            else {
                $scope.date3 = dates2;
                $window.alert(dates2 + '\n');
            }
        });


    }

}]);

CarRent.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            templateUrl: '/mainPage.html',
            //controller: "RentController"
        }).
        when('/locations', {
            templateUrl: '/views/locations.html',
            //controller: "RentController"
        }).
        when('/location', {
            templateUrl: '/views/location.html',
            //controller: "RentController"
        }).
        when('/carInfo', {
            templateUrl: '/views/carInfo.html',
            //controller: "RentController"
        }).
        when('/bookInfo', {
            templateUrl: '/views/bookInfo.html',
            //controller: "RentController"
        }).
        when('/bookingPage', {
            templateUrl: '/views/bookingPage.html',
            //controller: "RentController"
        }).
        when('/aboutus', {
            templateUrl: '/views/aboutus.html',
            //controller: "RentController"
        }).
        otherwise({
            redirectTo: '/'
        });
}]);



var insertDocument = function (db, callback) {
    db.collection('restaurants').insertOne({
        "address": {
            "street": "2 Avenue",
            "zipcode": "10075",
            "building": "1480",
            "coord": [-73.9557413, 40.7720266]
        },
        "borough": "Manhattan",
        "cuisine": "Italian",
        "grades": [
            {
                "date": new Date("2014-10-01T00:00:00Z"),
                "grade": "A",
                "score": 11
            },
            {
                "date": new Date("2014-01-16T00:00:00Z"),
                "grade": "B",
                "score": 17
            }
        ],
        "name": "Vella",
        "restaurant_id": "41704620"
    }, function (err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the restaurants collection.");
        callback();
    });
};