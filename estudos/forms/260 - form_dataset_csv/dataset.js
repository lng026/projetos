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

async function teste(){
    // htmlConstraint("colleagueName","admin",2,true)
    var a = {
        "name": "colleague", 
        "fields" : [], 
        "constraints" : [],
        "order" : []};
    ;
    try {
    	let url = "/api/public/ecm/dataset/datasets";
	    var res = await  fetch(url, {
	        headers : {'Content-type' : 'application/json'},
	        method: 'post',
	        body : JSON.stringify(a)
	    }).then(e=>e.json());
	    
		    res.content.values.forEach(dado => console.log(dado));
	    
	    
	} catch (e) {
		console.log(e);
		throw new Error('Não foi possivel buscar o dataset \n' + res.statusText);
	}

}

function showModal(){
    console.log("showmodal");
     var meuModal = FLUIGC.modal({
         title: 'Teste',
         id: 'fluig-modal',
         content: '',
         size:'large',
         actions: [{
             'label': 'Save',
             'bind': 'data-open-modal',
         },{
             'label': 'Cancel',
             'bind': 'data-open-modal',
             'autoClose': true
         }]
     });
//    currentDsService().getDataset([]);
    
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