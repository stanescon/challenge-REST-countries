
const cartoes = document.querySelectorAll('.cartao-pais')
const listaPaisesPrincipais = ['germany', 'united', 'brazil', 'iceland', 'mexico', 'aland', 'albania', 'algeria']

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


function adcElemento (string) {
    const divNova = document.createElement("div");
    divNova.innerHTML = string
    divNova.classList.add('cartao-pais');
    const conteudoAleatorio = document.querySelector('.conteudo-aleatorio')
    const divAtual = document.querySelector('.marcacao');
    conteudoAleatorio.insertBefore(divNova, divAtual);
}

let bandeira;
let nome;
let populacao;
let capital;


function outrosPaises (indice){
    fetch('https://restcountries.com/v3.1/all')
    .then(resposta => resposta.json()).then(resposta => {
        bandeira = resposta[indice].flags.svg
        nome = resposta[indice].name.common
        populacao = resposta[indice].population
        regiao = resposta[indice].region;
        capital = resposta[indice].capital[0]
        console.log(bandeira, nome, populacao, regiao, capital)
    adcElemento(`<img src="${bandeira}" class="bandeira">
    <h2 class="titulo">${nome}</h2>
    <p class="populacao"><span>Population:</span> ${populacao}</p>
    <p class="continente"><span>Region:</span> ${regiao}</p>
    <p class="capital"><span>Capital:</span> ${capital}</p>`)
    })
}


for(let i=0; i<250; i++){
    outrosPaises(i)
}






