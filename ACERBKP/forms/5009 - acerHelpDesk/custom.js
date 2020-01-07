var camposStart = ['name','txt_incidente','usRespTxt','assunto'];
var nomeCampos = [];
nomeCampos['name'] = "Nome";
nomeCampos['txt_incidente'] = "Descrição do incidente";
nomeCampos['usRespTxt'] = "Tópico de Ajuda";
nomeCampos['assunto'] = "Assunto";
nomeCampos['status'] = "Ação do Chamado";


$(document).ready(function(){
	var atv = $("#atv").val();
	//triagem
	if(atv == "45"){
		$("[name=unidade]").attr("disabled",'disabled');
		// $("[name=unidade]").parent('label').addClass("disabled");
		$(".unidadelb").addClass("disabled");
		$("#txt_incidente").addClass("form-control");
		$("#txt_incidente").addClass("disabled");
		$("#txt_incidente").attr("readonly","readonly");
		$("#anexo").parent("div").addClass("hidediv");
	}else{
		$(".Triagem").hide();
	}

	$("[name=areaResp]").on("change",function(e){
		console.log(e.target.value);
		$("#analisaResp").val(e.target.selectedOptions[0].value);
	});

	$("[name=prioridade]").on("change",function(e){
		var aSLA = [];
		aSLA["Baixa"] = "120:00";
		aSLA["Normal"] = "048:00";
		aSLA["aAlta"] = "008:00";
		aSLA["Critica"] = "002:00";
		$("[name=analisaSla]").val(aSLA[e.target.value]);
	});


	

	// CKEDITOR.replace( 'txt_incidente' );
	CKEDITOR.disableAutoInline = true;
	CKEDITOR.addCss( 'img {max-width:100%; height: auto;}' );
	var editor = CKEDITOR.replace( 'txt_incidente', {
		// extraPlugins: 'uploadimage,image2',
		removePlugins: 'image',
		// filebrowserBrowseUrl: 'fortuitous-amperage.000webhostapp.com/ckfinder/ckfinder.html',
		// filebrowserUploadUrl: 'fortuitous-amperage.000webhostapp.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
		height:250
	} );


});




//função que utiliza o seguinte método para capturar os dados o campo zoom e carrega-los nos respectivos campos.
function setSelectedZoomItem(selectedItem) {  
	console.log(selectedItem);
	            
	// var description = (selectedItem["dsincidente"]); // variavel receber o valor do dataset (Campo Descriação do incidente)
	var papel = (selectedItem["taResponavel"]); // variavel receber o valor do dataset (Campo papel responsável)
	var desctxt = (selectedItem["taDescricao"]); // variavel receber o valor do dataset (Campo papel responsável)
	var nometxt = (selectedItem["taNome"]); // variavel receber o valor do dataset (Campo papel responsável)
        // $("#dsIncidente").val(description); 

        // define novos responsaveis
        $("#usResp").val("Pool:Role:" + nometxt); // Parãmetro "Pool:Role" é uma string que o fluig utiliza para determinar o tipo de papel.        
        $("#usNovoResp").val("Pool:Role:" + nometxt); // Parãmetro "Pool:Role" é uma string que o fluig utiliza para determinar o tipo de papel.
        $("#analisaResp").val("Pool:Role:" + nometxt); // Parãmetro "Pool:Role" é uma string que o fluig utiliza para determinar o tipo de papel.

        // pega textos
        $("#usRespTxt").val("" + nometxt); // Parãmetro "Pool:Role" é uma string que o fluig utiliza para determinar o tipo de papel.        
        $("#usNovoRespTxt").val("" + nometxt); // Parãmetro "Pool:Role" é uma string que o fluig utiliza para determinar o tipo de papel.        
        $("#usDescTxt").val("" + desctxt); // Parãmetro "Pool:Role" é uma string que o fluig utiliza para determinar o tipo de papel.        
        $("#usNomeTxt").val("" + nometxt); // Parãmetro "Pool:Role" é uma string que o fluig utiliza para determinar o tipo de papel.        
}


function showDiv(element){

	if (element.value == 'transferir') {
			$("#transferido").val('1');
			document.getElementById('divtransfer').style.display = "block";
		} else{
			document.getElementById('divtransfer').style.display = "none";
		}

	if (element.value == 'fechado') {
		document.getElementById('div_soluc').style.display = "block";
	}else{
		document.getElementById('div_soluc').style.display = "none";
	}

	if(element.value != 'transferir'){
		$("#transferido").val('0');
	}
}

