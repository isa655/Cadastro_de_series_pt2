const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-series");
const modelo = document.querySelector("#modelo-serie");

const apiKey = "cv_GqHkwFTOOdStCpX0a2JtDmPwHRaP-FuvUlIcumwBWlP7L_vKKZKzswcQ_xDRIL4-";
const apiUrl = "https://api-ds.codeverse.dev.br/api/series";

async function buscarSeries() {
  resposta.textContent = "Carregando séries...";

  try {
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: { "x-api-key": apiKey },
    });

    if (!retorno.ok) {
      throw new Error("Não foi possível carregar as séries.");
    }

    const resultado = await retorno.json();

    lista.innerHTML = "";

    for (const serie of resultado.data) {
      const card = modelo.content.cloneNode(true);

      // Preenche os campos de texto
      card.querySelector(".nome").textContent = serie.title;
      card.querySelector(".genero").textContent = serie.genero;
      card.querySelector(".numero").textContent = serie.numero_temporadas;
      card.querySelector(".ano").textContent = serie.ano_lancamento;
      card.querySelector(".plataforma").textContent = serie.plataforma;
      card.querySelector(".nota").textContent = serie.nota || "N/A";

      const imagem = card.querySelector(".imagem-serie");
      const semImagem = card.querySelector(".sem-imagem");

      if (serie.imageUrl) {
        imagem.src = serie.imageUrl;
        imagem.alt = serie.title;
        semImagem.remove();
      } else {
        imagem.remove();
      }
      lista.appendChild(card);
    }


    resposta.textContent = "";

  } catch (error) {
    console.error(error);
    resposta.textContent = "Não foi possível carregar as séries. Tente novamente!";
  }
}

buscarSeries();