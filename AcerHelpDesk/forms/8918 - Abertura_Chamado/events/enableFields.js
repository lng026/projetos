function enableFields(form){
	var atv = parseInt(getValue("WKNumState"));
	if (atv == 9) {
		form.setEnabled("prioridade", false);
	}
}