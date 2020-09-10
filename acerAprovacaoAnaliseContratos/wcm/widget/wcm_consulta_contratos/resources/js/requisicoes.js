// var loading;

// $(document).ready(function () {
// 	carregaUsuarios();
// 	selectTipoDoc();
// 	areasSolicitantes();
// 	campoAreaSolicitante(areasSolicitantes());
// 	loading = FLUIGC.loading(window);
// });

// function getAsyncPostApi(url, data, callback, detail) {

// 	try {
// 		parent.WCMAPI.Read({
// 			type: 'POST',
// 			url: url,
// 			async: false,
// 			data: data,
// 			success: function (oDataRet) {

// 				callback(oDataRet, null, detail);
// 			},
// 			error: function (oError) {

// 				console.log(oError, "erro getAsyncPostApi");
// 				callback(null, oError, detail);
// 			}
// 		});
// 	}
// 	catch (e) {
// 		console.log(e);
// 		callback(null, e);
// 	}
// }

// function consultaDsForm(constr) {
// 	if ($("#statusSolicita").val() == 66) {
// 		FLUIGC.loading(window).show();
// 		console.log('entrou 66')
// 		try {
// 			WCMAPI.Create({
// 				url: WCMAPI.serverURL + '/api/public/ecm/dataset/datasets',
// 				contentType: 'application/json',
// 				type: 'POST',
// 				async: true,
// 				data: {
// 					'name': 'form_aprovacao_contratos',

// 					'constraints': constr,
// 				},
// 				success: (data) => {
// 					console.log(data, "ds form")
// 					data.content.values.forEach(e => {
// 						numberSolic = e.numSolicitacao;
// 						try {
// 							WCMAPI.Create({
// 								url: WCMAPI.serverURL + '/api/public/ecm/dataset/datasets',
// 								contentType: 'application/json',
// 								type: 'POST',
// 								async: true,
// 								data: {
// 									'name': 'workflowProcess',

// 									'constraints': [{
// 										'_field': 'status',
// 										'_initialValue': 1,
// 										'_finalValue': 1,
// 										'_type': 1,
// 										'_likeSearch': false
// 									},
// 									{
// 										'_field': 'cardIndexDocumentId',
// 										'_initialValue': 9791,
// 										'_finalValue': 9791,
// 										'_type': 1,
// 										'_likeSearch': false
// 									},
// 									]
// 								},
// 								success: (data) => {
// 									console.log(data, 'ds work')
// 									data.content.values.forEach(e => {
// 										console.log(e)
// 										if (numberSolic == e['workflowProcessPK.processInstanceId']) {
// 											statusdasolic = e.status;
// 											searchValues(loadValues);
// 										}

// 									})
// 								},
// 							})
// 						} catch (e) {
// 							console.log(e)
// 						}
// 					});

// 				},
// 			});
// 		} catch (e) {
// 			console.log(e)
// 		}
// 		FLUIGC.loading(window).hide();
// 	} else if ($("#statusSolicita").val() == 36) {
// 		console.log('entrou 36')
// 		FLUIGC.loading(window).show();
// 		try {
// 			WCMAPI.Create({
// 				url: WCMAPI.serverURL + '/api/public/ecm/dataset/datasets',
// 				contentType: 'application/json',
// 				type: 'POST',
// 				async: true,
// 				data: {
// 					'name': 'form_aprovacao_contratos',

// 					'constraints': constr,
// 				},
// 				success: (data) => {
// 					console.log(data, "ds form")
// 					data.content.values.forEach(e => {
// 						numberSolic = e.numSolicitacao;
// 						try {
// 							WCMAPI.Create({
// 								url: WCMAPI.serverURL + '/api/public/ecm/dataset/datasets',
// 								contentType: 'application/json',
// 								type: 'POST',
// 								async: true,
// 								data: {
// 									'name': 'workflowProcess',

// 									'constraints': [{
// 										'_field': 'status',
// 										'_initialValue': 2,
// 										'_finalValue': 2,
// 										'_type': 1,
// 										'_likeSearch': false
// 									},
// 									{
// 										'_field': 'cardIndexDocumentId',
// 										'_initialValue': 9791,
// 										'_finalValue': 9791,
// 										'_type': 1,
// 										'_likeSearch': false
// 									},
// 									]
// 								},
// 								success: (data) => {
// 									console.log(data, "ds work")
// 									if (numberSolic == e['workflowProcessPK.processInstanceId']) {
// 										data.content.values.forEach(e => {
// 											console.log(e)
// 											statusdasolic = e.status;
// 											searchValues(loadValues);
// 										})
// 									}
// 								},
// 							})
// 						} catch (e) {
// 							console.log(e)
// 						}
// 					});

