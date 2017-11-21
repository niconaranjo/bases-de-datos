app.controller('verarticulosCtrl', ['$scope','$http', function($scope,$http){
    
    $scope.setActive("mverarticulos");
    $scope.hayArt = false;
    $scope.articulosrevi = [];
    $scope.masinforma = [];
    $scope.modals = false;

    $scope.starter = function(){
        if($scope.IsRevisor){

            $http.post('../peticiones/articulos/checkarticulos.php' )
            .then(function(data){
                console.log(data.data);
                if(data.data.vacio){
                   $scope.hayArt = false;
               }else{
                   $scope.hayArt = true;
                   $scope.articulosrevi = data.data;
                }
            });
            
		}else{
			window.location = "index.html";
		}
    };

    $scope.masinfo = function(pos){	
		$scope.showModal2 = !$scope.showModal2;
        $scope.masinforma = $scope.articulosrevi[pos];
        console.log($scope.masinforma)
        	
    }
    $scope.infoarticulo = function(pos){	
		$scope.showModal = !$scope.showModal2;
        $scope.masinforma = $scope.articulosrevi[pos];
        console.log($scope.masinforma)
        	
    }
    
    $scope.hide = function(){
        
         $scope.showModal = false;
         $scope.showModal2 = false;
         
     }

}]);

	