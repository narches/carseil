const pool = require("../database")


const getClassifications = async () => {
  try {
    const result = await pool.query('SELECT classification_id, classification_name FROM classifications'); // Adjust the query as needed
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Failed to fetch classifications');
  }
};

async function checkExistingName(classification_name){
  try {
    const sql = "SELECT * FROM classification WHERE classification_name = $1"
    const name = await pool.query(sql, [classification_name])
    return name.rowCount
  } catch (error) {
    return error.message
  }
}

module.exports = {getClassifications, checkExistingName }