class DatasetModel {
	constraints;
	dados;
	destino;
	fields;
    fieldsView;
    fieldsFilter;
	filter;
	id;
	identificador;
	modal;
	title;
	_service;
	_view;
	
	constructor(id,destino) {
	    this.id = id;
	    this.destino = destino;
	    this.dados = [];
	    this.fields = [];
	    this.fieldsView = {};
		this.constraints = [];
		this.title = "";
	    this._view  = new ResultView(this);
		this._service = new DatasetService(this.id);

	}
	
	addContraint(nome, value, type, like){
	    this.constraints.push(this._htmlConstraint(nome, value, type, like));
	}

	_htmlConstraint(nome, value, type, like){
	    let _nome = nome ? nome : "";
	    let _value = value ? value : "";
	    let _type = type ? type : 0;
	    let _like = like ? like : false;
	    // constraints to filter the search, all fields specified inside are
		// required
	   return {"_field" : _nome, // name of the field used in the constraint
	    "_initialValue": _value, // value to be filtered
	    "_finalValue" : _value, // final value to be filtered
	    "_type": _type, // type of the constraint (1 - MUST, 2 - SHOULD, 3 -
						// MUST_NOT)
	    "_likeSearch": _like}; // if it is a LIKE search }]
	}

	getDatasetFilter(filter){
		if(filter != null && filter != undefined){
			this.filter = filter;
		}
		let vieWconstraints = [];
		if(this.filter){
            if(this.fieldsFilter && this.fieldsFilter.length >0){
                this.fieldsFilter.forEach((k) => {
                    vieWconstraints.push(this._htmlConstraint(k, this.filter,2, true));
                });
            }else{
                Object.keys(this.fieldsView).forEach((k) => {
                    vieWconstraints.push(this._htmlConstraint(k, this.filter,2, true));
                });
            }
			
		}
        this.getDataset(vieWconstraints);
        if(this.destino){
            this._view.update(this);
        }
		
	}
	async getDataset(tempCons = []){
		try {
	        var res =  await this._service.buscarDados(this.constraints.concat(tempCons),this.fields);
	        
	        if(!Object.keys(this.fieldsView).length){
	            let aux = {};
	            res.content.columns.forEach(e => {
	                aux[e] = e;
	            });
	            this.fieldsView = this.fields.length ? this.fields : aux;
	        }
            // this.dados = res.content.values;
            this.setDados(res.content.values);
	        // this._view.update(this);
	    } catch (error) {
	        console.log(error);   
	    }
    }
    setDados(d){
        this.dados = d;
        this.updatedValueEvent(this.dados);
    }
	
	updateView(){
	    this._view.update(this.model);
	}
    getRegistro(value,param){
        return this.dados.filter(e => {
            return (e[param ? param : this.identificador] == value)
        });
	}
	selectedItemEvent = (selectedItem) => {
		console.log("selectedItemEvent - nao implementada");
    }
    updatedValueEvent = (values) => {
        console.log("updatedValueEvent - nao implementada");
    }

	showModal(){
		this.modal = FLUIGC.modal({
				id: 'fluig-modal',
				title: this.title,
				size:'large',
				content:"<div id='result'>Buscando...</div>"
			},(err, data) => {
				this.getDatasetFilter();
		});
	}

 
}

// -------------------------------------------------------
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


// ----------------------------
// view
class View {
    constructor(elemento) {
        this._elemento = elemento;
    }
    update(model) {
        this._elemento.innerHTML = this.template(model);
    }
    template() {
        throw new Error('O método template deve ser implementado');
    }
   
}
class ResultView  {
    _destino;
    _elemento;
    
    constructor(dataset) {
        this._destino = dataset.destino;
        this.setDestino(dataset);

    }
    setDestino(dataset){
        this._elemento = document.querySelector(dataset.destino);
    }
    update(model) {
        if(!this._elemento){
            this.setDestino(model);
        }
        this._elemento.innerHTML = this.template(model);
        this.addListeners(model);
    }
    template(res) {
        var htmlStr = `<div class="col-md-12"><div class="input-group">
                        <input type="text" class="form-control" name="dsFilter" id="dsFilter" 
                            onfocus="this.value = this.value;"
                            value="${res.filter}" placeholder="Digite e pressione 'Enter' para pesquisar">
                            <span class="input-group-btn">
                                <div class="btn btn-primary" type="button" id="btnPesquisar" >Buscar!</div>
                            </span>
                            </div></div>`;
        if (!res.dados.length){
            htmlStr += '<div class="row"><div class="col-md-12 text-center"><h3>Nenhum dado encontrado</h3></div></div>';
        }else{
            // Resultado da pesquisa
            htmlStr+= `
            <div class="col-md-12"><hr></div>
            <table class="table table-hover table-responsive-sm text-center">
                <thead>
                    <tr>${Object.values(res.fieldsView)
                        .map(e => `<th class="text-center">${e}</th>`)
                        .join('')}</tr>
                </thead>
            <tbody>
            ${res.dados.map(val => `
                <tr id="${val[res.identificador]}" class="linhaDr">
                    ${Object.keys(res.fieldsView)
                        .map(f => `<td>${val[f]}</td>`).join('')}
                </tr>`).join('')}
            </tbody></table></div>`;
        }
       

        return htmlStr;
    }
    addListeners(model){
        if(!this._elemento){
            return false;
        }
           // evento click - exibe id da linha selecionada
           this._elemento.addEventListener('dblclick', function(e) {
            console.log(e);
            let tgt = e.target;
            if(tgt.nodeName == "TD"){
                let tr = tgt.parentNode;
                var reg = model.getRegistro(tr.id);
                model.selectedItemEvent(reg);
                  // close modal
                  model.modal.remove();
            }
        });
        this._elemento.addEventListener("keyup", e => {
           let vFilter  =  e.target.value;
           if(e.target.nodeName == 'INPUT'){
                $(".linhaDr").each((i,e) =>{
                    if($(e).html().indexOf(vFilter) < 0){
                        $(e).hide();
                    }else{
                        $(e).show();

                    }
                })
                
           }
         
        });

        this._elemento.querySelector("#btnPesquisar").addEventListener("click", e => {
           var fiilter = this._elemento.querySelector("#dsFilter").value
            model.getDatasetFilter(fiilter);
        });

        // seta focus no input de pesquisa
        var dsFilter = this._elemento.querySelector("#dsFilter");
        dsFilter.focus();
        dsFilter.setSelectionRange(dsFilter.value.length,dsFilter.value.length);
        // this._elemento.on("keypress", ".input-group:has(input:input,
		// span.input-group-btn:has(div.btn)) input:input", function(e){
        // if (e.which == 13){
        // $(this).closest(".input-group").find("div.btn").click();
        // }
        // });
        
        
    }
}
