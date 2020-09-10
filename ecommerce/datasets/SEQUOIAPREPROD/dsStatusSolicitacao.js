function defineStructure() {
}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("solicitacao");
	 var paramSolicitacao = '';
	    if (constraints != null) {
	        for (var i = 0; i < constraints.length; i++) {
	            if (constraints[i].fieldName == "solicitacao") {
	            	paramSolicitacao = constraints[i].initialValue.toString().trim();
	            }
	        }
	    }    
	try {
			if(!paramSolicitacao){
				throw {name: "parametro", message: "Informe o numero da solicitação no campo solicitacao."};
			}
			var isSPid = "";
		    var dsProccess = getProcess(paramSolicitacao);
		    var dsStatus = getStatus(paramSolicitacao);
		    var state = 0;
		    var status = 0;
		    for (var i = dsStatus.rowsCount-1; i >=  0; i--) {
		    	state = dsStatus.getValue(i , "choosedSequence");
		    	status = dsStatus.getValue(i , "status");
		    	if(state!=0){
		    		break;
		    	}
			}
			//verifica se é realmente a ultima atividade
		    if(status == 3){
		    	var dsHist = getHistory(paramSolicitacao);
		    	if(dsHist.rowsCount>0){
		    		var histState = dsHist.getValue(dsHist.rowsCount-1, 'stateSequence');
		    		if(histState != state){
		    			state = histState;
		    			isSPid = dsHist.getValue(dsHist.rowsCount-1, 'subProcessId');
		    		}
		    	}
		    }
			var v = dsProccess.getValue(dsProccess.rowsCount - 1 , "version");
			var dsAtividade = getAtividade(state,v);
//			campos
//			adiciona colunas atividade ao array
			var aRes = new Array(paramSolicitacao);
			var colleagueName = "";
			var colunas = new Array('processTaskPK.colleagueId', 'processTaskPK.companyId', 'processTaskPK.movementSequence', 'processTaskPK.processInstanceId', 'processTaskPK.transferredSequence', 'active', 'choosedColleagueId', 'choosedSequence', 'completeColleagueId', 'status');
			for (var i = 0; i < colunas.length; i++) {
				var c = colunas[i];
				dataset.addColumn(c.replace('.','_'));
				var val = dsStatus.getValue(dsStatus.rowsCount - 1,c)
				if(c == "choosedColleagueId"  && val.trim() != ""){
					colleagueName =	getUserById(val);
				}
				aRes.push(val);
			}
			var colunasProcessState = new Array('stateDescription', 'stateName', 'processStatePK.version', 'processStatePK.sequence', 'processStatePK.processId','subProcess','subProcessId');
			for (var i = 0; i < colunasProcessState.length; i++) {
				var c = colunasProcessState[i];
				dataset.addColumn(c.replace('.','_'));
				var val = dsAtividade.getValue(dsAtividade.rowsCount - 1,c);
				aRes.push(val);
			}
			if( isSPid == ""){
				var isSP = dsAtividade.getValue(dsAtividade.rowsCount - 1,'subProcess');
				isSPid =  dsAtividade.getValue(dsAtividade.rowsCount - 1,'subProcessId');
			}
			if(isSPid != ""){
				//verifica se precisa pegar responsavel de subprocesso
				var subpID = getSubProcess(paramSolicitacao,isSPid);
				 var dsSPStatus = getStatus(subpID);
				 var cid = dsSPStatus.getValue(dsSPStatus.rowsCount - 1,'choosedColleagueId');
				 if(cid.trim() == ""){
				 	cid = dsSPStatus.getValue(dsSPStatus.rowsCount - 1,'processTaskPK.colleagueId');
				 	if( cid.trim() != "" && cid.indexOf(":") >= 0 ){
				 		colleagueName = cid;
				 	}else if(cid.trim() != ""){
				 		colleagueName =	getUserById(cid);
				 	}
				 }else{
				 	colleagueName =	getUserById(cid);
				 }
			}
			
			
			dataset.addColumn('colleagueName');
			aRes.push(colleagueName);
			dataset.addRow(aRes);
			return dataset;
	} catch (e) {
		// TODO: handle exception
		dataset.addColumn("name");
		dataset.addColumn("message");
		dataset.addRow(new Array(paramSolicitacao,e.name, e.message));
		return dataset;
	}	
 
}function onMobileSync(user) {

}

