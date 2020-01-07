
$(document).ready(function(){
    var dString = dateToString(new Date());
    console.log("datahoje: "+dString);
    $('#pn_date').val(dString);
    $('#somaBaixas').html(somaBaixas().toFixed(2));
});

var addDisp = function(filho){
    var i = wdkAddChild(filho);
    $("#pn_quantAprov___"+i).on("focusout", function(e,h){calcTotalParcial(e.target);});
    $("#indexBaixa___"+i).val(i);
}

//função de adiciona novo partNumber
function addProClick(filho) {
    var id = wdkAddChild(filho);
    var inputs = $("[mask]");

    document.querySelector('#pn_tipoVerba___'+id).value = "A";
    MaskEvent.initMask(inputs);
    return id;
}

function calcTotal(e) {
    console.log(e);
    let id = $(e).attr('id');
    let pr = $('#pn_preco').val();
    let qtd = $('#pn_quant').val();
    pr = (pr.trim() != '') ? semCaractere(pr, ',') : 0;
    qtd = (qtd.trim() != '') ? qtd : 0;
    pr =  parseFloat(pr);
    qtd = parseFloat(qtd);
    let total = pr * qtd;
    $('#pn_valor').val(total.toFixed(2));


}

//busca nome do usuario usando cod
function getNameUser(matricula) {
    var colleagueName = '-';
    if (matricula) {
        var cs = DatasetFactory.createConstraint('colleaguePK.colleagueId', matricula, matricula, ConstraintType.MUST);
        var cols = new Array('colleagueName', 'colleaguePK.colleagueId');
        var ds = DatasetFactory.getDataset('colleague', cols, new Array(cs), null);
        if(ds.values.length){
            colleagueName =   ds.values[0]['colleagueName'];
        }
    }
    return colleagueName;
}

function tipoVerbaChange(element) {
    var tipV = element.value
    if (tipV == "C" || tipV == "D" || tipV == "E") {
        var linha = element.parentElement.parentElement;
        linha.querySelector('.prodpartnumber').style.display = 'none'; 
        var qnd =  linha.querySelector('.pn_quant');
        qnd.value = 1;
        $(qnd).attr('readonly','readonly');
    }else{
        var linha = element.parentElement.parentElement;
        linha.querySelector('.prodpartnumber').style.display = 'block'; 
        var qnd = linha.querySelector('.pn_quant');
        qnd.value = 1;
        $(qnd).removeAttr('readonly');
    }
    
}


function changeAprov() {
    // var element =  $('[name=aprov]:checked');
    // if( $('[name=aprov]:checked').val() == "P"){
	   //  var pnDivAprov = document.querySelector(".pnDivAprov");
    //     $(pnDivAprov).show();
    // }else{
    //     var pnDivAprov = document.querySelector(".pnDivAprov");
    //     $(pnDivAprov).hide();
    // }
    
}

function sAprovDiv(){
	var apGest = document.querySelector("#aprovGestor");
	if(apGest.value == "nao"){
		$('#aprovdiv').show();
		setDivReadOnly(Array('aprovdiv'));
	}
}

function calcTotalParcial(e) {
    let id = $(e).attr('id');
    let index =  indexFromId(id);
    let pr = $('#pn_preco').val();
    let qtd = $('#pn_quantAprov___'+index).val();
    pr = (pr.trim() != '') ? semCaractere(pr, ',') : 0;
    qtd = (qtd.trim() != '') ? qtd : 0;
    pr =  parseFloat(pr);
    qtd = parseFloat(qtd);
    let total = pr * qtd;
    $('#pn_valorAprov___'+index).val(total.toFixed(2));
    
    $('#somaBaixas').html(somaBaixas().toFixed(2));
}

function somaBaixas(){
  var total = parseFloat(0);
  var aValBx = document.querySelectorAll('.pn_valorAprov');
  for (var i = 0; i < aValBx.length; i++) {
    var bx =  aValBx[i];
    var trataBx = semCaractere(bx.value,",");
    var nVal = parseFloat(trataBx != ""? trataBx : 0);
    total = total + nVal;
  }
  return total;
}


function exibeAprovs(){
	if( $('[name=aprov]')[0].value == "P"){
        var pnDivAprov = document.querySelector(".pnDivAprov");
        $(pnDivAprov).show();
    }else{
        var pnDivAprov = document.querySelector(".pnDivAprov");
        $(pnDivAprov).hide();
    }
  
}

function zoomCliente(element){
//openZoom(title, dataset, fields, resultFields, type, filters)
var cli = document.querySelector("#cliente");
openZoom("Cliente", "dsClienteMatriz", "CCODIGO,Codigo,CNOME,Nome,CCGC,CGC",
 "CCODIGO,CNOME,CCGC,CMUNICIPIO,CENDERECO", 'cliente', ['CNOME', cli.value]);

}

//Abre zoom de produto passando codigo como parametro
function zoomProdutoCod(el) {
    zoomProduto(el, 'pn_produto_desc', 'PRODUCTCODE');
}
//Abre zoom de produto passando modelo como parametro
function zoomProdutoDesc(el) {
    zoomProduto(el, 'pn_produtosAcao', 'DESCRIPTION');
}


