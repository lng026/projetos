/*
1.0
 Configura botões com o atributo [data-file-upload] para anexar arquivos com o 
 nome sendo o valor do atributo
2.0
 [data-file-upload] pode agora conter {nome_do_atributo} para pegar o valor do atributo
 entre chaves
 [data-file-upload] também pode referenciar o valor de um input utilizando
 (id_do_input)
2.1
 [data-file-upload] agora referencia (id_do_input!) para tabela pai filho utilizando
 o ponto de exclamação '!' para simbolizar o id dinamico
*/
GlobalModules = GlobalModules || {}
GlobalModules.fileUpload = (function(){
    
    /**
     * Inicializa o módulo
     */
    function setup(){
        console.log('setup');

        $(document).on('click', '[data-file-upload]', function(){
            var parameter = $(this).data('file-upload');
            $('[name="form"]').append($('<input type="hidden" id="fileInserted" name="fileInserted">'))
            

            var regIndex = /.+___(\d+)/;
            var regAttr = /^{(.*)}/
            var regTarget = /^\((.*)[^!]\)/
            var regTargetPaiFilho = /^\((.*)(!)\)/

            var matchAttr = regAttr.exec(parameter);
            var matchTarget = regTarget.exec(parameter);
            var matchTargetPaiFilho = regTargetPaiFilho.exec(parameter);

            var target = null;

            if(matchAttr){
                parameter = $(this).attr(matchAttr[1]);
            }else if(matchTargetPaiFilho){
                var index = regIndex.exec($(this).attr('name'))[1];
                target = $("#"+matchTargetPaiFilho[1]+"___"+index);
                parameter = target.val();
                if(parameter) target.prop('readonly', true)
            }else if(matchTarget){
                parameter = $("#"+matchTarget[1]).val();
            }

            if(matchTargetPaiFilho && FileExists(parameter)){
                alert("O nome '"+parameter+"' já foi atrelado a outro outro arquivo")
                if(matchTargetPaiFilho && target){
                    target.prop('readonly', false)
                    target.val('');
                }
            }else if(parameter){
                var d = new Date();
                var dataparemeter = ('_' + d.getDate() + '' + (d.getMonth()+1) + (d.getUTCFullYear() - 2000) + d.getHours() + d.getMinutes());
                JSInterface.showCamera(parameter + dataparemeter);
            }else{
                alert("Nome do arquivo não foi preenchido")
            }
        });
    }

    /**
     * Busca se o elemento com aquele nome já foi inserido em casos de nomes manuais
     * (obs, não é válido quando for um nome automático, pois o mesmo pode ser removido
     * via inteface padrão do Fluig)
     * @param {*} p 
     */
    function FileExists(p){
        if (!p) return false;

        var files = $("#fileInserted").val();

        if(files.search(p) < 0){
            $("#fileInserted").val(files + p + ";");
            return false;
        }

        return true;
    }

    return {setup: setup};
})();