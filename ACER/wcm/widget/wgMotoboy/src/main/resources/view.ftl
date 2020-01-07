<div id="wgMotoboy_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="wgMotoboy.instance()">
    <div class="title">
        <h1>Relátorio do processo de Motoboy</h1>
    </div>
    <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    <div class="col-md-2">
        <div class="form-group">
            <label for="de">De</label>                
            <input type="text" name="de${instanceId}" id="de${instanceId}" class="form-control date">
        </div>
    </div>
    <div class="col-md-2">
        <div class="form-group">
            <label for="ate">Até</label>                
            <input type="text" name="ate${instanceId}" id="ate${instanceId}" class="form-control date">
        </div>
    </div>
    <!-- <div class="col-md-2">
        <div class="form-group">
            <label for="mes">Mês</label>                
            <select name="mes${instanceId}" id="mes${instanceId}" class="form-control">
                <option value="">Todos</option>
                <option value="01">Janeiro</option>
                <option value="02">Fevereiro</option>
                <option value="03">Março</option>
                <option value="04">Abril</option>
                <option value="05">Maio</option>
                <option value="06">Junho</option>
                <option value="07">Julho</option>
                <option value="08">Agosto</option>
                <option value="09">Setembro</option>
                <option value="10">Outrubo</option>
                <option value="11">Novembro</option>
                <option value="12">Desembro</option>
            </select>
        </div>
    </div>
      <div class="col-md-2">
        <div class="form-group">
            <label for="ano">Ano</label>                
            <select name="ano${instanceId}" id="ano${instanceId}" class="form-control">
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
            </select>
        </div>
    </div> -->
    <div>
        <br>
        <button type="button" class="btn btn-primary  fluigicon fluigicon-search " data-exibe-relatorio id="btnReport${instanceId}"></button>
        <a class="btn btn-default fluigicon fluigicon-export disabled"  id="btnExp${instanceId}"></a>
    </div>



</div>

