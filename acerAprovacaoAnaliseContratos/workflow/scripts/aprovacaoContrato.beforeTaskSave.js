function beforeTaskSave(colleagueId,nextSequenceId,userList){
	WKNumProces = getValue("WKNumProces");
	hAPI.setCardValue("numSolicitacao", WKNumProces);
 
    log.info("Salvo no fomulário o número do processo no campo numSolicitacao: " + WKNumProces);

    if (nextSequenceId) {    
        try{
			var SOLICITANTE =  hAPI.getCardValue("usrSolicitante");
			var nomeSolicitante =  hAPI.getCardValue("nomeSolicitante");
			var APROVADOR = hAPI.getCardValue("usrAprovador");
			var ultimoUsuario = hAPI.getCardValue("ultimoUsuario");
			var nomeDoAprovador = hAPI.getCardValue("nomeDoAprovador");
			var processo = getValue("WKNumProces");
			var atividade = getValue("WKNumState");
			var subject = "Processo: "+  getValue("WKNumProces") + " - Gestão de Contratos";
			var idParaLink = getValue("WKNumProces") + " ";
			var template = "eMailAprovacaoContratos";
			var aprovJudiciario = hAPI.getCardValue("aprovJudiciario");

			if  (nomeDoAprovador != "" || nomeDoAprovador != null) {
				nomeDoAprovador = hAPI.getCardValue("nomeDoAprovador");
				displayAprovador = "block";
			}

			if (nomeDoAprovador == "" || nomeDoAprovador == null) {
				nomeDoAprovador = "Aprovador não definido";
				displayAprovador = "none";
			}

			if(aprovJudiciario != "" || aprovJudiciario != null) {
				aprovJudiciario = hAPI.getCardValue("aprovJudiciario");
				displayJuridico = "block";
			}

			if(aprovJudiciario == "" || aprovJudiciario == null) {
				aprovJudiciario = "Aprovador não definido";
				displayJuridico = "none";
			}
			
			// Definição de texto
			function textoDoEmail(atividade) {

			 	if (atividade == 4) {
			 		texto = "Nova solicitação de contrato"; 
			 		return texto;
			 	}

			 	if (atividade == 5 || atividade == 11 || atividade == 13 || atividade == 15) {
			 		texto = "Análise do contrato"; 
			 		return texto;
			 	}
					
			 	if (atividade == 30) {
			 		texto = "Consolidação de contrato"; 
			 		return texto;
			 	}
			
			 	if (atividade == 34) {
			 		texto = "Coleta de assinaturas Acer"; 
			 		return texto;
			 	}
		
			 	if (atividade == 36) {
			 		texto = "Processo finalizado"; 
			 		return texto;
			 	}
					
			 	if (atividade == 48 || atividade == 51 || atividade == 56) {
			 		texto = "Revisão solicitante";
			 		return texto;
			 	}
		
			 	if (atividade == 61) {
			 		texto = "Aprovação do gestor"; 
			 		return texto;
			 	}
		
			 	if (atividade == 66) {
			 		texto = "Fim com cancelamento de processo"; 
			 		return texto;
			 	}
		
			 	if (atividade == 68) {
			 		texto = "Corrigir"; 
			 		return texto;
			 	}
		
			 	if (atividade == 96) {
			 		texto = "Solicitante"; 
			 		return texto;
			 	}
		
			 	if (atividade == 106) {
			 		texto = "Contrato Vigente"; 
			 		return texto;
			 	}
		
			 	if (atividade == 108) {
			 		texto = "Contrato Expirado"; 
			 		return texto;
			 	}
														
			 	if (atividade == 138) {
			 		texto = "Intermediário - Script"; 
			 		return texto;
			 	}
														
			 	if (atividade == 143 || atividade ==  146 || atividade ==  150 || atividade ==  151 || atividade ==  160) {
			 		texto = "Revisão Jurídico"; 
			 		return texto;
			 	}
			
			 	if (atividade == 184) {
			 		texto = "Análise do contrato"; 
			 		return texto;
			 	}

			 	if (atividade == 187){
			 		texto = "Revisão solicitante";
			 		return texto;
			 	}

			 	if (atividade == 188){
			 		texto = "Revisão jurídico";
			 		return texto;

			 	}
			 	else {
			 		texto = "Condicional";
			 		return texto;
			 	}
			 }
			var textoEmail = "<b>" + ultimoUsuario + "</b> movimentou a atividade <b> " + textoDoEmail(atividade) + "</b> (" + atividade +")" + " para <b>" + textoDoEmail(nextSequenceId) + "</b> (" + nextSequenceId +").";
			var atividadeAtualTexto = atividade;
			var proximaAtividadeTexto = nextSequenceId;

			var descricaoAtividade = atividade + " - " + textoDoEmail(atividade);


			var destinatarios = new java.util.ArrayList();
			destinatarios.add(APROVADOR);
			destinatarios.add(SOLICITANTE);

			// Apenas para efeito de log
			log.info("##############################################");
			log.info("oem-transferencia-instrumentos: onNotify"); 
			log.info("WKNumProces			: " + processo);
			log.info("WKNumState			: " + atividade);
			log.info("Próxima atividade		: " + nextSequenceId);
			log.info("subject				: " + subject);
			log.info("Atividade				: " + atividadeAtualTexto);
			log.info("Próxima				: " + proximaAtividadeTexto);
			log.info("destinatarios			: " + destinatarios);
			log.info("Solicitante			: " + nomeSolicitante);
			log.info("Aprovador				: " + nomeDoAprovador);
			log.info("Aprovador Jurídico	: " + aprovJudiciario);
			log.info("template				: " + template);    
			log.info("texto					: " + textoEmail);    
			log.info("Display Aprovador		: " + textoEmail);    
			log.info("Display Jurídico		: " + textoEmail);    
			log.info("##############################################");

            //Monta mapa com parâmetros do template - esses parâmetros são recebidos no template do e-mail
            var parametros = new java.util.HashMap();
            parametros.put("PROCESSO", processo);
            parametros.put("SOLICITACAO", atividade);
            parametros.put("SOLICITANTE", SOLICITANTE);
            parametros.put("SOLICITANTE_NOME", nomeSolicitante);
            parametros.put("APROVADOR", APROVADOR);
            parametros.put("APROVADOR_NOME", nomeDoAprovador);
            parametros.put("APROVADOR_JURIDICO", aprovJudiciario);
            parametros.put("TEXTO", textoEmail);
            parametros.put("ATIVIDADE", atividade);
            parametros.put("ATIVIDADE_ATUAL_TEXTO", atividadeAtualTexto);
            parametros.put("PROXIMA_ATIVIDADE_TEXTO", proximaAtividadeTexto);
            parametros.put("PROXIMA_ATIVIDADE", nextSequenceId);
            parametros.put("DESCRICAO_ATIVIDADE", descricaoAtividade);
            parametros.put("DISPLAY_APROVADOR", displayAprovador);
            parametros.put("DISPLAY_JURIDICO", displayJuridico);
            parametros.put("ID", idParaLink);

            //Este parâmetro é obrigatório e representa o assunto do e-mail
			parametros.put("subject", subject);  

            //Envia e-mail
            notifier.notify("admin", template, parametros, destinatarios, "text/html");
            
        } catch(e){
            log.info(e);
        }
	}


}