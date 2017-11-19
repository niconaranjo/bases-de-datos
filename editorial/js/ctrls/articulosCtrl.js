app.controller('articulosCtrl', ['$scope','$http', function($scope,$http){
	
	$scope.setActive("marticulos");
	$scope.hayArt = false;
	$scope.modals = false;
	$scope.articulos = {};
	$scope.masinforma = {};
	$scope.getArticulos = function(){

		if($scope.IsAutor){
			$http.get('../peticiones/articulos/getarticulos.php')
			.then(function(data){
				if(data.data.vacio){
				   $scope.hayArt = false;
			   }else{
				   
				   $scope.hayArt = true;
				   $scope.articulos = data.data;
				}
			   console.clear();
			})
		}else{
			window.location = "index.html";
		}

		
	}

	$scope.masinfo = function(pos){	
		$scope.modals = true;
		$scope.masinforma = $scope.articulos[pos];		
	}

}]);

//NO SE USA AUN
app.filter('Mosarticulo', function(){
    return function(data, parameter){
		var filtered=[];
		console.log(data);
        for(var i=0;i<data.length;i++){
                if(i==parameter)
                    filtered.push(data[i]);
        }
        return filtered;
    }
});

