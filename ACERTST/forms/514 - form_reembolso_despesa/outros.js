var camposObrigatorios = ['nome','cpf','departamento','banco','agencia','conta','centro_custo','finalidade','reais'];
var nomeCampos = [];
nomeCampos['nome'] = "Nome";
nomeCampos['cpf'] = "CPF";
nomeCampos['departamento'] = "Deptº";
nomeCampos['banco'] = "Banco";
nomeCampos['agencia'] = "Agencia";
nomeCampos['conta'] = "Conta";
nomeCampos['centro_custo'] = "Centro de custo";
nomeCampos['finalidade'] = "Finalidade da viagem/visita";
nomeCampos['reais'] = " Valor de adiantamento : R$ ou US$";
nomeCampos['despdata'] = "Data";
nomeCampos['desptipo'] = "Tipo de Despesa	";
nomeCampos['despctacontabil'] = "Cta. Contábil";
nomeCampos['despcliente'] = "Cliente";
nomeCampos['desjustificativa'] = "Justificativa";
nomeCampos['despvalorporkm'] = "R$/KM";
nomeCampos['despvalor'] = "Valor $";
nomeCampos['desptaxa'] = "Taxa Câmbio";
nomeCampos['desptotal'] = "Total R$";
nomeCampos['despComprovName'] = "Comprovante da despesa";
//nomeCampos['dolares'] = "US$";

var camposPaiFilho = ['despdata','desptipo','despctacontabil','despcliente','desjustificativa','despvalorporkm','desptotal'];//'despvalor'

	$(document).ready(function(){
		//define campos obrigatorios
		//valida cpf quando acaba de preencher
		$('#cpf').on('focusout',function(){
			var cpf = $(this).val(),
				ok  = false;

			ok = validaCPF(cpf);
			if(!ok){
				FLUIGC.toast({title: 'CPF invalido:', message: 'Por favor, verifique se digitou corretamente o CPF.', type: 'warning'});
				$(this).closest(".form-group").addClass("has-error");
				//$(this).addClass("has-error");
				$('#banco').val('');
				$('#agencia').val('');
				$('#conta').val('');
				$('#centro_custo').val('');
				$('#nome').val('');
				$('#departamento').val('');

				$('#banco').attr('readonly',false);
				$('#agencia').attr('readonly',false);
				$('#conta').attr('readonly',false);
				$('#centro_custo').attr('readonly',false);
				$('#nome').attr('readonly',false);
				$('#departamento').attr('readonly',false);
			}else{
				$(this).closest(".form-group").removeClass("has-error");
				buscaDados(cpf);
			}

		});

	});

var buscaDados = function(param){
	param = semCaractere(semCaractere(param,'.'),'-');
	console.log(param);
	var c1 = DatasetFactory.createConstraint("ccgc", param, param, ConstraintType.MUST);
	var cons = new Array(c1);
	var dataset = DatasetFactory.getDataset("dsFuncionario", null, cons, null);

	var fun = dataset.values[0];
	if(fun['CAGENCIA'].toUpperCase() !=  'ERRO' && fun['CAGENCIA'].trim() != ''){
		$('#banco').val(fun['CBANCO']);
		$('#agencia').val(fun['CAGENCIA']);
		$('#conta').val(fun['CCONTA']);
		$('#nome').val(fun['CNOME']);
		$('#departamento').val(fun['CDESCCUSTO']);
		$('#centro_custo').val(fun['CCCUSTO']);


		$('#banco').attr('readonly',true);
		$('#agencia').attr('readonly',true);
		$('#conta').attr('readonly',true);
		$('#centro_custo').attr('readonly',true);
		$('#nome').attr('readonly',true);
		$('#departamento').attr('readonly',true);
	}else{
		FLUIGC.toast({title: 'Dados:', message: 'Não foi possivel encontrar os dados bancarios com o CPF digitado.', type: 'warning'});
		$('#banco').val('');
		$('#agencia').val('');
		$('#conta').val('');
		$('#centro_custo').val('');
		$('#nome').val('');
		$('#departamento').val(fun['CDESCCUSTO']);

		$('#banco').attr('readonly',false);
		$('#agencia').attr('readonly',false);
		$('#conta').attr('readonly',false);
		$('#centro_custo').attr('readonly',false);
		$('#nome').attr('readonly',false);
		$('#departamento').attr('readonly',false);

	}

	/*for (var i = 0; i < dataset.values.length; i++) {
		console.log(dataset.values[i]['teste'] + ' - ' + dataset.values[i]['descricao'] )
	}*/
}


