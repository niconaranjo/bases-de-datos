app.controller('asignarEditorCtrl', ['$scope','$http', function($scope,$http){

    $scope.setActive("masignareditor");
    $scope.revisores = [];
    $scope.showModal2 = false;
    $scope.masinforma = {};
    $scope.sendInfo ={};
    $scope.starter = function(){
        if($scope.IsSuper){

            $http.post('../peticiones/usuarios/getrevisores.php' )
            .then(function(data){
                console.log(data.data);
                if(data.data.vacio){
                   $scope.hayRev = false;
               }else{
                   $scope.hayRev = true;
                   $scope.revisores = data.data.no_asignados;
                }
            });
            
		}else{
			window.location = "index.html";
		}
    };

    $scope.masinfo = function(pos){	
		$scope.showModal2 = !$scope.showModal2;
        $scope.masinforma = $scope.revisores[pos];
        	
	}

    $scope.send = function(pos){
        $scope.sendInfo = $scope.revisores[pos];
        
        var asignadosaux = {};
        $scope.asignadosPost = [];
        asignadosaux.nickname = $scope.sendInfo.nickname;

        $scope.asignadosPost.push(asignadosaux );
        console.log($scope.asignadosPost);

        $http.post('../peticiones/usuarios/seteditor.php', $scope.asignadosPost )
        .then(function(data){
            
            
        });
    }

    $scope.hide = function(){
       
        $scope.showModal2 = false;
        
    }
}])