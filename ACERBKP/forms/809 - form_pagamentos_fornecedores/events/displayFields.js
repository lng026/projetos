function displayFields(form,customHTML){
	var activity = parseInt(getValue('WKNumState')); 
	var idUser = getValue("WKUser");
	var operation = form.getValue('WKtipoOper'); 
	form.setValue('WKtipoOper',operation);
	form.setValue('WKMode',form.getFormMode());
	if (form.getValue('DtSolic') == '') {
		form.setValue('DtSolic', getDate());	
	}
	if (form.getFormMode() != 'ADD' && form.getValue('NrSolic') == '') {
		form.setValue('NrSolic', getValue("WKNumProces")); 
	}
	if (form.getValue('NmSolic') == '') {
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", idUser, idUser, ConstraintType.MUST);
		var colaboradorDS = DatasetFactory.getDataset("colleague", null, new Array(c1), null);
		var colaborador = colaboradorDS.getValue(0,"colleagueName");
		form.setValue('NmSolic', colaborador); 
		form.setValue('idSolic',idUser);
	}
	form.setValue('mensagemSaldo','S');
	if(activity == 0){activity =4;}
	switch(activity){
	case inicio:	
		 form.setValue('mensagemSaldo','N');
			 camposObrigatorios = [	"NmSolic",
									"cCentroCusto",
									"cCodForn",
									"VencData",
									"EmissData",
									"ValTitulo",
									"obsPayment",
									"rateioCC",
									"descContaOrc",
									"docTipo"];
								// "cFilial","cEmpresa","WKsuperior","optTransaction",
								//   "docNumTit",
								//   "docNfeTit",
								//   "docSerieTit",
			 customHTML.append('<script>');
			 for (var i = 0 ; i < camposObrigatorios.length ; i++){
			   customHTML.append("$(\"[name='" + camposObrigatorios[i] + "']\").addClass(\"has-free\");");
			 }
			 customHTML.append('</script>');
		break;
	// case avalPedido:
	// 	/*var idUser = getValue("WKUser");
	// 	if (form.getFormMode()!='VIEW'||form.getValue('idAnalistaSupply') == ''||form.getValue('nomeSupply') == '') {
	// 		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", idUser, idUser, ConstraintType.MUST);
	// 		var colaboradorDS = DatasetFactory.getDataset("colleague", null, new Array(c1), null);
	// 		var colaborador = colaboradorDS.getValue(0,"colleagueName");
	// 		form.setValue('nomeSupply', colaborador); 
	// 		form.setValue('idAnalistaSupply',idUser);
	// 	}
	// 	form.setValue('aprovmngrSupply','');
	// 	form.setValue('negativaSupply','');
		
	// 	camposObrigatorios = ["aprovmngrSupply",
	// 	                       "negativaSupply"];
	// 	 customHTML.append('<script>');
	// 	 for (var i = 0 ; i < camposObrigatorios.length ; i++){
	// 	   customHTML.append("$(\"[name='" + camposObrigatorios[i] + "']\").addClass(\"has-free\");");
	// 	 }
	// 	 customHTML.append('</script>');*/
	// 	break;
	case diretoria:
	var idUser = getValue("WKUser");
	if (form.getValue('idDir') == ''||form.getValue('dirName') == '') {
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", idUser, idUser, ConstraintType.MUST);
		var colaboradorDS = DatasetFactory.getDataset("colleague", null, new Array(c1), null);
		var colaborador = colaboradorDS.getValue(0,"colleagueName");
		form.setValue('dirName', colaborador); 
		form.setValue('idDir',idUser);
	}
	form.setValue('dirAprov','');
	form.setValue('negativaDir','');
	camposObrigatorios = ["dirAprov",
						  "negativaDir"];
	 customHTML.append('<script>');
	 for (var i = 0 ; i < camposObrigatorios.length ; i++){
	   customHTML.append("$(\"[name='" + camposObrigatorios[i] + "']\").addClass(\"has-free\");");
	 }
	 customHTML.append('</script>');
	break;
	case aprovador:
		var idUser = getValue("WKUser");
		if (form.getValue('idMngr') == ''||form.getValue('MngrName') == '') {
			var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", idUser, idUser, ConstraintType.MUST);
			var colaboradorDS = DatasetFactory.getDataset("colleague", null, new Array(c1), null);
			var colaborador = colaboradorDS.getValue(0,"colleagueName");
			form.setValue('MngrName', colaborador); 
			form.setValue('idMngr',idUser);
		}
		form.setValue('MngrAprov','');
		form.setValue('negativaGest','');
		camposObrigatorios = ["MngrAprov",
		                      "negativaGest"];
		 customHTML.append('<script>');
		 for (var i = 0 ; i < camposObrigatorios.length ; i++){
		   customHTML.append("$(\"[name='" + camposObrigatorios[i] + "']\").addClass(\"has-free\");");
		 }
		 customHTML.append('</script>');
		break;
	case finalizar:
		var idUser = getValue("WKUser");
		if (form.getFormMode()!='VIEW'||form.getValue('idAnFiscal') == ''||form.getValue('FiscalName') == '') {
			var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", idUser, idUser, ConstraintType.MUST);
			var colaboradorDS = DatasetFactory.getDataset("colleague", null, new Array(c1), null);
			var colaborador = colaboradorDS.getValue(0,"colleagueName");
			form.setValue('FiscalName', colaborador); 
			form.setValue('idAnFiscal',idUser);
		}
		form.setValue('fiscalAprov','');
		form.setValue('negativaFiscal','');
		camposObrigatorios = [
		                      "docFiscal",
		                      "fiscalAprov",
							  "cFormPagto",
		                      "negativaFiscal"];
		 customHTML.append('<script>');
		 for (var i = 0 ; i < camposObrigatorios.length ; i++){
		   customHTML.append("$(\"[name='" + camposObrigatorios[i] + "']\").addClass(\"has-free\");");
		 }
		 customHTML.append('</script>');
		 	if (form.getFormMode() != 'ADD' &&  form.getFormMode() != 'VIEW') {
				if (form.getValue('dtClass') == '') {
					form.setValue('dtClass', getDate());	
				}
			}
		break;	
		case pagar:
		var idUser = getValue("WKUser");
		if (form.getFormMode()!='VIEW'||form.getValue('idAnpag') == ''||form.getValue('pagName') == '') {
			var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", idUser, idUser, ConstraintType.MUST);
			var colaboradorDS = DatasetFactory.getDataset("colleague", null, new Array(c1), null);
			var colaborador = colaboradorDS.getValue(0,"colleagueName");
			form.setValue('pagName', colaborador); 
			form.setValue('idAnpag',idUser);
		}
		form.setValue('pagAprov','');
		form.setValue('negativapag','');
		camposObrigatorios = ["pagAprov",
		                      "negativapag"];
		 customHTML.append('<script>');
		 for (var i = 0 ; i < camposObrigatorios.length ; i++){
		   customHTML.append("$(\"[name='" + camposObrigatorios[i] + "']\").addClass(\"has-free\");");
		 }
		 customHTML.append('</script>');
		break;
	case insere:
		break;
	case verificaNeg:
		aprovFiscal = form.getValue('fiscalAprov');
		if(aprovFiscal == 'nao'){
			camposObrigatorios =  [	"NmSolic",
			"cCentroCusto",
			"cCodForn",
			"VencData",
			"EmissData",
			"ValTitulo",
			"obsPayment",
			"rateioCC",
			"descContaOrc",
			"docTipo"];
			 customHTML.append('<script>');
			 for (var i = 0 ; i < camposObrigatorios.length ; i++){
			   customHTML.append("$(\"[name='" + camposObrigatorios[i] + "']\").addClass(\"has-free\");");
			 }
			 customHTML.append('</script>');
		}
		break;		
	}	
}
function verLocalidade(cCodUsr){
	var c1 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", cCodUsr, cCodUsr, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "Holding", "Holding", ConstraintType.MUST);
	var constraints   = new Array(c1, c2);
	/*Define os campos para ordenacao*/
	var fields = new Array("colleagueGroupPK.colleagueId", "colleagueGroupPK.groupId",
	       "colleagueGroupPK.companyId");
	var sortingFields = new Array("colleagueGroupPK.colleagueId");
	var colaboradorDS = DatasetFactory.getDataset("colleagueGroup", fields, constraints, sortingFields);
	var ret = false; 
	if (colaboradorDS.rowsCount!=0){
		for (var j = 0; j < colaboradorDS.rowsCount; j++) {
			if(colaboradorDS.getValue(j,"colleagueGroupPK.groupId") == 'Holding'){
				ret = true;
				break;
			}
		}return ret;
	}else{
		return ret;
	}
}
function getDate() {
	var fullDate = new Date();
	var date = fullDate.getDate().toString();
	if (date.length == 1) {
		date =0+date;
	}
	var month = (fullDate.getMonth()+1).toString();
	if (month.length == 1) {
		month =0+month;
	}
	return date+"/"+month+"/"+fullDate.getFullYear();
}