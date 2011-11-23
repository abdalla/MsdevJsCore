/**
 * @author Carlos Abdalla
 * Msdev
 */

Function.prototype.method = function (name, func){
	if(!this.prototype[name]){
		this.prototype[name] = func;
	}
	return this;
};

Number.method('integer', function (){
	return Math[this < 0 ? 'ceiling': 'floor'](this);
});
//Ex: (10-3).integer();


String.method('trim', function (){
	return this.replace(/^\s+|\s+$/g, '');
});
//Ex: '  xpto  '.trim();

String.method('deentityify', function(){
	//Mapeia nomes de entidades para caracteres.
	var entity = {
		quot: '"',
		lt: '<',
		gt: '>'	
	};
	
	return function(){
		return this.replace(/&([ˆ&;]+);/g, 
			function (a, b){
				var r = entity[b];
				return typeof r === 'string' ? r : a;
			});	
	};
}());
//Ex: '&lt;&quot;&gt;'.deentityify() ==> <">

var isArray = function (value){
	return value && 
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		typeof value.splice === 'function' &&
		!(value.propertyIsEnumerable('length'));
};

//Criar uma Matriz XxY setando inicialmente os valores
Array.matrix = function (x, y, initial){
	var a, i, j, mat = [];
	for(i=0; i < x; i += 1){
		a = [];
		for(j=0; j < y; j += 1){
			a[j] = initial;
		}
		mat[i] = a;
	}
	return mat;
}
//Ex: var matrixXpto = Array.matrix(4, 4, 0);
//    alert(matrixXpto[1][2]); ==> 0

