var inicio         = 4;
var aprovador      = 5;
var diretoria      = 91;
var finalizar     = 43;
var insere         = 26;
var notificaFin    = 50;
var verificarIntegracao = 64; 
var verificaNeg    = 32;
var anexos         = 37;
var avalPedido	   = 54;
var pagar	   = 77;
var idcLinha;
//seta data de vencimento minima
//var VencData = FLUIGC.calendar('#VencData', {language: 'pt'});
// VencData.setMinDate(getVencDataLim());

$(document).ready(function(){
	var view = $('#WKMode').val();
	var atividade = parseInt($('#campo_processo').val());
	$('#ErroCC').hide();
	$('#ErroForn').hide();
	$('#ErroNatur').hide();
	$('#ErroTipo').hide();
	$('#ErroVencData').hide();
	$('#ErroEmissData').hide();
	$('#msgProtheus').hide();
	$('#VencData').mask('99/99/9999');
	$('#EmissData').mask('99/99/9999');	
	$('#docNumTit').mask('999999999',{reverse:true}); 
	$('.maskValor').mask('#,##9.99',{reverse:true});
	$('#btZoomEmpresa').hide();
	$('#btZoomCC').hide();
	$('#btZoomFornecedor').hide();
	$('#btZoomTipo').hide();
	// $('#btZoomNatureza').hide();
	$('#btZoomCOrc').hide();
	$('#divnegativaGest').show();
	$('#gtImpressao').hide();
	$('#lembrete').hide();
	$('#ErroNro').hide();
	$('#ErroCOrc').hide();
	$('#dadosFiscais').hide();
	$('#supply').hide();
	$('#pagamento').hide();
	$('#diretoria').hide();
	
	$('#ErroRateioCC').hide();
	$('#erroRateioCC').hide();
	$('#escondeModais').hide();
	$('#rateiosCentrodeCusto').hide();
	if(view != "VIEW"){
		$('#codFilial').on('change',function(){
			$('#cCentroCusto').val('');
			$('#descCentroCusto').val('');
			$('#cContaOrc').val('');
			$('#descContaOrc').val('');
			$('#WKsuperior').val('');
			$('#aproverName').val('');
			$('#cCodForn').val('');
			$('#detailFornecedor').val('');
			$('#clojaForn').val('');
			$('#CodForn').val('');
			$('#detailFornecedor').val('');		
		});
		$('#cCentroCusto').on('change',function(){
			$('#cContaOrc').val('');
			$('#descContaOrc').val('');
		});


		switch(atividade){
		case inicio:
			$('#btZoomEmpresa').show();
			$('#btZoomCC').show();
			$('#btZoomFornecedor').show();
			$('#btZoomCOrc').show();
			$('#manager').hide();
			$('#supply').hide();
			$('#financeiro').hide();
			$('#lembrete').show();
			$('#btZoomNatureza').show();

			// $('#detalhesSolicitacao').hide();
			// $('[name="optTransaction"]').on('change',function(){
			// 	$('#detalhesSolicitacao').find('.form-control').each(function(key, value){
			// 		$(this).val('');
			// 	});
			// });

			// $('#optTransaction_1').on('click',function(){
			// 	// $('#detalhesSolicitacao').show();
			// 	$('#WKtipoOper').val('E');
			// });
			// $('#optTransaction_2').on('click',function(){
			// 	// $('#detalhesSolicitacao').show();
			// 	$('#WKtipoOper').val('C');
			// });
			// $('#optTransaction_3').on('click',function(){
			// 	// $('#detalhesSolicitacao').show();
			// 	$('#WKtipoOper').val('D');
			// });
			$('#docNumTit').on('focusout',function(){
				if($(this).val()==''){
					$(this).closest(".form-group").addClass("has-error");
				}else{
					var numTit = $(this).val();
					numTit = ajustInput(numTit);
					$(this).val(numTit);
					var cforn   = $('#cCodForn').val(),
					filial  = $('#codFilial').val(),
					cloja   = $('#clojaForn').val(),
					idUser  = $('#idSolic').val(),
					fields 	= [idUser, numTit, cforn, filial, cloja,"retorno"],
					constraints		= [],
					sortingFields	= [];
					
					var consultaNumFinDS = DatasetFactory.getDataset("ctgVerNumFin", fields, null, null); 
					if(consultaNumFinDS.values.length!=0){
						result = consultaNumFinDS.values[0].retorno;
					}
					switch(result){
					case 'S':
						$(this).val('');
						$(this).closest(".form-group").addClass("has-error");
						$('#ErroNro').show();
						break;
					case 'N':
						$(this).closest(".form-group").removeClass("has-error");
						$('#ErroNro').hide();
						break;
					}
				}
				
			});

			break;
		case finalizar:
			
			$('#fiscalAprov_sim').click(function(){
				$('#dadosFiscais').show();
			});	
			$('#fiscalAprov_nao').click(function(){
				$('#dadosFiscais').hide();
			});
			var docTipo = document.querySelector("[name=docTipo]");
			if(docTipo.value == "TAX"){
	
				$('#listaNFEs').show();	
			}
			
				$('#btZoomTipo').show();
				// $('#btZoomNatureza').show();
				if($('#rateioCC_sim').is(':checked')||$('#_rateioCC_sim').is(':checked')){
					$('#rateiosCentrodeCusto').show();
				}
				setDivReadOnly(["rateiosCentrodeCusto", "solicitante", "manager", "supply"]);
				break;
		case pagar:
			
			$('#fiscalAprov_sim').click(function(){
				$('#dadosFiscais').show();
			});	
			$('#fiscalAprov_nao').click(function(){
				$('#dadosFiscais').hide();
			});
			var docTipo = document.querySelector("[name=docTipo]");
			if(docTipo.value == "TAX"){
	
				$('#listaNFEs').show();	
			}
			
				$('#pagamento').show();
				// $('#btZoomNatureza').show();
				if($('#rateioCC_sim').is(':checked')||$('#_rateioCC_sim').is(':checked')){
					$('#rateiosCentrodeCusto').show();
				}
				setDivReadOnly(["rateiosCentrodeCusto", "solicitante", "manager", "financeiro"]);
				break;
		case notificaFin:

			$('#dadosFiscais').show();
			if($('#rateioCC_sim').is(':checked')||$('#_rateioCC_sim').is(':checked')){
				$('#rateiosCentrodeCusto').show();
			}
			break;
		case avalPedido:
			$('#manager').hide();
			$('#financeiro').hide();	
			
			
			if($('#rateioCC_sim').is(':checked')||$('#_rateioCC_sim').is(':checked')){
				$('#rateiosCentrodeCusto').show();
			}
			setDivReadOnly(["rateiosCentrodeCusto", "financeiro", "solicitante", "manager"]);
			break;
		case aprovador:
		exibeUltimosAprovs();
			$('#financeiro').hide();
			$('#listaNFEs').show();
			if($('#rateioCC_sim').is(':checked')||$('#_rateioCC_sim').is(':checked')){
				$('#rateiosCentrodeCusto').show();
			}
			setDivReadOnly(["rateiosCentrodeCusto", "financeiro", "solicitante", "supply", "manager"]);
			break;	
		case diretoria:
				$('#diretoria').show();
				$('#financeiro').hide();
				$('#manager').hide();
				if($('#rateioCC_sim').is(':checked')||$('#_rateioCC_sim').is(':checked')){
					$('#rateiosCentrodeCusto').show();
				}
				setDivReadOnly(["rateiosCentrodeCusto", "financeiro", "solicitante", "supply", "manager"]);
			break;		
		case verificaNeg:
				
			if($('#fiscalAprov_nao').is(':checked')||$('#MngrAprov_nao').is(':checked')){
				$('#btZoomEmpresa').show();
				$('#btZoomCC').show();
				$('#btZoomFornecedor').show();
				$('#btZoomCOrc').show();
				$('#supply').hide();
				$('#manager').hide();
				if($('#_MngrAprov_nao').is(':checked')){
					$('#manager').show();
				}
				if($('#_aprovmngrSupply_nao').is(':checked')){
					$('#supply').hide();
				}
				$('#financeiro').show();
				$('#lembrete').show();
				// $('#detalhesSolicitacao').hide();
				// $('[name="optTransaction"]').on('change',function(){
				// 	$('#detalhesSolicitacao').find('.form-control').each(function(key, value){
				// 		$(this).val('');
				// 	});
				// });

				$('#optTransaction_1').on('click',function(){
					// $('#detalhesSolicitacao').show();
					$('#WKtipoOper').val('E');
				});
				$('#optTransaction_2').on('click',function(){
					// $('#detalhesSolicitacao').show();
					$('#WKtipoOper').val('C');
				});
				$('#optTransaction_3').on('click',function(){
					// $('#detalhesSolicitacao').show();
					$('#WKtipoOper').val('D');
				});
			

				if($('#rateioCC_sim').is(':checked')||$('#_rateioCC_sim').is(':checked')){
					$('#rateiosCentrodeCusto').show();
				}								
				setDivReadOnly([ "financeiro", "supply", "manager"]);
			}else{	
				setDivReadOnly(["rateiosCentrodeCusto", "financeiro", "solicitante", "supply", "manager"]);
			}		
			break;
		case verificarIntegracao:
			setDivReadOnly(["rateiosCentrodeCusto", "financeiro", "solicitante", "supply", "manager"]);
			break;
		case anexos:
			if($('#rateioCC_sim').is(':checked')||$('#_rateioCC_sim').is(':checked')){
				$('#rateiosCentrodeCusto').show();
			}
			if($('#MngrAprov_nao').is(':checked')||$('#_MngrAprov_nao').is(':checked')){
				$('#divnegativaGest').show();
			}
			$('#msgProtheus').show();
			setDivReadOnly(["rateiosCentrodeCusto", "financeiro", "solicitante", "supply", "manager"]);

			$('#dadosFiscais').show();
			break;
		}
	}else{
		// if($('#rateioCC_sim').is(':checked')||$('#_rateioCC_sim').is(':checked')){
		// 	$('#rateiosCentrodeCusto').show();
		// }
		// if($('#optTransaction_1').is(':checked')||$('#_optTransaction_1').is(':checked')){
		// 	$('#detalhesSolicitacao').show();
		// }
		// if($('#optTransaction_2').is(':checked')||$('#_optTransaction_2').is(':checked')){
		// 	$('#detalhesSolicitacao').show();
		// }
		// if($('#optTransaction_3').is(':checked')||$('#_optTransaction_3').is(':checked')){
		// 	$('#detalhesSolicitacao').show();
		// }
		// if($('#fiscalAprov_nao').is(':checked')||$('#_fiscalAprov_nao').is(':checked')){
		// 	$('#divnegativaFiscal').show();
		// }
		// if($('#fiscalAprov_sim').is(':checked')||$('#_fiscalAprov_sim').is(':checked')){
		// 	$('#dadosFiscais').show();
		// }
		// if($('#_MngrAprov_nao').is(':checked')){
		// 	$('#divnegativaGest').show();
		// }

		$('#dadosFiscais').show();
		$('#btZoomEmpresa').hide();
		$('#btZoomCC').hide();
		$('#btZoomFornecedor').hide();
		$('#btZoomTipo').hide();
		$('#btZoomNatureza').hide();
		$('#BTFormPagto').hide();
		$('#btZoomCOrc').hide();
		$('#msgProtheus').show();
		$('#gtImpressao').show();
		setDivReadOnly(["rateiosCentrodeCusto", "financeiro", "solicitante", "supply", "manager"]);
	}
	
	$('#rateioCC_sim').click(function(){
		if($('#cEmpresa').val()==''||$('#cFilial').val()==''||$('#ValTitulo').val()==''){
			$('#erroRateioCC').show();
			$('#rateioCC_nao').click();
		}else{
			$('#erroRateioCC').hide();
			$('#rateiosCentrodeCusto').show();
		}
	});
	$('#rateioCC_nao').click(function(){
		$('#rateiosCentrodeCusto').hide();
	});
	$('#MngrAprov_sim').click(function(){
		$('#divnegativaGest').show();
	});	
	$('#MngrAprov_nao').click(function(){
		$('#divnegativaGest').show();
	});	
	$('#btZoomEmpresa').click(function(){
		$('#CodForn').val('');
		$('#clojaForn').val('');
		$('#detailFornecedor').val('');
		$('#cCodForn').val('');
		$('#cCentroCusto').val('');
		$('#aproverName').val('');
		var solicitante = $('#idSolic').val();
		openZoom("Empresas", "ctgEmpresaFilial", "cnpj,Codigo,codigo,Descricao,filial,Codigo,empresa,Descricao,descfilial,Descricao",
				[solicitante]+ ",cnpj,codigo,filial,empresa,descfilial", "empresa");
	});
	$('#btZoomCC').click(function(){
		// if($('#cEmpresa').val()==''||$('#cFilial').val()==''){
		// 	$('#ErroCC').show();
		// }else{
			$('#ErroCC').hide();
			// var empresa = $('#codEmpresa').val();
			// var filial = $('#codFilial').val();
			// var solicitante = $('#idSolic').val();
			openZoom("Centro de Custos", "acerCentroCusto", "CCENTROCUSTO,Codigo,CDESCRICAO,Descricao","CCENTROCUSTO,CDESCRICAO", "ccusto");
		// }
	});
	$('#btZoomCOrc').click(function(){
		if($('#cCentroCusto').val()==''){
			$('#ErroCOrc').show();
		}else{
			$('#ErroCOrc').hide();
			// var empresa = $('#codEmpresa').val();
			// var filial = $('#codFilial').val();
			// var solicitante = $('#idSolic').val();
			var cCentroCusto = $('#cCentroCusto').val();
			openZoom("Contas Orcamentos", "tipoDespesa",
					"codigo,Codigo,descricao,Descricao",
					"codigo,descricao", "cCOrcamento", ["ccgc",cCentroCusto]);
		}
	});
	$('#btZoomFornecedor').click(function(){
		// if($('#cEmpresa').val()==''||$('#cFilial').val()==''){
		// 	$('#ErroForn').show();
		// }else{
			$('#ErroForn').hide();
			// var empresa = $('#codEmpresa').val();
			// var filial = $('#codFilial').val();
			var cForn = $('#CodForn').val();
			if(cForn.length >= 3){
				openZoom("Fornecedores", "acerFornecedores",
				"CCODIGO,Codigo,CNOME,Nome,CCGC,CpfCnpj",
				"CCODIGO,CNOME,CCGC", "Fornecedores",
				["CCGC",cForn]);
			}else{
				FLUIGC.toast({title: 'Aviso', message: 'Informe ao menos 3 digitos do nome do Fornecedor desejado.', type: 'warning'});
			}
			
		// }
	});
	$('#btZoomTipo').click(function(){
		if($('#cEmpresa').val()==''||$('#cFilial').val()==''){
			$('#ErroTipo').show();
		}else{
			$('#ErroTipo').hide();
			var empresa = $('#codEmpresa').val();
			var filial = $('#codFilial').val();
			var solicitante = $('#idSolic').val();
			openZoom("Tipos", "ctgTipoTitulo", "Codigo,Codigo,Desc,Descricao", 
					[empresa,filial,solicitante]+",Codigo,Desc", "titulos");
		}
	});
	$('#btZoomNatureza').click(function(){
		
			openZoom("Naturezas", "acerNatureza", 
			"CNATUREZA,Codigo,CDESCRICAO,Descricao",
			"CNATUREZA,CDESCRICAO", "natureza");
	});
	$('#BTFormPagto').click(function(){
			// var cCusto   = $('#cCentroCusto').val();
			openZoom("Forma de Pagamento", "acerFormaPagamento", 
			"CFORMAPGTO,Codigo,CDESCRICAO,Descricao",
			"CFORMAPGTO,CDESCRICAO", "FormPagto");
		
		
	});

	
	
		
});
//abre zoom de conta no rateio
function zoomCOrcRat(e){

	var linha = indexFromId(e.id);
	console.log(linha);
	var cc = document.querySelector("#cCentroCustoRat___"+linha).value;
	idcLinha = linha;
	console.log(cc);
	if(cc){
		console.log("abre zzom");
		openZoom("Contas Orcamentos", "tipoDespesa",
					"codigo,Codigo,descricao,Descricao",
					"codigo,descricao", "cCOrcRat", ["ccgc",cc]);
	}else{
		FLUIGC.toast({title: 'Aviso', message: 'Informe o Centro de custo..', type: 'warning'});
	}			
	

 
}

