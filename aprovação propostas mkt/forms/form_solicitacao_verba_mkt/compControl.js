// controle competencias
function addcompetencia(){
    $("#compDiv").append(nCompetenciaHtml());
    $("#compDiv").find(".compMes").last().append(getMesOpts());
    MaskEvent.init();
}

function removeComp(e){
    if(confirm("Remover Competência?")){
        console.log('here boa')
        $(e).closest('.comp').remove();
    }
}

function showSavedComps(){
    $("#addCompDiv").hide()
    listComps = getSavedComps();
    listComps.forEach(comp => {
        $("#compDiv").append(htmlSavedComp(comp));
    });
}


function saveComps(){
    var aComps = getAllCompsForm()
    $("#jsonComps").val(JSON.stringify(aComps));
    return testaSave();
}

function getAllCompsForm(){
    var aComps =[];
    var comps = $('.comp');
    $(comps).each((k,v) => {
        var ano = $(v).find("#compAno").val();
        var mes = $(v).find("#compMes").val();
        var valor = $(v).find("#compValor").val();
        aComps.push(getOBjCompetencia(ano,mes,valor));
    });
    return aComps;
}
function validaSomaComps(){
    var total = $("#valor").val() ? parseFloat($("#valor").val()) : 0;
    var status = $("#status").val();
    var isOk = false;
    if(total){
        var aComps = getAllCompsForm();
        var somaComps = 0;
        for (const camp in aComps) {
            if (aComps.hasOwnProperty(camp)) {
                var { valor } = aComps[camp];
                somaComps  = parseFloat(valor) + somaComps;
            }
        }
        if(status == "reversao"){
            isOk = (somaComps <= total);
        }else{
            isOk = (somaComps == total);
        }

    }
    return isOk;
}

function  testaSave(){
    return getSavedComps() ? true : "Erro ao salvar competências";
}

function getSavedComps(){
    var a = $("#jsonComps").val();
    var obj = JSON.parse(a);
    return obj;
}
function getOBjCompetencia(ano,mes,valor){
    return  {ano,mes,valor};
}
function listaMes(){
    var listMes = [];
    listMes[01] = 'Janeiro';
    listMes[02] = 'Fevereiro';
    listMes[03] = 'Março';
    listMes[04] = 'Abril';
    listMes[05] = 'Maio';
    listMes[06] = 'Junho';
    listMes[07] = 'Julho';
    listMes[08] = 'Agosto';
    listMes[09] = 'Setembro';
    listMes[10] = 'Outubro';
    listMes[11] = 'Novembro';
    listMes[12] = 'Dezembro';
    return listMes;
}
function getMes(id){
    var meses = listaMes();
    return meses[id];
}
function getMesOpts(selId){
    var meses = listaMes();
    var options = meses.map((v,k) => {
        selected = '';
        if(k == selId){
            selected == 'selected';
        }
       return  `<option value="${k}"  ${selected}>${v}</option>`
    });
    return options.join('');
} 

function nCompetenciaHtml(){
    var competencia = `
    <div class="comp">
        <div class="col-md-4">
            <div class="form-group">
                <label for="compAno">Ano</label>
                <input type="number" name="compAno" id="compAno" class="form-control" required>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label for="compMes">Mês</label>
                <select class="form-control compMes" name="compMes" id="compMes" required>
                </select>
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label for="compValor">Valor</label>
                <input type="text" name="compValor" id="compValor" class="form-control" mask="###9.99" required>
            </div>
        </div>
        <div class="col-md-1">
        <br>
        <button class="btn btn-danger" type="button" onclick="removeComp(this);"><b>X</b></button>
        </div>
    </div>
    `;
    return competencia;
}

function htmlSavedComp(comp){
    var compHtml = `
    <div class="savedComp">
        <div class="col-md-4">
            <div class="form-group">
                <label for="compAno">Ano</label>
                <input type="number" name="compAno" id="compAno" class="form-control" value="${comp.ano}" readonly='readonly'>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label for="compMes">Mês</label>
                <input ype="text" class="form-control" name="compMes" id="compMes"  value="${getMes(comp.mes)}" readonly='readonly'>
                </select>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label for="compValor">Valor</label>
                <input type="text" name="compValor" id="compValor" class="form-control" value="${comp.valor}" readonly='readonly'>
            </div>
        </div>
    </div>
    `
    return compHtml;
}

