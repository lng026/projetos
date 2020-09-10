var tipoPesquisa = 0;

function getAsyncPostApi(url, data, callback, detail) {

    try {
        parent.WCMAPI.Read({
            type: 'POST',
            url: url,
            async: false,
            data: data,
            success: function(oDataRet) {
                //console.log(oDataRet, "odataret")
                //console.log(data, 'data')
                // oDataRet.content.values.forEach(x => {
                // 	console.log(x.nomeSolicitante, x.numSolicitacao)
                // 	parent.WCMAPI.Read({
                // 		url: '/api/public/ecm/dataset/datasets',
                // 		method: 'POST',
                // 		async: false,
                // 		contentType: 'application/json',
                // 		data: JSON.stringify({
                // 			'name': 'workflowProcess',
                // 			'constraints': [{
                // 				'_field': 'cardIndexDocumentId',
                // 				'_initialValue': '9791',
                // 				'_finalValue': '9791',
                // 				'_type': 0,
                // 				'_likeSearch': false
                // 			},
                // 			{
                // 				'_field': 'cardDocumentId',
                // 				'_initialValue': x.documentid,
                // 				'_finalValue': x.documentid,
                // 				'_type': 0,
                // 				'_likeSearch': false
                // 			}]
                // 		}),
                // 		success: (resp) => {
                // 			console.log(resp, x.numSolicitacao, 'antes')
                // 			x.numSolicitacao = resp.content.values[0]['workflowProcessPK.processInstanceId']
                // 			console.log(x.numSolicitacao, 'depois')
                // 		}
                // 	})
                // })
                console.log('qtd ds ----> ' + oDataRet.content.values.length);
                for (var i = 0; i <= oDataRet.content.values.length - 1; i++) {
                    var numSolic;
                    var foundSolic = solicitacoes.content.values.find(x => x["cardDocumentId"] == oDataRet.content.values[i]['documentid']);
                    if (foundSolic) {
                        oDataRet.content.values[i]['numSolicitacao'] = foundSolic['workflowProcessPK.processInstanceId'];
                    }
                }
                callback(oDataRet, null, detail);
            },
            error: function(oError) {

                console.log(oError);
                callback(null, oError, detail);
            }
        });
    } catch (e) {
        console.log(e);
        callback(null, e);
    }
}

