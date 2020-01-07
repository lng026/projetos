function displayFields(form,customHTML){
	  var n_documento = getValue("WKNumProces"); //código de solicitação
	  var autor = getValue("WKUser"); // código do usuário
	  var ativ = getValue("WKNumState"); //numero da atividade
		  //------- Armazena número de solcitação
	  customHTML.append('<script>');
	  customHTML.append("$('#numSolicitacao').val('"+n_documento+"');");    
	  customHTML.append("$('#atvAtual').val('"+ativ+"');");
	  customHTML.append("$('#userAtual').val('"+autor+"');");
	  customHTML.append('</script>');
	  if ( form.getFormMode() == "VIEW" ) {
		 form.setShowDisabledFields(true);
		 form.setValue('atvAtual','xxx');
	  }
}

// 04570097000129