	$(document).ready(function(){
	 document.querySelector('#inputFile').addEventListener('change', function(e){
		var folderId = $("#idFolder").val();
		if(!e.target.files[0] || !folderId ){
			return false;
		}
		var file = e.target.files[0];
		var data = new FormData();
		data.append('file',file);
		fetch('/ecm/upload', {
			headers : {Authorization: oauthString()},
			method: 'POST',
			body: data
		}).then(res => res.ok ? res.json() : res) 
			.then((res) => {
				console.log(res);
				creatDocumentRest(file,folderId);
			}).catch((data) => {
				console.log(data);
				FLUIGC.toast('Houve um erro ao criar o documento no GED', 'danger');
			});
		});
	});

// cria para pasta para provar do projeto
function createFolder(idProjeto, parentId){
	folderId = 0;
	$.ajax({
			async : false,
			type : "POST",
			contentType: "application/json",
			url : '/api/public/ecm/document/createFolder',

			data: JSON.stringify({
				"description": idProjeto,
				"parentId":parentId,
			}),

			success: function(data) {
				console.log(data);
				folderId = data.content.id;
			},
	});
	return folderId;
}

function creatDocumentRest(file,folderId){
	var url = '/api/public/ecm/document/createDocument';
	fetch(url,{
			headers : {'Content-type' : 'application/json',
            Authorization: oauthString()},
			method: 'post',
			body:JSON.stringify({
				"description"	:file.name,
				"parentId"		:folderId,
				"colleagueId"	: "admin",
				"publisherId"	: "admin",
				"activeVersion"	: true,
				"attachments"	: [{
					"fileName"		: file.name,
					"principal"  	: true
				}]
		})}).then(data => data.json())
		.then(data => {
			console.log(data);
			FLUIGC.toast({
				title: '',
				message: "Documento publicado - " + file.name,
				type: 'info'
			});
			exibeArquivosPasta();
		}).catch(data => {
			console.log(data);
			FLUIGC.toast({
					title: '',
					message: "Falha ao enviar",
					type: 'danger'
				});
		});
}




	// // $.each(e.target.files, function (index, file) {
	// 	$.ajax({
	// 		async : true,
	// 		type : "POST",
	// 		contentType: "application/json",
	// 		Authorization:oauthString(),
	// 		dataType: "json",
	// 		url : 'https://acertst-prime.fluig.com:8143/api/public/ecm/document/createDocument',
	// 		data: JSON.stringify({
	// 			"description"	:file.name,
	// 			"parentId"		:folderId,
	// 			"colleagueId"	: "admin",
	// 			"publisherId"	: "admin",
	// 			"activeVersion"	: true,
	// 			"attachments"	: [{
	// 				"fileName"		: file.name,
	// 				"principal"  	: true
	// 			}],
	// 		}),

	// 		error: function(data) {
	// 			console.log(data);
	// 			FLUIGC.toast({
	// 					title: '',
	// 					message: "Falha ao enviar",
	// 					type: 'danger'
	// 				});
	// 		},
	// 		success: function(data) {
	// 			FLUIGC.toast({
	// 					title: '',
	// 					message: "Documento publicado - " + file.name,
	// 					type: 'info'
	// 				});
	// 		},
	// 	});
	// // });


function oauthString(){
	return `OAuth oauth_consumer_key="fluigApi",oauth_token="178cb45e-8a05-48ab-82a7-3f090c3ad7e2",oauth_signature_method="PLAINTEXT",oauth_timestamp="${this.getTimeStampSec()}",oauth_nonce="${FLUIGC.utilities.randomUUID()}",oauth_version="1.0",oauth_signature="fluigApi%2622a94537-207a-49e9-b0c5-cb344b47adc2083d6b12-2de6-4ee8-b23e-0c0257f94f1d"`;
}

// time stamp unix
function getTimeStampSec(){
	return Math.floor(+new Date() / 1000)
}