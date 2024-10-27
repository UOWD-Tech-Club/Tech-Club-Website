import pool from "../Db/db_config.js";

//The file will contain the server side logic and controlling for the users table
{
  /* 
Things to be included
    1. POST REQUEST to add user to the user table record
    2. Handle empty list error, multiple server responses for incorrect request.
*/
}

export const addUser = async (req, res) => {
  const db = await pool.connect();
  try {
    const user = req.body.user;

    const result = await db.query(
      `INSERT INTO users (user_studentId, user_name, user_studentEmail) VALUES ($1,$2,$3) RETURNING *`,
      [user.studentId, user.name, user.studentEmail]
    );

    const newUser = await result.rows[0];
    return res.status(200).json({
      message: "Student Created Successfully",
      user: newUser,
    });
  } catch (err) {
    console.log("Error Creating User", err.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  } finally {
    db.release();
  }
};

//Admin function to get users for a specific event using its id and name

export const getRegisteredUsers = async (req, res) => {
  const db = await pool.connect();
  try {
    const { eventId } = req.params;
    console.log(eventId)

    if (!eventId) {
      return res.status(400).json({
        message: "Event name or event Id is required",
      });
    }

    const result = await db.query(
      `SELECT * FROM eventRegistration WHERE event_id = $1`,
      [eventId]
    );

    const users = result.rows;

    if (users.length === 0 ){
        return res.status(400)
        .json({
            message: "No users registered for the event"
        })
    }

    return res.status(200)
    .json({
        message: "Users registered for this event",
        users: users
    })

  } catch (err) {
    console.log("Error Fetching users for the event:", err.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  } finally {
    db.release();
  }
};
