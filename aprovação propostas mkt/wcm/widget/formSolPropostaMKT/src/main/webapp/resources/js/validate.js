
var beforeSendValidate = function(numState, nextState) {
    var aCamposErro = [];
    var cValidade = true
    /* Limpa campos que estavam com erro da validação anterior */
    $(".has-error").removeClass("has-error");
    cValidade = customValidadeBefore(numState, nextState);
    if(cValidade != true){
       return cValidade;
    }
    $("input:required,select:required,textarea:required").each(
        function() {
            var tag = $(this).prop("tagName");
            if(pulaCPaiFilho($(this).prop("id"))){
                return 0;
            }
            switch (tag) {
            case "INPUT":
                var tipo = $(this).prop("type");
                if (tipo == "radio") {
                    var checado = $("[name='"+ $(this).prop("name") + "']:checked");
                    if(checado.length == 0){
                        if(aCamposErro.indexOf($(this).prop("name")) < 0){
                            aCamposErro.push($(this).prop("name"));
                            $(this).closest(".radio").addClass("has-error");
                        }
                    }
                } else if (tipo == "checkbox") {
                    if ($(this).checked == false) {
                        aCamposErro.push($(this).prop("name"));
                        //$(this).closest(".form-group").addClass("has-error");
                        $(this).closest(".form-group").addClass("has-error");
                    }
                }else{
                    if ($(this).val().replace(/\s/g,'') == "") {
                        aCamposErro.push($(this).prop("name"));
                        //$(this).closest(".form-group").addClass("has-error");
                        $(this).closest(".form-group").addClass("has-error");
                     }
                }
                break;
            case "SELECT":
                if ($(this).val() == "" || $(this).val() == 0 || $(this).val() == null) {
                    aCamposErro.push($(this).prop("name"));
                    //$(this).closest(".form-group").addClass("has-error");
                    $(this).closest(".form-group").addClass("has-error");
                }
                break;
            case "TEXTAREA":
                if ($(this).val().replace(/\s/g,'') == "") {
                            aCamposErro.push($(this).prop("name"));
                            //$(this).closest(".form-group").addClass("has-error");
                            $(this).closest(".form-group").addClass("has-error");
                    }

            }
        });

    var aLbl =  getLabelCampo(aCamposErro);
    if (aLbl.length > 0) {
        var txtErro = "Por favor, preencha os campos em vermelho";
        for ( var i = 0; i < aLbl.length; i++) {
            if (aLbl[i] != '') {
                txtErro += "\n" + aLbl[i];
            }
        }
        cValidade =  txtErro;
    }else{
        cValidade = customValidadeAfter(numState, nextState);
    }
    return cValidade;
}

function pulaCPaiFilho(id){
    return ($("#"+id).parents("table").length > 0 && id.indexOf("___") < 0)
}


function validaData(id) {
    var RegExPattern = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])      [\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;
   if (!((id.value.match(RegExPattern)) && (id.value!=''))) {
        alert('Data inválida.');
    }

}

function getLabelCampo(aCampos){
    var aLabel = [];
    for (var e in aCampos) {
        if (aCampos.hasOwnProperty(e)) {
            var c = aCampos[e];
            var lb = $("[name="+c+"]").parent().find("label:first").text();
            aLabel.push(lb);
        }
    }
    return aLabel;

}
//adicionar * a frente de campos obrigatorios
function camposObrigatorios() {
    $("input:required, select:required, textarea:required").each(function(index, value){

      if($(this)[0].type == "radio"){
    	  	var label = $(this).parent().parent().find("label:first");
			if(label.find("span").length > 0){
				label.find("span").remove();
			}
			$(this).parent().parent().find("label:first").append("<span class='obg'> *</span>");
      }else{
			var label = $(this).closest('.form-group').find("label:first");
			if(label.find("span").length > 0){
				label.find("span").remove();
			}
            // $(this).parent('.form-group').find("label:first").append("<span class='obg'> *</span>");
            $(this).closest('.form-group').find("label:first").append("<span class='obg'> *</span>");
          
      }
    });
}

