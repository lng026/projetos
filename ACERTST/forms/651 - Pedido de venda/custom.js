$(document).ready(function() {
  FLUIGC.calendar('.date');
  FLUIGC.calendar('.hour',{
    pickDate: false,
   pickTime: true,
   useMinutes: true,
   useSeconds: false,
   useCurrent: true
  });

});


//funcoes de botoes
var addProClick = function(filho){
  var id = wdkAddChild(filho);
  var a = document.querySelector("#pv_idPEd___"+id);
  a.value = id;
  $("#pv_local___"+id).val("01");
  var inputs = $("[mask]");
  MaskEvent.initMask(inputs);
  
  return id;
}
var removeProClick = function(el){
  if(!confirm("Remover Produto?")){
    return 0;
  }
  fnWdkRemoveChild(el);
  //chama funcao para recalcular o total
 calculaTotalPO();
}
function removeEntregaClick(el) {
  if (!confirm("Remover Produto?")) {
    return 0;
  }
  fnWdkRemoveChild(el);
}


function aplicaDates() {
  FLUIGC.calendar('.date');
  FLUIGC.calendar('.hour', {
    pickDate: false,
    pickTime: true,
    useMinutes: true,
    useSeconds: false,
    useCurrent: true
  });

}
function getConstraint(campo, val,val2){
	if(val2 == null || val2 == undefined){
		val2 = val;
	}
	return DatasetFactory.createConstraint(campo, val, val2, ConstraintType.MUST);
}

var buscaPrecoProduto = function(cod){
  if(cod != undefined && cod.trim() != ''){
    var constraint = new Array(getConstraint('PRODUCTCODE',cod));
    var data = DatasetFactory.getDataset('dsProdutoPreco',null,constraint,null);
    if(data.values.length) {
      var preco = data.values[0]['PRICE'];
      return preco;
    }
  }else{
    return 0;
  }
}

//calcula preco total do produto
function calculaTotalProduto(e){
  var i = indexFromId($(e).attr('id'));
  var qty = $('#pv_pro_qty___'+i).val().trim() != '' ? $('#pv_pro_qty___'+i).val() : 0;

  var custo = $('#pv_pro_custo___'+i).val().trim() != '' ? $('#pv_pro_custo___'+i).val().trim() : 0;
  custo = semCaractere(custo,',');

  var total =  parseFloat(qty) * parseFloat(custo);
  $('#pv_pro_total___'+i).val(total.toFixed(2));
  //recalcula total do PO
  calculaTotalPO();
  aplicaMasks();

}

//calcula total dos produtos do pedido - soma do total dos produtos - .totalPro
function calculaTotalPO(){
  var total = 0;
  $('.totalPro').each(function(index, el) {
    var val = semCaractere($(el).val(), ',');
    val = val.trim() != '' ? parseFloat(val) : 0;
    total += val;
  });
  $('#pv_total').val(total.toFixed(2));
  aplicaMasks();

}


function aplicaMasks(){
  var inputs = $("[mask]");
  MaskEvent.initMask(inputs);
}


//funcoes uteis
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


//função para bloquear campos do formulario
function setDivReadOnly(ids){
  $.each(ids, function(key, value) {
    $("#"+value).find('div').removeClass("input-group");
    $("#"+value).find("input[type='text'],input[type='date'],input[type='number']").attr("readonly", "readonly");
    $("#"+value).find("input[type='text'],input[type='date'],input[type='number']").addClass("ReadOnly");
   // $("#"+value).find("input[type='button']").hide();
    $("#"+value).find("input[type='checkbox']").attr("disabled", "true");
    $("#"+value).find("button").hide();
    $("#"+value).find("img").hide();
    $("#"+value).find('.esconde').hide();
    $("#"+value).find('.desabilita').attr('disabled',true);
    $("#"+value).find('#adicionarLinha').hide();
      $("#"+value).find("select").each(function(){
      var val = $(this).find("option[selected]").text();
      $(this).parent().append($("<input class='ReadOnly form-control' readonly='readonly' value='"+val+"'/>"));
      $(this).hide();
    });
  });
}

