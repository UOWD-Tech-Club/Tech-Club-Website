import pool from "../Db/db_config.js";

// FIXME: Password column is set to Not NULL by default, so have to update schema for it
export const inviteExecutive = async (req, res) => {
  const db = await pool.connect();
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const retrievedExecutive = await db.query(
      `SELECT * FROM "adminUsers" WHERE email = $1`,
      [email]
    );

    if (retrievedExecutive.rows.length > 0) {
      return res.status(400).json({
        message: "Executive with same mail already exists in database",
      });
    }

    const newExecutive = await db.query(
      `INSERT INTO "adminUsers" (email, password, "admin_createdAt" ) VALUES ($1, $2, NOW()) RETURNING *`,
      [email, "test"]
    );

    if (newExecutive.rowCount === 0) {
      return res.status(500).json({ message: "Failed to create executive" });
    }

    res.status(201).json({
      message: "Executive created successfully",
    });
  } catch (error) {
    console.log("Error creating executive", error.message);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    db.release();
  }
};

export const getAllExecutives = async (req, res) => {
  try {
    const executives = await pool.query(`SELECT * FROM "adminUsers"`);

    if (executives.rows.length === 0) {
      return res.status(404).json({ message: "No executives found" });
    }

    res.status(200).json({
      message: "All executive records retrieved successfully",
      executives: executives.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getExecutive = async (req, res) => {
  try {
    const { executiveID } = req.params;

    const executive = await pool.query(
      `SELECT * FROM "adminUsers" WHERE admin_id = $1`,
      [executiveID]
    );

    if (executive.rows.length === 0) {
      return res.status(404).json({ message: "No executive found" });
    }

    res.status(200).json({
      message: "Executive record retrieved successfully",
      executive: executive.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// FIXME: role column doesnt exist in database yet so have to add it
export const updateExecutiveRole = async (req, res) => {
  try {
    const { executiveID } = req.params;
    const { newRole } = req.body;

    const updatedExecutive = await pool.query(
      `UPDATE "adminUsers" set role = $1 WHERE admin_id = $2 RETURNING *`,
      [newRole, executiveID]
    );

    if (updatedExecutive.rowCount === 0) {
      return res.status(404).json({
        message: "Executive record doesnt exist",
      });
    }

    res.status(204).send();
  } catch (error) {
    console.log("Error updating executive record", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteExecutive = async (req, res) => {
  try {
    const { executiveID } = req.params;

    const deletedExecutive = await pool.query(
      `DELETE FROM "adminUsers" WHERE admin_id = $1 RETURNING *`,
      [executiveID]
    );

    if (deletedExecutive.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "No executive found to be deleted" });
    }

    res.status(200).json({
      message: "Executive record deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