// 				},
// 			});
// 		} catch (e) {
// 			console.log(e)
// 		}
// 		FLUIGC.loading(window).hide();
// 	} else {
// 		console.log('entrou TODOS')
// 		FLUIGC.loading(window).show();
// 		try {
// 			WCMAPI.Create({
// 				url: WCMAPI.serverURL + '/api/public/ecm/dataset/datasets',
// 				contentType: 'application/json',
// 				type: 'POST',
// 				async: true,
// 				data: {
// 					'name': 'form_aprovacao_contratos',

// 					'constraints': constr,
// 				},
// 				success: (data) => {
// 					console.log(data, 'ds form')
// 					data.content.values.forEach(e => {
// 						numberSolic = e.numSolicitacao;
// 						try {
// 							WCMAPI.Create({
// 								url: WCMAPI.serverURL + '/api/public/ecm/dataset/datasets',
// 								contentType: 'application/json',
// 								type: 'POST',
// 								async: true,
// 								data: {
// 									'name': 'workflowProcess',

// 									'constraints': [{
// 										'_field': 'workflowProcessPK.processInstanceId',
// 										'_initialValue': numberSolic,
// 										'_finalValue': numberSolic,
// 										'_type': 1,
// 										'_likeSearch': false
// 									},
// 									{
// 										'_field': 'cardIndexDocumentId',
// 										'_initialValue': 9791,
// 										'_finalValue': 9791,
// 										'_type': 1,
// 										'_likeSearch': false
// 									},
// 									]
// 								},
// 								success: (dataR) => {
// 									console.log(dataR, "ds work")
// 									dataR.content.values.forEach(e => {
// 										console.log(e)
// 										statusdasolic = e.status;
// 										searchValues(loadValues);
// 									})
// 								},
// 							})
// 						} catch (e) {
// 							console.log(e)
// 						}
// 					});

// 				},

// 			});
// 		} catch (e) {
// 			console.log(e)
// 		}
// 		FLUIGC.loading(window).hide();
// 	}

// }

// var statusdasolic = ""
// var numberSolic = ""


// var buscNumSoli;
// var buscStatusSoli;
// var buscaTipoContrato;
// var buscaSolicitante;
// var buscaRazaoSocial;
// var buscaData;
// var areaSolicitante;

// function CallSearch() {
// 	loading.show() // END AT

// 	buscNumSoli = $("#numIniSolicitacao").val();
// 	buscStatusSoli = $("#statusSolicita").val();
// 	buscaTipoContrato = $("#tipoContrato").val();
// 	buscaSolicitante = $("#solicitante").val();
// 	buscaRazaoSocial = $("#razaoSocial").val();
// 	buscaData = $("#dataAbertura").val();
// 	areaSolicitante = $("#areaSolicitante").val();

// 	var c = [];
// 	if (buscNumSoli != "") {
// 		c.push(
// 			{
// 				'_field': 'numSolicitacao',
// 				'_initialValue': buscNumSoli,
// 				'_finalValue': buscNumSoli,
// 				'_type': 0,
// 				'_likeSearch': false
// 			}
// 		);
// 	}

// 	if (buscStatusSoli != "" && buscStatusSoli != 66 && buscStatusSoli != 36) {
// 		c.push(
// 			{
// 				'_field': 'idStatus',
// 				'_initialValue': buscStatusSoli,
// 				'_finalValue': buscStatusSoli,
// 				'_type': 0,
// 				'_likeSearch': false
// 			}
// 		);
// 	}

// 	if (areaSolicitante != "") {
// 		c.push(
// 			{
// 				'_field': 'areaSol',
// 				'_initialValue': areaSolicitante,
// 				'_finalValue': areaSolicitante,
// 				'_type': 0,
// 				'_likeSearch': false
// 			}
// 		);
// 	}

