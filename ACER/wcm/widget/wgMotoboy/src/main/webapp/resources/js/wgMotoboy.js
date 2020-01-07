var wgMotoboy = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: function() {
        console.log("jsChamado");
        FLUIGC.calendar('.date',{language: 'pt-br'});

    },
  
    //BIND de eventos
    bindings: {
        local: {
        'exibe-relatorio': ['click_exibeRelatorio']
        },
        global: {}
    },
 
    exibeRelatorio: function(htmlElement, event) {
        var cons = new  Array();
        var filtros = defineFiltros(this.instanceId);
        var cs1 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
        var colunas = new Array('aux', 'bairro', 'barateorig', 'cardid', 'cep', 'cidade', 'comp', 'companyid', 'datan', 'dbairro', 'dcep', 'dcidade', 'dcomp', 'destiatebar', 'destino', 'dist', 'dnumero', 'documentid', 'drua', 'duf', 'id', 'info', 'justi', 'numero', 'origem', 'receptor', 'retira', 'rua', 'solicitante', 'tableid', 'tdist', 'uf', 'version');
        cons.push(cs1);
        cons = cons.concat(filtros);
        var ds = DatasetFactory.getDataset('dsFormMotoboy', colunas,cons , null);
        exportCSV(ds.values,this.instanceId);
    }

});

//exporta csv
function exportCSV(result,insId) {
    var a = document.querySelector('#btnExp'+insId);
    var aSkip = ['metadata#parent_id','metadata#card_index_id','metadata#version','metadata#active','metadata#id','metadata#card_index_version']
    // a.href = 'data:attachment/csv,' + encodeURIComponent(geraCSV(result));
    a.href = 'data:attachment/csv,' + escape(geraCSV(result,aSkip));
    a.target = '_blank';
    a.download = 'report.csv';
    a.classList.remove('disabled');
    return true;

}

 // Monta o 'corpo' do arquivo CSV
 function geraCSV(objArray,aSkipIndex) {
    var str = '';
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
   var header = '';
    body = '';
    var cont = 0;
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if(aSkipIndex.includes(index)){
                continue;
            }
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

function retiraAcento(palavra){  
    var com_acento = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ´`^¨~';    
    var sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC     ';  
    for (l in palavra){  
        for (l2 in com_acento){  
            if (palavra[l] == com_acento[l2]){  
                palavra=palavra.replace(palavra[l],sem_acento[l2]);  
            }  
        }  
    }  
    return palavra;  
}


//monta array com filtros a partir dos campos do form
function defineFiltros(insId){
    var chaves = new Array();
    var de = document.querySelector('#de'+insId);
    var ate = document.querySelector('#ate'+insId);
    if(de.value.trim() != "" && ate.value.trim() != ""){
    var dtCS = DatasetFactory.createConstraint('datan', engDate(de.value),engDate(ate.value), ConstraintType.MUST);
    chaves.push(dtCS);
    }
    return chaves;
}


function engDate(dt){
    var d = dt.split('/');
    var c = d.reverse();
    var a = c.join('-');
    // var b = semCaractere(a,'');
    return a;
}


//remove toda ocorrencia do caractere passado
var semCaractere =  function(valor, c){
	while(valor.indexOf(c) >= 0){
		valor = valor.replace(c,'');
	}
	return valor;
}