function searchValues(callback, detail) {
    //console.clear();
    $("#gridSolicitacoes").dataTable().fnDestroy();
    var oRet = [];
    var buscNumSoli = $("#numIniSolicitacao").val();
    var buscStatusSoli = $("#statusSolicita").val();
    var buscaTipoContrato = $("#tipoContrato").val();
    var buscaSolicitante = $("#solicitante").val();
    var buscaRazaoSocial = $("#razaoSocial").val();
    var buscaData = $("#dataAbertura").val();
    var dataInicial = $("#dataInicial").val();
    var dataFinal = $("#dataFinal").val();
    var areaSolicitante = $("#areaSolicitante").val();

    try {
        var oC1 = [];
        var sUrl = '/api/public/ecm/dataset/datasets';
        /*oC1.push(
        	{ 
        	'_field':'metadata#active', 
        	'_initialValue':'true', 
        	'_finalValue':'true', 
        	'_type':0, 
        	'_likeSearch':false
        	} 
        );*/

        if (buscNumSoli) {
            oC1.push({
                '_field': 'numSolicitacao',
                '_initialValue': buscNumSoli,
                '_finalValue': buscNumSoli,
                '_type': 0,
                '_likeSearch': false
            });
        }

        if (buscStatusSoli) {
            if (buscStatusSoli != '66' && buscStatusSoli != '36') {
                oC1.push({
                    '_field': 'idStatus',
                    '_initialValue': buscStatusSoli,
                    '_finalValue': buscStatusSoli,
                    '_type': 0,
                    '_likeSearch': false
                });
            }
        }

        if (areaSolicitante) {
            oC1.push({
                '_field': 'areaSol',
                '_initialValue': areaSolicitante,
                '_finalValue': areaSolicitante,
                '_type': 0,
                '_likeSearch': false
            });
        }

        if (buscaTipoContrato) {
            oC1.push({
                '_field': 'idTipoDoc',
                '_initialValue': "%" + buscaTipoContrato + "%",
                '_finalValue': "%" + buscaTipoContrato + "%",
                '_type': 0,
                '_likeSearch': true
            });
        }

        if (buscaTipoContrato) {
            oC1.push({
                '_field': 'tipoDoc',
                '_initialValue': "%" + buscaTipoContrato + "%",
                '_finalValue': "%" + buscaTipoContrato + "%",
                '_type': 0,
                '_likeSearch': true
            });
        }

        if (buscaSolicitante) {
            //console.log("Entrou 'buscaSolicitante' " + buscaSolicitante);
            oC1.push({
                '_field': 'usrSolicitante',
                '_initialValue': buscaSolicitante,
                '_finalValue': buscaSolicitante,
                '_type': 0,
                '_likeSearch': false
            });
        }

        if (dataInicial && dataFinal == "") {
            oC1.push({
                '_field': 'dataInicio',
                '_initialValue': dataInicial,
                '_finalValue': dataInicial,
                '_type': 0,
                '_likeSearch': false
            });
        }

        if (buscaRazaoSocial) {
            //console.log("Entrou buscaRazaoSocial " + buscaRazaoSocial);
            oC1.push({
                '_field': 'relacaoDePartes',
                '_initialValue': "%" + buscaRazaoSocial + "%",
                '_finalValue': "%" + buscaRazaoSocial + "%",
                '_type': 0,
                '_likeSearch': true
            });
        }
        if (!buscNumSoli && !buscStatusSoli && !buscaTipoContrato && !buscaSolicitante && !buscaRazaoSocial && !dataInicial && !dataFinal && !areaSolicitante) {
            tipoPesquisa = 1;
            var oData = {
                name: 'form_aprovacao_contratos',
                fields: null,
                constraints: null,
                order: null
            };
            var oLoadingData = parent.FLUIGC.loading(parent.window);
            //oLoadingData.show();
            getAsyncPostApi(sUrl, oData, function(oDataRet, oError, oLoadingData) {
                try {
                    var biblioteca = consultaBibliContrato();
                    if (biblioteca.length > 0) {
                        for (var cont = 0; cont <= biblioteca.length - 1; cont++) {
                            oDataRet.content.values.push(biblioteca[cont]);
                        }
                    }

                    if (oDataRet != null) {
                        if (oDataRet.content && oDataRet.content.values && oDataRet.content.values.length > 0) {

                            var row;
                            for (var cont = 0; cont < oDataRet.content.values.length; cont++) {
                                row = oDataRet.content.values[cont];
                                if (row['numSolicitacao'] || row['documentid'] && row['idStatus']) {
                                    oRet.push(row);
                                }
                            }
                            callback(oRet, detail, oLoadingData);
                        }
                    }
                } catch (e) {
                    throw e;
                }
            });
        } else if (oC1.length > 0 || (buscStatusSoli == '66' || buscStatusSoli == '36') || (dataInicial != "" || dataFinal != "")) {
            tipoPesquisa = 2;
            oC1.push({
                '_field': 'metadata#active',
                '_initialValue': true,
                '_finalValue': true,
                '_type': 0,
                '_likeSearch': false
            });

            var oData = {
                name: 'form_aprovacao_contratos',

                fields: null,
                constraints: oC1,
                order: null
            };

            var oLoadingData = parent.FLUIGC.loading(parent.window);

            oLoadingData.show();
            getAsyncPostApi(sUrl, oData, function(oDataRet, oError, oLoadingData) {
                if (dataInicial && dataFinal) {
                    oDataRet.content.values = oDataRet.content.values.filter((x) => {
                        try {
                            let date;
                            if (x.dataInicio.match('/')) {
                                date = new Date(x.dataInicio.split("/")[2], x.dataInicio.split("/")[1] - 1, x.dataInicio.split("/")[0]);
                            } else {
                                date = new Date(x.dataInicio.substring(4, 8), x.dataInicio.substring(2, 4) - 1, x.dataInicio.substring(0, 2));
                            }
                            let dateInitial = new Date(dataInicial.split("/")[2], dataInicial.split("/")[1] - 1, dataInicial.split("/")[0]);
                            let dateFinal = new Date(dataFinal.split("/")[2], dataFinal.split("/")[1] - 1, dataFinal.split("/")[0]);
                            if (date >= dateInitial && date <= dateFinal) {
                                return x;
                            }
                        } catch (e) {
                            console.log("dataInicial && dataFinal --> " + e);
                        }
                    })
                }
                if (dataInicial && dataFinal == "") {
                    oDataRet.content.values = oDataRet.content.values.filter((x) => {
                        try {
                            let date;
                            if (x.dataInicio.match('/')) {
                                date = new Date(x.dataInicio.split("/")[2], x.dataInicio.split("/")[1] - 1, x.dataInicio.split("/")[0]);
                            } else {
                                date = new Date(x.dataInicio.substring(4, 8), x.dataInicio.substring(2, 4) - 1, x.dataInicio.substring(0, 2));
                            }
                            let choosedDate = new Date(dataInicial.split("/")[2], dataInicial.split("/")[1] - 1, dataInicial.split("/")[0]);
                            if (choosedDate.getTime() == date.getTime()) {
                                return x;
                            }
                        } catch (e) {
                            console.log("dataInicial && dataFinal == \"\" --> " + e);
                        }
                    })
                }
                if (dataFinal && dataInicial == "") {
                    oDataRet.content.values = oDataRet.content.values.filter((x) => {
                        try {
                            let date;
                            if (x.dataInicio.match('/')) {
                                date = new Date(x.dataInicio.split("/")[2], x.dataInicio.split("/")[1] - 1, x.dataInicio.split("/")[0]);
                            } else {
                                date = new Date(x.dataInicio.substring(4, 8), x.dataInicio.substring(2, 4) - 1, x.dataInicio.substring(0, 2));
                            }
                            let choosedDate = new Date(dataFinal.split("/")[2], dataFinal.split("/")[1] - 1, dataFinal.split("/")[0]);
                            if (choosedDate.getTime() == date.getTime()) {
                                return x;
                            }
                        } catch (e) {
                            console.log("dataFinal && dataInicial == \"\" --> " + e);
                        }
                    })
                }

                if (buscStatusSoli == "66") {
                    oDataRet.content.values = oDataRet.content.values.filter((x) => {
                        if (solicitacoes.content.values.find(y => y["workflowProcessPK.processInstanceId"] == x.numSolicitacao)) {
                            if (solicitacoes.content.values.find(y => y["workflowProcessPK.processInstanceId"] == x.numSolicitacao)['status'] == 1) {
                                return x;
                            }
                        }
                    })
                } else if (buscStatusSoli == "36") {
                    oDataRet.content.values = oDataRet.content.values.filter((x) => {
                        if (solicitacoes.content.values.find(y => y["workflowProcessPK.processInstanceId"] == x.numSolicitacao)) {
                            if (solicitacoes.content.values.find(y => y["workflowProcessPK.processInstanceId"] == x.numSolicitacao)['status'] == 2) {
                                return x;
                            }
                        }
                    })
                } else if (buscaSolicitante) {
                    oDataRet.content.values = oDataRet.content.values.filter((x) => {
                        if (buscaSolicitante == x.usrSolicitante) {
                            return x;
                        }
                    })
                } else if (buscaRazaoSocial) {
                    oDataRet.content.values = oDataRet.content.values.filter((x) => {
                        var t = JSON.parse(x.relacaoDePartes)
                        var reg = new RegExp(buscaRazaoSocial.toLowerCase(), 'g');
                        if (t[0].razaoSocial.toLowerCase().match(reg) || t[1].razaoSocial.toLowerCase().match(reg)) {
                            return x;
                        }
                    })
                } else {
                    oDataRet.content.values = oDataRet.content.values.filter((x) => {
                        //if (solicitacoes.content.values.find(y => y["workflowProcessPK.processInstanceId"] == x.numSolicitacao)) {
                        return x;
                        //}
                    })
                }

                try {
                    var biblioteca = consultaBibliContrato();
                    if (biblioteca.length > 0) {
                        for (var cont = 0; cont <= biblioteca.length - 1; cont++) {
                            oDataRet.content.values.push(biblioteca[cont]);
                        }
                    }

                    if (oDataRet != null) {
                        if (oDataRet.content && oDataRet.content.values && oDataRet.content.values.length > 0) {

                            var row;
                            for (var cont = 0; cont < oDataRet.content.values.length; cont++) {
                                row = oDataRet.content.values[cont];
                                if (row['numSolicitacao'] || row['documentid'] && row['idStatus']) {
                                    oRet.push(row);
                                }
                            }

                            if (oRet.length > 600 && oC1.length >= 2) {
                                FLUIGC.toast({
                                    title: 'Ops! ',
                                    message: 'Mais de 600 registros, utilizar mais filtros',
                                    type: 'warning'
                                });
                            } else {
                                callback(oRet, detail, oLoadingData);
                            }

                        } else {
                            /*FLUIGC.toast({
                            	title: 'Ops! ',
                            	message: 'Não foram encontrados dados para os filtros informados!',
                            	type: 'warning'
                            });*/
                        }
                    }
                    if (oDataRet.content.values.length == 0) {
                        var buscNumSoli1 = $("#numIniSolicitacao").val();
                        if (buscNumSoli1) {
                            switch (buscNumSoli1) {
                                case '13':
                                    item = {
                                        "numSolicitacao": 13,
                                        "nomeSolicitante": '',
                                        "areaSol": '',
                                        "idTipoDoc": '',
                                        "contratada": 'SERTRADING',
                                        "contratante": 'AGP',
                                        "objeto": '',
                                        "dataSolicitacao": '',
                                        "dataInicio": '',
                                        "dataTermino": '',
                                        "formaPagto": '',
                                        "Status": '',
                                        "idStatus": '',
                                        "contractFolderId": '7985',
                                        "relacaoDePartes": null
                                    }
                                    oDataRet.content.values.push(item);
                                    break;
                                case '15':
                                    item = {
                                        "numSolicitacao": 15,
                                        "nomeSolicitante": '',
                                        "areaSol": '',
                                        "idTipoDoc": '',
                                        "contratada": 'SERTRADING',
                                        "contratante": 'AGP',
                                        "objeto": '',
                                        "dataSolicitacao": '',
                                        "dataInicio": '',
                                        "dataTermino": '',
                                        "formaPagto": '',
                                        "Status": '',
                                        "idStatus": '',
                                        "contractFolderId": '7987',
                                        "relacaoDePartes": null
                                    }
                                    oDataRet.content.values.push(item);
                                    break;
                                case '16':
                                    item = {
                                        "numSolicitacao": 16,
                                        "nomeSolicitante": '',
                                        "areaSol": '',
                                        "idTipoDoc": '',
                                        "contratada": 'SERTRADING',
                                        "contratante": 'AGP',
                                        "objeto": '',
                                        "dataSolicitacao": '',
                                        "dataInicio": '',
                                        "dataTermino": '',
                                        "formaPagto": '',
                                        "Status": '',
                                        "idStatus": '',
                                        "contractFolderId": '7988',
                                        "relacaoDePartes": null
                                    }
                                    oDataRet.content.values.push(item);
                                    break;
                                case '17':
                                    item = {
                                        "numSolicitacao": 17,
                                        "nomeSolicitante": '',
                                        "areaSol": '',
                                        "idTipoDoc": '',
                                        "contratada": 'SERTRADING',
                                        "contratante": 'AGP',
                                        "objeto": '',
                                        "dataSolicitacao": '',
                                        "dataInicio": '',
                                        "dataTermino": '',
                                        "formaPagto": '',
                                        "Status": '',
                                        "idStatus": '',
                                        "contractFolderId": '7989',
                                        "relacaoDePartes": null
                                    }
                                case '20':
                                    item = {
                                        "numSolicitacao": 20,
                                        "nomeSolicitante": '',
                                        "areaSol": '',
                                        "idTipoDoc": '',
                                        "contratada": 'MULTIAR',
                                        "contratante": 'AGP',
                                        "objeto": 'CONTRATO DE MANUTENÇÃO PREVENTIVA',
                                        "dataSolicitacao": '',
                                        "dataInicio": '',
                                        "dataTermino": '',
                                        "formaPagto": '',
                                        "Status": '',
                                        "idStatus": '',
                                        "contractFolderId": '7992',
                                        "relacaoDePartes": null
                                    }
                                    oDataRet.content.values.push(item);
                                    break;
                                case '22':
                                    item = {
                                        "numSolicitacao": 22,
                                        "nomeSolicitante": '',
                                        "areaSol": '',
                                        "idTipoDoc": '',
                                        "contratada": 'REDBULL DO BRASIL',
                                        "contratante": 'AGP',
                                        "objeto": 'CONTRATO DE PATROCINIO',
                                        "dataSolicitacao": '',
                                        "dataInicio": '',
                                        "dataTermino": '',
                                        "formaPagto": '',
                                        "Status": '',
                                        "idStatus": '',
                                        "contractFolderId": '7994',
                                        "relacaoDePartes": null
                                    }
                                    oDataRet.content.values.push(item);
                                    break;
                                case '23':
                                    item = {
                                        "numSolicitacao": 23,
                                        "nomeSolicitante": '',
                                        "areaSol": '',
                                        "idTipoDoc": '',
                                        "contratada": 'ROCK FARIA BAR E RESTAURANTE',
                                        "contratante": 'AGP',
                                        "objeto": 'CONTRATO PARTICULAR DE CESSAO DE ESPAÇO',
                                        "dataSolicitacao": '',
                                        "dataInicio": '',
                                        "dataTermino": '',
                                        "formaPagto": '',
                                        "Status": '',
                                        "idStatus": '',
                                        "contractFolderId": '7995',
                                        "relacaoDePartes": null
                                    }
                                    oDataRet.content.values.push(item);
                                    break;
                                case '24':
                                    item = {
                                        "numSolicitacao": 24,
                                        "nomeSolicitante": '',
                                        "areaSol": '',
                                        "idTipoDoc": '',
                                        "contratada": 'MULTILOG ARMAZENS GERAIS',
                                        "contratante": 'AGP',
                                        "objeto": 'CONTRATO DE PRESTAÇÃO DO BRASIL',
                                        "dataSolicitacao": '',
                                        "dataInicio": '',
                                        "dataTermino": '',
                                        "formaPagto": '',
                                        "Status": '',
                                        "idStatus": '',
                                        "contractFolderId": '7996',
                                        "relacaoDePartes": null
                                    }
                                    oDataRet.content.values.push(item);
                                    break;
                                case '25':
                                    item = {
                                        "numSolicitacao": 25,
                                        "nomeSolicitante": '',
                                        "areaSol": '',
                                        "idTipoDoc": '',
                                        "contratada": 'MULTILOG ARMAZENS GERAIS',
                                        "contratante": 'AGP',
                                        "objeto": 'INSTRUMENTO PARTICULAR DE CONTROLE DE SUBLOCAÇÃO',
                                        "dataSolicitacao": '',
                                        "dataInicio": '',
                                        "dataTermino": '',
                                        "formaPagto": '',
                                        "Status": '',
                                        "idStatus": '',
                                        "contractFolderId": '7997',
                                        "relacaoDePartes": null
                                    }
                                    oDataRet.content.values.push(item);
                                    break;
                                case '26':
                                    item = {
                                        "numSolicitacao": 26,
                                        "nomeSolicitante": '',
                                        "areaSol": '',
                                        "idTipoDoc": '',
                                        "contratada": 'HT MICRON',
                                        "contratante": 'AGP',
                                        "objeto": 'MUTUAL NO-DISCLOSURE AGREEMENT',
                                        "dataSolicitacao": '',
                                        "dataInicio": '',
                                        "dataTermino": '',
                                        "formaPagto": '',
                                        "Status": '',
                                        "idStatus": '',
                                        "contractFolderId": '7998',
                                        "relacaoDePartes": null
                                    }
                                    oDataRet.content.values.push(item);
                                    break;
                                case '100':
                                    item = {
                                        "numSolicitacao": 100,
                                        "nomeSolicitante": '',
                                        "areaSol": '',
                                        "idTipoDoc": '',
                                        "contratada": 'ANDREW JOHN GOLDMAN',
                                        "contratante": 'AGP',
                                        "objeto": 'CONTRATO DE LOCAÇÃO DE AUTOMÓVEL POR PRAZO DETERMINADO',
                                        "dataSolicitacao": '',
                                        "dataInicio": '',
                                        "dataTermino": '',
                                        "formaPagto": '',
                                        "Status": '',
                                        "idStatus": '',
                                        "contractFolderId": '8073',
                                        "relacaoDePartes": null
                                    }
                                    oDataRet.content.values.push(item);
                                    break;
                                default:

                                    FLUIGC.toast({
                                        title: 'Ops! ',
                                        message: 'Não foram encontrados dados para os filtros informados!',
                                        type: 'warning'
                                    });


                            }
                            callback(oDataRet.content.values, detail, oLoadingData);
                        }
                    }
                    if (oDataRet.content.values.length == 0) {
                        FLUIGC.toast({
                            title: 'Ops! ',
                            message: 'Não foram encontrados dados para os filtros informados!',
                            type: 'warning'
                        });
                    }
                } catch (e) {
                    throw e;
                } finally {
                    oLoadingData.hide();
                }
            }, oLoadingData);
        } else {
            if (buscStatusSoli != '66' && buscStatusSoli != '36' && dataInicial != "" && dataFinal != "") {
                console.log("Erro no Search Value");
                FLUIGC.toast({
                    title: 'Ops! ',
                    message: 'Informe ao menos um filtro para refinar a busca!',
                    type: 'warning'
                });
            }
        }
    } catch (e) {
        throw e;
    }
}

