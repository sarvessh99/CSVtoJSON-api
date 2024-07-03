const fs = require('fs');

const parseCSVtojson = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const lines = data.split('\n').filter(Boolean);
  const headers = lines[0].split(',');
  const records = lines.slice(1);

  return records.map((record) => {
    const values = record.split(',');
    const result = {};

    headers.forEach((header, index) => {
      const keys = header.split('.');
      let temp = result;

      keys.forEach((key, idx) => {
        if (idx === keys.length - 1) {
          temp[key] = values[index];
        } else {
          temp[key] = temp[key] || {};
          temp = temp[key];
        }
      });
    });

    return result;
  });
};

module.exports = parseCSVtojson;

