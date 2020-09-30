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
			var sku =getPametroList(constraints,'sku');
			var idMarketplace =getPametroList(constraints,'id');
			var price =getPametroList(constraints,'price');
//			var priceFactor =getPametroList(constraints,'priceFactor');
			var discountPrice =getPametroList(constraints,'discountPrice');
			var oDado = {
					"price":parseFloat(price).toFixed(2),
//					"priceFactor":  parseFloat(priceFactor),
					"discountPrice": parseFloat(discountPrice).toFixed(2),
					"fields": {"HAS_DISCOUNT":"true"}
			};

			log.info("editPriceDados" + JSONUtil.toJSON(oDado));
//			dataset.addRow(new Array(JSONUtil.toJSON(oDado)));
//			 dataset.addRow(new Array(JSONUtil.toJSON(oDado)));
			// Conecta 
		   var restService = fluigAPI.getAuthorizeClientService();
		   var epoint = "v2/skus/"+sku+"/marketplaces/"+idMarketplace;
		   log.info("editPriceDados epoint " + epoint);
		   var data = {
			   // Dados para chamar serviço
			   companyId: "1",
			   serviceCode: "anymarketApi",
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
					"Accept": 'application/json',
					"gumgaToken": "70900904L259030131E1657284263724C156397226372400O1.I"
			   }
		   }
		   	//"gumgaToken": "70900904L259030131E1657284263724C156397226372400O1.I" ->  prod
		   	//"gumgaToken": "L32091725G1590696730316R-1606014571" - sandbox
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