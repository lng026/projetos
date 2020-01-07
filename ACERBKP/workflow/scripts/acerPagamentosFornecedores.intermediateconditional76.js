function intermediateconditional76() {
	//busca valores do form
	var cDoc = 			hAPI.getCardValue("docNumTit");
	var cSerie = 		hAPI.getCardValue("docSerieTit");
	var cChave = 		hAPI.getCardValue("docNfeTit");
	var cCodForn = 		hAPI.getCardValue("cCodForn");
	var cLojaForn = 	hAPI.getCardValue("clojaForn");
	//cria parametros para passar para o dataset
	var c1 = DatasetFactory.createConstraint('NNDOCUMENTO', cDoc, cDoc, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('CSERIENOTA', cSerie, cSerie, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('CCHAVENFE', cChave, cChave, ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint('CCODFORNECEDOR',cCodForn,cCodForn, ConstraintType.MUST);
	var c5 = DatasetFactory.createConstraint('CLOJAFORNECEDOR', cLojaForn, cLojaForn, ConstraintType.MUST);

	var cs = new Array(c1,c2,c3,c4,c5);
	//busca dataset usando parametros
	var dsNfe = DatasetFactory.getDataset('acerNFEntrada', null, cs , null);
	//este dataset retorna sempre uma unica linha
	var st = dsNfe.getValue(0, 'STATUS');
	var msg = dsNfe.getValue(0, 'MENSAGEM');
	var ret = false;
	
	if(st == "01"){
		ret =true;
	}
	return ret;
}