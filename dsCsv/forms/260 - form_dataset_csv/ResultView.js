class ResultView extends View {
    constructor(elemento) {
        super(elemento);
        // elemento.addEventListener('click', function(event) {
        //     if(event.target.nodeName == 'TH')
        //         currentInstance().ordena(event.target.textContent.toLowerCase());    
        // });

       elemento.addEventListener('click', function(e) {
            console.log(e);
            let tgt = e.target;
            if(tgt.nodeName == "TD"){
                let tr = tgt.parentNode;
                alert(tr.id);
            }
        });
        elemento.addEventListener("change", e => {
           let vFilter  =  e.target.value;
           if(e.target.nodeName == 'INPUT'){
                currentInstance().resultado.filtra(vFilter);
           }
         
        })
    }
    template(res) {
        if (!res.getDados().length){
            return 'Nenhum dado';
        }
        return `
        <input type="text"id="dsFilter" value="${res.filtro}" class="form-control">
        <table class="table table-hover table-striped table-responsive-sm">
                    <thead>
                        <tr>${Object.values(res.fields).map(e => `<th>${e}</th>`).join('')}</tr>
                    </thead>
            <tbody>
            ${res.getDados().map(val => `
                <tr id="${val[res.identificador]}">
                        ${Object.keys(res.fields).map(f => `<td>${val[f]}</td>`).join('')}
                </tr>`).join('')}
                </tbody></table></div>`;
    }
}
