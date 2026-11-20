// Runs the Ninety triage engine (extracted from index.html) against the reference vignettes.
// Usage: node tests/test_engine.js [path/to/index.html]
const fs = require('fs');
const path = require('path');

const file = process.argv[2] || path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(file, 'utf8');
const match = html.match(/<script id="engine">([\s\S]*?)<\/script>/);
if (!match) { console.error('Engine block not found in', file); process.exit(1); }

const mod = { exports: {} };
new Function('module', match[1])(mod);
const E = mod.exports;

const R = E.runSuite();
console.log('suite', R.pass + '/' + R.total, 'red', R.redRecall + '/' + R.redTotal,
  'under', R.under, 'over', R.over, 'fair', R.fairChanged + '/' + R.fairRuns);
R.rows.filter(r => !r.pass).forEach(r =>
  console.log('DIFFERS', r.id, r.desc, 'expected T' + r.expected, 'got T' + r.got, r.rules.join(' ')));

// Report reader check
const sample = 'Semen volume: 2.8 mL\npH: 7.6\nSperm concentration: 12 x10^6/mL\nTotal sperm number: 33.6 x10^6 per ejaculate\n' +
  'Total motility (PR+NP): 35 %\nProgressive motility (PR): 24 %\nVitality: 62 %\nNormal forms (strict criteria): 3 %\n' +
  'Peroxidase-positive leukocytes: 0.4 x10^6/mL\nDNA fragmentation index (SCD): 32 %';
const parsed = E.parseReport(sample);
const want = { volume: 2.8, ph: 7.6, conc: 12, total: 33.6, motility: 35, progressive: 24, vitality: 62, morph: 3, wbc: 0.4, dfi: 32 };
const parseOk = Object.keys(want).every(k => parsed[k] === want[k]);
console.log('report reader', parseOk ? 'ok' : 'FAILED', parseOk ? '' : JSON.stringify(parsed));

process.exit(R.pass === R.total && R.fairChanged === 0 && parseOk ? 0 : 1);