//Começando edição por aqui =) 
function consultaPaiFilho(dataset, filtro) {
    var obj = [];

    var c2 = DatasetFactory.createConstraint('relacaoDePartes', filtro, filtro, ConstraintType.MUST, true);
    var c3 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
    var constraints = new Array(c2, c3);
    var dsContratos = DatasetFactory.getDataset('form_aprovacao_contratos', null, constraints, null);

    for (i = 0; i < dsContratos.values.length; i++) {
        obj.push({
            "numSolicitacao": dsContratos.values[i]['numSolicitacao'],
            "nomeSolicitante": dsContratos.values[i]['areaSol'],
            "idTipoDoc": dsContratos.values[i]['tipoDoc'],
            "contratada": dsContratos.values[i]['formaPagamento'],
            "contratante": dsContratos.values[i]['formaPagamento'],
            "objeto": dsContratos.values[i]['objeto'],
            "dataSolicitacao": dsContratos.values[i]['dataSolicitacao'],
            "dataInicio": dsContratos.values[i]['dataInicio'],
            "dataTermino": dsContratos.values[i]['dataTermino'],
            "formaPagto": dsContratos.values[i]['formaPagamento'],
            "Status": dsContratos.values[i]['descStatus'],
            "idStatus": dsContratos.values[i]['idStatus'],
            "relacaoDePartes": dsContratos.values[i]['relacaoDePartes']
        });
    }
    return obj;
}

