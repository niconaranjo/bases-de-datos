app.controller('nuevoArticuloCtrl', ['$scope', '$http', function ($scope, $http) {
	
	$scope.setActive("mnuevoArticulo");
	$scope.stroke = '#2074b1';
	$scope.carga = true;
	$scope.nocarga = false;
	$scope.idiomasselec = [];
	
	$scope.idiomassecs = [
		{ idioma: "Español", val: 0, show: true },
		{ idioma: "Ingles", val: 1, show: true },
		{ idioma: "Portugués", val: 2, show: true }
	];
	$scope.showModal = false;
	$scope.file = "";
	$scope.Psubida = 0.01;

	$scope.starter = function( ){
		if(!$scope.IsAutor){
			window.location = "index.html";
		}
	}
	$scope.agregarPais = function (idioma, val) {
		for (var i in $scope.idiomassecs) if ($scope.idiomassecs[i].idioma === idioma) $scope.idiomassecs[i].show = !$scope.idiomassecs[i].show;
		$scope.idiomasselec = $scope.idiomasselec.concat({ idioma: idioma, val: val });
	}
	$scope.borrarPais = function (idioma) {

		for (var i in $scope.idiomasselec) if ($scope.idiomasselec[i].idioma === idioma) $scope.idiomasselec.splice(i, 1);
		for (var i in $scope.idiomassecs) if ($scope.idiomassecs[i].idioma === idioma) $scope.idiomassecs[i].show = !$scope.idiomassecs[i].show;

	};

	$scope.mostrar_alerta = function () {

	}
	$scope.subir = function () {
		$scope.showModal = !$scope.showModal;
		$scope.Psubida = 0.01;
		var arr = [];
		for (var i in $scope.idiomasselec) arr.push($scope.idiomasselec[i].val);
		$scope.formData.idioma = arr;

		$scope.formData.file_a = $scope.file_a;
		$scope.formData.file_b = $scope.file_b;
		$scope.formData.file_c = $scope.file_c;
		$scope.formData.recursos = $scope.recursos;
		$scope.carga = true;

		var fd = new FormData();
		angular.forEach($scope.formData, function (value, key) {
			if (key === 'file_a' || key === 'file_b' || key == 'file_c') {
				fd.append(key, value[0]);

			} else {
				if (key === 'recursos') {
					angular.forEach($scope.formData.recursos, function (file, key) {
						fd.append('images' + key, file);
					});
				} else {
					fd.append(key, value);
				}
			}
		});


		$http
			.post('../peticiones/articulos/nuevoarticulo.php', fd, {
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
	
	$scope.hide = function(){
        $scope.showModal = !$scope.showModal;
    }
}]);


app.directive('fileInput', function ($parse) {
	return {
		restrict: 'A',
		link: function ($scope, element, attrs) {

			element.on('change', function () {
				var files = event.target.files;
				$parse(attrs.fileInput).assign($scope, element[0].files);
				$scope.$apply();

			});
		}
	}
});

app.directive('fileInputImage', function ($parse) {
	return {
		restrict: 'A',
		link: function ($scope, element, attrs) {

			var model = $parse(attrs.fileInputImage);
			var isMultiple = attrs.multiple;
			var assign = model.assign;

			element.bind('change', function () {
				var filesI = [];
				angular.forEach(element[0].files, function (item) {
					filesI.push(item);
				});
				$scope.$apply(function () {
					if (isMultiple) {
						assign($scope, filesI);
					} else {
						assign($scope, filesI[0]);
					}
				});

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



