var MyWidget = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: function() {
        $("#btnSearch").on('click',function(){    
            searchValues(loadValues);
        });

        $(document).ready(function(){
            carregaUsuarios();
            areasSolicitantes();
            selectTipoDoc();
			campoAreaSolicitante(areasSolicitantes());

        });
   },
  
    //BIND de eventos
    bindings: {
        local: {
            'execute': ['click_executeAction']
        },
        global: {}
    },
 
    executeAction: function(htmlElement, event) {
    }

});

