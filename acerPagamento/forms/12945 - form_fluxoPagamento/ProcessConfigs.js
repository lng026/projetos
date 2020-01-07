class ProcessConfigs {

    properties = null;

    constructor(){
        // instacia da classe com configurações do processo
        this.properties = new ProcessProps();
    }

    // retorna lista de atividade
    getAtividadesLista = function(id){
        if(id != null){
            var atv = '';
        }else{
            return this.properties.atividades;
        }

    }
    // define atividade atual
    setAtvCorrente = function(id){
        if(id && id != "0"){
            for (var key in this.properties.atividades) {
                if (this.properties.atividades.hasOwnProperty(key)) {
                    var atividade = this.properties.atividades[key];
                    if(atividade.id == id){
                        this.properties.atividades[key].atual = true;
                    }
                }
            }
        }else{
            for (var key in this.properties.atividades) {
                if (this.properties.atividades.hasOwnProperty(key)) {
                    var atividade = this.properties.atividades[key];
                    if(atividade.inicial){
                        this.properties.atividades[key].atual = true;
                    }
                }
            }
        }
        
        // this.properties.atividades.forEach( atividade =>  {
        //     if(atividade.id == id){
        //         atividade.atual = true;
        //     }
        // });
    }
    // retorna dados da atividade atual
    getAtvCorrente = function(){
        var atv = null;
        for (var key in this.properties.atividades) {
            if (this.properties.atividades.hasOwnProperty(key)) {
                var atividade = this.properties.atividades[key];
                if(atividade.atual){
                        atv =  atividade;
                        break;
                    }
            }
        }
        // this.properties.atividades.forEach(atividade => {
        //     if(atividade.atual){
        //         atv =  atividade;
        //         return;
        //     }
        // });
        return atv;
    }
    // retorna lista de campos obrigatorios
    getCamposObrigatorios = function(){
        if(this.properties.camposObrigatorios.hasOwnProperty(this.getAtvCorrente().codigo)){
            return this.properties.camposObrigatorios[this.getAtvCorrente().codigo];
        }else{
            return [];
        }

    }
    getCamposBloqueados = function(){
        if(this.properties.camposBloqueados.hasOwnProperty(this.getAtvCorrente().codigo)){
            return this.properties.camposBloqueados[this.getAtvCorrente().codigo];
        }else{
            return [];
        } 
    }
    getCamposEscondidos = function(){
        if(this.properties.camposEscondidos.hasOwnProperty(this.getAtvCorrente().codigo)){
             return this.properties.camposEscondidos[this.getAtvCorrente().codigo];
        }else{
            return [];
        } 
    }
    //retorna divs exibidas na atividade
    getDivsActividade = function(){
        if(this.properties.divsAtividade.hasOwnProperty(this.getAtvCorrente().codigo)){
            return this.properties.divsAtividade[this.getAtvCorrente().codigo];
       }else{
           return [];
       } 
    }
}

