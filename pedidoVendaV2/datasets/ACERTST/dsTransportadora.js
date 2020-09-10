function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	log.info('-- dataset dsTransportadora --');
	var dataset = DatasetBuilder.newDataset();
	log.info('inicio consulta DE transportadoras');
	// Criando colunas
	dataset.addColumn("CCODIGO");
	dataset.addColumn("CNOME");

	var camposBusca = [ 'CNOME', 'CCODIGO' ];
	var cnome = '';
	var ccodigo = '';
	var params = [];
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == 'CNOME') {
				cnome = constraints[i].initialValue;
			}
			if (constraints[i].fieldName == 'CCODIGO') {
				ccodigo = constraints[i].initialValue;
			}

		}// for
	}

	if (cnome.trim() == "" && ccodigo.trim() == "") {
		dataset.addRow([ 'error', 'informe os paremetros' ]);
		return dataset;
	}

	try {
		log.info('dstransportadora -  entrou no if');
		var caminho = 'br.com.totvscloud.mw0sd1_tst_protheus._33485.WSFLUIG';
		// Conecta ao servico
		var periodicService = ServiceManager.getService('WSFLUIG');
		var serviceHelper = periodicService.getBean();
		var serviceLocator = periodicService.instantiate(caminho);
		var service = serviceLocator.getWSFLUIGSOAP();
		log.info('dstransportadora -  instanciado');
		var prevResponse = service
				.gettransportadora("%" + ccodigo + "%", cnome);
		log.info('dstransportadora - response' + prevResponse);
		var listaTransp = prevResponse.getTRANSPORTADORA();
		log.info('dstransportadora -  listaTransp:' + listaTransp);
		for (var i = 0; i < listaTransp.size(); i++) {
			var itemTransp = listaTransp.get(i);
			dataset.addRow([ itemTransp.getCCODIGO(), itemTransp.getCNOME() ]);
		}

	} catch (e) {
		dataset.addRow(new Array(e.name, e.message));
	}
	return dataset;

}
function onMobileSync(user) {

}