//------------------------CSV-------------------------//
//Monta o 'corpo' do arquivo CSV
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

//Consulta o dataset e gera um link para download do arquivo CSV montado pela
//geraCSV
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


function showModal(){
	var dsColleague = new DatasetModel('colleague',"#result");
	dsColleague.title = "Consulta de usuários da plataforma"
	dsColleague.fields = ['colleaguePK.colleagueId','colleagueName','mail','login'];
	dsColleague.fieldsView = {'colleaguePK.colleagueId': 'ID','colleagueName': 'Colaborador','mail' : 'Email'};
	dsColleague.identificador ='colleaguePK.colleagueId';
	dsColleague.addContraint('active',true,1,false);
	dsColleague.filter = $("#nome").val();
	dsColleague.selectedItemEvent = (items) => {
		if(items.length){
			item = items[0];
			$("#nome").val(item.colleagueName)
			$("#email").val(item.mail)
			$("#login").val(item.login)
		}
	}
	dsColleague.showModal();
}
