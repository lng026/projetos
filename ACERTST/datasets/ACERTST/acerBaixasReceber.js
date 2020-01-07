function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	log.info('inicio consulta centro de custo');
	//Criando colunas
	dataset.addColumn("CKEY");
	dataset.addColumn("CDATABAIXA");
	dataset.addColumn("NVALOR");
	/*dataset.addColumn("Cond_normal");
	dataset.addColumn("Centro_de_custo");*/

	var param = '';
	var param2 = '';
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "CKEY") {
            	param = constraints[i].initialValue.toString().trim();
            }
		}
	}
	//dataset.addRow(new Array(param.length.toString(), param)) ;
	//if((param != '' && param.length() > 2) || (param2 != '' &&  param2.length() > 2 )){
	if(param != ""){
		try {
			var caminho = '_223._60._94._187._12547.WSFLUIG';
			 // Conecta o servico e busca os livros
		    var periodicService = ServiceManager.getService('WSFLUIG');
		    var serviceHelper = periodicService.getBean();
		    var serviceLocator = periodicService.instantiate(caminho);
		    var service = serviceLocator.getWSFLUIGSOAP();
		    //log.info('service:' + service);

		    var bxResponse = service.getbaixasreceber(param.toString());
		    var bxRList = bxResponse.getBAIXASRECEBER();
		    // dataset.addRow(new Array(param,bxRList));
			for (var i = 0; i < bxRList.size(); i++) {
				dataset.addRow(new Array(
						param,
						bxRList.get(i).getCDATABAIXA(),
						bxRList.get(i).getNVALOR()
				));
			}

		} catch (e) {
			dataset.addRow(new Array(e.name, e.message));
		}

	}else{
		dataset.addRow(new Array('Erro', "Informe o nome do cliente"));
	}
	return dataset;

}function onMobileSync(user) {

}