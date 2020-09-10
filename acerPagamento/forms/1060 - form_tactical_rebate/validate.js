var beforeSendValidate = function(numState) {
  console.log('beforeMovementOptions');
    $(".has-error").removeClass("has-error");
  if(numState <= 4){
    validaHeader();
    //validarProdutos();
    geraNumRebate();
  }
  if (numState == 5) {
    validaAprovacao();
  }
}
/*
}
var beforeMovementOptions = function(numState) { */



function validaHeader(){
  var txtAlert = "Existem campos com erros ou que não foram preenchidos:\n";
    /* Limpa campos que estavam com erro da validacao anterior */
    var cErro = new Array();
    var tipV = $("#pn_tipoVerba").val();
   
    for (var key in camposHeader) {
      if (camposHeader.hasOwnProperty(key)) {
        var campo = key;
        if ((tipV == "C" || tipV == "D" || tipV == "E") && campo == "pn_produto_cod"){
          continue;
        }
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

var camposProduto = new Array('pn_tipoVerba',
 'pn_produto_cod',
 'pn_produto_desc',
 'pn_produtosAcao', 
 'pn_descricao', 
 'pn_quant', 
 'pn_valor');

function validarProdutos(){
  //pega soma de divs produtos - retira 1 pq div padrão de form com paifilho fluig
  var nProds = $('.pn_tipoVerba').size() -1;
   if(nProds == 0){
    throw "Por favor adicione produtos ao pedido de venda.";
   }


  var txtAlert = "Preencha corretamene os campos:";
  var cErro = false;
  $('.pn_tipoVerba').each(function(index, el) {
      var i = indexFromId($(el).attr('id'));
      console.log(i);
    if (!isFinite(i)) {
      return 0;
    }
    console.log("execute");
    
      var tipV = $("#pn_tipoVerba").val();
      //pula se i não for campo filho
      if(i == '') return 0;
      for (var p = 0; p < camposProduto.length; p++) {
        var campo = camposProduto[p];
        if ((tipV == "C" || tipV == "D" || tipV == "E") && campo == "pn_produto_cod"){
          return 0;
        }
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

function validaAprovacao() {
  var divApro = document.querySelector('#aprovdiv');
  var obs = divApro.querySelector('#aprovGestorObs');
  if (!obs.value) {
    throw "Por Favor, adicione uma Observação antes de enviar.";
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
 camposHeader['pn_cli'] = 'Cliente';
 camposHeader['pn_cli_razao'] = 'Razão Social';
 camposHeader['pn_cli_endereco'] = 'Endereço';
 camposHeader['pn_cli_cnpj'] = 'CNPJ';
 camposHeader['pn_cli_municipio'] = 'Município';
// camposHeader['pn_condicao_pagamento'] = 'Condição de Pagamento';
camposHeader['pn_nRebate'] = 'Rebate nº';
// camposHeader['pn_aprovDate'] = 'Aprovado Data';
camposHeader['pn_comprador'] = 'Comprador';
camposHeader['observacoes'] = 'Observações';

camposHeader['pn_tipoVerba'] = 'Tipo de Verda';
camposHeader['pn_produto_cod'] = 'PartNumber';
camposHeader['pn_produtosAcao'] = 'Produto / Ação';
camposHeader['pn_descricao'] = 'Descrição';
//camposHeader['pn_preco'] = 'Preço';
camposHeader['pn_quant'] = 'Quantidade';
camposHeader['pn_valor'] = 'Valor';



// //remove toda ocorrencia do caractere passado
// var semCaractere =  function(valor, c){
//   while(valor.indexOf(c) >= 0){
//     valor = valor.replace(c,'');
//   }
//   return valor;
// }