// 	if (buscaTipoContrato != "") {
// 		c.push(
// 			{
// 				'_field': 'idTipoDoc',
// 				'_initialValue': buscaTipoContrato,
// 				'_finalValue': buscaTipoContrato,
// 				'_type': 0,
// 				'_likeSearch': false
// 			}
// 		);
// 	}

// 	if (buscaSolicitante != "") {
// 		console.log("Entrou 'buscaSolicitante' " + buscaSolicitante);
// 		c.push(
// 			{
// 				'_field': 'usrSolicitante',
// 				'_initialValue': buscaSolicitante,
// 				'_finalValue': buscaSolicitante,
// 				'_type': 0,
// 				'_likeSearch': false
// 			}
// 		);
// 	}

// 	if (buscaData != "") {
// 		c.push(
// 			{
// 				'_field': 'dataInicio',
// 				'_initialValue': buscaData,
// 				'_finalValue': buscaData,
// 				'_type': 0,
// 				'_likeSearch': false
// 			}
// 		);
// 	}

// 	if (buscaRazaoSocial != "") {
// 		c.push(
// 			{
// 				'_field': 'relacaoDePartes',
// 				'_initialValue': buscaRazaoSocial,
// 				'_finalValue': buscaRazaoSocial,
// 				'_type': 0,
// 				'_likeSearch': true
// 			}
// 		);
// 	}

// 	if (c.length > 0) {
// 		consultaDsForm(c);
// 	} else {
// 		if (buscStatusSoli == 66) {
// 			FLUIGC.loading(window).show();
// 			try {
// 				WCMAPI.Create({
// 					url: WCMAPI.serverURL + '/api/public/ecm/dataset/datasets',
// 					contentType: 'application/json',
// 					type: 'POST',
// 					async: true,
// 					data: {
// 						'name': 'workflowProcess',

// 						'constraints': [{
// 							'_field': 'status',
// 							'_initialValue': 1,
// 							'_finalValue': 1,
// 							'_type': 1,
// 							'_likeSearch': false
// 						},
// 						{
// 							'_field': 'cardIndexDocumentId',
// 							'_initialValue': 9791,
// 							'_finalValue': 9791,
// 							'_type': 1,
// 							'_likeSearch': false
// 						},
// 						]
// 					},
// 					success: (data) => {
// 						console.log(data, 'ds work')
// 						data.content.values.forEach(e => {
// 							console.log(e)
// 							statusdasolic = e.status;
// 							searchValues(loadValues);
// 							loading.hide();
// 						})
// 					},
// 				})
// 			} catch (e) {
// 				console.log(e)
// 			}
// 			FLUIGC.loading(window).hide();
// 		} else if (buscStatusSoli == 36) {
// 			FLUIGC.loading(window).show();
// 			try {
// 				WCMAPI.Create({
// 					url: WCMAPI.serverURL + '/api/public/ecm/dataset/datasets',
// 					contentType: 'application/json',
// 					type: 'POST',
// 					async: true,
// 					data: {
// 						'name': 'workflowProcess',

// 						'constraints': [{
// 							'_field': 'status',
// 							'_initialValue': 2,
// 							'_finalValue': 2,
// 							'_type': 1,
// 							'_likeSearch': false
// 						},
// 						{
// 							'_field': 'cardIndexDocumentId',
// 							'_initialValue': 9791,
// 							'_finalValue': 9791,
// 							'_type': 1,
// 							'_likeSearch': false
// 						},
// 						]
// 					},
// 					success: (data) => {
// 						console.log(data, 'ds work')
// 						data.content.values.forEach(e => {
// 							console.log(e)
// 							statusdasolic = e.status;
// 							searchValues(loadValues);

// 						})
// 					},
// 				})
// 			} catch (e) {
// 				console.log(e)
// 			}
// 			FLUIGC.loading(window).hide();
// 		} else {
// 			FLUIGC.loading(window).show();
// 			try {
// 				WCMAPI.Create({
// 					url: WCMAPI.serverURL + '/api/public/ecm/dataset/datasets',
// 					contentType: 'application/json',
// 					type: 'POST',
// 					async: true,
// 					data: {
// 						'name': 'form_aprovacao_contratos',

