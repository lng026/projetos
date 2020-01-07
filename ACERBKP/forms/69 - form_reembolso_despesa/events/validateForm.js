function validateForm(form){


	var indexes = form.getChildrenIndexes("tbdespesas");
	var atividade = getValue("WKNumState");
	//verifica se despesas foram adicionadas
	if(atividade == 4 || atividade == 0){
		if(indexes.length <= 0){
			throw 'É necessário adicionar ao menos uma despesa para enviar.';
		}
	}

	var total = 0;
	//form.setValue("despIndexes", indexes.join());

	for (var i = 0; i < indexes.length; i++) {
	    var fieldValue = parseInt(form.getValue("desptotal___" + indexes[i]));
	    if (isNaN(fieldValue)){
	        fieldValue = 0;
	    }
	    total = total + fieldValue;
	    log.info(total);
	}
	log.info(total);


}
