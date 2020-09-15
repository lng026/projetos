$(document).on("keypress", ".input-group:has(input:input, span.input-group-btn:has(div.btn)) input:input", function(e){
    if (e.which == 13){
        $(this).closest(".input-group").find("div.btn").click();
    }
});
$(document).on("ready",function(){
	// --------------------------------
	setCamposObrigatorios(['partNumber','descProduto']);
	exibeProdInfo();
	mostrarHistorico();
	// GetTaxa de prexo
	
	var cParams = getCustomParams('attPreco');
	var taxSobreCusto = cParams['taxSobreCusto']; 
	if(taxSobreCusto){
		$("#taxSobreCusto").val(taxSobreCusto);
	}
	// --------------------------------
	// Control form //
	var atvAtual =  $("#atvAtual").val().trim();
	if(atvAtual == '5' || atvAtual	== '25'){
		
		setCamposBloqueados(['partNumber','descProduto']);
		// setCamposObrigatorios();
		// setCamposEscondidos();
		
		//Validar preço que será alterado
		if(atvAtual == '5'){
			exibeDivs(['aprovdiv']);
			$("#aprov").on("change",function(){
				valObrAprov('aprov','aprovObs');
			});
		}
		//Validar Alteração de preço no ecommerce
		if(atvAtual == '25'){
			exibeDivs(['valDiv']);
			$("#valInt").on("change",function(){
				valObrAprov('valInt','valIntObs');
			});
		}


		mostrarHistorico();
		$('#selectProd').find('button').attr('disabled','disabled');
		$('.date').removeClass("date");
		setDisableDiv('priceVtexDiv');
	}

	var formMode =  $("#formMode").val().trim();
		if(formMode == 'VIEW'){
			$('#allForm').find('button').attr('disabled','disabled');
			$('button').attr('disabled','disabled');
			setDisableDiv('allForm');
		}
	
});

function getProByCod() {
	showDsProdutos('partNumber','PRODUCTCODE')
}
function getProByDesc() {
	showDsProdutos('descProduto','DESCRIPTION')
}
function showDsProdutos(formField, dsField){
	var dsColleague = new DatasetModel('dsProdutos',"#result");
	dsColleague.title = "Consulta de Produtos por código"
	dsColleague.fields = ['PRODUCTCODE','DESCRIPTION','TYPEOFPRODUCT','DESCRIPTIONGROUPOFPRODUCT','QUANTITYPERPACKAGE'];
	dsColleague.fieldsView = {'DESCRIPTION': 'DESCRICAO','PRODUCTCODE': 'CODIGO','DESCRIPTIONGROUPOFPRODUCT' : 'GRUPO'};
	dsColleague.fieldsFilter = [dsField];
	dsColleague.identificador ='PRODUCTCODE';
	// dsColleague.addContraint('active',true,1,false);
	dsColleague.filter = $("#"+formField).val();
	dsColleague.selectedItemEvent = (items) => {
		if(items.length){
            item = items[0];
			console.log(item);
			$("#descProduto").val(item.DESCRIPTION);
			$("#partNumber").val(item.PRODUCTCODE);
			var infoProd = getCustoProduto(item.PRODUCTCODE);
			// forcar id anyMarket para teste
			infoProd.zeaidweb = 1282485;
			// --------------------------
			if(infoProd){
				var precoMin = getMinValueProd(parseFloat(infoProd['cml']));
				infoProd['precoMin'] = precoMin;
				infoProd.descproduto = infoProd.descproduto.replace('"','');
				var jsonObj = JSON.stringify(infoProd);
				var precoVtex = getPriceVtex(infoProd.b1xidsku);
				precoVtex.fixedPrices.sort(sordPrice)
				$("#productInfoJson").val(jsonObj);
				$("#precoAtualVtex").val(JSON.stringify(precoVtex));
				var precoam = getPriceAnyM(infoProd.zeaidweb);
				if(precoam){
					$("#precoAtualAnyM").val(JSON.stringify(precoam));
				}
				exibeProdInfo();
			}
		}
	}
	dsColleague.showModal();
}
function sordPrice(a,b){
	if(a['tradePolicyId'] < b['tradePolicyId'] ) return -1;
	if(a['tradePolicyId'] > b['tradePolicyId'] ) return 1;
	return 0;
}

