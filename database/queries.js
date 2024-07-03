const pool = require('./index');

const insertUser = async (user) => {
    const { name, age, address, ...additionalInfo } = user;
    const fullName=`${name.firstName} ${name.lastName}`
    const addressJson = JSON.stringify(address);
    const additionalInfoJson = JSON.stringify(additionalInfo);

  const query = `
    INSERT INTO public.users (name, age, address, additional_info)
    VALUES ($1, $2, $3, $4)
  `;

  await pool.query(query, [fullName, age, addressJson, additionalInfoJson]);
  
};

const getAgeDistribution = async () => {
  const query = `
     SELECT
        age_group,
        COUNT(*) AS count,
        COUNT(*) * 100.0 / (SELECT COUNT(*) FROM users) AS percentage
        FROM (
        SELECT
            CASE
            WHEN age < 20 THEN '< 20'
            WHEN age > 60 THEN '> 60'
            WHEN age >= 20 AND age <= 40 THEN '20 to 40'
            WHEN age > 40 AND age <= 60 THEN '40 to 60'
           
            ELSE 'Unknown'
            END AS age_group
        FROM
            users
        ) AS age_groups
        GROUP BY
        age_group
        ORDER BY
        age_group;

  `;

  const result = await pool.query(query);
 
  return result.rows;
 
    
};



module.exports = { insertUser, getAgeDistribution };
