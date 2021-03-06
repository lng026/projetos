//retorna data de vencimento maxima para hoje;
function getVencDataLim(d){
    var hj = new Date();
    var mes = hj.getMonth()+1;
    var vencMin = hj;
    for (var i = 0; i <= parseInt(d); i++) {
        vencMin =  proxDiaUtil(vencMin);
        // console.log(vencMin);
    }
    // console.log(vencMin);
    return vencMin;
}
// retorna para para atividade de aprovação
function prazoAprovacao(){
    //pega vencimento
    var dtVencInpu = document.querySelector("#VencData");
    //usa como base
    var dtBase = dateFromString(dtVencInpu.value);
    for (var i = 0; i <= 5; i++) {
        dtBase =  diaUtilAnt(dtBase);
    }
    return dtBase;
}

// retona prazo com base no campo do formulario
function prazoFinalizar(){
    //pega vencimento
    var dtVencInpu = document.querySelector("#VencData");
    //usa como base
    var dtBase = dateFromString(dtVencInpu.value);
    for (var i = 0; i <= 3; i++) {
        dtBase =  diaUtilAnt(dtBase);
    }
    return dtBase;
}

//pega proximo dia util
function proxDiaUtil(dtBase){
    //pega data amanhá é diautil
    var amanha = addDia(dtBase);
    while(!isDiaUtil(amanha)){
        var amanha = addDia(amanha);
    }
    return amanha;
}
//pega dia util anterior
function diaUtilAnt(dtBase){
    //pega data amanhá é diautil
    var ontem = dimDia(dtBase);
    while(!isDiaUtil(ontem)){
        var ontem = dimDia(ontem);
    }
    return ontem;
}

//verifica se eh dia util
function isDiaUtil(dt){
    var eUtil = true;
    //verifica se eh final de semana
    if(dt.getDay() == 0 || dt.getDay() == 6){
        eUtil = false;
    }
    //verifica se e feriado
    if(ehFeriado(dt)){
        eUtil = false;
    }
    return eUtil;
}
// Seleciona o proximo dia
function addDia(dt){
        //verifica se e o ultimo dia do mes
        if(!ultDiaMes(dt)){
            dt.setDate(dt.getDate()+1);
        }else{
            //se e o ultimo dia do mes, passa para o dia primeiro do mes seguinte
            dt.setDate(01);
            dt.setMonth(dt.getMonth()+1);
        }
    return  dt;    
}
// seleciona o dia anterior
function dimDia(dt){
    //verifica se e o dia primeiro
    if(dt.getDate() == 01){
        // pega ultimo dia do mes anterior
        var udma = qtdDiaMes(dt.getMonth());
        dt.setDate(udma);
        //muda mes para mes passado
        var m = dt.getMonth();
        dt.setMonth(m-1);
    }else{
        //pega dia anterio
        dt.setDate(dt.getDate()-1);
    }
    return  dt;    
}

//busca daset com feriado
function getMFeriados(){
    var dsGlobalCalendar = DatasetFactory.getDataset('globalCalendar', null, new Array(c1), null);
    return dsGlobalCalendar.values;
}
// verifica se é feriado - baseado no calendario do fluig
function ehFeriado(d,feriados){
    // var feriados = getMFeriados();
    feriados = new Array();
    var hasDay = false;
    for (var i = 0; i < feriados.length; i++) {
        var elm = feriados[i];
        if(elm['holidayDay'] == d){
            hasDay = true;
            break;
        }
    }
    return hasDay;
}
//verifica se é o ultimo dia do mes
function ultDiaMes(dt){
    var dia = dt.getDate();
    var mes = dt.getMonth()+1;
    return dia == qtdDiaMes(mes) ? true : false;
}

function qtdDiaMes(m){
    var aMes = new Array();
    aMes['1'] = 31;
    aMes['2'] = 28;
    aMes['3'] = 31;
    aMes['4'] = 30;
    aMes['5'] = 31;
    aMes['6'] = 30;
    aMes['7'] = 31;
    aMes['8'] = 31;
    aMes['9'] = 30;
    aMes['10'] = 31;
    aMes['11'] = 30;
    aMes['12'] = 31;
    return aMes[m];

}
// tranforma string dd/mm/yyyy em objDate
function dateFromString(dtString){
    var aDt = dtString.split("/");
    var nDt = new Date();
    nDt.setDate(aDt[0]);
    nDt.setMonth(parseInt(aDt[1]) - 1);
    nDt.setFullYear(aDt[2]);
    return nDt;
}

// retorna string de data dd/mm/yyyy - 21/12/2222
function dateToString(dt){
    return ""+addZero(dt.getDate())+"/"+addZero(dt.getMonth()+1)+"/"+dt.getFullYear();
}
//adiciona 0 ao mes caro tenha apenas um digito, entao 1 = 01
function addZero(n){
    var nn;
    if(n < 10){
        nn = "0"+ n.toString();
    }else{
        nn = ""+ n.toString();

    }
    return nn;
}
//retornas todas as datas 10 e 20 dos ano atual e proximo ano
function getVencDatas(data){
    var datas = getVencDatasAno('10',data.getMonth()+1,data.getFullYear());
    datas = datas.concat(getVencDatasAno('10',1,data.getFullYear()+1));
    datas = datas.concat(getVencDatasAno('20',data.getMonth()+1,data.getFullYear()));
    datas = datas.concat(getVencDatasAno('20',1,data.getFullYear()+1));
    return datas;
}   
//verifica se data é dia util e retorna a data ou o prixmo dia util
function getVencDatasAno(d,m,a) {
     var datas = [];
    for (i = parseInt(m); i <= 12; i++) {
        var dia10 = d+'/'+addZero(i)+'/'+a;
        var dt10 = dateFromString(dia10);
        if(isDiaUtil(dt10)){
            datas.push(dia10);
        }else{
            datas.push(dateToString(proxDiaUtil(dt10)));
        }      
    }
    return datas;
}


// Calcula forma de pagamento
function calcFormPagamento(){
    var dtVencInput = document.querySelector("#VencData");
    var dtVenc = dateFromString(dtVencInput.value);
    var dtClassInput = document.querySelector("#dtClass");
    var dtClass = dateFromString(dtClassInput.value);
    // var dtClass =   dateFromString(dateToString(new Date()));
    var cont = 0;
    while(dateToString(dtClass) != dateToString(dtVenc)){
        cont++;
        dtClass = proxDiaUtil(dtClass);
    }
    return cont;

}
// Calcula diferença de dias uteis entre duas data
function calcDifDiasUtil(from, to){

}