// 						'constraints': [{
// 							'_field': 'cardid',
// 							'_initialValue': 9791,
// 							'_finalValue': 9791,
// 							'_type': 0,
// 							'_likeSearch': false
// 						}]
// 					},
// 					success: (data) => {
// 						console.log(data)
// 						data.content.values.forEach(e => {
// 							numberSolic = e.numSolicitacao;
// 							try {
// 								WCMAPI.Create({
// 									url: WCMAPI.serverURL + '/api/public/ecm/dataset/datasets',
// 									contentType: 'application/json',
// 									type: 'POST',
// 									async: true,
// 									data: {
// 										'name': 'workflowProcess',

// 										'constraints': [{
// 											'_field': 'workflowProcessPK.processInstanceId',
// 											'_initialValue': numberSolic,
// 											'_finalValue': numberSolic,
// 											'_type': 1,
// 											'_likeSearch': false
// 										},
// 										{
// 											'_field': 'cardIndexDocumentId',
// 											'_initialValue': 9791,
// 											'_finalValue': 9791,
// 											'_type': 1,
// 											'_likeSearch': false
// 										},
// 										]
// 									},
// 									success: (dataR) => {
// 										console.log(dataR)
// 										dataR.content.values.forEach(e => {
// 											statusdasolic = e.status;
// 											searchValues(loadValues);
// 										})
// 									},
// 								})
// 							} catch (e) {
// 								console.log(e)
// 							}
// 						});

// 					},
// 				});
// 			} catch (e) {
// 				console.log(e)
// 			}
// 		}


// 	}

// }

// function searchValues(callback, detail) {
// 	//console.clear();

// 	$("#gridSolicitacoes").dataTable().fnDestroy();
// 	var oRet = [];
// 	buscNumSoli = $("#numIniSolicitacao").val();
// 	buscStatusSoli = $("#statusSolicita").val();
// 	buscaTipoContrato = $("#tipoContrato").val();
// 	buscaSolicitante = $("#solicitante").val();
// 	buscaRazaoSocial = $("#razaoSocial").val();
// 	buscaData = $("#dataAbertura").val();
// 	areaSolicitante = $("#areaSolicitante").val();

// 	try {
// 		var oC1 = [];
// 		var sUrl = '/api/public/ecm/dataset/datasets';

// 		if (buscNumSoli) {
// 			oC1.push(
// 				{
// 					'_field': 'numSolicitacao',
// 					'_initialValue': buscNumSoli,
// 					'_finalValue': buscNumSoli,
// 					'_type': 0,
// 					'_likeSearch': false
// 				}
// 			);
// 		}

// 		if (buscStatusSoli) {
// 			oC1.push(
// 				{
// 					'_field': 'idStatus',
// 					'_initialValue': buscStatusSoli,
// 					'_finalValue': buscStatusSoli,
// 					'_type': 0,
// 					'_likeSearch': false
// 				}
// 			);
// 		}

// 		if (areaSolicitante) {
// 			oC1.push(
// 				{
// 					'_field': 'areaSol',
// 					'_initialValue': areaSolicitante,
// 					'_finalValue': areaSolicitante,
// 					'_type': 0,
// 					'_likeSearch': false
// 				}
// 			);
// 		}

// 		if (buscaTipoContrato) {
// 			oC1.push(
// 				{
// 					'_field': 'idTipoDoc',
// 					'_initialValue': buscaTipoContrato,
// 					'_finalValue': buscaTipoContrato,
// 					'_type': 0,
// 					'_likeSearch': false
// 				}
// 			);
// 		}

// 		if (buscaTipoContrato) {
// 			oC1.push(
// 				{
// 					'_field': 'tipoDoc',
// 					'_initialValue': buscaTipoContrato,
// 					'_finalValue': buscaTipoContrato,
// 					'_type': 0,
// 					'_likeSearch': false
// 				}
// 			);
// 		}

// 		if (buscaSolicitante) {
// 			console.log("Entrou 'buscaSolicitante' " + buscaSolicitante);
// 			oC1.push(
// 				{
// 					'_field': 'usrSolicitante',
// 					'_initialValue': buscaSolicitante,
// 					'_finalValue': buscaSolicitante,
// 					'_type': 0,
// 					'_likeSearch': false
// 				}
// 			);
// 		}

// 		if (buscaData) {
// 			oC1.push(
// 				{
// 					'_field': 'dataSolcitacao',
// 					'_initialValue': buscaData,
// 					'_finalValue': buscaData,
// 					'_type': 0,
// 					'_likeSearch': false
// 				}
// 			);
// 		}

