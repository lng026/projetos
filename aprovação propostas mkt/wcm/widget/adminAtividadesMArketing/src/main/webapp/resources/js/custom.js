function getAllAtividades(){
    var dsAtividades = new DatasetModel('form_atividades_mkt');
    dsAtividades.identificador ='documentId';
    // dsAtividades.addContraint('','',1,false);
    dsAtividades.getDatasetFilter();
    dsAtividades.updatedValueEvent = res => {
        if(res){
            console.log(res);
            var tbAtvBody = $("#tbAtvBody");
            res.content.values.forEach(element => {
                addPrevs(element,tbAtvBody);
            });
        }else{
            FLUIGC.toast({
                title: '',
                message: "Impossível Recuperar lista de atividades.",
                type: 'danger'
            });
        }
        
    }

}





function addPrevs(obj,destino){
    if(obj){
        var tr =  document.createElement('tr');
        tr.classList.add("trAtv");
        Object.keys(obj).forEach( k => {
            if(k){
                // $("#"+k+"___"+id).val(obj[k]);
                $(tr).append(getTdInputhtml(k,obj[k]))
            }
        });
        destino.append(tr);
    }
}




function getTdInputhtml(id,valor){
    return `<td><input type='text' class='form-control ${id}' name="${id}" value="${valor}"></td>`;
}



function trataPercent(value){
    let p = 0;
    if(value){
        value = value.replace('%','');
        value = value.replace(',','.');
        value = value.trim();
        p = parseFloat(value);
    }
    return p;
}

function trataValor(value){
    let p = 0;
    if(value){
        value = value.replace('\"','');
        value = value.replace('R','');
        value = value.replace('$','');
        value = value.replace('.','');
        value = value.replace(',','.');
        value = value.trim();
        p = parseFloat(value);
    }
    return p;
}
