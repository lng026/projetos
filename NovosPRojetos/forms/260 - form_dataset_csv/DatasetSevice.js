class DatasetService{
    model = null;
    constructor(model){
        this.model = model;
    }
  
    buscarDados(cons){
        // htmlConstraint("colleagueName","admin",2,true)
        var dados = {
            "name": this.model.id, 
            "fields" : [], 
            "constraints" : cons,
            "order" : []};
        return this.fetchDataset(dados);
    }

    fetchDataset(data){
        var url = '/api/public/ecm/dataset/dastasetsss';
        return fetch(url, {
            headers : {'Content-type' : 'application/json'},
            method: 'post',
            body : JSON.stringify(data)
        }).then(res => this._isOk(res))
        .then(res => res.json())
        .catch(res =>res.statusText);
    }

    _isOk(response) {
        if(response.ok){
            return response;
        }else{
            throw new Error(response.statusText);
        }
        
    }
}