// 		if (buscaRazaoSocial) {
// 			console.log("Entrou buscaRazaoSocial " + buscaRazaoSocial);
// 			oC1.push(
// 				{
// 					'_field': 'relacaoDePartes',
// 					'_initialValue': buscaRazaoSocial,
// 					'_finalValue': buscaRazaoSocial,
// 					'_type': 0,
// 					'_likeSearch': true
// 				}
// 			);
// 		}

// 		if (oC1.length > 0) {

// 			oC1.push(
// 				{
// 					'_field': 'metadata#active',
// 					'_initialValue': true,
// 					'_finalValue': true,
// 					'_type': 0,
// 					'_likeSearch': false
// 				}
// 			);

// 			var oData = {
// 				name: 'form_aprovacao_contratos',

// 				fields: null,
// 				constraints: oC1,
// 				order: null
// 			};

// 			oLoadingData.show();
// 			getAsyncPostApi(sUrl, oData, function (oDataRet, oError, oLoadingData) {

// 				try {
// 					var biblioteca = consultaBibliContrato();
// 					if (biblioteca.length > 0) {
// 						for (var cont = 0; cont < biblioteca.length; cont++) {
// 							oDataRet.content.values.push(biblioteca[cont]);
// 						}
// 					}

// 					if (oDataRet != null) {
// 						if (oDataRet.content && oDataRet.content.values && oDataRet.content.values.length > 0) {

// 							var row;
// 							for (var cont = 0; cont < oDataRet.content.values.length; cont++) {
// 								row = oDataRet.content.values[cont];
// 								if (row['numSolicitacao'] && row['idStatus']) {
// 									oRet.push(row);
// 								}
// 							}

// 							if (oRet.length > 600 && oC1.length >= 2) {
// 								FLUIGC.toast({
// 									title: 'Ops! ',
// 									message: 'Mais de 600 registros, utilizar mais filtros',
// 									type: 'warning'
// 								});
// 							}
// 							else {
// 								callback(oRet, detail, oLoadingData);
// 							}

// 						}
// 						else {
// 							FLUIGC.toast({
// 								title: 'Ops! ',
// 								message: 'Não foram encontrados dados para os filtros informados!',
// 								type: 'warning'
// 							});
// 						}
// 					}

// 				}
// 				catch (e) {
// 					throw e;
// 				}
// 				finally {
// 					oLoadingData.hide();
// 				}
// 			}, oLoadingData);
// 		} else {
// 			var oC2 = [];
// 			var sUrl = '/api/public/ecm/dataset/datasets';

// 			oC2.push(
// 				{
// 					'_field': 'cardid',
// 					'_initialValue': 9791,
// 					'_finalValue': 9791,
// 					'_type': 0,
// 					'_likeSearch': false
// 				}
// 			);

// 			var oData = {
// 				name: 'form_aprovacao_contratos',

// 				fields: null,
// 				constraints: oC2,
// 				order: null
// 			};


// 			var oLoadingData = parent.FLUIGC.loading(parent.window);

// 			oLoadingData.show();
// 			getAsyncPostApi(sUrl, oData, function (oDataRet, oError, oLoadingData) {

// 				try {
// 					var biblioteca = consultaBibliContrato();
// 					if (biblioteca.length > 0) {
// 						for (var cont = 0; cont < biblioteca.length; cont++) {
// 							oDataRet.content.values.push(biblioteca[cont]);
// 						}
// 					}

// 					if (oDataRet != null) {
// 						if (oDataRet.content && oDataRet.content.values && oDataRet.content.values.length > 0) {

// 							var row;
// 							for (var cont = 0; cont < oDataRet.content.values.length; cont++) {
// 								row = oDataRet.content.values[cont];
// 								if (row['numSolicitacao'] && row['idStatus']) {
// 									oRet.push(row);
// 								}
// 							}

// 							if (oRet.length > 600 && oC1.length >= 2) {
// 								FLUIGC.toast({
// 									title: 'Ops! ',
// 									message: 'Mais de 600 registros, utilizar mais filtros',
// 									type: 'warning'
// 								});
// 							}else {
// 								callback(oRet, detail, oLoadingData);
// 							}

// 						}
// 					}

// 				}
// 				catch (e) {
// 					throw e;
// 				}
// 				finally {
// 					oLoadingData.hide();
// 				}
// 			}, oLoadingData);
// 		}
// 	}
// 	catch (e) {
// 		throw e;
// 	}
// }

