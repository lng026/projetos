function beforeTaskSave(colleagueId, nextSequenceId, userList) {
	var completedTask = (getValue("WKCompletTask")=="true");
	if(nextSequenceId==89&&completedTask){
		var attachments = hAPI.listAttachments();
	    var hasAttachment = false;
	    if(attachments.size()>0){
	    	hasAttachment = true;
	    }	
	    if (!hasAttachment) {
	        throw i18n.translate("erroAnexos");
	    }
	}
	
}