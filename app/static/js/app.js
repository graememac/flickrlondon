(function(){
    var app = angular.module("sainsburys", []);

    app.controller('photosCtrl', function($scope, $http) {
        
        // get photos
        $scope.photos = [];
        $http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK&tags=london').success(function(data){
            $scope.photos = data.items;
        });
        
        // set photo_selected class on image if it is found in localStorage
        $scope.findImage = function(image_url){
            
            if (localStorage.getItem(image_url) === "true"){
                return true;
            } else {
                return false;
            }
        };
    });
})();

jQuery(document).on( "click", ".photo", function() {
    
    if (jQuery(this).hasClass("photo_selected")){
        
        // remove photo_selected class from element and remove image from localStorage 
        localStorage.removeItem(jQuery(this).attr("src"));
        jQuery(this).removeClass("photo_selected");
    } else {
        
        // add photo_selected class to element and add image to localStorage
        localStorage.setItem(jQuery(this).attr("src"), true);
        jQuery(this).addClass("photo_selected");
    } 
});