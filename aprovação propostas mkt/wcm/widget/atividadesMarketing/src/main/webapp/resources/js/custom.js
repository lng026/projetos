function saveDados(){
   var lista = getAllTrs();
   if(lista.length){
        lista.forEach(atividade => {
            var campos = cardFildListFromObj(atividade);
            createFormData(campos);
        });
   }else{
    FLUIGC.toast({
        title: '',
        message: "Necessário adicionar ao menos uma atividade.",
        type: 'danger'
    });
   }
  
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
function createCodeAtv(id,a,m){
    var code = `${a}${addZero(getCodMes(m))}${addZero(id)}`;
    return code;
}

function getCodMes(m){
    var codMes = 0;
    var meses = [];
    meses['janeiro'] = 1;
    meses['fevereiro'] = 2;
    meses['marco'] = 3;
    meses['abril'] = 4;
    meses['maio'] = 5;
    meses['junho'] = 6;
    meses['julho'] = 7;
    meses['agosto'] = 8;
    meses['setembro'] = 9;
    meses['outubro'] = 10;
    meses['novembro'] = 11;
    meses['dezembro'] = 12;
    if(m){
        m = m.toString().toLowerCase().trim();
        m = semAcentos(m);
        codMes = meses[m];
    }
    return codMes
}

function semAcentos(str){
    str = str.replace(/[ÀÁÂÃÄÅ]/g,"A");
    str = str.replace(/[àáâãäå]/g,"a");
    str = str.replace(/[ÈÉÊË]/g,"E");
    str = str.replace(/[èéêë]/g,"e");
    str = str.replace(/[ç]/g,"c");
    str = str.replace(/[òóôõö]/g,"o");
    str = str.replace(/[ÒÓÔÕÖ]/g,"O");
    return str;
}