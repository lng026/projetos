function afterTaskSave(colleagueId,nextSequenceId,userList){
		if(nextSequenceId == 90){
			var url = "http://acer.fluig.com";
			var COD_solicitacao = getValue("WKNumProces");
			var user = getValue("WKUser");
			var empresa = getValue('WKCompany');
			//busca usuarios do papel de aprovadores do RH
			var cs1 = DatasetFactory.createConstraint('roleId', 'aprovadores_rh', 'aprovadores_rh', ConstraintType.MUST);
			var dsUsersRole = DatasetFactory.getDataset('dsUsersRole', null, new Array(cs1), null);
			
			for (var i = 0; i < dsUsersRole.rowsCount; i++) {
				var destNome = dsUsersRole.getValue(i,'colleagueName');
				var destId = dsUsersRole.getValue(i,'colleagueId');
				//tenta enviar uma email para cada
				try{
				    //Monta mapa com parametros do template
				    var parametros = new java.util.HashMap();
				    var conteudo  = "Uma nova solciitações de Reembolso de despesas necessita de aprovação do RH".
				    parametros.put("RECEIVER", destNome);
				    parametros.put("EVENT", conteudo);
				    parametros.put("SERVER_URL", url);
				    parametros.put("TENANT_ID", empresa); 
				    parametros.put("SENDERS_LINKS", '');
				    parametros.put("DESCRIPTION", 'Aprovação do reembolso de despesas');
				    parametros.put("LINK",url);
				    var assunto = "Aprovação de Reembolso de despesas RH nº" + ' ' +COD_solicitacao;
				    parametros.put("subject", assunto);
				 
				    //Monta lista de destinat�rios
				    var destinatarios = new java.util.ArrayList();
				    destinatarios.add(destId.toString());
				 
				    //Envia e-mail
				    notifier.notify("admin", "DEFAULT_EMAIL_NOTIFICATION", parametros, destinatarios, "text/html");
				 
				} catch(e){
				    log.info(e);
				}
			}
		}

}