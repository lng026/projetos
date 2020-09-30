function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	log.info('inicio consulta tipos de despesas acer alterado');
	//Criando colunas
	dataset.addColumn("sku");
	dataset.addColumn("id");
	dataset.addColumn("accountName");
	dataset.addColumn("idAccount");
	dataset.addColumn("idInMarketplace");
	dataset.addColumn("marketPlace");
	dataset.addColumn("index");
	dataset.addColumn("publicationStatus");
	dataset.addColumn("marketplaceStatus");
	dataset.addColumn("price");
	dataset.addColumn("priceFactor");
	dataset.addColumn("discountPrice");
	dataset.addColumn("skuInMarketplace");
	dataset.addColumn("marketplaceItemCode");
	
	
	var param = getPametro(constraints,'sku');

	if(param){
		try {
			var cParams = getCustomParams('VTEX');
			// Conecta 
		   var restService = fluigAPI.getAuthorizeClientService();
		   var epoint = "v2/skus/"+ param+"/marketplaces";
		   var data = {
			   // Dados para chamar serviço
			   companyId: "1",
			   serviceCode: "anymarketApi",
			   endpoint: epoint,
			   method: 'get',
			   timeout:'1000',
			   // dados para chamada REst
			   options: {
				   encoding: 'UTF-8',
				   MediaType:  'application/json',
			   }, headers:{
				   "Accept": 'application/json',
				   "gumgaToken": "70900904L259030131E1657284263724C156397226372400O1.I"
					   
			   }
		   }
		   // chamada rest -  "gumgaToken": "70900904L259030131E1657284263724C156397226372400O1.I"
		   	//gumgaToken":  "L32091725G1590696730316R-1606014571"; -= sandbox
		   

		   var response = restService.invoke(JSONUtil.toJSON(data));
//		   
//		   dataset.addRow(new Array(response.getResult()));
		   var result = JSON.parse(response.getResult());
		   if(result){
			   for (var i = 0; i < result.length; i++) {
				   var item = result[i];
				   dataset.addRow(new Array(
					   param,
					   item.id,
					   item.accountName,
					   item.idAccount,
					   item.idInMarketplace,
					   item.marketPlace,
					   item.index,
					   item.publicationStatus,
					   item.marketplaceStatus,
					   item.price,
					   item.priceFactor,
					   item.discountPrice,
					   item.skuInMarketplace,
					   item.marketplaceItemCode
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