class DatasetService {

    buscarDados(dsName,cons){
        // htmlConstraint("colleagueName","admin",2,true)
        var dados = {
            "name": dsName, 
            "fields" : [], 
            "constraints" : cons,
            "order" : []};
        return this.fetchDataset(dados);
    }

    fetchDataset(data) {
       console.log('fetchDataset')
    

        var url = '/api/public/ecm/dataset/datasets';
        return   fetch(url, {
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
    
    getHtmlConstraint = (nome, value, type, like) => {
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
}