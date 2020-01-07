
function buscaNfes(){
    var cgcForn = getFornSel();
    if(cgcForn){
        var Nfes = getDataset(cgcForn);
        Nfes.sort(sortCNOTAFISCAL);
        if(Nfes.length){
            for (var i = 0; i < Nfes.length; i++) {
                var e = Nfes[i];
                addLinhaNfe(e);
            }
        }
    }
}

function getFornSel(){
    var cgcForn =  document.querySelector("#cCgcForn").value;
    if(cgcForn == undefined || cgcForn.trim() == ""){
        FLUIGC.toast({title: 'Aviso', message: 'Por favor, selecione um fornecedor.', type: 'warning'});	
    }
    return cgcForn;
}

// Altera visualização do campos de nfes de acordo com tipo do documento
$(document).ready(function(){
    $("[name=docTipo]").on('change',function(ev){
        input = ev.target.value;
        console.log('value:');
        console.log(input);

        if(input.trim() == "TAX"){
            $("#listaNFEs").show();
            $("#docNumTitDiv").hide();
            $("#docNumTit").val('');
        }else{
            $("#listaNFEs").hide();
            $("#docNumTitDiv").show();
        }
        

        
    });
})


// funcao do botao para dicionar nova linha nfe
function addNFeTable(){
    var a = wdkAddChild('tableNFE');
    return  a;
}

//remove filho
function delNfeLinha(e){
    fnWdkRemoveChild(e);
    attValTotal();
}
var aplicaMasks = function(){
	var inputs = $("[mask]");
	// var inputs = $(".maskValor");
	MaskEvent.initMask(inputs);
}



//funcao que busca nfes no dataset que faz integracao com protheus
function getDataset(ccgc){
    var c1 = DatasetFactory.createConstraint('CCGC', ccgc, ccgc, ConstraintType.MUST);
    var ds = DatasetFactory.getDataset('dsChaveNFE', null, new Array(c1), null);
    return ds.values;
}

function addLinhaNfe(oNfe){
    if(oNfe){
        var n = addNFeTable();
        $("#docChNfe___"+n).val(oNfe["CCHAVENFE"]);
        $("#docSerieNfe___"+n).val(oNfe["CSERIENOTA"]);
        $("#docValorNfe___"+n).val(oNfe["NVALOR"]);
        $("#docNNFE___"+n).val(oNfe["CNOTAFISCAL"]);

        $("#docChNfe___"+n).attr("readonly","readonly");
        $("#docSerieNfe___"+n).attr("readonly","readonly");;
        $("#docValorNfe___"+n).attr("readonly","readonly");
        $("#docNNFE___"+n).attr("readonly","readonly");
        attValTotal();
    }
}

function addLinhaNfeZoom(selectedItem){
    if(selectedItem){
        var n = addNFeTable();
        $("#docChNfe___"+n).val(selectedItem.CCHAVENFE);
        $("#docSerieNfe___"+n).val(selectedItem.CSERIENOTA);
        $("#docValorNfe___"+n).val(selectedItem.NVALOR);
        $("#docNNFE___"+n).val(selectedItem.CNOTAFISCAL);

        $("#docChNfe___"+n).attr("readonly","readonly");
        $("#docSerieNfe___"+n).attr("readonly","readonly");;
        $("#docValorNfe___"+n).attr("readonly","readonly");
        $("#docNNFE___"+n).attr("readonly","readonly");
        attValTotal();
    }
}



function sortCNOTAFISCAL(a,b){
    if ( parseInt(a["CNOTAFISCAL"]) < parseInt(b["CNOTAFISCAL"])) return -1;
    if ( parseInt(a["CNOTAFISCAL"]) > parseInt(b["CNOTAFISCAL"])) return 1;
    return 0;
}

//atualiza valor total
function attValTotal(){
    var total = document.querySelector('#ValTitulo');
    var totalLiq = document.querySelector('#ValLiqTitulo');
    var aValNfe = document.querySelectorAll(".docValorNfe");
    var nValue = 0.00;
    for (var i = 0; i < aValNfe.length; i++) {
        var input = aValNfe[i];
        if(input.value){
            var valor  = trataValor(input.value);
            nValue = parseFloat(nValue) + parseFloat(valor);
        }
    }
    // console.log(aValNfe);
    total.value = nValue.toFixed(2);
    totalLiq.value = nValue.toFixed(2);
    aplicaMasks();
}

function trataValor(valString){
    //retira virgulas
    valString = semCaractere(valString, ',');
    var valFloat = parseFloat(valString);
    return valFloat.toFixed(2);

}
