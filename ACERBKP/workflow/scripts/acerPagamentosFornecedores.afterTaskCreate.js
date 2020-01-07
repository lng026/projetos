function afterTaskCreate(colleagueId){
	
	var nP = getValue('WKNumProces');
	var col = colleagueId; //"admin";
	var atv = getValue('WKCurrentState');
	//define prazo da atividade de aprovacao
	if(atv == 5){
		var apvDate = hAPI.getCardValue("apvPrazo");
		var dtPz = dateFromString(apvDate);
		var hrPz = (24*60*60) - 1; //23:59:59
		hAPI.setDueDate(nP, 0, col, dtPz, hrPz);
	}
	//define prazo da atividade de finalizar lancamento
	if(atv == 43){
		var finDate = hAPI.getCardValue("finPrazo");
		var dtPz = dateFromString(finDate);
		var hrPz = (24*60*60) - 1; //23:59:59
		hAPI.setDueDate(nP, 0, col, dtPz, hrPz);
	}

}

function dateFromString(dtString){
    var aDt = dtString.split("/");
    var nDt = new Date();
    nDt.setDate(aDt[0]);
    nDt.setMonth(parseInt(aDt[1]) - 1);
    nDt.setFullYear(aDt[2]);
    return nDt;
}
