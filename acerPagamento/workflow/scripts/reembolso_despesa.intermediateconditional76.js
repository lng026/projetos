function intermediateconditional76() {
	
	var cchave = hAPI.getCardValue('cchave');
	
	var c1 = DatasetFactory.createConstraint('chave', cchave, cchave, ConstraintType.MUST );
	var cons = new Array(c1);
	
	var dsBaixa = DatasetFactory.getDataset('dsConsultaTitulo', null, cons, null);
	var sBaixa = false;
	if(dsBaixa.rowsCount){
		var dataBaixa = dsBaixa.getValue(0, 'data');
		if(dataBaixa.trim() != ""){
			hAPI.setCardValue('cDataBaixa', dataBaixa.trim());
			sBaixa = true;
		}
	}
	return sBaixa;
	
	

}