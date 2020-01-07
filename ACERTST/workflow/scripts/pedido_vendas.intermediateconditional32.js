function intermediateconditional32() {
	 try {
		log.info('integracao: consulta status pedido de venda'); 
		//instancia servicos de integracao
		  log.info('instancia servicos de integracao');
		 var pre = '_223._60._94._187._12547';
		 var caminho = pre + '.WSFLUIG';
		 var Service = ServiceManager.getService('WSFLUIG');
		 var serviceHelper = Service.getBean();
		 var serviceLocator = serviceHelper.instantiate(caminho);
		 
		 var sv = serviceLocator.getWSFLUIGSOAP();
		 
		 var CID = getValue("WKNumProces");
		 var retorno = hAPI.getCardValue("retorno");
		 var idsPedidos = hAPI.getCardValue("retornoIds");
		 var aIds =  idsPedidos.split(',');
		 var aStatusRel = new Array();
		 
		 for (var i = 0; i < aIds.length; i++) {
			 var id = aIds[i];
			 if(id){
				log.info("Consulta status CID: " + id);
				var statusPV = sv.statuspedidovenda(id);
				log.info("statusPV: " + statusPV);
				var status = statusPV.substring(0,2);
				log.info("status: " + status);
				aStatusRel.push(status);
				// if(status != "04"){
				// 	hAPI.setCardValue("retorno", status);
				// 	hAPI.setCardValue('msgRetorno', statusPV);
				// 	hAPI.setTaskComments("admin", CID, 0, statusPV);
				// 	log.info('Status diferente de 04 - retornar');
				// 	return true;
				// }
			 }
		 }
		 
		 var avance = true;
		 for (var k = 0; k < aStatusRel.length; k++) {
			var e = aStatusRel[k];
			if(e.toString() != "05"){
				avance = false;
			}
		 }

		 if(avance){	
			hAPI.setCardValue("retorno", status);
		   //  hAPI.setCardValue('msgRetorno', statusDesc);
		   //  hAPI.setTaskComments("admin", CID, 0, statusDesc);
			log.info('retornar');
			return true;
		}else{
		   hAPI.setCardValue("retorno", "04");			 
			return false;
		}
		 
	 } catch(error) { 
		log.error(error);

	 }
 
 
	 
	 function semCaractere(valor, c){
	 	while(valor.indexOf(c) >= 0){
	 		valor = valor.replace(c,'');
	 	}
	 	return valor;
	 }
	 
	 function getStatus(st){
		 var aStatus = new Array();
		 aStatus['01']= 'BLOQUEIO DE REGRA';
		 aStatus['02']= 'BLOQUEIO DE CREDITO';
		 aStatus['03']= 'BLOQUEIO DE ESTOQUE';
		 aStatus['04']= 'AGUARDANDO FATURAMENTO';
		 aStatus['05']= 'FINALIZADO/FATURADO';
		 aStatus['05']= 'AGUARDANDO LIBERACAO';
		 return aStatus(st);
		 
	 }
	 
}

