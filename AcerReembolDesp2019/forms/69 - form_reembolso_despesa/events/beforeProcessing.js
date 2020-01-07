function beforeProcessing(form){
	
	var indexes = form.getChildrenIndexes("tbdespesas");
	form.setValue("despIndexes", indexes.join());

	var atividade = getValue("WKNumState");
	var usuario = getValue("WKUser");
	
	if(atividade <= 4 ){
		form.setValue("nickname", usuario);
	}
}