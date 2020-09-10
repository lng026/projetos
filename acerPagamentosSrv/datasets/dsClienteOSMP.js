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
		   		epoint += "z04cssnum="+param;	
			   epoint += "&fields=z04cssnum,z04produt,z04serie,z04cnpj"; 
			   epoint += ",z04nome,z04end,z04comple,z04bairro,z04cidade,z04estado,z04cep,z04ie,z04tel,z04email"; 
			   
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
					   cliente.z04cssnum,
					   cliente.z04serie,
					   cliente.z04produt,
					   cliente.z04cnpj,
					   cliente.z04nome,
					   cliente.z04end,
					   cliente.z04comple,
					   cliente.z04bairro,
					   cliente.z04cidade,
					   cliente.z04estado,
					   cliente.z04cep,
					   cliente.z04ie,
					   cliente.z04tel,
					   cliente.z04email
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
