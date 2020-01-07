function beforeSendData(customFields,customFacts){
customFields[0] =hAPI.getCardValue("respNome");	
customFields[1] =hAPI.getCardValue("usNomeTxt");
customFields[2] =hAPI.getCardValue("data_Chamado");
customFields[3] =hAPI.getCardValue("name");

customFacts[0]=java.lang.Double.parseDouble(hAPI.getCardValue("atHora"));
customFacts[1]=java.lang.Double.parseDouble(hAPI.getCardValue("atMin"));
customFacts[2]=java.lang.Double.parseDouble(hAPI.getCardValue("atDias"));

}
