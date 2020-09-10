function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var datasetDocument = DatasetBuilder.newDataset();
	if(constraints) {
		var cons = new Array();
		for (var i = 0; i < constraints.length; i++) {
            cons.push(constraints[i]);
		}
		var cs1 = DatasetFactory.createConstraint('activeVersion', 'true', 'true', ConstraintType.MUST);
		cons.push(cs1);
		datasetDocument = DatasetFactory.getDataset('document', null, cons, null);
	 }else{
		 datasetDocument.addRow(new Array("teste"));
	 }
	 return datasetDocument;
}function onMobileSync(user) {

}
