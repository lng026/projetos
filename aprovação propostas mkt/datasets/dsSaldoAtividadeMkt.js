function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("idAtividade");
	dataset.addColumn("saldo");
	dataset.addColumn("lancamentos");
	var idAtv = getPametro(constraints,'idAtividade');
	if(idAtv){
		propostas = getPropostas(idAtv);
		var sum = parseFloat(0);
		var lancamentos = [];
		for (var i = 0; i < propostas.rowsCount; i++) {
			var valor = propostas.getValue(i, 'valor');
			var numSol = propostas.getValue(i, 'numSolicitacao')
			if(numSol){
				sum = sum + parseFloat(valor);
		        lancamentos.push(numSol);
			}
	        
		}
		dataset.addRow(new Array(idAtv,sum, JSONUtil.toJSON(lancamentos)));
	}else{
		dataset.addRow(new Array(false, "Informe o idAtividade"));
	}
	return dataset;
}function onMobileSync(user) {

}

function getPropostas(id){
	var mkt2 = DatasetFactory.createConstraint('idAtividade', id, id, ConstraintType.MUST);
	var dsmkt = DatasetFactory.getDataset('form_solicitacao_verba_mkt', null, new Array(mkt2), null);
	return dsmkt;
}

function getPametro(constraints, campo){
	var param = '';
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == campo) {
            	param = constraints[i].initialValue;
            }
		}
	}
	return param;
}
function getPametroList(constraints, campo){
	var param = [];
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == campo) {
            	var oDado = constraints[i].initialValue;
            	param.push(oDado);
            }
		}
	}
	return param;
}