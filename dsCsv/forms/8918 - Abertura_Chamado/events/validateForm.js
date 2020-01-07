function validateForm(form){
	var nomeDataset = "DS_abertura_chamado"
	var assunto = form.getValue('assunto');
	var topico = form.getValue('usRespTxt');
	var incidente = form.getValue('txt_incidente');
	var atv = parseInt(getValue("WKNumState"));
	
	var msg = '';
	
	msg += validarCampo('unidade');
	msg += validarCampo('topico_ajuda');
	msg += validarCampo('assunto');
	msg += validarCampo('txt_incidente');
	
	switch (atv) {
		case 9:
			indexes = form.getChildrenIndexes("resposta");
			if (form.getValue("us_resolvido") == "sim") {
				msg += validarCampo('avaliacao', "Porfavor avalie o chamado.");
			} else if (form.getValue("us_resolvido") == "nao"){
				var c2 = DatasetFactory.createConstraint("tablename", "resposta", "resposta", ConstraintType.MUST);
				var c3 = DatasetFactory.createConstraint("metadata#id", getValue("WKCardId"), getValue("WKCardId"), ConstraintType.MUST);
				var dsTable = DatasetFactory.getDataset(nomeDataset, null, [c2, c3], null);
				if (indexes.length == dsTable.rowsCount) {
					msg += "\n Porfavor adicione uma resposta!"
				}
			} else {
				msg += "Porfavor selecione se o chamado foi finalizado ou não."
			}
			break;
		case 15:
			indexes = form.getChildrenIndexes("resposta");
			var c1 = DatasetFactory.createConstraint("documentid", getValue("WKCardId"),  getValue("WKCardId"), ConstraintType.MUST);
			var dsForm = DatasetFactory.getDataset(nomeDataset, null, [c1], null);
			if (form.getValue("prioridade") == dsForm.getValue(0, "prioridade")) {
				var c2 = DatasetFactory.createConstraint("tablename", "resposta", "resposta", ConstraintType.MUST);
				var c3 = DatasetFactory.createConstraint("metadata#id", getValue("WKCardId"), getValue("WKCardId"), ConstraintType.MUST);
				var dsTable = DatasetFactory.getDataset(nomeDataset, null, [c2, c3], null);
				if (indexes.length == dsTable.rowsCount) {
					msg += "\n Porfavor adicione uma resposta!"
				}
			} else if (form.getValue("status") == "aberto") {
				var c2 = DatasetFactory.createConstraint("tablename", "resposta", "resposta", ConstraintType.MUST);
				var c3 = DatasetFactory.createConstraint("metadata#id", getValue("WKCardId"), getValue("WKCardId"), ConstraintType.MUST);
				var dsTable = DatasetFactory.getDataset(nomeDataset, null, [c2, c3], null);
				if (indexes.length == dsTable.rowsCount) {
					msg += "\n Porfavor adicione uma resposta!"
				}
			}
			break;
	}
	
	function validaCampo(atividade,atividade2,campo,texto){
		if (atv == atividade) {
				if (campo == '') {
				throw ''+texto+'';
			}
		}
	}
	
	function validarCampo(campo, string, condition) {
		if (condition == null) {
			if (form.getValue(campo) == '' || form.getValue(campo) == null || form.getValue(campo) == undefined) {
				if (string == null) {
					return '\n Porfavor preencha o campo '+campo+'.';
				} else {
					return string;
				}
			} else {
				return '';
			}
		} else {
			if (form.getValue(campo) == condition) {
				if (string == null) {
					return '\n Porfavor preencha o campo '+campo+'.';
				} else {
					return string;
				}
			} else {
				return '';
			}
		}		
	}
	
	if (msg != '') throw msg;
}
