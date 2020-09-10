<style>
    .dataTables_filter {
        float: rigth !important;
    }

    .pagination {
        float: rigth !important;
    }

    .dt-button{
        margin-bottom: 25px !important;
    }
</style>

<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
    data-params="MyWidget.instance()">
    <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.6.0/js/dataTables.buttons.min.js"></script>
    
    <script src="https://cdn.datatables.net/buttons/1.6.0/js/buttons.html5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.6.0/js/buttons.print.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>

    <div class="container-fluid">
        <!--HEADER -->
        <div class="panel panel-primary">
            <div class="panel-heading">
                <div class="panel-title">Menu de busca</div>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="col-md-2 form-group">
                            <label for="numIniSolicitacao">Solicitação</label>
                            <input type="text" id="numIniSolicitacao" name="numIniSolicitacao" class="form-control">
                        </div>
                        <div class="col-md-3 form-group">
                            <label for="razaoSocial">Razão social</label>
                            <input type="text" name="razaoSocial" id="razaoSocial" class="form-control">
                        </div>
                        <div class="col-md-2 form-group" style="display: none">
                            <label for="dataAbertura">Data de abertura</label>
                            <input type="text" name="dataAbertura" id="dataAbertura" class="form-control">
                        </div>
                        <div class="col-md-2 form-group">
                            <label for="dataInicial">Data Inicial</label>
                            <input type="text" name="dataInicial" id="dataInicial" class="form-control">
                        </div>
                        <div class="col-md-2 form-group">
                            <label for="dataFinal">Data Final</label>
                            <input type="text" name="dataFinal" id="dataFinal" class="form-control">
                        </div>
                        <div class="col-md-3 form-group">
                            <label>Solicitante</label>
                            <select class="form-control" id="solicitante" name="solicitante">
                                <option selected value="">Usuário solicitante</option>
                            </select>
                            <input type="hidden" id="descSolicitante" name="descSolicitante">
                        </div>
                        <div class="col-md-3 form-group">
                            <label for="areaSolicitante">Área solicitante</label>
                            <select name="areaSolicitante" id="areaSolicitante" class="form-control">
                               <!-- <option selected value="">Área solicitante</option> -->
                            </select>
                            <input type="hidden" id="idTipoDoc" name="idTipoDoc">
                        </div>
                        <div class="col-md-4 form-group">
                            <label for="statusSolicita">Status da solicitação </label>
                            <select id="statusSolicita" name="statusSolicita" class="form-control">
                                <option selected value="">Status</option>
                                <option value="4">Solicitação de contrato</option>
                                <option value="204">Aprovação presidência</option>
                                <option value="61">Aprovação superior</option>
                                <option value="68">Corrigir</option>
                                <option value="5">Análise do contrato - Jurídico</option>
                                <option value="areas">Análise das áreas participantes</option>
                                <#--  <option value="13">Análise das áreas participantes - Customer service</option>
                                <option value="15">Análise das áreas participantes - Logistica</option>
                                <option value="11">Análise das áreas participantes - Finanças</option>
                                <option value="149">Análise das áreas participantes - Fiscal</option>
                                <option value="184">Análise das áreas participantes - eCommerce</option>  -->
                                <option value="30">Consolidação do contrato</option>
                                <option value="34">Coleta de assinaturas - Juridico</option>
                                <option value="96">Validação do solicitante com o fornecedor</option>
                                <option value="106">Contrato Vigente</option>
                                <option value="108">Contrato Expirado</option>
                                <option value="66">Cancelado</option>
                                <option value="36">Encerrado</option>
                            </select>
                        </div>
                        <div class="col-md-3 form-group">
                            <label for="tipoContrato">Tipo de contrato</label>
                            <select name="tipoContrato" id="tipoContrato" class="form-control">
                                <option selected value="">Tipo de contrato</option>
                            </select>
                            <input type="hidden" id="idTipoDoc" name="idTipoDoc">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <button type="button" class="btn btn-primary" id="btnSearch" name="btnSearch"
                            style="float: right;"><i class="fluigicon fluigicon-search icon-xs"></i> Pesquisar</button>
                    </div>
                </div>
            </div>
        </div>
        <!--FIM HEADER -->
        <div class="row">
            <div class="col-xs-12">
                <div class="panel panel-primary">
                    <div class="panel-body">
                        <div class="table-responsive">
                            <!-- usar a classe nowrap para exibir os dados em uma linha apenas -->
                            <table id="gridSolicitacoes" class="table table-striped">
                                <thead>
                                    <tr>
                                        <th  >#</th>
                                        <th  >Solicitante</th>
                                        <th >R. Social</th>
                                        <th  >Tipo de contrato</th>
                                        <th   >Data de inicio</th>
                                        <th   >Vigência</th>
                                        <th class="col-md-2">Status</th>
                                        <td>Anexos</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>