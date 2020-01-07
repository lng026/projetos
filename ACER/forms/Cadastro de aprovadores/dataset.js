function carregaUsuarios(campo){
	var constraintColleague1 = DatasetFactory.createConstraint('active', 'true', 'true', ConstraintType.MUST);
	var datasetColleague = DatasetFactory.getDataset('colleague', null, new Array(constraintColleague1), new Array('colleagueName'));

	var row = [];

	for(var cont =0; cont < datasetColleague.values.length;cont++){
		row = datasetColleague.values[cont];

		$("#"+campo).append("<option value='"+row['colleaguePK.colleagueId']+"'>"+row['colleagueName']+"</option>");
	}
}



