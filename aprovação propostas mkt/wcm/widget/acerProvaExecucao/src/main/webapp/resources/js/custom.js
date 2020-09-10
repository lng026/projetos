idParentFolder = 15494;

getProposta = () => {
    solicitacao =  $("#idProposta").val();
    var prop = false;
    var dsProposta = new DatasetModel('form_solicitacao_verba_mkt');
    dsProposta.identificador ='numSolicitacao';
    dsProposta.addContraint('numSolicitacao',solicitacao,1,false);
    dsProposta.addContraint('userSecurityId','admin',1,false);
    dsProposta.getDatasetFilter();
    dsProposta.updatedValueEvent = verifProp;
}

verifProp = (dados) => {
    var idForn = $("#idFornecedor").val();
    valForn = false;
    var prop = [];
    if(dados.length){
        prop = dados[0];
        $("#documentId").val(prop.documentid);
        if(idForn == prop.idFornecedor){
            valForn = true;
        }
    }
    if(valForn){
        exibeProposta(prop);
    }
}

salvarDocumento =  () => {
    var valida = validaInvoice();
    if(valida == true){
        saveDocument();
    }else{
        FLUIGC.toast({
            title: '',
            message: valida,
            type: 'danger'
        });
        console.log(valida);
    }
}


removeFile = (id) => {
    let f = getFileById(id);
    if(f.id){
        if(confirm(`Confirmar remoção do arquivo: ${f.file}`)){
            var rmRes = removeDocumentRest(f.id);
            rmRes.then(res => {
                console.log(res);
                if(res.content){
                    if(res.content == "OK"){
                        delFileList(f.id);
                        saveDadosForn();
                        FLUIGC.toast({
                            title: '',
                            message: `${f.file} Removido com sucesso.`,
                            type: 'info'
                        });
                    }
                }
            });   
        }  
    }
    
}








function exibeProposta(proposta){
    $("#dadosProposta").show();
    $("#projeto").text(proposta.projeto);
    $("#descricao").text(proposta.descricao);
    $("#fornecedor").text(proposta.fornecedor);
    $("#status").text(proposta.status);
    if(proposta.prazoExecucao){
        $("#prazo").text(proposta.prazoExecucao);
    }else{
        $("#prazo").text(proposta.prazoEstimado);
    }
    
    var dadosForn = proposta.jsonDadosForn ? JSON.parse(proposta.jsonDadosForn) : null;
    if(dadosForn){
        $("#idFolder").val(dadosForn.idFolder);
        $("#documentId").val(dadosForn.documentId);
        $("#finalizarExecucao").val(dadosForn.finalizarExecucao);
        $("#observacoes").val(dadosForn.observacoes);
        $("#jsonFileList").val(JSON.stringify(dadosForn.fileList));
        if(!dadosForn.idFolder){
            getFolder(proposta.numSolicitacao,idParentFolder);
        }
    }else{
        getFolder(proposta.numSolicitacao,idParentFolder);
    }
    
    var jsonComps = proposta.jsonComps ? JSON.parse(proposta.jsonComps) : null;
    showSavedComps(jsonComps)
    exibeArquivos();
    
}

function getFolder(idProjeto, parentId){
	idFolder = 0;
	var dsProposta = new DatasetModel('dsListDocFolder');
    dsProposta.identificador ='parentDocumentId';
    dsProposta.addContraint('parentDocumentId',parentId,1,false);
    dsProposta.addContraint('documentDescription',idProjeto,1,false);
	dsProposta.getDatasetSync().then(res => {
		if(res.length){
			idFolder = res[0]['documentPK.documentId'];
		}else{
			idFolder = createFolder(idProjeto, parentId);
        }
         $("#idFolder").val(idFolder);
	}).catch(res => {
		console.log(res);
	})

}
exibeArquivos =  () => {
    var fileList = getFileList();
    if(fileList.length){
        $("#ulArquivos").html('');
        fileList.forEach(e => {
            $("#ulArquivos").append(`<li class="list-group-item"> <b>Arquivo:</b> ${e.file} - <b>Invoice:</b> ${e.invoice} ${ htmlRmFileBTN(e.id)}</li>`);
        });
    }else{
        $("#ulArquivos").html('');
        $("#ulArquivos").append(`<li class="list-group-item">Não existem arquivos</li>`);

    }
}

htmlRmFileBTN = (id) => {
    return `<button class="btn btn-danger btn-sm pull-right" type="button" onclick="removeFile(${id});"><b>X</b></button>`;
}
// old - exibe arquivos presentes na pasta
// function exibeArquivos(){
// 	idFolder = $("#idFolder").val();
// 	var dsProposta = new DatasetModel('dsListDocFolder');
//     dsProposta.identificador ='parentDocumentId';
//     dsProposta.addContraint('parentDocumentId',idFolder,1,false);
// 	dsProposta.getDatasetSync().then(res => {
//         exibirArquivos(res);
// 	}).catch(res => {
// 		console.log(res);
// 	})
// }

