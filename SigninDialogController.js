(function(){
   
   angular
       .module('BloggerApp')
       .controller('SigninDialogController', SigninDialogController);
       

    SigninDialogController.$inject  = ['$mdSidenav', '$mdBottomSheet', '$scope', '$rootScope', '$http', '$location', '$mdToast', '$mdDialog'];
  
    
    
   function SigninDialogController($mdSidenav, $mdBottomSheet, $scope, $rootScope, $http, $location, $mdToast, $mdDialog)
   {
       console.log("Inside Signin Controller");
       
        $scope.cancelDialogBox    = cancelDialogBox;
        $scope.signin             = signin;
        $scope.signup             = signup;
        $scope.signinWithGmail    = signinWithGmail;
        $scope.signinWithfacebook = signinWithfacebook;
      
        function cancelDialogBox()
       {
           console.log("Cancel Button");
            $(document).ready(function(){
                
                 $mdDialog.cancel();
                 $("#first_div").fadeTo(200, 1);
            });
            
       };
       
       
       function signin()
       {
         console.log("SignIn Button");  
       };
       
       
       
       function signup(user)
       {
           //$scope.firstname = "sharvan";
           console.log("_________________________SignUp Button_________________________");
           console.log("FirstName : "+user.firstname);
           console.log("LastName  : "+user.lastname);
           console.log("DOB       : "+user.dob);
           console.log("Gender    : "+user.gender);
           console.log("Username  : "+user.username);
           console.log("Password  : "+user.password);
           console.log("________________________________________________________________");
           
           var data1 = $.param({
                country_id    : 1,
                state_id      : 1,
                city          : '0',
                area1         : '0',
                area2         : '0',
                pincode       : 0,
                first_name    : user.firstname,
                last_name     : user.lastname,
                dob           : user.dob,
                email         : user.username,
                gender        : user.gender,
                picture_path  : '../images/avatar-1.svg',
                user_status   : 0,
                username      : user.username,
                password      : user.password,
                login_status  : 0
            });
           
           var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
           
           var transform = function(data){
                                    return data1;
                                }
           
           $http.post('http://localhost:3000/api/users', data1, config)
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
               console.log('User Submition Response'+ JSON.stringify(data));
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
              
           
           
       };
       
       
       function signinWithGmail()
       {
           console.log("SignIn With Gmail"); 
       };
       
       function signinWithfacebook()
       {
           console.log("SignIn With Facebook"); 
       };
       
       
       
   }
    
})();