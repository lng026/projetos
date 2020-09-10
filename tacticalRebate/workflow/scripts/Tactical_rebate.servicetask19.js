function servicetask19(attempt, message) {
	try {
		log.info("Integracao Tactical Rebate")

		var nSol = getValue("WKNumProces");
		var form = hAPI.getCardData(nSol);
		var cli = form.get("pn_cli");
		var ccgc = form.get("pn_cli_cnpj");
		var emissDt = form.get("pn_date");
		var aprovDt = form.get("pn_aprovDate");
		var cHist = form.get("pn_nRebate"); //numero do rebate
		var cNomCli = form.get("pn_cli_razao");
		var nVal = form.get("pn_valor");
		// --------------------------------------
		log.info("nSol"+nSol);
		log.info("cli"+cli);
		log.info("ccgc"+ccgc);
		log.info("emissDt"+emissDt);
		log.info("aprovDt"+aprovDt);
		log.info("cHist"+cHist);
		log.info("cNomCli"+cNomCli);
		log.info("nVal"+nVal);
		// --------------------------------------

		var fPgto = "001"; //a vista
		var cNatureza = "101";
		var cTipo = "NCC";
		var cPrefixo  = "ND";
		var nOperacao = "3";
		var cParcela = "";
		var cCusto = "";
		var cContaOrc = "";
		var vencData = "";
		var cJust = "";

		// ------------------------------------------------------------------------------------------
		var NOME_SERVICO = "WSFLUIG";
		//var pre = "_223._60._94._187._12547";
		var pre = "br.com.totvs.agptec._10222.WSFLUIG";
		var CAMINHO_SERVICO = pre+".WSFLUIG";
		var titCaminho = pre+".TITULORECEBER";
		//------------------------------------------------------------------------------------------- 
		var servico = ServiceManager.getServiceInstance(NOME_SERVICO);
		log.info("Servico: " + servico);
		var instancia = servico.instantiate(CAMINHO_SERVICO);
		log.info("Instancia: " + instancia);
		var ws = instancia.getWSFLUIGSOAP();
		log.info('WS: '+ws);

		// ------------------------------------------------------------------------------------------
		// monta obj Despesa
		var oTit = servico.instantiate(titCaminho);
		/*monta cabe�alho do padr�o do titulo*/
		oTit.setCCODIGOCLIENTE(cli);
		oTit.setCEMISSAO(trataData(emissDt));
		oTit.setCID(nSol);
		oTit.setCNATUREZA(cNatureza);
		oTit.setCPARCELA(cParcela);
		oTit.setCPREFIXO(cPrefixo);
		oTit.setCTIPO(cTipo);
		oTit.setCVENCTO(trataData(emissDt));
		oTit.setNOPERACAO(nOperacao);
		oTit.setNVALOR(semCaractere(nVal,','));



		//insere no webservice
		var retTit = ws.gravacontasreceber(oTit);
		var cKey = retTit.getCCHAVE();
		var cErro = retTit.getCERRO();
		var cMsg = retTit.getCMSG();


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
			hAPI.setTaskComments("admin", nSol, 0, msgSuccess);
		}else{
			var msgErro = "Ocorreu um erro Inserir o titulo -> ";
			msgErro+= " cKey: " + cKey;
			msgErro+= " - cErro: " + cErro;
			msgErro+= " - cMsg: " + cMsg;
			hAPI.setCardValue("msgRetorno",msgErro);
			throw msgErro;
		}

	} catch(error) { 
	log.error(error);
	throw error;
	}
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

//remove toda ocorrencia do caractere passado
var semCaractere = function (valor, c) {
    while (valor.indexOf(c) >= 0) {
        valor = valor.replace(c, '');
    }
    return valor;
}




