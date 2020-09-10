


$(document).ready(function(){
	setDateTime();
    preencheAtividades();
    camposObrigatorios();
    $("#valor").mask("#,##0.00", {reverse: true});
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


// -------------------------------------------
// Custom Validade
function customValidadeBefore(numState, nextState){
    var validate = true;
	return validate;
}
function customValidadeAfter(numState, nextState){
    var validate = true;
    if(numState <= 4){
		if(validaSomaComps()){
			validate = saveComps();
		}else{
			validate = "A Soma de Competências difere do valor total da proposta.";
		}

	}
	return validate;
}


function salvarForm() {
    var retorno =   beforeSendValidate(0,5);
    if(retorno == true){
    // //   var fieldList = cardFildListFromForm();
    //   //   iniciarAtividade(fieldList);
    //   var formObj = ObjFromForm();
    // //   "targetState": 5,
    //     // "targetAssignee": "Inicio",
    //     // "subProcessTargetState": 0,
    //   var formData = {
    //     "comment": "",
    //     "formFields": formObj
    //   }
    //  var res =  fetchApi(formData);
    //  res.then((result) => {
    //      console.log(result);
    //  }).catch((err) => {
    //     console.log(err);
    //  });
    }else{
        FLUIGC.toast({
            title: '',
            message: retorno,
            type: 'danger'
        });
    }
  }

  async function fetchApi(data){
    var url = '/process-management/api/v2/processes/Aprovacao_verbas_marketing/start';
    return await fetch(url, {
        headers : {'Content-type' : 'application/json'},
        method: 'POST',
        body : JSON.stringify(data)
    })
    .then(res => res.json())
    .catch(res =>res.statusText);
}
function fetchApiGet(){
    var url = '/api/public/v2/processes';
    return fetch(url, {
        headers : {'Content-type' : 'application/json'},
        method: 'get'
    })
    .then(res => res.json())
    .catch(res =>res.statusText);
}


  

function ObjFromForm(){
    var aFields = ['idAtividade','selAtividade','categoria','idFornecedor','fornecedor','projeto',
                    'descricao','status','valor','alocaFundo','prazoEstimado','invoice',
                'observacoes','jsonComps'];
    var aCons = {};
    aFields.forEach(campo => {
        aCons[campo] =$(`#${campo}`).val();
    });
    return aCons;
}

function cardFildListFromForm(){
    var aFields = ['idAtividade','selAtividade','categoria','idFornecedor','fornecedor','projeto',
                    'descricao','status','valor','alocaFundo','prazoEstimado','invoice',
                'observacoes','jsonComps'];
    var aCons = [];
    aFields.forEach(campo => {
        aCons.push(jsonCarfFieldCons(campo, $(`#${campo}`).val()));
    });
    return aCons;
}

// cria objeto para constraint
function jsonCarfFieldCons(field,value){
    return JSON.stringify({field: field,value:value});
}


function iniciarAtividade(constraints){
    var dsProposta = new DatasetModel('dsStartProcess');
    dsProposta.identificador = 'success';
    dsProposta.addContraint('processId','Aprovacao_verbas_marketing');
    constraints.forEach(c => {
        dsProposta.addContraint('campo',c);
    });
    dsProposta.getDatasetFilter();
    dsProposta.updatedValueEvent = res => {
        if(res){
            console.log(res);
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
