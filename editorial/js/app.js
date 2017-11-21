var app = angular.module('basesdedatosApp',[ 'ngRoute', 'jcs-autoValidate','angular-progress-arc', 'ngSanitize']);

angular.module('jcs-autoValidate').run([
    'defaultErrorMessageResolver',
    function (defaultErrorMessageResolver) {
        defaultErrorMessageResolver.setI18nFileRootPath('../public/js/lib/lang');
        defaultErrorMessageResolver.setCulture('es-CO');
}]);

app.controller('appCtrl', ['$scope', '$http', function($scope, $http){

    //Template
    $scope.menu = 'template/menu.html';
    //variable de usuario
    $scope.usuer = {};
    $scope.sessionIs = true;
    $scope.sessionNo = false;
    $scope.IsAutor = false;
    $scope.IsRevisor = false;
    $scope.IsEditor = false;
    $scope.IsSuper = false;
    $scope.Session = function(){
        $scope.verif = {val:'0668ac44-c091-4396-b2c7-d1ab137d4794'};
        $http.post('../peticiones/login/session.php', $scope.verif  )
        .then(function(data){
            console.log(data.data)
            $scope.usuer = data.data;
            if(data.data.err){
                $scope.sessionNo = true;
                $scope.sessionIs = false;
                setTimeout(function(){
                    window.location = "../index.html";
                }, 3000);
            }else{
                $scope.sessionIs = true;
                $scope.sessionNo = false;
            }
            if($scope.usuer.tipo_usuario == '0'){
                $scope.IsAutor = !$scope.IsAutor;
            }else if($scope.usuer.tipo_usuario == '1'){$scope.IsRevisor = !$scope.IsRevisor}
            else if($scope.usuer.tipo_usuario == '2'){$scope.IsEditor = !$scope.IsEditor}
            else if($scope.usuer.tipo_usuario == '4'){$scope.IsAutor = !$scope.IsAutor; $scope.IsRevisor = !$scope.IsRevisor;$scope.IsEditor = !$scope.IsEditor; $scope.IsSuper = !$scope.IsSuper; }

        });
    }
    $scope.destroy = function(){
        $http.post('../peticiones/login/endsession.php')
             .then( function( data ){
                window.location = "../index.html";
             })
    }
    
    $scope.setActive = function(Opcion){

        $scope.marticulos = "";
        $scope.mDashboard = "";
        $scope.mnuevoArticulo = "";
        $scope.masignar = "";
        $scope.masignareditor = "";
        $scope.mverarticulos = "";
        $scope.mrevision = "";

        $scope[Opcion] = "active";

    }
    
}]);
    
app.config( function( $routeProvider ){
    
    $routeProvider
        .when('/',{
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        })   
        .when('/articulo',{
            templateUrl: 'dashboard/autor/articulos.html',
            controller: 'articulosCtrl'
        }) 
        .when('/nuevo-articulo',{
            templateUrl: 'dashboard/autor/nuevo-articulo.html',
            controller: 'nuevoArticuloCtrl'
        }) 
        .when('/asignar-articulos',{
            templateUrl: 'dashboard/editor/asignar.html',
            controller: 'asignarCtrl'
        })
        .when('/asignar-editor',{
            templateUrl: 'dashboard/editor/asignareditor.html',
            controller: 'asignarEditorCtrl'
        })  
        .when('/articulos-asignados',{
            templateUrl: 'dashboard/revisor/verarticulos.html',
            controller: 'verarticulosCtrl'
        }) 
        .when('/subir-revision',{
            templateUrl: 'dashboard/revisor/revision.html',
            controller: 'revisionCtrl'
        }) 
        .otherwise({
        redirectTo: '/'
        })
    
})

app.filter('Tuser', function(){

    var defTipoUser = function(dato){
        var Tuser ="";

        if(dato == '0'){
            Tuser='Autor';
        }else if(dato == '1'){
            Tuser='Revisor';
        }
        else if(dato == '2'){
            Tuser='Editor';
        }
        return Tuser;
    }

    return defTipoUser;

});

app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

app.filter('idiomas', function(){
    return function(data) {
       var obj = "";
       try{

       
        var datos = data.split(",");
        for(i = 0; i< datos.length; i++){

                if(datos[i] == '0'){
                    obj+="Español"
                }
                if(datos[i] == '1'){
                    obj+="Inglés"
                }
                if(datos[i] == '2'){
                    obj+="Portugués"
                }
                if(i < datos.length-1)obj+=", "
                
        }
        return obj;
        }catch(e){}

      }
});


app.filter('recursos', function(){
    return function(data) {
       var obj = "";
       try{

       
        var datos = data.split(",");
        for(i = 0; i< datos.length; i++){
            datos[i] =  datos[i].replace(/\s/g, '');
            obj += '<a href="../articulos/recursos/'+datos[i]+'" download> '+ datos[i] +' </a> <br>';
                
        }
        return obj;
        }catch(e){}

      }
});


app.directive('modal', function () {
	return {
		template: '<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"><div class="modal-dialog modal-{{tam}}"><div class="modal-content" ng-transclude><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Modal title</h4></div></div></div></div>',
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: { visible: '=', onSown: '&', onHide: '&',  tam: '@'  },
		link: function postLink(scope, element, attrs) {

			$(element).modal({
				show: false,
				keyboard: attrs.keyboard,
				backdrop: attrs.backdrop
			});

			scope.$watch(function () { return scope.visible; }, function (value) {

				if (value == true) {
					$(element).modal('show');
				} else {
					$(element).modal('hide');
				}
			});

			$(element).on('shown.bs.modal', function () {
				scope.$apply(function () {
					scope.$parent[attrs.visible] = true;
				});
			});

			$(element).on('shown.bs.modal', function () {
				scope.$apply(function () {
					scope.onSown({});
				});
			});

			$(element).on('hidden.bs.modal', function () {
				scope.$apply(function () {
					scope.$parent[attrs.visible] = false;
				});
			});

			$(element).on('hidden.bs.modal', function () {
				scope.$apply(function () {
					scope.onHide({});
				});
			});
		}
	};
}
)

app.directive('modalHeader', function () {
	return {
		template: '<div class="modal-header"><h4 class="modal-title">{{title}}</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
		replace: true,
		restrict: 'E',
		scope: { title: '@' }
	};
})

app.directive('modalBody', function () {
	return {
		template: '<div class="modal-body" ng-transclude></div>',
		replace: true,
		restrict: 'E',
		transclude: true
	};
})

app.directive('modalFooter', function () {
	return {
		template: '<div class="modal-footer" ng-transclude></div>',
		replace: true,
		restrict: 'E',
		transclude: true
	};
});