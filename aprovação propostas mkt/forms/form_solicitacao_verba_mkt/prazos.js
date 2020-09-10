//retorna data de vencimento maxima para hoje;
function getVencDataLim(){
    var hj = new Date();
    var mes = hj.getMonth()+1;
    var vencMin = hj;
    for (var i = 0; i <= 7; i++) {
        vencMin =  proxDiaUtil(vencMin);
        console.log(vencMin);
    }
    console.log(vencMin);
    return vencMin;
}

function getPrazoDataRef(dtBase,diasUteis){
    for (var i = 0; i <= diasUteis; i++) {
        dtBase =  proxDiaUtil(dtBase);
    }
    return dtBase;

}
// function prazoAprovacao(){
//     //pega vencimento
//     var dtVencInpu = document.querySelector("#VencData");
//     //usa como base
//     var dtBase = dateFromString(dtVencInpu.value);
//     for (var i = 0; i <= 5; i++) {
//         dtBase =  diaUtilAnt(dtBase);
//     }
//     return dtBase;
// }

// function prazoFinalizar(){
//     //pega vencimento
//     var dtVencInpu = document.querySelector("#VencData");
//     //usa como base
//     var dtBase = dateFromString(dtVencInpu.value);
//     for (var i = 0; i <= 3; i++) {
//         dtBase =  diaUtilAnt(dtBase);
//     }
//     return dtBase;
// }


function proxDiaUtil(dtBase){
    //pega data amanhá é diautil
    var amanha = addDia(dtBase);
    while(!isDiaUtil(amanha)){
        var amanha = addDia(amanha);
    }
    return amanha;
}

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



function getMFeriados(){
    var dsGlobalCalendar = DatasetFactory.getDataset('globalCalendar', null, new Array(c1), null);
    return dsGlobalCalendar.values;
}

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
function dateFromString(dtString){
    var aDt = dtString.split("/");
    var nDt = new Date();
    nDt.setDate(aDt[0]);
    nDt.setMonth(parseInt(aDt[1]) - 1);
    nDt.setFullYear(aDt[2]);
    return nDt;
}

function dateToString(dt){
    return ""+addZero(dt.getDate())+"/"+addZero(dt.getMonth()+1)+"/"+dt.getFullYear();
}

function addZero(n){
    var nn;
    if(n < 10){
        nn = "0"+ n.toString();
    }else{
        nn = ""+ n.toString();

    }
    return nn;
}