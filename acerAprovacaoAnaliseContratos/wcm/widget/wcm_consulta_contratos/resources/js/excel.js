function fnExcelReport() {
	
    tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
    tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';

    tab_text = tab_text + '<x:Name>Error Messages</x:Name>';

    tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
    tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';

    tab_text = tab_text + "<table border='1px'>";
    
    var html = $('#gridSolicitacoes').clone()
    html.find('td.sorting_1').each((index, elem) => {
	    var num = $(elem).find('a').text();
	    $(elem).html(num);
	    $(elem).text(num.toString());
	});
    
    tab_text = tab_text + html.html();
    tab_text = tab_text + '</table></body></html>';

    data_type = 'data:application/vnd.ms-excel';

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        if (window.navigator.msSaveBlob) {
            var blob = new Blob([tab_text], {
                type: "application/csv;charset=utf-8;"
            });
            navigator.msSaveBlob(blob, 'Test file.xls');
        }
    } else {
    	console.log(data_type);
    	console.log(tab_text);
    	$('#excelAnchor')[0].click()
    }
	$('#MessageHolder').html("");
}

$(document).ready(function() {
	$($("#excelAnchor")[0]).click(function(){
		console.log(data_type);
		console.log(tab_text);
		$('#excelAnchor').attr('href', data_type + ', ' + encodeURIComponent(tab_text));
        $('#excelAnchor').attr('download', 'Test file.xls');
	});	
})