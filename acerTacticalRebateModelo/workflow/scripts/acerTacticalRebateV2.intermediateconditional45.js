function intermediateconditional45() {
	var nSol = getValue("WKNumProces");
	var frm = hAPI.getCardData(nSol);
	var rb = frm.get("pn_nRebate");
 	var rbNumProces = bunscaNumProcess(rb);
	 var rbFrm = hAPI.getCardData(rbNumProces);
	var cKey = rbFrm.get("cKey");
	if(verificaBaixa(cKey)){
		return true;
	}
}

function bunscaNumProcess(rebate){
	var constraintForm_tactical_rebate1 = DatasetFactory.createConstraint('pn_nRebate', rebate, rebate, ConstraintType.MUST);
	var datasetForm_tactical_rebate = DatasetFactory.getDataset('form_tactical_rebate', null, new Array(constraintForm_tactical_rebate1), null);
	return datasetForm_tactical_rebate.getValue(0,'wkNumProces');
}

function verificaBaixa(key){
	var tOk = false;
	var resBusca = buscaStatusTitulo(key);
	for (var i = 0; i < resBusca.rowsCount; i++) {
		var e = resBusca.getValue(i,'CDATABAIXA');
		if(e.trim() != ""){
			tOk = true;
			break;
		}
		
	}
	return tOk;
}

function buscaStatusTitulo(key){
	var cs = DatasetFactory.createConstraint('CKEY', key, key, ConstraintType.MUST);
	var ds = DatasetFactory.getDataset('acerBaixasReceber', null, new Array(cs), null);
	return ds;
}