function consultaBibliContrato() {
    var datasetDsBibliContratos = DatasetFactory.getDataset('dsBibliContratos', null, null, null);
    var dataset = datasetDsBibliContratos.values;
    var obj = [];
    var filtro = [];
    var dsData = [];
    var buscNumSoli = $("#numIniSolicitacao").val(); //console.log(buscNumSoli);
    var buscStatusSoli = $("#statusSolicita").val(); //console.log(buscStatusSoli);
    var buscaTipoContrato = $("#tipoContrato").val(); //console.log(buscaTipoContrato);
    var buscaSolicitante = $("#solicitante").val(); //console.log(buscaSolicitante);
    var buscaData = $("#dataAbertura").val(); //console.log(buscaData);
    var dataInicial = $("#dataInicial").val(); //console.log(dataInitial);
    var dataFinal = $("#dataFinal").val(); //console.log(dataFinal);
    var buscaRazaoSocial = $("#razaoSocial").val(); //console.log(buscaRazaoSocial);
    var areaSolicitante = $("#areaSolicitante").val(); //console.log(areaSolicitante);
    var dateInitial = new Date(dataInicial.split("/")[2], dataInicial.split("/")[1] - 1, dataInicial.split("/")[0]);
    var dateFinal = new Date(dataFinal.split("/")[2], dataFinal.split("/")[1] - 1, dataFinal.split("/")[0]);
    try {
        for (i = 0; i < dataset.length; i++) {
            var documentId = dataset[i]["metadata#id"];
            var documentVersion = dataset[i]["metadata#version"];

            filtro.push(DatasetFactory.createConstraint("tablename", "tdRegras", "tdRegras", ConstraintType.MUST));
            filtro.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST));
            filtro.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST));
            if (areaSolicitante) {
                filtro.push(DatasetFactory.createConstraint("arealSol", areaSolicitante.charAt(0).toUpperCase() + areaSolicitante.slice(1), areaSolicitante.charAt(0).toUpperCase() + areaSolicitante.slice(1), ConstraintType.MUST));
            }

            if (buscaSolicitante) {
                filtro.push(DatasetFactory.createConstraint("arealSol", buscaSolicitante, buscaSolicitante, ConstraintType.MUST));
            }

            if (buscNumSoli) {
                filtro.push(DatasetFactory.createConstraint("numContrato", buscNumSoli, buscNumSoli, ConstraintType.MUST));
            }

            if (buscStatusSoli && buscStatusSoli != "36") {
                filtro.push(DatasetFactory.createConstraint("idStatus", buscStatusSoli, buscStatusSoli, ConstraintType.MUST));
            }

            if (buscaTipoContrato) {
                filtro.push(DatasetFactory.createConstraint("tipoContrato", "%" + buscaTipoContrato + "%", "%" + buscaTipoContrato + "%", ConstraintType.MUST, true));
            }

            if (dataInicial && dataFinal == "") {
                filtro.push(DatasetFactory.createConstraint("dataInicio", dataInicial, dataInicial, ConstraintType.MUST));
            }

            var dsBiblioteca = DatasetFactory.getDataset("dsBibliContratos", null, filtro, null);
            if (dataInicial && dataFinal) {
                dsBiblioteca.values.forEach(function(i) {
                    var date = new Date(i.dataInicio.split("/")[2], i.dataInicio.split("/")[1] - 1, i.dataInicio.split("/")[0]);
                    if (date >= dateInitial && date <= dateFinal) {
                        dsData.push(i);
                    }
                })
                var row = [];
                var contratada;
                var contratante;
                if (dsData) {
                    for (var i = 0; i <= dsData.length - 1; i++) {
                        row = dsData[i];
                        contratada = row['contratada'].toUpperCase();
                        contratante = row['contratante'].toUpperCase();
                        item = {
                            "numSolicitacao": row['numContrato'],
                            "nomeSolicitante": 'Indeterminado',
                            "areaSol": row['arealSol'],
                            "idTipoDoc": row['tipoContrato'],
                            "contratada": row['contratada'],
                            "contratante": row['contratante'],
                            "objeto": row['objeto'],
                            "dataSolicitacao": row['dataSolicitacao'],
                            "dataInicio": row['dataInicio'],
                            "dataTermino": row['dataTermino'],
                            "formaPagto": row['formaPagto'],
                            "Status": row['fase'],
                            "idStatus": row['idStatus'],
                            "contractFolderId": row['contractFolderId'],
                            "relacaoDePartes": null
                        }

                        if (buscaRazaoSocial) {
                            var texto = new RegExp(buscaRazaoSocial.toLowerCase(), 'g');
                            var buscaContratada = contratada.toLowerCase().match(texto);
                            var buscaContratante = contratante.toLowerCase().match(texto);
                            if (buscaContratada != null || buscaContratante != null) {
                                obj.push(item);
                            }

                        } else {
                            obj.push(item);
                        }
                    }
                }
            } else {
                var row = [];
                var contratada;
                var contratante;
                if (dsBiblioteca.values) {
                    for (var x = 0; x < dsBiblioteca.values.length; x++) {
                        row = dsBiblioteca.values[x];
                        contratada = row['contratada'].toUpperCase();
                        contratante = row['contratante'].toUpperCase();
                        item = {
                            "numSolicitacao": row['numContrato'],
                            "nomeSolicitante": 'Indeterminado',
                            "areaSol": row['arealSol'],
                            "idTipoDoc": row['tipoContrato'],
                            "contratada": row['contratada'],
                            "contratante": row['contratante'],
                            "objeto": row['objeto'],
                            "dataSolicitacao": row['dataSolicitacao'],
                            "dataInicio": row['dataInicio'],
                            "dataTermino": row['dataTermino'],
                            "formaPagto": row['formaPagto'],
                            "Status": row['fase'],
                            "idStatus": row['idStatus'],
                            "contractFolderId": row['contractFolderId'],
                            "relacaoDePartes": null
                        }

                        if (buscaRazaoSocial) {
                            var texto = new RegExp(buscaRazaoSocial.toLowerCase(), 'g');
                            var buscaContratada = contratada.toLowerCase().match(texto);
                            var buscaContratante = contratante.toLowerCase().match(texto);
                            if (buscaContratada != null || buscaContratante != null) {
                                obj.push(item);
                            }

                        } else {
                            obj.push(item);
                        }
                    }
                }
            }
        }

        return obj;
    } catch (ex) {
        console.log("erro no método da biblioteca de contratos");
    }
}

