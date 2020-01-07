function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	log.info('inicio consulta tipos de despesas acer alterado');
	//Criando colunas
	dataset.addColumn("DESCRIPTION");
	dataset.addColumn("DESCRIPTIONGROUPOFPRODUCT");
	dataset.addColumn("DESCRIPTIONMEASUREUNIT");
	dataset.addColumn("PRODUCTCODE");
	dataset.addColumn("TYPEOFPRODUCT");
	dataset.addColumn("QUANTITYPERPACKAGE");
	dataset.addColumn("BARCODE");
	dataset.addColumn("NCM");
	
	/*dataset.addColumn("Cond_normal");
	dataset.addColumn("Centro_de_custo");*/

	var param = '';
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "DESCRIPTION") {
            	param = constraints[i].initialValue;
            }
		}
	}
	
	var paramCod = '';
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "PRODUCTCODE") {
            	paramCod = constraints[i].initialValue;
            }
		}
	}

	if(param.trim() != '' || paramCod.trim() != ''){
		try { 
			var caminho = 'br.com.microsiga.webservices.mtproduct_apw.MTPRODUCT';
			 // Conecta o servico e busca os livros
		    var periodicService = ServiceManager.getService('MTPRODUCT');
		    var serviceHelper = periodicService.getBean();
		    var serviceLocator = periodicService.instantiate(caminho);
		    var service = serviceLocator.getMTPRODUCTSOAP();

		    var BigInteger = java.math.BigInteger;
		    //log.info('service:' + service);
    									//USERCODE = MSALPHA , TYPE,GROUP, CODE, DESCRIPTION, NPAGELEN,NPAGEFIRST,CQUERYADDWHERE,CINDEXKEY = 1,CCUSTOMERID
		    var catalogResponse = service.getcatalog('MSALPHA','','',''+paramCod.toUpperCase().trim(), ''+param.toUpperCase().trim(),new BigInteger(0), new BigInteger(0),'','1','');
		    
		    var prodViewList = catalogResponse.getPRODUCTVIEW();
		    //dataset.addRow(new Array(brw.get(0).toString(),brw.get(0).getDESCRIPTION()));
		  for (var i = 0; i < prodViewList.size(); i++) {
				 dataset.addRow(new Array(
				prodViewList.get(i).getDESCRIPTION().trim(),
				prodViewList.get(i).getDESCRIPTIONGROUPOFPRODUCT().trim(),
				prodViewList.get(i).getDESCRIPTIONMEASUREUNIT().trim(),
				prodViewList.get(i).getPRODUCTCODE().trim(),
				prodViewList.get(i).getTYPEOFPRODUCT().trim(),
				prodViewList.get(i).getQUANTITYPERPACKAGE(),
				prodViewList.get(i).getBARCODE(),
				prodViewList.get(i).getNCM()
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
