function afterTaskSave(colleagueId,nextSequenceId,userList){
	emailSolic = hAPI.getCardValue("email");	 
	
	log.info("Envia e-mail");
	log.info("Email solicitante: " + emailSolic);
	 
	var removeVirgula = function(str){
		return str.replace(/,/g, '').trim();
	}
	
	function getNomeUsuario(id){
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", id, id, ConstraintType.MUST);
		var ds = DatasetFactory.getDataset("colleague", null, new Array(c1), null);
		return ds.getValue(0,"colleagueName");
	}
	
	// VERIFICA SE CHAMADO FOI TRANSFERIDO PARA CARREGAR TEMPLATE DE EMAIL
	
	function checkTransf(){
		var transf = parseInt(hAPI.getCardValue('transferido'));
		if (transf) {
			return true;
		} else {
			return false;
		}
	}
	
	function checkInicio(){
		if (hAPI.getCardValue('checkinicio') == '1') {
			return true;
			} else {
			return false;
		}
	}
	
	function checkReopen(){
		if (hAPI.getCardValue('us_resolvidof') == 'sim') {
			return true;
			} else {
			return false;
		}
	}
	
	function checkResolvido(){
		var cam = hAPI.getCardValue('us_resolvido');
		if (cam != 'vazio' && cam != 'sim') {
			return true;
			} else {
			return false;
		}
	}
	
	function consultaDadosPaiFilho(fields){
		log.info('Consulta Dados Pai X Filho');
		var nrProcesso = getValue("WKNumProces") + "";;
		var cardData = hAPI.getCardData(nrProcesso);
		var it = cardData.keySet().iterator();
		var listaFilho = new Array();
		var fieldTemp = fields[0];
		
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
	
	var atvcampo = hAPI.getCardValue('atv');
	
	// QUANDO ABRE CHAMADO
	log.info("Próxima atividade: " + nextSequenceId);
	log.info("Incial: " + hAPI.getCardValue('checkinicio'));
	log.info("Incial função: " + checkInicio());

	if(nextSequenceId == 15){
		log.info("Entrou na função 'nextSequenceId == 15' ");
		
		var solicitante = getValue("WKUser");
		log.info("Encontro solciitente: " + solicitante);

		var colaborador = getNomeUsuario(solicitante);
		log.info("Encontro colaborador: " + colaborador);

		var t_assunto = hAPI.getCardValue("assunto");
		log.info("Encontro t_assunto: " + t_assunto);
		
		var numproc = getValue("WKNumProces") + "";;
		log.info("Encontro numproc: " + numproc);
		
		var assunto = "A solicitação #" + numproc + " foi aberta - HelpDesk Acer";
		log.info("Encontro assunto: " + assunto);
		
		var topico_ajuda = hAPI.getCardValue("usNomeTxt");
		log.info("Encontro topico_ajuda: " + topico_ajuda);
		
		var processo = getValue("WKNumProces") + "";;
		log.info("Encontro processo: " + processo);

		var campos = hAPI.getCardData(processo);
		log.info("Encontro campos: " + campos);

		log.info("Validou variáveis");
		
		try{
			log.info("Entrou no try");

			var tktData = hAPI.getCardValue('data_Chamado');
			
			//Monta mapa com parâmetros do template
			var parametros = new java.util.HashMap();
			parametros.put("solicitante", colaborador);
			parametros.put("topico_ajuda", topico_ajuda);
			parametros.put("numsol", numproc);
			parametros.put("assunto", t_assunto);
			parametros.put("datachamado", tktData);
			
			//Monta lista de destinatários
			var destinatarios = new java.util.ArrayList();
			
			// DESTINATARIOS EM CÓPIA
			var camposItem = new Array('campocc');
			var ccList = consultaDadosPaiFilho(camposItem);
			
			if (ccList.length > 0) {
				log.info("Entrou no ccList");
				// ccindex = ccindex + 1;
				for(var i = 0; i < ccList.length; i++){
					var cc = ccList[i];
					var campocc = cc['campocc'].value;
					destinatarios.add(campocc);
				}
			}

			destinatarios.add(solicitante);
			log.warn("Adicionados destinatários");
			
			parametros.put("subject", assunto);
			notifier.notify("admin", "novochamado", parametros, destinatarios, "text/html");
		
			log.info("E-mail enviado? Scolicitação: " + numproc  + " Destinatários: " + destinatarios);
			
			
			var e_analista = new java.util.ArrayList();
			var field = hAPI.getCardValue("usRespTxt");
			
			// Consulta o Dataset para ver quem sao os usuarios deste grupo
			var grpCode = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", field, field, ConstraintType.MUST);
			var chavesDS = new Array( grpCode );
			var dsUsrGrp = DatasetFactory.getDataset("workflowColleagueRole", null, chavesDS, null);
			var idanalista = '';
			var analista = '';
			var tktAssunto = hAPI.getCardValue('assunto');
			var tktSolicitante = hAPI.getCardValue('name');
			var incidente = hAPI.getCardValue('txt_incidente');
			var assunto_analista = 'Um Novo Ticket de '+ topico_ajuda +' Foi Aberto. [#'+ numproc +' - HelpDesk Acer]';
			var param_analista = new java.util.HashMap();
			param_analista.put("subject", assunto_analista);
			var crit = hAPI.getCardValue('critval');
			
			for(var j = 0; j < dsUsrGrp.rowsCount; j++) {
				idanalista = dsUsrGrp.getValue(j, "workflowColleagueRolePK.colleagueId");
				analista = getNomeUsuario(idanalista);
				param_analista.put("analista", analista);
				param_analista.put("numsol", numproc);
				param_analista.put("datachamado", tktData);
				param_analista.put("assunto", tktAssunto);
				param_analista.put("solicitante", tktSolicitante);
				param_analista.put("topicoajuda", topico_ajuda);
				param_analista.put("incidente", incidente);
				param_analista.put("criticidade", crit);
				
				e_analista.add( idanalista );
				log.info("[AVISO] Adicionou usuario: " + dsUsrGrp.getValue(j, "workflowColleagueRolePK.colleagueId"));
			}	
			
			notifier.notify("admin", "an_novochamado", param_analista, e_analista, "text/html");	
			log.info("Scolicitação: " + numproc  + " Destinatários: " + e_analista);
			
			//Envia e-mail
			log.info("O Fluig enviou o e-mail de abertura de chamado para o usuário");
		} 
		catch(e){
			log.info("Entrou no catch");
			log.info("O Fluig não conseguiu enviar o e-mail de abertura de chamado para o usuário");
			log.info(e);
		}
	}
	
//	if (nextSequenceId == 15 && checkTransf()) {
//		try{
//			var numproc = getValue("WKNumProces") + "";;
//			var assunto = 'Um chamado foi transferido para você. [#'+ numproc +' - HelpDesk ACER]';
//			//Monta mapa com parâmetros do template
//			var parametros = new java.util.HashMap();
//			//Este parâmetro é obrigatório e representa o assunto do e-mail
//			parametros.put("subject", assunto);
//			
//			var e_analista = new java.util.ArrayList();
//			
//			// Consulta o Dataset para ver quem sao os usuarios deste grupo
//			var field = hAPI.getCardValue("usNovoRespTxt");
//			var grpCode = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", field, field, ConstraintType.MUST);
//			var chavesDS = new Array( grpCode );
//			var dsUsrGrp = DatasetFactory.getDataset("workflowColleagueRole", null, chavesDS, null);
//			var idanalista = '';
//			var analista = '';
//			var tpcaj = hAPI.getCardValue('usNomeTxt');
//			var tktData = hAPI.getCardValue('data_Chamado');
//			var solicitante = hAPI.getCardValue('name');
//			var assunto = hAPI.getCardValue('assunto');
//			
//			
//			for(var j = 0; j < dsUsrGrp.rowsCount; j++) {
//				idanalista = dsUsrGrp.getValue(j, "workflowColleagueRolePK.colleagueId");
//				analista = getNomeUsuario(idanalista);
//				parametros.put("analista", analista);
//				parametros.put("numsol", numproc);
//				parametros.put("topicoajuda", tpcaj);
//				parametros.put("datachamado", tktData);
//				parametros.put("solicitante", tpcaj);
//				parametros.put("assunto", assunto);
//								
//				e_analista.add(idanalista);
//			}
//			
//			log.info(parametros);
//			
//			notifier.notify("admin", "tkt_transferido", parametros, e_analista, "text/html");	
//			log.info("Scolicitação: " + numproc  + " Destinatários: " + e_analista);
//			
//			
//			}catch(e){
//			log.info('CHAMADO TRANSFERIDO ERRO:' + e);
//		}
//	}
//	
//	if (nextSequenceId == 15 && checkResolvido()) {
//		try{
//			log.info("inicio interagiu")
//			var numproc = getValue("WKNumProces") + "";;
//			var assunto = 'O usuário interagiu no chamado. [#'+ numproc +' - HelpDesk ACER]';
//			//Monta mapa com parâmetros do template
//			var parametros = new java.util.HashMap();
//			//Este parâmetro é obrigatório e representa o assunto do e-mail
//			parametros.put("subject", assunto);
//			
//			var e_analista = new java.util.ArrayList();
//			
//			// Consulta o Dataset para ver quem sao os usuarios deste grupo
//			var processo = getValue("WKNumProces") + "";;
//			var campos = hAPI.getCardData(processo);
//			var paifilhoindex = parseInt(hAPI.getCardValue('pfindex'));
//			
//			if (paifilhoindex < 1) {
//				var ultimaresp = campos.get("resposta___1");
//				log.info('ultimaresp '+ultimaresp);
//				var nomeultimaresp = campos.get("nomeRsp___1");
//				log.info('nomeultimaresp '+nomeultimaresp);
//				var dataresp = campos.get("dataRsp___1");
//				log.info('dataresp '+dataresp);
//				
//				} else {
//				var paifilhoindexprox = paifilhoindex + 1;
//				log.info('pfindexprox '+paifilhoindexprox);
//				var ultimaresp = campos.get("resposta___" + paifilhoindexprox);
//				log.info('ultimaresp '+ultimaresp);
//				var nomeultimaresp = campos.get("nomeRsp___" + paifilhoindexprox);
//				log.info('nomeultimaresp '+nomeultimaresp);
//				var dataresp = campos.get("dataRsp___" + paifilhoindexprox);
//				log.info('dataresp '+dataresp);
//			}
//			
//			var tktData = hAPI.getCardValue('data_Chamado');
//			var tktSolicitante = hAPI.getCardValue('name');
//			
//			var field = hAPI.getCardValue("usRespTxt");
//			var grpCode = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", field, field, ConstraintType.MUST);
//			var chavesDS = new Array( grpCode );
//			var dsUsrGrp = DatasetFactory.getDataset("workflowColleagueRole", null, chavesDS, null);
//			var idanalista = '';
//			var analista = '';
//			var tpcaj = hAPI.getCardValue('usNomeTxt');
//			var tktData = hAPI.getCardValue('data_Chamado');
//			var solicitante = hAPI.getCardValue('name');
//			var assunto = hAPI.getCardValue('assunto');
//			
//			
//			for(var j = 0; j < dsUsrGrp.rowsCount; j++) {
//				idanalista = dsUsrGrp.getValue(j, "workflowColleagueRolePK.colleagueId");
//				analista = getNomeUsuario(idanalista);
//				parametros.put("resposta", ultimaresp);
//				parametros.put("dataresp", dataresp);
//				parametros.put("nomersp", nomeultimaresp);
//				parametros.put("analista", analista);
//				parametros.put("numsol", numproc);
//				parametros.put("topicoajuda", tpcaj);
//				parametros.put("datachamado", tktData);
//				parametros.put("solicitante", tktSolicitante);
//				parametros.put("assunto", assunto);
//				
//				e_analista.add(idanalista);
//				log.info("analista adicionado: " + idanalista);
//				log.info(parametros);
//				
//			}	
//			
//			notifier.notify("admin", "tkt_respondido", parametros, e_analista, "text/html");
//			log.info(parametros);
//			log.info("Scolicitação: " + numproc  + " Destinatários: " + idanalista);
//			
//			
//			}catch(e){
//			log.info("O Fluig não conseguiu enviar o e-mail de abertura de chamado para o analista");
//			log.info('errozao:'+e);
//		}
//	}
	
//	if (nextSequenceId == 15 && checkReopen()) {
//		var numproc = getValue("WKNumProces") + "";;
//		var assunto = 'Um chamado foi reaberto! [#'+ numproc +' - HelpDesk ACER]';
//		//Monta mapa com parâmetros do template
//		var parametros = new java.util.HashMap();
//		//Este parâmetro é obrigatório e representa o assunto do e-mail
//		parametros.put("subject", assunto);
//		
//		var e_analista = new java.util.ArrayList();
//		
//		// Consulta o Dataset para ver quem sao os usuarios deste grupo
//		var field = hAPI.getCardValue("usRespTxt");
//		var grpCode = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", field, field, ConstraintType.MUST);
//		var chavesDS = new Array( grpCode );
//		var dsUsrGrp = DatasetFactory.getDataset("workflowColleagueRole", null, chavesDS, null);
//		var idanalista = '';
//		var analista = '';
//		var tpcaj = hAPI.getCardValue('usNomeTxt');
//		var tktData = hAPI.getCardValue('data_Chamado');
//		var solicitante = hAPI.getCardValue('name');
//		var assunto = hAPI.getCardValue('assunto');
//		
//		
//		for(var j = 0; j < dsUsrGrp.rowsCount; j++) {
//			idanalista = dsUsrGrp.getValue(j, "workflowColleagueRolePK.colleagueId");
//			analista = getNomeUsuario(idanalista);
//			parametros.put("analista", analista);
//			parametros.put("numsol", numproc);
//			parametros.put("topicoajuda", tpcaj);
//			parametros.put("datachamado", tktData);
//			parametros.put("solicitante", tpcaj);
//			parametros.put("assunto", assunto);
//			
//			e_analista.add();
//			
//		}	
//		notifier.notify("admin", "tkt_reaberto", parametros, e_analista, "text/html");	
//		log.info(parametros);
//		log.info("Scolicitação: " + numproc  + " Destinatários: " + idanalista);
//		
//	}
	
	// VALIDA A SOLUCAO 
	if (nextSequenceId == 9) {
		var numproc = getValue("WKNumProces") + "";;
		var assunto = 'Uma nova resposta foi adicionada ao chamado: #'+ numproc +' [HelpDesk ACER]';
		var parametros = new java.util.HashMap();
		var requisitante = hAPI.getCardValue('name');
		var idsol = hAPI.getCardValue('idSol');
		
		
		var destinatarios = new java.util.ArrayList();
		destinatarios.add(idsol.toString());	 
		
		
		var processo = getValue("WKNumProces") + "";;
		var campos = hAPI.getCardData(processo);
		var paifilhoindex = parseInt(hAPI.getCardValue('pfindex'));
		
		if (paifilhoindex < 1) {
			var ultimaresp = campos.get("resposta___1");
			var nomeultimaresp = campos.get("nomeRsp___1");
			var dataresp = campos.get("dataRsp___1");
			} else {
			var paifilhoindexprox = paifilhoindex + 1;
			var ultimaresp = campos.get("resposta___" + paifilhoindexprox);
			var nomeultimaresp = campos.get("nomeRsp___" + paifilhoindexprox);
			var dataresp = campos.get("dataRsp___" + paifilhoindexprox);
		}
		
		// DESTINATARIOS EM CÓPIA
		var camposItem = new Array('campocc');
		var ccList = consultaDadosPaiFilho(camposItem);
		
		if (ccList.length > 0) {
			// ccindex = ccindex + 1;
			for(var i = 0; i < ccList.length; i++){
				var cc = ccList[i];
				var campocc = cc['campocc'].value;
				destinatarios.add(campocc);
			}
		}
		
		var tktData = hAPI.getCardValue('data_Chamado');
		var tktAssunto = hAPI.getCardValue('assunto');
		var tktSolicitante = hAPI.getCardValue('name');
		var login = hAPI.getCardValue('login');
		
		parametros.put("resposta", ultimaresp);
		parametros.put("dataresp", dataresp);
		parametros.put("nomersp", nomeultimaresp);
		parametros.put("numsol", numproc);
		parametros.put("datachamado", tktData);
		parametros.put("assunto", tktAssunto);
		parametros.put("solicitante", tktSolicitante);
		
//		destinatarios.add(login);	 
		log.info("Scolicitação: " + numproc  + " Destinatários: " + login);
		
		parametros.put("subject", assunto);
		notifier.notify("admin", "tkt_valida", parametros, destinatarios, "text/html");
		
		log.info(parametros);
		log.info("Scolicitação: " + numproc  + " Destinatários: " + destinatarios);
		
	}
	
	if (nextSequenceId == 22) {
		var processo = getValue("WKNumProces") + "";;
		var numproc = getValue("WKNumProces") + "";;
		var campos = hAPI.getCardData(processo);
		var paifilhoindex = parseInt(hAPI.getCardValue('pfindex'));
		
		if (paifilhoindex < 1) {
			var ultimaresp = campos.get("resposta___1");
			var nomeultimaresp = campos.get("nomeRsp___1");
			var dataresp = campos.get("dataRsp___1");
			} else {
			var paifilhoindexprox = paifilhoindex + 1;
			var ultimaresp = campos.get("resposta___" + paifilhoindexprox);
			var nomeultimaresp = campos.get("nomeRsp___" + paifilhoindexprox);
			var dataresp = campos.get("dataRsp___" + paifilhoindexprox);
		}
		var assunto = 'O chamado #'+ numproc +' foi finalizado! [AVALIE O ATENDIMENTO - HelpDesk ACER]';
		var parametros = new java.util.HashMap();
		var requisitante = hAPI.getCardValue('name');
		var idsol = hAPI.getCardValue('idSol');
		
		
		var destinatarios = new java.util.ArrayList();
		destinatarios.add(idsol.toString());	 
		
		
		// DESTINATARIOS EM CÓPIA
		var camposItem = new Array('campocc');
		var ccList = consultaDadosPaiFilho(camposItem);
		
		if (ccList.length > 0) {
			// ccindex = ccindex + 1;
			for(var i = 0; i < ccList.length; i++){
				var cc = ccList[i];
				var campocc = cc['campocc'].value;
				destinatarios.add(campocc);
			}
		}
		
		var tktData = hAPI.getCardValue('data_Chamado');
		var tktAssunto = hAPI.getCardValue('assunto');
		var tktSolicitante = hAPI.getCardValue('name');
		
		parametros.put("resposta", ultimaresp);
		parametros.put("dataresp", dataresp);
		parametros.put("nomersp", nomeultimaresp);
		parametros.put("subject", assunto);
		parametros.put("numsol", numproc);
		parametros.put("datachamado", tktData);
		parametros.put("assunto", tktAssunto);
		parametros.put("solicitante", tktSolicitante);
		
		
		notifier.notify("admin", "tkt_fechado", parametros, destinatarios, "text/html");
		log.info(parametros);
		log.info("Scolicitação:" + numproc  + "Destinatários: " + destinatarios);
	}
	
	if (nextSequenceId == 40 && atvcampo == 9) {
		var usres = hAPI.getCardValue('us_resolvido');
		
		var processo = getValue("WKNumProces") + "";;
		var numproc = getValue("WKNumProces") + "";;
		var campos = hAPI.getCardData(processo);
		var paifilhoindex = parseInt(hAPI.getCardValue('pfindex'));
		
		if (paifilhoindex < 1) {
			var ultimaresp = campos.get("resposta___1");
			var nomeultimaresp = campos.get("nomeRsp___1");
			var dataresp = campos.get("dataRsp___1");
			} else {
			var paifilhoindexprox = paifilhoindex + 1;
			var ultimaresp = campos.get("resposta___" + paifilhoindexprox);
			var nomeultimaresp = campos.get("nomeRsp___" + paifilhoindexprox);
			var dataresp = campos.get("dataRsp___" + paifilhoindexprox);
		}
		
		var assuntoemail = 'O usuário encerrou o chamado. [#'+ numproc +' - HelpDesk ACER]';
		//Monta mapa com parâmetros do template
		var parametrosanalista = new java.util.HashMap();
		//Este parâmetro é obrigatório e representa o assunto do e-mail
		parametrosanalista.put("subject", assuntoemail);
		
		var e_analista = new java.util.ArrayList();
		
		// Consulta o Dataset para ver quem sao os usuarios deste grupo
		var field = hAPI.getCardValue("usRespTxt");
		var grpCode = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", field, field, ConstraintType.MUST);
		var chavesDS = new Array( grpCode );
		var dsUsrGrp = DatasetFactory.getDataset("workflowColleagueRole", null, chavesDS, null);
		var idanalista = '';
		var analista = '';
		var tpcaj = hAPI.getCardValue('usNomeTxt');
		var tktData = hAPI.getCardValue('data_Chamado');
		var solicitante = hAPI.getCardValue('name');
		var assunto = hAPI.getCardValue('assunto');
		
		for(var j = 0; j < dsUsrGrp.rowsCount; j++) {
			idanalista = dsUsrGrp.getValue(j, "workflowColleagueRolePK.colleagueId");
			analista = getNomeUsuario(idanalista);
			parametrosanalista.put("analistaf", analista);
			parametrosanalista.put("numsol", numproc);
			parametrosanalista.put("topicoajuda", tpcaj);
			parametrosanalista.put("datachamado", tktData);
			parametrosanalista.put("solicitante", solicitante);
			parametrosanalista.put("assunto", assunto);
			parametrosanalista.put("resposta", ultimaresp);
			parametrosanalista.put("dataresp", dataresp);
			parametrosanalista.put("nomersp", nomeultimaresp);
			
			if (e_analista.contains(idanalista)) {
				continue;
			} else {				
				e_analista.add(idanalista);				
			}
			
		}
		
		notifier.notify("admin", "tkt_respondidof", parametrosanalista, e_analista, "text/html");	
		log.info(parametrosanalista);
		log.info("Analista - Scolicitação: " + numproc  + " Destinatários: " + e_analista);
	}
}