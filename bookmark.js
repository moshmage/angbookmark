var bookmarks = angular.module('bookmarks',[]),
	uid = 0;

bookmarks.controller('bmControl',['$scope','$http', function($scope, $http) {
	$scope.bookmark = {};
	if (localStorage.bookmarks) {
		$scope.links = angular.fromJson(localStorage.bookmarks);
	}
	else {
		$scope.links = [{id:0,'link':'http://dgg.gg'}];
		localStorage.bookmarks = angular.toJson($scope.links);
	}
	$scope.saveLink = function() {
		$scope.bookmark.id = ($scope.links.length - 1) +1;
		$scope.bookmark.link = $scope.newlink;
		$scope.links.push($scope.bookmark);
		localStorage.bookmarks = angular.toJson($scope.links);
		$scope.newlink = "";
	}
	$scope.delLink = function(linkId) {
		console.log("deleting link "+linkId+" with value: "+$scope.links[linkId].link);
		$scope.links.splice(linkId,1);
		localStorage.bookmarks = angular.toJson($scope.links);
	}
	$scope.saveBookmarks = function() {
		console.log("TODO: Reach gist and paste stuff.");
	/*	var dataToPost = {
			'api_paste_code':localStorage.bookmarks,
			'api_paste_format':'text',
			'api_paste_expire_date':0,
			'api_paste_name':'THENAMEOFTHEPASTE',
			'api_paste_private':1
		};
		$http.post('http://pastebin.com/api/api_post.php',dataToPost).success(function(data,status,headers,config) {
			console.log(data);
			console.log(status);
			console.log(headers);
			console.log(config);
		}).error(function(data,status){
			console.log("ERROR GETTING THING:");
			console.log(data);
			console.log(status);
		});
	*/
	}
}]);