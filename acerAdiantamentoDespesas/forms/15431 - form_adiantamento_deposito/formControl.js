
function setCamposBloqueados(campos){
	for ( var i in campos) {
		var c = campos[i];

		var element = document.querySelector('#'+c);
		if(isDiv(element)){
			setDisableDiv(c);
		}else{
			setDisable(element,true);
		}
	}
}

function setCamposEscondidos(campos){
	for ( var i in campos) {
		var c = campos[i];
		var element = document.querySelector('#'+c);
		console.log(element);
		setVisibilidade(element,false);
	}
}

function setCamposObrigatorios(reqFields){
	for (var i = 0; i < reqFields.length; i++) {
		var e = reqFields[i];
		$('#'+e).attr('required',true);
	}
	camposObrigatorios();
}

function exibeDivs(divs){
	console.log(divs)
//	divs.forEach(divName => {
	for ( var i in divs) {
		divName = divs[i];
		var element = document.querySelector('#'+divName);
		setVisibleDiv(element,true);
		// $("#"+divName).show();
	}
}

function isDiv(e){
	return e.tagName == 'DIV' ? true:false;
}
function setDisableDiv(divName){
	var divInputs = getDivInputs(divName);
//	divInputs.forEach(i => {
	// for ( var i in divInputs){
		
	// }
	for (let i = 0; i < divInputs.length; i++) {
		var div = divInputs[i];
		setDisable(div,true);
		
	}
}


function valObrAprov(aprovFieldId,obsFieldId){
		var resp = $("#"+aprovFieldId).val();
		if(resp.trim() == '1'){
			setObrigatorio(obsFieldId,false);
		}else{
			setObrigatorio(obsFieldId,true);
		}
		camposObrigatorios();
}
