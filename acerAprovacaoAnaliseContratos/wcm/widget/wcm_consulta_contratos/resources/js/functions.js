var solicitacoes = [];
var usuarios = new Array();
var grupoId = [];
var grupoNome = [];
var tudo = false;

// WCMAPI.Create({
//   type: 'POST',
//   url: '/api/public/ecm/dataset/datasets',
//   async: true,
//   data: {
//     "name": "workflowProcess",
//   },
//   success: function (resp) {
//     solicitacoes = resp;
//   }
// });

function loadinicial() {
  var mySimpleCalendar = FLUIGC.calendar('#dataAbertura');
  var dataInicioCalendar = FLUIGC.calendar('#dataInicial');
  var dataFimCalendar = FLUIGC.calendar('#dataFinal');


  WCMAPI.Create({
    type: 'POST',
    url: '/api/public/ecm/dataset/datasets',
    async: false,
    data: {
      "name": "workflowProcess",
    },
    success: function (resp) {
      solicitacoes = resp;
    }
  });
};

$("#btnSearch").on('click', function () {
  searchValues();
});

var control = false;
function consulta(id) {
  user = WCMAPI.userCode;
  if (user != id) {
    try {
      var constraintColleague0 = DatasetFactory.createConstraint('active', 'true', 'true', ConstraintType.MUST);
      var constraintColleague1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', id, id, ConstraintType.MUST);
      var colunasColleague = new Array('colleagueName');
      var datasetColleague = DatasetFactory.getDataset('colleague', colunasColleague, new Array(constraintColleague0, constraintColleague1), null);
      return datasetColleague.values[0].colleagueName
    } catch (e) {
      console.error('Erro ao trazer nome de Usuario ( ' + e + ' )')
      return 0
    }
  }
}

