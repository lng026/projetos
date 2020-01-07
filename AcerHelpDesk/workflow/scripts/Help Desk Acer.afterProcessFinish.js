function afterProcessFinish(processId){
	if (hAPI.getCardValue("us_resolvido") != "nao") {
		hAPI.setCardValue("us_resolvido", "sim");
	}
}