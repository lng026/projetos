function defineStructure() {

}
function onSync(lastSyncDate) {
}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	log.info('inicio consulta tipos de despesas acer alterado');
	//Criando colunas
	dataset.addColumn("Id");
	dataset.addColumn("Name");
	dataset.addColumn("IsActive");
	
//	var param = getPametro(constraints,'sku');
//
//	if(param){
		try {
			var cParams = getCustomParams('VTEX');
			// Conecta 
		   var restService = fluigAPI.getAuthorizeClientService();
		   var epoint = "/catalog_system/pvt/saleschannel/list";
		   var data = {
			   // Dados para chamar serviço
			   companyId: "1",
			   serviceCode: "vtexcommercestable",
			   endpoint: epoint,
			   method: 'get',
			   timeout:'1000',
			   // dados para chamada REst
			   options: {
				   encoding: 'UTF-8',
				   MediaType:  'application/json',
			   }, headers:{
				   "Accept": 'application/json',
				   "X-VTEX-API-AppKey": cParams['AppKey'],
				   "X-VTEX-API-AppToken": cParams['AppToken'],
				   "content-type": "application/json"
			   }
		   }
		   // chamada rest

		   var response = restService.invoke(JSONUtil.toJSON(data));
//		   dataset.addRow(new Array(response.getResult()));
		   var result = JSON.parse(response.getResult());
		   if(result){
			   for (var i = 0; i < result.length; i++) {
				   var item = result[i];
				   var range = '';
				   dataset.addRow(new Array(
					   item.Id,
					   item.Name,
					   item.IsActive
				   ));
			   }
		   }
	   } catch (e) {
		   dataset.addRow(new Array(e.name, e.message));
	   }
//	}else{
//		dataset.addRow(new Array('Erro', "Informe o sku do produto"));
//	}
	

	return dataset;
	
	

}function onMobileSync(user) {

}

function getPametro(constraints, campo){
	var param = '';
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == campo) {
            	param = constraints[i].initialValue;
            }
		}
	}
	return param;
}

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