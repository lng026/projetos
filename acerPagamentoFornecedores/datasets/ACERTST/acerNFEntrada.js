function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	log.info('inicio consulta nota fiacal entrada');
	//Criando colunas
	dataset.addColumn("STATUS");
	dataset.addColumn("MENSAGEM");
	dataset.addColumn("CNOTAFISCAL");
	dataset.addColumn("CSERIENOTA");
	dataset.addColumn("CCHAVENFE");
	dataset.addColumn("CCODFORNECEDOR");
	dataset.addColumn("CLOJAFORNECEDOR");
	/*dataset.addColumn("Cond_normal");
	dataset.addColumn("Centro_de_custo");*/

	var pDoc = '';
	var pSerie = '';
	var pCnfe = '';
	var pCodF = '';
	var pLojF = '';
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "CNOTAFISCAL") {
            	pDoc = constraints[i].initialValue.toString().trim();
            }
            if (constraints[i].fieldName == "CSERIENOTA") {
            	pSerie = constraints[i].initialValue.toString().trim();
			}
			if (constraints[i].fieldName == "CCHAVENFE") {
            	pCnfe = constraints[i].initialValue.toString().trim();
            }
			if (constraints[i].fieldName == "CCODFORNECEDOR") {
            	pCodF = constraints[i].initialValue.toString().trim();
            }
			if (constraints[i].fieldName == "CLOJAFORNECEDOR") {
            	pLojF = constraints[i].initialValue.toString().trim();
            }
		}
	}
	//dataset.addRow(new Array(param.length.toString(), param)) ;
	// if((pDoc.trim() != '' && pSerie.trim() != '') || pCnfe.trim() != ''){
		try {
			var caminho = 'br.com.totvscloud.mw0sd1_tst_protheus._33485.WSFLUIG';
			var caminho = pre+'.WSFLUIG';
			 // Conecta o servico e busca os livros
		    var periodicService = ServiceManager.getService('WSFLUIG');
		    var serviceHelper = periodicService.getBean();
		    var serviceLocator = periodicService.instantiate(caminho);
		    var service = serviceLocator.getWSFLUIGSOAP();
		    //log.info('service:' + service);
			var dNota = periodicService.instantiate(pre+'.DADOSNOTACONSULTA');
			dNota.setCNOTAFISCAL(pDoc);
			dNota.setCCODFORNECEDOR(pCodF);
			dNota.setCLOJAFORNECEDOR(pLojF);
			dNota.setCSERIENOTA(pSerie);
			dNota.setCCHAVENFE(pCnfe);

			var cliResponse = service.statusnotaentrada(dNota);
			log.info("statusnotaentrada: " + cliResponse);
			//separa codigo e mensagem
			var aRes = cliResponse.split('-');


		    // var cc = cliResponse.getNATUREZA();
			dataset.addRow(new Array(aRes[0].trim(),aRes[1].trim(),
							pDoc,pSerie,pCnfe,pCodF,pLojF
		
		
		));
		//   for (var i = 0; i < cc.size(); i++) {
		// 		 dataset.addRow(new Array(
		// 				 cc.get(i).getCNATUREZA().trim(),
		// 				 cc.get(i).getCDESCRICAO().trim()
		// 		 ));
		// 	}

		} catch (e) {
			dataset.addRow(new Array(e.name, e.message));
		}

	// }else{
	// 	dataset.addRow(new Array('Erro', "Informe o Número do Documento e Série ou a Chave NFE"));
	// }
	return dataset;
}function onMobileSync(user) {

}