function setDesabilitado(inputId,bDis){
    var e = document.querySelector("#"+inputId);
    setDisable(e,bDis);
}

function setDisable(input,bDis){
    if(input.tagName == "SELECT"){
          if(bDis){
              input.readOnly = bDis;
              input.style.pointerEvents = 'none'
              input.style.touchAction = 'none'
              input.tabIndex = '-1'
              input.ariaDisabled = bDis;
              input.style.background = '#eee';
          }else{
              input.readOnly = bDis;
              input.style.background = '#fff';
              input.ariaDisabled = bDis;
              input.style.pointerEvents = 'auto'
              input.style.touchAction = 'auto'
            }

    } else{
      input.readOnly = bDis;
      $(input).removeClass("date");
      $(input).removeClass("hour");
    }
}

function setObrigatorio(input, obrigatorio){
    if(typeof(input).toLowerCase() == 'string'){
        input = document.querySelector("#"+input);
    }
    input.required = obrigatorio;
    if(!obrigatorio){
        //remove classe obrigatorio
        $(input).removeClass('obrigatorio');

        var label = $(input).parent().find("label:first");
        if(label.find("span").length > 0){
            label.find("span").remove();
        }
    }else{
        $(input).addClass('obrigatorio');
    }
  }

  function setVisibilidade(input, visibilidade,forcarleitura ){
      if(input.tagName == "DIV"){
            setVisibleDiv(input, visibilidade);
      }else if(input.type == 'radio' || input.type == "checkbox"){
        if(visibilidade){
            $(input).parent().parent().show();
            // $(input).closest('.row').show();
            input.readOnly = false;
        }else{
            $(input).parent().parent().hide();
            input.readOnly = true;
        }
      }else{
        if(visibilidade){
            $(input).parent().show();
            // $(input).closest('.row').show();
            input.readOnly = false;
        }else{
            $(input).parent().hide();
            input.readOnly = true;
        }
      }
      if(forcarleitura == true){
    	  input.readOnly = true;
      }else{
	      input.readOnly = false;
      }
  }

  function setVisibleDiv(input,visibilidade){
    input.style.display =  visibilidade ?  'block' : 'none';
    if(visibilidade){
         //habilita campos da div
         input.querySelectorAll("input").forEach(function(e){
            input.readOnly = false;
        });
    }else{
        //desabilita campos da div
        input.querySelectorAll("input").forEach(function(e){
            input.readOnly = true;
        });
    }

  }

  
  function AtualizaDiv(div){
    var divElement = document.querySelector('#'+div.name);

    divElement.style.display =  div.visivel ?  'block' : 'none';
    divElement.querySelectorAll("input,select,textarea").forEach(function(e){
        setVisibilidade(e,div.visivel);
        setDisable(e,!div.habilitado);
        setObrigatorio(e,div.obrigatorio);
        setVazio(e,div.vazio);
    });
  }

  function getDivInputs(div){
    var divElement = document.querySelector('#'+div);
    return divElement.querySelectorAll("input,select,textarea");
  }

  // retorna string de data dd/mm/yyyy - 21/12/2222
function dateToString(dt){
    return ""+addZero(dt.getDate())+"/"+addZero(dt.getMonth()+1)+"/"+dt.getFullYear();
}

  // retorna string de data  e hora dd/mm/yyyy H:i:s
function dateHToString(dt){
    var dtStr =  ""+addZero(dt.getDate())+"/"+addZero(dt.getMonth()+1)+"/"+dt.getFullYear();
    dtStr += " "+addZero(dt.getHours())+":"+addZero(dt.getMinutes())+":"+addZero(dt.getSeconds());
    return dtStr;
}
//adiciona 0 ao mes caro tenha apenas um digito, entao 1 = 01
function addZero(n){
    var nn;
    if(n < 10){
        nn = "0"+ n.toString();
    }else{
        nn = ""+ n.toString();

    }
    return nn;
}