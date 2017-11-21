app.controller('revisionCtrl', ['$scope','$http', function($scope,$http){
    
    $scope.setActive("mrevision");
    $scope.hayArt = false;
    $scope.articulosrevi = [];
    $scope.masinforma = [];
    $scope.modals = false;
    $scope.carga = true;
	$scope.nocarga = false;
    $scope.Psubida = 0.01;
    
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
                   console.log( $scope.articulosrevi);
                }
            });
            
		}else{
			window.location = "index.html";
		}
    };
    

    $scope.subir = function () {
		$scope.showModal = !$scope.showModal;
		$scope.Psubida = 0.01;
		var arr = [];
		

		$scope.formData.file_a = $scope.file_a;
        $scope.formData.file_b = $scope.file_b;
		$scope.carga = true;

		var fd = new FormData();
		angular.forEach($scope.formData, function (value, key) {
			if (key === 'file_a' || key === 'file_b' ) {
				fd.append(key, value[0]);

			} else {
				
				fd.append(key, value);
				
			}
		});


		$http
			.post('../peticiones/articulos/revision.php', fd, {
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined, 'Process-Data': false },
				eventHandlers: {
					progress: function (c) {
					}
				},
				uploadEventHandlers: {
					progress: function (e) {
						
						var Psubida = Math.round(e.loaded * 100 / e.total) / 100;

						$scope.Psubida = Psubida;
					}
				}
			})
			.then(function (data) {
				
				if(data.data.valor == 1){
					$scope.carga = !$scope.carga;
				}else{
					$scope.nocarga = !$scope.nocarga;					
				}
			})


	}
    

}]);

app.directive('fileInput', function ($parse) {
	return {
		restrict: 'A',
		link: function ($scope, element, attrs) {

			element.on('change', function () {
				var files = event.target.files;
                $parse(attrs.fileInput).assign($scope, element[0].files);
                console.log($parse(attrs.fileInput).assign($scope, element[0].files))
				$scope.$apply();

			});
		}
	}
});

app.directive('validFile', function () {
	return {
		require: 'ngModel',
		link: function (scope, el, attrs, ngModel) {
			el.bind('change', function () {
				scope.$apply(function () {
					ngModel.$setViewValue(el.val());
					ngModel.$render();
				});
			});
		}
	};
})