function servicetask17(attempt, message) {
	var numProcess = getValue("WKNumProces");
	var usuario = getValue("WKUser");
	var form = hAPI.getCardData(numProcess);
	var campos = ['os','nSerie','produto','dtVencimento','valor','motivo','nome','cpfcnpj','endereco','numero','complemento','bairro','cep','cidade','estado','ccontaFin','ccontaSiga','favorecido','cpfcnpjFav','banco','agencia'];
	
	log.info('integracao pagamento cliente');
	var params = [];
	params.push(getCons('CID',numProcess));
	params.push(getCons('CNPJ','11068167000534'));
	params.push(getCons('CCGC',form.get('cpfcnpj')));
	params.push(getCons('cPrefixo','SRV'));
	params.push(getCons('cNatureza',form.get('natureza')));
	// // pega data atual e converte para formato do protheus
	params.push(getCons('cDataEmissao',getErpdate(dateToString(new Date()))));
	// converter valor para erp
	params.push(getCons('nValor',parseFloat(trataValor(form.get('valor')))));
	params.push(getCons('cBanco',form.get('banco')));
	var agencia = form.get('agencia');
	// remove caracteres '-' , '.'
	agencia = semCaractere(semCaractere(agencia,'-'),'.');
	params.push(getCons('cAgencia',agencia));
	var conta = form.get('contac') ? form.get('contac') : form.get('contap');
	// remove caracteres '-' , '.'
	conta = semCaractere(semCaractere(conta,'-'),'.');
	params.push(getCons('cConta', conta));
	params.push(getCons('cHistorico',form.get('motivo')));
	params.push(getCons('cCodBarras',form.get('nBolCodBar')));
	params.push(getCons('cCentroCusto',form.get('ccusto')));
	params.push(getCons('cFormaPgto',form.get('cFormaPgto'))); //
	// params.push(getCons('cDataVencto',getErpdate(form.get('dtVencimento')))); //
	
	log.info('params: ' +params);
	// params.CID = numProcess;
	// params.CNPJ = 'cnpj Acer';
	// params.CCGC = form.get('cpfcnpj');
	// params.cPrefixo = 'SRV';
	// params.cNatureza = form.get('natureza');
	// // converter valor
	// params.nValor = form.get('valor');
	// // pega data atual e converte para formato do protheus
	// params.cDataEmissao = getErpdate(dateToString(new Date()));
	// params.cBanco = form.get('banco');
	// params.cAgencia = form.get('agencia');
	// params.cConta = form.get('contac') ? form.get('contac') : form.get('contap');
	// params.cHistorico = form.get('motivo');
	// params.cCodBarras = form.get('nBolCodBar');
	// params.cCentroCusto = form.get('ccusto');
	
	try {
		//  busca dataset que executa a integração e retorna
		var DsInsPagCli = DatasetFactory.getDataset('dsInsPagCli', null, params, null);
		if(DsInsPagCli.rowsCount){
			var result = DsInsPagCli.getValue(0, 'result');
			var headers = DsInsPagCli.getValue(0, 'headers');
			var params = DsInsPagCli.getValue(0, 'params');
			var httpRes = DsInsPagCli.getValue(0, 'httpRes');
			//adiciona comentario na solicitação
			var commentStr = headers +' - '+ result +' - '+params +' - '+httpRes;
			log.info('commentStr : '+commentStr);
			if(result && result.trim()){
				if(result.trim().indexOf('SRV') >= 0){
					// titulo inserido
					log.info('Titulo inserido: ' + result);
					hAPI.setCardValue('cchave',result);
					hAPI.setTaskComments(usuario, numProcess, 0,"Titulo inserido: " +result)
				}else{
					// titulo nao inserido
					var oRes = JSON.parse(result);
					log.info('Titulo não inserido. Retorno: ' + oRes.errorMessage);
					throw "Titulo não inserido. Retorno: "+ oRes.errorMessage;
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
	
// CNPJ -> Cnpj da Acer (igual do reembolso)
// CCGC
// CID
// cPrefixo
// cNatureza
// nValor
// cDataEmissao
// cBanco
// cAgencia
// cConta
// cHistorico
// cCodBarras
// cCentroCusto
// /erpworks/api/v1/PgtoService