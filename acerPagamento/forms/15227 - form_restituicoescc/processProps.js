class ProcessProps {

    atividades = [];
    camposObrigatorios = [];
    camposBloqueados = [];
    camposEscondidos = [];
    divsAtividade = [];

    constructor(){
        // atividades do projeto
        this.atividades.push(new Atividade(4,'inicio','Inicio',true));
        this.atividades.push(new Atividade(5,'triagem','Triagem'));
        this.atividades.push(new Atividade(18,'triagem','Triagem'));
        this.atividades.push(new Atividade(9,'aprovCord','Aprovação da cordenação'));
        this.atividades.push(new Atividade(13,'aprovDir','Aprovação do Diretor'));
        this.atividades.push(new Atividade(18,'verificar','Verificar'));
        this.atividades.push(new Atividade('xxx','visualizacao','Vizualização'));
        this.atividades.push(new Atividade(22,'visualizacao','Vizualização'));

        // campos requeridos
        //id da atividade =  campos obrigatorios da atividade
         this.camposObrigatorios['inicio'] = ['os','nSerie','produto','dtVencimento','valor','motivo','nome','cpfcnpj','endereco','numero','complemento','bairro','cep','cidade','estado','ccontaFin','ccontaSiga','favorecido','cpfcnpjFav','banco','agencia'];
        // divs exibidas na atividade
        this.divsAtividade['inicio'] = ['dadosCliente','dadosBancarios'];
        this.divsAtividade['triagem'] = ['dadosCliente','dadosBancarios','aprovTriagemdiv'];
        this.divsAtividade['aprovCord'] = ['dadosCliente','dadosBancarios','aprovTriagemdiv','aprovCorddiv'];
        this.divsAtividade['aprovDir'] = ['dadosCliente','dadosBancarios','aprovTriagemdiv','aprovCorddiv','aprovDirdiv'];
        this.divsAtividade['visualizacao'] = ['dadosCliente','dadosBancarios','aprovTriagemdiv','aprovCorddiv','aprovDirdiv'];

        // CAmpo Bloqueados nas atividades ou divs inteiras;
        this.camposBloqueados['aprovCord'] = ['dadosCliente','dadosBancarios','aprovTriagemdiv'];
        this.camposBloqueados['aprovDir'] = ['dadosCliente','dadosBancarios','aprovTriagemdiv','aprovCorddiv'];
        this.camposBloqueados['visualizacao'] = ['dadosCliente','dadosBancarios'];

        // Esconder campos em atividades
        // this.camposEscondidos['inicio'] = [];
    
        
    }
};

class Atividade{
    id = null;
    codigo = '';
    deacricao = '';
    atual = false;
    inicial = false;
    // id -  codigo - descricaos  
    constructor(id,cod,desc,inicial = false){
        this.id = id;
        this.codigo= cod;
        this.deacricao= desc;
        this.atual = false;
        this.inicial = inicial;
    }
};