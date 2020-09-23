<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance()">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-2">
                <label for="fAtividade">Atividade</label>
                <input type='hidden' class='idDoc' id="idDoc" value="${p1!0}">
                <select class="form-control" name="fAtividade" id="fAtividade" onchange="attFiltros('atividade')">
                    <option value="0">Selecione</option>
                </select> 
            </div>
            <div class="col-md-2">
                <label for="fStatus">Status</label>
                <select class="form-control" name="fStatus" id="fStatus" onchange="attFiltros('status')" required>
                    <option value="0">Selecione</option>
                    <option value="provisao">Provisão</option>
                    <option value="reversao">Reversão</option>
                </select> 
            </div>
        </div>
    <#--    -->

   <div class="tablePVDisponibilidade">
            <table class="table" id="tbAtividades">
                <thead>
                <tr>
                    <th>Solicitação</th>
                    <th>Projeto</th>
                    <th>Descriçao</th>
                    <th>Prazo Estimado</th>
                    <th>Status</th> 
                    <th>Planejado</th>
                    <th>Atual</th>
                    <th>Açôes</th>
                </tr>
                </thead>
                <tbody id="tbdyAtividades">
                </tbody>
                <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <td id="sumPlanejados"></td>
                    <td id="sumUtil"></td>
                    <td id="sumSaldo"></td>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>
</div>
<!-- <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <td><b><span id="sumPlanejados"></span></b></td>
                    <td id="sumUtil"></td>
                    <td id="sumSaldo"></td>
                </tr>
                </tfoot> -->

