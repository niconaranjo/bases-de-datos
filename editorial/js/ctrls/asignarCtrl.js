app.controller('asignarCtrl', ['$scope','$http', function($scope,$http){
    $scope.setActive("masignar");
    $scope.showModal = false;
    $scope.showModal2 = false;
    $scope.masinforma = {};
    $scope.infoArt = {};
    $scope.revisores = {};
    $scope.revisorS = {};
    $scope.datosRevisor = false;
    $scope.asignados = [];
    $scope.hayAsignados = false;
    $scope.agregado = true;
    //Borrar Despues
    $scope.revisores = [];

    $scope.starter = function(){
        if($scope.IsEditor){

			$http.get('../peticiones/articulos/getarticulos.php')
			.then(function(data){
				if(data.data.vacio){
				   $scope.hayArt = false;
			   }else{
				   $scope.hayArt = true;
				   $scope.articulos = data.data;
				}
			  console.log(data.data);
            })
            
            
            
		}else{
			window.location = "index.html";
		}
    }
    $scope.agregarRevisor = function(data){
        if(!$scope.asignados ){
            
            $scope.asignados = [];
        } 
        
        if($scope.asignados.length < 5){ 
            for (var i in $scope.revisores ) if ($scope.revisores[i].nickname === data) $scope.asignados = $scope.asignados.concat($scope.revisores[i]);
        }else{
            console.log('muchos Fin!');
        }
        if($scope.asignados.length > 0){            
            $scope.hayAsignados = true;
        }
        $scope.agregado = false;
        
    }

    $scope.quitarRevisor = function(data){
        $scope.asignados.splice( data, data );
    }

    $scope.infoRevisor = function(pos){
        $scope.revisorS = $scope.revisores[pos];
        $scope.datosRevisor = true;
        $scope.agregado = true;
    }

    $scope.masinfo = function(pos){	
		$scope.showModal2 = !$scope.showModal2;
		$scope.masinforma = $scope.articulos[pos];		
	}
    $scope.modalagregarRev = function(pos){

        $scope.showModal = !$scope.showModal;
        $scope.infoArt = $scope.articulos[pos];
        $scope.subircito = {};
        $scope.subircito.id_art = $scope.infoArt.id_art;
        console.log($scope.infoArt.id_art);

        $http.post('../peticiones/usuarios/getrevisores.php', $scope.subircito )
        .then(function(data){
            console.log(data.data);
            $scope.revisores = data.data.no_asignados;
            if(data.data.asignados){
                $scope.asignados = data.data.asignados;
                $scope.hayAsignados = true;
            }

            
        })
    }

    $scope.enviarAsignados = function(){
        console.log($scope.asignados);
        $scope.asignadosPost = [];
        
        for (var i in $scope.asignados ){
            var asignadosaux = [];
            asignadosaux.nickname = $scope.asignados[i].nickname;
            asignadosaux.id_art = $scope.infoArt.id_art;

            $scope.asignadosPost.push(asignadosaux );  
            
        } 
        console.log($scope.asignadosPost)
        
        $http.post('../peticiones/usuarios/setrevisores.php', $scope.asignadosPost )
        .then(function(data){
           
            
        });
        
    }

    $scope.hide = function(){
        $scope.showModal = false;
        $scope.showModal2 = false;
        $scope.datosRevisor = false;
        $scope.hayAsignados = false;
        $scope.asignados.splice(0,$scope.asignados.length);
    }
}])