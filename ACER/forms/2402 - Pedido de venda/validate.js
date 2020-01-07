
var beforeSendValidate = function(numState) {
	//executa codigo do lucas
	 var cliente = $('#pv_cli_razao').val();
	  var sorder = $('#pv_nPedido___1').val();
	  var concat = cliente + '|' + sorder;
	  $('#sorder_cliente').val(concat);
	
	
	console.log('beforeSendValidate');
    $(".has-error").removeClass("has-error");
  //copia valor do pedido para variavel escondida a
  if (numState <= 4) {
  $('#pv_total_original').val($('#pv_total').val());
    validaHeader();
    var camposProduto = new Array('pv_nPedido','pv_produto_cod', 'pv_produto_desc', 'pv_pro_modelo','pv_pro_qyt', 'pv_pro_qty', 'pv_pro_custo', 'pv_pro_total','pv_pro_pri','pv_crdd');
    validarProdutos(camposProduto);
  }
  if(numState == 60){
    $('#pv_total_original').val($('#pv_total').val());
  }

  //salvando data de aprovação de preço
  if(numState == 56){
    // sava data atual;
    var data = new Date();
    var dataString = data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate();
    // salva a data no campo hidden
    document.querySelector("#pv_apPrecoDate").value = dataString;
  }
 
  if(numState == 70){
    validaAgendaEntrega();
  }
  if(numState == 72){
    validaDataEntrega();
  }

  //na tarefa paletizar
  if(numState == 75){
    var camposProdutoPal = new Array('pvQtdVol', 'pvEspVol','pv_transCod','pv_transp');
    
    validarProdutos(camposProdutoPal);
    var tOrigi = semCaractere($('#pv_total_original').val(),',');
    var tAtu = semCaractere($('#pv_total').val(),',');
    if(tOrigi != tAtu){
      throw "O valor do pedido não pode ser alterado.";
    }
  }
}
/*
}
var beforeMovementOptions = function(numState) { */



function validaHeader(){
  var txtAlert = "Existem campos com erros ou que não foram preenchidos:\n";
    /* Limpa campos que estavam com erro da validacao anterior */
    var cErro = new Array();

    for (var key in camposHeader) {
      if (camposHeader.hasOwnProperty(key)) {
        var campo = key;
        var valOk = validaInput($('#'+campo));
        if(!valOk[0]){
          $('#'+campo).closest(".form-group").addClass("has-error");
          cErro.push(camposHeader[key]);
        }
      }
    }

    if(cErro.length > 0 ){
      throw txtAlert + cErro.join('\n');
    }

}



function validarProdutos(camposProduto){
  //pega soma de divs produtos - retira 1 pq div padrão de form com paifilho fluig
  var nProds = $('.pv_pro').size() -1;
   if(nProds == 0){
    throw "Por favor adicione produtos ao pedido de venda.";
   }


  var txtAlert = "Preencha corretamene os produtos do pedido:\n";
  var cErro = false;
  $('.pv_pro').each(function(index, el) {
      var i = indexFromId($(el).attr('id'));
      console.log(i);
      //pula se i não for campo filho
      if(i == '') return 0;
      for (var p = 0; p < camposProduto.length; p++) {
        var campo = camposProduto[p];
        var inpuElement = $('#'+campo+"___"+i);
        var valOk = validaInput(inpuElement);
        if(!valOk[0]){
          $(inpuElement).closest(".form-group").addClass("has-error");
          cErro = true;
        }
      }
      if(cErro){
        throw txtAlert;
      }
  });
}


var validaAgendaEntrega = function(){
 var txtAlert = "Existem campos com erros ou que não foram preenchidos:\n";
  var cErroEnt = new Array();
  var tabEnt = document.querySelector('#tbPvEntregas');
  var trs = tabEnt.querySelectorAll('.linhaEntrega');
  if(trs.length == 0 ){
    throw "É necessário inserir ao menos um agendamento de entrega."
  }
  trs.forEach(function(tr){
    var campos = tr.querySelectorAll('input');
    var pCmapo = campos[0];
    if (!isFinite(indexFromId(pCmapo.attributes.id.value))){
      return;
    }
    campos.forEach(function(element){
      if(element.classList.contains('pv_entRealDt')){
        return;
      }
      var valOk = validaInput(element);
      if (!valOk[0]) {
        element.parentElement.classList.add('has-error');
        cErroEnt.push(element.parentElement.querySelector('label').textContent);
      }
    });
  });
  if(cErroEnt.length > 0 ){
    throw txtAlert + cErroEnt.join('\n');
  }
}

var validaDataEntrega = function(){
 var txtAlert = "Existem campos com erros ou que não foram preenchidos:\n";
  var cErroEnt = new Array();
  var tabEnt = document.querySelector('#tbPvEntregas');
  var trs = tabEnt.querySelectorAll('.linhaEntrega');
  if(trs.length == 0 ){
    throw "É necessário inserir ao menos um agendamento de entrega."
  }
  trs.forEach(function(tr){
    var campo = tr.querySelector('.pv_entRealDt');
    if (!isFinite(indexFromId(campo.attributes.id.value))){
      return;
    }
      var valOk = validaInput(campo);
      if (!valOk[0]) {
        campo.parentElement.classList.add('has-error');
        cErroEnt.push(campo.parentElement.querySelector('label').textContent);
      }
  });

  if(cErroEnt.length > 0 ){
    throw txtAlert + cErroEnt.join('\n');
  }

}

//----------------validacao------------------//
var  validaInput = function(el){
    var ok = false;
    var nome = $(el).prop("name");
    var tipo = $(el).prop("type");

    if(tipo == "checkbox"){
		  var checks = $("[name='"+ name + "']:checked");
      ok =  checks.length == 0 ? true : false;
    }else if(tipo =="radio"){
      ok =  $(el).checked;
    }else{
      ok = ($(el).val() != undefined && $(el).val() != null && $(el).val().trim() == ""  );
    }

    var r = [!ok , nome ];
    return r;

}

var camposHeader = new Array();
camposHeader['pv_acc_manager'] = 'Account Manager';
 camposHeader['pv_data'] = 'Data PO';
 camposHeader['pv_cli'] = 'Razão Social';
 //camposHeader['pv_cli_razao'] = 'Razão Social';
 camposHeader['pv_cli_endereco'] = 'Endereço';
 camposHeader['pv_cli_cnpj'] = 'CNPJ';
 camposHeader['pv_cli_municipio'] = 'Município';
// camposHeader['pv_condicao_pagamento'] = 'Condição de Pagamento';
 camposHeader['pv_total'] = 'Total PO';




//remove toda ocorrencia do caractere passado
var semCaractere =  function(valor, c){
  while(valor.indexOf(c) >= 0){
    valor = valor.replace(c,'');
  }
  return valor;
}
