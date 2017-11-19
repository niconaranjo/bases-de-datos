var app = angular.module('basesdedatosLogin',['ngRoute']);

app.controller('loginCtrl', ['$scope', '$http', function($scope, $http){

    //Variable para llamar login
    $scope.login = 'public/login.html';
    //Variables para el login
    $scope.enviado = false;
    $scope.validar = false;
    $scope.infouser = {};


    //variables que se usan en el registrar
    $scope.paises = {};
    $scope.userVal = {};    
    $scope.formRegister = {};
    $scope.idiomasselec = [];
    $scope.registroEx = false;
    $scope.registroNeg = false;
    
    $scope.idiomassecs = [
        {idioma:"Español", val:0, show:true},
        {idioma:"Ingles", val:1, show:true},
        {idioma:"Portugués", val:2, show:true}
    ];
    
    
    //funciones que se usan en idiomas
    $scope.agregarPais = function( idioma, val ){

        for (var i in $scope.idiomassecs) if($scope.idiomassecs[i].idioma === idioma ) $scope.idiomassecs[i].show = !$scope.idiomassecs[i].show;
        $scope.idiomasselec = $scope.idiomasselec.concat({idioma:idioma, val:val});
    }
    $scope.borrarPais = function( idioma ){        
        
        for (var i in $scope.idiomasselec)if($scope.idiomasselec[i].idioma === idioma ) $scope.idiomasselec.splice(i,1) ;
        for (var i in $scope.idiomassecs) if($scope.idiomassecs[i].idioma === idioma ) $scope.idiomassecs[i].show = !$scope.idiomassecs[i].show;

        //console.log( $scope.idiomasselec);
    };


    // funcion para crear usuario
    $scope.registroUsuario = function(){
        var arr = [];
        for(var i in $scope.idiomasselec  ) arr.push($scope.idiomasselec [i].val);
        $scope.formRegister.idioma = arr;
       
        $http.post('peticiones/login/register.php', $scope.formRegister  )
        .then(function(data){
            
            if(data.data.valor === '0'){
                //console.log(data.data.valor)
                $scope.registroNeg = true;
            }else{
                $scope.aux = {};
                $scope.aux.user =  $scope.formRegister.nickname;
                $scope.aux.pass =  $scope.formRegister.pass;
                $scope.registroEx = true;
                //console.log($scope.aux);
                $http.post('peticiones/login/login.php', $scope.aux)
                .then(function(data){
                    if(data.data.valor === '0' ){

                    }else{
                        
                        $scope.infouser =  data.data;
                        setTimeout(function(){
                            window.location = "editorial/index.html";
                        }, 2500);
                    }
                })
                
            }
        });
    };

    //funcion para obtener paises
    $scope.getPaises = function(){
        $http.get('peticiones/login/paises.php')
        .then(function(data){
            $scope.paises = data.data;            
        })
    };

    $scope.functionval = function(){
        
    }
    
    //funcion para hacer el login
    $scope.validarUsuario = function (){
        $scope.enviado = true;
        $http.post('peticiones/login/login.php', $scope.userVal)
                .then(function(data){
                    console.log(data.data.valor);
                    
                    if(data.data.valor === '0' ){
                        setTimeout(function(){
                            $scope.enviado = false;
                            $scope.validar = true;
                            $scope.$apply();
                        }, 3500);
                    }else{
                       
                        $scope.infouser =  data.data;
                        setTimeout(function(){
                            //window.location = "editorial/index.html";
                        }, 2500);
                    }
                })
    };

}])



/*

*/