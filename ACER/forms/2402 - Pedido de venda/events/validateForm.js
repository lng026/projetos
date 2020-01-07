function validateForm(form){
//remove toda ocorrencia do caractere passado
var semCaractere =  function(valor, c){
  while(valor.indexOf(c) >= 0){
    valor = valor.replace(c,'');
  }
  return valor;
}

  	var atividade = getValue("WKNumState");

  	//valida os campos referente a liberação de credito
  	if(atividade == 44 ){
  		var liberacao = form.getValue("liberaCredito");
  		if(liberacao != "0" && liberacao != "1"){
  			throw "Por favor, Selecione umas das opçõe sde liberação de crédito";
  		}

  		var libObs = form.getValue("liberaCreditoObs");
  		if(libObs== undefined || libObs.trim() == ""){
  			throw "Por favor, Preencha o campos \"Observações\".";
  		}

  	}







}
