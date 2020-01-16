function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	log.info('inicio consulta tipos de despesas acer alterado');
	//Criando colunas
	dataset.addColumn("CCODIGO");
	dataset.addColumn("CNOME");
	dataset.addColumn("CCGC");
	dataset.addColumn("CMUNICIPIO");
	dataset.addColumn("CENDERECO");
	dataset.addColumn("CMATRIZ");
	/*dataset.addColumn("Cond_normal");
	dataset.addColumn("Centro_de_custo");*/

	var param = '';
	var param2 = '';
	var param3 = '';
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "nome" || constraints[i].fieldName == "CNOME") {
            	param = constraints[i].initialValue.toString().trim();
            }
            if (constraints[i].fieldName == "CCGC") {
            	param2 = constraints[i].initialValue.toString().trim();
            }
            if (constraints[i].fieldName == "CMATRIZ") {
            	param3 = constraints[i].initialValue;
            }
		}
	}
	//dataset.addRow(new Array(param.length.toString(), param)) ;
	if((param != '' && param.length() > 2) ||(param2 != '' &&  param2.length() > 2 )){
		try {
//			var caminho = 'br.com.totvs.agptec._10222.WSFLUIG';
			var caminho = 'br.com.totvscloud.mw0sd1_tst_protheus._33485.WSFLUIG';
			 // Conecta o servico e busca os livros
		    var periodicService = ServiceManager.getService('WSFLUIG');
		    var serviceHelper = periodicService.getBean();
		    var serviceLocator = periodicService.instantiate(caminho);
		    var service = serviceLocator.getWSFLUIGSOAP();
		    //log.info('service:' + service);

		    var cliResponse = service.getclientes(param.toUpperCase(),param2.trim(), "");
		    var cli = cliResponse.getCLIENTES();
		    //dataset.addRow(new Array(brw.get(0).toString(),brw.get(0).getDESCRIPTION()));
		  for (var i = 0; i < cli.size(); i++) {
				 dataset.addRow(new Array(
						 cli.get(i).getCCODIGO().trim(),
						 cli.get(i).getCNOME().trim(),
						 cli.get(i).getCCGC().trim(),
						 cli.get(i).getCMUNICIPIO().trim(),
						 cli.get(i).getCENDERECO().trim(),
						 ''
				 ));
			}

		} catch (e) {
			dataset.addRow(new Array(e.name, e.message));
		}

	}else{
		dataset.addRow(new Array('Erro', "Informe o nome do cliente"));
	}
	return dataset;

}
function onMobileSync(user) {

}