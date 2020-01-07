// ${val[identificador] ?val[identificador] : '' }
class DatasetModel {

    dados = null;
    dadosView = null;
    fields = null;
    identificador = null;
    datasetId = null;
    filtro = '';
    constructor(datasetId,fields,identificador) {
        this.datasetId = datasetId;
        this.dados = [];
        this.dadosView = [];
        this.fields = fields;
        this.identificador = identificador;
    }
    getDados() {
        return this.dadosView;
    }
    setDados(data) {
        this.dados = data;
        this.setDadosView(this.dados);
    }
    setDadosView(dados){
        this.dadosView = dados;
    }
    
    htmlConstraint(nome, value, type, like){
        let _nome = nome ? nome : "";
        let _value = value ? value : "";
        let _type = type ? type : 0;
        let _like = like ? like : false;
        //constraints to filter the search, all fields specified inside are required 
       return {"_field" : _nome, //name of the field used in the constraint 
        "_initialValue": _value, //value to be filtered 
        "_finalValue" : _value, //final value to be filtered 
        "_type": _type, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
        "_likeSearch": _like}; //if it is a LIKE search }]
    }

    filtra(vFilter){
        if(vFilter.trim()){
            this.filtro = vFilter;
            this.setDadosView(this.dados.filter(linha =>
                Object.values(linha).some(e => 
                    e && e.toLowerCase().indexOf(vFilter.toLowerCase()) >= 0
                )) );
        }else{
            this.filtro = '';
            this.setDadosView(this.dados);
        }    
    }
 
}