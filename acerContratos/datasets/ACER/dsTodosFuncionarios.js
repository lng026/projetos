function createDataset(fields, constraints, sortFields) {
	var lista = new Array(); 
	lista.push('04642099948');
	lista.push('10340168811');
	lista.push('12731970898');
	lista.push('13597670881');
	lista.push('13603228847');
	lista.push('14856969846');
	lista.push('15184819819');
	lista.push('16877550862');
	lista.push('17323030889');
	lista.push('17426272850');
	lista.push('22087130876');
	lista.push('23006149874');
	lista.push('23081108802');
	lista.push('23157713825');
	lista.push('24560255806');
	lista.push('24958054855');
	lista.push('25050372801');
	lista.push('25183522871');
	lista.push('26894096821');
	lista.push('26984485800');
	lista.push('27627939801');
	lista.push('28234842803');
	lista.push('28941165865');
	lista.push('30126997837');
	lista.push('30948226811');
	lista.push('31097606813');
	lista.push('31201900808');
	lista.push('31641956801');
	lista.push('32330795831');
	lista.push('33807421807');
	lista.push('34231027803');
	lista.push('34556571847');
	lista.push('34999360896');
	lista.push('35533416889');
	lista.push('35825078827');
	lista.push('36824268844');
	lista.push('36965360836');
	lista.push('37825620895');
	lista.push('38385893865');
	lista.push('38483058871');
	lista.push('38639466858');
	lista.push('39352373839');
	lista.push('39795722859');
	lista.push('40050705822');
	lista.push('40566228840');
	lista.push('40883200856');
	lista.push('42318760888');
	lista.push('43720051803');
	lista.push('44008901809');
	lista.push('44256458808');
	lista.push('48226482810');
	lista.push('57717370891');
	lista.push('22818379806');

	var dataset = DatasetBuilder.newDataset();
	log.info('inicio consulta tipos de despesas acer alterado');
	//Criando colunas
	dataset.addColumn("CAGENCIA");
	dataset.addColumn("CBANCO");
	dataset.addColumn("CCCUSTO");
	dataset.addColumn("CCODIGO");
	dataset.addColumn("CCONTA");
	dataset.addColumn("CNOME");
	dataset.addColumn("CDESCCUSTO");
	dataset.addColumn("CDTADMISSA");
	dataset.addColumn("CDTNIVER");
	dataset.addColumn("CCGC");
	
	var param = '';
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName.toUpperCase() == "CCGC") {
            	param = constraints[i].initialValue;
            }
		}
	}

	for(i = 0; i < lista.length; i++) {

	if(lista[i].trim() != ''){
		try {
			//var caminho = 'br.com.totvs.agptec._10222.WSFLUIG';
			var caminho = 'br.com.totvscloud.mw0sd1_prd_protheus._11685.WSFLUIG';
			 // Conecta o servico e busca os livros
		    var periodicService = ServiceManager.getService('WSFLUIG');
		    var serviceHelper = periodicService.getBean();
		    var serviceLocator = periodicService.instantiate(caminho);
		    var service = serviceLocator.getWSFLUIGSOAP();
		    //log.info('service:' + service);

		    var fun = service.getfuncionario(lista[i]);
		    
			 dataset.addRow(new Array(
					 fun.getCAGENCIA().trim(),
					 fun.getCBANCO().trim(),
					 fun.getCCCUSTO().trim(),
					 fun.getCCODIGO().trim(),
					 fun.getCCONTA().trim(),
					 fun.getCNOME().trim(),
					 fun.getCDESCCUSTO().trim(),
					 fun.getCDTADMISSA().trim(),
					 fun.getCDTNIVER().trim(),
					 lista[i]));
		} catch (e) {
			dataset.addRow(new Array(e.name, e.message));
		}

	} else {
		dataset.addRow(new Array('Erro', "Informe o nome do cliente"));
	}

}
	return dataset;
}