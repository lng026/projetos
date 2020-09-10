function validateForm(form){	
	
	if(form.getValue("solicitante") == null || form.getValue("retira") == "" || form.getValue("origem") == "" || form.getValue("cep") == "" || form.getValue("numero") == "" || form.getValue("rua") == "" || form.getValue("bairro") == "" || form.getValue("cidade") == "" || form.getValue("uf") == "" || form.getValue("datan") == "" ){
		throw " Há um ou mais campos sem preenchimento";
	}
	
	if(form.getValue("receptor") == "" || form.getValue("destino") == "" || form.getValue("dcep") == "" || form.getValue("dnumero") == "" || form.getValue("drua") == "" || form.getValue("dbairro") == "" || form.getValue("dcidade") == "" || form.getValue("duf") == "" || form.getValue("justi") == "" ){
		throw " Há um ou mais campos sem preenchimento";
	}
	
	if (form.getValue("cep") == form.getValue("dcep") && form.getValue("numero") == form.getValue("dnumero")){
		throw " Endereço de origem deve ser diferente de destino"
	}
	


	
}