/**
 * Contact form backend for the portfolio. Runs as a Google Apps Script web app in your own
 * Google account and emails each message to your Gmail. No third-party form service.
 *
 * Setup (once, about 3 minutes):
 *   1. Open https://script.google.com and click "New project". Name it "Portfolio contact".
 *   2. Replace the contents of Code.gs with this file, then click Save.
 *   3. Click Deploy > New deployment > gear icon > Web app.
 *        Execute as: Me.  Who has access: Anyone.  Click Deploy.
 *   4. Approve the permission prompt. Google shows "Google hasn't verified this app" because
 *      the script is yours: click Advanced > Go to Portfolio contact (unsafe) > Allow.
 *   5. Copy the Web app URL (https://script.google.com/macros/s/.../exec) and put it in
 *      `contactForm` in src/content.ts. The form appears on the site once that is set.
 *
 * After editing this script, use Deploy > Manage deployments > Edit > Version: New version,
 * so the same URL keeps working.
 */

const TO = "shashank.shukla1202@gmail.com";
const MAX_PER_SENDER_PER_HOUR = 3;

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Honeypot: people never see this field, bots fill it. Pretend success and drop it.
  if (p.website) return reply({ ok: true });

  const name = clean(p.name, 100);
  const email = clean(p.email, 200);
  const message = clean(p.message, 5000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return reply({ ok: false, error: "invalid" });
  }

  // A small rate limit per sender address, so one visitor cannot flood your inbox.
  const cache = CacheService.getScriptCache();
  const key = "n:" + email.toLowerCase();
  const sent = Number(cache.get(key) || 0);
  if (sent >= MAX_PER_SENDER_PER_HOUR) return reply({ ok: false, error: "rate" });

  try {
    MailApp.sendEmail({
      to: TO,
      replyTo: email,
      name: "Portfolio contact",
      subject: "Portfolio message from " + name,
      body: message + "\n\n" + name + " <" + email + ">",
    });
  } catch (err) {
    return reply({ ok: false, error: "mail" });
  }
  cache.put(key, String(sent + 1), 3600);
  return reply({ ok: true });
}

function clean(value, max) {
  return String(value || "").trim().slice(0, max);
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
