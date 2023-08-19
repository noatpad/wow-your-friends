import 'dotenv/config';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { DateTime } from 'luxon';
import { GoogleSpreadsheet } from 'google-spreadsheet';

import { aliases } from './usernames.js';

const DOC_ID = '1FesTb6qkgMz-dCn7YdioRydToWSQNTg1axFEIHU4FF8';
const STANDARD_SHEET_ID = '583834938';
const DTS_SHEET_ID = '162176771';
const PLAYER_COL = 'C';
const PLATFORM_COL = 'F';

const getNewRunnersFromSheet = async (sheetId, currentRunners) => {
  const standardSheet = doc.sheetsById[sheetId];
  const rows = await standardSheet.getRows({ offset: 1 });
  const start = rows[0].rowNumber;
  const end = rows.length + start - 1;
  await standardSheet.loadCells(`${PLAYER_COL}${start}:${PLAYER_COL}${end}`);
  await standardSheet.loadCells(`${PLATFORM_COL}${start}:${PLATFORM_COL}${end}`);

  const newRunners = [];
  for (const runner of rows) {
    const name = runner.get('Player').trim();
    if (currentRunners.has(name) || aliases[name]) continue;

    const cell = standardSheet.getCellByA1(`${PLAYER_COL}${runner.rowNumber}`);
    const { hyperlink, note } = cell;
    const date = DateTime.fromFormat(runner.get('Date Achieved'), 'DDD').toFormat("y-MM-dd");
    const platform = standardSheet.getCellByA1(`${PLATFORM_COL}${runner.rowNumber}`).value;
    const proofType = ['.png', '.jpg'].some((ext) => hyperlink?.endsWith(ext)) ? 'screenshot' : 'video';
    const flags = [];
    if (runner.get('Total number of entries')?.startsWith('202 on')) flags.push('pre202');
    else if (runner.get('Was not 202')) flags.push('not202');
    if (runner.get('Moon Berry?')) flags.push('double');
    if (runner.get('Used Keys')) flags.push('nks');

    newRunners.push({
      name,
      date,
      platform,
      verified: note ? { value: false, note } : { value: true },
      proof: { type: proofType, url: hyperlink },
      flags
    });
  }

  return newRunners;
};

const dir = path.dirname(fileURLToPath(import.meta.url));
const filepath = path.join(dir, '..', 'public', 'conquerors.json');
const file = await fs.readFile(filepath);
const original = JSON.parse(file);
const runnersMap = new Map(original.map((c) => [c.name, c]));

const doc = new GoogleSpreadsheet(DOC_ID, { apiKey: process.env.GOOGLE_API_KEY });
console.log('Loading FWG spreadsheet...');
await doc.loadInfo();

console.log('Getting new conquerors...');
const newRuns = await getNewRunnersFromSheet(STANDARD_SHEET_ID, runnersMap);
for (const run of newRuns) runnersMap.set(run.name, run);

const newDtsRuns = await getNewRunnersFromSheet(DTS_SHEET_ID, runnersMap);
for (const run of newDtsRuns) run.flags.push('dts');

console.log('Adding new runners to the list...');
const updated = [...original, ...newRuns, ...newDtsRuns];
await fs.writeFile(filepath, JSON.stringify(updated, null, 2));
