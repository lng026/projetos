// Atividades
var analise = 5;
var aprovacao = 12;
var alinhamento = 17;
var aprovExec = 19;
var aprovPag = 25;
var integracao = 24;

function regrasForm(){
    var atv = $("#atvAtual").val();
    if(parseInt(atv)> 4){
        showSavedComps();
    }
    // analise
    if(atv == analise){
        setDisableDiv('formData');
        exibeDivs(['aprovAnalisediv']);
        $("#aprovAnalise").on("change",function(){
            valObrAprov('aprovAnalise','aprovAnaliseObs');
        });
    }
    // Aprovação da área
    if(atv == aprovacao){
        setDisableDiv('formData');
        setDisableDiv('aprovAnalisediv');
        exibeDivs(['aprovAnalisediv','aprovdiv']);
        $("#aprov").on("change",function(){
            valObrAprov('aprov','aprovObs');
        });
    }
 
    if(atv == aprovExec){
        setDisableDiv('formData');
        setDisableDiv('aprovAnalisediv');
        setDisableDiv('aprovdiv');
        setDisableDiv('alinhaObsdiv');
        exibeDivs(['aprovAnalisediv','aprovdiv','alinhaObsdiv','aprovExecdiv']);
        $("#aprovExec").on("change",function(){
            valObrAprov('aprovExec','aprovExecObs');
        });
        var invInput = 'invoice'
        // var invInput = document.querySelector("#invoice");
        setDesabilitado(invInput,false);
        setObrigatorio(invInput,true);
        camposObrigatorios();
        exibeDadosForn();
    }

    if(atv == aprovPag){
        setDisableDiv('formData');
        setDisableDiv('aprovAnalisediv');
        setDisableDiv('aprovdiv');
        // setDisableDiv('alinhaObsdiv');
        // setDisableDiv('aprovExecdiv');
        exibeDivs(['aprovAnalisediv','aprovdiv','aprovPagdiv']);
        $("#aprovPag").on("change",function(){
            valObrAprov('aprovPag','aprovPagObs');
        });
    }
    if(atv == alinhamento){
        setDisableDiv('formData');
        setDisableDiv('aprovAnalisediv');
        setDisableDiv('aprovdiv');
        setDisableDiv('aprovPagdiv');
        exibeDivs(['aprovAnalisediv','aprovdiv','alinhaObsdiv','aprovPagdiv']);
    }


}
function salvaHistoricoAtividade(){
    var atv = $("#atvAtual").val();
    if(atv == analise){
        salvaHistorico('aprovAnalise','aprovAnaliseObs','Análise');
    }
    if(atv == aprovacao){
        salvaHistorico('aprov','aprovObs','Aprovação da área');
    }
    if(atv == aprovExec){
        salvaHistorico('aprovExec','aprovExecObs','Aguardar/aprovar  execução');
    }
    if(atv == aprovPag){
        salvaHistorico('aprovPag','aprovPagObs','Aprovar Pagamento');
    }
}