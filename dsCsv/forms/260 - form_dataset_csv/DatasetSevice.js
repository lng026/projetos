class DatasetService{
    resultado = null;
    constructor(idDataset, campos, identificador,destino){
        this.resultado = new Bind(new DatasetModel(idDataset,campos,identificador),
         new ResultView(destino),'getDados','setDadosView');
    }

    getDataset(destino){
        return this.buscarDados([])
        .then(res => { 
            this.resultado.setDados(res.content.values);
            var modelHtml =  this._template(this.resultado);
            destino.innerHTML += modelHtml;})
        .then( () => {
            $("#exampleModal").modal();
    });
    }

    ativaEventos(){
        $(".modal-body").on('click', function(e) {
            console.log(e);
            let tgt = e.target;
            if(tgt.nodeName == "TD"){
                let tr = tgt.parentNode;
                alert(tr.id);
            }
        });
        $("#dsFilter").on("focusout", e =>{
           let vFilter  =  e.target.value;
           var filtro = this.resultado.filter(linha =>{
               return  linha.colleagueName.indexOf(vFilter) > -1;
           })
            this._template(filtro);
        });
    }

    buscarDados(cons){
        // htmlConstraint("colleagueName","admin",2,true)
        var dados = {
            "name": "colleague", 
            "fields" : [], 
            "constraints" : cons,
            "order" : []};
        ;
        return this.fetchDataset(dados)
        .then( res => {
            this.resultado.setDados(res.content.values);
            return res.content.values;
        })
    }

    fetchDataset(data){
        var url = '/api/public/ecm/dataset/datasets';
        return fetch(url, {
            headers : {'Content-type' : 'application/json'},
            method: 'post',
            body : JSON.stringify(data)
        }).then(res => res.json())
        .catch(res =>res.statusText);
    }


    _template(res){
        let a = `
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog  modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Busca Dataset</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" style=" max-height:200px;overflow:auto;">
            <div class="row">
				<input type="text"id="dsFilter" class="form-control">
            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
            </div>
        </div>`;
        return a;
    }
}
// proxy factory
class ProxyFactory {
    
    static create(objeto, props, acao) {
     
        return new Proxy(objeto, {
                
                get(target, prop, receiver) {
                    
                    if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
                        
                        return function() {
                            let retorno = Reflect.apply(target[prop], target, arguments);
                            acao(target);
                            return retorno;
                        }
                    }
                    
                    return Reflect.get(target, prop, receiver);
                },
                
                set(target, prop, value, receiver) {
                    
                    let retorno = Reflect.set(target, prop, value, receiver);
                    if(props.includes(prop)) acao(target);
                    return retorno;
                }
        });
    }
    
    static _ehFuncao(func) {
        
        return typeof(func) == typeof(Function);
    }
}
// proxy factory
// Bind
class Bind {
    
    constructor(model, view, ...props) {
        
        let proxy = ProxyFactory.create(model, props, model => 
            view.update(model));
            
        view.update(model);
        
        return proxy;
    }
}

