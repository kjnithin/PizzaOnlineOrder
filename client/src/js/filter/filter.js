app.filter('firstCapital',[ function() {
    return function(input) {
        var  name = input.split(" ");
        var finalInput = [];
        for (var i=0; i<name.length;i++){
            finalInput = finalInput+name[i].charAt(0).toUpperCase()+name[i].slice(1).toLowerCase();
            finalInput=finalInput+" ";
        }
        return finalInput;
    };
}]);

app.filter('capitalize',[ function(){
    return function(input){
        var name = input.split(" ");
        var finalInput = [];
        for(var i=0;i<name.length;i++){
            finalInput = finalInput+name[i].toUpperCase();
            finalInput=finalInput+" ";
        }
        return finalInput;
    };
}]);
