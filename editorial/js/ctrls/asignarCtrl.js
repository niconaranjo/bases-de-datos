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
    //Borrar Despues
    $scope.revisores = [

        {
            nickname:'ADMIN',
            nombre:'NICOLAS',
            apellido:'NARANJO MEJIA',
            correo:'niconaranjo95@gmail.com',
            idioma:'0,1',
            int_revisor:'Diseño, UX',
            biografia: 'Hola esta es la bio',
            institucion:'UMNG'
        },
        {
            nickname:'FELI',
            nombre:'FELIPE ',
            apellido:'CAMARGO',
            correo:'niconaranjo95@gmail.com',
            idioma:'2',
            int_revisor:'Diseño, UX',
            biografia: 'Hola esta es la bio',
            institucion:'UMNG'
        },
        {
            nickname:'AMOR',
            nombre:'INGRID',
            apellido:'USAQUEN PINEDA',
            correo:'niconaranjo95@gmail.com',
            idioma:'1',
            int_revisor:'CX, MEDICINA',
            biografia: 'Hola esta es la bio',
            institucion:'UMNG'
        }
    ]

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
        if($scope.revisores.lenght < 0){
            $scope.hayAsignados = true;
        }
        for (var i in $scope.revisores ) 
            if ($scope.revisores[i].nickname === data) 
                $scope.asignados = $scope.asignados.concat($scope.revisores[i]);

        
    }

    $scope.quitarRevisor = function(data){
        console.log(data);
    }

    $scope.infoRevisor = function(pos){
        $scope.revisorS = $scope.revisores[pos];
        $scope.datosRevisor = true;
    }

    $scope.masinfo = function(pos){	
		$scope.showModal2 = !$scope.showModal2;
		$scope.masinforma = $scope.articulos[pos];		
	}
    $scope.modalagregarRev = function(pos){
        $scope.showModal = !$scope.showModal;
        $scope.infoArt = $scope.articulos[pos];
        
        console.log($scope.infoArt.id_art);
        $http.post('../peticiones/usuarios/getrevisores.php', $scope.infoArt.id_art)
        .then(function(data){
            console.log(data.data);
            //$scope.revisores = data.data;
        })
    }

    $scope.hide = function(){
        $scope.showModal = false;
        $scope.showModal2 = false;
        $scope.datosRevisor = false;
    }
}])