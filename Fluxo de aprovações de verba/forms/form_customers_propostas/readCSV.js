var aIdsGerentes = [];
var tableName = 'tbCustomers';
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
       if(cols.length >= 4){
        let nObj  = getObjPrev(cols);
            addPrevs(nObj);
        }
    });

}


function getObjPrev(colunas){
    let obj =  null;
    if (colunas){
        obj = {
            customer: colunas[0].trim(),
            cust_segment: colunas[1].trim(),
            cust_vpc: colunas[2].trim(),
            de_para: colunas[3].trim(),
            cust_state:colunas[4].trim(),
            account1:colunas[5].trim(),
            account2:colunas[6].trim()
        };
    }
    return obj;
}

function addPrevs(obj){

    if(obj){
        let id = wdkAddChild(tableName);
        Object.keys(obj).forEach( k => {
            if( k == 'cust_vpc'){
                $("#"+k+"___"+id).val(trataPercent(obj[k]));
            }else if( k == 'account1' || k == 'account2'){
                $("#"+k+"___"+id).val(obj[k].toUpperCase().trim());
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