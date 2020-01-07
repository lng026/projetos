function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var processo = getValue("WKNumProces");
	var atividade = getValue("WKNumState");
	if(atividade == 4 || atividade == 0 ||  atividade == 83){
		var despIndexes = hAPI.getCardValue("despIndexes");
		var arrayIndex = despIndexes.split(',');
		//throw '\ndespIndexes: ' + despIndexes + '\n arrayIndex: ' + arrayIndex + '\narrayIndex.length : ' + arrayIndex.length;
		
		//var card = hAPI.getCardData(processo);
		var contasKM = ['314520024', '314020024', '315420024', '315020024', '315720024','313020024',
		                '313020049','314020049','314520049','315020049','315420049','315720049'];
		var tIndex = '';
		var attachments = hAPI.listAttachments();
		var indexErro = '';	
		for (var i = 0; i < arrayIndex.length; i++) {
			var anexoOk = false;
			tIndex = arrayIndex[i];
			log.info("reemb - tIndex: "+tIndex);
			log.info("reemb - arrayIndex[i]: "+arrayIndex[i]);
			var ccontabilDesp = hAPI.getCardValue("despctacontabil___" + tIndex);
			//-----------------
			var isKM = false;
			for (var ik = 0; ik < contasKM.length; ik++) {
				var c = contasKM[ik];
				if (ccontabilDesp == c) {
					isKM = true;
				}
			}
			//verifica se a despesa é km, se for nao analisa anexos
			if(isKM){
				anexoOk = true;
			}else{
				if(attachments.size() > 0){
					for (var j = 0; j < attachments.size(); j++) {
						var attachment = attachments.get(j);
						var descr =  attachment.getDocumentDescription();
						var aDesc = descr.split('-');
						log.info("reemb - descr: "+descr);
						log.info("reemb - aDesc.length: "+aDesc.length);
						if(aDesc.length >= 2){
							var cod = aDesc[0].trim();
							log.info("reemb - cod: "+cod);
							if(cod == tIndex){
								anexoOk = true;
								break;
							}
						}
					}	
				}
				if(!anexoOk){
					//pega tipo valor campo que falta anexo para adicio	nar a msg
					//var tipoDesp = hAPI.getCardValue("desptipo___" + tIndex);
					var tipoDesp = hAPI.getCardValue("desptipo___" + tIndex);
					var cCont = hAPI.getCardValue("despctacontabil___" + tIndex);
					indexErro = tIndex + ' - ' + cCont + ' - ' + tipoDesp;
					throw "Adicione o comprovante da despesa: " + indexErro;
				}
			}
		
			
			
		}
	}
	
	
}