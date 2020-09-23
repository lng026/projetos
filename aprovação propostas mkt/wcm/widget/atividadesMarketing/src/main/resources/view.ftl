<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance()">
<!-- InformaÃ§Ãµes gerais -->
<div class="container-fluid">
	<div class='row'>
		<div class="col-12">
			<div class="mt-3">
				<div class="card">
					<div class="card-header">
						<h5 class="card-title">Adicionar Atividades Marketing via arquivo (.CSV)</h5>
					</div>
					<div class="card-body">
						<div class="row">
							<div class="col-md-4">
								<div class='form-group'>
									<div id="fileDiv">
										<div class="input-group">
											<label class="" for="fileCSV">Incluir a partir de um arquivo CSV</label>
											<input type="file" id="fileCSV" name="fileCSV" class="form-control">
										</div>
									</div>
								</div>
							</div>
						</div>
	
						<div class='row '>
							<div class="col">
								<div class='table-responsive'>
								<table class='table' id="tbAtividades">
									<thead>
									<tr>
										<th>Tipo</th>
										<th>Categoria</th>
										<th>ID</th>
										<th>Atividade</th>
										<th>Planejado</th>
										<th>Mês</th>
										<th>Quarter</th>
										<th>Ano</th>
										<th>Status</th>
									</tr>
									</thead>
									<tbody id="tbAtvBody">
										<tr>
											<#--  <td><select class='form-control' name="tipo" id="tipo"><option value="fixo">Fixo</option><option value="variavel">Variavel</option></select></td>
											<td><input type='text' class='form-control' name="categoria" id="categoria"></td>
											<td><input type='text' class='form-control' name="idAtividade" id="idAtividade"></td>
											<td><input type='text' class='form-control' name="atividade" id="atividade"></td>
											<td><input type='text' class='form-control' name="valorPlanejato" id="valorPlanejato"></td>
											<td><input type='text' class='form-control' name="mes" id="mes"></td>
											<td><input type='text' class='form-control' name="quarter" id="quarter"></td>
											<td><input type='text' class='form-control' name="ano" id="ano"></td>
											<td><select class='form-control' name="status" id="status"><option value="1">Ativo</option><option value="0">Inativo</option></select></td>
											<td>
												<button class="btn btn-default fluigicon fluigicon-minus-sign delItem"  onclick="delDesp(this)">
												</button>
											</td>  -->
										</tr>
									</tbody>
								</table>
								</div>
							</div>
						</div>
	
					</div>
					<div class="row">
						<div class="text-center">
							<button class="btn btn-primary btn-grid" type="button" onclick="saveDados();">Salvar Atividades</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

