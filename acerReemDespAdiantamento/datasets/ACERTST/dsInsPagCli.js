function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
//	var dataset = DatasetBuilder.newDataset();
////	log.info('-- INTEGRACAO INSPAGCLI --');
//	//Criando colunas
//	dataset.addColumn("headers");
//	dataset.addColumn("result");
//	dataset.addColumn("params");
//	dataset.addColumn("httpRes");
	try {
		var dataset = DatasetBuilder.newDataset();
//		log.info('-- INTEGRACAO INSPAGCLI --');
		//Criando colunas
		dataset.addColumn("headers");
		dataset.addColumn("result");
		dataset.addColumn("params");
		dataset.addColumn("httpRes");
	  // Conecta 
      var restService = fluigAPI.getAuthorizeClientService();
	  var epoint = "/erpworks/api/v1/PgtoService";
	  var params = {};
	  log.info('constraints: ' + constraints);
	  var aPrNames = new Array('CID','CNPJ','CCGC','cPrefixo','cNatureza','nValor','cDataEmissao','cBanco','cAgencia','cConta','cHistorico','cCodBarras','cCentroCusto','cFormaPgto','cDataVencto');
		for (var i = 0; i < aPrNames.length; i++) {
			var p = aPrNames[i];
			log.info('ds p :' + p);
			var val = getCs(p,constraints);
			log.info('ds getCs :' + val);
			if(val){
				params[p] = val;
			}
		}
		log.info('constraints: ' + constraints);
		log.info('dsparams1: ' + params.CID);
		log.info('dsparams: ' +  params.cCentroCusto);
		log.info('dsparams json:' + JSONUtil.toJSON(params));
		var data = {
			// Dados para chamar serviço
			companyId: "1",
			serviceCode: "protheusRest",
			endpoint: epoint,
			method: 'post',
			timeout:'1000',
			params: params,
			options: {
				encoding: 'UTF-8',
			}
		}
		log.info('Data:' + JSONUtil.toJSON(data));
		// chamada rest
		var response = restService.invoke(JSONUtil.toJSON(data));
		var aResponse = new Array(
		response.getDescription(),
		response.getResult(),
		response.getStrParams(),
		response.getHttpStatusResult());
		dataset.addRow(aResponse);
		 log.info('ds response ' +response.getResult());
	} catch (e) {
		dataset.addRow(new Array(e,'null',constraints,'null'))
	}
	return dataset;

}function onMobileSync(user) {

}

function getCs(nome, constraints){
	var paramSolicitacao = '';
	   for (var i = 0; i < constraints.length; i++) {
			   if(constraints[i].fieldName == nome && constraints[i].initialValue.toString().trim() != ""){
				   paramSolicitacao = constraints[i].initialValue.toString().trim();
				   break;
			   }
	   }
   
   return paramSolicitacao;
}

