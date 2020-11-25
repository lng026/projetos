function displayFields(form,customHTML){
	
	var atv = getValue("WKNumState");
  	var usuario = getValue("WKUser");
	var numProc = getValue('WKNumProces');
	
	form.setValue('wkUserAtaul', usuario);
	form.setValue('wkNumState', atv);
	if(numProc){
		form.setValue('wkNumProces', numProc);
	}
	// ------------------------
	if (atv <= 4 ) {
		form.setValue("pn_solcod", usuario);
		customHTML.append("<script>");
		customHTML.append("$('#pn_solicitante').val(getNameUser('" + usuario +"'));");
		customHTML.append("defineNumId();");
		customHTML.append("</script>");
	}	
	//mostra div de aprovação
	if(atv == 5){
		form.setValue("pn_aprovcod", usuario);
		form.setEnabled("cliente", false);
		var d = new Date();
		var dataString = d.getDate() +'/' + (d.getMonth() +1)+'/'+d.getFullYear();
		customHTML.append("<script>");
		customHTML.append("$('.aprovdiv').show();");
		customHTML.append("$('.aprovnamediv').show();");
		customHTML.append("$('#pn_aprovador').val(getNameUser('" + usuario + "'));");
		customHTML.append("$('#pn_aprovDate').val('" + dataString + "');");
		customHTML.append("setDivReadOnly(Array('form-header', 'tipoVerba','obsDiv'));");
		customHTML.append("</script>");
		
	}else{
		customHTML.append("<script>");
		customHTML.append("$('.aprovdiv').hide();");
		customHTML.append("$('.aprovnamediv').hide();");
		customHTML.append("</script>");
	}
	
	if(atv >= 12){
		form.setEnabled("cliente", false);		
		customHTML.append("<script>");		
		customHTML.append("$('.gtImpressao').show();");
		customHTML.append("setDivReadOnly(Array('form-header', 'tipoVerba','obsDiv'));");
		customHTML.append("</script>");
	}else{
		customHTML.append("<script>");
		customHTML.append("$('.gtImpressao').hide();");
		customHTML.append("</script>");
	}

	if (atv == 29) {
		// form.setEnabled("aprov",false);
		// form.setEnabled("finaliza",false);
		customHTML.append("<script>");
		//customHTML.append("buscaDados();");
		customHTML.append("$('.aprovdiv').show();");
		customHTML.append("$('.aprovacao').show();");
		customHTML.append("$('#tbPNdiv').show();");
		// customHTML.append("exibeAprovs();");
		//customHTML.append("$('#pn_aprovador').val(getNameUser('" + usuario + "'));");
		//customHTML.append("setDivReadOnly(Array('form-header', 'tipoVerba','obsDiv'));");D
		customHTML.append("setDivReadOnly(Array('form-header','buscaRebate','tipoVerba','aprovdiv'));");
		customHTML.append("</script>");

		/*else {
			customHTML.append("<script>");
			customHTML.append("$('.aprovdiv').hide();");
			customHTML.append("</script>");
		}*/
	}
	//aprovar financeiro
	if (atv == 31) {
		blockChilds();
		form.setEnabled("aprov",false);
		form.setEnabled("finaliza",false);
		customHTML.append("<script>");
		//customHTML.append("buscaDados();");
		customHTML.append("$('.aprovFinDiv').show();");
		customHTML.append("$('.aprovacao').show();");
		customHTML.append("$('#tbPNdiv').show();");

		//customHTML.append("$('#pn_aprovador').val(getNameUser('" + usuario + "'));");
		//customHTML.append("setDivReadOnly(Array('form-header', 'tipoVerba','obsDiv'));");D
		customHTML.append("setDivReadOnly(Array('buscaRebate','tbPNdiv','aprovdiv'));");
		customHTML.append("exibeAprovs();");
		customHTML.append("</script>");

	}
	if (atv == 36) {
		blockChilds();
		customHTML.append("<script>");
		//customHTML.append("buscaDados();");
		customHTML.append("$('.aprovdiv').show();");
		customHTML.append("$('.aprovacao').show();");
		customHTML.append("$('#tbPNdiv').show();");
		customHTML.append("$('.aprovFinDiv').show();");

		//customHTML.append("$('#pn_aprovador').val(getNameUser('" + usuario + "'));");
		//customHTML.append("setDivReadOnly(Array('form-header', 'tipoVerba','obsDiv'));");D
		customHTML.append("setDivReadOnly(Array('buscaRebate','tbPNdiv','aprovdiv','aprovFinDiv'));");
		customHTML.append("exibeAprovs();");
		customHTML.append("</script>");

	}



	var aprov = form.getValue('aprovGestor');
	if(aprov == "parcial"){
		customHTML.append("<script>");
		customHTML.append("$('.vParcial').show();");
		customHTML.append("</script>");
	}else{
		customHTML.append("<script>");
		customHTML.append("$('.vParcial').hide();");
		customHTML.append("</script>");
	}

	if(form.getFormMode() == "VIEW"){

		 form.setHideDeleteButton(true);
		 //retirar class form-control dos formulário para melhorar visualização e impressão
		 customHTML.append("<script>");
		 customHTML.append("$('.form-control').removeClass('form-control');");
		 customHTML.append("$('button').hide();");
		 customHTML.append("$('.delItem').hide();");
		 customHTML.append("</script>");
	}


	function blockChilds(){
		var baixas = form.getChildrenIndexes('tbBaixas');
		for (var i = 0; i < baixas.length; i++) {
			var b = baixas[i];
			form.setEnabled("aprov___"+b,false);
			form.setEnabled("finaliza___"+b,false);
			
		}
		customHTML.append("<script>");
		customHTML.append("$('.bpm-mobile-trash-column').hide();");
		
		customHTML.append("</script>");

	}
	
}