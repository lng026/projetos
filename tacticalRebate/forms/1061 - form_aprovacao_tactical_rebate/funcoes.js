var beforeSendValidate = function (numState) {
    if (numState <= 4) {
        var numRebate = document.querySelector('#inputBuscaRebate');
        var dsForm = buscaDadosForm(numRebate.value);
        if ((!numRebate.value) || dsForm.length == 0) {
            throw "Informe o Rebate nº valido";
        }
    }
    if (numState == 5) {
        validaAprovPN();
    }
    if (numState == 10) {
        validaAprovacao();
    }

}


function validaAprovPN() {
    console.log('validarAprovPn');
    $('.has-error').removeClass('has-error');
    var aprov = $('[name=aprov]:checked');
    if(aprov.length){
        if (aprov[0].value == "P") {
            var qtd = document.querySelector('#pn_quantAprov');
            var val = document.querySelector('#pn_valorAprov');
            var fin = $('[name=finaliza]:checked');// tr.querySelector('#finaliza___'+i);
            if(!qtd.value){
                qtd.parentElement.classList.add("has-error");
                throw "Preencha todos os campos de Quantidade.";
            }
            if (!val.value) {
                val.parentElement.classList.add("has-error");
                throw "Preencha todos os campos de Valor.";
            }
            if (!fin.length) {
                throw "Informe a finalização.";
            }
        }
    }else{
        throw "Preencha todos os campos de aprovação.";
    }
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

function validaAprovacao() {
    var divApro = document.querySelector('#aprovdiv');
    var obs = divApro.querySelector('#aprovGestorObs');
    if (!obs.value) {
        throw "Por Favor, adicione uma Observação antes de enviar.";
    }
}

function buscaDados(nr) {
    var numRebate;
    if (nr) {
        numRebate = nr;
    } else {
        var inr = document.querySelector('#inputBuscaRebate');
        if (inr.value) {
            numRebate = inr.value;
        } else {
            numRebate = inr.textContent;

        }
    }
    if (!numRebate) {
        alert("Informe o Rebate nº");
        return 0;
    }

    var dsForm = buscaDadosForm(numRebate);
    var dados;
    if (dsForm.length) {
        dados = dsForm[0];
    }else{
        alert("Solicitação não encontrada.\n");
        return 0;
    }
    exibeDadosForm(dados);
    // console.log(dados);
    // var dsFilhos = buscaDadosPaiFilho('tbPartNumber', dados['metadata#id'], dados['metadata#version'], 'form_tactical_rebate');
    // console.log(dsFilhos);
    // montaTablePNum(dsFilhos);

}

function exibeDadosForm(dados) {
    $('#cliente').val(dados['cliente']);
    $('#pn_cli_razao').val(dados['pn_cli_razao']);
    $('#pn_cli_endereco').val(dados['pn_cli_endereco']);
    $('#pn_cli_cnpj').val(dados['pn_cli_cnpj']);
    $('#pn_cli_municipio').val(dados['pn_cli_municipio']);
    $('#pn_nRebate').val(dados['pn_nRebate']);
    $('#pn_aprovDate').val(dados['pn_aprovDate']);
    $('#pn_solicitante').val(dados['pn_solicitante']);
    $('#pn_aprovador').val(dados['pn_aprovador']);
    $('#observacoes').val(dados['observacoes']);
    $('#aprovGestorObsor').val(dados['aprovGestorObs']);

    $('#pn_tipoVerba').val(getTipo(dados['pn_tipoVerba']));
    $('#pn_produto_desc').val(dados['pn_produto_desc']);
    $('#pn_produtosAcao').val(dados['pn_produtosAcao']);
    $('#pn_descricao').val(dados['pn_descricao']);
    $('#pn_quant').val(dados['pn_quant']);
    $('#pn_valor').val(dados['pn_valor']);
    $('#pn_preco').val(dados['pn_preco']);
}

function montaTablePNum(dsFilhos) {
    dsFilhos.forEach(function (PN) {
        addPro(PN);
    });
}

//função de adiciona novo partNumber
function addPro(pn) {
    var id = wdkAddChild('tbPartNumber');
    // var inputs = $("[mask]");

    $('#pn_tipoVerba').val(getTipo(pn.pn_tipoVerba));
    $('#pn_produto_desc').val(pn.pn_produto_desc);
    $('#pn_produtosAcao').val(pn.pn_produtosAcao);
    $('#pn_descricao').val(pn.pn_descricao);
    $('#pn_quant').val(pn.pn_quant);
    $('#pn_valor').val(pn.pn_valor);
    $('#pn_preco').val(pn.pn_preco);

    return id;
}

function getTipo(tipo) {
    var arrayTipo = new Array();
    arrayTipo["A"] = "Ação de Sell IN";
    arrayTipo["B"] = "Ação de Sell Out";
    arrayTipo["C"] = "Ação de Marketing";
    arrayTipo["D"] = "Tipo de Ação - Anúncio, exposição, ação de Trade.";
    arrayTipo["E"] = "Outros";
    return arrayTipo[tipo];
}

function newTrPN(pn) {
    var arrayTipo = new Array();
    arrayTipo["A"] = "Ação de Sell IN";
    arrayTipo["B"] = "Ação de Sell Out";
    arrayTipo["C"] = "Ação de Marketing";
    arrayTipo["D"] = "Tipo de Ação - Anúncio, exposição, ação de Trade.";
    arrayTipo["E"] = "Outros";

    var tr = document.createElement('tr');
    tr.appendChild(newTd(arrayTipo[pn.pn_tipoVerba]));
    //tr.appendChild(newTd(prodCod.value));
    tr.appendChild(newTd(pn.pn_produto_desc));
    tr.appendChild(newTd(pn.pn_produtosAcao));
    tr.appendChild(newTd(pn.pn_descricao));
    tr.appendChild(newTd(pn.pn_quant));
    tr.appendChild(newTd(pn.pn_valor));
    tr.appendChild(newTd(pn.pn_preco));
    return tr;
}
function newTd(text) {
    var nTD = document.createElement('td');
    nTD.textContent = text;
    return nTD;
}

function buscaDadosForm(nrebate) {
    if (nrebate) {
        var cs1 = DatasetFactory.createConstraint('pn_nRebate', nrebate, nrebate, ConstraintType.MUST);
        var cs2 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
        var dsForm = DatasetFactory.getDataset('form_tactical_rebate', null, new Array(cs1, cs2), null);
        return dsForm.values;
    } else {
        return new Array();
    }
}

function buscaDadosPaiFilho(tbName, docId, docVersion, formPai) {
    //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
    var c1 = DatasetFactory.createConstraint("tablename", tbName, tbName, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("metadata#id", docId, docId, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("metadata#version", docVersion, docVersion, ConstraintType.MUST);
    var constraintsFilhos = new Array(c1, c2, c3);
    var dsFilhos = DatasetFactory.getDataset(formPai, null, constraintsFilhos, null);
    return dsFilhos.values;
}
//função para bloquear campos do formulario
function setDivReadOnly(ids) {
    $.each(ids, function (key, value) {
        $("#" + value).find("input[type='text'],input[type='date'],input[type='number']").attr("readonly", "readonly");
        $("#" + value).find("textarea").attr("readonly", "readonly");
        $("#" + value).find("input[type='text'],input[type='date'],input[type='number']").addClass("ReadOnly");
        // $("#"+value).find("input[type='button']").hide();
        $("#" + value).find("input[type='checkbox']").attr("disabled", "true");
        $("#" + value).find("button").hide();
        $("#" + value).find("img").hide();
        $("#" + value).find('.esconde').hide();
        $("#" + value).find('.desabilita').attr('disabled', true);
        $("#" + value).find('#adicionarLinha').hide();
        $("#" + value).find("select").each(function () {
            var val = $(this).find("option[selected]").text();
            $(this).parent().append($("<input class='ReadOnly form-control' readonly='readonly' value='" + val + "'/>"));
            $(this).hide();
        });
    });
}

function changeAprov() {
    // var element =  $('[name=aprov]:checked');
    if( $('[name=aprov]:checked').val() == "P"){
	    var pnDivAprov = document.querySelector(".pnDivAprov");
        $(pnDivAprov).show();
    }else{
        var pnDivAprov = document.querySelector(".pnDivAprov");
        $(pnDivAprov).hide();
    }
    
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
    let qtd = $('#pn_quantAprov').val();
    pr = (pr.trim() != '') ? semCaractere(pr, ',') : 0;
    qtd = (qtd.trim() != '') ? qtd : 0;
    pr =  parseFloat(pr);
    qtd = parseFloat(qtd);
    let total = pr * qtd;
    $('#pn_valorAprov').val(total.toFixed(2));

}




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


// function montaTablePNum(dsFilhos) {
//     // pega todas as linhas da tabela
//     var tbody = document.querySelector('.tbPn');

//     dsFilhos.forEach(function (PN) {
//         var tr = newTrPN(PN);
//         tbody.appendChild(tr);
//     });

// }