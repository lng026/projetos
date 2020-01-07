function displayFields(form,customHTML){
	customHTML.append("<script>");
	customHTML.append("var FORM_MODE = '" + form.getFormMode() + "';");
	customHTML.append("if(FORM_MODE != 'VIEW'){");
	customHTML.append("carregaUsuarios('solicitante');");
	customHTML.append("carregaUsuarios('aprovador');}");
	customHTML.append("</script>");


}