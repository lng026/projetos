function defineStructure() {

}
function onSync(lastSyncDate) {
	
}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	log.info('inicio consulta tipos de despesas acer alterado');
	//Criando colunas
	dataset.addColumn("Empresa");
	dataset.addColumn("Cidade");


		try {
             // Conecta 
            var restService = fluigAPI.getAuthorizeClientService();
            var epoint = "/api/framework/environment/v1/branches";
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
					var branch = result.items[i];
					dataset.addRow(new Array(branch.Description,branch.BillingCity));
				}
		    }
		} catch (e) {
			dataset.addRow(new Array(e.name, e.message));
		}

	return dataset;


}
function onMobileSync(user) {

}
