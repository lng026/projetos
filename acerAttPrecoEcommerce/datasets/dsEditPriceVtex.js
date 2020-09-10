function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	log.info('inicio integracao alteracao preco vtex - dsEditPriceCtex');
	//Criando colunas
	dataset.addColumn("sku");
	dataset.addColumn("dados");
	dataset.addColumn("status");
	log.info("editPriceCons" + JSONUtil.toJSON(constraints));
	var param = getPametro(constraints,'sku');
	
	if(param){
		try {
			var dados = getPametroList(constraints,'dados');
			var fixedPrices = [];
			for (var i = 0; i < dados.length; i++) {
				var a = dados[i];
				var d = JSON.parse(a);
				delete d.saleChannel;
				if(!d.dateRange){
					delete d.dateRange;
				}
				fixedPrices.push(d);
			}
			var listPrice = getPametroList(constraints,'listPrice');
			var costPrice = getPametroList(constraints,'costPrice');
			var markup = getPametroList(constraints,'markup');
			var basePrice = getPametroList(constraints,'basePrice');
			var oDado = {
					"listPrice": listPrice != 0 ?  parseFloat(listPrice) : null,
					"costPrice":parseFloat(costPrice),
					"markup": parseFloat(markup),
					"fixedPrices" : fixedPrices
			};
			log.info("editPriceDados" + JSONUtil.toJSON(oDado))
//			dataset.addRow(new Array(JSONUtil.toJSON(oDado)));
//			 dataset.addRow(new Array(JSONUtil.toJSON(oDado)));
			var cParams = getCustomParams('VTEX');
			// Conecta 
		   var restService = fluigAPI.getAuthorizeClientService();
		   var epoint = ""+cParams['user']+"/pricing/prices/"+param+"";
		   var data = {
			   // Dados para chamar serviço
			   companyId: "1",
			   serviceCode: "vtexApi",
			   endpoint: epoint,
			   method: 'PUT',
			   timeout:'1000',
			   // dados para chamada REst
			   params: oDado,
			   options: {
				   encoding: 'UTF-8',
				   MediaType:  'application/json'
			   },
			   headers:{
				   "Accept": cParams['Accept'],
				   "X-VTEX-API-AppKey": cParams['AppKey'],
				   "X-VTEX-API-AppToken": cParams['AppToken'],
				   "content-type": "application/json"
			   }
		   }
		   // chamada rest
		   var response = restService.invoke(JSONUtil.toJSON(data));
		   var aResponse = new Array(
					response.getDescription(),
					response.getResult(),
					response.getStrParams()+"-"+
					response.getHttpStatusResult());
					dataset.addRow(aResponse);
//		   var response = restService.invoke(JSONUtil.toJSON(data));
//		   dataset.addRow(new Array(response.getResult()));
//		   var result = JSON.parse(response.getResult());
//		   if(result){
//			   for (var i = 0; i < result.fixedPrices.length; i++) {
//				   var item = result.fixedPrices[i];
//				   var range = '';
//				   if(item['dateRange'] != null){
//					  range = JSONUtil.toJSON(item.dateRange);
//				   }
//				   dataset.addRow(new Array(
//					param,
//					   item.tradePolicyId,
//					   item.value,
//					   item.listPrice,
//					   item.minQuantity,
//					   range
//				   ));
//			   }
//		   }
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

function getPametroList(constraints, campo){
	var param = [];
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == campo) {
            	var oDado = constraints[i].initialValue;
            	param.push(oDado);
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