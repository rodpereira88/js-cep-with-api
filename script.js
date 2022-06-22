<!-- Consulta CEP -->
<script>
  
  // Cria a Array para armazenar as cidades atendidas
	let cidades = [];

	// Valor de URL constante para API OYA / Produto: Descoberta
  const OYA_API_URL = '//api.oya.care/product/746cd9f8-fd13-41ef-9785-a0f9c6cc9017';

  // Cria o método que retorna as cidades
  async function getCities() {
    
    // Fetch API 
    let obj = await (await fetch(OYA_API_URL)).json();
    
    // Loop para adicionar as cidades contidas nos Calendários da API
    for (var i = 0; i < obj.calendars.length; i++) {
      cidades.push(obj.calendars[i].city);
    }
    
    // Retorna a String com todas as cidades
    console.log(cidades);
  }

  // Executa o método
  getCities();
  

  // Define o método de consulta do CEP
  (function(){ 
    
    // Cria variável para o campo CEP
    const cep = document.querySelector("input[name=cep]");
    // Cria variável para a div #resposta
    const resposta = document.getElementById("resposta");
    resposta.innerHTML = '';
    
    // Preenchimento do campo CEP
    cep.addEventListener('blur', e=> {
      
      const value = cep.value.replace(/[^0-9]+/, '');
      
      //insere o valor na URL da API ViaCep
      const url = `//viacep.com.br/ws/${value}/json/`;
      
      fetch(url)
        .then( response => response.json())
        .then( json => {
        
        // Se a resposta for válida, autopreenche os inputs com a Cidade e Estado
        if( json.localidade ) {
          document.querySelector('input[name=cidade]').value = json.localidade;
          document.querySelector('input[name=estado]').value = json.uf;
        }
        
        // Verifica se a localidade retornada está contida na string 'cidade' 
        if (cidades.includes(json.localidade)) {
        	resposta.innerHTML = 'TEM essa cidade';
        } else {
        	resposta.innerHTML = 'NÃO tem essa cidade';
        }

      });
    });

  })();
</script>
<script src="//cdn.jsdelivr.net/npm/cep-promise/dist/cep-promise.min.js"></script>
<!-- FIM Consulta CEP -->
