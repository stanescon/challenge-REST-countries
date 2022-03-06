
const cartoes = document.querySelectorAll('.cartao-pais');
const listaPaisesPrincipais = ['germany', 'united', 'brazil', 'iceland', 'mexico', 'aland', 'albania', 'algeria']
const conteudoPrincipal = document.querySelector('.conteudo-principal');
const conteudoAleatorio = document.querySelector('.conteudo-aleatorio');
const conteudoDinamico = document.querySelector('.conteudo-dinamico');
const botaoVoltar = document.querySelector('.botao-voltar')
const input = document.querySelector('.input-padrao')


function incluirPaisesPrincipais(pais, posicao) {
    fetch(`https://restcountries.com/v3.1/name/${pais}`)
    .then(resposta => resposta.json())
    .then(resposta => {
        const bandeira = resposta[0].flags.svg
        const nome = resposta[0].name.common
        const populacao = resposta[0].population
        const regiao = resposta[0].region;
        const capital = resposta[0].capital[0]
        const codigoPais = resposta[0].ccn3

        cartoes[posicao].innerHTML = `<img src="${bandeira}" class="bandeira">
        <h2 class="titulo">${nome}</h2>
        <p class="populacao"><span>Population:</span> ${populacao}</p>
        <p class="continente"><span>Region:</span> ${regiao}</p>
        <p class="capital"><span>Capital:</span> ${capital}</p>`

        cartoes[posicao].onclick = function(){
            mostrarPaisCompleto(codigoPais) 
        }
    })
} 

for(let i=0; i < cartoes.length; i++){
    incluirPaisesPrincipais(listaPaisesPrincipais[i],i)
}


function adcElemento (divPai, indiceMarcacao, legenda, string) {
    const divNova = document.createElement("div");
    divNova.innerHTML = string
    divNova.classList.add('cartao-pais');
    divNova.accessKey = legenda
    const divAtual = document.querySelector('.marcacao')[indiceMarcacao];
    divPai.insertBefore(divNova, divAtual);

    divNova.addEventListener('click', function(ev){
        let codigoPais = ""
        
        for(let i=0; i < ev.path.length; i++){
            if(ev.path[i].classList && ev.path[i].classList.contains('cartao-pais')){
                codigoPais =  ev.path[i].accessKey
            }
        }
        mostrarPaisCompleto(codigoPais)
    })
}

botaoVoltar.onclick = function(){
    document.querySelector('.conteudo-pais-selecionado').classList.add('oculto')
}


function mostrarPaisCompleto(codigoPais){
    fetch(`https://restcountries.com/v3.1/alpha/${codigoPais}`)
    .then(resposta => resposta.json()).then(resposta => {
        const bandeira = resposta[0].flags.svg
        const nome = resposta[0].name.common
        const siglaIdioma = Object.keys(resposta[0].languages)[0]
        const idioma = Object.values(resposta[0].languages).toString()
        const nomeNativo = resposta[0].name.nativeName[siglaIdioma].common
        const populacao = resposta[0].population
        const regiao = resposta[0].region;
        const subRegiao = resposta[0].subregion
        const topLevelDomain = resposta[0].tld[0]
        const arrMoedas = [] 
        for(let i=0; i < Object.keys(resposta[0].currencies).length; i++){
            arrMoedas.push(resposta[0].currencies[Object.keys(resposta[0].currencies)[i]].name)
        }      
        let moedas = arrMoedas.toString();
        let capital = ""
        if(resposta[0].capital != undefined){
            capital = resposta[0].capital[0]
        }

        const informacoes = document.querySelector('.conteudo-conteudo-pais-selecionado');
        informacoes.innerHTML = `<div class="bandeira-pais-selecionado">
        <img src="${bandeira}" class="bandeira-pais-selecionado">
        </div>
        <div class="informacoes-pais-selecionado">
        <h2 class="titulo">${nome}</h2>
        <p class="nome-nativo"><span>Native Name:</span> ${nomeNativo}</p>
        <p class="populacao"><span>Population:</span> ${populacao}</p>
        <p class="regiao"><span>Region:</span> ${regiao}</p>
        <p class="subregiao"><span>Sub Region:</span> ${subRegiao}</p>
        <p class="capital"><span>Capital:</span> ${capital}</p>
        <p class="domain"><span>Top Level Domain:</span> ${topLevelDomain}</p>
        <p class="moeda"><span>Currencies:</span> ${moedas}</p>
        <p class="idioma"><span>Languages:</span> ${idioma}</p>
        <p class="fronteiras"><span>Border Countries:</span> </p>
        </div>`
        
        document.querySelector('.conteudo-pais-selecionado').classList.remove('oculto')
    })
}


