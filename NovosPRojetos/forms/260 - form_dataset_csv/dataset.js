var dsService = null;
var currentDsService = function(){
    if(!dsService){
        let campos = {'colleaguePK.colleagueId': 'ID','colleagueName': 'Colaborador','mail' : 'Email'}
        var dest = "#tableResult";
        dsService = new DatasetService('colleague',campos,'colleaguePK.colleagueId',dest);
    }
    return dsService;
}
var dsColleague= null;
$(document).ready(function(){
 dsColleague = new DatasetModel('colleague',"#tableResult");
   
    dsColleague.fieldsView = {'colleaguePK.colleagueId': 'ID','colleagueName': 'Colaborador','mail' : 'Email'};
    dsColleague.identificador ='colleaguePK.colleagueId';
    dsColleague.getDataset();
});

//------------------------CSV-------------------------//
// Monta o 'corpo' do arquivo CSV
function geraCSV(ds) {
    var str = '';

    var objArray = ds.values;
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
   var header = '';
    body = '';
    var cont = 0;
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ';'
            line += array[i][index];
            if(!cont){
                if (header != '') header += ';'
                header += index;
            }
        }
        cont++;
        body += line + '\r\n';
    }
    str += header  + '\r\n';
    str += body;
    return str;
}

// Consulta o dataset e gera um link para download do arquivo CSV montado pela geraCSV
function exportCSV() {
    var dsName = $("#ds_name").val();

    var ds = DatasetFactory.getDataset(dsName, null, null, null);

    var a = document.createElement('a');
    // a.href = 'data:attachment/csv,' + encodeURIComponent(geraCSV(ds));
    a.href = 'data:attachment/csv,' + escape(geraCSV(ds));
    a.target = '_blank';
    a.innerText = "CLIQUE PARA EXPORTAR O CSV";
    a.download = dsName+'.csv';
    $("#divRel").append(a);
    return true;

}

function getColleagues(){
    // let destino = document.querySelector('body');
    // dsService.getDataset(destino).catch(e => {
    //     alert(e);
    // });
    dsService.buscarDados([]);
}
function teste(){
    // htmlConstraint("colleagueName","admin",2,true)
    var a = {
        "name": "colleague", 
        "fields" : [], 
        "constraints" : [],
        "order" : []};
    ;
    var url = 'https://acer.fluig.com/api/public/ecm/dataset/datasets';
   return  fetch(url, {
        headers : {'Content-type' : 'application/json'},
        method: 'post',
        body : JSON.stringify(a)
    }).then(res => res.json())
    .catch(res => {throw new Error('Não foi possivel buscar o dataset \n' + res)});
}
 


function tableTemplate(values,fields,identifier){
    let a = `
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Busca Dataset</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" style=" max-height:200px;overflow:auto;">
        <table class="table table-hover table-striped table-responsive-sm">
                <thead>
                    <tr>${fields.map(e => `<th>${e}</th>`).join('')}</tr>
                </thead>
        <tbody>
        ${values.map(val => `
            <tr id="${val[identifier] ?val[identifier] : '' }">
                    ${fields.map(f =>`<td>${val[f]}</td>`).join('')}
            </tr>`).join('')}
            </tbody></table></div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
        </div>
    </div>`;
    return a;
}

function showModal(){
    console.log("showmodal");
    // var meuModal = FLUIGC.modal({
    //     title: 'Teste',
    //     id: 'fluig-modal',
    //     size:'large',
    //     actions: [{
    //         'label': 'Save',
    //         'bind': 'data-open-modal',
    //     },{
    //         'label': 'Cancel',
    //         'bind': 'data-open-modal',
    //         'autoClose': true
    //     }]
    // });
    currentDsService().getDataset([]);
    
}

/*
 ${fields.map(e => {
                    console.log(e);
                    `<th>${e}</th> `
                })}

---------------
                 ${fields.map(f => {
                `<td>${val[f]}</td>`
            })}
                */