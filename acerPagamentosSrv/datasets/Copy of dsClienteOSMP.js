function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	try {
		var dataset = DatasetBuilder.newDataset();
	log.info('inicio consulta tipos de despesas acer alterado');
	//Criando colunas
	dataset.addColumn("ticket");
	dataset.addColumn("serie");
	dataset.addColumn("produto");
	dataset.addColumn("cnpj");
	// -- //
	dataset.addColumn("nome");
	dataset.addColumn("endereco");
	dataset.addColumn("complemento");
	dataset.addColumn("bairro");
	dataset.addColumn("cidade");
	dataset.addColumn("estado");
	dataset.addColumn("cep");
	dataset.addColumn("inscricao");
	dataset.addColumn("tel");
	dataset.addColumn("email");

	var param = getPametro(constraints,'ticket');

	if(param){
		
			// Conecta 
		   var restService = fluigAPI.getAuthorizeClientService();
		   var epoint = "/erpworks/api/v1/Tickets/?"; //1250388X // 2192868X
		   		epoint += "z06cssnum="+param;	
			   epoint += "&fields=z06cssnum,z06produt,z06serie,z06cnpj"; 
			   epoint += ",z06nome,z06end,z06comple,z06bairro,z06cidade,z06estado,z06cep,z06ie,z06tel,z06email"; 
			   
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
					   cliente.z06cssnum,
					   cliente.z06serie,
					   cliente.z06produt,
					   cliente.z06cnpj,
					   cliente.z06nome,
					   cliente.z06end,
					   cliente.z06comple,
					   cliente.z06bairro,
					   cliente.z06cidade,
					   cliente.z06estado,
					   cliente.z06cep,
					   cliente.z06ie,
					   cliente.z06tel,
					   cliente.z06email
				   ));
			   }
		   }
		}else{
			dataset.addRow(new Array('Erro', "Informe cpf ou cnpj do cliente"));
		}
	   } catch (e) {
		   dataset.addRow(new Array(e.name, e.message));
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