function exibeProdInfo(){
	// mostra info do produto
	var ojbstr = $("#productInfoJson").val();
	if(ojbstr){
		showInfoProd(ojbstr);
	}
	showPrecoVtex();
	showPrecoAnyM();
}

function showPrecoAnyM(){
	var isNovo = true;
	var precoAnyM = $("#precoAnyMNovo").val();
	if(!precoAnyM){
		precoAnyM = $("#precoAtualAnyM").val();
		isNovo = false;
	} 
	if(precoAnyM){
		objMArketPlaces = JSON.parse(precoAnyM);
		objMArketPlaces.forEach(mp => {
			if(isNovo && !mp.edit){
				return;
			}
			if(!isNovo){
				mp['priceanyM'] = getAnyMPriceM(mp.price,mp.priceFactor);
			}
			var nTr = addTrAnyM(mp);
			$("#priceAnyMBody").append(nTr);
		});
	}
	if(isNovo){
		$(".anyMEditchk").closest('td').hide();
	}
}
function showPrecoVtex() {
		// mostra preços atual na vtex
		var precoVtex = $("#precoVtexNovo").val();
		var isNovo = true;
		if(!precoVtex){
			isNovo = false;
			precoVtex = $("#precoAtualVtex").val();
		}
		// limpa preços vtext
		$("#priceVtexBody").html('');
		$("#priceBaseVtex").html('');
		if(precoVtex){
			var objPrecoVtex = JSON.parse(precoVtex);
			showPrecoBaseVtex(objPrecoVtex);
			objPrecoVtex.fixedPrices.forEach(preco => {
				if(isNovo && !preco.edit){
					return;
				}
				var trPreco =  addTrPriceVtex(preco);
				$("#priceVtexBody").append(trPreco);
			});	
		}
		// if($("#atvAtual").val().trim() != "5"){
		// 	setDateTime();
		// }
		if(isNovo){
			$(".vtexEditchk").closest('td').hide();
		}
  }

function showInfoProd(ojbstr){
	$("#infoProdutosDiv").show();
	var obj = JSON.parse(ojbstr);
	console.log(obj);
	$("#infoCod").html(obj.codproduto);
	$("#infoDesc").html(obj.descproduto);
	$("#infoLocal").html(obj.local);
	$("#infoQatual").html(obj.qatual);
	$("#infoCml").html(trataValor(obj.cml));
	$("#infoPrecoMin").html(trataValor(obj.precoMin));
}

function showPrecoBaseVtex(objPrecoVtex) {  
	pBaseHtml = `
			<input type="hidden" id="pbItemId" value="${objPrecoVtex.itemId}"/>
			<input type="hidden" class="form-control" id="pbBasePrice" value="${trataValor(objPrecoVtex.basePrice)}"/>
			<div class="col-md-4"><label>List Price</label><input type="text" class="form-control" id="pbListPrice" value="${trataValor(objPrecoVtex.listPrice)}"/> </div>
			<div class="col-md-4"><label>Cost Price</label><input type="text" class="form-control" id="pbCostPrice" value="${trataValor(objPrecoVtex.costPrice)}"/> </div>
			<div class="col-md-4"><label>MarkUp Price</label><input type="text" class="form-control" id="pbMarkup" value="${trataValor(objPrecoVtex.markup)}"/> </div>
			<div class="row"></div>
		`;
		$("#priceBaseVtex").append(pBaseHtml);
}

function getMinValueProd(custo){
	var taxCusto = $("#taxSobreCusto").val();
	taxCusto = parseFloat(taxCusto.trim());
	var precoMin = custo + (custo * (taxCusto/100));
	return precoMin;
}
// Custom Validade
function customValidadeBefore(numState, nextState){
	var validate = true;
	if(numState < 5){
		validate = validaPrecoMin();
		if(validate == true){
			var validate = validaPRecoVtex();
			if(validate ==  true) {
				validate = validaPrecoAnyM();
			}
			if(validate ==  true){
				savePrecoVtex();
				savePrecoAnyM();
				var verPrecoVtex = $("#precoVtexNovo").val();
				var verPrecoAny = $("#precoAnyMNovo").val();
				if(!verPrecoVtex || !verPrecoAny){
					validate = "Erro ao salvar dados!";
				}
				if(numState <= 4){
					validate = verHasChanges();
				}
			}
		}
	}
	return validate;
}
function customValidadeAfter(numState, nextState){
	var validate = true;
	
	// Salva historico caso pertinente
	if(numState == 5){
		salvaHistorico('aprov','aprovObs');
	}
	// // Aprovação da cordenação
	// if(numState == 9){
	// 	salvaHistorico('aprovCord','aprovCordObs');
	// }
	// // Aprovação do Diretor
	// if(numState == 13){
	// 	salvaHistorico('aprovDir','aprovDirObs');
	// }
	return validate;

}