function areasSolicitantes() {
    var objeto = new Array();
    try {
        if (tudo == true) {
            var dataset = DatasetFactory.getDataset('from_areas_solicitantes', null, null, new Array('nomeArea'));
            objeto.push({ "codArea": "", "nomeArea": "Área solicitante" });
            for (var cont = 0; cont < dataset.values.length; cont++) {
                objeto.push({ "codArea": dataset.values[cont].codArea, "nomeArea": dataset.values[cont].nomeArea });
            }
        } else {
            for (var i = 0; i <= grupoId.length - 1; i++) {
                objeto.push({ "codArea": grupoId[i], "nomeArea": grupoNome[i] });
            }
        }
        return objeto;
    } catch (ex) {
        console.log("erro no método areasSolicitantes");
    }
}

function campoAreaSolicitante(parametro) {
    if (parametro.length == 1) {
        $("#areaSolicitante").append("<option value='" + parametro[0].codArea + "'>" + parametro[0].nomeArea + "</option>");
        $("#areaSolicitante option[value=" + parametro[0].codArea + "]").prop('selected', true);
        $("#areaSolicitante").attr('disabled', true);
    } else {
        for (var cont = 0; cont < parametro.length; cont++) {
            $("#areaSolicitante").append("<option value='" + parametro[cont].codArea + "'>" + parametro[cont].nomeArea + "</option>");
        }
    }
}

