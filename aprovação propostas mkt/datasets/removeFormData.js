function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("success");
	dataset.addColumn("message");
	dataset.addColumn("documentId");
    //Usuário de altenticação
    var user = "admin";
    //Usuário de altenticação
    var password = "Brcgh@fluig01"; 
    
    var empresa = parseInt(getValue("WKCompany"));
    var documentId = getPametro(constraints,'documentId');
    
    if(documentId != ''){
	    try {
	        //instancia do servico
	        log.info('%%%%%% INICIANDO ECMCardService');
	        var servico = ServiceManager.getServiceInstance("ECMCardService");
	        log.info('%%%%%% servico: ' + servico);
	        var locator = servico.instantiate("com.totvs.technology.ecm.dm.ws.ECMCardServiceService");
	        log.info('%%%%%% locator: ' + locator);
	        var portServico = locator.getCardServicePort();
	        log.info('%%%%%% portServico: ' + portServico);
	       
	        var WSretorno = portServico.deleteCard(empresa, user, password, parseInt(documentId));
	        var retorno = getRetorno(WSretorno);
	        dataset.addRow(new Array(true, retorno));
	
	    } catch (e) {
	        dataset.addRow(new Array(false, e.name +' - ' + e.message));
	    }
     }else{
	 	// dataset.addRow(new Array(documentId,JSONUtil.toJSON(fieldsList)));
	 	dataset.addRow(new Array(false, "Informe o parentDocumentId do formulário e ao menos uma campo na constra compo"));
	 }
	return dataset;

	
}function onMobileSync(user) {

}


function getPametro(constraints, campo){
	var param = '';
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == campo) {
            	param = constraints[i].initialValue;
            }
		}
	}
	return param;
}

function getPametroList(constraints, campo){
	var param = [];
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == campo) {
            	var oDado = constraints[i].initialValue;
            	param.push(oDado);
            }
		}
	}
	return param;
}

 // cria cad
 function nCardField(name,value, servico){
    var objCampo = servico.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");
    objCampo.setField(name);//NOME DO CAMPO DO FORMULÁRIO QUE SERÁ ALTERADO
    objCampo.setValue(value);//VALOR QUE SERÁ INSERIDO NO CAMPO
    return objCampo;
}
// cria objeto para constraint
function jsonCarfFieldCons(field,value){
    return JSONUtil.toJSON({field: field,value:value});
}
//"{"field":"tipo","value":"FIXOS"}"
//pega retorno do webservice
function getRetorno(WebServiceMessage) {
    var empresa = WebServiceMessage.getItem().get(0).getCompanyId();
    log.info('%%%%%% empresa: ' + empresa);
    var documentDescription = WebServiceMessage.getItem().get(0).getDocumentDescription();
    log.info('%%%%%% documentDescription: ' + documentDescription);
    var documentId = WebServiceMessage.getItem().get(0).getDocumentId();
    log.info('%%%%%% documentId: ' + documentId);
    var version = WebServiceMessage.getItem().get(0).getVersion();
    log.info('%%%%%% version: ' + version);
    var message = WebServiceMessage.getItem().get(0).getWebServiceMessage();
    log.info('%%%%%% message: ' + message);

    if (documentDescription == null || documentDescription == "") {
        throw "Erro ao atualizar ficha (WS): " + message;
    }
    return "Formulário atualizado: " + documentDescription + " --- " + " DocumentId: " + documentId + " --- " + " Versão: " + version;
}

function hasParentId(fieldsList){
    var hasP = false;
    for (var i = 0; i < fieldsList.length; i++) {
        var e = fieldsList[i];
        var campo = JSON.parse(e);
       if(campo.field == "parentDocumentId"){
        hasP = true;
        break;
       }
    }
    return hasP;
}