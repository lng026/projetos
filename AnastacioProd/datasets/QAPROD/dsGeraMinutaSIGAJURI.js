function createDataset(fields, constraints, sortFields) {
	var dsGeraMinutaSIGAJURI = DatasetBuilder.newDataset();
	dsGeraMinutaSIGAJURI.addColumn("id_peticao");
	
	var cdCajuri	= "";
	var cdTipoCon	= "";
	var cdPeticao	= "";
	var cdFilialNS7	= "";
	
	for (var i = 0; i < constraints.length; i++){
		if (constraints[i].fieldName == "cdCajuri"){
			cdCajuri = constraints[i].initialValue;
		} else if (constraints[i].fieldName == "cdTipoCon"){
			cdTipoCon = constraints[i].initialValue;			
		} else if (constraints[i].fieldName == "cdFilialNS7"){
			cdFilialNS7 = constraints[i].initialValue;			
		}
	}
	
	try{

		var service = ServiceManager.getService('SIGAJURI');
		var serviceHelper = service.getBean();
		var serviceLocator = serviceHelper.instantiate('wsfluigjuridico.sigajuri.totvs.com.WSFLUIGJURIDICO');
		var UpdFUService = serviceLocator.getWSFLUIGJURIDICOSOAP();
		
		cdPeticao = UpdFUService.mtgeraminuta(cdCajuri, cdTipoCon, cdFilialNS7);
		
		dsGeraMinutaSIGAJURI.addRow(new Array(cdPeticao));
	}
	catch(e){
		log.erro("*** dsGeraMinutaSIGAJURI - Não foi possível realizar a operação de geração de minutas automáticas: " + (e.message));
		dsGeraMinutaSIGAJURI.addRow(new Array("0"));
	}
	
	return dsGeraMinutaSIGAJURI;
}