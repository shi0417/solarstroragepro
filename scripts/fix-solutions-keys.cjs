/**
 * fix-solutions-keys.cjs
 * Fix wrong key names in solutionsDataCenter:
 *   scenariosParagraphEn → scenariosParagraph
 *   scenariosParagraphZh → delete (value already under wrong key)
 *   tableNoteEn → tableNote
 *   tableNoteZh → delete
 * Also fix solutionsGridLevelBess if needed.
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'src', 'messages');
const LOCALES = ['en', 'zh', 'es', 'tr', 'pt', 'de', 'fr', 'th', 'ar', 'ja', 'ko', 'id'];

function fixSection(obj) {
  if (!obj) return;
  // Fix scenariosParagraph* 
  if (obj.scenariosParagraphEn !== undefined) {
    obj.scenariosParagraph = obj.scenariosParagraphEn;
    delete obj.scenariosParagraphEn;
  }
  if (obj.scenariosParagraphZh !== undefined) {
    if (obj.scenariosParagraph === undefined) obj.scenariosParagraph = obj.scenariosParagraphZh;
    delete obj.scenariosParagraphZh;
  }
  // Fix tableNote*
  if (obj.tableNoteEn !== undefined) {
    obj.tableNote = obj.tableNoteEn;
    delete obj.tableNoteEn;
  }
  if (obj.tableNoteZh !== undefined) {
    if (obj.tableNote === undefined) obj.tableNote = obj.tableNoteZh;
    delete obj.tableNoteZh;
  }
}

for (const locale of LOCALES) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  if (!fs.existsSync(filePath)) continue;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (data.solutionsGridLevelBess) fixSection(data.solutionsGridLevelBess);
  if (data.solutionsDataCenter) fixSection(data.solutionsDataCenter);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`✅ Fixed ${locale}.json`);
}

console.log('\nDone — all wrong key suffixes removed.');
