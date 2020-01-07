function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	log.info('inicio consulta fornecedores acer');
	//Criando colunas
	dataset.addColumn("CCGC");
	dataset.addColumn("CCHAVENFE");
	dataset.addColumn("CDATAEMISSAO");
	dataset.addColumn("CSERIENOTA");
	dataset.addColumn("CNOTAFISCAL");
	dataset.addColumn("NVALOR");
	/*dataset.addColumn("Cond_normal");
	dataset.addColumn("Centro_de_custo");*/

	var param = '';
	var param2 = '';
	var param3 = '';
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) { 
            if (constraints[i].fieldName == "CCGC") {
            	param = constraints[i].initialValue.toString();
            }
		}
	}
	//dataset.addRow(new Array(param.length.toString(), param)) ;
	if(param != '' && param.length() > 2 ){
		try {
			var caminho = '_223._60._94._187._12547.WSFLUIG';
			 // Conecta o servico e busca os livros
		    var periodicService = ServiceManager.getService('WSFLUIG');
		    var serviceHelper = periodicService.getBean();
		    var serviceLocator = periodicService.instantiate(caminho);
		    var service = serviceLocator.getWSFLUIGSOAP();
		    //log.info('service:' + service);

		    var cliResponse = service.getchavesnfe(param.toUpperCase());
		    var cli = cliResponse.getDADOSCHAVE();
		    //dataset.addRow(new Array(brw.get(0).toString(),brw.get(0).getDESCRIPTION()));
		  for (var i = 0; i < cli.size(); i++) {
				 dataset.addRow(new Array(param,
						 cli.get(i).getCCHAVENFE(),
						 cli.get(i).getCDATAEMISSAO(),
						 cli.get(i).getCSERIENOTA(),
						 cli.get(i).getCNOTAFISCAL(),
						 cli.get(i).getNVALOR() ));
			}

		} catch (e) {
			dataset.addRow(new Array(e.name, e.message));
		}

	}else{
		dataset.addRow(new Array('Erro', "Informe o CNPJ do fornecedor"));
	}
	return dataset;

}function onMobileSync(user) {

}