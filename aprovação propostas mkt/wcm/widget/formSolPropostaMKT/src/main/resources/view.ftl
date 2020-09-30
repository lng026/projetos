<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js" integrity="sha512-pHVGpX7F/27yZ0ISY+VVjyULApbDlD0/X0rgGbTqCE7WFW5MezNTWG/dnhtbBuICzsd0WQPgpE4REBLv+UqChw==" crossorigin="anonymous"></script>
<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance()">
<!-- form -->
		<div id="formData">
			<div class="row">
				<div class="col-md-4">
					<div class="form-group">
						<label for="atividade">Atividade(ID)</label>
						<input type="hidden" name="idAtividade" id="idAtividade">
						<input type="hidden" name="jsonAtividade" id="jsonAtividade">
						<input type="hidden" name="jsonDadosForn" id="jsonDadosForn">
						<input type="hidden" name="jsonComps" id="jsonComps">
						<input type="hidden" name="valor" id="valor" required>
						<select class="form-control" name="selAtividade" id="selAtividade" onchange="attCategoriaProj(this)" required>
							<option value="0">Selecione</option>
						</select> 
						
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label for="categoria">Categoria</label>
						<input type="text" name="categoria" id="categoria" class="form-control" readonly="readonly" required> 
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label for="fornecedor">Fornecedor</label>
						<div class="input-group">
							<input type="hidden" name="idFornecedor" id="idFornecedor">
							<input type="text" name="fornecedor" id="fornecedor" class="form-control" >
							<span class="input-group-btn">
								<button class="btn btn-primary" type="button" onclick="showDsFornecedores('fornecedor','CNOME');">Ok!</button>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-3">
					<div class="form-group">	
						<label for="projeto">Projeto</label>
						<input type="text" name="projeto" id="projeto" class="form-control" required>	
					</div>
				</div>
				<div class="col-md-3">
					<div class="form-group">
						<label for="descricao">Descrição</label>
						<input type="text" name="descricao" id="descricao" class="form-control" required>
					</div>
				</div>
				<div class="col-md-3">
					<div class="form-group">
						<label for="status">Status</label>
						<select class="form-control" name="status" id="status" required>
							<option value="provisao">Provisão</option>
							<option value="reversao">Reversão</option>
						</select>
					</div>
				</div>
				<div class="col-md-3">
					<div class="form-group">
						<label for="prazoEstimado">Prazo Estimado</label>
						<input type="text" name="prazoEstimado" id="prazoEstimado" class="form-control date" required>
					</div>
				</div>
				
				
			</div>
			<div class="row"><br></div>
			<#--  <div class="row">  -->
				<!-- <input type="text" name="alocaFundo" id="alocaFundo" class="form-control"> -->
				<#--  <div class="col-md-4">
					<div class="form-group">
						<label for="alocaFundo">Alocação Fundo</label>
						<select class="form-control" name="alocaFundo" id="alocaFundo">
							<option value="0">Selecione</option>
							<option value="AMD">AMD</option>
							<option value="Intel CCF">Intel CCF</option>
							<option value="Intel MDF">Intel MDF</option>
							<option value="Microsoft JMA">Microsoft JMA</option>
							<option value="Microsoft JST">Microsoft JST</option>
							<option value="Nvidia">Nvidia</option>
						</select>
					</div>
				</div>  -->
				<#--  <div class="col-md-4">
					<div class="form-group">
						<label for="invoice">Invoice</label>
						<input type="text" name="invoice" id="invoice" class="form-control">
					</div>
				</div>  -->
				<#--  <div class="col-md-3">
					<div class="form-group">
						<label for="valor">Valor Total</label>
						<input type="text" name="valor" id="valor" class="form-control" mask="###9.99" required>
					</div>
				</div>  -->
			<#--  </div>  -->
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label for="observacoes">Observações</label>
						<textarea id="observacoes"   name="observacoes" class="form-control"></textarea></br>
					</div>
				</div>
			</div>
			<div class="row"><hr></div>
			<div class="row">
				<legend>Competências</legend>
				<div id="compDiv">
					<!-- competencias -->
				</div>
				<div id="addCompDiv" class="pull-right col-md-12">
					<div class="pull-right">
						<button class="btn btn-primary btn-grid" type="button" onclick="addcompetencia();">Nova Competencia</button>
					</div>
				</div>
			</div>
			<div class="row"><hr></div>

			<div class="row">
				<div class="">
						<button class="btn btn-primary btn-grid" type="button" onclick="salvarForm();">Salvar Solicitação</button>
					</div>
			</div>




		</div>
		<!-- form -->
</div>

