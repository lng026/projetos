/*
**   toda solicitação rest com method post para api fluig deve conter
**   dataType = 'json';
**   contentType:'application/json'
**   method: 'POST'
**   data: JSON.stringify({'description':'TESTE REST' , 'parentId':'2'}); ou
**   var obj  = { limit: "10", offset: "0", documentId:'2' };
**   data: JSON.stringify(obj);
**
**/
function teste() {
	conDatasetRest();
}
//consulta dataset via APIRest
function conDatasetRest() {
  var url = '/api/public/ecm/dataset/datasets';
  var obj = {name : 'form_reembolso_despesa', fields: ['nome', 'cpf']};
  var params = JSON.stringify(obj);

  $.ajax(url,{
    method:'POST',
    dataType:'json',
    contentType:'application/json',
    data: params
  }).done(function(data){
    console.log(data);
  }).error(function(e) {
    console.log(e);
  });
}
