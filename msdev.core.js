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

Array.method('pop', function(){
	return this.splice(this.lenght - 1, 1)[0];
});
// Ex: var a = ['a','b','c'];
//     var b = a.pop(); ==> a ficará ['a','b'] e b ficará 'c'

Array.method('shift', function(){
	return this.splice(0,1)[0];
});
// Ex: var a = ['a','b','c'];
//     var b = a.shift(); ==> a ficará ['b','c'] e b ficará 'a'

Array.method('push', function(){
	this.splice.apply(
		this, 
		[this.length, 0].concat(Array.prototype.slice.apply(arguments))
	);
	
	return this.lenght;
});
// Ex: var a = ['a','b','c'];
//     var b = ['x','y','z'];
//     var c = a.push(b, true); ==>  a ficará ['a','b','c', ['x','y','z'], true] e c ficará 5
rray.method('unshift', function(){
	this.splice.apply(
		this, 
		[0, 0].concat(Array.prototype.slice.apply(arguments))
	);
	
	return this.lenght;
});
// Ex: var a = ['a','b','c'];
//     var c = a.unshift('x','y'), true); ==>  a ficará ['x','y', 'a','b','c'] e c ficará 5


