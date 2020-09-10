function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	log.info("dataset customConfigs");
	//dataset com configurações dinamica para diminuir hardcode
	var dataset = DatasetBuilder.newDataset();
	//Criando colunas
	dataset.addColumn("categoria");
	dataset.addColumn("parametro");
	dataset.addColumn("valor");
	//verifica filtro de categoria
	var cat = '';
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "categoria") {
            	cat = constraints[i].initialValue;
            }
		}
	}
	//adicionando parametros
	var params = getParametros();
	//aplica filtro se informado
	for (var i = 0; i < params.length; i++) {
		var p = params[i];
		//se categoria foi informado e é diferente da categoria do item ele é pulado
		if(cat.toString().trim() != "" && cat.toString().trim() != p.categoria.toString().trim()){
			continue;
		}else{
			dataset.addRow(new Array(p.categoria,p.param, p.value));
		}
	}
	
	
	return dataset;
	
	

}function onMobileSync(user) {

}
//objeto com o parametros
function getParametros(){
	// array com objs parametros
	var aParametros = new Array();
	
	// aParametros.push(nParam("categoria","parametro","valor"));
	// cada linha adiciona um valor para retornar no dataset
	aParametros.push(nParam("WSFLUIG","pre","_223._60._94._187._12547"));
	aParametros.push(nParam("WSFLUIG","servico",".WSFLUIG"));
	aParametros.push(nParam("reembDesp","taxa_gas","0.85"));
	aParametros.push(nParam("adtDesp","natureza","22105"));
	aParametros.push(nParam("adtDesp","prefixo","ADT"));
	aParametros.push(nParam("adtDesp","formPag","87"));
	aParametros.push(nParam("adtDesp","cnpjPag","11068167000100"));
	aParametros.push(nParam("adtDesp","valorMax","10000,00"));
	aParametros.push(nParam("attPreco","taxSobreCusto","30.0"));
	aParametros.push(nParam("VTEX","Accept","application/vnd.vtex.pricing.v3+json"));
	aParametros.push(nParam("VTEX","AppKey","vtexappkey-acerstore-XEEQCO"));
	aParametros.push(nParam("VTEX","AppToken","GSMZIFRRGDGWRTJEJNABOWZJRXLZOWFGDNQJPFNDCHWMVKPAWJDWSPEKSDILTRCJXZTDCZPEAXZGZNNGILDFSIOOJGQMWCJKEMOVRLYXUZWVPXKFPBCIOXROLFTVICHY"));
	aParametros.push(nParam("VTEX","user","acerstore"));

	return aParametros;
}
//monta parametro
function nParam(cat,name,value){
	return {
		'categoria': cat,
		'param': name,
		'value': value,
		 };
}

//
/* funcção que busca os parametros neste dataset emonta array para ser usado facilmente em outro dataset
a função deve ser copiada para o dataset que ir consulta este

var cParams = getCustomParams(NOME_SERVICO);
var CAMINHO_SERVICO = cParams['pre']+cParams['servico']; 
//Funcao que busca parametros no dataset com configuracoes customizadas 
function getCustomParams(cat){
	var c1 = DatasetFactory.createConstraint('categoria',cat,cat, ConstraintType.MUST);
	var ds = DatasetFactory.getDataset('customConfigs', null, new Array(c1), null);
	aParametros = new Array();
	for (var i = 0; i < ds.rowsCount; i++) {
		aParametros[ds.getValue(i, 	'parametro')] = ds.getValue(i, 	'valor');
	}
//	for (var i = 0; i < ds.values.length; i++) {
//		aParametros[ds.values[i]['parametro']] = ds.values[i]['valor'];
//	}
	return aParametros;
}

*/