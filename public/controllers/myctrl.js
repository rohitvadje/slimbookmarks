var app = angular.module('myApp', []);
	app.controller('myCtrl', function($scope,$http) {
		$scope.repeatCall = function() {
		   		
		   setInterval(function(urlToGo,image) {				  
				$scope.pingWebsite("https://slimcs-dev.cloudapps.cisco.com/slim/" , "dev_image_src");					  
				$scope.pingWebsite("https://slimcs1-dev.cloudapps.cisco.com/slim/" ,"dev1_image_src" );
				$scope.pingWebsite("https://slimcs-stage.cloudapps.cisco.com/slim/" ,"stage_image_src" );
				$scope.pingWebsite("https://slimcs1-stage.cloudapps.cisco.com/slim/" ,"stage1_image_src" );
				$scope.pingWebsite("https://slimcs.cloudapps.cisco.com/slim/" ,"prod_image_src" );
				$scope.pingWebsite("https://mapis.zensar.com/zimbra/mail" ,"zimbra_image_src" );
				$scope.pingWebsite("http://zenloungeplus.zensar.com/" ,"zenlounge_image_src" );
				$scope.pingWebsite("https://sso.rallydev.com/sp/startSSO.ping?PartnerIdpId=cloudsso.cisco.com" ,"rally_image_src" );
				$scope.pingWebsite("https://ci.cisco.com/login?from=%2F" ,"jenkins_image_src" );
				$scope.pingWebsite("https://adselfservice.zensar.com/showLogin.cc" ,"adselfservice_image_src" );
				$scope.pingWebsite("https://gitscm.cisco.com" ,"bitbucket_image_src" );
				$scope.pingWebsite("https://www.google.com/gmail/" ,"gmail_image_src" );
                $scope.pingWebsite("http://10.76.168.35/meeting/day.php","meeting_image_src");
				console.clear();
			}, 3000);
		};
		
		$scope.pingWebsite = function(urlToGo,image){
			$http({
			  method: 'GET',
			  url: 'http://10.76.169.22:3000/pingWebSite?urlToGo='+urlToGo,
			  headers : {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'				
				}
			}).then(function successCallback(response) {                                    
				if(response.data.toString()=='true')					
					$scope[image] ="Green.png";	
				else
					$scope[image] = "Red.png";
			  }, function errorCallback(response) {
				$scope[image] = "White.png";
			  }); 		  
		};
	
	});
