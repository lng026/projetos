function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
var dataset = DatasetBuilder.newDataset();
	log.info('inicio consulta tipos de despesas acer alterado');
	//Criando colunas
	dataset.addColumn("codigo");
	dataset.addColumn("descricao");
	dataset.addColumn("categoria");
	dataset.addColumn("superior");
	dataset.addColumn("ccgc");
	/*dataset.addColumn("Cond_normal");
	dataset.addColumn("Centro_de_custo");*/
	var param = '';
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "ccgc") {
            	param = constraints[i].initialValue;
            }
		}
	}
	
	if(param.trim() != ''){
		try {
			http://187.94.60.223:12547/ws/CTBGENERALLEADER.apw?WSDL_223._60._94._187._12547
			var caminho = 'br.com.microsiga.webservices.ctbgeneralleader_apw.CTBGENERALLEADER';
			 // Conecta o servico e busca os livros
		    var periodicService = ServiceManager.getService('CTBGENERAL');
		    var serviceHelper = periodicService.getBean();
		    var serviceLocator = periodicService.instantiate(caminho);
		    var service = serviceLocator.getCTBGENERALLEADERSOAP();
		    //log.info('service:' + service);
		    var where = " EXISTS (SELECT * FROM CTT010 CTT WHERE CTT.D_E_L_E_T_=' '  AND CTT_CRGNV1 = CT1_RGNV1 AND CTT_CUSTO = '" + param + "')"
		    //var brwResponse = service.brwgeneralleader('MSALPHA','31400000','314099999',where,'1');
		    var brwResponse = service.brwgeneralleader('MSALPHA','30000000','499999999',where,'1');
		    var brw = brwResponse.getGENERALLEADERVIEW();
		    //dataset.addRow(new Array(brw.get(0).toString(),brw.get(0).getDESCRIPTION()));
		  for (var i = 0; i < brw.size(); i++) {
	
				 dataset.addRow(new Array(
						 brw.get(i).getACCOUNTCODE().trim(),
						 brw.get(i).getDESCRIPTION().trim(),
						 brw.get(i).getACCOUNTCATEGORY().trim(),
						 brw.get(i).getSUPERIORACCOUNT().trim()));
	
			}
	
		} catch (e) {
			
			dataset.addRow(new Array(e.name, e.message));
		}
	}else{
		dataset.addRow(new Array('Erro', "Informe o Centro de custo"));
	}

	return dataset;

}function onMobileSync(user) {

}
