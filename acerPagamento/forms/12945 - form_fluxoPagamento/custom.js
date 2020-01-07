// Init
$(document).ready(function(){
	// Aplica Regras gerais
	var processo = new ProcessConfigs();
	var atvAtual = $("#atvAtual").val();
	// processo.setAtvCorrente('xxx');
	processo.setAtvCorrente(atvAtual);
	// console.log(processo.getActivityList());
	exibeDivs(processo);
	setCamposBloqueados(processo);
	setCamposObrigatorios(processo);
	setCamposEscondidos(processo);
	console.log(processo.getAtvCorrente());
	mostrarHistorico();
	// gatilho
	$("#cpfcnpj").on("change",function(){
		buscaCliente();
	});
	$("#cpfcnpjFav").on("change",function(){
		buscaFavorecido();
	});
	// Aplicas regras especificas
	// Inicio
	if(processo.getAtvCorrente().codigo == 'inicio'){
		// Verificar se é retorno da triagem
		if($("#aprovTriagem").val() == '0' && $('#aprovTriagemObs').val().trim() != ''){
		var triagemDiv = document.querySelector('#aprovTriagemdiv');
			setVisibleDiv(triagemDiv,true);
			setDisableDiv('aprovTriagemdiv');
			$("#alertCorrecao").show();
		}
		var dtVencimento = FLUIGC.calendar('#dtVencimento');
	}
	// Triagem
	if(processo.getAtvCorrente().codigo == 'triagem'){
		// Verificar se é retorno da cordenação
		if($("#aprovCord").val() == '0' && $('#aprovCordObs').val().trim() != ''){
		var aprovCord = document.querySelector('#aprovCorddiv');
			setVisibleDiv(aprovCord,true);
			setDisableDiv('aprovCorddiv');
			$("#alertCorrecao").show();
		}
		//Validar obrigatoriedade das obseracoes caso negativo
		$("#aprovTriagem").on("change",function(){
			valObrAprov('aprovTriagem','aprovTriagemObs');
		});
		var dtVencimento = FLUIGC.calendar('#dtVencimento');


	}
	// cordenacao
	if(processo.getAtvCorrente().codigo == 'aprovCord'){
		// Verificar se é retorno da diretoria
		if($("#aprovDir").val() == '0' && $("#aprovDirObs").val().trim() != ''){
		var aprovDir = document.querySelector('#aprovDirdiv');
			setVisibleDiv(aprovDir,true);
			setDisableDiv('aprovDirDiv');
			$("#alertCorrecao").show();
		}
		//Validar obrigatoriedade das obseracoes caso negativo
		$("#aprovCord").on("change",function(){
			valObrAprov('aprovCord','aprovCordObs');
		});
	}

	if(processo.getAtvCorrente().codigo == 'aprovDir'){
		//Validar obrigatoriedade das obseracoes caso negativo
		$("#aprovDir").on("change",function(){
			valObrAprov('aprovDir','aprovDirObs');
		});
	}
});

function setCamposBloqueados(processo){
	var campos = processo.getCamposBloqueados();
	for ( var i in campos) {
		var c = campos[i];

		var element = document.querySelector('#'+c);
		if(isDiv(element)){
			setDisableDiv(c);
		}else{
			setDisable(element,true);
		}
	}
//	campos.forEach(c => {
//		var element = document.querySelector('#'+c);
//		if(isDiv(element)){
//			setDisableDiv(c);
//		}else{
//			setDisable(element,true);
//		}
//
//	});
}

function setCamposEscondidos(processo){
	var campos = processo.getCamposEscondidos();
	console.log(campos);
	
//	campos.forEach(c => {
	for ( var i in campos) {
		var c = campos[i];
		var element = document.querySelector('#'+c);
		console.log(element);
		setVisibilidade(element,false);
	}
}

function setCamposObrigatorios(processo){
	var reqFields = processo.getCamposObrigatorios();
	for (var i = 0; i < reqFields.length; i++) {
		var e = reqFields[i];
		$('#'+e).attr('required',true);
	}
	camposObrigatorios();
}

