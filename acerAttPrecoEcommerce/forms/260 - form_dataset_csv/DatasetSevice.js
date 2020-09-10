class DatasetService{
    dsId;
    fields;
    constructor(dsId){
        this.dsId = dsId;
        this.fields = [];

    }
    
    buscarDados(cons,fields){
        var dados = {
            "name": this.dsId, 
            "fields" : fields, 
            "constraints" : cons,
            "order" : []};
        return this.fetchDataset(dados);
    }

    fetchDataset(data){
        var url = '/api/public/ecm/dataset/datasets';
        return fetch(url, {
            headers : {'Content-type' : 'application/json'},
            method: 'post',
            body : JSON.stringify(data)
        })
        .then(res => this._isOk(res))
        .then(res =>res.json())
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
