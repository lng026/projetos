
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

function saveDados(){
   var lista = getAllTrs();
   lista.forEach(atividade => {
      var campos = cardFildListFromObj(atividade);
      createFormData(campos);
   });
}


function createFormData(campos){
    var dsProposta = new DatasetModel('createFormData');
    dsProposta.identificador ='success';

    dsProposta.addContraint('parentDocumentId','15479',1,false);
    campos.forEach(campo => {
        dsProposta.addContraint('campo',campo,1,false);  
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



// cria objeto para constraint
function jsonCarfFieldCons(field,value){
    return JSON.stringify({field: field,value:value});
}
