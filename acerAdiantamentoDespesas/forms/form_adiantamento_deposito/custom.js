

$(document).ready(function(){
    //define campos obrigatorios
    camposObrigatorios();
	//valida cpf quando acaba de preencher
	$('#cpf').on('focusout',function(){
		var cpf = $(this).val();
		buscaDados(cpf);
    });
	var atvAtual =  $("#atvAtual").val().trim();
    //Validar preço que será alterado
    if(atvAtual == '5'){
        exibeDivs(['aprovdiv']);
        $("#aprov").on("change",function(){
            valObrAprov('aprov','aprovObs');
        });
    }
    detalhesAdtShow();
	
});
function customValidadeBefore(numState, nextState){
    return true;
}
function customValidadeAfter(numState, nextState){
    return true;
}

var buscaDados = function(cpf){
	var dataset = getFunBycpf(cpf)
	var fun = dataset.values[0];
    if(fun['CAGENCIA'].toUpperCase() !=  'ERRO' && fun['CAGENCIA'].trim() != ''){
		$('#banco').val(fun['CBANCO']);
		$('#agencia').val(fun['CAGENCIA']);
		$('#conta').val(fun['CCONTA']);
		$('#nome').val(fun['CNOME']);
		$('#departamento').val(fun['CDESCCUSTO']);
		$('#centro_custo').val(fun['CCCUSTO']);
		$('.funDados').attr('readonly',true);

    }else{
        FLUIGC.toast({title: 'Dados:', message: 'Não foi possivel encontrar os dados bancarios com o CPF digitado.', type: 'warning'});
        $('#banco').val('');
        $('#agencia').val('');
        $('#conta').val('');
        $('#centro_custo').val('');
        $('#nome').val('');
        $('#departamento').val(fun['CDESCCUSTO']);
        
        $('.funDados').attr('readonly',false);

	}
}
function getFunBycpf(param){
    param = rmChar(rmChar(param,'.'),'-');
	console.log(param);
	var c1 = DatasetFactory.createConstraint("ccgc", param, param, ConstraintType.MUST);
	var cons = new Array(c1);
    var dataset = DatasetFactory.getDataset("dsFuncionario", null, cons, null);
    return dataset;
}




function zoomAdiantamento(){
    var cpf = $("#cpf").val();
	cpf = rmChar(cpf, ".");
	cpf = rmChar(cpf, "-");
    // openZoom("Adiantamento", "dsAdiantamentos",
    //  "num,Codigo,emissao,Data,saldo,Saldo,valor,Valor,xfluig,ID-Fluig","num,emissao,saldo,valor,xfluig" , 'adiantamento',['cgc', cpf] );

    var dsColleague = new DatasetModel('dsAdiantamentos',"#result");
	dsColleague.title = "Adiantamentos do solicitante"
	dsColleague.fields = ['num','emissao','saldo','valor','xfluig'];
	dsColleague.fieldsView = {'num': 'Codigo','emissao': 'Data','saldo' : 'Saldo',  'valor' :'Valor',  'xfluig': 'ID-Fluig'};
    // dsColleague.fieldsFilter = [dsField];
    dsColleague.filter = $("#codAdiantamento").val();
	dsColleague.identificador ='num';
    dsColleague.addContraint('cgc',cpf,1,false);
    
	dsColleague.selectedItemEvent = (items) => {
		if(items.length){
            var adt = items[0];
            $("#jsonAdiantamento").val(JSON.stringify(adt));
            $("#codAdiantamento").val(adt.xfluig);
            detalhesAdtShow();
		}
	}
	dsColleague.showModal();
}
function detalhesAdtShow(){
    var adt = $("#jsonAdiantamento").val();;
    if(!adt){
        return false;
    }else{
        adt = JSON.parse(adt)
    }
    htmlDetails = `<div class="card">
    <div class="card-body">
    <h3 class="card-title">Detalhes do adiantamento</h3>
       <b>Descrição: </b><spam>${adt.hist}</spam><br>
       <b>Vencimento: </b><spam>${trataDateIn(adt.vencimento)}</spam><br>
       <b>Valor: </b><spam>${trataValor(adt.valor)}</spam><br>
       <b>Saldo: </b><spam>${trataValor(adt.saldo)}</spam><br>
    </div>
    </div>`;
    $("#adtDetalhes").append(htmlDetails);
}
// recebe "2019-9-20" - retorna 20/09/2019
function trataDateIn(dt){
    return  new Date(dt).toLocaleString().substr(0,10);
}

var clearAdiantamento = function(){
	$("#codAdiantamento").val('');
	$("#jsonAdiantamento").val('');
}

var rmChar =  function(valor, c){
	while(valor.indexOf(c) >= 0){
		valor = valor.replace(c,'');
	}
	return valor;
}

function trataValor(val){
	if(!val) return 0;
	if(typeof(val) == "string"){
		val = val.trim();
		val = val.replace(',','');
	}
	return parseFloat(val).toFixed(2);

}