function salvaHistorico(aprovField,obsFieldId){
	var uid = $("#userAtual").val();
	var usuario  = getUserName(uid);
	var dtHist = dateHToString(new Date());
	var aprovHist = $("#"+aprovField).val() == "1" ? "Aprovado" : "Reprovado";
	var obsHist = $("#"+obsFieldId).val();
	addHistTable(usuario,dtHist,aprovHist,obsHist)
}

function addHistTable(user, data,aprov,obs){
	var iHist = wdkAddChild('tbHistorico');
	$("#usuario___"+iHist).val(user);
	$("#dtHist___"+iHist).val(data);
	$("#aprovHist___"+iHist).val(aprov);
	$("#obsHist___"+iHist).val(obs);
    return  iHist ;
}

function mostrarHistorico(){
	$("#divHistorico").html('');
	$('.histLinha').each(function(){
		var u = $(this).find('.usuario').val();
		var d = $(this).find('.dtHist').val();
		var a = $(this).find('.aprovHist').val();
		var o = $(this).find('.obsHist').val();
		
		var hist = "";
		if(u && a && d){
			hist = getHistStr(u,a,d,o);
		}

		if(hist){
			if($("#divHistorico").html() != ''){
				$("#divHistorico").append('<hr>');
			}
			$("#divHistorico").append(hist);
		}		
		
	});
	if($("#divHistorico").html() != ''){
		$("#showHist").show();
	}
}

function getHistStr(usuario,Aprovado,data,obs){
		var str = '<div class="media-heading-text">';
		str += '<h5><strong><span class="wrap-element-popover">'+usuario+'</span></strong>';
		str += '<span> - '+Aprovado+'</span></h5>';
		str += '<h6>'+data+'</h6>';
		str += '<p>'+obs+'</p></div>';
		return str;
}

function getUserName(id){
	var name = null;
	var c1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', id, id, ConstraintType.MUST);
	var dsColleague = DatasetFactory.getDataset('colleague', null, new Array(c1), null);
	if(dsColleague.values.length){
		name = dsColleague.values[0]['colleagueName'];
	}
	return name;
}