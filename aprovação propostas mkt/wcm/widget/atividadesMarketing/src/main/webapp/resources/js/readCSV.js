var aIdsGerentes = [];
var tableName = 'tbAtividades';
$(document).ready(function(){
    $("#fileCSV").on('change', handleFileSelect);
});

function handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];
    var r =  /\.(CSV)$/;
    if(r.test(file.name.toUpperCase())){
        readfile(file);
    }else{
        FLUIGC.toast({title: 'Por Favor:', message: 'Envie um arquivo no formato CSV (.csv)', type: 'warning'});
    }

}

function readfile(file){
    var reader = new FileReader();
    // reader.readAsText(file,'windows-1252');
    reader.readAsText(file,'utf8');
    reader.onload = function(event){
        var csv = event.target.result;
       // console.log(csv);

        adicionaPrevs(csv);
    };
}

function adicionaPrevs(data){
    var aLine = data.split(/\r?\n|\r/);
    // var estruct = aLine[0].split(';');
    // console.log(estruct);
    var aEmail = []
    var objList = []
    var tbAtvBody = $("#tbAtvBody");
    aLine.splice(0,1);
    aLine.forEach(function(element){
       let cols = element.split(';');
       if(cols.length >= 4){
            let nObj  = getObjPrev(cols);
            objList.push(nObj);
            addPrevs(nObj,tbAtvBody);
        }
    }); 
    // salva lista como json
    $("#listaAtividades").val(JSON.stringify(objList));

}


function getObjPrev(colunas){
    let obj =  null;
    if (colunas){
        obj = {
            tipo:colunas[0].trim(),
            categoria: colunas[1].trim(),
            idAtividade: addZero(colunas[2].trim()),
            descricao: colunas[3].trim(),
            valorPlanejato: trataValor(colunas[4].trim()).toFixed(2),
            mes:colunas[5].trim(),
            quarter:colunas[6].trim(),
            ano:colunas[7].trim(),
            status:colunas[8].trim(),
        };
    }
    return obj;
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


function getAllTrs(){
   var objList = [];
    var tbAtvBody = $("#tbAtvBody").find(".trAtv");
    $(tbAtvBody).each((i,e) => {
        obj = {
            tipo: $(e).find(".tipo").val(),
            categoria: $(e).find(".categoria").val(),
            idAtividade: $(e).find(".idAtividade").val(),
            descricao: $(e).find(".descricao").val(),
            valorPlanejato: $(e).find(".valorPlanejato").val(),
            mes:$(e).find(".mes").val(),
            quarter:$(e).find(".quarter").val(),
            ano:$(e).find(".ano").val(),
            status:$(e).find(".status").val(),
        }
        obj['codAtividade'] = createCodeAtv(obj.idAtividade,obj.ano,obj.mes);
        objList.push(obj);
    });
    return objList;
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

// remove despesa
var delDesp = function(el){
    fnWdkRemoveChild(el);
}


function addZero(n){
    var nn;
    if(n < 10){
        nn = "0"+ n.toString();
    }else{
        nn = ""+ n.toString();

    }
    return nn;
}