function loadValues(DataSet, Detail, oLoadingData) {
    // Busca a área soliciante apenas uma vez, com isso ganhamos desempenho, afinal é apenas uma requisa por consulta 	
    var areasSolicitantesV = areasSolicitantes();
    var buscaRazaoSocial = $("#razaoSocial").val();
    //	var itens = buscaRazaoSocial ? consultaPaiFilho(DataSet, buscaRazaoSocial) & consultaBibliContrato : DataSet;
    //var itens = DataSet;	
    var itens = [];
    var buscStatusSoli = $("#statusSolicita").val();
    var buscNumSoli = $("#numIniSolicitacao").val();
    var area = $("#areaSolicitante").val();
    var item = DataSet;

    try {
        for (var i = 0; i <= item.length - 1; i++) {
            var numSolic = item[i]['numSolicitacao'];
            var foundSolic = solicitacoes.content.values.find(x => x["workflowProcessPK.processInstanceId"] == numSolic);
            if (foundSolic) {
                if (foundSolic["status"] == '1' && buscNumSoli == "" || buscStatusSoli == '66') {
                    if (buscStatusSoli == "66" && foundSolic["status"] != '2') {
                        itens.push(item[i]);
                    } else if (buscStatusSoli == "") {
                        itens.push(item[i]);
                    }
                } else if (foundSolic["status"] != '2' && buscStatusSoli != "36" && buscStatusSoli != "66") {
                    itens.push(item[i]);
                } else if ((foundSolic["status"] == '2' && buscNumSoli == "") || (foundSolic["status"] == '2' && buscNumSoli == numSolic)) {
                    if (buscStatusSoli == "36") {
                        itens.push(item[i]);
                    } //else if (area != "" && buscStatusSoli == "") {
                    else if (buscStatusSoli == "") {
                        itens.push(item[i]);
                    }
                }
            } else {
                if (buscStatusSoli == '66') {
                    if (item[i]['idStatus'] == '66') {
                        itens.push(item[i]);
                    }
                } else if (buscStatusSoli != "36" && buscStatusSoli != "66") {
                    itens.push(item[i]);
                } else if (buscStatusSoli == "36") {
                    if (item[i]['idStatus'] == '36') {
                        itens.push(item[i]);
                    }

                }
            }
        }
    } catch (ex) {
        console.log("erro no filtro do load values");
    }
    try {
        var table;
        //VERIFICA SE O GRID JÁ FOI CRIADO
        if ($.fn.dataTable.isDataTable('#gridSolicitacoes')) {
            table = $('#gridSolicitacoes').DataTable({
                buttons: [
                    'excel', 'pdf'
                ]
            });
        } else {
            table = $('#gridSolicitacoes').DataTable({
                "initComplete": function() {},

                dom: 'Blfrtip',
                buttons: [{
                    extend: 'excel',
                    text: '<i class="fluigicon fluigicon-file-xls icon-sm"></i>Excel',
                    className: 'btn btn-primary'
                }, ],
                "paging": true,
                "data": itens,
                "language": {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ".",
                    "sLengthMenu": "_MENU_ resultados por página",
                    "sLoadingRecords": "Carregando...",
                    "sProcessing": "Processando...",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "sSearch": "Filtrar conteudo ",
                    "oPaginate": {
                        "sNext": "Próximo",
                        "sPrevious": "Anterior",
                        "sFirst": "Primeiro",
                        "sLast": "Último"
                    },
                    "oAria": {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    }
                },
                "columns": [
                    // Solicitação 
                    {
                        "class": "numSolicitacao",
                        "orderable": true,
                        "render": function(data, type, full, meta) {
                            //return "<p><a href='/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + full.numSolicitacao + "' target='_blank'>" + full.numSolicitacao + "</a></p>";
                            return "<p><a href='/portal/p/1/ecmnavigation?app_ecm_navigation_doc=" + full.contractFolderId + "' target='_blank'>" + full.numSolicitacao + "</a></p>";
                        }
                    },

                    // Área solicitante 
                    {
                        "class": "areaSol",
                        "orderable": true,
                        "render": function(data, type, full, meta) {
                            for (i = 0; i < areasSolicitantesV.length; i++) {
                                if (areasSolicitantesV[i].codArea == full.areaSol) {
                                    var retorno = "<strong>" + areasSolicitantesV[i].nomeArea + "</strong><br/>" + full.nomeSolicitante;
                                    i = areasSolicitantesV.length;
                                } else {
                                    var retorno = full.areaSol;
                                }
                            }
                            return retorno;
                        }
                    },

                    // Razão Social
                    {
                        "class": "numSolicitacao",
                        "orderable": true,
                        "render": function(data, type, full, meta) {
                            var rsocial = '';
                            if (full.relacaoDePartes) {
                                var json;
                                try {

                                    json = JSON.parse(full.relacaoDePartes);

                                } catch (e) {
                                    try {
                                        json = JSON.parse(full.relacaoDePartes + '"}]');
                                    } catch (e) {
                                        json = JSON.parse(full.relacaoDePartes.split(/([^{,:])"(?![},:])/g).join(""));
                                    }

                                }
                                for (let i = 0; i < json.length; i++) {
                                    rsocial += json[i].texto + ': <strong>' + json[i].razaoSocial + '</strong><br/>';
                                }
                            } else {
                                if (full.contratada) {
                                    rsocial += 'Contratada: <strong>' + full.contratada + '</strong><br/>';
                                }
                                if (full.contratante) {
                                    rsocial += 'Contratante: <strong>' + full.contratante + '</strong><br/>';
                                }
                            }
                            return rsocial;
                        }
                    },

                    // Tipo do documento 
                    {
                        "class": "idTipoDoc",
                        "render": function(data, type, full, meta) {
                            var retorno = full.idTipoDoc + "<p><small><i>" + full.objeto + "</i></small></p>";
                            return retorno;
                        }
                    },

                    // Data de inicio 
                    {
                        "data": "dataInicio",
                        "class": "dataInicio"
                    },

                    // Data de termino
                    {
                        "class": "dataTermino",
                        "orderable": false,
                        "render": function(data, type, full, meta) {

                            var data = full.dataTermino == "" || full.dataTermino == null ? "Indeterminado" : full.dataTermino;
                            return "<p>" + data + "</p>";
                        }
                    },

                    // Status da atividade
                    {
                        "class": "tdvalor",
                        "orderable": false,
                        "render": function(data, type, full, meta) {

                            var status = statusAtv(full.idStatus);
                            var numSolic = full.numSolicitacao;
                            let foundSolic = solicitacoes.content.values.find(x => x["workflowProcessPK.processInstanceId"] == numSolic);
                            if (!foundSolic) {
                                if (buscStatusSoli == '66' && full.idStatus == '66') {
                                    return "<p>Cancelado</p>";
                                } else if (buscStatusSoli == '36' && full.idStatus == '36') {
                                    return "<p>Encerrado</p>";
                                }
                                if (buscStatusSoli != '36' && buscStatusSoli != '66') {
                                    return "<p>" + status.descricao + "</p>";
                                }

                            }
                            if (foundSolic["status"] == '1') {
                                return "<p>Cancelado</p>";
                            } else if (foundSolic["status"] == '2') {
                                return "<p>Encerrado</p>";
                            } else {
                                return "<p>" + status.descricao + "</p>";
                            }
                        }
                    },
                    // Anexos
                    {
                        "class": "tdvalor",
                        "orderable": false,
                        "render": function(data, type, full, meta) {
                            if (full.contractFolderId) {
                                return "<a target ='_blank' href='http://acer.fluig.com:80/portal/p/1/ecmnavigation?app_ecm_navigation_doc=" + full.contractFolderId + "' class='btn btn-default'><i class='fluigicon fluigicon-folder-open icon-xs'></i> Arquivos</a>";
                            } else {
                                return "<p></p>";
                            }

                        }
                    },
                ],
                "sDom": "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6 text-right'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 text-right'p>>",
            });
            //console.log(table['context'][0]['aoData']);
        }
    } catch (err) {
        console.log("Erro no grid");
        console.log(err);
        FLUIGC.toast({
            title: 'Ops! ',
            message: 'Informe ao menos um filtro para refinar a busca!',
            type: 'warning'
        });
        setInterval(function() {
            location.reload()
        }, 1500)
    } finally {
        if (tipoPesquisa == 2)
            oLoadingData.hide();
    }
}