function exibeDivs(processo){
	var divs = processo.getDivsActividade();
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
	for ( var i in divInputs) {
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


function customValidadeBefore(numState, nextState){
	//se está no inicio
	var validate = true;
	if(nextState == 5){
		// verificar campos de conta
		var contac = $("#contac").val();
		var contap = $("#contap").val();
		if(contac.trim() == "" && contap.trim() == ""){
			validate = " Por favor, adicione uma Conta Corrente ou Conta Poupança."
		}
	}
	
	return validate;
}
function customValidadeAfter(numState, nextState){
	var validate = true;
	// Salva historico caso pertinente
	// triagem
	if(numState == 5){
		salvaHistorico('aprovTriagem','aprovTriagemObs');
		setFormPag();
	}
	// Aprovação da cordenação
	if(numState == 9){
		salvaHistorico('aprovCord','aprovCordObs');
	}
	// Aprovação do Diretor
	if(numState == 13){
		salvaHistorico('aprovDir','aprovDirObs');
	}
	return validate;

}



function salvaHistorico(aprovField,obsFieldId){
	var uid = $("#userAtual").val();
	var usuario  =getUserName(uid);
	var dtHist = dateHToString(new Date());
	var aprovHist = $("#"+aprovField).val() == "1" ? "Aprovado" : "Reprovado";
	var obsHist = $("#"+obsFieldId).val();
	addHistTable(usuario,dtHist,aprovHist,obsHist)
}

function addHistTable(user, data,aprov,obs){
	var iHist = wdkAddChild('tbHistorico');
	$("#usuario___"+iHist).val(user);
	$("#dtHist___"+iHist).val(data);
	$("#aprovHist___"+iHist).val(aprov);
	$("#obsHist___"+iHist).val(obs);
    return  iHist ;
}

function mostrarHistorico(){
	$("#divHistorico").html('');
	$('.histLinha').each(function(){
		var u = $(this).find('.usuario').val();
		var d = $(this).find('.dtHist').val();
		var a = $(this).find('.aprovHist').val();
		var o = $(this).find('.obsHist').val();
		
		var hist = "";
		if(u && a && d){
			hist = getHistStr(u,a,d,o);
		}

		if(hist){
			if($("#divHistorico").html() != ''){
				$("#divHistorico").append('<hr>');
			}
			$("#divHistorico").append(hist);
		}		
		
	});
	if($("#divHistorico").html() != ''){
		$("#showHist").show();
	}
}

function getHistStr(usuario,Aprovado,data,obs){
		var str = '<div class="media-heading-text">';
		str += '<h5><strong><span class="wrap-element-popover">'+usuario+'</span></strong>';
		str += '<span>	'+Aprovado+'</span></h5>';
		str += '<h6>'+data+'</h6>';
		str += '<p>'+obs+'</p></div>';
		return str;
}


function getUserName(id){
	var name = null;
	var c1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', id, id, ConstraintType.MUST);
	var dsColleague = DatasetFactory.getDataset('colleague', null, new Array(c1), null);
	if(dsColleague.values.length){
		name = dsColleague.values[0]['colleagueName'];
	}
	return name;
}



function buscaCliente(){
	var myLoading1 = FLUIGC.loading('#dadosCliente');
	myLoading1.show();
	console.log('cpf alterado - ' + $("#cpfcnpj").val());
	var cpf = $("#cpfcnpj").val();
	if(cpf){
		
		cpf = rmChar(cpf,'.');
		cpf = rmChar(cpf,'-');
		cpf = rmChar(cpf,'/');
		var cliente = getCliente(cpf);
		if(cliente){
			// preenche form
			$("#nome").val(cliente.nome);
			$("#endereco").val(cliente.endereco);
			$("#complemento").val(cliente.complemento);
			$("#cep").val(cliente.cep);
			$("#estado").val(cliente.estado);
			$("#cidade").val(cliente.cidade);
			$("#bairro").val(cliente.bairro);
		}	
		
	}
	myLoading1.hide();
}


function buscaFavorecido(){
	var cpf = $("#cpfcnpjFav").val();
	if(cpf){
		cpf = rmChar(cpf,'.');
		cpf = rmChar(cpf,'-');
		cpf = rmChar(cpf,'/');
		var cliente = getCliente(cpf);
		if(cliente){
			// preenche form
			$("#favorecido").val(cliente.nome);
		}	
		
	}

}

function setFormPag(){
	var formPaga = '87';
	var codbar = $("#nBolCodBar").val();
	if(codbar.trim() != ""){
		formPaga = '06'; //Boleto
	}else{
		var uCpf = $("#cpfcnpj").val();
		var fcpf = $("#cpfcnpjFav").val();
		if(trataCPF(uCpf).trim() == trataCPF(fcpf).trim() ){
			formPaga = '43'; //Ted mesmo titular - 43
		}else{
			formPaga = '41'; //Ted outro titular - 41
		}
	}
	$("#cFormaPgto").val(formPaga);
}

function trataCPF(cpf){
	cpf = rmChar(cpf,'.');
	cpf = rmChar(cpf,'-');
	cpf = rmChar(cpf,'/');
	return cpf;
}