
var zoomRebate = function () {
    //	console.log('abacaxi');
    // var id = $(el).attr('id');
    // var fil = $('#' + field).val();
    // var fil = document.querySelector('#inputBuscaRebate');
    // if (fil.trim() == '' || fil.length < 3) {
    //     FLUIGC.toast({ title: 'Busca:', message: 'Por favor, Digite ao menos as 3 primeiras letras da descrição do produto.', type: 'warning' });
    //     return 0;
    // }

    //openZoom(title, dataset, fields, resultFields, type, filters)
    openZoom("Solicitação Tactical Rebate", "datasetRebate", 
    "wkNumProces,Solicitacao,pn_nRebate,Rebate,pn_solicitante,Solicitante,pn_cli_razao,Cliente,pn_valor,Valor", 
    "wkNumProces,pn_nRebate,pn_solicitante,pn_cli_razao,pn_valor", 'nrebate', []);
}

//abertura de zoom em uma janela separada
function openZoom(title, dataset, fields, resultFields, type, filters) {
    openZoomWindowParam(title, dataset, fields, resultFields, type, filters);
}
/**
 * @Overload de openZoom
 * Abre janela de zoom.
 * + @param windowParams: Parâmetros da janela de zoom.
 */
function openZoomWindowParam(title, dataset, fields, resultFields, type, filters) {
    var windowParams = "status , scrollbars=no ,width=800, height=350 , top=0 , left=0";
    var zoomURL = "/webdesk/zoom.jsp?datasetId=" + dataset + "&dataFields=" + escape(fields) + "&resultFields=" + resultFields + "&type=" + type + "&title=" + title + (filters ? "&filterValues=" + filters : "");
    window.open(zoomURL, "zoom", windowParams);
}
//função que pega retorno do item selecionado no zoom
function setSelectedZoomItem(selectedItem) {
    console.log(selectedItem);
    var tip = selectedItem.type != undefined ? selectedItem.type : selectedItem.inputName;
    var arrayTipo = tip.split(',');
    switch (arrayTipo[0]) {
        case 'nrebate':
            var ifc = arrayTipo[1];
            $('#inputBuscaRebate').val(selectedItem.pn_nRebate);
            buscaDados(selectedItem.pn_nRebate);
            break;
        default:
        break;
    }
}
