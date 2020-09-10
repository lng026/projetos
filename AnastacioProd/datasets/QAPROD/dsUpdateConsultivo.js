function createDataset(fields, constraints, sortFields) {
	var dsUpdateConsultivo = DatasetBuilder.newDataset();
	dsUpdateConsultivo.addColumn("retorno");
	
	var cdFilialNS7  = "";
	var cdCajuri     = "";
	var sDescSol     = "";
	var sObservacao  = "";
	
	var retorno = true;
	
	for (var i = 0; i < constraints.length; i++){
		if (constraints[i].initialValue !=null){
			if (constraints[i].fieldName == "cdCajuri"){
				cdCajuri = constraints[i].initialValue;
			} else if (constraints[i].fieldName == "sDescSol"){
				sDescSol = constraints[i].initialValue;			
			} else if (constraints[i].fieldName == "sObservacao"){
				sObservacao = constraints[i].initialValue;
			} else if (constraints[i].fieldName == "cdFilialNS7"){
				cdFilialNS7 = constraints[i].initialValue;
			} 
		}
	}
	
	try{
		
		var service = ServiceManager.getService('SIGAJURI');
		var serviceHelper = service.getBean();
		var serviceLocator = serviceHelper.instantiate('wsfluigjuridico.sigajuri.totvs.com.WSFLUIGJURIDICO');
		var IncConsService = serviceLocator.getWSFLUIGJURIDICOSOAP();
		
		var aDados = serviceHelper.instantiate('wsfluigjuridico.sigajuri.totvs.com.STRUATUALIZACONSULTIVO');
		
		aDados.setESCRITORIO(cdFilialNS7);
		aDados.setCODIGOCAJURI(cdCajuri);
		aDados.setSOLICITACAO(sDescSol);
		aDados.setOBSERVACOES(sObservacao);		
		
		retorno = IncConsService.mtatualizaconsultivo(aDados);
		
		dsUpdateConsultivo.addRow(new Array(retorno));
	  
	}
	catch(e){
		log.error("*** dsUpdateConsultivo - ERRO: " + e.message);
		dsUpdateConsultivo.addRow(new Array(e.message));
	}
	
	return dsUpdateConsultivo;
}