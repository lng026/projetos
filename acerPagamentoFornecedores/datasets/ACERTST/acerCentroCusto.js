function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	log.info('inicio consulta centro de custo');
	//Criando colunas
	dataset.addColumn("CCENTROCUSTO");
	dataset.addColumn("CDESCRICAO");
	/*dataset.addColumn("Cond_normal");
	dataset.addColumn("Centro_de_custo");*/

	var param = '';
	var param2 = '';
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "CCENTROCUSTO") {
            	param = constraints[i].initialValue.toString().trim();
            }
            if (constraints[i].fieldName == "CDESCRICAO") {
            	param2 = constraints[i].initialValue.toString().trim();
            }
		}
	}
	//dataset.addRow(new Array(param.length.toString(), param)) ;
	//if((param != '' && param.length() > 2) || (param2 != '' &&  param2.length() > 2 )){
		try {
			var caminho = 'br.com.totvscloud.mw0sd1_tst_protheus._33485.WSFLUIG';
			 // Conecta o servico e busca os livros
		    var periodicService = ServiceManager.getService('WSFLUIG');
		    var serviceHelper = periodicService.getBean();
		    var serviceLocator = periodicService.instantiate(caminho);
		    var service = serviceLocator.getWSFLUIGSOAP();
		    //log.info('service:' + service);

		    var cliResponse = service.getcentrocusto(param.toUpperCase(),param2.trim());
		    var cc = cliResponse.getCENTROCUSTO();
		    //dataset.addRow(new Array(brw.get(0).toString(),brw.get(0).getDESCRIPTION()));
		  for (var i = 0; i < cc.size(); i++) {
				 dataset.addRow(new Array(
						 cc.get(i).getCCENTROCUSTO().trim(),
						 cc.get(i).getCDESCRICAO().trim()
				 ));
			}

		} catch (e) {
			dataset.addRow(new Array(e.name, e.message));
		}

	//}else{
	//	dataset.addRow(new Array('Erro', "Informe o nome do cliente"));
	//}
	return dataset;


}function onMobileSync(user) {

}