function validateForm(form){
var assunto = form.getValue('assunto');
var topico = form.getValue('usRespTxt');
var incidente = form.getValue('txt_incidente');
var atv = parseInt(getValue("WKNumState"));

function validaCampo(atividade,atividade2,campo,texto){
	if (atv == atividade) {
			if (campo == '') {
			throw ''+texto+'';
		}
	}
}

// validaCampo(4,assunto,'Digite um assunto.');
// validaCampo(4,4,txt_incidente,'Descreva o incidente do chamado.');
// validaCampo(4,4,usRespTxt,'Selecione o topico de ajuda.');
// validaCampo(15,'',status,'Selecione a AÇÃO do chamado.');



}