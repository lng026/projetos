var aIdsGerentes = [];
var tableName = 'tdLineup';
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
            prod_code: colunas[0].trim(),
            prod_family: colunas[1].trim(),
            prod_source: colunas[2].trim(),
            prod_model: colunas[3].trim(),
            prod_cpu:colunas[4].trim(),
            prod_mem:colunas[5].trim(),
            prod_hdd:colunas[6].trim(),
            prod_odd:colunas[7].trim(),
            prod_os:colunas[8].trim(),
            prod_color:colunas[9].trim(),
            prod_graphics:colunas[10].trim(),
            prod_cpu_model:colunas[11].trim(),
            prod_display:colunas[12].trim(),
            prod_dim:colunas[13].trim(),
            prod_pallet:colunas[14].trim(),
            prod_ean:colunas[15].trim(),
            prod_ncm:colunas[16].trim()
        };
    }
    return obj;
}

function addPrevs(obj){

    if(obj){
        let id = wdkAddChild(tableName);
        Object.keys(obj).forEach( k => {
            $("#"+k+"___"+id).val(obj[k]);
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
