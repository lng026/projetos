function intermediateconditional138() {
	log.info("Envio de e-mail, fim do período de vigência do contrato");
	try { 
        var param = new java.util.HashMap();
        var dest = new java.util.ArrayList();
        var server = "https://acer.fluig.com";
        var autor = getValue("WKUser");
        var codSolicitante = hAPI.getCardValue("usrSolicitante");
        var numSolicitacao = hAPI.getCardValue("numSolicitacao");
        var aprovador = verificaAprov(codSolicitante);
        
        var cons1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', codSolicitante, codSolicitante, ConstraintType.MUST);
        var cons2 = DatasetFactory.createConstraint('colleaguePK.colleagueId', aprovador, aprovador, ConstraintType.MUST);
        var dataset = DatasetFactory.getDataset('colleague', null, new Array(cons1,cons2), null);
        
        var nomeSolicitante = dataset.getValue(0, "colleagueName");
        var emailSolicitante = dataset.getValue(0, "mail");

        var nomeAprovador = dataset.getValue(1, "colleagueName");
        var emailAprovador = dataset.getValue(1, "mail");
        
        
        log.info("Inicio do envio do email");
        //assunto do e-mail
	    param.put("subject", "Solicitação de contrato - Prazo de vigência expirado");

 		var msg1 = "Olá<br><br>";
 		var msg2 = "<p>O prazo de vigência de sua solicitação de contrato (<a href='"+numSolicitacao+"'>"+numSolicitacao+"</a>) expirou!</p><p>Entre em contato com o setor juridico da acer para dar continuidade ao processo.</p>"
 		
 		param.put("VARIAVEL_1", msg1);
 		param.put("VARIAVEL_2", msg2);
        
         //define o destino do email
		dest.add(emailAprovador);
 		dest.add(emailSolicitante);
 		dest.add("evaldo.maciel@erpworks.com.br");
 		
         //pegar imagem do servidor do fluig
        param.put("SERVER_URL", server);
            
         //nome da pessoa que recebe
        param.put("RECEIVER", "");

         //nome do remetente
         param.put("WKUser", "roger@erpworks.com.br");//EMAIL QUE ENVIARA A S


     if (dest.size() > 0){
     	notifier.notify(autor, "teste_envio", param, dest, "text/html");
       	log.info("Email enviado com sucesso");
       	log.info("Destinatários: " + dest);
       	return true;
     }
       
                
    } catch (e) {
        log.error(">>>>> Erro Envio de email de customizado: " + e.message);
        return false;
    }
	
	function verificaAprov(user){
	  	var c1 = DatasetFactory.createConstraint('solicitante', user, user, ConstraintType.MUST);
	  	var dataset = DatasetFactory.getDataset('dsFormAprovadoresContrato', null, new Array(c1), null);
	  	var row = [];

		//var nomeSolicitante = dataset.getValue(0, "colleagueName");
   		var aprovador = dataset.getValue(0, "aprovador");
   		
   		log.info("Aprovador do solicitante: " + aprovador);
   		
	  	return aprovador;
	}
}