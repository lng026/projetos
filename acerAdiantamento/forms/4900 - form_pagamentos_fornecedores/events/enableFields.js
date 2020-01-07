/*Pedro Muriel Sousa
 *pedromuriel.sousa@gmail.com 
 * */
/*Declarando atividades */
function enableFields(form){ 
	
	var activity = parseInt(getValue('WKNumState')); /*armazena o numero da solicitacao*/
	log.info('LOG: '+getValue("WKNumProces"));
	log.info('LOG: '+getValue("WKCompany"));
	log.info('LOG: '+getValue("WKCardId"));
	form.setValue('WKinformacoes',getValue("WKNumProces")+";"+getValue("WKCompany")+";"+getValue("WKCardId"));
	if(activity == 0){activity =4;}
	form.setValue('WKMode',form.getFormMode());
    form.setValue('campo_processo', activity);
    form.setEnhancedSecurityHiddenInputs(true);
    form.setHidePrintLink(true);
    /*tratar do retorno fiscal para ajuste do solicitante*/
    
  	if(activity == verificaNeg){
  		var aprovFiscal = form.getValue('fiscalAprov');
  		var aprovMng = form.getValue('MngrAprov');
		if(aprovFiscal == 'nao' || aprovMng == 'nao'){
	    	activity=inicio;
		}
	}       
    /*Bloqueando campos */
    form.setEnabled("NmSolic",(activity==inicio));
    form.setEnabled("cCodForn", (activity==inicio));
    form.setEnabled("VencData", (activity==inicio));
    form.setEnabled("cCentroCusto",(activity==inicio));
    form.setEnabled("EmissData",(activity==inicio));
    form.setEnabled("ValTitulo",  (activity==inicio));
    form.setEnabled("obsPayment",   (activity==inicio));
    form.setEnabled("cEmpresa",   (activity==inicio));
    form.setEnabled("cFilial",   (activity==inicio));
    form.setEnabled("WKsuperior",  (activity==inicio));
    form.setEnabled("descContaOrc",(activity==inicio));
    
    form.setEnabled("docNumTit", (activity==inicio)); 
    form.setEnabled("docNfeTit", (activity==inicio)); 
    form.setEnabled("docSerieTit", (activity==inicio)); 
    
    
    form.setEnabled("rateioCC",  (activity==inicio));
    form.setEnabled("optTransaction",  (activity==inicio));
    controlaCamposPaiFilho(['cCentroCustoRat',
                            'valorCCusto',
                            'percentualCCusto'], form, (activity==inicio));

    form.setEnabled("MngrAprov",   (activity==aprovador));
    form.setEnabled("negativaGest",(activity==aprovador));
   
    //form.setEnabled("aprovmngrSupply",   (activity==avalPedido));
    //form.setEnabled("negativaSupply",(activity==avalPedido));

    // form.setEnabled("TipoTitulo",  (activity==finalizar));
    // form.setEnabled("cCodNatureza", (activity==finalizar));
    form.setEnabled("docFiscal", (activity==finalizar));

    form.setEnabled("fiscalAprov", (activity==finalizar));
    form.setEnabled("negativaFiscal", (activity==finalizar));

    form.setEnabled("MSGRETORNOTIT",  false);
}
function controlaCamposPaiFilho(fields1, form, enable){
	log.info('Controla campos pai x filho');
	var fields = consultaDadosPaiFilho(fields1, form);
	log.info("Lista FILHO: "+fields);
	for(var i=0; i<fields.length; i++){
		log.info('Campo field '+fields[i].cCentroCustoRat.name);
		log.info('Campo field '+fields[i].valorCCusto.name);
		log.info('Campo field '+fields[i].percentualCCusto.name);
		form.setEnabled(fields[i].cCentroCustoRat.name, enable);
		form.setEnabled(fields[i].valorCCusto.name, enable);
		form.setEnabled(fields[i].percentualCCusto.name, enable);
	}
}