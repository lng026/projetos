function intermediateconditional45() {
	var nSol = getValue("WKNumProces");
	var frm = hAPI.getCardData(nSol);
	var rb = frm.get("pn_nRebate");
// 	var rbNumProces = bunscaNumProcess(rb);
//	 var rbFrm = hAPI.getCardData(rbNumProces);
	var scKeys = frm.get("cKey");
	var acKey = scKeys.split(',');
	var lastIndex = acKey.length-1;
	var cKey = acKey[lastIndex].substring(0,acKey[lastIndex].indexOf('-'));
	
	if(verificaBaixa(cKey)){
		hAPI.setCardValue("cKey", scKeys+"-"+lastIndex);
		return true;
	}else{
		return false;
	}

	
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