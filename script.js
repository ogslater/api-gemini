document.addEventListener("DOMContentLoaded", () => {


const API_KEY = "AIzaSyB9jirh5onlfi7cpKIKL2lX_DdOR7GQmmA";  

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY;



document.getElementById("btnEnviar").addEventListener("click", async () => {
  const pergunta = document.getElementById("pergunta").value;
  const respostaDiv = document.getElementById("resposta");
  
  if (!pergunta.trim()) {
    respostaDiv.textContent = "⚠️ Digite uma pergunta antes de enviar.";
    return;
  }

  respostaDiv.textContent = "⏳ Processando...";

  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: pergunta }] }]
      })
    });

    const data = await response.json();
    console.log("Resposta da API:", data);

    const resposta = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ Não consegui gerar resposta.";
    respostaDiv.textContent = resposta;
  } catch (error) {
    respostaDiv.textContent = "❌ Erro ao conectar à API.";
    console.error(error);
  }
});

const textarea = document.querySelector("#pergunta");
const button = document.querySelector("#btnEnviar");
const resposta = document.querySelector("#resposta");

function criarMensagem(texto, tipo) {
  const msg = document.createElement("div");
  msg.classList.add("mensagem", tipo); 
  msg.textContent = texto;
  resposta.appendChild(msg);

 
  resposta.scrollTop = resposta.scrollHeight;
}


button.addEventListener("click", () => {
  const texto = textarea.value.trim();
  if (texto === "") return;


  criarMensagem(texto, "usuario");


  textarea.value = "";


  setTimeout(() => {
    let respostaTexto;

    if (texto.includes("2x2") || texto.includes("2 x 2")) {
      respostaTexto = "2 x 2 é igual a 4.";
    } else {
      respostaTexto = "Entendi! 😉";
    }

    criarMensagem(respostaTexto, "bot");
  }, 500);
});
});