function verHasChanges(){
	var hasChanges = false;
	var verPrecoVtex = $("#precoVtexNovo").val();
	var vprice = JSON.parse(verPrecoVtex);
	vprice.fixedPrices.forEach(e => {
		if(e.edit){
			hasChanges = true;
			return;
		}
	});
	var verPrecoAny = $("#precoAnyMNovo").val();
	vPriceanm = JSON.parse(verPrecoAny);
	vPriceanm.forEach(e => {
		if(e.edit){
			hasChanges = true;
			return;
		}
	});
	if(!hasChanges){
		hasChanges = "Altere pelo menos um preço para avançar.";
	}
	return hasChanges;
}

function getCustoProduto(codproduto){
	var cs = DatasetFactory.createConstraint('codproduto', codproduto, codproduto, ConstraintType.MUST);
	var dsCustoProduto = DatasetFactory.getDataset('dsCustoProduto', null, new Array(cs), null);
	var infos= null;
	if(dsCustoProduto.values.length){
		for (var i = 0; i < dsCustoProduto.values.length; i++) {
			let element = dsCustoProduto.values[i];
			if(element['local'].trim() == 'ES'){
				infos = element;
				break;
			}
		}
	}7
	return infos;
}

//Funcao que busca parametros no dataset com configuracoes customizadas 
function getCustomParams(cat){
	var c1 = DatasetFactory.createConstraint('categoria',cat,cat, ConstraintType.MUST);
	var ds = DatasetFactory.getDataset('customConfigs', null, new Array(c1), null);
	aParametros = new Array();
	for (var i = 0; i < ds.values.length; i++) {
		aParametros[ds.values[i]['parametro']] = ds.values[i]['valor'];
	}
	return aParametros;
}



function getPriceVtex(sku){
	var objVtex = {'fixedPrices':[]};
	var cs1 = DatasetFactory.createConstraint('sku', sku, sku, ConstraintType.MUST);
	var dsGetPriceVtex = DatasetFactory.getDataset('dsGetPriceVtex', null, new Array(cs1), null);
	if(dsGetPriceVtex.values.length){
		// get sale channel
		var salesChannels = getSalesChannelsVtex();
		aFixPrices = [];
		for (let i = 0; i < dsGetPriceVtex.values.length; i++) {
			const element = dsGetPriceVtex.values[i];
			if(!element['tradePolicyId']){
				objVtex = JSON.parse(element['sku']);
			}else{
				dsGetPriceVtex.values[i]['saleChannel'] = getSaleChannelName(element['tradePolicyId'],salesChannels);
				aFixPrices.push(element);
			}
		}
		 
	}
	objVtex['fixedPrices']= aFixPrices;
	return objVtex;
}

function getPriceAnyM(sku) {
	var c1 = DatasetFactory.createConstraint('sku', sku, sku, ConstraintType.MUST);
	var ds = DatasetFactory.getDataset('dsGetPriceAnymarket', null, new Array(c1), null);
	return ds.values;
}


function getSalesChannelsVtex(){
	var dsSalesChannelVtex = DatasetFactory.getDataset('dsGetSalesChannelVtex', null, null, null);
	return dsSalesChannelVtex.values;
}

function getSaleChannelName(id,salesList){
	var name = "";
	for (let i = 0; i < salesList.length; i++) {
		const element = salesList[i];
		if(id == parseInt(element.Id)){
			name = element.Name;
		};
	}
	return name;

}

