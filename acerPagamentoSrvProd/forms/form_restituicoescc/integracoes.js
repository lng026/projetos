//Abre zoom de produto passando codigo como parametro
function zoomProdutoCod(el) {
    zoomProduto(el, 'pn_produto', 'PRODUCTCODE');
}
//Abre zoom de produto passando modelo como parametro
function zoomProdutoDesc(el) {
    zoomProduto(el, 'produto', 'DESCRIPTION');
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

function zoomBanco(el){
    openZoom("Banco", "dsBancos", "codigo,CODIGO,nome,NOME", "codigo,nome", 'banco');
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
        case 'produto':
            //var i = arrayTipo[1];
            $('#pn_produto').val(selectedItem.PRODUCTCODE);
            $('#produto').val(selectedItem.DESCRIPTION);
            break;
        case 'banco':
            //var i = arrayTipo[1];
            $('#banco').val(selectedItem.codigo);
            $('#bancoDesc').val(selectedItem.codigo +" - "+selectedItem.nome);
            break;
        default:

    }
}

// busca informações da OS do cliente pelo numero da OS
function zoomOSCli(e){
    let osVal = $("#os").val();
    if(osVal){
        var csOs = DatasetFactory.createConstraint('ticket',osVal, osVal, ConstraintType.MUST);
        var dsOS = DatasetFactory.getDataset('dsClienteOSMP', null, new Array(csOs), null);
        if(dsOS.values.length){
            var oOS = dsOS.values[0];
            $("#os").val(oOS['ticket']);
            $("#nSerie").val(oOS['serie']);
            $("#pn_produto").val(oOS['produto']);
            getProdutoByPn(oOS['produto']);
            $("#cpfcnpj").val(oOS['cnpj']);
            // $("#cpfcnpj").change();
            $("#nome").val(oOS['nome']);
			$("#endereco").val(oOS['endereco']);
			$("#complemento").val(oOS['complemento']);
			$("#cep").val(oOS['cep']);
			$("#estado").val(oOS['estado']);
			$("#cidade").val(oOS['cidade']);
			$("#bairro").val(oOS['bairro']);
        }
    }
}
// busca produto pelo partnumber exato
function getProdutoByPn(pn){
    var cs = DatasetFactory.createConstraint('PRODUCTCODE',pn,pn, ConstraintType.MUST);
    var dsProd = DatasetFactory.getDataset('dsProdutos', null, new Array(cs), null);
    if(dsProd.values.length){
        oProd = dsProd.values[0];
        $("#produto").val(oProd['DESCRIPTION']);
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

var rmChar = function(valor,c){
    return semCaractere(valor,c);
}
function getCliente(cpf){
    var clientData = null;
    var c1 = DatasetFactory.createConstraint('cgc', cpf, cpf, ConstraintType.MUST);
    var dsclient = DatasetFactory.getDataset('dsClienteMP', null, new Array(c1), null);
    if(dsclient.values.length){
        clientData = dsclient.values[0];
    }

    return clientData
}