// //Comeando edição por aqui =) 
// function consultaPaiFilho(dataset, filtro) {
// 	var obj = [];

// 	var c2 = DatasetFactory.createConstraint('relacaoDePartes', filtro, filtro, ConstraintType.MUST, true);
// 	var c3 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
// 	var constraints = new Array(c2, c3);
// 	var dsContratos = DatasetFactory.getDataset('form_aprovacao_contratos', null, constraints, null);

// 	for (i = 0; i < dsContratos.values.length; i++) {
// 		obj.push({
// 			"numSolicitacao": dsContratos.values[i]['numSolicitacao'],
// 			"nomeSolicitante": dsContratos.values[i]['areaSol'],
// 			"idTipoDoc": dsContratos.values[i]['tipoDoc'],
// 			"contratada": dsContratos.values[i]['formaPagamento'],
// 			"contratante": dsContratos.values[i]['formaPagamento'],
// 			"objeto": dsContratos.values[i]['objeto'],
// 			"dataSolicitacao": dsContratos.values[i]['dataSolicitacao'],
// 			"dataInicio": dsContratos.values[i]['dataInicio'],
// 			"dataTermino": dsContratos.values[i]['dataTermino'],
// 			"formaPagto": dsContratos.values[i]['formaPagamento'],
// 			"Status": dsContratos.values[i]['descStatus'],
// 			"idStatus": dsContratos.values[i]['idStatus'],
// 			"relacaoDePartes": dsContratos.values[i]['relacaoDePartes']
// 		}
// 		);
// 	}
// 	return obj;
// }

// function consultaBibliContrato() {
// 	var datasetDsBibliContratos = DatasetFactory.getDataset('dsBibliContratos', null, null, null);
// 	var dataset = datasetDsBibliContratos.values;
// 	var obj = [];
// 	var filtro = [];

// 	var buscNumSoli = $("#numIniSolicitacao").val(); 	//console.log(buscNumSoli);
// 	var buscStatusSoli = $("#statusSolicita").val();  	//console.log(buscStatusSoli);
// 	var buscaTipoContrato = $("#tipoContrato").val(); 	//console.log(buscaTipoContrato);
// 	var buscaSolicitante = $("#solicitante").val(); 	//console.log(buscaSolicitante);
// 	var buscaData = $("#dataAbertura").val(); 			//console.log(buscaData);
// 	var buscaRazaoSocial = $("#razaoSocial").val(); 	//console.log(buscaRazaoSocial);
// 	var areaSolicitante = $("#areaSolicitante").val(); 	//console.log(areaSolicitante);

// 	for (i = 0; i < dataset.length; i++) {

// 		var documentId = dataset[i]["metadata#id"];
// 		var documentVersion = dataset[i]["metadata#version"];

// 		filtro.push(DatasetFactory.createConstraint("tablename", "tdRegras", "tdRegras", ConstraintType.MUST));
// 		filtro.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST));
// 		filtro.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST));

// 		if (areaSolicitante) {
// 			filtro.push(DatasetFactory.createConstraint("areaSol", areaSolicitante, areaSolicitante, ConstraintType.MUST));
// 		}

// 		if (buscaSolicitante) {
// 			filtro.push(DatasetFactory.createConstraint("areaSol", buscaSolicitante, buscaSolicitante, ConstraintType.MUST));
// 		}

// 		if (buscNumSoli) {
// 			filtro.push(DatasetFactory.createConstraint("numContrato", buscNumSoli, buscNumSoli, ConstraintType.MUST));
// 		}

// 		if (buscStatusSoli) {
// 			filtro.push(DatasetFactory.createConstraint("idStatus", buscStatusSoli, buscStatusSoli, ConstraintType.MUST));
// 		}

// 		if (buscaTipoContrato) {
// 			filtro.push(DatasetFactory.createConstraint("tipoContrato", buscaTipoContrato, buscaTipoContrato, ConstraintType.MUST));
// 		}

// 		if (buscaData) {
// 			filtro.push(DatasetFactory.createConstraint("dataSolicitacao", buscaData, buscaData, ConstraintType.MUST));
// 		}

// 		var dsBiblioteca = DatasetFactory.getDataset("dsBibliContratos", null, filtro, null);

