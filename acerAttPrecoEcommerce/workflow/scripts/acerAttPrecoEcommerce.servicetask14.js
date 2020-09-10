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
		if(precoVtex){
			var objPrecoVtex = JSON.parse(precoVtex);
			for (var i = 0; i < objPrecoVtex.fixedPrices.length; i++) {
				var preco = objPrecoVtex.fixedPrices[i];
				var strFixedPRice = JSONUtil.toJSON(preco);
				var cons = getCons('dados', strFixedPRice);
				aFPriceCons.push(cons);
			}	
		}
//			log.info("attPreco1: " + aFPriceCons);
//			var productInfoJson = form.get('productInfoJson');
//			var prod = JSON.parse(productInfoJson);
//			log.info("attPreco2: " + prod);
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
	
	function alteraAnyM(form){
		var precoAnyM = form.get('precoAnyMNovo');
		var objInfo = JSON.parse(form.get('productInfoJson'));
		var sku = objInfo.zeaidweb;
		var resArray = [];
		if(precoAnyM){
			var objPrecoAnyM = JSON.parse(precoAnyM);
			for (var i = 0; i < objPrecoAnyM.length; i++) {
				var anyMCons = [];
				var pAnyM = objPrecoAnyM[i];
				anyMCons.push(getCons('sku',sku));
				anyMCons.push(getCons('id',pAnyM.id));
				anyMCons.push(getCons('price',pAnyM.price));
				anyMCons.push(getCons('priceFactor',pAnyM.priceFactor));
				anyMCons.push(getCons('discountPrice',pAnyM.discountPrice));
				var res = integraAnyM(anyMCons);
				resArray.push(res);
			}
			hAPI.setCardValue("intAnyMRes",JSONUtil.toJSON(resArray));
		}
	}
	
	function integraAnyM(cons){
		var dsEditAnyM = DatasetFactory.getDataset('dsEditPriceAnyM', null,cons , null);
		if(dsEditPriceVtex.rowsCount){
		}
	}
	
	
	

	function getCons(name,value){
		return DatasetFactory.createConstraint(name, value, value, ConstraintType.MUST);
	}

}