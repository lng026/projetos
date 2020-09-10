<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance()">
<div class="container-fluid">
     <div class="row">
        <div class="col-md-2">
            <label for="atividade">Categoria</label>
            <select class="form-control" name="fCategoria" id="fCategoria" onchange="attFiltros('categoria')" required>
                <option value="0">Selecione</option>
            </select> 
        </div>
        <div class="col-md-1">
            <label for="fMes">Mês</label>
            <select class="form-control" name="fMes" id="fMes" onchange="attFiltros('mes')" required>
                <option value="0">Selecione</option>
            </select> 
        </div>
          <div class="col-md-1">
            <label for="fQuarter">Quarter</label>
            <select class="form-control" name="fQuarter" id="fQuarter" onchange="attFiltros('quarter')" required>
                <option value="0">Selecione</option>
            </select> 
        </div>
          <div class="col-md-1">
            <label for="fStatus">Status</label>
            <select class="form-control" name="fStatus" id="fStatus" onchange="attFiltros('status')" required>
                <option value="all">Selecione</option>
            </select> 
        </div>
    </div>
        <div class="tablePVDisponibilidade">
            <table class="table" id="tbAtividades">
                <thead>
                <tr>
                    <#--  <th>Tipo</th>  -->
                    <th>Categoria</th>
                    <th>ID - Atividade</th>
                    <th>Planejado</th>
                    <#--  <th>Mês</th>
                    <th>Quarter</th>  -->
                    <th>Utilizado</th>
                    <th>Saldo</th>
                    <th>Import. %</th>
                    <th>Status</th>
                    <th>Açôes</th>
                </tr>
                </thead>
                <tbody id="tbdyAtividades">
                </tbody>
                <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <td><b><span id="sumPlanejados"></span></b></td>
                    <td><b><span id="sumUtil"></span></b></td>
                    <td><b><span id="sumSaldo"></span></b></td>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>

</div>

