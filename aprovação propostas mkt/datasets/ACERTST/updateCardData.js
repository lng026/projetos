function createDataset(fields, constraints, sortFields) {

    var cardId = "";
    var cardData = "";
    var cardField = "";
    
    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "cardId") {  //código formulario
                cardId = constraints[i].initialValue; 
            }
            if (constraints[i].fieldName == "cardData") { //novo valor
                cardData = constraints[i].initialValue; 
            }
            if (constraints[i].fieldName == "cardField") { // campo a ser alterado
            	cardField = constraints[i].initialValue; 
            }
        }
    }
    
    // Cria o dataset
    var dataset = DatasetBuilder.newDataset();
    
    var periodicService =  ServiceManager.getServiceInstance("ECMCardService");
    var serviceLocator =  periodicService.instantiate("com.totvs.technology.ecm.dm.ws.ECMCardServiceService");
    var service = serviceLocator.getCardServicePort();
    log.info("###Carddata");
    try{
    	var CardFieldDtoArray = periodicService.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDtoArray");
        var CardFieldDto = periodicService.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");
        CardFieldDto.setField(cardField);
        CardFieldDto.setValue(cardData);
        CardFieldDtoArray.getItem().add(CardFieldDto);
        
        log.info("###Carddata");
        log.dir(CardFieldDtoArray);
        
    	var update = service.updateCardData(1,"admin","Brcgh@fluig01",cardId,CardFieldDtoArray);
    	log.info(update)
    }catch(e){
    	dataset.addColumn("Erro");
		
    	dataset.addRow(new Array(e.message));
    }
    
    return dataset;
}