//Verifica id do campo
var verificaCampo =	function (valor,nome) {
	var id = $(valor).attr('id');
	var index = semCaractere(id.substring(id.length - 3),'_');
	var idconta = '#'+nome+'___'+index;
	return idconta;
}

//retorna numero sem nenhuma virgula
var semVirgulas =  function(valor){
	while(valor.indexOf(',') >= 0){
		valor = valor.replace(',','');
	}
	return valor;
}
//remove toda ocorrencia do caractere passado
var semCaractere =  function(valor, c){
	while(valor.indexOf(c) >= 0){
		valor = valor.replace(c,'');
	}
	return valor;
}


//Multiplca campo
var multiplicaCampo = function(valor,multiplicador,resultado,classe){
	//pega id do campo passado como valor
	var campo = verificaCampo(valor, multiplicador);
	//pega id do campo passado como resultado/destino
	var campo_total = verificaCampo(valor, resultado);
	//verifica se eh conta de kilometragem
	var multiplicadorKM = verificaKM(valor);
	valor = parseFloat(semVirgulas($(valor).val()));
	var n1 = semVirgulas($(campo).val());
	if(!valor){
		valor = 0;
	}

	if (n1 == 0 || n1 == '' || n1 == null  || isNaN(n1)) {
		n1 = 1;
	}
	var mult = (n1 * valor) * multiplicadorKM;
	$(campo_total).val(mult.toFixed(2));
	aplicaMasks();
}
function calcTotalGeral(){
	somatoriaFunc('.desptotal','#total1');
}

function calcValDesp(element){
	['despvalorporkm', 'desptaxa','desptotal'];
	//pega index da linha
	var i = indexFromId(element.attributes.id.value);
	var valor = getFloatInputVal('despvalorporkm___'+i);
	var tx = getFloatInputVal('desptaxa___'+i,1);
	var mulKM = verificaKM(element);
	var total = 0;
	total  = (valor * tx) * mulKM;
	var despTotal = document.querySelector("#desptotal___"+i);
	despTotal.value = total.toFixed(2);
	if(element.value.trim() != "" && mulKM == 1){
		element.value = parseFloat(semCaractere(element.value,',')).toFixed(2);
	}

	calcTotalGeral();
	aplicaMasks();
}


function getFloatInputVal(id, defVal){
	var ret = 0;
	var input = document.querySelector('#'+id);
	var sVal =  semCaractere(input.value,',');
	var fVal = parseFloat(sVal);
	if(fVal){
		ret = fVal;
	}else if(defVal){
		ret = defVal
	}
	return ret;
}


//verifica se o canta contabil selecionada na despesa é KM, se for retorna o preco pago por km para alterar o final
var verificaKM = function(el){
		var index = indexFromId($(el).attr('id'));
		var ccontaSelval = $('#despctacontabil___'+index).val();
		var contasKM = ['314520024', '314020024', '315420024', '315020024', '315720024','313020024' ];
		//314520024 / 314520024 /
		//314020024
		var multiplicadorKM = 1;
		for (var i = 0; i < contasKM.length; i++) {
			var c = contasKM[i];
			if (ccontaSelval == c) {
				multiplicadorKM = 0.85;
			}
		}
		return multiplicadorKM;

}


//Realiza a soma total de umd determinado campo
var linhaTabela = function(campo){
	var tamanho = $("#tabela tbody tr").length;
	var array = $(campo).toArray();
	var somatoria = 0.0;
	for (var i = 1; i < array.length; i++) {
		var thisVal = $(array[i]).val();
		//soma apenas campos preenchidos
		if(thisVal.trim() != ""){
			var valor = parseFloat(semVirgulas(thisVal));
			somatoria = somatoria+valor;
			console.log(somatoria);
		}

	}
	return somatoria;
	//return valor;
}


//Preenche campo com somatoria
var somatoriaFunc = function(campo,id){
	var somatoria = linhaTabela(campo);
	//$(id).empty();
	$(id).val(somatoria.toFixed(2));
	aplicaMasks();

}

//Preenche campo com a diferença do adiantamento
var somaComMenosDolar = function(campo,id,campodolar){
	var diferenca = 0;
	var somatoria = linhaTabela(campo);

	var dinheiro = semVirgulas($(campodolar).val());

	if ((dinheiro == 0 ) || (dinheiro == "" ) || (dinheiro == null )) {
		diferenca = somatoria;
	}
	else{
		diferenca = parseFloat(somatoria) - parseFloat(dinheiro);
	}

	//$(id).empty();
	$(id).val(diferenca.toFixed(2));
	aplicaMasks();

}

