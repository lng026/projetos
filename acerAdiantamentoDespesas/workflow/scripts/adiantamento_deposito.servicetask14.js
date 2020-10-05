function servicetask14(attempt, message) {
	log.info("++++++++++++++++++++++++++++++++ INICIO DE INTEGRACAO DE TITULO ++++++++++++++++++++++++++");
	var numProcess = getValue("WKNumProces");
	var form = hAPI.getCardData(numProcess);
	var COD_Solicicitante = form.get('idSolic');
	var adtData = JSON.parse(form.get('jsonAdiantamento'));

	// var WK_Aprovador = form.get('WKsuperior');
	var natureza  	= '22703A';
	var cFormPagto = 87;
	var tipoDoc ='NDF';
	
	var filial  	= '01';
	var forn   		= adtData.fornecedor;
	var fornLoja  	= '01';
	var fornCgc 	= adtData.cgc;
	var vencData 	= adtData.vencimento;
	var emissData = adtData.emissao;
	var valor  	= rmChar(form.get('valor'),',');
	// var CF_USER   = WK_Aprovador.toUpperCase();
	var chist   = "Fluig - "+ numProcess;
	var cc = form.get('centro_custo');
	var cContaOrc = form.get('contaContabil');

	// var CF_CCD 	  = CF_CCUSTO;
	var msgXML = '';

	var NOME_SERVICO = "WSFLUIG";
	var pre = "br.com.totvscloud.mw0sd1_tst_protheus._33485";
	var CAMINHO_SERVICO = pre+".WSFLUIG";
	var despCaminho = pre+".DESPESA";
	var despiTemCaminho = pre+".DESPESAITEM";
	var aoDespItemStr = pre+".ARRAYOFDESPESAITEM";
	try{
		var servico = ServiceManager.getServiceInstance(NOME_SERVICO);
		log.info("Servico: " + servico);
		var instancia = servico.instantiate(CAMINHO_SERVICO);
		log.info("Instancia: " + instancia);
		var ws = instancia.getWSFLUIGSOAP();
		log.info('WS: '+ws);
		//cria despesaitem com dados do rateio
		var oDespesa = servico.instantiate(despCaminho);
		/*monta cabe�alho do padr�o do titulo*/
		oDespesa.setCCGC(fornCgc);
		oDespesa.setCDATAEMISSAO(trataData(emissData));
		oDespesa.setCDATAVENCTO(trataData(emissData));
		oDespesa.setCFORMAPGTO(cFormPagto);
		oDespesa.setCHISTORICO(chist);
		oDespesa.setCID(numProcess);
		oDespesa.setCNATUREZA(natureza);
		oDespesa.setCPREFIXO("FLU");
		oDespesa.setCTIPO(tipoDoc);
		log.info("oDespesa: " + oDespesa);

		//monta objeto de despesa unica com header do form
		var uDesp = servico.instantiate(despiTemCaminho);
		var AODesp = servico.instantiate(aoDespItemStr);
		uDesp.setCCENTROCUSTO(cc);
		uDesp.setCCONTACONTABIL(cContaOrc);
		uDesp.setCDATA(trataData(vencData));
		uDesp.setCJUSTIFICATIVA("Pagamento Fornecedor Fluig");
		uDesp.setCNOMECLIENTE("-");
		uDesp.setNTXCAMBIO(0);
		uDesp.setNVALOR(valor);
		AODesp.getDESPESAITEM().add(uDesp);
		oDespesa.setADESPESAITENS(AODesp);
		
		log.info("oDespesa: " + oDespesa);

		//insere no webservice
		var retDesp = ws.gravacontaspagar(oDespesa);
		var cKey = retDesp.getCCHAVE();
		var cErro = retDesp.getCERRO();
		var cMsg = retDesp.getCMSG();
		var jsonRet = {
				'cchave': cKey,
				'cErro': cErro,
				'cMsg':cMsg
		};
		hAPI.setCardValue("integracaoReturnJson", JSONUtil.toJSON(jsonRet));
		//verificar respostahAPI.setTaskComments("admin", numProcess, 0, msgRetTitulo.toString());
		log.info('Retorno1: '+JSONUtil.toJSON(jsonRet));
		log.info('Retorno2: '+JSONUtil.toJSON(retDesp));
		// tratar retorno
		if(cErro.trim() == "N" && cKey.trim() != ""){
			//sucesso
			hAPI.setCardValue("cchave",cKey);
			log.info("task comment adicionado");
			var msgSuccess = "Inserido com sucesso.";
			msgSuccess += "Chave - " + cKey;
			hAPI.setCardValue("msgRetorno",msgSuccess);
			hAPI.setTaskComments("admin", numProcess, 0, msgSuccess);
		}else{
			var msgErro = "Ocorreu um erro Inserir o titulo -> ";
			msgErro+= " Chave: " + cKey;
			msgErro+= " - cErro: " + cErro;
			msgErro+= " - cMsg: " + cMsg;
			hAPI.setTaskComments("admin", numProcess, 0, msgErro);
			throw msgErro;
		}
		//hAPI.setTaskComments(WK_Aprovador, numProcess, 0, msgErro);
	}
	catch(e){
		var msgErro = "Ocorreu um erro Inserir o titulo -> " + e;
		log.info('Retorno erro: '+msgErro);
		//hAPI.setTaskComments(WK_Aprovador, numProcess, 0, msgErro);
		hAPI.setTaskComments("admin", numProcess, 0, msgErro);
		throw msgErro;
	}

// funcoes auxiliares

	function rmChar(valor, c){
		while(valor.indexOf(c) >= 0){
			valor = valor.replace(c,'');
		}
		return valor;
	}
	//retorna item de despesa de acordo com linha do rateio
	function nDespItem(r,s){
		//intancia de objeto
		var p = "_223._60._94._187._12547";
		var i = p+".DESPESAITEM";
		var objDesp = s.instantiate(i);
		//'cCentroCustoRat','valorCCusto','cConOrcRat','percentualCCusto'
		if(r){
			objDesp.setCCENTROCUSTO(r.cCentroCustoRat.value);
			objDesp.setCCONTACONTABIL(r.cConOrcRat.value);
			objDesp.setNVALOR(r.valorCCusto.value);
			objDesp.setCDATA(dtAtualProtheus());
			objDesp.setCJUSTIFICATIVA("Pagamento Fornecedor Fluig");
			objDesp.setCNOMECLIENTE("-");
			objDesp.setNTXCAMBIO(0);
		}
		return objDesp;
	}

	function trataData(dBase){
		return dBase.split('/').reverse().join('');
	}

	function dtAtualProtheus(){
		var hj = new Date();
		return trataData(dateToString(hj));
	}

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
}

