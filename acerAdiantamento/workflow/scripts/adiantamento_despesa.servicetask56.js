function servicetask56(attempt, message) {
	var numProcess = getValue("WKNumProces");
	var usuario = getValue("WKUser");
	var form = hAPI.getCardData(numProcess);
	
	log.info('integracao pagamento cliente');
	var params = [];
	params.push(getCons('CID',numProcess));
	params.push(getCons('CNPJ',form.get('cnpjPag')));
	params.push(getCons('CCGC',semCaractere(semCaractere(form.get('cpf'),'.'),'-')));
	params.push(getCons('cPrefixo',form.get('prefixo')));
	params.push(getCons('cNatureza',form.get('natureza')));
	params.push(getCons('cFormaPgto',form.get('formPag')));
	params.push(getCons('cHistorico','Adiantamento para ' + form.get('nome')));
	// converter valor para erp
	params.push(getCons('nValor',parseFloat(trataValor(form.get('valor')))));
	// // pega data atual e converte para formato do protheus
	params.push(getCons('cDataEmissao',getErpdate(dateToString(new Date()))));

	try {
		//  busca dataset que executa a integração e retorna
		var dsAdtoContasPagar = DatasetFactory.getDataset('dsAdtoContasPagar', null, params, null);
		if(dsAdtoContasPagar.rowsCount){
			var result = dsAdtoContasPagar.getValue(0, 'result');
			var headers = dsAdtoContasPagar.getValue(0, 'headers');
			var params = dsAdtoContasPagar.getValue(0, 'params');
			var httpRes = dsAdtoContasPagar.getValue(0, 'httpRes');
			//adiciona comentario na solicitação
			var commentStr = headers +' - '+ result +' - '+params +' - '+httpRes;
			log.info('commentStr : '+commentStr);

			// trata retorno

			if(result && result.trim()){
				if(result.trim().indexOf('ADT') >= 0){
					// titulo inserido
					log.info('Adiantamento inserido: ' + result);
					hAPI.setCardValue('cchave',result);
					hAPI.setTaskComments(usuario, numProcess, 0,"Adiantamento inserido: " +result)
				}else{
					// titulo nao inserido
					var oRes = JSON.parse(result);
					log.info('adiantamento não inserido: ' + oRes.errorMessage);
					throw "Adiantamento não inserido: "+ oRes.errorMessage;
				}
			}

		}
		
	} catch (e) {
		log.error(e);
		throw "" + e;
	}

	function semCaractere(valor, c){
		while(valor.indexOf(c) >= 0){
			valor = valor.replace(c,'');
		}
		return valor;
	}
	function getErpdate(dt){
		var d = dt.split('/');
		var c = d.reverse();
		var a = c.join('');
		var b = semCaractere(a,',');
		if(b.indexOf('-')>=0){
			b = getErpdateEng(b);
		}
		return b;
	 }
	 function getErpdateEng(dt){
		var d = dt.split('-');
		var a = d.join('');
		var b = semCaractere(a,',');
		return b;
	 }
	   // retorna string de data dd/mm/yyyy - 21/12/2222
	function dateToString(dt){
		return ""+addZero(dt.getDate())+"/"+addZero(dt.getMonth()+1)+"/"+dt.getFullYear();
	}
	function addZero(n){
		var nn;
		if(n < 10){
			nn = "0"+ n.toString();
		}else{
			nn = ""+ n.toString();
	
		}
		return nn;
	}

	function getCons(name,value){
		return DatasetFactory.createConstraint(name, value, value, ConstraintType.MUST);
	}

	// 1.000,00 => 1000.00
	function trataValor(valor){
		valor = semCaractere(valor,'.');
		valor = valor.replace(',','.');
		return valor;
	}
}
