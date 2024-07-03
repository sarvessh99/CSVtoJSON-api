const parseCSVtojson = require('../utils/parseCSVtojson');
const { insertUser, getAgeDistribution } = require('../database/queries');
const config = require('config');

const uploadCSV = async (req, res) => {
  try {
    const filePath = config.get('csvFilePath');
    const users = parseCSVtojson(filePath);

    for (const user of users) {
      await insertUser(user);
    }

    const printAgeDistribution = async () => {
        try {
          const ageDistribution = await getAgeDistribution();
          console.log('Age Group Distribution Report:');
          ageDistribution.forEach(row => {
            const percentage = typeof row.percentage === 'string' ? parseFloat(row.percentage) : row.percentage;
            if (typeof percentage === 'number' && !isNaN(percentage)) {
                console.log(`${row.age_group}: ${percentage.toFixed(2)}%`);
                
              } else {
                console.warn(`Invalid percentage value for ${row.age_group}`);
                // Handle or log invalid percentage values
              }
            });
        } catch (error) {
          console.error('Error fetching age group distribution:', error);
        } 
      };
      printAgeDistribution();


    res.send('CSV data uploaded and processed successfully.');
  } catch (error) {
    console.error('Error processing CSV:', error);
    res.status(500).send('An error occurred while processing the CSV file.');
  }
};

module.exports = { uploadCSV };
