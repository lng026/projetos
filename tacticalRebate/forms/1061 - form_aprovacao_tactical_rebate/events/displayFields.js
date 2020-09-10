function displayFields(form,customHTML){
	var atv = getValue("WKNumState");
	// if (form.getFormMode() == "VIEW") {
	// 	var nr = form.getValue('inputBuscaRebate');
	// 	customHTML.append("<script>");
	// 	customHTML.append("buscaDados('" +nr+"');");
	// 	customHTML.append("</script>");
	// }
	//mostra div de aprovação
	customHTML.append("<script>");
	customHTML.append("$('.aprovdiv').hide();");
	customHTML.append("$('.aprovacao').hide();");
	customHTML.append("</script>");
	
	if(atv == 5){
		customHTML.append("<script>");
		//customHTML.append("buscaDados();");
		customHTML.append("$('.aprovacao').show();");
		customHTML.append("changeAprov();");
		customHTML.append("sAprovDiv();");
		//customHTML.append("$('#pn_aprovador').val(getNameUser('" + usuario + "'));");
		//customHTML.append("setDivReadOnly(Array('form-header', 'tipoVerba','obsDiv'));");D
		customHTML.append("setDivReadOnly(Array('buscaRebate'));");
		
		customHTML.append("</script>");
		/*else{
		customHTML.append("<script>");
		customHTML.append("$('.aprovacao').hide();");
		customHTML.append("</script>");
	}*/
		
	}else if (atv == 10) {
		form.setEnabled("aprov",false);
		form.setEnabled("finaliza",false);
		customHTML.append("<script>");
		//customHTML.append("buscaDados();");
		customHTML.append("$('.aprovdiv').show();");
		customHTML.append("$('.aprovacao').show();");
		customHTML.append("exibeAprovs();");
		//customHTML.append("$('#pn_aprovador').val(getNameUser('" + usuario + "'));");
		//customHTML.append("setDivReadOnly(Array('form-header', 'tipoVerba','obsDiv'));");D
		customHTML.append("setDivReadOnly(Array('buscaRebate','tbPNdiv'));");
		customHTML.append("</script>");

		/*else {
			customHTML.append("<script>");
			customHTML.append("$('.aprovdiv').hide();");
			customHTML.append("</script>");
		}*/
	}else if (atv == 12) {
		form.setEnabled("aprov",false);
		form.setEnabled("finaliza",false);
		
		customHTML.append("<script>");
		//customHTML.append("buscaDados();");
		customHTML.append("$('.aprovdiv').show();");
		customHTML.append("$('.aprovacao').show();");
		//customHTML.append("$('#pn_aprovador').val(getNameUser('" + usuario + "'));");
		//customHTML.append("setDivReadOnly(Array('form-header', 'tipoVerba','obsDiv'));");D
		customHTML.append("setDivReadOnly(Array('buscaRebate','tbPNdiv','aprovdiv'));");
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
	
}

