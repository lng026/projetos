function defineStructure() {

}
function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {
//	nao funcion pq nao da pra usar hAPI a partir de um dataset
//	 var users = new java.util.ArrayList();
//    users.add("admin");
//	var dataset = DatasetBuilder.newDataset();
//	dataset.addColumn("success");
//	dataset.addColumn("message");
//	dataset.addColumn("numSolicitacao");
//    var processId = getPametro(constraints,'processId');
//	var fieldsList = getPametroList(constraints,'campo');
//	log.info('%%%%%%s INICIANDO startProcess');
//	log.info('%%%%%%s ' + processId);
//	log.info('%%%%%%s ' + fieldsList.toString());
//
//	if(processId){
//		try {
//			var formData = new java.util.HashMap();
//			//	formData.put("proPaiSol", sol);
//			for (var i = 0; i < fieldsList.length; i++) {
//				var e = fieldsList[i];
//				var campo = JSON.parse(e);
//				formData.put(campo.field,campo.value);
//			}
//			var idProc = hAPI.startProcess(processId, 0, users, "Iniciado processos de agendamento", true, formData, false);
//			dataset.addRow(new Array(true, "Solicitação iniciada com sucesso", idProc));
//		} catch (e) {
//			dataset.addRow(new Array(false, e.name +' - ' + e.message, null));
//		}
//		
//	}else{
//		// dataset.addRow(new Array(documentId,JSONUtil.toJSON(fieldsList)));
//		dataset.addRow(new Array(false, "Informe o documentId do formulário e ao menos uma campo na constra field"));
//	}
//	return dataset;

	
}function onMobileSync(user) {

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
