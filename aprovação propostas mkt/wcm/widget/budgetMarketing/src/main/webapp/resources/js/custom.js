var ATIVIDADES = [];
function listarAtividades(){
    ATIVIDADES = getAtividades();
    ATIVIDADES = ATIVIDADES.sort(sortID);
    preencheTableAtividades(ATIVIDADES);
    setFiltros();
}

preencheSumPlanejados = (atv) => {
    var sumPlan = getSumField('valorPlanejato',atv);
    var sumUtil = getSumField('jsonStatusSaldo',atv);
    var sumSaldo =  sumPlan - sumUtil;
    $("#sumPlanejados").text(sumPlan.toFixed(2));
    $("#sumUtil").text(sumUtil.toFixed(2));
    $("#sumSaldo").text(sumSaldo.toFixed(2));
}
getSumField = (p,atv) => {
    var sum = 0;
    atv.forEach(a => {
        if(a[p] && isFinite(a[p])){
            sum = sum + parseFloat(a[p]);
        }
    });
    return sum;
}

preencheTableAtividades = (atv) => {
    var tbody = $("#tbdyAtividades");
    var sumPlan = getSumField('valorPlanejato',atv);
    $(tbdyAtividades).html('');
    atv.forEach(a => {
        $(tbody).append(htmlTrAtividade(a,sumPlan));
    });
}

htmlTrAtividadeEdit = (a) =>{
    return `
        <tr class="trAtividades" id="${a.documentid}" >
            ${htmlTrAtvEditTds(a)}
        </tr>
    `;
}
htmlTrAtividade = (a,sumPlan) =>{
    return `
        <tr class="trAtividades" id="${a.documentid}" >
            ${htmlTrAtvTds(a,sumPlan)}
        </tr>
    `;
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
            ${tdActionsHtml(a)}`
}

htmlTrAtvTds = (a,sumPlan) => {
    return `${getTdSpanhtml("categoria",a.categoria)}
            ${getTdSpanhtml("descricao",`${a.idAtividade} - ${a.descricao}`)}
            ${getTdSpanhtml("valorPlanejato",parseFloat(a.valorPlanejato).toFixed(2))}         
            ${getTdSpanhtml("jsonStatusSaldo",parseFloat(a.jsonStatusSaldo).toFixed(2))}
            ${getTdSpanhtml("jsonStatusSaldo", parseFloat(parseFloat(a.valorPlanejato) - parseFloat(a.jsonStatusSaldo )).toFixed(2))}
            ${getTdSpanhtml("jsonStatusSaldo", parseFloat((a.valorPlanejato/sumPlan)*100).toFixed(2))}
            ${getTdSpanhtml("status",getStatus(a.status))}
            ${tdActionsHtml(a)}`;
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
                <li><a href="#" onclick="atualizaSaldo(${a.documentid});">Atualizar Saldo</a></li>
                <li><a href="#" onclick="editAtividade(${a.documentid});">Editar</a></li>
                <li><a href="/portal/p/1/lancamentosMarketing/${a.idAtividade}" target="_blank">Lançamentos</a></li>
            </ul>
        </div>
        <div class="btn-group salvar" style="display:none;">
                <a href="#" onclick="salvarDadosAtividade(${a.documentid});" class="btn btn-primary">Salvar</a>
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
function getTdInputhtml(id,valor,label){
    return `<td>
                ${label ? getLabelhtml(id,label):''}
                <input type='text' class='form-control ${id}' name="${id}" value="${valor}">
            </td>`;
}
function getTdSpanhtml(id,valor){
    return `<td><span class="${id}" >${valor}</span></td>`;
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


getListCategorias = (a,atr) => {
    var atrsArray = [];
    a.forEach(e => {
        atrsArray.push(e[atr])
    });
    return atrsArray.filter((elem, index, self) => {
        return index === self.indexOf(elem);
    });
}
setFiltros = () => {
    var aCategorias = getListCategorias(ATIVIDADES,'categoria');
    var aMes = getListCategorias(ATIVIDADES,'mes');
    var aQuarter = getListCategorias(ATIVIDADES,'quarter');
    // var aListaTipo = getListCategorias(ATIVIDADES,'tipo');
    fillSelFiltro('fCategoria',aCategorias);
    fillSelFiltro('fMes',aMes);
    fillSelFiltro('fQuarter',aQuarter);
    fillSelFiltro('fStatus',getStatus());
    preencheSumPlanejados(ATIVIDADES);
}

attFiltros = (target) => {
    var c = $("#fCategoria").val();
    var m = $("#fMes").val();
    var q = $("#fQuarter").val();
    var s = $("#fStatus").val();
    var atvFiltro = ATIVIDADES;
    if(c != '0'){
        atvFiltro = getAtividadesFiltro('categoria',c,atvFiltro);
    }
    if(m != '0'){
        atvFiltro = getAtividadesFiltro('mes',m,atvFiltro);
    }
    if(q != '0'){
        atvFiltro = getAtividadesFiltro('quarter',q,atvFiltro);
    }
    if(s != 'all'){
        atvFiltro = getAtividadesFiltro('status',getStatus(s,true).toString(),atvFiltro);
    }
    preencheTableAtividades(atvFiltro);
    preencheSumPlanejados(atvFiltro)
}

fillSelFiltro = (d,a) =>{
    a.forEach(e => {
        var nopt = getSelOpt(e,e);
        $(`#${d}`).append(nopt);       
    });
}

