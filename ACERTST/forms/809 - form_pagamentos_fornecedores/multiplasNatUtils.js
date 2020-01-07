function validarCCustoInformados(elm){
	var nCC    = $(elm).val();
	var nroTRs = $('#tableRateioCentroCusto > tbody').find('tr');
	var erro   = false;
	nroTRs.each(function(i){
		if($(this).find('input[id^=cCentroCustoRat]').val() == nCC){
			var id = $(this).find('input[id^=cCentroCustoRat]').attr('id');
			if(id != $(elm).attr('id')){
				erro = true;
			}			
		}
	});
	return erro;
}
function validarSaldoContaRateios(ccusto,corc,valor){
	var cCCusto   = ccusto,
	filial  = $('#codFilial').val(),
	empresa = $('#codEmpresa').val(),
	cCOrc  = corc,
	valTit = valor,
	saldo = 0,
	r = {saldo:0,
		 ret:'0'}; /*0 - saldo ok 1 - saldo negativo 2 - erro*/
	
	var fields 	= [empresa, filial, cCOrc, cCCusto,"Saldo","message"];
	var constraints		= [];
	var sortingFields	= [];
	var consultaSaldoDS = DatasetFactory.getDataset("ctgConsultaSaldo", fields, null, null); 
	if(consultaSaldoDS.values.length!=0){
		result = consultaSaldoDS.values[0].Saldo;
	}
	if(result !='Erro'){			
		saldo = parseFloat(result).toFixed(2);
		saldo = parseFloat(result);
		console.log('Saldo: '+saldo+" CC: "+cCCusto);
		valTit = valTit.replace('R$','').replace(',','').replace(',','').replace(',','').replace(',','');
		valTit = parseFloat(valTit).toFixed(2);
		valTit = parseFloat(valTit);
		console.log('Valor: '+valTit);
			if(valTit > saldo){
				r.ret = '1';
			}
	}else if(result=='Erro'){
		r.ret = '2';		
	}
	r.saldo = saldo;
	return r;
}
function validarSaldoConta(){
	var cCCusto   = $('#cCentroCusto').val(),
	filial  = $('#codFilial').val(),
	empresa = $('#codEmpresa').val(),
	cCOrc  = $('#cContaOrc').val(),
	valTit = $('#ValTitulo').val(),
	saldo = 0;
	
	var fields 	= [empresa, filial, cCOrc, cCCusto,"Saldo","message"];
	var constraints		= [];
	var sortingFields	= [];
	var mensagem = '';
	var campo = $('#mensagemSaldo').val();
	if(campo != 'S'){
		var consultaSaldoDS = DatasetFactory.getDataset("ctgConsultaSaldo", fields, null, null); 
		if(consultaSaldoDS.values.length!=0){
			result = consultaSaldoDS.values[0].Saldo;
		}
		if(result !='Erro'){			
			saldo = parseFloat(result).toFixed(2);
			saldo = parseFloat(result);
			console.log('Saldo: '+saldo);
			valTit = valTit.replace('R$','').replace(',','').replace(',','').replace(',','').replace(',','');
			valTit = parseFloat(valTit).toFixed(2);
			valTit = parseFloat(valTit);
			console.log('Valor: '+valTit);
			
			if(campo =='N'){
				if(valTit > saldo){
					//$('#mensagemSaldo').val('S'); Bloqueia qualquer lançamento que supere o saldo;
					//throw mensagemSld+" : 	"+ parseFloat(saldo).toFixed(2);
					var errosaldo = mensagemSld+" : 	"+ parseFloat(saldo).toFixed(2);
					errosaldo += ", " + mensagemSld21 + ":" + cCOrc + mensagemSld22 +":" +cCCusto+ ".\n";
					errosaldo += mensagemSld3;
					throw errosaldo;
				}
			}
		}else if(result=='Erro'){
			mensagem = consultaSaldoDS.values[0].message
			throw mensagem;			
		}
	}				
}
function validarPreenchidos(){
	var erro = false; 
	var nroTRs    = $('#tableRateioCentroCusto > tbody').find('tr');//retorna na posi��o 0, a linha template paixFilho
	var tamanhoTrs= nroTRs.size();
	var rateioSim = $('#rateioCC_sim').is(':checked');
	if(rateioSim && tamanhoTrs > 1){
		nroTRs.each(function(i){
	    	if(i>0){
	    		if($(this).find('input[id^=cCentroCustoRat___]').val()==''){
	    			$(this).find('input[id^=cCentroCustoRat___]').closest(".form-group").addClass("has-error");
	    			erro = true;
	    		}
	    		if($(this).find('input[id^=cConOrcRat___]').val()==''){
	    			$(this).find('input[id^=cConOrcRat___]').closest(".form-group").addClass("has-error");
	    			erro = true;
	    		}
	    		if($(this).find('input[id^=valorCCusto___]').val()==''){
	    			$(this).find('input[id^=valorCCusto___]').closest(".form-group").addClass("has-error");
	    			erro = true;
	    		}
	    		if($(this).find('input[id^=percentualCCusto___]').val()==''){
	    			$(this).find('input[id^=percentualCCusto___]').closest(".form-group").addClass("has-error");
	    			erro = true;
	    		}
	    	}    	
	    });	
		if(erro){
			throw 'Preencha todos os campos';
		}else{
			validarTotalRateioCC('1');
		}
	}else if(rateioSim && tamanhoTrs == 1){
		throw 'Informe um rateio antes de prosseguir';
	}
	// else if(!rateioSim){
	// 	validarSaldoConta();		
	// }	
}