//adiciona despesa
var addDisp = function(filho){
	var i = wdkAddChild(filho);
	console.log(i);
	var lbAnexo = document.querySelector("#anexo___"+i);
	lbAnexo.textContent += "#" + i;
 	var inputs = $("[mask]");
    MaskEvent.initMask(inputs);
		FLUIGC.calendar('.despdata');
	reloadZoomFilterValues('desptipo___'+i, 'ccgc,'+$('#centro_custo').val());
	
}

// remove despesa
var delDesp = function(el){
	fnWdkRemoveChild(el);
	somatoriaFunc('.ttresul','#total1');
	somatoriaFunc('.ttresul','#total2');
	somatoriaFunc('.valor','#total3')
}
//retorna index do id paiiflho passado
var indexFromId= function(id){
  return semCaractere(id.substring(id.length - 3),'_');
}

 //beforeMovementOptions
	var beforeSendValidate = function(numState) {
		console.log('before');
		calcTotalGeral();
		validaForm();//valida cabeçalho
		validaPaiFilho();//valida despesas pai filho
		setRHExiste();
		//coloca index das despesas no despIndexes
		var despIndex = [];
	$(".despesa").each(function(i,e){
		var idEl = $(e).attr('id');
		// var index = idEl.substring('desptipo___'.length);
		var index = indexFromId(idEl);
		if(isFinite(index) && index.trim() != ''){
			despIndex.push(index);
		}
	});
	$('#despIndexes').val(despIndex.join());
	//habilita radio para não perder valores
	$(':radio').attr('disabled',false);


	if(numState == 5 || numState == 45 || numState == 46){

		validaAprovacao();
	}
	//vlaida aprov rh
	if(numState == 90){
		var apvRH = $('input[name=aprovRH]:checked').val();
		if(!apvRH){
			var txtAlert = "Selecione a opção de aprovação.";
			throw txtAlert;
		}
	}

		var valor = $('#total1').val();
		valor = semCaractere(valor,',');
		$('#total1').val(valor);
	}

// define aprovador e coloca no campo aprovador para proxima atividade
	var defineAprovador = function(){
		var uAtualID = $("#nickname").val();
		var aprovador = buscaAprovador(uAtualID);
		//se aprovador nao for encontrado tarefa é enviada para usuario admin
		if(aprovador != 0){
			$("#aprovador").val(aprovador);
		}else{
			$("#aprovador").val('admin');
		}
	}

	

	var validaAprovacao = function(){
			var valor = $('#total1').val();
			while(valor.indexOf(',') >= 0){
					valor = valor.replace(',','');
			}
			//$('input[name=aprovGestor]:checked').val();
			var apvGestor = $('input[name=aprovGestor]:checked').val();
			var apvGermano = $('input[name=aprovGermano]:checked').val();
			console.log(valor);
			if(valor >= 5000){

				var ap = (apvGestor == 'sim' && apvGermano == 'sim') ? '1': '0';
				$('#aprovacao').val(ap);
			}else{
				var ap;// = (apvGestor == 'sim') ? '1': '0';
				switch (apvGestor) {
					case 'sim':
						ap= '1';
						break;
					case 'corrigir':
						ap= '2';
						break;
					case 'nao':
						ap= '0';
						break;
					default:
						break;
				}
				$('#aprovacao').val(ap);
			}
			console.log($('#aprovacao').val());
	}

	var validaForm = function() {
			var obrigatorios = [];
		var txtAlert = "Existem campos com erros ou que não foram preenchidos:";
		  /* Limpa campos que estavam com erro da validacao anterior */
		  $(".has-error").removeClass("has-error");
		  //valida todos os campos obrigatorios
		 for (var i = 0; i < camposObrigatorios.length; i++) {
		 	var campo = camposObrigatorios[i];
				var el = $('#'+campo);
					if(campo == 'cpf'){
						//valida cpf
						var cpfok = validaCPF($(el).val());
						if(!cpfok){
							obrigatorios.push(campo);
							txtAlert += "\n" + nomeCampos[campo];
						}
					}else if(campo == 'reais'){
						//verifica campos de reais ou dolar para verificar se o valor do adiantamento foi preenchido
						if($('#reais').val().trim() == '' && $('#dolares').val().trim() == ''){
							txtAlert += "\n" + nomeCampos[campo];
							obrigatorios.push(campo);
							obrigatorios.push('dolares');
						}
					}else{
						//verifica preenchimento do restante dos cmpos
						var val = validaInput(el);
						if(val[0]){
							txtAlert += "\n" + nomeCampos[val[1]];
							obrigatorios.push(val[1]);

						}
					}
			}
		  //se existirem campos obrigatorios nÃ£o preenchidos
			//console.log(obrigatorios);
		  if(obrigatorios.length > 0 ){
				for (var i = 0; i < obrigatorios.length; i++) {
					var id = obrigatorios[i];
					$('#'+id).closest(".form-group").addClass("has-error");
				}
		    throw txtAlert;
		  }
}