function filtroUsuario() {
  try {
    var user = WCMAPI.userCode;
    var nomeUsuario = consulta(user);
    var constraintColleague2 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", "" + user, "" + user, ConstraintType.MUST);
    var constraint5 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "%Consulta%Contrato%", "%Consulta%Contrato%", ConstraintType.MUST, true);
    var datasetGroup = DatasetFactory.getDataset('colleagueGroup', null, new Array(constraintColleague2, constraint5), null);
    var constraint = new Array();
    for (var i = 0; i <= datasetGroup.values.length - 1; i++) {
      grupoId.push(datasetGroup.values[i]["colleagueGroupPK.groupId"]);
      constraint.push(DatasetFactory.createConstraint("colleagueGroupPK.groupId", "" + grupoId[i], "" + grupoId[i], ConstraintType.SHOULD));
    }

    var membrosDatasetGroup = DatasetFactory.getDataset('colleagueGroup', null, constraint, null);
    var dsGrupoNome = DatasetFactory.getDataset("group", null, null, null);
    var j = 0;

    for (var i = 0; i <= grupoId.length - 1; i++) {
      for (j = 0; j <= dsGrupoNome.values.length - 1; j++) {
        if (grupoId[i] == dsGrupoNome.values[j]["groupPK.groupId"]) {
          grupoNome.push(dsGrupoNome.values[j]["groupDescription"]);
        }
        if (grupoId[i] == "ConsultaContratoJuridico" || grupoId[i] == "ConsultaContratoFinanceiro") {
          tudo = true;
        }
      }
    }

    usuarios[0] = ({ "user": WCMAPI.user, "id": WCMAPI.userCode });

    for (var i = 0; i <= membrosDatasetGroup.values.length - 1; i++) {
      var usuario = consulta(membrosDatasetGroup.values[i]["colleagueGroupPK.colleagueId"]);
      if (usuario != undefined) {
        usuarios.push({ "user": usuario, "id": membrosDatasetGroup.values[i]["colleagueGroupPK.colleagueId"] });
      }
    }

    if (grupoNome.length == 1) {
      var i = 0;
      switch (grupoNome[i]) {
        case "Vendas":
          grupoId[i] = "vendas";
          break;
        case "Compras":
          grupoId[i] = "Compras";
          break;
        case "E-Commerce":
          grupoId[i] = "ecommerce";
          break;
        case "RH":
          grupoId[i] = "rh";
          break;
        case "Digital Marketing":
          grupoId[i] = "Digital Marketing";
          break;
        case "Jurídico":
          grupoId[i] = "juridico";
          break;
        case "Logística":
          grupoId[i] = "logistica";
          break;
        case "Service":
          grupoId[i] = "service";
          break;
        case "Facilities":
          grupoId[i] = "facilities";
          break;
        case "Produtos":
          grupoId[i] = "produtos";
          break;
        case "Financeiro":
          grupoId[i] = "financas";
          break;
        case "Fiscal":
          grupoId[i] = "fiscal";
          break;
        case "IT":
          grupoId[i] = "it";
          break;
        case "Marketing":
          grupoId[i] = "marketing";
          break;
        case "Atendimento e-commerce":
          grupoId[i] = "e-commerce";
          break;
        default:
      }
    } else {
      for (var i = 0; i <= grupoNome.length - 1; i++) {
        switch (grupoNome[i]) {
          case "Vendas":
            grupoId[i] = "Vendas";
            break;
          case "Compras":
            grupoId[i] = "Compras";
            break;
          case "E-Commerce":
            grupoId[i] = "ecommerce";
            break;
          case "RH":
            grupoId[i] = "rh";
            break;
          case "Digital Marketing":
            grupoId[i] = "Digital Marketing";
            break;
          case "Jurídico":
            grupoId[i] = "juridico";
            break;
          case "Logística":
            grupoId[i] = "logistica";
            break;
          case "Service":
            grupoId[i] = "service";
            break;
          case "Facilities":
            grupoId[i] = "facilities";
            break;
          case "Produtos":
            grupoId[i] = "produtos";
            break;
          case "Financeiro":
            grupoId[i] = "financas";
            break;
          case "Fiscal":
            grupoId[i] = "fiscal";
            break;
          case "IT":
            grupoId[i] = "it";
            break;
          case "Marketing":
            grupoId[i] = "marketing";
            break;
          case "Atendimento e-commerce":
            grupoId[i] = "e-commerce";
            break;
          default:
        }
      }
    }
  } catch (ex) {
    console.log("erro no método FiltroUsuario js Function  --> \n" + ex);
  }
}

function carregaUsuarios() {
  filtroUsuario();
  if (tudo == true) {
    var constraintColleague1 = DatasetFactory.createConstraint('active', 'true', 'true', ConstraintType.MUST);
    var datasetColleague = DatasetFactory.getDataset('colleague', null, new Array(constraintColleague1), new Array('colleagueName'));
    var row = [];
    for (var cont = 0; cont < datasetColleague.values.length; cont++) {
      row = datasetColleague.values[cont];
      $("#solicitante").append("<option value='" + row['colleaguePK.colleagueId'] + "'>" + row['colleagueName'] + "</option>");
    }
  }
  else {
    usuarios.sort(function (a, b) {
      if (a.user < b.user) { return -1; }
      if (a.user > b.user) { return 1; }
      return 0;
    });

    var usuario = new Array();
    for (var i = 0; i <= usuarios.length - 1; i++) {
      if ((i + 1) <= usuarios.length - 1) {
        if (usuarios[i].id != usuarios[i + 1].id) {
          usuario.push({ "user": usuarios[i].user, "id": usuarios[i].id });
        }
      } else {
        usuario.push({ "user": usuarios[i].user, "id": usuarios[i].id });
      }
    }

    for (var cont = 0; cont <= usuario.length - 1; cont++) {
      $("#solicitante").append("<option value='" + usuario[cont].id + "'>" + usuario[cont].user + "</option>");
    }
  }
}

function selectTipoDoc() {
  var cons1 = DatasetFactory.createConstraint('status', '1', '1', ConstraintType.MUST);
  var dataset = DatasetFactory.getDataset('dsTipoDocContratos', null, null, new Array('tipoDoc'));
  var row = [];
  for (var cont = 0; cont < dataset.values.length; cont++) {
    row = dataset.values[cont];
    $("#tipoContrato").append("<option value='" + row["tipoDoc"] + "'>" + row["tipoDoc"] + "</option>");
  }
}