// 		var row = [];
// 		var item;
// 		var contratada;
// 		var contratante;
// 		if (dsBiblioteca.values) {
// 			for (var x = 0; x < dsBiblioteca.values.length; x++) {
// 				row = dsBiblioteca.values[x];
// 				contratada = row['contratada'].toUpperCase();
// 				contratante = row['contratante'].toUpperCase();
// 				item = {
// 					"numSolicitacao": row['numContrato'],
// 					"nomeSolicitante": 'Indeterminado',
// 					"areaSol": row['arealSol'],
// 					"idTipoDoc": row['tipoContrato'],
// 					"contratada": row['contratada'],
// 					"contratante": row['contratante'],
// 					"objeto": row['objeto'],
// 					"dataSolicitacao": row['dataSolicitacao'],
// 					"dataInicio": row['dataInicio'],
// 					"dataTermino": row['dataTermino'],
// 					"formaPagto": row['formaPagto'],
// 					"Status": row['fase'],
// 					"idStatus": row['idStatus'],
// 					"contractFolderId": row['contractFolderId'],
// 					"relacaoDePartes": null
// 				}

// 				if (buscaRazaoSocial) {
// 					var texto = new RegExp(buscaRazaoSocial.toUpperCase(), 'g');
// 					var buscaContratada = contratada.match(texto);
// 					var buscaContratante = contratante.match(texto);
// 					if (buscaContratada != null || buscaContratante != null) {
// 						obj.push(item);
// 					}

// 				} else {
// 					obj.push(item);
// 				}
// 			}
// 		}
// 	}
// 	return obj;
// }

// function areasSolicitantes() {
// 	var dataset = DatasetFactory.getDataset('from_areas_solicitantes', null, null, new Array('nomeArea'));
// 	var objeto = new Array();
// 	for (var cont = 0; cont < dataset.values.length; cont++) {
// 		objeto.push({ "codArea": dataset.values[cont].codArea, "nomeArea": dataset.values[cont].nomeArea });
// 	}
// 	return objeto;
// }

// function campoAreaSolicitante(parametro) {
// 	for (var cont = 0; cont < parametro.length; cont++) {
// 		$("#areaSolicitante").append("<option value='" + parametro[cont].codArea + "'>" + parametro[cont].nomeArea + "</option>");
// 	}
// }

// function loadValues(DataSet, Detail, oLoadingData) {
// 	// Busca a área soliciante apenas uma vez, com isso ganhamos desempenho, afinal é apenas uma requisa por consulta 	
// 	var areasSolicitantesV = areasSolicitantes();
// 	var buscaRazaoSocial = $("#razaoSocial").val();
// 	//	var itens = buscaRazaoSocial ? consultaPaiFilho(DataSet, buscaRazaoSocial) & consultaBibliContrato : DataSet;	

// 	var itens = DataSet;

// 	try {

// 		var table;
// 		//VERIFICA SE O GRID JÁ FOI CRIADO
// 		if ($.fn.dataTable.isDataTable('#gridSolicitacoes')) {
// 			table = $('#gridSolicitacoes').DataTable();
// 			console.log('>>> entrou if - Grid criado');
// 		}
// 		else {
// 			console.log('>>> entrou else - Grid não foi criado');
// 			table = $('#gridSolicitacoes').DataTable({
// 				"initComplete": function () {
// 				},
// 				"paging": true,
// 				"buttons": [
// 					"excel"
// 				],
// 				"data": itens,
// 				"language": {
// 					"sEmptyTable": "Nenhum registro encontrado",
// 					"sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
// 					"sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
// 					"sInfoFiltered": "(Filtrados de _MAX_ registros)",
// 					"sInfoPostFix": "",
// 					"sInfoThousands": ".",
// 					"sLengthMenu": "_MENU_ resultados por página",
// 					"sLoadingRecords": "Carregando...",
// 					"sProcessing": "Processando...",
// 					"sZeroRecords": "Nenhum registro encontrado",
// 					"sSearch": "Filtrar conteudo ",
// 					"oPaginate": {
// 						"sNext": "Próximo",
// 						"sPrevious": "Anterior",
// 						"sFirst": "Primeiro",
// 						"sLast": "Último"
// 					},
// 					"oAria": {
// 						"sSortAscending": ": Ordenar colunas de forma ascendente",
// 						"sSortDescending": ": Ordenar colunas de forma descendente"
// 					}
// 				},
// 				"columns": [
// 					// Solicitação 
// 					{
// 						"class": "numSolicitacao",
// 						"orderable": true,
// 						"render": function (data, type, full, meta) {
// 							return "<p><a href='/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + full.numSolicitacao + "' target='_blank'>" + full.numSolicitacao + "</a></p>";
// 						}
// 					},