var validaPaiFilho = function(){
			$(".linha").removeClass("has-error");
			var txtDespErrors = "Existem campos de despesas que não foram preenchido:";
			var erro = false;
			$('.despdata').each(function(index) {
				//var el = $('.'+campo);
				var elId = $(this).attr('id');
				var elIndex = semCaractere(elId.substring(elId.length - 3),'_');
				//console.log(elId + ' - ' + elIndex + ' - ' + isFinite(elIndex));
				if(isFinite(elIndex)){
					for (var i = 0; i < camposPaiFilho.length; i++) {
						var campo = camposPaiFilho[i];
						var valor = $('#'+campo+"___"+elIndex).val();
						if(campo == 'despvalor'){
								var cc = $('#despctacontabil___'+elIndex).val()
								if ( cc == '314020023' || cc == '314020024'){
									if(valor.trim() == ''){
										txtDespErrors += '\n ' + nomeCampos[campo];
										erro = true;
									}
								}
						}else if(campo == 'despcliente'){
							var element = document.querySelector("#despcliente___"+elIndex);
							if(element.value.trim() == "Erro" || element.value.trim() == "" ){
								txtDespErrors += '\n ' + nomeCampos[campo];
								erro = true;
							}
							
						}else{
							if(valor.trim() == ''){
								txtDespErrors += '\n ' + nomeCampos[campo];
								erro = true;
							}
						}
					}
					if (erro) {
						$('#'+campo+"___"+elIndex).closest(".linha").addClass("has-error");
						throw txtDespErrors;
					}


				}
			});



}



var descComprovClick = function(el){
	//desptipo
	var tr = el.parentElement.parentElement.parentElement;
	var desp = tr.querySelector('.desptipo');
	var id = $(desp).attr('id');
	//var i = id.substring('despComprov___'.length);
	var i = indexFromId(id);

	var desc = $('#desptipo___'+i).val();
	var cContabil = $('#despctacontabil___'+i).val();
	//permite envio apenas após preenchimento de tipo de despesa
	if(desc.trim() != '' && cContabil.trim() != ''){
		var compName =  i  + ' - ' + desc + ' - ' + cContabil;
		JSInterface.showCamera(compName);
		$("#despComprovName___"+i).val(compName);
	}else{
		FLUIGC.toast({title: 'Por favor:', message: 'Selecione o Tipo de despesa antes de anexar o comprovante.', type: 'warning'});

		/*FLUIGC.modal({
        title: 'Meu Título',
        content: 'Conteúdo',
        id: 'fluig-modal',
        actions: [{
            'label': 'Save',
            'bind': 'data-open-modal',
        },{
            'label': 'Cancel',
            'autoClose': true
        }]
    });*/
	}

}

var setRHExiste = function(){
	var aContasEduca = ['314010016','313010016','315010016','315710016','315410016','314510016'];
	var passaRH = false;
	var campo = "despctacontabil";
	var list = document.querySelectorAll("."+campo);
	list.forEach(function(e,i){
		// console.log('index:'+i);
		// console.log(e.value);
		if(e.value){
			if(aContasEduca.includes(e.value.trim())){
				passaRH = true;
			}
		}
	});

	var cApvRH = document.querySelector("#cAprovarRH");
	if (passaRH){
		cApvRH.value = "1";
	}else{
		cApvRH.value = "0";
	}

}
var setRHVis = function(){
	var aContasEduca = ['314010016','313010016','315010016','315710016','315410016','314510016'];
	var campo = "despctacontabil";
	var list = document.querySelectorAll("."+campo);
	list.forEach(function(e,i){
		if(e.value){
			if(!aContasEduca.includes(e.value.trim())){
				var tr = e.parentElement.parentElement;
				tr.style.display = "none";
				// console.log(tr);
				
			}
		}
	});
}

//----------------validacao---------------------------------//
var  validaInput = function(el){
    var ok = false;
    var nome = $(el).prop("name");
    var tipo = $(el).prop("type");

    if(tipo == "checkbox"){
      ok =  validaCheckBox(el);
    }else if(tipo =="radio"){
      ok = validaRadio(el);
    }else{
      ok = ($(el).val().trim() == "");
    }

    var r = [ok , nome ];
    return r;

}
var  validaRadio = function(el){
    var checks = $("[name='"+ $(el).prop("name") + "']:checked");
    return (checks.length == 0 );
  }

