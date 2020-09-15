function servicetask14(attempt, message) {
 	try {
		var numProcess = getValue("WKNumProces");
		var usuario = getValue("WKUser");
		var form = hAPI.getCardData(numProcess);
		alteraVTEX(form);
		alteraAnyM(form);
		
	} catch(error) { 
		log.error(error);
		throw error;
	}

	
	function alteraVTEX(form){
		var precoVtex = form.get('precoVtexNovo');
		var aFPriceCons = []
		var hasEdit = false;
		if(precoVtex){
			var objPrecoVtex = JSON.parse(precoVtex);
			for (var i = 0; i < objPrecoVtex.fixedPrices.length; i++) {
				var preco = objPrecoVtex.fixedPrices[i];
				if(preco.edit){
					hasEdit = true;
					var strFixedPRice = JSONUtil.toJSON(preco);
					var cons = getCons('dados', strFixedPRice);
					aFPriceCons.push(cons);
				}
			}	
		}
		// verifica se precisa editar precos na vTEX
		// se nao precisa coloca integracao como nao necessaria e nao executa
		if(!hasEdit){
			hAPI.setCardValue("intOK", "2");
		}else{
			aFPriceCons.push(getCons('sku',objPrecoVtex.itemId));
			aFPriceCons.push(getCons('listPrice',objPrecoVtex.listPrice));
			aFPriceCons.push(getCons('costPrice',objPrecoVtex.costPrice));
			aFPriceCons.push(getCons('markup',objPrecoVtex.markup));
			aFPriceCons.push(getCons('basePrice',objPrecoVtex.basePrice));

			for (var i = 0; i < aFPriceCons.length; i++) {
				log.info("aFPriceCons " + i + " " + aFPriceCons[i]);
			}
			var dsEditPriceVtex = DatasetFactory.getDataset('dsEditPriceVtex', null,aFPriceCons , null);

			if(dsEditPriceVtex.rowsCount){
				var dsRes = {
						'sku': dsEditPriceVtex.getValue(0,'sku'),
						'dados':  dsEditPriceVtex.getValue(0,'dados')
				}
				log.info("attPreco4: " + JSONUtil.toJSON(dsRes));
				hAPI.setCardValue("resultInt", JSONUtil.toJSON(dsRes) );
				if(dsRes['sku']){
					var aux = dsRes['sku'].split(':');
					if(aux[1].trim() == "SUCCESS" && dsRes['dados'].trim() == ""){
						hAPI.setCardValue("intOK", "1");
					}
				}
			}
		}

	}
	
	function alteraAnyM(form){
		var precoAnyM = form.get('precoAnyMNovo');
		var objInfo = JSON.parse(form.get('productInfoJson'));
		var sku = objInfo.zeaidweb;
		var resArray = [];
		hasEdit = false;
		if(precoAnyM){
			var objPrecoAnyM = JSON.parse(precoAnyM);
			for (var i = 0; i < objPrecoAnyM.length; i++) {
				var pAnyM = objPrecoAnyM[i];
				if(pAnyM.edit){
					hasEdit = true;
					var anyMCons = [];
					anyMCons.push(getCons('sku',sku));
					anyMCons.push(getCons('id',pAnyM.id));
					anyMCons.push(getCons('price',pAnyM.priceanyM));
					// anyMCons.push(getCons('priceFactor',pAnyM.priceFactor));
					anyMCons.push(getCons('discountPrice',pAnyM.discountPrice));
					var res = integraAnyM(anyMCons);
					res['id'] = pAnyM.id;
					resArray.push(res);
				}
			}

			if(!hasEdit){
				hAPI.setCardValue("intAnyMOK",'2');
			}else{
				intok = true;
				for (var i = 0; i < resArray.length; i++) {
					var dsRes = resArray[i];
					var aux = dsRes['sku'].split(':');
					var objdados = JSON.parse(dsRes['dados']);
					if(aux[1].trim() != "SUCCESS" || !objdados['id']){
						intok = false;
					}
					log.info("attPreco5: " + JSONUtil.toJSON(dsRes));
					// hAPI.setCardValue("resultInt", JSONUtil.toJSON(dsRes) );
				}
				if(!intok){
					hAPI.setCardValue("intAnyMOK",'0');
				}else{
					hAPI.setCardValue("intAnyMOK",'1');
				}
				hAPI.setCardValue("intAnyMRes",JSONUtil.toJSON(resArray));
			}

		
		}
	}
	
	function integraAnyM(cons){
		var dsRes = [];
		var dsEditAnyM = DatasetFactory.getDataset('dsEditPriceAnyM', null,cons , null);
		if(dsEditAnyM.rowsCount){
			var aux = {
				'sku': dsEditAnyM.getValue(0,'sku'),
				'dados':  dsEditAnyM.getValue(0,'dados')
			}
			dsRes = aux;
		}
		return dsRes;
	}
	
	
	

	function getCons(name,value){
		return DatasetFactory.createConstraint(name, value, value, ConstraintType.MUST);
	}

}