/**
 *  Consulta em Datasets
 */


var ConsultaPlanoContas = function(id){

	//Realiza constraint de consulta para Dataset Plano_de_contas
	var c2 = DatasetFactory.createConstraint("cod_conta", id, id, ConstraintType.MUST);

	//Trasforma consulta em ARRAY
	var conteudo = new Array(c2);

	//Executa consulta
	var datasetconsul = DatasetFactory.getDataset("data_plano_de_contas", null, conteudo, null);
	//var datasetconsul = DatasetFactory.getDataset("data_plano_de_contas", null,conteudo,null);


	return datasetconsul;

}

//Preenche campo com a consulta do Dataset
var PreencheCampo = function(dataset,coluna,campo){

	var valor;

	for (var i = 0; i < dataset.values.length; i++) {

		valor = dataset.values[i][coluna];

		$(campo).val(valor);

	}
}




//Consulta de usuario
var consultaUsuario = function(nome){
	var c2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", nome, nome, ConstraintType.MUST);

	//Trasforma consulta em ARRAY
	var conteudo = new Array(c2);

	//Executa consulta
	var datasetconsul = DatasetFactory.getDataset("colleague", null, conteudo, null);

	return datasetconsul;
}


var buscaAprovador = function(matricula){
	var aprov = 0;
	var dataset = DatasetFactory.getDataset("dsFuncionariosAprovadores", null, null, null);
	for (var i = 0; i < dataset.values.length; i++) {
		var mat = intOrString(dataset.values[i]['matricula']);
		if(mat == intOrString(matricula)){
			aprov = dataset.values[i]['aprovador'];
		}
	}
	return intOrString(aprov);
}

var intOrString = function(val){
	if(Number.isInteger(Number(val))){
		val = Number(val);
	}
	return val;
}

// var teste = function(){
// 	var campos = new Array('teste 1', 'descricao 2');
// 	var dataset = DatasetFactory.getDataset("teste", campos, null, null);
// 	for (var i = 0; i < dataset.values.length; i++) {
// 		console.log(dataset.values[i]['teste'] + ' - ' + dataset.values[i]['descricao'] )
// 	}
// }

var teste = function(){
	return 0; 
}