// function exibirArquivos(arquivos){
//     if(arquivos.length){
//         $("#ulArquivos").html('');
//         arquivos.forEach(e => {
//             $("#ulArquivos").append(`<li class="list-group-item">${e.documentDescription}</li>`);
//         });
//     }  
// }

function saveDadosForn(){
    var documentId = $("#documentId").val();
    var dadosForn = dadosFornecedorObj();
    var dsProposta = new DatasetModel('editFormData');
    dsProposta.identificador ='success';
    dsProposta.addContraint('documentId',documentId,1,false);
    dsProposta.addContraint('campo',jsonCarfFieldCons('jsonDadosForn',JSON.stringify(dadosForn)),1,false);
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

function getCons(name,value){
    return DatasetFactory.createConstraint(name, value, value, ConstraintType.MUST);
}

// cria objeto para constraint
function jsonCarfFieldCons(field,value){
    return JSON.stringify({field: field,value:value});
}

dadosFornecedorObj = () => {
    var dadosForn = {
        idFolder : $("#idFolder").val(),
        documentId:  $("#documentId").val(),
        finalizarExecucao: '1',
        observacoes:  $("#observacoes").val(),
        fileList:  getFileList()
    }
    return dadosForn;
}

validaInvoice = () =>{
    var isOK = true;
    var i = $("#invoice").val();
    var f = getFile();
    if(!f){
        isOK =  "Selecione um arquivo para enviar.";
    }
    invoice = $("#invoice").val();
    var has = fileListHasIn(i,f.name);
    if(has){
        isOK = "Já existe um arquivo com o mesmo nome e invoice";
    }
    return isOK;
}

getFile = () => {
    var e  = document.querySelector('#inputFile');
	if(!e.files[0]){
		return false;
	}else{
        var file = e.files[0];
        return file;
    }
}

fileListHasIn = (i,f) => {
    var fileList = getFileList();
    var has = fileList.some(c =>{
        return (c.invoice == i && c.file == f);
    });
    return has;
}


saveInvoiceFile = (id, fileName) => {
    if(fileName && id){
        invoice = $("#invoice").val() != "" ? $("#invoice").val() : '-';
        addFileList(id,invoice,fileName);
        $("#invoice").val('');
        saveDadosForn();
        exibeArquivos();
    }
}

getFileById = (id) => {
    var fileList = getFileList();
    var file = null;
    for (let i = 0; i < fileList.length; i++) {
        if(fileList[i].id == id){
            file = fileList[i];
            break;
        }
    }
    return file;
}
// files and Invoice List
addFileList = (id,i,f) =>{
    var fileList = getFileList();
    fileList.push(invoiceFiles(id,i,f));
    saveFileList(fileList);
}

delFileList = (id) => {
    var fileList = getFileList();
    var nList = fileList.filter((c,ci,a) => {
        return (c.id != id );
    });
    saveFileList(nList);
}

invoiceFiles = (id,i,f) => {
    return {invoice: i, file:f, id: id};
}

getFileList = () => {
    var fileList = [];
    if($("#jsonFileList").val()){
        fileList = JSON.parse($("#jsonFileList").val());
    }
    return fileList;
}
saveFileList = (fileList) => {
    var isOk = false;
    if(fileList){
        $("#jsonFileList").val(JSON.stringify(fileList)); 
        isOk = true;
    }
    exibeArquivos();
    return isOk;
}
// Lista de invoice com o nome do arquivo 
getInvoiceFile = (f) => {
    var fileList = getFileList();
    var nList = fileList.map((c,ci,a) => {
        if(c.file == f){
            return c.invoice;
        }
    });
    return nList;
}

// exibe competencias
function showSavedComps(listComps){
    if(listComps){
        listComps.forEach(comp => {
            $("#compDiv").append(htmlSavedComp(comp));
        });
    }
   
}


function htmlSavedComp(comp){
    var compHtml = `
    <div class="savedComp">
        <div class="col-md-4">
            <div class="form-group">
                <label for="compAno">Ano</label>
                <input type="number" name="compAno" id="compAno" class="form-control" value="${comp.ano}" readonly='readonly'>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label for="compMes">Mês</label>
                <input ype="text" class="form-control" name="compMes" id="compMes"  value="${getMes(comp.mes)}" readonly='readonly'>
                </select>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label for="compValor">Valor</label>
                <input type="text" name="compValor" id="compValor" class="form-control" value="${comp.valor}" readonly='readonly'>
            </div>
        </div>
    </div>
    `
    return compHtml;
}

function listaMes(){
    var listMes = [];
    listMes[01] = 'Janeiro';
    listMes[02] = 'Fevereiro';
    listMes[03] = 'Março';
    listMes[04] = 'Abril';
    listMes[05] = 'Maio';
    listMes[06] = 'Junho';
    listMes[07] = 'Julho';
    listMes[08] = 'Agosto';
    listMes[09] = 'Setembro';
    listMes[10] = 'Outubro';
    listMes[11] = 'Novembro';
    listMes[12] = 'Dezembro';
    return listMes;
}
function getMes(id){
    var meses = listaMes();
    return meses[id];
}