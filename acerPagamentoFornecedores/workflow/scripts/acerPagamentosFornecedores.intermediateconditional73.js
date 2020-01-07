function intermediateconditional73() {
	//monta lista de nfes que ira consultar
	var aNFE  = consultaDadosPaiFilho(['docChNfe','docSerieNfe','docValorNfe','docNNFE']);
	var ret = true;
	for(x in aNFE ) {
		var oNFe = aNFE[x];
		var dsNfe = getStatusNFE(oNFe.docChNfe.value);
		//este dataset retorna sempre uma unica linha
		var st = dsNfe.getValue(0, 'STATUS');
		var msg = dsNfe.getValue(0, 'MENSAGEM');
		if(st.trim() != "" && st != "01" ){
			ret = false;
			break;
		}
	}
	return ret;
}

function getStatusNFE(cChave){
	// //busca valores do form
	// var cDoc = 			hAPI.getCardValue("docNumTit");
	// var cSerie = 		hAPI.getCardValue("docSerieTit");
	// var cChave = 		hAPI.getCardValue("docNfeTit");
	// var cCodForn = 		hAPI.getCardValue("cCodForn");
	// var cLojaForn = 	hAPI.getCardValue("clojaForn");
	//cria parametros para passar para o dataset
	// var c1 = DatasetFactory.createConstraint('NNDOCUMENTO', cDoc, cDoc, ConstraintType.MUST);
	// var c2 = DatasetFactory.createConstraint('CSERIENOTA', cSerie, cSerie, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('CCHAVENFE', cChave, cChave, ConstraintType.MUST);
	// var c4 = DatasetFactory.createConstraint('CCODFORNECEDOR',cCodForn,cCodForn, ConstraintType.MUST);
	// var c5 = DatasetFactory.createConstraint('CLOJAFORNECEDOR', cLojaForn, cLojaForn, ConstraintType.MUST);

	var cs = new Array(c3);
	//busca dataset usando parametros
	var dsNfe = DatasetFactory.getDataset('acerNFEntrada', null, cs , null);
	return dsNfe;
}

function consultaDadosPaiFilho(fields){
	log.info('Consulta Dados Pai X Filho');
	var nrProcesso = getValue("WKNumProces");
	var cardData   = hAPI.getCardData(nrProcesso);
	var it         = cardData.keySet().iterator();
	var listaFilho = new Array();
	var fieldTemp  = fields[0];

	while (it.hasNext()) {
		var key = it.next();
		var campo = key.split("___");

		if (key.indexOf('___') >= 0 && campo[0] == fieldTemp) {
			var idx = campo[1];
			var row = new Object();
			for(var i=0; i<fields.length; i++){
				var name = fields[i] + "___" + idx;
				row[fields[i]] = {value:hAPI.getCardValue(name), idx:idx, name:name};
			}
			listaFilho.push(row);
		}
	}
	return listaFilho;
}