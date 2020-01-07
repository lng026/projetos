function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	log.info('inicio consulta forma pagamento');
	//Criando colunas
	dataset.addColumn("CFORMAPGTO");
	dataset.addColumn("CDESCRICAO");
	/*dataset.addColumn("Cond_normal");
	dataset.addColumn("Centro_de_custo");*/

	var pDoc = '';
	/*if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "NNDOCUMENTO") {
            	pDoc = constraints[i].initialValue.toString().trim();
            }
    	}
	}*/
	//dataset.addRow(new Array(param.length.toString(), param)) ;

		try {
			var caminho = 'br.com.totvscloud.mw0sd1_tst_protheus._33485.WSFLUIG';
			 // Conecta o servico e busca os livros
		    var periodicService = ServiceManager.getService('WSFLUIG');
		    var serviceHelper = periodicService.getBean();
		    var serviceLocator = periodicService.instantiate(caminho);
		    var service = serviceLocator.getWSFLUIGSOAP();
		    //log.info('service:' + service);

		    var cliResponse = service.getformapagamento('','');
		    var cc = cliResponse.getFORMAPAGAMENTO();
		    //dataset.addRow(new Array(brw.get(0).toString(),brw.get(0).getDESCRIPTION()));
		  for (var i = 0; i < cc.size(); i++) {
				 dataset.addRow(new Array(
						 cc.get(i).getCFORMAPGTO().trim(),
						 cc.get(i).getCDESCRICAO().trim()
				 ));
			}

		} catch (e) {
			dataset.addRow(new Array(e.name, e.message));
		}

	
	return dataset;
	
}function onMobileSync(user) {

}