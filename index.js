
const cartoes = document.querySelectorAll('.cartao-pais');
const listaPaisesPrincipais = ['germany', 'united', 'brazil', 'iceland', 'mexico', 'aland', 'albania', 'algeria']
const conteudoPrincipal = document.querySelector('.conteudo-principal');
const conteudoAleatorio = document.querySelector('.conteudo-aleatorio');
const conteudoDinamico = document.querySelector('.conteudo-dinamico');




function incluirPaisesPrincipais(pais, posicao) {
    fetch(`https://restcountries.com/v3.1/name/${pais}`)
    .then(resposta => resposta.json())
    .then(resposta => {
        const bandeira = resposta[0].flags.svg
        const nome = resposta[0].name.common
        const populacao = resposta[0].population
        const regiao = resposta[0].region;
        const capital = resposta[0].capital[0]

        cartoes[posicao].innerHTML = `<img src="${bandeira}" class="bandeira">
        <h2 class="titulo">${nome}</h2>
        <p class="populacao"><span>Population:</span> ${populacao}</p>
        <p class="continente"><span>Region:</span> ${regiao}</p>
        <p class="capital"><span>Capital:</span> ${capital}</p>`

    })
} 


for(let i=0; i < cartoes.length; i++){
    incluirPaisesPrincipais(listaPaisesPrincipais[i],i)
}


function adcElemento (divPai, indiceMarcacao, string) {
    const divNova = document.createElement("div");
    divNova.innerHTML = string
    divNova.classList.add('cartao-pais');
    const divAtual = document.querySelector('.marcacao')[indiceMarcacao];
    divPai.insertBefore(divNova, divAtual);
}


function todosOsPaises (indice){
    fetch('https://restcountries.com/v3.1/all')
    .then(resposta => resposta.json()).then(resposta => {
        let bandeira = resposta[indice].flags.svg
        let nome = resposta[indice].name.common
        let populacao = resposta[indice].population
        let regiao = resposta[indice].region;
        let capital = resposta[indice].capital[0]
        // console.log(bandeira, nome, populacao, regiao, capital)
    adcElemento(conteudoAleatorio, 0, `<img src="${bandeira}" class="bandeira">
    <h2 class="titulo">${nome}</h2>
    <p class="populacao"><span>Population:</span> ${populacao}</p>
    <p class="continente"><span>Region:</span> ${regiao}</p>
    <p class="capital"><span>Capital:</span> ${capital}</p>`)
    })
}


for(let i=0; i<250; i++){
    todosOsPaises(i)
}


const filtro = document.querySelector('.filtro')

filtro.addEventListener('change', function(ev){
    console.log(ev.target.value)
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
    }
})


function mostrarRegiao(regiao){
    conteudoPrincipal.classList.add('oculto')
    conteudoAleatorio.classList.add('oculto')
    conteudoDinamico.innerHTML = '<div class="marcacao oculto"></div>'

    fetch(`https://restcountries.com/v3.1/region/${regiao}`)
    .then(resposta => resposta.json()).then(resposta => {
        console.log(resposta)
    for(let i=0; i < resposta.length; i++){
        let bandeira = resposta[i].flags.svg
        let nome = resposta[i].name.common
        let populacao = resposta[i].population
        let regiao = resposta[i].region;
        let capital = ""
        if(typeof resposta[i].capital[0] == "string"){
            capital = resposta[i].capital[0]
        }
            adcElemento(conteudoDinamico, 1, `<img src="${bandeira}" class="bandeira">
            <h2 class="titulo">${nome}</h2>
            <p class="populacao"><span>Population:</span> ${populacao}</p>
            <p class="continente"><span>Region:</span> ${regiao}</p>
            <p class="capital"><span>Capital:</span> ${capital}</p>`)   
    }
    })
}


