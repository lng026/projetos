function displayFields(form,customHTML){

  	var atividade = getValue("WKNumState");
  	var usuario = getValue("WKUser");
	var numProc = getValue('WKNumProces');
	if (numProc) {
		form.setValue('cid',numProc);
	}

    if(form.getValue('pv_acc_manager').trim() == ''){
	  form.setValue('pv_acc_manager',usuario);
	  //busca nome do usuario
	var c2 = DatasetFactory.createConstraint('colleaguePK.colleagueId', usuario, usuario, ConstraintType.MUST);
	var ds = DatasetFactory.getDataset('colleague', null, new Array(c2), null);
	form.setValue('pv_acc_manager_name',ds.getValue(0,'colleagueName'));

    }

	customHTML.append('<script>');
    var vis = (atividade == 44 || atividade == 64) ? ".show();" : ".hide();";
    var visAprov = (atividade == 56 ) ? ".show();" : ".hide();";
    var retvis = (atividade != 0 &&  atividade == 4) ? ".show();" : ".hide();";
    var visEntrega = (atividade == 70 || atividade == 72 ) ? ".show();" : ".hide();";
    var visConfEntr = (atividade == 72 ) ? ".show();" : ".hide();";
	 
	customHTML.append("$('#liberaDiv')"+vis);
	customHTML.append("$('#aprovdiv')"+visAprov);
    customHTML.append("$('#retIntegrDiv')"+retvis);
   	customHTML.append("$('#agendamentodiv')"+visEntrega);
    // customHTML.append("$('#agendamentodiv').show();");
    // customHTML.append("$('#confirmentregadiv').show();");
    customHTML.append("$('#confirmentregadiv')"+visConfEntr);
	customHTML.append('</script>');

	//arpovar preços
	if(atividade == 56){
		form.setEnabled("cliente",false);

		customHTML.append("<script>");
	    customHTML.append("setDivReadOnly(Array('form-header','form-cliente','produtos','total'));");
	    customHTML.append("</script>");
	}

	//paletizar
	if(atividade == 75){
		form.setEnabled("cliente",false);
		customHTML.append("<script>");
		customHTML.append("setDivReadOnly(Array('form-header','form-cliente','total'));");
		customHTML.append("$('#divFilial').show();");
		customHTML.append("$('.paletizar').show();");
		 customHTML.append("$('#pv_total_original').val($('#pv_total').val());");
	    customHTML.append("</script>");
	}else{
		customHTML.append("<script>");
		customHTML.append("$('.paletizar').hide();");
	    customHTML.append("</script>");
	}	


	//Faturar PD
	if(atividade == 78){
		//bloqueia edicao de formulario
		customHTML.append("<script>");
	    customHTML.append("setDivReadOnly(Array('form-header','form-cliente','produtos','total'));");
	    customHTML.append("</script>");
	}

	// //estoque
	// if (atividade == 81) {
	// 	//bloqueia edicao de formulario
	// 	customHTML.append("<script>");
	// 	customHTML.append("setDivReadOnly(Array('form-header','form-cliente','produtos','total'));");
	// 	customHTML.append("$('#divFilial').show();");
	// 	form.setEnabled("cliente", false);		
	// 	customHTML.append("</script>");
	// }

	//Agendamento e confirmacao
	if (atividade == 70 || atividade == 72) {
		//bloqueia edicao de formulario
		customHTML.append("<script>");
		customHTML.append("setDivReadOnly(Array('form-header','form-cliente','produtos','total'));");
		customHTML.append("$('.deleteBtn').hide();");
		customHTML.append("$('.nFiscal').show();");
		if(atividade == 70) customHTML.append("defineNFS();");
		form.setEnabled("cliente", false);						
		customHTML.append("</script>");
	}else{
		customHTML.append("<script>");
		customHTML.append("$('.deleteBtn').show();");
		customHTML.append("$('.nFiscal').hide();");
		//customHTML.append("defineNFS();");
		customHTML.append("</script>");	
	}
	if(atividade == 72){
		customHTML.append("<script>");
		customHTML.append("$('.dtEntrega').show();");
		customHTML.append("</script>");	
		
	}else{
		customHTML.append("<script>");
		customHTML.append("$('.dtEntrega').hide();");
		customHTML.append("</script>");	
	}



	if(form.getFormMode() == "VIEW"){

		 form.setHideDeleteButton(true);
		 //retirar class form-control dos formulário para melhorar visualização e impressão
		 customHTML.append("<script>");
		 customHTML.append("$('.form-control').removeClass('form-control');");
		 customHTML.append("$('button').hide();");
		 customHTML.append("$('.delItem').hide();");
		customHTML.append("$('.paletizar').show();");		 
		 customHTML.append("</script>");
	}
	 if (form.getMobile() != null && form.getMobile()){
		 customHTML.append("<script>");
		 customHTML.append("alert('está usando o mobile');");
		 customHTML.append("</script>");
	       // throw "Esse processo não pode ser iniciado pelo mobile.\nSómente suas aprovações";
	}

}
