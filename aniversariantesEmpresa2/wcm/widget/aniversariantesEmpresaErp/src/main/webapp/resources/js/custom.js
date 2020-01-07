function retornaData(parametro) {
	var mascara = parametro != null ? parametro.replace(/(\d{4})(\d{2})(\d{2})/g,'\$1/\$2/\$3') : new Date();
	var todayTime = new Date(mascara);
	return todayTime;
}

function formataData(parametro) {
	var todayTime = new Date(parametro);
	var month = todayTime.getMonth() + 1;
	var day = todayTime.getDate();
	var dayr = day < 10 ? "0" + day : day;
	var monthr = month < 10 ? "0" + month : month;
	var year = todayTime.getFullYear();
//	return dayr  + "/" + monthr + "/" + year;
	return dayr  + "/" + monthr;
}

var date_sort_desc = function (date1, date2) {
	if (date1 > date2) return -1;
	if (date1 < date2) return 1;
	return 0;
};
  
var date_sort_asc = function (date1, date2) {
	if (date1 > date2) return 1;
	if (date1 < date2) return -1;
	return 0;
};

var dateAdmissAsc = function(d1,d2){
	if (retornaData(d1['CDTADMISSA']).getDate() > retornaData(d2['CDTADMISSA']).getDate()) return 1;
	if (retornaData(d1['CDTADMISSA']).getDate() < retornaData( d2['CDTADMISSA']).getDate()) return -1;
	return 0;
}


// $(document).on("ready", function () {
function buscarAniversariantes(){
	var funcionarios = new DatasetService().buscarDados('dsTodosFuncionarios',[])
	.then(res => { 
		if(res.content.values.length){
			var funValues = res.content.values;
			funValues.sort(dateAdmissAsc);
			exibeAniversariantesMes(funValues);
		}else{
			exibeMsgSemAniversariantes();
		}
		return res.content.values; })
	.catch(msg => {
		exibeMsgErro();
		console.log(msg); });
}
	
// });

function exibeAniversariantesMes(funcionarios){
	$("#aniversariantes").html("");
	for(i = 0; i < funcionarios.length; i++){
		if (funcionarios[i]['CNOME'] != "" && retornaData(funcionarios[i]['CDTADMISSA']).getMonth() == retornaData().getMonth()) {
			var html = '<div class="media">';
			html += '<a class="pull-left fs-no-text-underline" href="#">';
			html += '	<div class="panel panel-default">';
			html += '		<div class="panel-body">';
			html += '				<span class="label label-info small">'+ retornaData(funcionarios[i]['CDTADMISSA']).getFullYear() +'</span><br>  <!-- hoje -->';
			html += '			<h3>';
			html += '						'+ formataData(retornaData(funcionarios[i]['CDTADMISSA'])) +'  <!-- hoje -->';
			html += '			</h3>';
			html += '		</div>';
			html += '	</div>';
			html += '</a>';
			html += '<div class="media-body">';
			html += '<div class="media">';
			html += '		<a class="pull-left" href="#">';
			html += '			<img class="fluig-style-guide thumb-profile thumb-profile-sm media-object img-circle userImage" src="data:image/png;base64,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" alt="Teste da Silva" width="40">';
			html += '		</a>';
			html += '		<div class="media-body">';
			html += '			<h4 class="media-heading"><br>' + funcionarios[i]["CNOME"] + '</h4>';
			html += '		</div>';
			html += '	</div>';
			html += '</div>';
			html += '</div>';
			$("#aniversariantes").append(html);
		}
	}
}

function exibeMsgErro(){
	$("#aniversariantes").html("");
	var html = '<div class="alert alert-warning" role="alert">Não foi possível buscar os aviversariantes da empresa.</div>'
	$("#aniversariantes").append(html);
}
function exibeMsgSemAniversariantes(){
	$("#aniversariantes").html("");
	var html = '<div class="alert alert-info" role="alert">Não temos aniversariantes da empresa no mês atual.</div>'
	$("#aniversariantes").append(html);
}