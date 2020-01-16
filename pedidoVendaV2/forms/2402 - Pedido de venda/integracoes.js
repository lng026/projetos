var openZoomGerente = function(el){
    //	console.log('abacaxi');
    var id = $(el).attr('id');
    var i = indexFromId(id);
    //openZoom(title, dataset, fields, resultFields, type, filters)
    openZoom("Cliente", "dsUsersRole", "colleagueId,ID,colleagueName,Nome","colleagueId,colleagueName" , ['gerente', i] , ['roleId', 'papel1' ]);
  }
  
  var zoomCliente = function(el){
    //	console.log('abacaxi');
    var cnpjCli = document.querySelector("#pv_cli_cnpj").value;
    //openZoom(title, dataset, fields, resultFields, type, filters)
    openZoom("Cliente", "dsCliente", "CCODIGO,Codigo,CNOME,Nome,CCGC,CGC","CCODIGO,CNOME,CCGC,CMUNICIPIO,CENDERECO" , 'cliente' , ['CCGC', cnpjCli ]);
  }
  

  
  function zoomProdutoCod(el){
    zoomProduto(el,'pv_produto_desc','PRODUCTCODE');
  }
  
  function zoomProdutoDesc(el){
    zoomProduto(el,'pv_pro_modelo','DESCRIPTION');
  }
  
  
  var zoomProduto = function(el, field,filter){
          //	console.log('abacaxi');
          var id = $(el).attr('id');
          var i = indexFromId(id);
          var fil = $('#'+field+'___'+i).val();
  
          if(fil.trim() == '' || fil.length < 3){
              FLUIGC.toast({title: 'Busca:', message: 'Por favor, Digite ao menos as 3 primeiras letras da descrição do produto.', type: 'warning'});
              return 0;
          }
  
          //openZoom(title, dataset, fields, resultFields, type, filters)
          openZoom("Produto", "dsProdutos", "DESCRIPTION,DESCRICAO,PRODUCTCODE,CODIGO,DESCRIPTIONGROUPOFPRODUCT,GRUPO","PRODUCTCODE,DESCRIPTION,TYPEOFPRODUCT,DESCRIPTIONGROUPOFPRODUCT,QUANTITYPERPACKAGE" , ['produto', i] , [filter, fil ]);
      }

  var zoomCli = function(el){
  
  
    //	console.log('abacaxi');
    //var id = $(el).attr('id');
    //var i = id.substring('btZoomCliente___'.length);
    var fil = $('#pv_cli_razao').val();
  
    if(fil.trim() == '' || fil.length < 3){
      FLUIGC.toast({title: 'Busca:', message: 'Por favor, Digite ao menos as 3 primeiras letrar no nome fantasia do cliente.', type: 'warning'});
      return 0;
    }
  
    //openZoom(title, dataset, fields, resultFields, type, filters)
    openZoom("Cliente", "dsCliente", "CCODIGO,Codigo,CNOME,Nome,CCGC,CGC","CCODIGO,CNOME,CCGC,CMUNICIPIO,CENDERECO" , 'cliente' , ['nome', fil ]);
  }
  
  
//abertura de zoom
function openZoom(title, dataset, fields, resultFields, type, filters){
	openZoomWindowParam(title, dataset, fields, resultFields, type, filters);
}
/**
 * @Overload de openZoom
 * Abre janela de zoom.
 * + @param windowParams: Parâmetros da janela de zoom.
 */
function openZoomWindowParam(title, dataset, fields, resultFields, type, filters){
	var windowParams = "status , scrollbars=no ,width=800, height=350 , top=0 , left=0";
	var zoomURL = "/webdesk/zoom.jsp?datasetId="+dataset+"&dataFields="+escape(fields)+"&resultFields="+resultFields+"&type="+type+"&title="+title + (filters?"&filterValues=" + filters:"");
	window.open(zoomURL, "zoom", windowParams);
}
//função que pega retorno do item selecionado no zoom
function setSelectedZoomItem(selectedItem) {
	console.log(selectedItem);
  var tip = selectedItem.type != undefined ? selectedItem.type : selectedItem.inputName;
	var arrayTipo = tip.split(',');
	switch (arrayTipo[0]) {
		case 'gerente':
			var ifc = arrayTipo[1];
      $('#fc_gerente___'+ifc).val(selectedItem.colleagueId);
      $('#fc_gerente_name___'+ifc).val(selectedItem.colleagueName);
			break;
		case 'cliente':
		$('#pv_cli').val(selectedItem.CCODIGO);
		$('#pv_cli_razao').val(selectedItem.CNOME);
		$('#pv_cli_endereco').val(selectedItem.CENDERECO);
		$('#pv_cli_cnpj').val(selectedItem.CCGC);
		$('#pv_cli_municipio').val(selectedItem.CMUNICIPIO);

		console.log(selectedItem);
    break;
    case 'produto':
    var i = arrayTipo[1];
    $('#pv_produto_cod___'+i).val(selectedItem.PRODUCTCODE);
    $('#pv_produto_desc___'+i).val(selectedItem.PRODUCTCODE);
    $('#pv_pro_qyt___'+i).val(selectedItem.QUANTITYPERPACKAGE);
    $('#pv_pro_modelo___'+i).val(selectedItem.DESCRIPTION);
    break;
   
		default:

	}
}