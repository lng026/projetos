<div id="HelloWorld_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
     data-params="HelloWorld.instance({message: 'Hello world'})">
	<div class="container">
        <div class="text-center">
                <h1>Envio de Prova de execução - Marketing</h1>
        </div>

        <div class="row">
            <div class="col-md-5">
                <div class="form-group">
                    <label for="idProposta">Proposta(ID)</label>
                    <input type="hidden" name="idFolder" id="idFolder"> 
                    <input type="hidden" name="documentId" id="documentId"> 
                    <input type="hidden" name="jsonFileList" id="jsonFileList"> 
                    <input type="hidden" id="finalizarExecucao" name="finalizarExecucao">
                    <input type="text" name="idProposta" id="idProposta" class="form-control" required> 
                </div>
            </div>
            <div class="col-md-5">
                <div class="form-group">
                    <label for="idFornecedor">Fornecedor(ID)</label>
                    <input type="text" name="idFornecedor" id="idFornecedor" class="form-control"> 
                </div>
            </div>
            <div class="col-md-2">
                <div class="pull-right">
                    <br>
                    <button class="btn btn-primary btn-grid" type="button" onclick="getProposta();" >Buscar</button>
                </div>
            </div>
        </div>
        <div class="row"><br></div>
        <div id="dadosProposta" style="display:none;" class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Dados da Proposta</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">	
                            <label for="projeto"><b>Projeto:</b></label>
                            <span id="projeto"></span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">	
                            <label for="descricao"><b>Descrição:</b></label>
                            <span id="descricao"></span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">	
                            <label for="fornecedor"><b>Fornecedor:</b></label>
                            <span id="fornecedor"></span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">	
                            <label for="status"><b>Status:</b></label>
                            <span id="status"></span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">	
                            <label for="prazo"><b>Prazo:</b></label>
                            <span id="prazo"></span>
                        </div>
                    </div>
                </div>
                 <!-- competencias -->
                <div class="row">
                    <div class="col-md-12">
                        <legend>Competências</legend>
                        <div id="compDiv">
                            <!-- listagem -->
                        </div>
                    </div>
				</div>
                <!-- competencias -->
                <!-- Arquivos -->
                <div class="row">
                    <div class="col-md-12">
                        <label ><h4>Arquivos</h4></label>
                        <ul class="list-group" id="ulArquivos">
                        </ul>
                    </div>
                </div>
                <!-- Arquivos -->
                 <div class="row"> <div class="col-md-12"> <hr></div></div>
                <!-- forn -->
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">	
                            <label for="invoice"><b>Invoice:</b></label>
                            <input type="text" name="invoice" id="invoice" class="form-control">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="inputFile"><b>Selecionar Arquivo:</b></label>
                            <input type="file" class="form-control" id="inputFile" name="inputFile" title="arquvo" >
                        </div> 
                    </div> 
                    <div class="col-md-2">
                        <div class="form-group">
                            <br>
                            <button class="btn btn-primary" type="button" onclick="salvarDocumento();" >Salvar</button>
                        </div>
                    </div>  
                    <div class="col-md-12 form-group">
                        <label for="">Observações</label>
                        <textarea type="text" id="observacoes" name="observacoes" class="form-control"></textarea>
                    </div>
                </div>
                <!-- forn -->
            </div>
           
               
                

             
        </div>
        <div class="row"><br></div>
      

    </div><#-- .container-fluid  -->
</div>
