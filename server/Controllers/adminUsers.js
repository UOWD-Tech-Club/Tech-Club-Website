//Controllers/adminUsers.js
// for managing the authentication of users

import pool from '../Db/db_config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const loginAdmin = async (req, res) => {
    const db = await pool.connect();
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Please enter all fields to login',
            });
        }

        const userResult = await db.query(
            `SELECT * FROM "adminUsers" WHERE email = $1`,
            [email]
        );

        if (userResult.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password'});
        }

        const user = userResult.rows[0];

        //validating password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password'});
        }

        const token = jwt.sign(
            { admin_id: user.admin_id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login Successful',
            token,
            user: {
                admin_id: user.admin_id,
                email: user.email,
                createdAt: user.admin_createdAt
            }
        });
    } catch (error) {
        console.log('Error logging in user:', error.message);
        return res.status(500).json({ message: 'Internal server error'});
    } finally {
        db.release();
    }
};

export const registerAdmin = async (req, res) => {
    const db = await pool.connect();
    try {
        const { email, password } = req.body;
        console.log(req.body);

        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all fields to be registered' });
        }

        const userExists = await db.query(
            `SELECT * FROM "adminUsers" WHERE email = $1`,
            [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists'});
        }

        //if user doesn't exist, create new account
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await db.query(
            `INSERT INTO "adminUsers" (email, password, "admin_createdAt") 
            VALUES ($1, $2, NOW()) RETURNING *`,
            [email, hashedPassword]
        );

        res.status(201).json({
            message: "Admin user created successfully",
            user: {
                admin_id: newUser.rows[0].admin_id,
                email: newUser.rows[0].email,
                createdAt: newUser.rows[0].admin_createdAt
            }
        });

    } catch (error) {
        console.log('Error registering admin user:', error.message);
        res.status(500).json({ message: 'Internal server error'});
    } finally {
        db.release();
    }
};