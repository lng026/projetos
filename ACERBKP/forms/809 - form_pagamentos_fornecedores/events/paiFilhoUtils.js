/**
* Método para listar os filhos de um pai x filho
* @param form: Referência da ficha
* @param fields: Array dos campos que pertencem ao pai x filho
* @returns {Array[][]} Array de String com as chaves e valores
*/
function consultaDadosPaiFilho(fields, form){
	log.info("Consultando os campos pai x filho Form");
	var cardData   = form.getCardData();	
	var it         = cardData.keySet().iterator();
	var listaFilho = new Array();
	var fieldTemp  = fields[0];

	while (it.hasNext()) {
		var key = it.next();
		var campo = key.split("___");		

		if (key.indexOf('___') >= 0 && campo[0] == fieldTemp) {
			var idx = campo[1];
			var row = new Object();
			
			for(var i=0; i<fields.length; i++){
				var name = fields[i] + "___" + idx;
				log.info('Nome Pai Filho: '+name);
				row[fields[i]] = {value:form.getValue(name), idx:idx, name:name};
			}
			listaFilho.push(row);
		}		
	}
	log.info("Lista FILHO: "+listaFilho);
	return listaFilho;
}


