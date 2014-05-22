var bookmarks = angular.module('bookmarks',[]),
	uid = 0,
	stock_hack;
function stock_search(data) { stock_hack = data; }


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
		var dataToPost = {
			'code':localStorage.bookmarks,
			'pname':'text',
			'callback':'stock_search'
		};
		$http({
			method: "JSONP",
			params: dataToPost,
			url:'http://pasterelay.loomhost.com/pasterelay.php',
			isArray: true
		}).success(function(data,status){
			/* Angular Bug, function is never successfull. */
		}).error(function(data,status){
			/* stock_hack === data retrieved */
			// console.info(stock_hack);
			localStorage.cloudBookmarks = stock_hack.backupLink;
			console.log(stock_hack.backupLink);
		});
	}
	$scope.loadBookmarks = function () {
		if (localStorage.cloudBookmarks) {
			var path = localStorage.cloudBookmarks.split("/").slice(-1)[0];
			console.log(path);
			var dataToPost = {
				'retrieve': path,
				'callback': 'stock_search'
			};
			$http({
				method: "JSONP",
				params: dataToPost,
				url:'http://pasterelay.loomhost.com/pasterelay.php',
				isArray: true
			}).success(function(data,status){
				/* Angular Bug, function is never successfull. */
			}).error(function(data,status){
				/* stock_hack === data retrieved */
				console.info(angular.toJson(stock_hack));
				 if (!stock_hack.error) {
				 	localStorage.bookmarks = angular.toJson(stock_hack);
				 	$scope.links = angular.fromJson(stock_hack);
				 }
				 else {

				 }
			});
		}
		else {

		}
	}
}]);