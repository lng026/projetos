function displayFields(form,customHTML){
	bloquear('name');
	bloquear('email');
	bloquear('responsavel');
	bloquear('data_Chamado');
	bloquear('dtAtendim');
	bloquear('desc_incidentec');

	hideDiv('acsupdiv');
	hideDiv('ticketdata');
	hideDiv('view_chamado');
	hideDiv('obsAnalistaDiv');
	
	var atv = parseInt(getValue("WKNumState"));
	log(atv);
	setar('atv',atv);
	var co = consult_dataset();
	var nomeC = co.getValue(0, "colleagueName");
	setar('nomec',nomeC);
	
	customHTML.append("\n<script>function getWKNumState(){ return '" + getValue('WKNumState') + "';}</script>");
	customHTML.append("\n<script>function getWKUser(){ return '" + getValue('WKUser') + "';}</script>");
	
	var pfindex = form.getChildrenIndexes("resposta").length;
	setar('pfindex', pfindex);
	
	var ccindex = form.getChildrenIndexes("cc").length;
	if (ccindex >= 0) {
		setar('ccindex', ccindex);
	}
	
	setar('checkResp', '0');
	
	var mode = form.getFormMode();
	
	var colaborador = consult_dataset();
	var loginsol = colaborador.getValue(0, "login");
	setar('login',loginsol);
	
	var eqp_atr = form.getValue("usRespTxt");
	var topico_aj = form.getValue("usNomeTxt");
	var numProc = getValue('WKNumProces');
	var dtCria = form.getValue("data_Chamado");
	var requester = form.getValue("name");
	var responsavel = consult_dataset();
	var respNome = responsavel.getValue(0, "colleagueName"); // Método que carrega no input o nome do usuario suporte
	var assunto = form.getValue("assunto");
	var incidente = form.getValue("txt_incidente");
	
	var viewdata = '';
	viewdata += "\nvar txt_numero = document.querySelector('#txt_numero');";
	viewdata += "\nvar txt_criado = document.querySelector('#txt_criado');";
	viewdata += "\nvar txt_por = document.querySelector('#txt_por');";
	// viewdata +\n= "var txt_tempo = document.querySelector(\'#txt_tempo\');";
	viewdata += "\nvar txt_assunto = document.querySelector('#txt_assunto');";
	viewdata += "\nvar txt_incidente = document.querySelector('#panelincidente');";
	viewdata += "\nvar txt_topicoaj = document.querySelector('#topicoajuda');";
	viewdata += "\nvar txt_eqpatr = document.querySelector('#txt_resp');";
	viewdata += "\nvar txt_nvcham = document.querySelector('#nvchamado');";
	viewdata += "\nvar prioridade = document.querySelector('#prioridade');";
	viewdata += "\nvar txtprioridade = getInputValue(prioridade);";//prioridade.textContent;"; //.options[prioridade.selectedIndex].text;";
	
	viewdata += "\ntxt_numero.innerHTML += '#"+ numProc +"';";
	viewdata += "\ntxt_criado.innerHTML += '"+ dtCria +"';";
	viewdata += "\ntxt_por.innerHTML += '"+ requester +"';";
	// viewdata += "txt_tempo.innerHTML += '"+ at_tempo +"';";
	viewdata += "\ntxt_assunto.innerHTML += '"+ assunto +" <small> #"+ numProc +"</small> ';";
	viewdata += "\ntxt_topicoaj.innerHTML += '"+ topico_aj +"';";
	viewdata += "\ntxt_eqpatr.innerHTML += '"+ eqp_atr +"';";
	viewdata += "\ntxt_nvcham.innerHTML += txtprioridade;";
	
	customHTML.append("\n<script>" + viewdata + "</script>");
//	 customHTML.append("\n<script>txt_incidente.innerHTML += '"+ incidente.toString() +"';</script>");
		
	switch(atv){
		case 0:
		setar('checkinicio','1');
		var userid = getValue("WKUser");
		var _date = new Date();
		var api = consult_API();
		var nomeSolic = colaborador.getValue(0, "colleagueName");
		var emailSolic = colaborador.getValue(0, "mail");
		// MOSTRA DIV PARA INSERIR DADOS DA SOLICITAÇÃO e INCIDENTE
		showDiv('ticketdata');
		habilitar('desc_incidente');	
		// PREENCHE CAMPOS NOME, EMAIL, IDSOLICITANTE (HIDDEN)
		setar('name',nomeSolic);
		setar('email',emailSolic);
		setar('idSol', userid);
		// CRIA DATA DO CHAMADO E SETA A DATA NOS CAMPOS
		var dia0 = _date.getDate();
		var mes0 = _date.getMonth();
		var ano0 = _date.getFullYear();
		var hora0 = _date.getHours();
		var minuto0 = _date.getMinutes();
		var data_chamado = showDate(dia0,mes0,ano0,hora0,minuto0);
		var fechamentoAnalista = showDate(dia0,mes0,ano0,hora0,minuto0);
		
		// Formata a exibição da data (Dia/mes/ano 00:00:00) 
		// var dataAtual = _date.getDate() + "/" + month + "/" + _date.getFullYear() + " " + _date.getHours() + ":" + _date.getMinutes();
		
		var dt_dia = _date.getDate();
		var dt_mes = _date.getMonth()+1;
		var dt_ano = _date.getFullYear();
		
		var dateTime = _date.getTime();
		
		setar('data_Chamado', data_chamado);
		setar('dtChamTime', dateTime);
		
		break;
		
		case 15:
		if (mode == 'VIEW') {
			showDiv('agrd');
			}else{
			showDiv('divanalista');
			showDiv('addres');
			showDiv('statusticket');
		}
		form.setHidePrintLink(true);
		setar('usNovoResp','');
		customHTML.append("\n<script>$('#us_resolvidof').val('');");
		customHTML.append("\nvisResp();</script>");
		// MOSTRA DIVS DO CHAMADO E ACOES DO CHAMADO 
		setar('checkinicio','0');
		showDiv('view_chamado');
		showDiv('acsupdiv');
	
		var _date = new Date();
		// CRIA DATA DO CHAMADO E SETA A DATA NOS CAMPOS
		var dia0 = _date.getDate();
		var mes0 = _date.getMonth();
		var ano0 = _date.getFullYear();
		var hora0 = _date.getHours();
		var minuto0 = _date.getMinutes();
		var fechamentoAnalista = showDate(dia0,mes0,ano0,hora0,minuto0);

		setar('fechamentoAnalista', fechamentoAnalista);

		// GERA DATA DO ATENDIMENTO 
		
		var dtAtendimento = new Date();
		
		// GERA VISUALIZAÇÃO DA DATA 
		var dia15 = dtAtendimento.getDate();
		var mes15 = dtAtendimento.getMonth();
		var ano15 = dtAtendimento.getFullYear();
		var hora15 = dtAtendimento.getHours();
		var minuto15 = dtAtendimento.getMinutes();
		
		var mostraDtAtend = showDate(dia15,mes15,ano15,hora15,minuto15);
		
		function viewTxt(divid,conteudo){
			customHTML.append('\n<script>document.querySelector(\"#'+ divid+'\").innerHTML += \"'+conteudo+'\";</script>')
		}
		
		viewTxt('txt_dtatend',mostraDtAtend);
		
		
		// CONVERSÃO DE MILISEGUNDOS em MINUTOS/HORAS/DIAS
		var dtatTime = dtAtendimento.getTime();
		
		var msecPerMinute = 1000 * 60;
		var msecPerHour = msecPerMinute * 60;
		var msecPerDay = msecPerHour * 24;
		
		// PEGA DATA EM MS E CALCULA O INTERVALO
		var dateMsec = parseInt(form.getValue("dtChamTime"));
		var interval = parseInt(dtatTime - dateMsec);
		
		
		// CALCULA QUANTOS DIAS POSSUI NO INTERVALO
		var days = Math.floor(interval / msecPerDay );
		interval = interval - (days * msecPerDay );
		// // CALCULA HOURAS, MINUTOS e SEGUNDOS NO INTERVALO
		var hours = Math.floor(interval / msecPerHour );
		interval = interval - (hours * msecPerHour );
		var minutes = Math.floor(interval / msecPerMinute );
		interval = interval - (minutes * msecPerMinute );
		var seconds = Math.floor(interval / 1000 );
		// CRIA VISUALIZAÇÃO DO INTERVALO
		if (days > 0 && hours > 0) {
			var at_tempo = days + "D, " + hours + ":" + minutes + "";
			} else{if (days == 0 && hours > 0) {
				var at_tempo = hours + ":" + minutes + "";
				}else{if (days == 0 && hours == 0) {
					var at_tempo = minutes + " minutos.";
				}
				
			}}
			
			// SETA DATA DE ATENDIMENTO E DIFERENÇA EM CAMPOS OCULTOS PARA ANALYTICS
			setar('dtAtendTime', dtatTime);
			setar('atHora', hours);
			setar('atMin', minutes);
			setar('atDias', days);	
			// PREENCHE INFORMAÇÕES DO CHAMADO NOS CAMPOS
			// VISUALIZAÇÃO DO NOME DO COLABORADOR QUE ESTÁ RESPONDENDO NO CAMPO DE RESPOSTA
			// var getNomeResp = form.getValue("RespNome");
			setar('RespNome',respNome);
			// document.querySelector('resp_nome').innerHTML = 'resp_nome';
			// var indexes = form.getChildrenIndexes("resposta");
			// var lastI = indexes[indexes.length-1];
			// setar('nomeRsp___' + lastI,respNome);
			// setar('dataRsp___' + lastI,mostraDtAtend);
			break;
			
			case 9:
			if (mode != 'VIEW') {
				showDiv('addres');
			}
			customHTML.append("\n<script>visResp();</script>");
			showDiv('view_chamado');
			showDiv('user_soluc');
			showDiv('statusticket');
			customHTML.append('\n<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css" rel="stylesheet">\n');
			// PREENCHE INFORMAÇÕES DO CHAMADO NOS CAMPOS
			// VISUALIZAÇÃO DO NOME DO COLABORADOR QUE ESTÁ RESPONDENDO NO CAMPO DE RESPOSTA
			// var getNomeResp = form.getValue("RespNome");
			setar('RespNome',respNome);
			break;
			
			case 22:
			// PREENCHE INFORMAÇÕES DO CHAMADO NOS CAMPOS
			customHTML.append('\n<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css" rel="stylesheet">\n');
			showDiv('avalia');
			showDiv('user_solucf');
			showDiv('view_chamado');
			showDiv('avaliatxt');
			customHTML.append("\n<script>visResp();</script>");
			
			break;		
	}
	
	function hideDiv(divid){
		customHTML.append("\n<script>document.getElementById(\""+divid+"\").style.display = \"none\";</script>");
	}
	
	function showDiv(divid){
		customHTML.append("\n<script>document.getElementById(\""+divid+"\").style.display = \"block\";</script>");
	}
	
	function log(log){
		customHTML.append("\n<script>console.log("+ log +");</script>");
	}
	
	function setar(campo, valor){
		form.setValue(""+campo+"", valor)
	}
	
	function habilitar(campo)
	{
		form.setEnabled(""+campo+"", true);
	}

	function bloquear(campo)
	{
		form.setEnabled(""+campo+"", false);
	}
	
	function showDate(dia,mes,ano,horas,minutos){
		mes = mes+1;
		dia = ('0' + dia).slice(-2);
		mes = ('0' + mes).slice(-2);
		horas = ('0' + horas).slice(-2);
		minutos = ('0' + minutos).slice(-2);
		
		var data = dia + "/" + mes + "/" + ano + " " + horas + ":" + minutos;
		return data;
	}
	
	var atv = getValue('WKNumState');
	switch (atv) {
		case 9:
			form.setVisibleById('enviar_mensagem', false);
	}
	
}