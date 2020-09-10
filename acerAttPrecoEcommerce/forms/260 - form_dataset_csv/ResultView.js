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
