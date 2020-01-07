function afterTaskSave(colleagueId,nextSequenceId,userList){
	var numProc = getValue('WKNumProces');
	hAPI.setCardValue('wkNumProces', numProc);
	hAPI.setCardValue('wkNumState', nextSequenceId);

}