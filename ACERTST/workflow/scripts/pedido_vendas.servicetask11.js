function servicetask11(attempt, message) {
	try {
		 //inicio integracao pedido de venda
		   log.info('inicio integracao pedido de venda');
   
			 //instancia servicos de integracao
			   log.info('instancia servicos de integracao');
			   var pre = '_223._60._94._187._12547';
			   var caminho = pre + '.WSFLUIG';
			   var Service = ServiceManager.getService('WSFLUIG');
			   var serviceHelper = Service.getBean();
			   var serviceLocator = serviceHelper.instantiate(caminho);
			   var sv = serviceLocator.getWSFLUIGSOAP();
   
   
	   
	   
		//busca dados no formulário
		log.info('busca dados no formulário');
		var CID = getValue("WKNumProces");
		log.info('CID: ' + CID);
		var CCNPJ = hAPI.getCardValue('pv_cli_cnpj');
		log.info('CCNPJ' + CCNPJ);
	   // var CEMPFILIAL = hAPI.getCardValue('pv_filial');
		var CLOCAL = hAPI.getCardValue('pv_local');
		var CTRANSP = hAPI.getCardValue('pv_local');
   
		   var camposItem = new Array('pv_produto_cod', 'pv_pro_qty','pv_pro_custo','pv_local', 'pv_filial', 'pv_transCod', 'pvQtdVol', 'pvEspVol','pv_idPEd','pv_crdd','pv_nPedido');
		   
		   var dadosItensForm = consultaDadosPaiFilho(camposItem);
	   //armazena pedidos de vendas que seao integrados
		   var aPedidoVendas = new Array();
   
	   log.info("dadosItensForm: ");
	   imprimeArray(dadosItensForm);
	   dadosItensForm.sort(sortFilial);
	   log.info("dadosItensForm: ");
	   imprimeArray(dadosItensForm);
	   var afg = groupBy(dadosItensForm,'pv_filial');
	   //ordena arrya por transportadoras
	   for (var k in afg) {
		   if (afg.hasOwnProperty(k)) {
			   afg[k].sort(sortTransp);
			   log.info('afg sortTransp - ' + k);
			   imprimeArray(afg[k]);
			   var atg = groupBy(afg[k], 'pv_transCod');
			   log.info('atg  - ' + k);			
			   imprimeArray2(atg);
			   for (var i in atg) {
				   if (atg.hasOwnProperty(i)) {
					   var itens = atg[i];
					   var pedido = montaPedidoVenda(itens);
					   aPedidoVendas.push(pedido);
				   }
			   }//for atg
		   }
	   }//for afg
	   var msgAtual = hAPI.getCardValue('msgRetorno');
	   var idsPedidos = '';
	   log.info('msgAtual: ' + msgAtual);
   
	   log.info('pedidos: ' + aPedidoVendas);
	   for (var i in aPedidoVendas) {
		   if (aPedidoVendas.hasOwnProperty(i)) {
			   var pedido = aPedidoVendas[i];
			   idsPedidos += ""+pedido.getCID() + ",";
			   var	gPedidoVendaRes = gravaPedidoVenda(pedido);
   
			   log.info("gravapedidovenda: " + gPedidoVendaRes);
			   
			   msgAtual +=  ',' + gPedidoVendaRes;
			   //verificar codigo
			   var status = gPedidoVendaRes.substring(0,2);
			   //hAPI.setCardValue('retorno', status);
			   if (status.toString() == '99') {
				   throw gPedidoVendaRes;
			   }
		   }
	   }
	   log.info('msgAtual: ' + msgAtual);	
	   log.info('idsPedidos: ' + idsPedidos);	
	   hAPI.setCardValue('msgRetorno', msgAtual );
	   hAPI.setCardValue('retornoIds', idsPedidos );
	   
	} catch(error) { 
	   log.error(error);
	   throw error;
	}
	
	function gravaPedidoVenda(pVenda){
	   var gPedidoVendaRes = sv.gravapedidovenda(pVenda);
	   return gPedidoVendaRes;
	}
   
	function montaPedidoVenda(dadosItensForm){
			 //montar objeto do pedido de venda para integracao
			   log.info('montar objeto do pedido de venda para integracao');
			   var pedidoVenda = serviceHelper.instantiate(pre+".PEDIDOVENDA");
			   
			   pedidoVenda.setCID(CID + "_" + dadosItensForm[0]['pv_idPEd'].value);
			   pedidoVenda.setCCNPJCLIENTE(CCNPJ);
			   pedidoVenda.setCFILIALPV(dadosItensForm[0]['pv_filial'].value);
			   pedidoVenda.setCTRANSP(dadosItensForm[0]['pv_transCod'].value);
			   pedidoVenda.setCESPECIEVOL(dadosItensForm[0]['pvEspVol'].value);
			   var somaQtd = somaQtdVol(dadosItensForm);
			   pedidoVenda.setNQTDEVOL(somaQtd.toFixed(2));
			   
			   var arrayItemPedido =  montaPVItens(dadosItensForm);
			   log.info("itens Pedido:" + arrayItemPedido);
			   
			   //adiciona lista de intes do pedido de vena ao objeto do pedido
			   pedidoVenda.setAITENS(arrayItemPedido);
			   log.info('pedidoVenda: '+ pedidoVenda);
			   return pedidoVenda;
	}
   
	
   function montaPVItens(dadosItensForm){
	   var arrayItemPedido = serviceHelper.instantiate(pre+".ARRAYOFPEDIDOVENDAITEM");
		
	   //monta array com itens do pedido de venda
	   log.info('monta array com itens do pedido de venda');
		for (var i = 0; i < dadosItensForm.length; i++) {
			var item = dadosItensForm[i];
			var itemPedido = serviceHelper.instantiate(pre + '.PEDIDOVENDAITEM');
			itemPedido.setCPEDCLI(item['pv_nPedido'].value);
			itemPedido.setCPRODUTO(item['pv_produto_cod'].value);
			itemPedido.setNQUANTIDADE(item['pv_pro_qty'].value);
			itemPedido.setCDTENTREGA(getErpdate(item['pv_crdd'].value));
			itemPedido.setCLOCAL(item['pv_local'].value);
			itemPedido.setNQTDEVOL(parseFloat(item['pvQtdVol'].value));
			itemPedido.setCESPECIEVOL(item['pvEspVol'].value);
			itemPedido.setNVALOR(semCaractere(item['pv_pro_custo'].value,','));
			
			arrayItemPedido.getPEDIDOVENDAITEM().add(itemPedido);
		}
		return arrayItemPedido;
   }
   function somaQtdVol(itens){
	   var soma = 0;
	   for (var i in itens) {
		   if (itens.hasOwnProperty(i)) {
			   var e = itens[i];
			   soma += parseFloat(e["pvQtdVol"].value);
		   }
	   }
	   return soma;
   
   }
   

   
   
	//FUNÇÃO PARA ORDENAR
	function sortFilial(a, b) {
	   if (a["pv_filial"].value < b["pv_filial"].value) return -1;
	   if (a["pv_filial"].value > b["pv_filial"].value) return 1;
	   return 0;
	 }
	 function sortTransp(a, b) {
	   if (a["pv_transCod"].value < b["pv_transCod"].value) return -1;
	   if (a["pv_transCod"].value > b["pv_transCod"].value) return 1;
	   return 0;
	 }
	 function imprimeArray2(o){
		 for (var k in o) {
			 if (o.hasOwnProperty(k)) {
				 var e = o[k];
				 log.info('atg - ' + k);
				 imprimeArray(e);
			 }
		 }
	 }
	 function imprimeArray(o){
	   for (var k in o) {
		   if (o.hasOwnProperty(k)) {
			   var e = o[k];
			   log.info(k + ' - ' + e["pv_produto_cod"].value + ' - ' + e["pv_filial"].value + ' - ' + e["pv_transCod"].value);
		   }
	   }
	 }
   // 0 - NX.RNRAL.004 - 04 - 000014
   
   // 1 - NX.GMFAL.005 - 06 - 000013
   
   // 2 - NX.RNSAL.009 - 04 - 000015
	 function groupBy(a,cc){
		 //array com arrys de filials aFilialGroup
		 var afg = new Array();
		 for (var k in a) {
			 if(afg.length){
				 var fAt = afg[afg.length -1][0][cc].value;
			 }
			 if (a.hasOwnProperty(k)) {
				 var e = a[k];
				 if(!afg.length){
					 afg.push([e]);
					 continue;
				 }
				 if(e[cc].value == fAt){
				   afg[afg.length -1].push(e);
				   continue;
				 }else{
				   afg.push([e]);
				}  
			 }
		 }
		 return afg;
	 }
   
   
	/*--------------------------------------*/
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
		function getErpdate(dt){
			var d = dt.split('/');
			var c = d.reverse();
			var a = c.join('');
			var b = semCaractere(a,',');
			return b;
		 }
	
   /*--------------------------------------*/
   }