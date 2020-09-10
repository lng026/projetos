var MyWidget = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: function() {
        p1 = $("#idDoc").val();
        if(p1 != '0' && isFinite(p1)){
            console.log(p1);
            listarAtividades(p1);
            listasPropostas([DatasetModel.getConstraint('idAtividade',p1,1,false)]);
        }else{
            listarAtividades();
            listasPropostas();
        }
    },
  
    //BIND de eventos
    bindings: {
        local: {
            'execute': ['click_executeAction']
        },
        global: {}
    },
 
    executeAction: function(htmlElement, event) {
    }

});

function listasPropostas(lCons){
    var propostas = getPropostas(lCons);
        propostas.then(res => {
            preencheTableAtividades(res);
       });
}
function attFiltros(a){
    var consList = [];
    var fatv = $("#fAtividade").val();
    var fsts = $("#fStatus").val();
    if(fatv != "0"){
        consList.push(DatasetModel.getConstraint('idAtividade',fatv,1,false));
    }
    if(fsts != "0"){
        consList.push(DatasetModel.getConstraint('status',fsts,1,false));
    }
    listasPropostas(consList);

}
// -----------------------------------------------------
function listarAtividades(selected){
    var dsAtividades = getAtividades();
    dsAtividades = dsAtividades.sort(sortID);
    preencheCbAtividades(dsAtividades,selected);
}

preencheTableAtividades = (atv) => {
    var tbody = $("#tbdyAtividades");
    $(tbdyAtividades).html('');
    atv.forEach(a => {
        $(tbody).append(htmlTrAtividade(a));
    });
}


function preencheCbAtividades(values,selected){
    values.forEach(e => {
        var nopt = document.createElement('option');
        nopt.value = e.idAtividade;
        nopt.textContent = e.categoria+" - "+e.descricao;
        nopt.selected = (selected == e.idAtividade);
        // nopt.setAttribute('categoria',e.categoria);
        $("#fAtividade").append(nopt);
    });
}

function getAtividades(){
    var dsRes = DatasetFactory.getDataset('form_atividades_mkt', null, null, null);
    return dsRes.values;
}


// time stamp unix
function getTimeStampSec(){
	return Math.floor(+new Date() / 1000)
}

function sortID(a,b){
    a = parseInt(a.idAtividade);
    b = parseInt(b.idAtividade);
    if(a > b) return 1;
    if(a < b) return -1;
    if(a == b) return 0;
}


getPropostas = (lCons) => {
    var dsProposta = new DatasetModel('form_solicitacao_verba_mkt');
    if(lCons){
        dsProposta.constraints = dsProposta.constraints.concat(lCons);
    }

    dsProposta.identificador ='numSolicitacao';
    dsProposta.addContraint('userSecurityId','admin',1,false);
    return dsProposta.getDatasetSync();
}




htmlTrAtividade = (a) =>{
    return `
        <tr class="trAtividades" id="${a.documentid}" >
            ${htmlTrAtvTds(a)}
        </tr>
    `;
}
htmlTrAtvTds = (a) => {
 
    return `${getTdSolLinkhtml("numSolicitacao",a.numSolicitacao)}
            ${getTdSpanhtml("projeto",` ${a.projeto}`)}
            ${getTdSpanhtml("descricao",` ${a.descricao}`)}
            ${getTdSpanhtml("prazoEstimado",` ${a.prazoEstimado}`)}
            ${getTdSpanhtml("status",`${getStatus(a.status)}`)}
            ${getTdSpanhtml("valor",` ${a.valor}`)}
            ${getTdSpanhtml("atvAtual",` ${getAtvAtual(a.atvAtual)}`)}
            ${tdActionsHtml(a.documentid)}`;
}


htmlTrAtvEditTds = (a) =>{
    return `
            ${getTdInputhtml("tipo",a.tipo,"Tipo")}
            ${getTdInputhtml("categoria",a.categoria,"Categoria")}
            ${getTdInputhtml("idAtividade",`${a.idAtividade}`,"ID")}
            ${getTdInputhtml("descricao",`${a.descricao}`,"Descrição")}
            ${getTdInputhtml("valorPlanejato",parseFloat(a.valorPlanejato).toFixed(2),"Planejado")}         
            ${getTdInputhtml("mes",a.mes,"Mês")}
            ${getTdInputhtml("quarter",a.quarter,"Quarter")}
            ${getTdSelecthtml("status",a.status,getStatus(),"Status")}
            ${tdActionsHtml(a.documentid)}`
}

function getStatus(status,k){
    var aStatus = [];
    aStatus['provisao'] = "Provisão";
    aStatus['reversao'] = "Reversão";
    status = status.replace('ã','a').toLowerCase();
    if (status && k){
        return aStatus.indexOf(status);
    }
    else if(status){
        return aStatus[status];
    }else{
        return aStatus;
    }
}

function getTdInputhtml(id,valor,label){
    return `<td>
                ${label ? getLabelhtml(id,label):''}
                <input type='text' class='form-control ${id}' name="${id}" value="${valor}">
            </td>`;
}
function getTdSpanhtml(id,valor){
    return `<td><span class="${id}" >${valor}</span></td>`;
}
function getTdSolLinkhtml(id,valor){
    return `<td><a href="/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=${valor}" target="_blank"><span class="${id}" >${valor}</span></a></td>`;
}

function getLabelhtml(f,valor){
    return `<label for="${f}" >${valor}</label>`;
}

function getTdSelecthtml(id,value,options,label){
    return `<td>
        ${label ? getLabelhtml(id,label):''}
        <select type='text' class='form-control ${id}' name="${id}">
        ${options.map((v,i) =>{
            return `${getSelOpt(i,v,(i ==  value))}`
        })}
        </select>
    </td>`;
}
function tdActionsHtml(a){
    return `
    <td>
        <!-- Single button -->
        <div class="btn-group actions">
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
            Ações <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" role="menu">
                <li><a href="#" "> - </a></li>
            </ul>
        </div>
        <div class="btn-group salvar" style="display:none;">
                <a href="#" onclick="salvarDadosAtividade(${a});" class="btn btn-primary">Salvar</a>
            </ul>
        </div>
    <td>
    `;
    // <li class="divider"></li>
    // <li><a href="#">Separated link</a></li>
    // <span class="fluigicon fluigicon-fileedit icon-sm"></span>
    // <span class="fluigicon fluigicon-remove-circle icon-sm"></span>
    // <div class="btn-toolbar" role="toolbar"></div>
}


function getAtvAtual(id,all){
    var atvs = [];
    atvs[0] = 'Início';
    atvs[4] = 'Início';
    atvs[5] = 'Análise';
    atvs[12] = 'Aprovação da área';
    atvs[25] = 'Aprovar Pagamento';
    atvs[50] = 'Integração';
    atvs[52] = 'Verificar';
    atvs[17] = 'Alinhar com Fornecedor';
    atvs[45] = 'Aguardando prova de execução';
    atvs[19] = 'Aprovar  execução';
    atvs[19] = 'Aprovar  execução';
    atvs[31] = 'Fim';
    atvs[24] = 'Fim';
    var ret = '';
    if(id){
        ret =  atvs[id];
    }
    if(all){
        ret = atvs;
    }
    return ret;

}