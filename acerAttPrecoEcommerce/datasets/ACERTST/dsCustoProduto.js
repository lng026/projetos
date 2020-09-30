function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	log.info('inicio consulta tipos de despesas acer alterado');
	//Criando colunas
	dataset.addColumn("codproduto");
	dataset.addColumn("descproduto");
	dataset.addColumn("filial");
	dataset.addColumn("local");
	dataset.addColumn("qatu");
	dataset.addColumn("vatul");
	dataset.addColumn("cml");
	dataset.addColumn("b1xidsku");
	dataset.addColumn("zeaidweb");

	var param = getPametro(constraints,'codproduto');

	if(param){
		try {
			// Conecta 
		   var restService = fluigAPI.getAuthorizeClientService();
		   var epoint = "/erpworks/api/v1/Estoques/?b1cod="+param;
		   epoint += "&fields=b1cod,b1desc,b2filial,b2local,b2qatu,b2vatu1,b2cm1,b1xidsku,zeaidweb";
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
//		   dataset.addRow(new Array(response.getResult()));
		   var result = JSON.parse(response.getResult());
		   if(result.items){
			   for (var i = 0; i < result.items.length; i++) {
				   var cliente = result.items[i];
				   dataset.addRow(new Array(
					   cliente.b1cod,
					   cliente.b1desc,
					   cliente.b2filial,
					   cliente.b2local,
					   cliente.b2qatu,
					   cliente.b2vatu1,
					   cliente.b2cm1,
					   cliente.b1xidsku,
					   cliente.zeaidweb
				   ));
			   }
		   }else{
			   dataset.addRow(new Array(result.errorCode, result.errorMessage));
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


// a1endcob ou a1end - endereco
// a1complem - complemento
// a1cep  - cep
// a1nome - nome
// a1est - estado
// a1mun - cidade
// a1bairro - bairro