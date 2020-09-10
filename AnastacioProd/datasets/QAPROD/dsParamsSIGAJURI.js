function createDataset(fields, constraints, sortFields) {
	// Dataset de parametros da Widget. Expandir conforme necessidade, mantendo os parametros o mais centralizados possivel.~
	
	var dsParamsSIGAJURI = DatasetBuilder.newDataset();
	
	// Usu?rio Admin para a widget.
	dsParamsSIGAJURI.addColumn("sAdmin");
	// Senha do usu?rio Admin para a widget.
	dsParamsSIGAJURI.addColumn("sPassword");
	// Id do Form da Widget, usado para salvar as informações de aprovadores de follow-up
	dsParamsSIGAJURI.addColumn("nFormIdAprov");
	// Id da Empresa no Fluig.
	dsParamsSIGAJURI.addColumn("nTenantId");
	// Id do Form da Widget, usado para salvar as informações de distribuição de contratos
	dsParamsSIGAJURI.addColumn("nFormIdContrato");
	// Id do Form da Widget, usado para salvar as informações de distribuição de contratos
	dsParamsSIGAJURI.addColumn("nFormIdConsultivo");
	// user, senha, id da widget e o código da empresa.
	dsParamsSIGAJURI.addRow(new Array("fluig.ti@quimicanastacio.com.br", "Anastacio$$1000!", 10, 1, 0, 9));
	
	return dsParamsSIGAJURI;
}