
<#import "/wcm.ftl" as wcm/>
<#if pageRender.isEditMode()=true>
  <@wcm.header />
</#if>
<!-- WCM Wrapper content -->
<div class="wcm-wrapper-content">
<#if pageRender.isEditMode()=true>
	 <@wcm.menu />
</#if>
	<!-- Wrapper -->
	<div class="wcm-all-content">
		<div id="wcm-content" class="clearfix wcm-background">
			<#if pageRender.isEditMode()=true>
			<div name="formatBar" id="formatBar"></div>
			<div id="edicaoPagina" class="clearfix">
				<#else>
				<div id="visualizacaoPagina" class="clearfix">
					</#if>
					<!-- Slot 1 -->
					<div id="divSlot1" class="editable-slot slotfull layout-1-1">
						<@wcm.renderSlot id="SlotA" editableSlot="true" />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>