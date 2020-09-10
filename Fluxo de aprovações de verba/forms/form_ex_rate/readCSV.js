var aIdsGerentes = [];
var tableName = 'tbExRate';
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
    reader.readAsText(file,'windows-1252');
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
    aLine.splice(0,1);
    aLine.forEach(function(element){
       let cols = element.split(';');
       if(cols.length > 0){
        let nObj  = getObjPrev(cols);
            addPrevs(nObj);
        }
    });

}


function getObjPrev(colunas){
    let obj =  null;
    if (colunas){
        obj = {
            mat_cost: colunas[0].trim(),
            os_cost: colunas[1].trim(),
            piscofins: colunas[2].trim(),
            month: colunas[3].trim()
        };
    }
    return obj;
}

function addPrevs(obj){

    if(obj){
        let id = wdkAddChild(tableName);
        Object.keys(obj).forEach( k => {
            if( k == 'mat_cost' || k == 'os_cost' || k == 'piscofins'){
                $("#"+k+"___"+id).val(trataValor(obj[k]));
            }else{
                $("#"+k+"___"+id).val(obj[k]);
            }
        });
        // $("#atividade___"+id).val(obj.atividade);
        // $("#regra___"+id).val(obj.regra);
        // $("#campo___"+id).val(obj.campo);
        // $("#obrigatorio___"+id).val(obj.obrigatorio);
        // $("#habilitado___"+id).val(obj.habilitado);
        // $("#vazio___"+id).val(obj.vazio);
        // $("#visivel___"+id).val(obj.visivel);
    }
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
    let res = 0;
    if(value){
        value = value.replace(',','.');
        value = value.trim();
        res = parseFloat(value);
    }
    return res;
}