function addTrPriceVtex(pVal){
	var dateFrom = '';
	var dateTo = '';
	if(pVal.dateRange){
		if(typeof(pVal.dateRange) == "string"){
			var oDRange =  JSON.parse(pVal.dateRange);
		}else{
			var oDRange = pVal.dateRange;
		}
		
		dateFrom = getDateStrFromIso(oDRange.from);
		dateTo = getDateStrFromIso(oDRange.to);
	}
	var trbody = `<tr class="trPriceVtex" id="${pVal.tradePolicyId}">
			<td><span id="vtexSaleChannel">${pVal.saleChannel}</span></td>
			<td><input type="text" class="form-control" id="vtexValue" value="${trataValor(pVal.value)}" readonly/></td>
			<td><input type="text" class="form-control" id="vtexListPrice" value="${trataValor(pVal.listPrice)}" readonly/></td>
			<td><input type="text" class="form-control" id="vtexMinQnt" value="${trataValor(pVal.minQuantity)}" readonly/></td>
			<td><input type="text" class="form-control" id="vtexDateFrom" value="${dateFrom}" readonly /></td>
			<td><input type="text" class="form-control" id="vtexDateTo" value="${dateTo}" readonly /></td>
			<td><input type="checkbox" class="vtexEditchk" id="vtexEdit" data-on-color="success"  onChange="tlgEditPrice(this)"/></td>
		</tr>`;
	return trbody;
}
function addTrAnyM(mp){
	var trbody = `<tr class="trPriceAnyM" id="${mp.id}"> 
		<td><span id="anyMSaleChannel">${mp.marketPlace}</span></td>	
		<td><input type="text" class="form-control" id="anyMPriceBase" value="${trataValor(mp.price)}" readonly/></td>
		<td><input type="text" class="form-control" id="anyMPriceFactor" value="${mp.priceFactor}" readonly/></td>
		<td><input type="text" class="form-control" id="anyMPrice" value="${mp.priceanyM}" readonly/></td>
		<td><input type="text" class="form-control" id="anyMDiscountPrice" value="${trataValor(mp.discountPrice)}" readonly/></td>
		<td><span id="anyMStatus">${mp.marketplaceStatus}</span></td>
		<td><input type="checkbox" class="anyMEditchk" id="anyMEditchk" data-on-color="success"  onChange="tlgEditAnyM(this)"/></td>
		</tr>`;
	return trbody;
}



function trataValor(val){
	if(!val) return 0;
	if(typeof(val) == "string"){
		val = val.trim();
		val = val.replace(',','');
	}
	return parseFloat(val).toFixed(2);
}
function getAnyMPriceM(price, priceFactor){
	var nprice = parseFloat(price);
	var npriceF = parseFloat(priceFactor);
	return (nprice*npriceF).toFixed(2);
}

function validaPRecoVtex(){
	var val = true;
	var trs = $("#priceVtexBody").find('.trPriceVtex');
	var listPriceVtex = $("#pbListPrice").val();
	listPriceVtex = parseFloat(listPriceVtex);
	trs.each((id,tr) => {
		var listPrice = $(tr).find("#vtexListPrice").val();
		listPrice = parseFloat(listPrice);
		if(listPriceVtex > 0 && listPrice < listPriceVtex){
			val = "O List Price do canal de venda deve ser maior que  List Price do Preço Base.";
			$(tr).find("#vtexListPrice").closest('td').addClass("has-error")
			return;
		}
		var vtexDateFrom  = $(tr).find("#vtexDateFrom").val()
		var vtexDateTo  = $(tr).find("#vtexDateTo").val()
		if((!vtexDateFrom.trim() && vtexDateTo.trim()) || 
			(vtexDateFrom.trim() && !vtexDateTo.trim())){
			val = "É necessário inserir a data inicial e final";
			$(tr).find("#vtexDateFrom").closest('td').addClass("has-error")
			$(tr).find("#vtexDateTo").closest('td').addClass("has-error")
			return;
		}
	});
	return val;
}

function validaPrecoAnyM(){
	var val = true;
	var trs = $('.trPriceAnyM');
	var ojbstr = $("#productInfoJson").val();
	var produto = JSON.parse(ojbstr);
	var precoMin = parseFloat(produto.precoMin);
	trs.each((id,tr) => {
		 var anyMPrice= $(tr).find('#anyMPrice').val();
		 anyMPrice = parseFloat(anyMPrice);
		 if(anyMPrice < precoMin){
			$(tr).find('#anyMPrice').closest('td').addClass("has-error");
			 val = "O Price do produto não pode ser menor que o preço mínimo calculado.";
			 val += "\n Preço mínimo:  "+ precoMin.toFixed(2);
			 return false; 
		 }
	});
	return val;
}


