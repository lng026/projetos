function displayFields(form,customHTML){
	  var n_documento = getValue("WKNumProces"); //código de solicitação
	  var autor = getValue("WKUser"); // código do usuário
	  var ativ = getValue("WKNumState"); //numero da atividade
		  //------- Armazena número de solcitação
	  customHTML.append('<script>');
	  customHTML.append("$('#numSolicitacao').val('"+n_documento+"');");    
	  customHTML.append("$('#atvAtual').val('"+ativ+"');");
	  customHTML.append("$('#userAtual').val('"+autor+"');");
	  customHTML.append("$('#formMode').val('"+form.getFormMode()+"');");
	  customHTML.append('</script>');
}