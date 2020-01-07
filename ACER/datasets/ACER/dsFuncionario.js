function defineStructure() {

}
function onSync(lastSyncDate) {
	
}
function createDataset(fields, constraints, sortFields) {
	function formatDate(parametro) {
		var mascara = parametro.replace(/(\d{4})(\d{2})(\d{2})/g,'\$1/\$2/\$3');
	    var todayTime = new Date(mascara);
	    var month = todayTime.getMonth() + 1;
		var day = todayTime.getDate();
		var dayr = day < 10 ? "0" + day : day;
		var monthr = month < 10 ? "0" + month : month;
	    var year = todayTime.getFullYear();
	    return dayr  + "/" + monthr + "/" + year;
	}


	var dataset = DatasetBuilder.newDataset();
	log.info('inicio consulta tipos de despesas acer alterado');
	//Criando colunas
	dataset.addColumn("CAGENCIA");
	dataset.addColumn("CBANCO");
	dataset.addColumn("CCCUSTO");
	dataset.addColumn("CCODIGO");
	dataset.addColumn("CCONTA");
	dataset.addColumn("CNOME");
	dataset.addColumn("CDESCCUSTO");
	dataset.addColumn("CDTADMISSA");
	dataset.addColumn("CDTNIVER");
	dataset.addColumn("CCGC");
	/*dataset.addColumn("Cond_normal");
	/*dataset.addColumn("Cond_normal");
	dataset.addColumn("Centro_de_custo");*/

	var param = '';
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName.toUpperCase() == "CCGC") {
            	param = constraints[i].initialValue;
            }
		}
	}

	if(param.trim() != ''){
		try {
			//var caminho = 'br.com.totvs.agptec._10222.WSFLUIG';
			var caminho = 'br.com.totvscloud.mw0sd1_prd_protheus._11685.WSFLUIG';
			 // Conecta o servico e busca os livros
		    var periodicService = ServiceManager.getService('WSFLUIG');
		    var serviceHelper = periodicService.getBean();
		    var serviceLocator = periodicService.instantiate(caminho);
		    var service = serviceLocator.getWSFLUIGSOAP();
		    //log.info('service:' + service);

		    var fun = service.getfuncionario(param.toUpperCase().trim());
		    
			 dataset.addRow(new Array(
					 fun.getCAGENCIA().trim(),
					 fun.getCBANCO().trim(),
					 fun.getCCCUSTO().trim(),
					 fun.getCCODIGO().trim(),
					 fun.getCCONTA().trim(),
					 fun.getCNOME().trim(),
					 fun.getCDESCCUSTO().trim(),
					 fun.getCDTADMISSA().trim(),
					 fun.getCDTNIVER().trim(),
					 param.toUpperCase().trim()));
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
