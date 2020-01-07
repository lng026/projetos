<#assign coreContext='nodeModules'>
<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance()">
<app-root></app-root>
</div>
<link href="/${coreContext}/resources/styles.css" rel="stylesheet"/>
<script type="text/javascript" src="/${coreContext}/resources/runtime.js"></script>
<script type="text/javascript" src="/${coreContext}/resources/polyfills.js"></script>
<!-- scripts.js será usado somente se for adicionado algum script no angular.json do APP -->
<script type="text/javascript" src="/${coreContext}/resources/scripts.js"></script>
<script type="text/javascript" src="/${coreContext}/resources/main.js"></script>

<script>
/**
 * The script below sets some enviroment variables to be used inside
 * Angular application. (see: app.config.ts)
 */
(function setEnvironmentParams() {
  var protectedContextPath = '${protectedContextPath!""}';
  var contextPath = '${contextPath!""}';
  // base url for frontend application
  var baseUrl = protectedContextPath + '/${tenantCode!""}';
  // replace '/p' for public pages
  if (window.location.href.indexOf(protectedContextPath) === -1) {
    baseUrl = baseUrl.replace(protectedContextPath, contextPath);
  }
  // base url for frontend application
  window['_app_baseUrl'] = baseUrl;
  // get page code
  window['_app_pageCode'] = '${(pageCode!"")}';
})();
</script>