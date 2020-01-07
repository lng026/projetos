function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var constraintColleague1 = DatasetFactory.createConstraint('active', 'true', 'true', ConstraintType.MUST);
	var datasetColleague = DatasetFactory.getDataset('colleague', null, new Array(constraintColleague1), ['colleagueName']);
	return datasetColleague;
}function onMobileSync(user) {

}