var zoomProduto = function (el, field, filter) {
    //	console.log('abacaxi');
    var id = $(el).attr('id');
    var fil = $('#' + field).val();

    if (fil.trim() == '' || fil.length < 3) {
        FLUIGC.toast({ title: 'Busca:', message: 'Por favor, Digite ao menos as 3 primeiras letras da descrição do produto.', type: 'warning' });
        return 0;
    }

    //openZoom(title, dataset, fields, resultFields, type, filters)
    openZoom("Produto", "dsProdutos", "DESCRIPTION,DESCRICAO,PRODUCTCODE,CODIGO,DESCRIPTIONGROUPOFPRODUCT,GRUPO", "PRODUCTCODE,DESCRIPTION,TYPEOFPRODUCT,DESCRIPTIONGROUPOFPRODUCT,QUANTITYPERPACKAGE", 'produto', [filter, fil]);
}

//abertura de zoom em uma janela separada
function openZoom(title, dataset, fields, resultFields, type, filters) {
    openZoomWindowParam(title, dataset, fields, resultFields, type, filters);
}
/**
 * @Overload de openZoom
 * Abre janela de zoom.
 * + @param windowParams: Parâmetros da janela de zoom.
 */
function openZoomWindowParam(title, dataset, fields, resultFields, type, filters) {
    var windowParams = "status , scrollbars=no ,width=800, height=350 , top=0 , left=0";
    var zoomURL = "/webdesk/zoom.jsp?datasetId=" + dataset + "&dataFields=" + escape(fields) + "&resultFields=" + resultFields + "&type=" + type + "&title=" + title + (filters ? "&filterValues=" + filters : "");
    window.open(zoomURL, "zoom", windowParams);
}
//função que pega retorno do item selecionado no zoom
function setSelectedZoomItem(selectedItem) {
    //console.log(selectedItem);
    var tip = selectedItem.type != undefined ? selectedItem.type : selectedItem.inputName;
    var arrayTipo = tip.split(',');
    switch (arrayTipo[0]) {
        case 'gerente':
            var ifc = arrayTipo[1];
            $('#fc_gerente___' + ifc).val(selectedItem.colleagueId);
            $('#fc_gerente_name___' + ifc).val(selectedItem.colleagueName);
            break;
        case 'cliente':
            $('#pn_cli').val(selectedItem.CCODIGO);
            $('#pn_cli_razao').val(selectedItem.CNOME);
            $('#cliente').val(selectedItem.CNOME);
            $('#pn_cli_endereco').val(selectedItem.CENDERECO);
            $('#pn_cli_cnpj').val(selectedItem.CCGC);
            $('#pn_cli_municipio').val(selectedItem.CMUNICIPIO);
            geraNumRebate();
            //console.log(selectedItem);
            break;
        case 'produto':
            //var i = arrayTipo[1];
            $('#pn_produto_cod').val(selectedItem.PRODUCTCODE);
            $('#pn_produto_desc').val(selectedItem.PRODUCTCODE);
            $('#pn_produtosAcao').val(selectedItem.DESCRIPTION);
            break;
        default:

    }
}

//funcoes uteis
//retorna index do id paiiflho passado
var indexFromId = function (id) {
    return semCaractere(id.substring(id.length - 3), '_');
}
//remove toda ocorrencia do caractere passado
var semCaractere = function (valor, c) {
    while (valor.indexOf(c) >= 0) {
        valor = valor.replace(c, '');
    }
    return valor;
}

//função para bloquear campos do formulario
function setDivReadOnly(ids) {
    $.each(ids, function (key, value) {
        $("#" + value).find("input[type='text'],input[type='date'],input[type='number']").attr("readonly", "readonly");
        $("#" + value).find("textarea").attr("readonly", "readonly");
        $("#" + value).find("input[type='text'],input[type='date'],input[type='number']").addClass("ReadOnly");
        // $("#"+value).find("input[type='button']").hide();
        $("#" + value).find("input[type='checkbox']").attr("readonly", "true");
        $("#" + value).find("button").hide();
        $("#" + value).find("img").hide();
        $("#" + value).find('.esconde').hide();
        $("#" + value).find('.desabilita').attr('readonly', true);
        $("#" + value).find('#adicionarLinha').hide();
        $("#" + value).find("select").each(function () {
            var val = $(this).find("option[selected]").text();
            $(this).parent().append($("<input class='ReadOnly form-control' readonly='readonly' value='" + val + "'/>"));
            $(this).hide();
        });
    });
}

//funcao executada no inicio do processo para definir o id sequencial que é inserido no numRebate
function defineNumId(){
   var mCod = buscaMaiorCodForm();
   var wkNumId = document.querySelector('#wkNumId');
   var num = parseInt(mCod);
    num = num+1;
    wkNumId.value = num;
}



var geraNumRebate = function () {
    var ano = new Date().getFullYear();
    var nCli = document.querySelector('#pn_cli').value;
    var mCod = document.querySelector('#wkNumId').value;
    var inpuRebate = document.querySelector('#pn_nRebate');
    inpuRebate.value = '' + ano + nCli + mCod + '';
}

function buscaMaiorCodForm() {
    var cs2 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
    var dsForm = DatasetFactory.getDataset('form_tactical_rebate', null, new Array( cs2), null);
    var maiorcod = 0;
    dsForm.values.forEach(function (element) {
        var wkN = parseInt(element.wkNumId);
        if (wkN > maiorcod) {
            maiorcod = wkN;
        }
    });
    return maiorcod;
}

function getUltimoDiaMes(){
    var date = new Date();
    // var primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1);
    var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    return ultimoDia; 
}

function dateToString(dt){
    return ""+addZero(dt.getDate())+"/"+addZero(dt.getMonth()+1)+"/"+dt.getFullYear();
}

function addZero(n){
    var nn;
    if(n < 10){
        nn = "0"+ n.toString();
    }else{
        nn = ""+ n.toString();

    }
    return nn;
}