function getAtividade(atv, v){
	var constraintProcessState1 = DatasetFactory.createConstraint('sqlLimit', '100', '100', ConstraintType.MUST);
	var constraintProcessState2 = DatasetFactory.createConstraint('processStatePK.version', v, v, ConstraintType.MUST);
	var constraintProcessState3 = DatasetFactory.createConstraint('processStatePK.processId', 'solicitacao_programacao', 'solicitacao_programacao', ConstraintType.MUST);
	var constraintProcessState4 = DatasetFactory.createConstraint('processStatePK.sequence', atv,atv, ConstraintType.MUST);
	var colunasProcessState = new Array('stateDescription', 'stateName', 'processStatePK.version', 'processStatePK.sequence', 'processStatePK.processId','subProcess','subProcessId');
	var datasetProcessState = DatasetFactory.getDataset('processState', colunasProcessState, new Array(constraintProcessState1, constraintProcessState2, constraintProcessState3, constraintProcessState4), null);
	return datasetProcessState;
}


function getProcess(sol){
	var constraintWorkflowProcess1 = DatasetFactory.createConstraint('sqlLimit', '100', '100', ConstraintType.MUST);
	var constraintWorkflowProcess2 = DatasetFactory.createConstraint('processId', 'solicitacao_programacao', 'solicitacao_programacao', ConstraintType.MUST);
	var constraintWorkflowProcess3 = DatasetFactory.createConstraint('workflowProcessPK.processInstanceId',sol, sol, ConstraintType.MUST);
	var colunasWorkflowProcess = new Array('version', 'processId');
	var datasetWorkflowProcess = DatasetFactory.getDataset('workflowProcess', colunasWorkflowProcess, new Array(constraintWorkflowProcess1, constraintWorkflowProcess2, constraintWorkflowProcess3), null);
	return datasetWorkflowProcess;
}

function getStatus(sol){
//	var c1 = DatasetFactory.createConstraint('active', 'true', 'true', ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('processTaskPK.processInstanceId',sol, sol, ConstraintType.MUST);
	var colunas = new Array('processTaskPK.colleagueId', 'processTaskPK.companyId', 'processTaskPK.movementSequence', 'processTaskPK.processInstanceId', 'processTaskPK.transferredSequence', 'active', 'choosedColleagueId', 'choosedSequence', 'completeColleagueId', 'status');
	var ordem = new Array('processTaskPK.movementSequence');
	var datasetProcessTask = DatasetFactory.getDataset('processTask', colunas, new Array( c2), null);
	return datasetProcessTask;
}

function getUserById(id){
	var constraintColleague1 = DatasetFactory.createConstraint('sqlLimit', '100', '100', ConstraintType.MUST);
var constraintColleague2 = DatasetFactory.createConstraint('colleaguePK.colleagueId', id, id, ConstraintType.MUST);
var colunasColleague = new Array('colleaguePK.colleagueId', 'colleagueName');
var datasetColleague = DatasetFactory.getDataset('colleague', colunasColleague, new Array(constraintColleague1, constraintColleague2), null);
var name = '-';
	if(datasetColleague.rowsCount){
		name = datasetColleague.getValue(0, 'colleagueName');
	}
	return name;
}

function getSubProcess(sol,id){
	var constraintWorkflowProcess1 = DatasetFactory.createConstraint('sqlLimit', '100', '100', ConstraintType.MUST);
	var constraintWorkflowProcess2 = DatasetFactory.createConstraint('sourceProcess', sol, sol, ConstraintType.MUST);
	var constraintWorkflowProcess3 = DatasetFactory.createConstraint('processId', id, id, ConstraintType.MUST);
	var datasetWorkflowProcess = DatasetFactory.getDataset('workflowProcess', null, new Array(constraintWorkflowProcess1, constraintWorkflowProcess2), null);
	return datasetWorkflowProcess.getValue(datasetWorkflowProcess.rowsCount-1, 'workflowProcessPK.processInstanceId');
}

function getHistory(sol){
	var constraintProcessHistory1 = DatasetFactory.createConstraint('sqlLimit', '100', '100', ConstraintType.MUST);
	var constraintProcessHistory2 = DatasetFactory.createConstraint('processHistoryPK.processInstanceId', sol, sol, ConstraintType.MUST);
	var datasetProcessHistory = DatasetFactory.getDataset('processHistory', null, new Array(constraintProcessHistory1, constraintProcessHistory2), null);
	return datasetProcessHistory;
}