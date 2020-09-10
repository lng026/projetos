function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	log.info('inicio consulta tipos de despesas acer alterado');
	//Criando colunas
	dataset.addColumn("sku");
	dataset.addColumn("tradePolicyId");
	dataset.addColumn("value");
	dataset.addColumn("listPrice");
	dataset.addColumn("minQuantity");
	dataset.addColumn("dateRange");
	
	var param = getPametro(constraints,'sku');

	if(param){
		try {
			var cParams = getCustomParams('VTEX');
			// Conecta 
		   var restService = fluigAPI.getAuthorizeClientService();
		   var epoint = ""+cParams['user']+"/pricing/prices/"+param+"";
		   var data = {
			   // Dados para chamar serviço
			   companyId: "1",
			   serviceCode: "vtexApi",
			   endpoint: epoint,
			   method: 'get',
			   timeout:'1000',
			   // dados para chamada REst
			   options: {
				   encoding: 'UTF-8',
				   MediaType:  'application/json',
			   }, headers:{
				   "Accept": cParams['Accept'],
				   "X-VTEX-API-AppKey": cParams['AppKey'],
				   "X-VTEX-API-AppToken": cParams['AppToken']
			   }
		   }
		   // chamada rest

		   var response = restService.invoke(JSONUtil.toJSON(data));
//		   
//		   dataset.addRow(new Array(response.getResult()));
		   var result = JSON.parse(response.getResult());
		   if(result){
			   var bPrice = {
					"itemId": result.itemId,
					"listPrice": result.listPrice,
					"costPrice": result.costPrice,
					"markup":result.markup,
					"basePrice":result.basePrice,
			   };
			   dataset.addRow(new Array(JSONUtil.toJSON(bPrice)));
			   for (var i = 0; i < result.fixedPrices.length; i++) {
				   var item = result.fixedPrices[i];
				   var range = '';
				   if(item['dateRange'] != null){
					  range = JSONUtil.toJSON(item.dateRange);
				   }
				   dataset.addRow(new Array(
					param,
					   item.tradePolicyId,
					   item.value,
					   item.listPrice,
					   item.minQuantity,
					   range
				   ));
			   }
		   }
	   } catch (e) {
		   dataset.addRow(new Array(e.name, e.message));
	   }
	}else{
		dataset.addRow(new Array('Erro', "Informe o sku do produto"));
	}
	

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