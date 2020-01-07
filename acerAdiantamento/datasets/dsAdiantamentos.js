function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	log.info('inicio consulta tipos de despesas acer alterado');
	//Criando colunas
	dataset.addColumn("cgc");
	dataset.addColumn("fornecedor");
	dataset.addColumn("num");
	dataset.addColumn("prefixo");
	dataset.addColumn("tipo");
	dataset.addColumn("emissao");
	dataset.addColumn("vencimento");
	dataset.addColumn("saldo");
	dataset.addColumn("valor");
	dataset.addColumn("hist");

	var param = getPametro(constraints,'cgc');

	if(param){
		try {
			// Conecta 
		   var restService = fluigAPI.getAuthorizeClientService();
		   var epoint = "/erpworks/api/v1/AdtoContasPagar";
		   epoint += "?fields=e2fornece,e2num,e2prefixo,e2tipo,e2emissao,e2vencrea,e2valor,e2saldo,e2hist,a2cgc";
		   epoint += "&a2cgc=" + param; 
		   //14856969846
		   //log.info('service:' + service);
		   
		   var data = {
			   // Dados para chamar serviço
			   companyId: "1",
			   serviceCode: "protheusRest",
			   endpoint: epoint,
			   method: 'get',
			   timeout:'1000',
			   // dados para chamada REst
			   options: {
				   encoding: 'UTF-8',
				   MediaType:  'application/json'
			   }
		   }
		   // chamada rest

		   var response = restService.invoke(JSON.stringify(data));
		   var result = JSON.parse(response.getResult());
		   if(result){
			   for (var i = 0; i < result.items.length; i++) {
				   var adt = result.items[i];
				   dataset.addRow(new Array(
					   adt.a2cgc,
					   adt.e2fornece,
					   adt.e2num,
					   adt.e2prefixo,
					   adt.e2tipo,
					   adt.e2emissao,
					   adt.e2vencrea,
					   adt.e2saldo,
					   adt.e2valor,
					   adt.e2hist
				   ));
			   }
		   }
	   } catch (e) {
		   dataset.addRow(new Array(e.name, e.message));
	   }
	}else{
		dataset.addRow(new Array('Erro', "Informe cpf ou cnpj do cliente"));
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
