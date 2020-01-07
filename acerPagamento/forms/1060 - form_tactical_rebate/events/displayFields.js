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
	
	if(atv == 12){
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

	if(form.getFormMode() == "VIEW"){

		 form.setHideDeleteButton(true);
		 //retirar class form-control dos formulário para melhorar visualização e impressão
		 customHTML.append("<script>");
		 customHTML.append("$('.form-control').removeClass('form-control');");
		 customHTML.append("$('button').hide();");
		 customHTML.append("$('.delItem').hide();");
		 customHTML.append("</script>");
	}
}