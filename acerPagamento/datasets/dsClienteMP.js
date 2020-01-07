function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	log.info('inicio consulta tipos de despesas acer alterado');
	//Criando colunas
	dataset.addColumn("cgc");
	dataset.addColumn("nome");
	dataset.addColumn("endereco");
	dataset.addColumn("complemento");
	dataset.addColumn("cep");
	dataset.addColumn("estado");
	dataset.addColumn("cidade");
	dataset.addColumn("bairro");

	var param = getPametro(constraints,'cgc');

	if(param){
		try {
			// Conecta 
		   var restService = fluigAPI.getAuthorizeClientService();
		   var epoint = "/erpworks/api/v1/Clientes/?a1cgc="+param;
		   epoint += "&fields=a1msblql,a1cgc,a1nome,a1end,a1complem,a1cep,a1est,a1mun,a1bairro&a1msblql=2";
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
				   var cliente = result.items[i];
				   dataset.addRow(new Array(
					param,
					   cliente.a1nome,
					   cliente.a1end,
					   cliente.a1complem,
					   cliente.a1cep,
					   cliente.a1est,
					   cliente.a1mun,
					   cliente.a1bairro
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


// a1endcob ou a1end - endereco
// a1complem - complemento
// a1cep  - cep
// a1nome - nome
// a1est - estado
// a1mun - cidade
// a1bairro - bairro