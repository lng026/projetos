function servicetask56(attempt, message) {
  log.info("-- INICIO DE INTEGRACAO REEMBOLDO DE DESPESAS --");
  var CID = getValue("WKNumProces");
	var usuario = getValue("WKUser");
  var ccgc = semCaractere(semCaractere(hAPI.getCardValue('cpf'),'.'),'-');
  var camposDesp = new Array('despdata','despctacontabil', 'despclientedesc','desptaxa', 'desptotal', 'desjustificativa');
  var dadosDespesas = consultaDadosPaiFilho(camposDesp);
  log.info('paifilho:' + dadosDespesas);
 try {
//   var pre = 'br.com.totvs.agptec._10222';
	 var pre = 'br.com.totvscloud.mw0sd1_prd_protheus._11685';
   var caminho = pre + '.WSFLUIG';
    // Conecta o servico
     var periodicService = ServiceManager.getService('WSFLUIG');
     var serviceHelper = periodicService.getBean();
     var serviceLocator = periodicService.instantiate(caminho);
     var service = serviceLocator.getWSFLUIGSOAP();
     var arrayDespesaItem = periodicService.instantiate(pre + '.ARRAYOFDESPESAITEM');
     //monta objeto para INTEGRACAO
     for (var i = 0; i < dadosDespesas.length; i++) {
       var desp = dadosDespesas[i];
       var itemDesp = periodicService.instantiate(pre + '.DESPESAITEM');
       itemDesp.setCCONTACONTABIL(desp['despctacontabil'].value);
       itemDesp.setCDATA(desp['despdata'].value);
       itemDesp.setCNOMECLIENTE(desp['despclientedesc'].value);
       itemDesp.setNTXCAMBIO(semCaractere(desp['desptaxa'].value,','));
       itemDesp.setNVALOR(semCaractere(desp['desptotal'].value,','));
       itemDesp.setCJUSTIFICATIVA(desp['desjustificativa'].value);
       arrayDespesaItem.getDESPESAITEM().add(itemDesp);
     }
     log.info('arrayDespesaItem:' + arrayDespesaItem);
     var despesa = periodicService.instantiate(pre + '.DESPESA');
     despesa.setCCGC(ccgc);
     despesa.setCID(CID);
     despesa.setADESPESAITENS(arrayDespesaItem);
     log.info("despesa: " + Object(despesa).toString());
     
     var result = service.gravadespesaviagem(despesa);
    /* log.info("response: " + JSON.stringify(response));
     var result = response.getGRAVADESPESAVIAGEMRESULT();
     */
    
     log.info('cerro:' + result.getCERRO());
     log.info('cchave:' + result.getCCHAVE());
     log.info('msg:' + result.getCMSG());
     
     if(result.getCERRO() == "N"){
    	 hAPI.setCardValue('cchave', result.getCCHAVE());
    	 hAPI.setCardValue('msgRetorno', "Título inserido com sucesso! - Chave: " + result.getCCHAVE());
     }
     
     if(result.getCERRO() == "S"){
    	 hAPI.setCardValue('msgRetorno', "Título não inserido. - Retorno: " + result.getCMSG());
    	 log.info('msgRetorno Erro:' + result.getCMSG());
    	 hAPI.setTaskComments(usuario, CID, 0, result.getCMSG)
    	 throw result.getCMSG();
     }

 } catch(error) {
	log.error(error);
	hAPI.setCardValue('msgRetorno', "Título não inserido. Retorno: " + error);
	throw error;
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

 function semCaractere(valor, c){
 	while(valor.indexOf(c) >= 0){
 		valor = valor.replace(c,'');
 	}
 	return valor;
 }

}
