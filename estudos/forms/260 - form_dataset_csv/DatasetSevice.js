class DatasetService{
    model;
    constructor(model){
        this.model = model;
    }
    
   function  buscarDados(cons){
        var dados = {
            "name": cons, 
            "fields" : [], 
            "constraints" : [],
            "order" : []};
        return this.fetchDataset(dados);
    }

    function fetchDataset(data){
        var url = '/api/public/ecm/dataset/datasets';
        return fetch(url, {
            headers : {'Content-type' : 'application/json'},
            method: 'post',
            body : JSON.stringify(data)
        }).then(res => this._isOk(res))
        .then(res =>res.json()
         )
        .catch(res =>res.statusText);
    }

    function  _isOk(response) {
        if(response.ok){
            return response;
        }else{
            throw new Error(response.statusText);
        }
        
    }
}
