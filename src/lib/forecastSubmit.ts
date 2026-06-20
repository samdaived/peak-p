// Submit forecasts to a Google Form (which writes into a Google Sheet).
//
// HOW TO SET THIS UP:
// 1. Create a Google Form with these short-answer fields:
//      - Username
//      - Company
//      - Product SKU
//      - Product Name
//      - Estimated Annual Volume
//      - Submitted At
// 2. Open the live form, right-click → "View page source", and search for
//    entry.XXXXXXXXX for each field. Paste the IDs below.
// 3. Replace FORM_ID with the long ID from the form URL
//    (https://docs.google.com/forms/d/e/FORM_ID/viewform).
// 4. Submissions use no-cors fetch — they appear silently in your Sheet.

const FORM_ID = 'REPLACE_WITH_YOUR_GOOGLE_FORM_ID';

const FIELDS = {
  username: 'entry.1111111111',
  company: 'entry.2222222222',
  sku: 'entry.3333333333',
  productName: 'entry.4444444444',
  volume: 'entry.5555555555',
  submittedAt: 'entry.6666666666',
};

export type ForecastRow = {
  username: string;
  company: string;
  sku: string;
  productName: string;
  volume: number;
};

export const submitForecastRow = async (row: ForecastRow) => {
  const url = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;
  const body = new FormData();
  body.append(FIELDS.username, row.username);
  body.append(FIELDS.company, row.company);
  body.append(FIELDS.sku, row.sku);
  body.append(FIELDS.productName, row.productName);
  body.append(FIELDS.volume, String(row.volume));
  body.append(FIELDS.submittedAt, new Date().toISOString());

  await fetch(url, { method: 'POST', mode: 'no-cors', body });
};

export const isFormConfigured = () => !FORM_ID.startsWith('REPLACE_');