getSelOpt = (v,t,sel) =>{
    return `<option value="${v}" ${sel ? 'selected':''}>${t}</option>`
}

function getAtividades(){
    var dsRes = DatasetFactory.getDataset('form_atividades_mkt', null, null, null);
    return dsRes.values;
}

getAtividadesFiltro = (f,v,atv) => {
    return atv.filter((elem, index, self) => {
        return v === elem[f];
    });
}

getPropostas = (idAtividade) => {
    var dsProposta = new DatasetModel('form_solicitacao_verba_mkt');
    dsProposta.identificador ='numSolicitacao';
    if(idAtividade){
        dsProposta.addContraint('idAtividade',idAtividade,1,false);
    }
    dsProposta.addContraint('userSecurityId','admin',1,false);
    return dsProposta.getDatasetSync();
}

getSumProposta = (id,propostas) =>{
    var sum = 0;
    propostas.forEach(element => {
        if(element.idAtividade == id){
           var v =  parseFloat(valor);
           sum = sum + v;
        }
    });
    return sum;
}
function getStatus(status,k){
    var aStatus = [];
    aStatus[0] = "Inativo";
    aStatus[1] = "Ativo";
    if (status && k){
        return aStatus.indexOf(status);
    }
    else if(status){
        return aStatus[status];
    }else{
        return aStatus;
    }

}


function atualizaSaldo(id){
    var atividade = getFirstAtivididade('documentid',id);
   var propostas = getPropostas(atividade.idAtividade);
   var sum = 0;
   var lancamentos = [];
   propostas.then(res => {
        res.forEach(prop => {
            var valor = parseFloat(prop.valor);
            sum = sum + valor;
            lancamentos.push(prop.numSolicitacao);
        });
        atualizaStatusSaldo(sum,lancamentos,atividade.documentid);
   });
}

function getFirstAtivididade(campo, valor){
    return getAtividadesFiltro(campo,valor,ATIVIDADES)[0];
}


function atualizaStatusSaldo(novoSaldo,lancamentos, documentid){
    var dsProposta = new DatasetModel('editFormData');
    dsProposta.identificador ='success';
    dsProposta.addContraint('documentId',documentid,1,false);
    dsProposta.addContraint('campo',jsonCarfFieldCons('jsonLancamentos',JSON.stringify(lancamentos)),1,false);
    dsProposta.addContraint('campo',jsonCarfFieldCons('jsonStatusSaldo',novoSaldo),1,false);
    dsProposta.getDatasetFilter();
    dsProposta.updatedValueEvent = res => {
        if(res){
            var response = res[0];
            if(response.success){
                FLUIGC.toast({
                    title: '',
                    message: "Dados Salvos com sucesso.",
                    type: 'info'
                });
            }else{
                FLUIGC.toast({
                    title: '',
                    message: "Não foi possível salvar os dados. Entre em contato com um administrador.",
                    type: 'danger'
                });
            }
        }else{
            FLUIGC.toast({
                title: '',
                message: "Impossível envio dos dados. Entre em contato com um administrador.",
                type: 'danger'
            });
        }
        
    }
    // ).catch(res => {
	// 	console.log(res);
	// }) 
}



