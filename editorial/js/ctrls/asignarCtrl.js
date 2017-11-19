app.controller('asignarCtrl', ['$scope','$http', function($scope,$http){
    $scope.setActive("masignar");
    $scope.showModal = false;
    $scope.showModal2 = false;
    $scope.masinforma = {};
    $scope.infoArt = {};
    $scope.editores = {};
    //Borrar Despues
    $scope.editores = [

        {
            nombre:'NICOLAS',
            apellido:'NARANJO MEJIA',
            correo:'niconaranjo95@gmail.com',
            idioma:'0,1',
            int_revisor:'Diseño, UX',
            biografia: 'Hola esta es la bio',
            institucion:'UMNG'
        },
        {
            nombre:'NICOLAS',
            apellido:'NARANJO MEJIA',
            correo:'niconaranjo95@gmail.com',
            idioma:'0,1',
            int_revisor:'Diseño, UX',
            biografia: 'Hola esta es la bio',
            institucion:'UMNG'
        },
        {
            nombre:'NICOLAS',
            apellido:'NARANJO MEJIA',
            correo:'niconaranjo95@gmail.com',
            idioma:'0,1',
            int_revisor:'Diseño, UX',
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
            /*
            $http.post('../peticiones/usuarios/getarevisores.php')
			.then(function(data){
				$scope.editores = data.data;
            })
            */
		}else{
			window.location = "index.html";
		}
    }

    $scope.masinfo = function(pos){	
		$scope.showModal2 = !$scope.showModal2;
		$scope.masinforma = $scope.articulos[pos];		
	}
    $scope.modalagregarRev = function(pos){
        $scope.showModal = !$scope.showModal;
        $scope.infoArt = $scope.articulos[pos];
    }

    $scope.hide = function(){
        $scope.showModal = false;
        $scope.showModal2 = false;
    }
}])