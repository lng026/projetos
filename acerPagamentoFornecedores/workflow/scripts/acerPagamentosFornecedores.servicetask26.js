function servicetask26(attempt, message) {
	log.info("++++++++++++++++++++++++++++++++ INICIO DE INTEGRACAO DE TITULO ++++++++++++++++++++++++++");
	var COD_Solicicitante = hAPI.getCardValue('idSolic');
	var COD_solicitacao = hAPI.getCardValue('NrSolic');
	// var WK_Aprovador = hAPI.getCardValue('WKsuperior');
	var emp = hAPI.getCardValue('codEmpresa');
	var filial  = hAPI.getCardValue('codFilial');
	var natureza  = hAPI.getCardValue('cNatureza');
	var forn   = hAPI.getCardValue('cCodForn');
	var fornLoja   = hAPI.getCardValue('clojaForn');
	var fornCgc = hAPI.getCardValue('cCgcForn');
	var vencData = hAPI.getCardValue('VencData').trim();
	var valorLiq  = hAPI.getCardValue('ValLiqTitulo');
	var valorBruto  = hAPI.getCardValue('ValTitulo');
		valorLiq  = valorLiq.replace('R$','').replace(',','').replace(',','').replace(',','').replace(',','');
		log.info("Valor: " + valorLiq);
		
	var cFormPagto = hAPI.getCardValue('cFormPagto');
	
	
	var cc = hAPI.getCardValue('cCentroCusto');
	var emissData = hAPI.getCardValue('EmissData').trim();
	// var CF_USER   = WK_Aprovador.toUpperCase();
	var chist   = "Fluig - "+ COD_solicitacao;
	var CF_CODTIT = '';/*Codigo do titulo da PA, deve ser informado somente no reembolso de despesas*/

	var tipoDoc= hAPI.getCardValue('docTipo');
	var CF_NUMTIT = hAPI.getCardValue('docNumTit');
	var cContaOrc = hAPI.getCardValue('cContaOrc');
	// var CF_CCD 	  = CF_CCUSTO;
	var msgXML = '';

	var NOME_SERVICO = "WSFLUIG";
	var pre = "br.com.totvs.agptec._10222";
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
			oDespesa.setCFORMAPGTO(cFormPagto);
			oDespesa.setCHISTORICO(chist);
			oDespesa.setCID(COD_solicitacao);
			oDespesa.setCNATUREZA(natureza);
			oDespesa.setCPREFIXO("FLU");
			oDespesa.setCTIPO(tipoDoc);
			log.info("oDespesa: " + oDespesa);
			//verifica rateio
			if(hAPI.getCardValue('rateioCC')=='sim'){
				var listaRatCusto  = consultaDadosPaiFilho(['cCentroCustoRat','valorCCusto','cConOrcRat','percentualCCusto']);
				var AODesp = servico.instantiate(aoDespItemStr);
				/*Adiciona lista ao objeto de array de Centro de custos*/
				for(x in listaRatCusto ) {
					/*Define lista objeto de centros de custos*/
					var rat = listaRatCusto[x];
					var despRat = nDespItem(rat,servico);
					AODesp.getDESPESAITEM().add(despRat);
					// oDespesa.getADESPESAITENS().add();
				}
				oDespesa.setADESPESAITENS(AODesp);
			}else{
				//monta objeto de despesa unica com header do form
				var uDesp = servico.instantiate(despiTemCaminho);
				var AODesp = servico.instantiate(aoDespItemStr);
				uDesp.setCCENTROCUSTO(cc);
				uDesp.setCCONTACONTABIL(cContaOrc);
				uDesp.setCDATA(trataData(vencData));
				uDesp.setCJUSTIFICATIVA("Pagamento Fornecedor Fluig");
				uDesp.setCNOMECLIENTE("-");
				uDesp.setNTXCAMBIO(0);
				uDesp.setNVALOR(valorLiq);
				AODesp.getDESPESAITEM().add(uDesp);
				oDespesa.setADESPESAITENS(AODesp);
			}
			log.info("oDespesa: " + oDespesa);




			//insere no webservice
			var retDesp = ws.gravacontaspagar(oDespesa);
			var cKey = retDesp.getCCHAVE();
			var cErro = retDesp.getCERRO();
			var cMsg = retDesp.getCMSG();

			//verificar respostahAPI.setTaskComments("admin", COD_solicitacao, 0, msgRetTitulo.toString());

			var msgErro = "Ocorreu um erro Inserir o titulo -> ";
			msgErro+= " cKey: " + cKey;
			msgErro+= " - cErro: " + cErro;
			msgErro+= " - cMsg: " + cMsg;
			log.info('Retorno erro: '+msgErro);
			// tratar retorno
			if(cErro.trim() == "N" && cKey.trim() != ""){
				//sucesso
				hAPI.setCardValue("cKey",cKey);
				log.info("task comment adicionado");
				var msgSuccess = "Inserido com sucesso.";
				msgSuccess += "Chave - " + cKey;
				hAPI.setCardValue("msgRetorno",msgSuccess);
				hAPI.setTaskComments("admin", COD_solicitacao, 0, msgSuccess);
			}else{
				var msgErro = "Ocorreu um erro Inserir o titulo -> ";
				msgErro+= " cKey: " + cKey;
				msgErro+= " - cErro: " + cErro;
				msgErro+= " - cMsg: " + cMsg;
				hAPI.setCardValue("msgRetorno",msgErro);
				throw msgErro;
			}
			//hAPI.setTaskComments(WK_Aprovador, COD_solicitacao, 0, msgErro);
		}
		catch(e){
			var msgErro = "Ocorreu um erro Inserir o titulo -> " + e;
			log.info('Retorno erro: '+msgErro);
			//hAPI.setTaskComments(WK_Aprovador, COD_solicitacao, 0, msgErro);
			hAPI.setTaskComments("admin", COD_solicitacao, 0, msgErro);
			throw msgErro;
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
