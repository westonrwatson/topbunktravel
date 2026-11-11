/**
 * Top Bunk Travel — form webhook for Google Sheets
 *
 * 1. Open the spreadsheet and create three tabs named exactly:
 *    waitlist | waitlist survey | hostels
 * 2. Extensions → Apps Script, paste this file, save.
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the /exec URL into .env as PUBLIC_FORMS_ENDPOINT
 */

const SPREADSHEET_ID = "1diq3pw6rcIO1c0rVkw1LX4vsesZB-5zRwWhHZ6qg0PQ";

const SHEET_COLUMNS = {
  waitlist: ["submitted_at", "email", "consent", "updates"],
  "waitlist survey": [
    "submitted_at",
    "email",
    "first_city",
    "next_region",
    "next_region_other",
    "timing",
    "companions",
    "hostel_experience",
    "would_buy",
    "heard_from",
  ],
  hostels: ["submitted_at", "hostel_name", "city", "website", "contact_name", "email", "consent"],
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const formName = String(data.form_name || "waitlist").trim();
    const columns = SHEET_COLUMNS[formName];

    if (!columns) {
      return jsonResponse({ ok: false, error: "Unknown form: " + formName }, 400);
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(formName);

    if (!sheet) {
      return jsonResponse({ ok: false, error: "Missing tab: " + formName }, 400);
    }

    ensureHeaders(sheet, columns);

    const row = columns.map((key) => {
      if (key === "submitted_at") return new Date();
      return data[key] != null ? String(data[key]) : "";
    });

    sheet.appendRow(row);
    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) }, 500);
  }
}

function doGet() {
  return ContentService.createTextOutput("Top Bunk forms endpoint is running.");
}

function ensureHeaders(sheet, columns) {
  if (sheet.getLastRow() > 0) return;
  sheet.getRange(1, 1, 1, columns.length).setValues([columns]);
  sheet.getRange(1, 1, 1, columns.length).setFontWeight("bold");
}

function jsonResponse(body, status) {
  const output = ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
  return output;
}
