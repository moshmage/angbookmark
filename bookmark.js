var bookmarks = angular.module('bookmarks',[]),
	uid = 0;

bookmarks.controller('bmControl',['$scope', function($scope) {
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

}]);