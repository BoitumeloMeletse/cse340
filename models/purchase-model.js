const pool = require("../database/")

async function addPurchase(account_id, inv_id) {
  const sql = `
    INSERT INTO purchases (account_id, inv_id)
    VALUES ($1, $2) RETURNING *`
  const result = await pool.query(sql, [account_id, inv_id])
  return result.rows[0]
}

async function getPurchasesByVehicle(inv_id) {
  const sql = `
    SELECT p.purchase_id, p.purchase_date,
           a.account_firstname, a.account_lastname, a.account_email
    FROM purchases p
    JOIN account a ON p.account_id = a.account_id
    WHERE p.inv_id = $1
    ORDER BY p.purchase_date DESC`
  const result = await pool.query(sql, [inv_id])
  return result.rows
}

async function getPurchaseCount(inv_id) {
  const sql = `SELECT COUNT(*) FROM purchases WHERE inv_id = $1`
  const result = await pool.query(sql, [inv_id])
  return result.rows[0].count
}

module.exports = { addPurchase, getPurchasesByVehicle, getPurchaseCount }