function editAtividade(id) {
    // ('.trAtividades') 
    var tr = habilitaEditTr(id,true);
}
function salvarDadosAtividade(id){
    var tr = $(`tr#${id}`);
    var objAtualizado = getObjFromTr(tr);
    aConsAtividade = cardFildListFromObj(objAtualizado);
    atualizaAtividade(id,aConsAtividade);
    var tr = habilitaEditTr(id,false);
   
}

function habilitaEditTr(id,habilita){
    var tr = $(`tr#${id}`);
    console.log(id);
    var atividade = getFirstAtivididade('documentid',id);

    $(tr).find('input').attr('readOnly',!habilita);
    $(tr).find('select').attr('disabled',!habilita);
    if(habilita){
        $(tr).html(htmlTrAtvEditTds(atividade));
        $(tr).find('.actions').hide();
        $(tr).find('.salvar').show();
    }else{
        $(tr).html(htmlTrAtvTds(atividade));
        $(tr).find('.salvar').hide();
        $(tr).find('.actions').show();
    }
    return tr;
}



// cria objeto para constraint
function jsonCarfFieldCons(field,value){
    return JSON.stringify({field: field,value:value});
}




function getAllTrs(){
    var objList = [];
     var tbAtvBody = $("#tbAtvBody").find(".trAtv");
     $(tbAtvBody).each((i,e) => {
         obj = getObjFromTr(e);
         objList.push(obj);
     });
     return objList;
 }

 function getObjFromTr(e){
    var obj = {
        tipo: $(e).find(".tipo").val(),
        categoria: $(e).find(".categoria").val(),
        idAtividade: $(e).find(".idAtividade").val(),
        descricao: $(e).find(".descricao").val(),
        valorPlanejato: $(e).find(".valorPlanejato").val(),
        mes:$(e).find(".mes").val(),
        quarter:$(e).find(".quarter").val(),
        status:$(e).find(".status").val(),
    }
    return obj;
 }

 function cardFildListFromObj(obj){
    var cardList = []
    Object.keys(obj).forEach( k => {
        if(k){
            cardList.push(jsonCarfFieldCons(k,obj[k]));
        }
    });
    return cardList;
}



function atualizaAtividade(documentid, constraints){
    var dsProposta = new DatasetModel('editFormData');
    dsProposta.identificador ='success';
    dsProposta.addContraint('documentId',documentid,1,false);
    constraints.forEach(c => {
        dsProposta.addContraint('campo',c);
    });
    dsProposta.getDatasetFilter();
    dsProposta.updatedValueEvent = res => {
        if(res){
            var response = res[0];
            if(response.success){
                FLUIGC.toast({
                    title: '',
                    message: "Dados Salvos com sucesso.",
                    type: 'info'
                });
            }else{
                FLUIGC.toast({
                    title: '',
                    message: "Não foi possível salvar os dados. Entre em contato com um administrador.",
                    type: 'danger'
                });
            }
            listarAtividades();
        }else{
            FLUIGC.toast({
                title: '',
                message: "Impossível envio dos dados. Entre em contato com um administrador.",
                type: 'danger'
            });
            listarAtividades();
        }
        
    }
    // ).catch(res => {
	// 	console.log(res);
	// }) 
}



// time stamp unix
function getTimeStampSec(){
	return Math.floor(+new Date() / 1000)
}

function sortID(a,b){
    if(a.idAtividade > b.idAtividade) return 1;
    if(a.idAtividade < b.idAtividade) return -1;
    if(a.idAtividade == b.idAtividade) return 0;
}