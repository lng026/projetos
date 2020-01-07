function displayFields(form,customHTML){

	var atividade = getValue("WKNumState");
	var usuario = getValue("WKUser");
	customHTML.append("<script>");
	customHTML.append("console.log('"+ usuario +"');");
	customHTML.append("defineMascaras();");
	customHTML.append("</script>");

	/*if (atividade == 5) {
		form.setVisibleById("aprovdiv", true);
	}
	else {
		form.setVisibleById("aprovdiv", false);
	}*/
	/*
	form.setVisibleById("aprovdiv", (atividade == 5 || atividade == 45 || atividade == 46 ) );
	form.setVisibleById("aprovGestorDiv", (atividade == 5 || atividade == 45));
	form.setVisibleById("aprovGermanoDiv", (atividade == 46 ) );
*/	
	
	if(atividade <= 4 ){
		//coloca usuario no campo
		customHTML.append("<script>");
		customHTML.append("$('#nickname').val('");
    customHTML.append(usuario);
    customHTML.append("');");
    customHTML.append('defineAprovador();');
    customHTML.append("</script>");
	}
	else{
		    form.setVisibleById("div_informacoes", false); 
	}


	if(form.getFormMode() != "VIEW")  {

		if(atividade != 4 && atividade != 0 && atividade != 83 ){
			customHTML.append("<script>");
			customHTML.append("$('.panel').find('input, textarea, button').each(function(){ $(this).attr('readonly', true);});");
			customHTML.append("$('button').attr('disabled',true);");
			//bloqueia radio para serem alterados
			customHTML.append("$(':radio').attr('disabled',true);");
			customHTML.append("</script>");
		}
		

		form.setVisibleById("aprovdiv", (atividade == 5 || atividade == 45 || atividade == 46 || atividade  == 67 || atividade  == 83  || atividade  == 98 ) );
		//habilita edicao aprovacao gestor se esta na etapa
		form.setVisibleById("aprovGestorDiv", (atividade == 5 || atividade == 45 || atividade == 46 || atividade  == 67|| atividade  == 98));
		if(atividade == 5 || atividade == 45 || atividade  == 98 ){
			customHTML.append("<script>");
			customHTML.append("$('#aprovGestorDiv').find('input, textarea').each(function(){ $(this).attr('readonly', false);});");
			customHTML.append("$('#aprovGestorDiv').find(':radio').each(function(){ $(this).attr('disabled', false);});");
			customHTML.append("</script>");

		}
		//exibe e habilida edicao aprovacao gestor
		form.setVisibleById("aprovGermanoDiv", (atividade == 46 || atividade  == 67 ) );
		if(atividade == 46 ){
			customHTML.append("<script>");
			customHTML.append("$('#aprovGermanoDiv').find('input, textarea').each(function(){ $(this).attr('readonly', false);});");
			customHTML.append("$('#aprovGermanoDiv').find(':radio').each(function(){ $(this).attr('disabled', false);});");
			customHTML.append("</script>");
		}
		
		//exibe e habilida edicao aprovacao RH == 90) );
		form.setVisibleById("aprovRHDiv", atividade == 90 || atividade  == 98 );
		if(atividade == 90){
			customHTML.append("<script>");
			customHTML.append("$('#aprovRHDiv').find('input, textarea').each(function(){ $(this).attr('readonly', false);});");
			customHTML.append("$('#aprovRHDiv').find(':radio').each(function(){ $(this).attr('disabled', false);});");
			customHTML.append("setRHVis();");
			customHTML.append("</script>");
		}else{
				customHTML.append("<script>");
			customHTML.append("$('#aprovRHDiv').find('input, textarea').each(function(){ $(this).attr('readonly', true);});");
			customHTML.append("$('#aprovRHDiv').find(':radio').each(function(){ $(this).attr('disabled', true);});");
			customHTML.append("setRHVis();");
			customHTML.append("</script>");
		}
		var msgRetorno = '';
		msgRetorno = form.getValue('msgRetorno');
		if (msgRetorno.trim() != '') {
			//retIntegrDiv
			form.setVisibleById("retIntegrDiv", true);
		}


	}


//form.setVisibleById("retIntegrDiv", (atividade == 59 ) );

	//$('#aprovGestorDiv').find('input, textarea, select').each(function(){ $(this).attr('disabled', true);});
	if(form.getFormMode() == "VIEW"){
		form.setVisibleById("aprovdiv", true );
		form.setVisibleById("aprovGestorDiv", true);
		form.setVisibleById("aprovGermanoDiv", true );
		 form.setHideDeleteButton(true);
		 //retirar class form-control dos formulário para melhorar visualização e impressão
		 customHTML.append("<script>");
		customHTML.append("defineMascaras();");		 
		 customHTML.append("$('.form-control').removeClass('form-control');");
		 customHTML.append("$('button').hide();");
		 customHTML.append("$('.delItem').hide();");
		 customHTML.append("</script>");
	}

	if (atividade == 83) {

		
	}



}

function tabela_filho(form){

	var indexes = form.getChildrenIndexes("tbdespesas");
	var total = 0;

	for (var i = 0; i < indexes.length; i++) {
	    var fieldValue = parseInt(form.getValue("desptotal___" + indexes[i]));
	    if (isNaN(fieldValue)){
	        fieldValue = 0;
	    }
	    total = total + fieldValue;
	    log.info(total);
	}
	log.info(total);
	console.log("hello world");
}