function contResp(){
        var val = parseInt($('#contResp').val());
        $('#contResp').val(val + 1);
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

 function addCC(campo,e){
                wdkAddChild(''+campo+'');
                var ccind = $('#ccindex').val();
                var cont = parseInt(ccind) + 1;
               	$('#ccindex').val(cont);
               }
 function removeCC(e){
                fnWdkRemoveChild(e);
                var ccind = $('#ccindex').val();
                var cont = parseInt(ccind) - 1;
               	$('#ccindex').val(cont);
               }

function addResp(campo,e){
                wdkAddChild(''+campo+'');
                // var contaresp = parseInt($('#contaResp').val());
                // contaresp = contaresp + 1;
                // $('#contaResp').val(contaresp);
                $('#checkResp').val('1');
                e.style.display = 'none';

                var nomeRsp = $("#nomec").val();
                var alltrs = document.querySelectorAll('.trResp');
              	var alltrslen = alltrs.length-1;
              	var login = $('#login').val();
              	var loginresp = $('#loginresp___' + alltrslen);

              	loginresp.val(login);
              	
                	// GERA DATA 

					var dtResp = new Date();
					
					// GERA VISUALIZAÇÃO DA DATA 
					var dia = dtResp.getDate();
					var mes = dtResp.getMonth();
					var ano = dtResp.getFullYear();
					var hora = dtResp.getHours();
					var minuto = dtResp.getMinutes();

					var mostraDt = showDate(dia,mes,ano,hora,minuto);
					

                alltrs[alltrs.length-1].querySelector('.nomeRsp').value = ''+ nomeRsp +'';
                alltrs[alltrs.length-1].querySelector('.dataRsp').value = ''+ mostraDt +'';
                	

        }


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

var validaForm = function() {
			var obrigatorios = [];
		var txtAlert = "Existem campos com erros ou que não foram preenchidos:";
		  /* Limpa campos que estavam com erro da validacao anterior */
		  $(".has-error").removeClass("has-error");
		  //valida todos os campos obrigatorios
		 for (var i = 0; i < camposStart.length; i++) {
		 	var campo = camposStart[i];
				var el = $('#'+campo);
				var elval = $(el).val();
					if(campo == 'txt_incidente'){
						//valida cpf
						var data = CKEDITOR.instances.txt_incidente.getData();
						// var data = $('#txt_incidente').froalaEditor('html.get', true);
                		data = data.substring(0,(data.length - 2));
						
						if(data == ''){
							obrigatorios.push(campo);
							txtAlert += "\n" + nomeCampos[campo];
						}
					}else if(campo == 'usRespTxt'){
						//verifica campos de reais ou dolar para verificar se o valor do adiantamento foi preenchido
						if(elval == ''){
							txtAlert += "\n" + nomeCampos[campo];
							obrigatorios.push(campo);
						}
					}else
						//verifica preenchimento do restante dos cmpos
						// var val = validaInput(el);
						if(elval == ''){
							txtAlert += "\n" + nomeCampos[campo];
							obrigatorios.push(campo);

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

	
var validaStatus = function(){
	if ($("[name='status']:checked").val() == 'vazio') {
		throw 'Selecione o STATUS do ticket.'
	}
}

var validaStatusUser = function(){
	if ($("[name='us_resolvido']:checked").val() == 'vazio') {
		throw 'Selecione se o chamado foi resolvido.'
	}
}

// CKEDITOR.replace( 'txt_incidente' );
CKEDITOR.disableAutoInline = true;
		CKEDITOR.addCss( 'img {max-width:100%; height: auto;}' );
		var editor = CKEDITOR.replace( 'txt_incidente', {
			// extraPlugins: 'uploadimage,image2',
			removePlugins: 'image',
			// filebrowserBrowseUrl: 'fortuitous-amperage.000webhostapp.com/ckfinder/ckfinder.html',
			// filebrowserUploadUrl: 'fortuitous-amperage.000webhostapp.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
			height:250
		} );
		// CKFinder.setupCKEditor( editor );
  // $(function() {
  //   $('textarea#txt_incidente').froalaEditor()
  // });


var validaResposta = function(){

if (checkResp) {
var numResp = document.querySelectorAll('.trResp').length;
numResp = numResp - 1;
var resposta = $("#resposta___"+numResp).val();

if (resposta == undefined || resposta == '') {	
	throw 'Digite uma resposta para o ticket.'
}

}else{
	throw 'Digite uma resposta para o ticket.'
}



}

function validacaoEmail() {
var ccindex = parseInt($('#ccindex').val());
var ok = '';
var erro = 0;
if (ccindex >= 0) {
for(var i = 0; i < ccindex; i++){
var cont = i + 1;
var field = 'form.campocc___' + cont;
usuario = field.value.substring(0, field.value.indexOf("@"));
dominio = field.value.substring(field.value.indexOf("@")+ 1, field.value.length);
if ((usuario.length >=1) &&
    (dominio.length >=3) && 
    (usuario.search("@")==-1) && 
    (dominio.search("@")==-1) &&
    (usuario.search(" ")==-1) && 
    (dominio.search(" ")==-1) &&
    (dominio.search(".")!=-1) &&      
    (dominio.indexOf(".") >=1)&& 
    (dominio.lastIndexOf(".") < dominio.length - 1)) {
ok = true;
}else{
		var fvalue = field.value;
		erro = erro + 1;
		
		var camposerro = '\n'+fvalue;
		}
	}
if (erro > 0) {

	var txterro = 'Email inválido:\n'+camposerro;
	throw txterro;
}
}
}
var checkSolut = function(){
	var resolv = $("[name='resolvido']:checked").val();
	var status = $("[name='status']:checked").val();

	if (resolv == 'vazio' && status == 'fechado') {
		throw 'Informe se o chamado foi resolvido'
	}
}

// var resetaRadio = function(){
// var a = $("input[name=status][value='vazio']").prop("checked",true);
// var b = $("input[name=resolvido][value='vazio']").prop("checked",true);
// }

// resetaRadio();

// function validateEmail(){
//         var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

//         for(var i = 0; i < ccindex; i++){
//         var cont = i + 1;
//         var campocc = 'form.campocc___'+cont;
//         if (reg.test(campocc.value) == false) 
//         {
//             throw 'Invalid Email Address';
//             return false;
//         }

//         return true;
//         }

// }

function validaAvaliacao(){
	var camporesolvido = $("[name='us_resolvidof']:checked").val();
	var campoavalicao = $('#avaliacao').val();
	if(campoavalicao == '' && camporesolvido == 'vazio')
	{
		throw "Digite uma avaliação para o atendimento"
	}
}



function ValidateEmail()
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var cci = parseInt($('#ccindex').val());

for(var i = 0;i<cci;i++){
var cont = i+1;
var campo = 'document.form.campocc___' + cont;
if(campo.value.match(mailformat))
{
campo.focus();
return true;
}
else
{
throw "You have entered an invalid email address!";
campo.focus();
return false;
}

}

}

$("#vazio").attr('checked', 'checked');

function getInputValue(input){
	var value = '';
	switch (input.tagName) {
		case "SPAN":
				value = input.innerHTML;
			break;
		case "SELECT":
			value = input.options[input.selectedIndex].text;
		break;

		default:
			value = input.value;
		break;
	}
	return value;
}


 var beforeSendValidate = function(numState) {

 					var data = CKEDITOR.instances.txt_incidente.getData();
					// var data = $('#txt_incidente').froalaEditor('html.get', true);

                	data = data.substring(0,(data.length - 2));
                	if (numState <= 4) {
                		try{

                		$('#txt_incidente').val(data);
						validaForm();
						var crit = prioridade.options[prioridade.selectedIndex].text;
						$('#critval').val(crit);

				
						}catch(e){

							throw e;
						}
                		}

                		if (numState == 15) {
                		validaStatus();
                		validaResposta();
						checkSolut();

						var numResp = document.querySelectorAll('.trResp').length;
						numResp = numResp - 1;
						var resposta = $('#resposta___' + numResp).val();
						$('#Rsp___' + numResp).val(resposta);
                		}

						if (numState == 9) {

						validaStatusUser();
						validaResposta();
						var resolvido = $("[name='us_resolvido']:checked").val();
						if (resolvido == 'sim') {
							validaAvaliacao();
						}


						                		}

                		if (numState == 22) {

                		validaAvaliacao();

                		}

}