function busca(valor, n){
    fetch('https://restcountries.com/v3.1/all')
    .then(resposta => resposta.json()).then(resposta => {
        for(let i=0; i<250; i++){
            let parteDoNome = ""
            let nameArr = resposta[i].name.common.split("",n)
            let bandeira = resposta[i].flags.svg
            let nome = resposta[i].name.common
            let populacao = resposta[i].population
            let regiao = resposta[i].region;
            let codigo = resposta[i].ccn3
            let capital = ""
            if(resposta[i].capital != undefined){
                capital = resposta[i].capital[0]
            }
            for(let j = 0; j < n; j++){
                parteDoNome = parteDoNome + nameArr[j]
            }
            if(parteDoNome.toLowerCase() == valor.toLowerCase()){
                adcElemento(conteudoDinamico, 1, codigo, `<img src="${bandeira}" class="bandeira">
                <h2 class="titulo">${nome}</h2>
                <p class="populacao"><span>Population:</span> ${populacao}</p>
                <p class="continente"><span>Region:</span> ${regiao}</p>
                <p class="capital"><span>Capital:</span> ${capital}</p>`)
            }
        }
    })
}

input.addEventListener('keyup', function(ev){
    let n = ev.target.selectionEnd
    let valor = ev.target.value
    conteudoDinamico.innerHTML = '<div class="marcacao oculto"></div>'

    if(n == 0 && conteudoPrincipal.classList.contains('oculto')){
        conteudoPrincipal.classList.remove('oculto')
    } else if(n > 0) {
        conteudoPrincipal.classList.add('oculto')
        busca(valor, n)
    }
})






function todosOsPaises (indice){
    fetch('https://restcountries.com/v3.1/all')
    .then(resposta => resposta.json()).then(resposta => {
        let bandeira = resposta[indice].flags.svg
        let nome = resposta[indice].name.common
        let populacao = resposta[indice].population
        let regiao = resposta[indice].region;
        let codigo = resposta[indice].ccn3
        let capital = ""
        if(resposta[indice].capital != undefined){
            capital = resposta[indice].capital[0]
        }
        // console.log(bandeira, nome, populacao, regiao, capital)
    adcElemento(conteudoAleatorio, 0, codigo, `<img src="${bandeira}" class="bandeira">
    <h2 class="titulo">${nome}</h2>
    <p class="populacao"><span>Population:</span> ${populacao}</p>
    <p class="continente"><span>Region:</span> ${regiao}</p>
    <p class="capital"><span>Capital:</span> ${capital}</p>`)
    })
}





const filtro = document.querySelector('.filtro')

filtro.addEventListener('change', function(ev){
    let valor = ev.target.value
    if(valor == 1){
        mostrarRegiao('africa')
    } else if(valor == 2){
        mostrarRegiao('america')
    } else if(valor == 3){
        mostrarRegiao('asia')
    } else if(valor == 4){
        mostrarRegiao('europe')
    } else if(valor == 5){
        mostrarRegiao('oceania')
    } else if(valor == 0){
        conteudoDinamico.innerHTML = '<div class="marcacao oculto"></div>'
        conteudoPrincipal.classList.add('oculto');
        if(conteudoAleatorio.classList.contains('oculto')){
            conteudoAleatorio.classList.remove('oculto');
        }
        conteudoAleatorio.innerHTML = '<div class="marcacao oculto"></div>'
        for(let i=0; i<250; i++){
            todosOsPaises(i)
        }
    }
})


function mostrarRegiao(regiao){
    conteudoPrincipal.classList.add('oculto')
    conteudoAleatorio.classList.add('oculto')
    conteudoDinamico.innerHTML = '<div class="marcacao oculto"></div>'

    fetch(`https://restcountries.com/v3.1/region/${regiao}`)
    .then(resposta => resposta.json()).then(resposta => {
    for(let i=0; i < resposta.length; i++){
        let bandeira = resposta[i].flags.svg
        let nome = resposta[i].name.common
        let populacao = resposta[i].population
        let regiao = resposta[i].region;
        let codigo = resposta[i].ccn3
        let capital = ""
        if(resposta[i].capital != undefined){
            capital = resposta[i].capital[0]
        }
            adcElemento(conteudoDinamico, 1, codigo, `<img src="${bandeira}" class="bandeira">
            <h2 class="titulo">${nome}</h2>
            <p class="populacao"><span>Population:</span> ${populacao}</p>
            <p class="continente"><span>Region:</span> ${regiao}</p>
            <p class="capital"><span>Capital:</span> ${capital}</p>`)   
    }
    })
}

