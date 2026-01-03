const fetch = require("node-fetch");
const FormData = require("form-data");

exports.handler = async (event) => {
  try {
    const { image, amount } = JSON.parse(event.body);
    const buffer = Buffer.from(image, "base64");

    const form = new FormData();
    form.append("chat_id", process.env.CHAT_ID);
    form.append(
      "caption",
      `🧾 YENİ BALANS ARTIRIMI\n💰 Məbləğ: ${amount}\n🕒 ${new Date().toLocaleString()}`
    );
    form.append("photo", buffer, "receipt.jpg");

    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendPhoto`, {
      method: "POST",
      body: form,
    });

    return { statusCode: 200, body: "OK" };
  } catch (e) {
    return { statusCode: 500, body: "ERROR" };
  }
};