function getValorSemPontos(valor){
	 a = new String(valor);
	 a = a.replace('R$','');
	 a = a.replace(',','');
	 a = a.replace(',','');
	 a = a.replace(',','');
	 a = a.replace(',','');
	 a = a.replace(',','');
	 valor = parseFloat(a).toFixed(2);
	 return valor;
}
function validarTotalRateioCC(aoSalvar){
	
	var valorTitulo = getValorSemPontos($('#ValTitulo').val());
	valorTitulo = parseFloat(valorTitulo).toFixed(2);	
	valorTitulo = parseFloat(valorTitulo);
	var soma  = parseFloat(0.00);
	var mensagem = '';
	var conta = $('#cContaOrc').val();
	var validasaldo ='';
	/*somar valorNatureza___1
	 * percentualNatureza___*/
	$('#tableRateioCentroCusto > tbody').find('tr').each(function(i){
		if(i>0){
		 valCusto = $(this).find('input[id^=valorCCusto___]').val();
		 ccusto   = $(this).find('input[id^=cCentroCustoRat___]').val();
		 corc = conta;
		 soma += parseFloat(valCusto) ? parseFloat(valCusto) : parseFloat(0.00);
		}
	});	
	soma = parseFloat(soma).toFixed(2);	
	soma = parseFloat(soma);
	if(soma==valorTitulo){	
		if(aoSalvar == '2' ){
			var textoErro = 'Todos os valores foram distribuidos.\n Valor Distribuido: R$ '+soma+' Valor Total: R$ '+parseFloat(valorTitulo).toFixed(2);
			var modal = $('#modalErroValorSomado');
			var p =  $("<p>");			
			p.text(textoErro);
			modal.find('.modal-body').append(p);
			modal.modal('show');
			return false;
		}if(aoSalvar == '1'){
			if(mensagem !=''){
				throw mensagem;
			}
		}
	}
	else if(soma < valorTitulo){
		var textoErro = 'Soma dos valores distribuidos e diferente do total.\n Valor Distribuido: R$ '+soma+' Valor Total: R$ '+parseFloat(valorTitulo).toFixed(2);
		if(aoSalvar == '1'){
			throw textoErro;
			return false;
		}
		if(aoSalvar == '2'){
			wdkAddChild('tableRateioCentroCusto');
			return true;
		}
	}
	else if(soma > valorTitulo){ 
		var textoErro = 'Soma dos valores distribuidos e diferente do total.\n Valor Distribuido: R$ '+soma+' Valor Total: R$ '+parseFloat(valorTitulo).toFixed(2);
		if(aoSalvar == '1'){
			throw textoErro;
			return false;
		}
		else if(aoSalvar == '2' ){
			var modal = $('#modalErroValorSomado');
			var p =  $("<p>");			
			p.text(textoErro);
			modal.find('.modal-body').append(p);
			modal.modal('show');
			return false;
		}
	}
}
var vencData;
var EmissData;
$(document).ready(function(){
	percentualRestanteNatur = 100.00;
	$('#execSN').val('N');
	var dlimVenc = getVencDataLim(20);
	var venDatas = getVencDatas(dlimVenc);
	// var venDatas = getVencDatas(new Date())
	// vencData = FLUIGC.calendar('#VencData',{ enabledDates:venDatas }); // regra de datas de vencimento
	vencData = FLUIGC.calendar('#VencData');
	EmissData = FLUIGC.calendar('#EmissData');
	//  vencData.setMinDate(dlimVenc);
	// if(!$("#VencData").val()){
	// 	vencData.setDate(getVencDataLim());
	// 	EmissData.setMaxDate(getVencDataLim())
	// }
	$('#ValTitulo').on('change', function(){
		var nVBruto = getValorSemPontos($(this).val());
		nVBruto = parseFloat(nVBruto);
		if(nVBruto >= 20000.00){
			vencData.setMinDate(getVencDataLim(60));
		}else{
			vencData.setMinDate(getVencDataLim(20));
			
		}
	});
	
	/*EmissData.setMinDate(new Date());*/	
	$('#VencData').on('change', function() {
		var data = $(this).val().split('/');
		data = new Date(data[2],data[1]-1,data[0]);
		EmissData.setMaxDate(data);
		
	});
	 
	// $('#EmissData').on('change', function() {
	// 	var data = $(this).val().split('/');
	// 	data = new Date(data[2],data[1]-1,data[0]);
	// 	vencData.setMinDate(data);
	// });
function calculaValor(percentual,campo){
    var valor       = 0;
	var valor_total = getValorSemPontos($(campo).val());
	valor_total     = parseFloat(valor_total);
	percentual      = parseFloat(percentual);
	percentual      = percentual/100;
	valor           = valor_total*percentual;  
	return valor;
}
function calcularPercentual(valor, campo){
	var percentual  = 0,
		valorInf    = parseFloat(valor),
		valor_total = getValorSemPontos($(campo).val());
		valor_total = parseFloat(valor_total);
		
	percentual      = ((valorInf*100)/valor_total);
	return percentual;
}
$('#tableRateioCentroCusto').find('tr').each(function(key){
	console.log('Linha');
	console.log($(this));
	var linha = $(this);
	$(this).find("input[name*='cCentroCustoRat']").on('change',function(){
		console.log('cC');
		console.log($(this));
    	if(validarCCustoInformados($(this))){
    		$(this).closest(".form-group").addClass("has-error");
			$(this).attr('placeholder','Codigo incorreto');
			$(this).val('');
    	}
    });
    $(this).find("input[name*='percentualCCusto']").mask("000.0000000", {reverse: true});
    $(this).find("input[name*='percentualCCusto']").on('focusout',function(){
    	var campovlrTotal  = $('#ValTitulo');    	
    	pRateio = parseFloat($(this).val());
    	console.log('Percentual');
    	console.log($(this));
    	if(pRateio <= 100.00){
    		var valorCalculado = calculaValor(pRateio,campovlrTotal);
    		$(linha).find("input[name*='valorCCusto']").val(parseFloat(valorCalculado).toFixed(2));
    		
    	}else if(pRateio>100.00){
			$(this).closest(".form-group").addClass("has-error");
			$(this).attr('placeholder','Percentual incorreto');
			$(this).val('');
		}	
    });
    $(this).find("input[name*='valorCCusto']").mask("#,##0.00", {reverse: true});
    $(this).find("input[name*='valorCCusto']").on('focusout',function(){
    	var campovlrTotal  = $('#ValTitulo');  
    	var valorVlrTotal  = getValorSemPontos(campovlrTotal.val());
    	var valor          = getValorSemPontos($(this).val());
    	console.log('Valor');
    	console.log($(this));
    	if(valor <= parseFloat(valorVlrTotal)){
    		var percentualCalculado = calcularPercentual(valor,campovlrTotal);
    		$(linha).find("input[name*='percentualCCusto']").val(parseFloat(percentualCalculado).toFixed(7));
       	}else if(valor > parseFloat(valorVlrTotal)){
			$(this).closest(".form-group").addClass("has-error");
			$(this).attr('placeholder','Valor incorreto');
			$(this).val('');
		}
    });
    $(this).find('.btZoomRatCCusto').click(function(){
		idcLinha = $(this).attr('id').split('___')[1];
		var empresa = $('#codEmpresa').val();
		var filial = $('#codFilial').val();
		var solicitante = $('#idSolic').val();
		console.log('botao');
		console.log($(this));
		openZoom("Centro de Custos", "ctgCentrodeCustos", "Codigo,Codigo,Desc,Descricao",
				[empresa,filial,solicitante]+",Codigo,Desc,nome,codUsr", "ccustocrat");
	});
});

$('#modalErroValorSomado').on('hidden.bs.modal',function(e){
	$(this).find('.modal-body').empty();
});

$('#btNovoRateioCentroCusto').on('click', function(event){
	console.log('Bind de evento on click novo rateio CCusto');
	if(validarTotalRateioCC('2')){
		var nroTRs    = $('#tableRateioCentroCusto > tbody').find('tr');//retorna na posi��o 0, a linha template paixFilho
	    var pRateio;
	    var lastTR    = $('#tableRateioCentroCusto').find('tr').last();
	    
	    $(lastTR).find("input[name*='cCentroCustoRat']").on('change',function(){
	    	if(validarCCustoInformados($(this))){
	    		$(this).closest(".form-group").addClass("has-error");
				$(this).attr('placeholder','Codigo incorreto');
				$(this).val('');
	    	}
	    });
	    $(lastTR).find("input[name*='percentualCCusto']").mask("000.0000000", {reverse: true});
	    $(lastTR).find("input[name*='percentualCCusto']").on('change',function(){
	    	var campovlrTotal  = $('#ValTitulo');    	
	    	pRateio = parseFloat($(this).val());
	    	if(pRateio <= 100.00){
	    		var valorCalculado = calculaValor(pRateio,campovlrTotal);
	    		$(lastTR).find("input[name*='valorCCusto']").val(parseFloat(valorCalculado).toFixed(2));
	    		
	    	}else if(pRateio>100.00){
				$(this).closest(".form-group").addClass("has-error");
				$(this).attr('placeholder','Percentual incorreto');
				$(this).val('');
			}	
	    });
	    $(lastTR).find("input[name*='valorCCusto']").mask("#,##0.00", {reverse: true});
	    $(lastTR).find("input[name*='valorCCusto']").on('change',function(){
	    	var campovlrTotal  = $('#ValTitulo');  
	    	var valorVlrTotal  = getValorSemPontos(campovlrTotal.val());
	    	var valor          = getValorSemPontos($(this).val());
	    	if(valor <= parseFloat(valorVlrTotal)){
	    		var percentualCalculado = calcularPercentual(valor,campovlrTotal);
	    		$(lastTR).find("input[name*='percentualCCusto']").val(parseFloat(percentualCalculado).toFixed(7));
	       	}else if(valor > parseFloat(valorVlrTotal)){
				$(this).closest(".form-group").addClass("has-error");
				$(this).attr('placeholder','Valor incorreto');
				$(this).val('');
			}
	    });
	    $(lastTR).find('.btZoomRatCCusto').click(function(){
			idcLinha = $(this).attr('id').split('___')[1];
			var empresa = $('#codEmpresa').val();
			var filial = $('#codFilial').val();
			var solicitante = $('#idSolic').val();
			openZoom("Centro de Custos", "acerCentroCusto",
			"CCENTROCUSTO,Codigo,CDESCRICAO,Descricao",
			"CCENTROCUSTO,CDESCRICAO", "ccustocrat");

			// openZoom("Centro de Custos", "ctgCentrodeCustos", "Codigo,Codigo,Desc,Descricao",
			// 		[empresa,filial,solicitante]+",Codigo,Desc,nome,codUsr", "ccustocrat");
		});
	}
	   
});
});/*<-- Final documentReady*/
function setDivReadOnly(ids){
	$.each(ids, function(key, value) {
		$("#"+value).find("input[type='text'],input[type='date']").attr("readonly", "readonly");
		$("#"+value).find("input[type='text'],input[type='date']").addClass("ReadOnly");
		$("#"+value).find("input[type='button']").hide();
		$("#"+value).find("img").hide();
		$("#"+value).find('.esconde').hide();
		$("#"+value).find('.desabilita').attr('disabled',true);
		$("#"+value).find('#adicionarLinha').hide();
	    $("#"+value).find("select").each(function(){
			var val = $(this).find("option[selected]").text();
			$(this).parent().append($("<input class='ReadOnly' readonly='readonly' value='"+val+"'/>"));
			$(this).hide();
		});
	});
}