// 					// Área solicitante 
// 					{
// 						"class": "areaSol",
// 						"orderable": true,
// 						"render": function (data, type, full, meta) {
// 							for (i = 0; i < areasSolicitantesV.length; i++) {
// 								if (areasSolicitantesV[i].codArea == full.areaSol) {
// 									var retorno = "<strong>" + areasSolicitantesV[i].nomeArea + "</strong><br/>" + full.nomeSolicitante;
// 									i = areasSolicitantesV.length;
// 								} else {
// 									var retorno = full.areaSol;
// 								}
// 							}
// 							return retorno;
// 						}
// 					},

// 					// Razão Social
// 					{
// 						"class": "numSolicitacao",
// 						"orderable": true,
// 						"render": function (data, type, full, meta) {
// 							var rsocial = '';
// 							if (full.relacaoDePartes) {
// 								var json = JSON.parse(full.relacaoDePartes);
// 								for (let i = 0; i < json.length; i++) {
// 									rsocial += json[i].texto + ': <strong>' + json[i].razaoSocial + '</strong><br/>';
// 								}
// 							}
// 							else {
// 								if (full.contratada) {
// 									rsocial += 'Contratada: <strong>' + full.contratada + '</strong><br/>';
// 								}
// 								if (full.contratante) {
// 									rsocial += 'Contratante: <strong>' + full.contratante + '</strong><br/>';
// 								}
// 							}
// 							return rsocial;
// 						}
// 					},

// 					// Tipo do documento 
// 					{
// 						"class": "idTipoDoc",
// 						"render": function (data, type, full, meta) {
// 							var retorno = full.idTipoDoc + "<p><small><i>" + full.objeto + "</i></small></p>";
// 							return retorno;
// 						}
// 					},

// 					// Data de inicio 
// 					{
// 						"data": "dataInicio",
// 						"class": "dataInicio"
// 					},

// 					// Data de termino
// 					{
// 						"class": "dataTermino",
// 						"orderable": false,
// 						"render": function (data, type, full, meta) {

// 							var data = full.dataTermino == "" || full.dataTermino == null ? "Indeterminado" : full.dataTermino;
// 							return "<p>" + data + "</p>";
// 						}
// 					},

// 					// Status da atividade
// 					{
// 						"class": "tdvalor",
// 						"orderable": false,
// 						"render": function (data, type, full, meta) {

// 							if (statusdasolic == 1) {
// 								return "<p> Cancelado </p>";
// 							} if (statusdasolic == 2) {
// 								return "<p> Encerrado </p>";
// 							} if (statusdasolic == 0) {
// 								var status = statusAtv(full.idStatus);
// 								return "<p>" + status.descricao + "</p>";
// 							}

// 						}
// 					},

// 					// Anexos
// 					{
// 						"class": "tdvalor",
// 						"orderable": false,
// 						"render": function (data, type, full, meta) {
// 							if (full.contractFolderId) {
// 								return "<a target ='_blank' href='http://acer.fluig.com:80/portal/p/1/ecmnavigation?app_ecm_navigation_doc=" + full.contractFolderId + "' class='btn btn-default'><i class='fluigicon fluigicon-folder-open icon-xs'></i> Arquivos</a>";
// 							} else {
// 								return "<p></p>";
// 							}

// 						}
// 					},
// 				],
// 				"sDom": "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6 text-right'f>>" +
// 					"<'row'<'col-sm-12'tr>>" +
// 					"<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 text-right'p>>",
// 			});
// 			//console.log(table['context'][0]['aoData']);
// 		}
// 	} catch (err) {
// 		console.log("Erro no grid");
// 		console.log(err);
// 		FLUIGC.toast({
// 			title: 'Ops! ',
// 			message: 'Informe ao menos um filtro para refinar a busca!',
// 			type: 'warning'
// 		});
// 	} finally {
// 		oLoadingData.hide();
// 	}
// } 