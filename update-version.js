// update-version.js
const fs = require('fs');
const path = require('path');

// Get current date and time in the format YYYYMMDD.HHmmss
const now = new Date();
const version = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}.${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;

// Path to the manifest file
const manifestPath = path.join(__dirname, 'build', 'manifest.json');

// Check if the manifest file exists
if (!fs.existsSync(manifestPath)) {
  console.error('Manifest file does not exist:', manifestPath);
  process.exit(1);
}

// Read the manifest file
let manifest;
try {
  const data = fs.readFileSync(manifestPath, 'utf8');
  manifest = JSON.parse(data);
} catch (err) {
  console.error('Error reading or parsing manifest file:', err);
  process.exit(1);
}

// Update the version
manifest.version = version;

// Write the updated manifest back to the file
try {
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log('Manifest version updated to', version);
} catch (err) {
  console.error('Error writing manifest file:', err);
  process.exit(1);
}