var  validaCheckBox = function(el){
    return $(el).checked;
}

//----------------validacao---------------------------------//
//----------------zoom---------------------------------//

	var zoomDesp = 	function(el){
			//	console.log('abacaxi');
			var id = $(el).attr('id');
			var i = id.substring('btZoomDespesa___'.length);
			var ccgc = $('#centro_custo').val();
			var fil = $('#desptipo___'+i).val();
			if(ccgc.trim() != ''){
				//openZoom(title, dataset, fields, resultFields, type, filters)
				openZoom("Tipo despesa", "tipoDespesa", "codigo,Codigo,descricao,Descricao","codigo,descricao", ['desptipo', $(el).attr('id')] , ['ccgc',ccgc]);

			}else{
				FLUIGC.toast({title: 'Tipo Despesa:', message: 'O Centro de Custo deve estar preenchido para a busca de Contas contabeis.', type: 'warning'});
				return 0;
			}
}

	var zoomCli = function(el){


		//	console.log('abacaxi');
		var id = $(el).attr('id');
		var i = id.substring('btZoomCliente___'.length);
		var fil = $('#despclientedesc___'+i).val();

		if(fil.trim() == '' || fil.length < 3){
			FLUIGC.toast({title: 'Busca:', message: 'Por favor, Digite ao menos as 3 primeiras letrar no nome fantasia do cliente.', type: 'warning'});
			return 0;
		}

		//openZoom(title, dataset, fields, resultFields, type, filters)
		openZoom("Cliente", "dsCliente", "CCODIGO,Codigo,CNOME,Nome,CCGC,CGC","CCODIGO,CNOME" , ['cliente', i] , ['nome', fil ]);
	}



//abertura de zoom
function openZoom(title, dataset, fields, resultFields, type, filters){
	openZoomWindowParam(title, dataset, fields, resultFields, type, filters);
}
/**
 * @Overload de openZoom
 * Abre janela de zoom.
 * + @param windowParams: Parâmetros da janela de zoom.
 */
function openZoomWindowParam(title, dataset, fields, resultFields, type, filters){
	var windowParams = "status , scrollbars=no ,width=800, height=350 , top=0 , left=0";
	var zoomURL = "/webdesk/zoom.jsp?datasetId="+dataset+"&dataFields="+escape(fields)+"&resultFields="+resultFields+"&type="+type+"&title="+title + (filters?"&filterValues=" + filters:"");
	window.open(zoomURL, "zoom", windowParams);
}
//função que pega retorno do item selecionado no zoom
function setSelectedZoomItem(selectedItem) {
	console.log(selectedItem);
 	var arrayTipo;
	var op;
	// = selectedItem.type != undefined ?: selectedItem.inputName;

	if(selectedItem.type != undefined ){
		 var tip =  selectedItem.type;
		 arrayTipo = tip.split(',');
		 op = arrayTipo[0];
	}else{
		var tip =  selectedItem.inputName;
		arrayTipo = tip.split(',');
		op = semCaractere(originalId(arrayTipo[0]),'_');
	}

	console.log(op);

	switch (op) {
		case 'desptipo':
			coletaid(arrayTipo[1],selectedItem.codigo, selectedItem.descricao);
			break;
		case 'despclientedesc':
		//var i = arrayTipo[1];
		var i = indexFromId(selectedItem.inputName); //arrayTipo[1];
		console.log(i);
		$('#despcliente___'+i).val(selectedItem.CCODIGO);
		$('#despclientedesc___'+i).val(selectedItem.CNOME);

		console.log(selectedItem);
		default:

	}
}
//----------------zoom---------------------------------//
//retorna id original de um campo paifilho
var originalId = function(id){
  var oId;
  for (var i=0; i< id.length; i++) {
    var c = id.charAt(i);
    if(isFinite(c)){
      oId = id.substring(0,i);
      break;
    }
  }
  return oId;
}
var aplicaMasks = function(){
	var inputs = $("[mask]");
		MaskEvent.initMask(inputs);
}


function defineMascaras(){
	console.log('definindo mascara de valor');
	var tabDesp = document.querySelector('#tabela');
	var contasKM = ['314520024', '314020024', '315420024', '315020024', '315720024', '313020024'];
	
	var linhas = tabDesp.querySelectorAll('tr');
	linhas.forEach(function(tr){
		var conta = tr.querySelector('.despctacontabil');
		
		if(conta){
			if (contasKM.includes(conta.value)) {
				var despVal = tr.querySelector('.despvalorporkm');
				$(despVal).attr("mask", "#");
			}
		}
		
	});
	aplicaMasks();

}