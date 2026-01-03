exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { image, amount } = JSON.parse(event.body);
    if (!image) {
      return { statusCode: 400, body: "No image" };
    }

    const buffer = Buffer.from(image, "base64");

    const form = new FormData();
    form.append("chat_id", process.env.CHAT_ID);
    form.append(
      "caption",
      `🧾 YENİ BALANS ARTIRIMI\n💰 Məbləğ: ${amount || "Qeyd edilməyib"}\n🕒 ${new Date().toLocaleString()}`
    );
    form.append(
      "photo",
      new Blob([buffer], { type: "image/jpeg" }),
      "receipt.jpg"
    );

    const tg = await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendPhoto`,
      {
        method: "POST",
        body: form,
      }
    );

    if (!tg.ok) {
      throw new Error("Telegram error");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message,
    };
  }
};