function validaPrecoMin(){
	var validate = true;
	var ojbstr = $("#productInfoJson").val();
	var costPricestr = $("#pbCostPrice").val();
	var produto = JSON.parse(ojbstr);
	var precoMin = parseFloat(produto.precoMin);
	var costPrice = parseFloat(costPricestr);
	if(costPrice < precoMin){
		validate = "O Cost Price do produto não pode ser menor que o preço mínimo calculado."
		validate += "\n Preço mínimo:  "+ precoMin.toFixed(2);
		$("#pbCostPrice").closest('div').addClass("has-error");
	}
	return validate;
	
}

function savePrecoVtex(){
	var trs = $("#priceVtexBody").find('.trPriceVtex');
	var aObgPrecos =[];
	trs.each((id,tr) => {
		var tradePolicyId = tr.id;
		var value = $(tr).find("#vtexValue").val()
		var listPrice = $(tr).find("#vtexListPrice").val()
		var minQnt = $(tr).find("#vtexMinQnt").val()
		
		var vtexDateFrom  = $(tr).find("#vtexDateFrom").val()
		var vtexDateTo  = $(tr).find("#vtexDateTo").val()
		var rangeDate = '';
		if(vtexDateTo && vtexDateFrom){
			var dDateTo = getDateTimeFromString(vtexDateTo);
			var dDateFrom = getDateTimeFromString(vtexDateFrom);
			rangeDate = GetDateRangeString(dDateFrom,dDateTo);
		}
		var channel = $(tr).find("#vtexSaleChannel").text()
		var chk = $(tr).find("#vtexEdit").prop('checked');
		var fPrice = newFixedPrice(
						tradePolicyId,
						parseFloat(value),
						parseFloat(listPrice),
						parseInt(minQnt),
						rangeDate,
						channel,
						chk
						);
		aObgPrecos.push(fPrice);
	});
	
	var pbListPrice = $("#pbListPrice").val();
	var pbCostPrice = $("#pbCostPrice").val();
	var pbMarkup = $("#pbMarkup").val();
	var pbBasePrice = $("#pbBasePrice").val();
	var pbItemId = $("#pbItemId").val();
	var ObjPreco = {
		"itemId": pbItemId,
		"listPrice": pbListPrice,
		"costPrice": pbCostPrice,
		"markup": pbMarkup,
		"basePrice": pbBasePrice,
		"fixedPrices": aObgPrecos
	}
	//pbListPrice - pbCostPrice - pbMarkup - pbBasePrice- pbItemId

	$("#precoVtexNovo").val(JSON.stringify(ObjPreco));
}

function savePrecoAnyM(){
	var trs = $("#priceAnyMBody").find('.trPriceAnyM');
	var anyPrecos = [];
	trs.each((id,tr) => {
		var id = $(tr).attr("id");
		var anyMSaleChannel = $(tr).find("#anyMSaleChannel").text();
		var anyMPrice = $(tr).find("#anyMPriceBase").val();
		var anyMPriceFactor = $(tr).find("#anyMPriceFactor").val();
		var anyMEditchk = $(tr).find("#anyMEditchk").prop('checked');
		var anyMStatus = $(tr).find("#anyMStatus").text();
		var anyMDiscountPrice = $(tr).find("#anyMDiscountPrice").val();
		var priceanyM = $(tr).find("#anyMPrice").val();
		anyObj = newAnymarketPrice(id,anyMPrice,anyMPriceFactor,anyMEditchk,anyMStatus,anyMSaleChannel,priceanyM,anyMDiscountPrice);
		anyPrecos.push(anyObj);
	});
	$("#precoAnyMNovo").val(JSON.stringify(anyPrecos));
}

function newAnymarketPrice(_id,_price,_priceFactor,_edit,_status,_saleChannel,_priceanyM, _discountPrice){
	obj = {
		'id' : _id,
		'price' :_price,
		'priceFactor': _priceFactor,
		'marketplaceStatus': _status,
		'marketPlace': _saleChannel,
		'edit': _edit,
		'discountPrice': _discountPrice,
		'priceanyM': _priceanyM
	}
	return obj;
}

function newFixedPrice(_id,_value,_listPrice, _minQuantity, _date,_channel,_edit){
	var obj = {
		"tradePolicyId": _id,
		"value": _value,
		"listPrice": _listPrice,
		"minQuantity": _minQuantity,
		"saleChannel":	_channel,
		"edit": _edit,		
		"dateRange" : ""
	  }
		if(_date){
			obj["dateRange"] =  _date ? _date : null
		}
	return obj;
}

