function beforeProcessing(form){
	  if (form.getFormMode() == "VIEW" ) {
			 form.setShowDisabledFields(true);
			 form.setValue('atvAtual','xxx');
		  }
}