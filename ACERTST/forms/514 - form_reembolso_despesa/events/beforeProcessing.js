function beforeProcessing(form){
	
	var indexes = form.getChildrenIndexes("tbdespesas");
	form.setValue("despIndexes", indexes.join());
	
}