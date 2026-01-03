const BOT_TOKEN = "BURAYA_BOT_TOKENİNİ_YAZ";
const CHAT_ID = "BURAYA_CHAT_ID_YAZ";

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { image, amount, username } = JSON.parse(event.body);
    if (!image || !amount || !username) {
      return { statusCode: 400, body: "Missing data" };
    }

    const buffer = Buffer.from(image, "base64");

    const form = new FormData();
    form.append("chat_id", CHAT_ID);
    form.append(
      "caption",
`🧾 YENİ BALANS ARTIRIMI
💰 Məbləğ: ${amount} AZN
👤 İstifadəçi: ${username}
🕒 ${new Date().toLocaleString()}`
    );
    form.append(
      "photo",
      new Blob([buffer], { type: "image/jpeg" }),
      "receipt.jpg"
    );

    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
      {
        method: "POST",
        body: form,
      }
    );

    if (!res.ok) throw new Error("Telegram error");

    return { statusCode: 200, body: "OK" };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
