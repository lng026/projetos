function afterTaskSave(colleagueId,nextSequenceId,userList){
	 try {
		 var company = getValue("WKCompany");
	log.info('integracao: cadastro de usuario'); 
	//instancia servicos de integracao
	 var pre = 'com.totvs.technology.ecm.foundation.ws';
	 var caminho = pre + '.ECMColleagueServiceService';
	 var Service = ServiceManager.getService('ECMColleagueService');
	 var serviceHelper = Service.getBean();
//	 var serviceLocator = serviceHelper.instantiate(caminho);
//	 var serviceLocator = serviceLocator.getWSFLUIGSOAP();
	 var serviceLocator = serviceHelper.instantiate(caminho);
	 var sv = serviceLocator = serviceLocator.getColleagueServicePort();
	 var objFac = serviceHelper.instantiate(pre+".ObjectFactory");
	 var colArray = objFac.createColleagueDtoArray();
	
	 
	 var camposItem = new Array('GUactive','GUcolleagueName','GUcolleagueId','GUmail','GUadminUser','GUemailHtml','GUgroupId','GUlogin','GUpasswd');
	 var camposCustom = new Array('CustomTelefone',"CustomArea","CustomCargo","CustomCPF","CustomCentroCusto","CustomGestor","CustomDiretoria","CustomNegocio","CustomCliente","CustomDataAdmissao","custom1","custom2","custom3","custom4","custom5","statusReturn");
	  var dadosItensForm = consultaDadosPaiFilho(camposItem);
	  
	  //monta lista de colleagues a partir de campos customs
	  for (var i = 0; i < dadosItensForm.length; i++) {
		var dadoAtual = dadosItensForm[i];
		var colDto = objColleague(dadoAtual, objFac,company);
		 colArray.getItem().add(colDto);
	}
	 var response = sv.createColleague("luan.gomes@fitgestao.com.br","@FluigF1t",company,colArray);
	 log.info("Retorno createColleague: " + response);
	 } catch(error) { 
		log.error(error);
		throw error;
	 }
}

function objColleague(dado,objFac,company){
	 var colDto = objFac.createColleagueDto();
//	 ('GUactive','GUcolleagueName','GUcolleagueId','GUmail','GUadminUser','GUemailHtml','GUgroupId','GUlogin','GUpasswd');
//	 dado['nomeCampo'].value
	 colDto.setActive(getBool(dado['GUactive'].value) );
	 colDto.setAdminUser(getBool(dado['GUadminUser'].value));
	 colDto.setColleagueId(dado['GUcolleagueId'].value);
	 colDto.setColleagueName(dado['GUcolleagueName'].value);
	 colDto.setCompanyId(company);
	 colDto.setDefaultLanguage('pt_BR');
	 colDto.setDialectId('pt_BR');
	 colDto.setEmailHtml(getBool(dado['GUemailHtml'].value));
	 colDto.setGedUser(true);
	 colDto.setLogin(dado['GUlogin'].value);
	 colDto.setMail(dado['GUmail'].value);
	 colDto.setMenuConfig(0);
	 colDto.setPasswd(dado['GUpasswd'].value);
	 colDto.setGroupId(dado['GUgroupId'].value);
	 colDto.setRowId(0);
	 return colDto;
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
	function getErpdate(dt){
		var d = dt.split('/');
		var c = d.reverse();
		var a = c.join('');
		var b = semCaractere(a,',');
		return b;
	 }
	
	function getBool(val){
		return val.toLowerCase() == 'true' || val.toLowerCase() == '1' || val.toLowerCase() == 'sim';
		
	}