function statusAtv(atv) {
  var status;
  switch (atv.toString()) {
    case '0':
      status = {
        'id': 4,
        'descricao': "Solicitação de Contrato",
        'obs': "Solicitação de Contrato"
      };
      break;
    case '4':
      status = {
        'id': 4,
        'descricao': "Solicitacao de Contrato - Início",
        'obs': "Solicitacao de Contrato - Início"
      };
      break;
    case '61':
      status = {
        'id': 61,
        'descricao': "Aprovação do Gestor",
        'obs': "Aprovação do Gestor"
      };
      break;
    case '68':
      status = {
        'id': 68,
        'descricao': "Correção (correção do formulário pelo solicitante)",
        'obs': "Correção (correção do formulário pelo solicitante)"
      };
      break;
    case '5':
      status = {
        'id': 5,
        'descricao': "Análise do Contrato - Jurídico",
        'obs': "Análise do Contrato - Jurídico"
      };
      break;
    case '13':
      status = {
        'id': 13,
        'descricao': "Análise do Contrato - Customer service",
        'obs': "Análise do Contrato - Customer service",
        'abrv': "Análise - Cust.Service"

      };
      break;
    case '15':
      status = {
        'id': 15,
        'descricao': "Análise do Contrato - Logistica",
        'obs': "Análise do Contrato - Logistica",
        'abrv': "Análise - Logistica"
      };
      break;
    case '11':
      status = {
        'id': 11,
        'descricao': "Análise do Contrato - Financeiro",
        'obs': "Análise do Contrato - Financeiro",
        'abrv': "Análise - Financeiro"

      };
      break;
    case '30':
      status = {
        'id': 30,
        'descricao': "Consolidação do Contrato",
        'obs': "Consolidação do Contrato"
      };
      break;
    case '32':
      status = {
        'id': 32,
        'descricao': "Coleta de assinaturas - Solicitante",
        'obs': "Coleta de assinaturas - Solicitante",
      };
    case '138':
      status = {
        'id': 138,
        'descricao': "Verificar expiração do contrato",
        'obs': "Intermediário - Verificar expiração do contrato",
      };
      break;
    case '87':
      status = {
        'id': 87,
        'descricao': "Aprovação das Partes",
        'obs': "Aprovação das outras partes participanetes do contrato"
      };
      break;
    case '34':
      status = {
        'id': 34,
        'descricao': "Coleta de Assinaturas - Acer",
        'obs': "Coleta de assinaturas - Acer",
        'abrv': "Coleta de assinaturas - Acer"
      };
      break;

    case '44':
      status = {
        'id': 44,
        'descricao': "Coleta de Assinaturas",
        'obs': "Coleta de Assinaturas"
      };
      break;
    case '96':
      status = {
        'id': 96,
        'descricao': "Validação do Solicitante",
        'obs': "Validação / Coleta de assinaturas fornecedor"
      };
      break;
    case '106':
      status = {
        'id': 106,
        'descricao': "Contrato Vigente",
        'obs': "Contrato Vigente"
      };
      break;
    case '108':
      status = {
        'id': 108,
        'descricao': "Contrato Expirado",
        'obs': "Contrato Expirado"
      };
      break;
    case '66':
      status = {
        'id': 66,
        'descricao': "Cancelado",
        'obs': "Cancelado",
        'abrv': ""
      };
      break;
    case '36':
      status = {
        'id': 36,
        'descricao': "Encerrado",
        'obs': "Encerrado",
        'abrv': ""
      };
      break;
    case '56':
      status = {
        'id': 56,
        'descricao': "Revisão solicitante - Financeiro",
        'obs': "Revisão solicitante - Financeiro",
        'abrv': "Rev. - Financeiro"
      };
      break;
    case '51':
      status = {
        'id': 51,
        'descricao': "Revisão solicitante - Logística",
        'obs': "Revisão solicitante - Logística",
        'abrv': "Rev. - logistica"
      };
      break;
      case '48':
      status = {
        'id': 48,
        'descricao': "Revisão solicitante - Customer Service",
        'obs': "Revisão solicitante - Customer Service",
        'abrv': "Rev.- Customer Service"
      };
      break;
    case '143':
      status = {
        'id': 143,
        'descricao': "Revisão Jurídico - Logística",
        'obs': "Revisão Jurídico - Logística",
        'abrv': "Rev. - Jurídico"
      };
      break;
    case '160':
      status = {
        'id': 160,
        'descricao': "Revisão Jurídico-Fiscal",
        'obs': "Revisão Jurídico-Fiscal",
        'abrv': "Rev. Jurídico - Fiscal"
      };
      break;
    case '146':
      status = {
        'id': 146,
        'descricao': "Revisão Jurídico - Customer Service",
        'obs': "Revisão Jurídico - Customer Service",
        'abrv': "Rev. Jurídico - Customer Service"
      };
      break;
    case '151':
      status = {
        'id': 151,
        'descricao': "Revisão Jurídico-Financeiro",
        'obs': "Revisão Jurídico-Financeiro",
        'abrv': "Rev. Jurídico - Financeiro"
      };
      break;
      
    case '188':
      status = {
        'id': 188,
        'descricao': "Revisão Jurídico-E-Commerce",
        'obs': "Revisão Jurídico-E-Commerce",
        'abrv': "Rev. Jurídico - E-Commerce "
      };
      break;
      case '184':
        status = {
          'id': 184,
          'descricao': "Análise do contrato - E-Commerce",
          'obs': "Análise do contrato - E-Commerce",
          'abrv': "Análise - E-Commerce "
        };
        break;
        case '187':
          status = {
            'id': 187,
            'descricao': "Revisão solicitante - E-Commerce",
            'obs': "Revisão solicitante - E-Commerce",
            'abrv': "Rev. - E-Commerce"
          };
          break;
    case '204':
      status = {
        'id': 204,
        'descricao': "Aprovação Presidência",
        'obs': "Aprovação Presidência",
        'abrv': "Rev. - Presidente"
      };
      break;
      case '221':
        status = {
          'id': 221,
          'descricao': "Upload de Contrato",
          'obs': "Upload de Contrato",
          'abrv': "Upload de Contrato"
        };
        break;
      case '149':
        status = {
          'id': 149,
          'descricao': "Análise do contrato - Fiscal",
          'obs': "Análise do contrato - Fiscal",
          'abrv': "Análise - Fiscal"
        };
      break;
      case '150':
        status = {
          'id': 150,
          'descricao': "Revisão solicitante - Fiscal",
          'obs': "Revisão solicitante - Fiscal",
          'abrv': "Rev. - Fiscal"
        };
      break;
      case '72':
        status = {
          'id': 72,
          'descricao': "Aditivo",
          'obs': "Aditivo",
          'abrv': "Aditivo"
        };
      break;
    default:
      status = {
        'id': 0,
        'descricao': "Atividade desconhecida ",
        'obs': "Atividade desconhecida ",
        'abrv': "Atividade desconhecida "
      };
      break;
  }
  return status;
}



 function getAtvAtualProcess(nSolicitacao){
  let AllNAmes = [];
    WCMAPI.Create({
      type: 'get',
      url: '/process-management/api/v2/activities/?processInstanceId='+nSolicitacao+'&active=true',
      async:false,
      success: function (jsonObj) {
        jsonObj.items.forEach(e => {
          if(!AllNAmes.includes(e.state.sequence)){
            AllNAmes.push(e.state.sequence);
          }

        });
      }
    });
  
  return AllNAmes;
}

function getHtmlCons(field,initialValue,finalValue,type,likeSearch){
  htmlCons = {
    '_field': field,
    '_initialValue': initialValue,
    '_finalValue': finalValue,
    '_type': type,
    '_likeSearch': likeSearch
  };
  return htmlCons;
}