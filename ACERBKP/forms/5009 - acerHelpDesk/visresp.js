			function showDate(dia,mes,ano,horas,minutos){
		    	 	mes = mes+1;
					dia = ('0' + dia).slice(-2);
					mes = ('0' + mes).slice(-2);
					horas = ('0' + horas).slice(-2);
					minutos = ('0' + minutos).slice(-2);
		          
		            var data = dia + "/" + mes + "/" + ano + " " + horas + ":" + minutos;
		            return data;
		    }

			    function visResp(){

		        var trs = document.querySelectorAll('.trResp');

		        trs.forEach(function(e,i){

	                console.log(i); 
	                console.log(e);
	                if(i){


	                        var aResps =  e.querySelector('.resposta');
	                        var nomeRsp = getInputValue(e.querySelector('.nomeRsp')); 
	                        var dataRsp = getInputValue(e.querySelector('.dataRsp'));


	                        var login = $('#loginresp___'+ i).val();
	                        e.style.display = 'none';
	                        var aRespVal = getInputValue(aResps);
	                        var RespBr = aRespVal.replace(/\r\n|\r|\n/g,"<br />");

	                        var view = '';

	                        // GERA DATA DA RESPOSTA

 							var dtResp = new Date();
							
							// GERA VISUALIZAÇÃO DA DATA 
							var dia_rsp = dtResp.getDate();
							var mes_rsp = dtResp.getMonth();
							var ano_rsp = dtResp.getFullYear();
							var hora_rsp = dtResp.getHours();
							var minuto_rsp = dtResp.getMinutes();
							// var login = $('#login').val();

							var mostraDtRsp = showDate(dia_rsp,mes_rsp,ano_rsp,hora_rsp,minuto_rsp);
							var getuser = getWKUser();

							view += '<div class="row" id="resp_view" name="resp_view" style="height: auto;">'
							view += '<div class="col-md-1 pull-left">'
							view += '<div class="pull-left well" style="'
							view +=     'padding-right: 8px;'
							view +=     'padding-left: 8px;'
							view +=     'padding-top: 8px;'
							view +=     'padding-bottom: 8px;'
							view +=     'margin-bottom: 0px;'
							view +=     'margin-top: -;'
							view += '"><a href="/portal/p/1/social/'+login+'" class="pull-left">'
							view += '<div data-user-popover="'+ login +'">'
							view += '<img src="/social/api/rest/social/image/profile/'+login+'/X_SMALL_PICTURE" class="fluig-style-guide thumb-profile img-rounded thumb-profile-sm thumb-profile-sm-legacy" data-update-image-profile="'+login+'" data-image-size="SMALL_PICTURE">'
							view += '</div></a></div></div>'
							view += '<div class="col-md-11">'
							view += '<div class="content-fluid"><p id="resp_nome" name="resp_nome" class="sidenav_txt">'
							view += ''+ nomeRsp +' | <small>'+ dataRsp +'</small></p></div><div class=""><div name="resp_campo" id="resp_campo" class="panel panel-default panel-body">'
							view += ''+ RespBr +'</div></div></div></div>'

							document.querySelector('#divresp').innerHTML += view;

	                }
	               
	        });

	}
