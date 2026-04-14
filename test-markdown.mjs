import fs from 'fs';

// Read the example content
const exampleContent = fs.readFileSync('./example-content.md', 'utf-8');

// Simple test - check if tables are being matched
const tableRegex = /^(\|.+\|)\n(\|[\s:-]+\|)\n((?:\|.+\|\n?)*)/gm;
const tableMatch = exampleContent.match(tableRegex);
console.log('Table match found:', tableMatch ? 'YES' : 'NO');
if (tableMatch) {
  console.log('Table content:');
  console.log(tableMatch[0].substring(0, 200));
}

// Check CriticMarkup
const criticDelRegex = /\{--([\s\S]*?)--\}/g;
const criticDelMatch = exampleContent.match(criticDelRegex);
console.log('\nCriticMarkup deletion match found:', criticDelMatch ? 'YES' : 'NO');
if (criticDelMatch) {
  console.log('CriticMarkup deletion content:', criticDelMatch[0]);
}

// Check alerts
const alertRegex = /###\s+(?:[\p{Emoji_Presentation}\p{Extended_Pictographic}]\s*)?(NOTE|TIP|WARNING|DANGER|INFO)/giu;
const alertMatch = exampleContent.match(alertRegex);
console.log('\nAlert match found:', alertMatch ? 'YES' : 'NO');
if (alertMatch) {
  console.log('Alert matches:', alertMatch);
}
