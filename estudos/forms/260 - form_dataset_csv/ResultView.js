class ResultView  {
    constructor(destino) {
        this._destino = destino;
        this._elemento = document.querySelector(destino);
        if(this._elemento){
           this.addListeners();
        }
    }
    update(model) {
        if(!this._elemento){
            this._elemento = document.querySelector(destino);
            this.addListeners();
        }
        this._elemento.innerHTML = this.template(model);
        
    }
    template(res) {
        if (!res.dados.length){
            return '<p>Nenhum dado</p>';
        }
        return `
        <input type="text"id="dsFilter" class="form-control">
        <table class="table table-hover table-striped table-responsive-sm">
                    <thead>
                        <tr>${Object.values(res.fieldsView).map(e => `<th>${e}</th>`).join('')}</tr>
                    </thead>
            <tbody>
            ${res.dados.map(val => `
                <tr id="${val[res.identificador]}" class="linhaDr">
                        ${Object.keys(res.fieldsView).map(f => `<td>${val[f]}</td>`).join('')}
                </tr>`).join('')}
                </tbody></table></div>`;
    }
    addListeners(){
        // evento click - exibe id da linha selecionada
        this._elemento.addEventListener('click', function(e) {
            console.log(e);
            let tgt = e.target;
            if(tgt.nodeName == "TD"){
                let tr = tgt.parentNode;
                alert(tr.id);
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
    }
}