var copyProClick = function(btn){
  console.log(btn);
  var el = $(btn).parents('tr').find('.pv_pro');
  console.log(el);
  var idFrom = indexFromId($(el).attr('id'));
  var idDest =  wdkAddChild('tbPvProdutos');

  
 $("#pv_idPEd___"+idDest).val(idDest);

 $("#pv_nPedido___"+idDest).val($("#pv_nPedido___"+idFrom).val());
 $("#pv_produto_cod___"+idDest).val($("#pv_produto_cod___"+idFrom).val());
 $("#pv_produto_desc___"+idDest).val($("#pv_produto_desc___"+idFrom).val());
 $("#pv_pro_modelo___"+idDest).val($("#pv_pro_modelo___"+idFrom).val());
 $("#pv_pro_qty___"+idDest).val($("#pv_pro_qty___"+idFrom).val());
 $("#pv_pro_custo___"+idDest).val($("#pv_pro_custo___"+idFrom).val());
 $("#pv_pro_total___"+idDest).val($("#pv_pro_total___"+idFrom).val());
 $("#pv_pro_pri___"+idDest).val($("#pv_pro_pri___"+idFrom).val());
 $("#pv_crdd___"+idDest).val($("#pv_crdd___"+idFrom).val());
 $("#pv_transp___"+idDest).val($("#pv_transp___"+idFrom).val());
 $("#pv_transCod___"+idDest).val($("#pv_transCod___"+idFrom).val());
 $("#pv_local___"+idDest).val("01");
 $("#pv_filial___"+idDest).val($("#pv_filial___"+idFrom).val());
 $("#pvEspVol___"+idDest).val($("#pvEspVol___"+idFrom).val());
 $("#pvQtdVol___"+idDest).val($("#pvQtdVol___"+idFrom).val());

//chama funcao para recalcular o total
 calculaTotalPO();
  aplicaDates();
  MaskEvent.initMask($("[mask]"));

 /*"pv_nPedido___"
"pv_produto_cod___"

"pv_produto_desc___"
"pv_pro_modelo___"
"pv_pro_qty___"
"pv_pro_custo___"
"pv_pro_total___"
"pv_pro_pri___"*/
}

function defineNFS(){
  var cid = document.querySelector('#retornoIds');
  var cidslista = cid.value.split(',');
  // var cid = '391';
  var nfs = buscanfs(cidslista[0]);
  if(nfs){
    var tab = document.querySelector('.provTBody');
    var trs = tab.querySelectorAll('tr');
    trs.forEach(function(tr){
      var cprod = tr.querySelector('.pv_produto_cod');
      console.log(cprod.value);
      if(cprod.value){
        var nf = NFByCod(cprod.value, nfs);
        addAgendamento(nf);
      }
     
    });
  } 
}

function addAgendamento(nf){
  var id = wdkAddChild('tbPvEntregas');
  //cproduto
  document.querySelector("#cproduto___"+id).textContent = nf.CPRODUTO;
  $("#pv_nFiscal___"+id).val(nf.CNOTAFISCAL);
  $("#pv_nFiscal___"+id).attr('readonly','readolny');

  if(semCaractere(nf.CDATASAIDA,'/')){
    $("#pv_data_saida___"+id).val(nf.CDATASAIDA);
    $("#pv_data_saida___"+id).attr('readonly','readolny');
  }
  if(semCaractere(nf.CDATAENTREGA,'/')){
    $("#pv_entRealDt___"+id).val(nf.CDATAENTREGA);
    $("#pv_entRealDt___"+id).attr('readonly','readolny');
  }
  if(semCaractere(nf.CDATAAGENDA,'/')){
    $("#pv_data_agenda___"+id).val(nf.CDATAAGENDA);
    $("#pv_data_agenda___"+id).attr('readonly','readolny');
  }
}

function buscanfs(cid){
  if (cid) {
    var cs = DatasetFactory.createConstraint('CID', cid, cid, ConstraintType.MUST);
    var statusNF = DatasetFactory.getDataset('dsStatusNF', null, new Array(cs), null);
    return statusNF.values;
  }else{
    return 0;
  }
}

function NFByCod(cod, values){
  var nf = {CNOTAFISCAL: "", CDATASAIDA:"", CPRODUTO:"",CDATAENTREGA:"",CDATAAGENDA:""};
  
    for (var i = 0; i < values.length; i++) {
      var element = values[i];
      if(element['CPRODUTO'].trim() == cod.trim()){
        if(hasNF(element['CNOTAFISCAL'])){
          continue;
        }
        nf.CNOTAFISCAL = element['CNOTAFISCAL'];
        nf.CPRODUTO = element['CPRODUTO'];
        nf.CDATASAIDA = trataData(element['CDATASAIDA']);
        nf.CDATAENTREGA = trataData(element['CDATAENTREGA']);
        nf.CDATAAGENDA = trataData(element['CDATAAGENDA']);
        break;
        // nf.CDATASAIDA = element['CDATASAIDA'];
      }  
      
    }
   
    return nf;
}

function hasNF(NF){
  var notas = $('.pv_nFiscal');
  for (var i = 0; i < notas.length; i++) {
    var element = notas[i];
    if($(element).val() == NF.trim()){
      return true;
    }
  }

  return false;
}


function trataData(dString){
  dString = dString.trim();
  var ano = dString.substring(0,4);
  var m = dString.substring(4,6);
  var d = dString.substring(6,8);
  return d + "/"+m+"/"+ano;
}