function GetDateRangeString(from, to){
	dateRange = {
        "from": from.toISOString(),
        "to": to.toISOString()
	  };
	  return dateRange;
}

function setDateTime(){
	var dateTime = FLUIGC.calendar('.date', {
		pickDate: true,
		pickTime: true,
		sideBySide: true
	});
}

function getDateTimeFromString(dtStr){
	var nDate = null;
	if(dtStr){
		var Aaux = dtStr.split(" ");
		aHour = Aaux[1].split(':');
		var nDate = dateFromString(Aaux[0]);
		nDate.setHours(aHour[0], aHour[1])	
	}
	return nDate;
}
function dateFromString(dtString){
    var aDt = dtString.split("/");
    var nDt = new Date();
    nDt.setDate(aDt[0]);
    nDt.setMonth(parseInt(aDt[1]) - 1);
    nDt.setFullYear(aDt[2]);
    return nDt;
}

function getDateStrFromIso(isoStr){
	var dt = new Date(isoStr);
	var str =  ""+addZero(dt.getDate())+"/"+addZero(dt.getMonth()+1)+"/"+dt.getFullYear();
	str += " "+ addZero(dt.getHours())+":"+addZero(dt.getMinutes());
	return str;
}

function addZero(n){
    var nn;
    if(n < 10){
        nn = "0"+ n.toString();
    }else{
        nn = ""+ n.toString();

    }
    return nn;
}

// -----
function tlgEditPrice(e){
	console.log(e);
	var tr = $(e).closest(".trPriceVtex");
	if(e.checked){
		enableTrEditPrice(tr);
	}else{
		disableTrEditPRice(tr);
	}
}

function tlgEditAnyM(e){
	var tr = $(e).closest(".trPriceAnyM");
	$(tr).find('#anyMPrice').attr('readonly',!e.checked);
	$(tr).find('#anyMDiscountPrice').attr('readonly',!e.checked);
}



function enableTrEditPrice(tr){
	$(tr).find('#vtexValue').attr('readonly',false);
	$(tr).find('#vtexListPrice').attr('readonly',false);
	$(tr).find('#vtexMinQnt').attr('readonly',false);
	$(tr).find('#vtexDateFrom').addClass('date');
	$(tr).find('#vtexDateTo').addClass('date');
	setDateTime();
	FLUIGC.calendar($(tr).find('#vtexDateFrom')).enable();
	FLUIGC.calendar($(tr).find('#vtexDateTo')).enable();
}
function disableTrEditPRice(tr){
	$(tr).find('#vtexValue').attr('readonly',true);
	$(tr).find('#vtexListPrice').attr('readonly',true);
	$(tr).find('#vtexMinQnt').attr('readonly',true);
	$(tr).find('#vtexDateFrom').removeClass('date');
	$(tr).find('#vtexDateTo').removeClass('date');
	FLUIGC.calendar($(tr).find('#vtexDateFrom')).disable();
	FLUIGC.calendar($(tr).find('#vtexDateTo')).disable();
	resetPriceValue(tr);
}


function resetPriceValue(tr){
	id = $(tr).attr('id');
	precoVtex = $("#precoAtualVtex").val();
	var objPrecoVtex = JSON.parse(precoVtex);
	objPrecoVtex.fixedPrices.forEach(preco => {
		if(preco.tradePolicyId == id){
			//
			$(tr).find('#vtexValue').val(trataValor(preco.value));
			$(tr).find('#vtexListPrice').val(trataValor(preco.listPrice));
			$(tr).find('#vtexMinQnt').val(trataValor(preco.minQuantity));
			var dateFrom ='' , dateTo='';
			// verificar daes
			if(preco.dateRange){
				if(typeof(preco.dateRange) == "string"){
					var oDRange =  JSON.parse(preco.dateRange);
				}else{
					var oDRange = preco.dateRange;
				}
				dateFrom = getDateStrFromIso(oDRange.from);
				dateTo = getDateStrFromIso(oDRange.to);
			}
			$(tr).find('#vtexDateFrom').val(dateFrom);
			$(tr).find('#vtexDateTo').val(dateTo); 
		}
	});
}


