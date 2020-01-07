function f_barra() {
    
    // var antes  = docBarCode.value;
    var depois = calcula_barra(docBarLinha.value);
   if(depois){   
       $("#docBarCode").val(depois);
         FLUIGC.toast({title: '', message: "Codigo validado", type: 'success'});
    } else{
       $("#docBarCode").val("");

    }   
    // antes = antes.replace(/[^0-9]/g,'')
    // if ((antes != depois) && antes != '') alerta('O código de barras digitado não confere:\n'+antes+'\n'+depois);
    // f_venc();
    // return(false);
}
function f_linha() {
    var antes  = docBarLinha.value.replace(/[^0-9]/g,'');
    var depois = calcula_linha(docBarCode.value);
    docBarLinha.value=depois;
    depois = depois.replace(/[^0-9]/g,'')
    if ((antes != depois) && antes != '') alerta('O código de barras digitado não confere:\n'+antes+'\n'+depois);
    f_venc();
    return(false);
}
function f_venc() {
    if ( docBarCode.value.substr(5,4) == 0 )
        VencData.value='O boleto pode ser pago em qualquer data';
    else
        VencData.value=fator_vencimento(docBarCode.value.substr(5,4));
        ValTitulo.value=(docBarCode.value.substr(9,8)*1)+','+docBarCode.value.substr(17,2);
    return(false);
}
function calcula_barra(linha)
{
    //var linha = docBarLinha.value;	// Linha Digitável
    barra  = linha.replace(/[^0-9]/g,'');
    //
    // CÁLCULO DO DÍGITO DE AUTO CONFERÊNCIA (DAC)   -   5ª POSIÇÃO
    if (modulo11_banco('34191000000000000001753980229122525005423000') != 1){
        alerta('Função "modulo11_banco" está com erro!'); 
        return false;
    } 
        
    //
    //if (barra.length == 36) barra = barra + '00000000000';
    if (barra.length < 47 ) barra = barra + '00000000000'.substr(0,47-barra.length);
    if (barra.length != 47){
        alerta('A linha do código de barras está incompleta!'+barra.length); 
        return false;
    }
    //
    barra  = barra.substr(0,4)
            +barra.substr(32,15)
            +barra.substr(4,5)
            +barra.substr(10,10)
            +barra.substr(21,10)
            ;
    //docBarCode.value = barra;
    if (modulo11_banco(barra.substr(0,4)+barra.substr(5,39)) != barra.substr(4,1)){
        alerta('Digito verificador '+barra.substr(4,1)+', o correto é '+modulo11_banco(barra.substr(0,4)+barra.substr(5,39))+'\nO sistema não altera automaticamente o dígito correto na quinta casa!');
        return false;
        //if (docBarCode.value != docBarCode2.value) alerta('Barras diferentes');
    }
        return(barra);
}
function calcula_linha(barra)
{
    //var barra = docBarCode.value;	// Codigo da Barra
    linha = barra.replace(/[^0-9]/g,'');
    //
    if (modulo10('399903512') != 8) alerta('Função "modulo10" está com erro!');
    if (linha.length != 44) alerta('A linha do código de barras está incompleta!');
    //
    var campo1 = linha.substr(0,4)+linha.substr(19,1)+'.'+linha.substr(20,4);
    var campo2 = linha.substr(24,5)+'.'+linha.substr(24+5,5);
    var campo3 = linha.substr(34,5)+'.'+linha.substr(34+5,5);
    var campo4 = linha.substr(4,1);		// Digito verificador
    var campo5 = linha.substr(5,14);	// Vencimento + Valor
    //
    if (  modulo11_banco(  linha.substr(0,4)+linha.substr(5,99)  ) != campo4 )
        alerta('Digito verificador '+campo4+', o correto é '+modulo11_banco(  linha.substr(0,4)+linha.substr(5,99)  )+'\nO sistema não altera automaticamente o dígito correto na quinta casa!');
    //
    if (campo5 == 0) campo5 = '000';
    //
    linha =	 campo1 + modulo10(campo1)
            +' '
            +campo2 + modulo10(campo2)
            +' '
            +campo3 + modulo10(campo3)
            +' '
            +campo4
            +' '
            +campo5
            ;
    //if (docBarLinha.value != linha2.value) alerta('Linhas diferentes');
    return(linha);
}
function fator_vencimento (dias) {
    //Fator contado a partir da data base 07/10/1997
    //*** Ex: 31/12/2011 fator igual a = 5198
    //alerta(dias);
    var currentDate, t, d, mes;
    t = new Date();
    currentDate = new Date();
    currentDate.setFullYear(1997,9,7);//alerta(currentDate.toLocaleString());
    t.setTime(currentDate.getTime() + (1000 * 60 * 60 * 24 * dias));//alerta(t.toLocaleString());
    mes = (currentDate.getMonth()+1); if (mes < 10) mes = "0" + mes;
    dia = (currentDate.getDate()+1); if (dia < 10) dia = "0" + dia;
    //campo.value = dia +"."+mes+"."+currentDate.getFullYear();campo.select();campo.focus();
    return(t.toLocaleString());
}
function modulo10(numero)
{
    
    numero = numero.replace(/[^0-9]/g,'');
    var soma  = 0;
    var peso  = 2;
    var contador = numero.length-1;
    //alerta(contador);
    //numero = '00183222173';
    //for (var i=0; i <= contador - 1; i++) {
    //alerta(10);
    //for (contador=10; contador >= 10 - 1; contador--) {
    while (contador >= 0) {
        //alerta(contador);
        //alerta(numero.substr(contador,1));
        multiplicacao = ( numero.substr(contador,1) * peso );
        if (multiplicacao >= 10) {multiplicacao = 1 + (multiplicacao-10);}
        soma = soma + multiplicacao;
        //alerta(numero.substr(contador,1)+' * '+peso+' = '+multiplicacao + ' =>' + soma) ;
        //alerta(soma);
        if (peso == 2) {
            peso = 1;
        } else {
            peso = 2;
        }
        contador = contador - 1;
    }
    var digito = 10 - (soma % 10);
    //alerta(numero + '\n10 - (' + soma + ' % 10) = ' + digito);
    if (digito == 10) digito = 0;
    return digito;
}

function debug(txt)
{
    // t.value = t.value + txt + '\n';
    console.log(txt);
}

function alerta(txt){
    console.log(txt);
    FLUIGC.toast({title: '', message: txt, type: 'danger'});
    // throw txt;
}
function modulo11_banco(numero)
{
    
    numero = numero.replace(/[^0-9]/g,'');
    //debug('Barra: '+numero);
    var soma  = 0;
    var peso  = 2;
    var base  = 9;
    var resto = 0;
    var contador = numero.length - 1;
    //debug('tamanho:'+contador);
    // var numero = "12345678909";
    for (var i=contador; i >= 0; i--) {
        //alerta( peso );
        soma = soma + ( numero.substring(i,i+1) * peso);
        //debug( i+': '+numero.substring(i,i+1) + ' * ' + peso + ' = ' +( numero.substring(i,i+1) * peso)+' soma='+ soma);
        if (peso < base) {
            peso++;
        } else {
            peso = 2;
        }
    }
    var digito = 11 - (soma % 11);
    //debug( '11 - ('+soma +'%11='+(soma % 11)+') = '+digito);
    if (digito >  9) digito = 0;
    /* Utilizar o dígito 1(um) sempre que o resultado do cálculo padrão for igual a 0(zero), 1(um) ou 10(dez). */
    if (digito == 0) digito = 1;
    return digito;
}