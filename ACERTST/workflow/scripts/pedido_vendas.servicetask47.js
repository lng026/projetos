function servicetask47(attempt, message) {
 try {
		log.info('integracao: liberar pedido de venda'); 
		//instancia servicos de integracao
		  log.info('instancia servicos de integracao');
		 var pre = 'br.com.totvs.agptec._10222';
		 var caminho = pre + '.WSFLUIG';
		 var Service = ServiceManager.getService('WSFLUIG');
		 var serviceHelper = Service.getBean();
		 var serviceLocator = serviceHelper.instantiate(caminho);
		 
		 var sv = serviceLocator.getWSFLUIGSOAP();
		 
		 var CID = getValue("WKNumProces");
		 var retorno = hAPI.getCardValue("retorno");
		 log.info("Liberar pedido CID: " + CID + " - bloq: " + retorno);
		 
		 log.info('instancia objeto LIBPEDIDO');
		 var libPedidoVenda = serviceHelper.instantiate(pre+".LIBPEDIDOVENDA");
		 
		 libPedidoVenda.setCID(CID);
		 libPedidoVenda.setCBLOQUEIO(retorno);
		 var liberaPV = sv.liberapedidovenda(libPedidoVenda);
		 if(liberaPV.trim() != ""){
			 log.info('liberaPV: ' + liberaPV);
			 var status = liberaPV.substring(0,2);
			 var liberaDesc = semCaractere(liberaPV.substring(2),'-');
			 hAPI.setCardValue('msgRetorno', liberaPV);
			 hAPI.setCardValue('retorno', status);
			 log.info("status: " + status);
			 log.info("status descricao: " + liberaDesc);
		 }else{
			 hAPI.setTaskComments("admin", CID, 0, "Não é Permitido liberar estoque pela plataforma fluig.");
		 }
		
 
 } catch(error) { 
	log.error(error);
	throw error;
 }
 
 
 
 

 function semCaractere(valor, c){
 	while(valor.indexOf(c) >= 0){
 		valor = valor.replace(c,'');
 	}
 	return valor;
 }
 
 
 
 
 
 
 
 
 
 
 
 
 
}


