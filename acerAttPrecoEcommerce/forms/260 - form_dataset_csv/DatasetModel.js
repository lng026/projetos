class DatasetModel {
	constraints;
	dados;
	destino;
	fields;
	fieldsView;
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
			Object.keys(this.fieldsView).forEach((k) => {
				vieWconstraints.push(this._htmlConstraint(k, this.filter,2, true));
			});
		}
		this.getDataset(vieWconstraints);
		
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
	selectedItemEvent = (selectedItem) => {
		console.log(selectedItem);
	}
	showModal(){
		this.modal = FLUIGC.modal({
				id: 'fluig-modal',
				title: this.title,
				size:'large',
				content:"<div id='result'></div>"
			},(err, data) => {
				this.getDatasetFilter();
		});
	}

 
}



// function getTemplateModal(){
// return `
// <script type="text/template" id="tmplModal">
// <div class="row">
// <div class="col">
// <div class="input-group">
// <input type="text" class="form-control" name="filtroNome" id="filtroNome"
// placeholder="Digite e pressione 'Enter' para pesquisar">
// <span class="input-group-btn">
// <button class="btn btn-success" type="button" onclick="carregaDatasetBTN();"
// id="btnPesquisar" >Pesquisar!</button>
// </span>
// </div>
// </div>
// </div>
// <div class="row">
// <div class="col scroll">
// <table class="table table-hover table-striped" id="tableModal">
// <thead>
// </thead>
// <tbody>
// </tbody>
// </table>
// </div>
// </script>
// <script type="text/template" id="tmplLinhaTbody">
// {{#data}}
// <td>{{.}}</td>
// {{/data}}
// </script>
// <script type="text/template" id="tmplLinhaThead">
// {{#data}}
// <th>{{.}}</th>
// {{/data}}
// </script>
// </div>`;
// }
