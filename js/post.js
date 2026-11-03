const form = document.querySelector("#form-serie");
const resposta = document.querySelector("#resposta");

const apiKey = "cv_GqHkwFTOOdStCpX0a2JtDmPwHRaP-FuvUlIcumwBWlP7L_vKKZKzswcQ_xDRIL4-";
const apiUrl = "https://api-ds.codeverse.dev.br/api/series";

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const genero = document.querySelector("#genero").value;
  const numero_temporadas = Number(document.querySelector("#numero_temporadas").value);
  const ano_lancamento = Number(document.querySelector("#ano_lancamento").value);
  const plataforma = document.querySelector("#plataforma").value;
  const imageUrlInput = document.querySelector("#imageUrl").value;


  const serie = {
    title: title,
    genero: genero,
    numero_temporadas: numero_temporadas,
    ano_lancamento: ano_lancamento,
    plataforma: plataforma,
    imageUrl: imageUrlInput ? imageUrlInput : null
  };

  resposta.textContent = "Enviando série para API...";

  try {
    const respostaApi = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey
      },
      body: JSON.stringify(serie)
    });

    if (respostaApi.ok) {
      resposta.textContent = `${title} foi cadastrada com sucesso!`;
      form.reset();
    } else {
      resposta.textContent = "Erro ao cadastrar a série. Verifique os dados.";
    }
  } catch (error) {
    console.error(error);
    resposta.textContent = "Erro na conexão com o servidor.";
  }
});