function openZoom(title, dataset, fields, resultFields, type, filters){
	openZoomWindowParam(title, dataset, fields, resultFields, type, filters);
}
/**
 * @Overload de openZoom
 * Abre janela de zoom.
 * + @param windowParams: Par�metros da janela de zoom.
 */
function openZoomWindowParam(title, dataset, fields, resultFields, type, filters){	
	var windowParams = "status , scrollbars=no ,width=800, height=350 , top=0 , left=0";
	var zoomURL = "/webdesk/zoom.jsp?datasetId="+dataset+"&dataFields="+escape(fields)+"&resultFields="+resultFields+"&type="+type+"&title="+title + (filters?"&filterValues=" + filters:"");
	window.open(zoomURL, "zoom", windowParams);
}
function mascara(o,f){
    v_obj=o;
    v_fun=f;
    setTimeout("execmascara()",1);
}
function setSelectedZoomItem(selectedItem) {
   	if(selectedItem.type=='empresa'){
   		$('#codEmpresa').val(selectedItem.codigo);
		$('#codFilial').val(selectedItem.filial).change();
		$("#cEmpresa").val(selectedItem.empresa);
		$("#cFilial").val(selectedItem.filial+' - '+selectedItem.descfilial);
	}
   	if(selectedItem.type == "cCOrcamento"){
		$("#cContaOrc").val(selectedItem.codigo);
		$("#descContaOrc").val(selectedItem.codigo+" - "+selectedItem.descricao);
    }
	if(selectedItem.type=='ccusto'){
		$("#cCentroCusto").val(selectedItem.CCENTROCUSTO).change();
		$("#descCentroCusto").val(selectedItem.CCENTROCUSTO+" - "+selectedItem.CDESCRICAO);
		// console.log('CC: '+selectedItem.nome +' '+selectedItem.codUsr);
		// $("#WKsuperior").val(selectedItem.codUsr);
		// $("#aproverName").val(selectedItem.nome);
	}
	if(selectedItem.type == "Fornecedores"){ 
		$("#cCodForn").val(selectedItem.CCODIGO);
		$("#CodForn").val(selectedItem.CCODIGO+" - "+selectedItem.CNOME);
		$("#clojaForn").val(selectedItem.CCODIGO.substring(6));
		$("#cCgcForn").val(selectedItem.CCGC);
		$("#detailFornecedor").val("CNPJ/CPF: "+selectedItem.CCGC +" - Loja: "+selectedItem.CCODIGO.substring(6));
    }
	if(selectedItem.type=='titulos'){
		$("#TipoTitulo").val(selectedItem.Codigo);
	}
	if(selectedItem.type == "natureza"){
		$("#cNatureza").val(selectedItem.CNATUREZA);
		$("#descNatureza").val(selectedItem.CNATUREZA+" - "+selectedItem.CDESCRICAO);
    }
	if(selectedItem.type == "ccustocrat"){
		// CCENTROCUSTO,CDESCRICAO
		$("#cCentroCustoRat___"+idcLinha).val(selectedItem.CCENTROCUSTO).change();
	}
	if(selectedItem.type == "cCOrcRat"){
		// CCENTROCUSTO,CDESCRICAO
		$("#cConOrcRat___"+idcLinha).val(selectedItem.codigo);
	}
	if(selectedItem.type == "FormPagto"){
		// CCENTROCUSTO,CDESCRICAO
		$("#cFormPagto").val(selectedItem.CFORMAPGTO);
		$("#descFormPagto").val(selectedItem.CFORMAPGTO+" - "+selectedItem.CDESCRICAO);
	}
	


}
function ajustInput(str){
	var adicionar = 9 - str.length;
	for (var i = 0; i < adicionar; i++) str = '0' + str;
	return str;
}
function validaData(campo) {
	var date=campo.value;
	var ardt=new Array;
	var ExpReg=new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
	ardt=date.split("/");
	erro=false;
	if(date == "__/__/____"||date==''){
		erro=false;
	}
	else if ( date.search(ExpReg)==-1){
		erro = true;
		}
	else if (((ardt[1]==4)||(ardt[1]==6)||(ardt[1]==9)||(ardt[1]==11))&&(ardt[0]>30))
		erro = true;
	else if ( ardt[1]==2) {
		if ((ardt[0]>28)&&((ardt[2]%4)!=0))
			erro = true;
		if ((ardt[0]>29)&&((ardt[2]%4)==0))
			erro = true;
	}
	if (erro) {
		if(!(date == "__/__/____"||date=='')){
			alert("" + campo.value + " i18n.translate('erroData')!!!");
			campo.value = "";
			campo.focus();
			return false;
		}
	}else{
		validaDiaHoje(campo);
	}
	return true;
}
function validaDiaHoje(elm){
	if(elm.id=='VencData'){
		var data = elm.value.split('/');
		var dataEmiss = $('#EmissData').val();
		
		data = new Date(data[2],data[1]-1,data[0]);
		$('#Erro'+elm.id).hide();
		if(data< new Date(2010,11,1)){
			$('#Erro'+elm.id).show();
			elm.value='';
			elm.focus();
		}	
		if(!(dataEmiss == ''||dataEmiss=='__/__/____')){
			dataEmiss = dataEmiss.split('/');
			if(data < new Date(dataEmiss[2],dataEmiss[1]-1,dataEmiss[0])){
				$('#Erro'+elm.id).show();
				elm.value='';
				elm.focus();
			}			
		}
	}	
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value);
}
function mvalor(v){
    v=v.replace(/\D/g,"");//Remove tudo o que n�o � d�gito
    v=v.replace(/(\d)(\d{8})$/,"$1,$2");//coloca o ,dos milh�es
    v=v.replace(/(\d)(\d{8})$/,"$1,$2");//coloca o ,dos milh�es
    v=v.replace(/(\d)(\d{5})$/,"$1,$2");//coloca o , dos milhares 
    v=v.replace(/(\d)(\d{2})$/,"$1.$2");//coloca a .antes dos 2 �ltimos d�gitos
    return ('R$ ' + v);
}
function mpercentual(v){
    v=v.replace(/\D/g,"");//Remove tudo o que n�o � d�gito
    v=v.replace(/(\d)(\d{2})$/,"$1.$2");//coloca a .antes dos 2 �ltimos d�gitos
    return (v);
}
function soNumeros(v){
    return v.replace(/\D/g,"");
}

