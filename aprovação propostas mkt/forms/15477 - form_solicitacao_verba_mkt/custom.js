


$(document).ready(function(){
	setDateTime();
    preencheAtividades();
    camposObrigatorios();
    regrasForm();
    mostrarHistorico();
});
$(document).on("keypress", ".input-group:has(input:input, span.input-group-btn:has(button.btn)) input:input", function(e){
    if (e.which == 13){
        $(this).closest(".input-group").find("button.btn").click();
    }
});

function preencheAtividades(){
    var jsonAtividades = $("#jsonAtividade").val();
    var  listaAtividades = '';
    if(jsonAtividades){
        listaAtividades =  JSON.parse(jsonAtividades);
    }else{
        // var dsAtividades = getAtividades();
        // listaAtividades = JSON.parse(dsAtividades[0].listaAtividades);
        var listaAtividades = getAtividades();
        if(listaAtividades){
            $("#jsonAtividade").val(JSON.stringify(listaAtividades,'UTF-8'));
        }
    }
    preencheCbAtividades(listaAtividades);
}

function getAtividades(){
    var dsRes = DatasetFactory.getDataset('form_atividades_mkt', null, null, null);
    return dsRes.values;
}
function preencheCbAtividades(values){
    var idAtv = $("#idAtividade").val();
    values.forEach(e => {
        var nopt = document.createElement('option');
        nopt.value = e.idAtividade;
        nopt.textContent = e.categoria+" - "+e.descricao;
        nopt.setAttribute('categoria',e.categoria);
        nopt.selected = (idAtv == e.idAtividade);
        $("#selAtividade").append(nopt);
        
    });
}
function attCategoriaProj(e){
    var tgt = e.selectedOptions[0];
    $("#categoria").val(tgt.getAttribute('categoria'));
    $("#idAtividade").val(tgt.value);
}

// showDsFornecedores('fornecedor','CNOME');

function showDsFornecedores(formField, dsField){
	var dsColleague = new DatasetModel('acerFornecedores',"#result");
	dsColleague.title = "Consulta de Fornecedores"
	dsColleague.fields = ['CCODIGO','CNOME','CCGC'];
	dsColleague.fieldsView = {'CCODIGO': 'Codigo','CNOME': 'Nome','CCGC' : 'CNPJ'};
	dsColleague.fieldsFilter = [dsField];
	dsColleague.identificador ='CCODIGO';
	// dsColleague.addContraint('active',true,1,false);
	dsColleague.filter = $("#"+formField).val();
	dsColleague.selectedItemEvent = (items) => {
        // console.log(items);
        var forn = items[0];
        $("#idFornecedor").val(forn.CCODIGO);
        $("#fornecedor").val(forn.CNOME);
	}
	dsColleague.showModal();
}

function setDateTime(){
	var dateTime = FLUIGC.calendar('.date', {
		pickDate: true
	});
}




// function exibeArquivosPasta(){
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
function exibeDadosForn(){
    var strdados = $("#jsonDadosForn").val();
    if(strdados){
        var objD = JSON.parse(strdados);
        var { idFolder, finalizarExecucao, observacoes, documentId  } = objD;
        $("#finalizarExecucao").text(finalizarExecucao == "1" ? "Sim":"Não");
        $("#fornObs").text(observacoes);
        exibeArquivosPasta(idFolder);
    }
}


function exibeArquivosPasta(idFolder){
    var dsProposta = new DatasetModel('dsListDocFolder');
    dsProposta.identificador ='parentDocumentId';
    dsProposta.addContraint('parentDocumentId',idFolder,1,false);
    dsProposta.getDatasetFilter();
    dsProposta.updatedValueEvent = res => {
        console.log(res);
        exibirArquivos(res);
    }
}
function exibirArquivos(arquivos){
    $("#arquivosForn").show();
    if(arquivos.length){
        $("#ulArquivos").html('');
        arquivos.forEach(e => {
            $("#ulArquivos").append(`<li class="list-group-item" onClick="downloadArquivo(${e['documentPK.documentId']})">${e.documentDescription}<span class="badge">
                <i class="fluigicon fluigicon-download icon-xs"></i></span></li>`);
        });
    }  
}

function downloadArquivo(doc){
    var cLink = gerarLinkArquivo(doc);
    if(cLink){
        window.open(cLink);
    }
}


function gerarLinkArquivo(idDoc) {
	var link;
	var url = '/api/public/2.0/documents/getDownloadURL/' + idDoc;
	var obj = {};
	var params = JSON.stringify(obj);

	$.ajax(url, {
		async: false,
		method: 'GET',
		dataType: 'json',
		contentType: 'application/json',
		data: params,
		success: function (data) {
			link = data.content;
		}, error: function (e) {
			console.log(e);
		},
	});

	return link;
}


