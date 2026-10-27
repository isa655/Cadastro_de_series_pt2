//Selecionar os elementos do html
//Que vai ser o forms
const form = document.querySelector("#form-serie");
const resposta = document.querySelector("#resposta");
const apiKey ="cv_UjBx9loxSqrRST5bedmLG3omEUaYqFRMxPz0UcVyPgK68cq4F1yyDRHMaMFdhTjX;
const apiUrl = "https://api-ds.codeverse.dev.br/api/series";

form.addEventListener("submit", async function name (event) {
    event.preventDefault();
    const dados = new FormData(form);
    const filme = {
        title: dados.get("genero"),
        genero: dados.get("numero_temporadas"),
        ano: dados.get("ano_lancamento"),
        diretor: dados.get("plataforma"),
        nota:dados.get("nota") || null
    }
})
resposta.textContent = "Enviando série para API....";
try {
    const respostaApi = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        },
        body: JSON.stringify(serie),
    });
    const texto = await respostaApi.text();
    let resultado;
    try {
        resultado = texto ? JSON.parse(texto) : {};
        if(respostaApi.ok){
            resposta.textContent = '${resultado.title} foi cadastrado com sucesso.';
        }
    } catch (error) {
        resultado = error;
        return;
    }
} catch (error) {
    console.error(error);
}