function exibeUltimosAprovs(){
	//busca fornecedor selecionado
	var forn = document.querySelector("#CodForn");
	var fornVal = forn.value;
	var cooinput = document.querySelector("#cContaOrc");
	var ccoVal = cooinput.value;
	// busca pagamento anteriores com o mesmo fornecedor
	var fornRes = getPagForn(fornVal,ccoVal);
	fornRes.sort(sortSol);
	fornRes = fornRes.slice(fornRes.length - 4);
	//adicinar intes a tabela de pagamentos anteriores
	populaPGAnt(fornRes);
	//exibe div
	var div = document.querySelector("#accordion");
	div.style.display = "block";
}
//pega pagamentos anteriores de um fornecedor
function getPagForn(forn,cco){
	var c1 = DatasetFactory.createConstraint('CodForn', forn, forn, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('chaveInt', '', '', ConstraintType.MUST_NOT);
	var c3 = DatasetFactory.createConstraint('cContaOrc', cco, cco, ConstraintType.MUST);
	var dsPagAnt = DatasetFactory.getDataset('form_pagamentos_fornecedores', null, new Array(c1,c3), null);
	return dsPagAnt.values;
}
//adiciona intes a tabela de pagamentos anteriores
function populaPGAnt(ds){
	var tb = document.querySelector("#tbPagAnt");
	var tbBody = document.querySelector("#tbPABody");
	var nrSolic = document.querySelector("#NrSolic");

	ds.forEach(function(e){
		if(e['NrSolic'] && e['NrSolic'] != nrSolic.value){
			tbBody.appendChild(newTRpa(e));
		}
	});
	if(!ds.length){
		tbBody.appendChild(emptyTr());		
	}
}

//cria tr
function newTRpa(pa){
	var nTr = document.createElement('tr');  
    nTr.appendChild(newTd(pa['NrSolic'] != null ? pa['NrSolic']  : '-'));
    nTr.appendChild(newTd(pa['DtSolic'] != null ? pa['DtSolic']  : '-'));
    nTr.appendChild(newTd(pa['ValTitulo'] != null ? pa['ValTitulo']  : '-'));	
    return nTr;
}
//cria td element
function newTd(text){
    var nTD = document.createElement('td');
    nTD.innerHTML = text;
    return nTD;
}
//cria linha de tabela vazia
function emptyTr(){
	var nTr = document.createElement('tr');  
	var td = newTd("Nenhum pagamento anterior.");
	td.colSpan = 3;
	td.style.textAlign = 'center';
    nTr.appendChild(td);
    return nTr;
		
}

//ordenda array de pagamentos anteriores
function sortSol(a, b) {
	if (a["NrSolic"].value < b["NrSolic"].value) return -1;
	if (a["NrSolic"].value > b["NrSolic"].value) return 1;
	return 0;
  }


  //retorna index do id paiiflho passado
var indexFromId= function(id){
	return semCaractere(id.substring(id.length - 3),'_');
}
//remove toda ocorrencia do caractere passado
var semCaractere =  function(valor, c){
	while(valor.indexOf(c) >= 0){
		valor = valor.replace(c,'');
	}
	return valor;
}

  