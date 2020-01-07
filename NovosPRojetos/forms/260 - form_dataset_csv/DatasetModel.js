// ${val[identificador] ?val[identificador] : '' }
class DatasetModel {
    id = null;
    dados = null;
    fields = {};
    fieldsView = {};
    identificador = null;
    _view = null;
    destino = '';
    constraints = [];
    _service
    constructor(id,destino) {
        this.id = id;
        this.dados = [];
        this._view  = new ResultView(destino);
        this._service = new DatasetService(this);
    }
  
    addContraint(nome, value, type, like){
        this.constraints.push(_htmlConstraint(nome, value, type, like));
    }
    _htmlConstraint(nome, value, type, like){
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

    async getDataset(){
        try {
            var res =  await this._service.buscarDados(this.constraints);
        
            if(!Object.keys(this.fieldsView).length){
                let aux = {};
                res.content.columns.forEach(e => {
                    aux[e] = e;
                });
                this.fieldsView = this.fields.length ? this.fields : aux;
            }
            this.dados = res.content.values;
            this._view.update(this);
        } catch (error) {
            console.log(error);
            
        }   
        
        
    }

    updateView(){
        this._view.update(this.model);
    }

    getRegistro(value,param){
        return this.dados.filter(e => {
            return (e[param ? param : this.identificador] == value)
        });
    }

 
}