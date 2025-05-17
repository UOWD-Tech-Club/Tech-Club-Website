//Controllers/adminUsers.js
// for managing the authentication of users

import pool from '../Db/db_config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

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

        // Create JWT token
        const token = jwt.sign(
            { 
                admin_id: user.admin_id,
                email: user.email,
                role: 'admin'
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        // Set cookie with token
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        // Send response with user data and token
        res.status(200).json({
            message: 'Login Successful',
            token,
            user: {
                admin_id: user.admin_id,
                email: user.email,
                role: 'admin',
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

        // Create JWT token for new user
        const token = jwt.sign(
            { 
                admin_id: newUser.rows[0].admin_id,
                email: newUser.rows[0].email,
                role: 'admin'
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        // Set cookie with token
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.status(201).json({
            message: "Admin user created successfully",
            token,
            user: {
                admin_id: newUser.rows[0].admin_id,
                email: newUser.rows[0].email,
                role: 'admin',
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

// Utility to send email
const sendMagicLinkEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        // Configure your SMTP here
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const magicLink = `http://localhost:5173/Tech-Club-Website/magic-login?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Admin Magic Link',
        html: `<p>Click <a href="${magicLink}">here</a> to sign in as admin.</p>`,
    });
};

// Invite admin (send magic link)
export const inviteAdmin = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });

    // Generate sign-in token (short expiry, e.g., 15 min)
    const token = jwt.sign(
        { email, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );

    try {
        await sendMagicLinkEmail(email, token);
        res.status(200).json({ message: 'Magic link sent' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to send email' });
    }
};

// Magic link login
export const magicLogin = async (req, res) => {
    const db = await pool.connect();
    try {
        const { token } = req.body;
        if (!token) return res.status(400).json({ message: 'Token required' });

        // Validate token
        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const { email } = payload;

        // Check if user exists
        let userResult = await db.query(
            `SELECT * FROM "adminUsers" WHERE email = $1`,
            [email]
        );

        let user;
        if (userResult.rows.length === 0) {
            // Create user (no password)
            const newUser = await db.query(
                `INSERT INTO "adminUsers" (email, password, "admin_createdAt") VALUES ($1, $2, NOW()) RETURNING *`,
                [email, ''] // Empty password or random string
            );
            user = newUser.rows[0];
        } else {
            user = userResult.rows[0];
        }

        // Generate auth token
        const authToken = jwt.sign(
            { admin_id: user.admin_id, email: user.email, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        const needsPassword = !user.password; // true if password is empty string

        res.cookie('token', authToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: 'Login Successful',
            token: authToken,
            user: {
                admin_id: user.admin_id,
                email: user.email,
                role: 'admin',
                createdAt: user.admin_createdAt
            },
            needsPassword
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        db.release();
    }
};

export const setPassword = async (req, res) => {
    const db = await pool.connect();
    try {
        const { password } = req.body;
        const userId = req.user.admin_id; // assuming you use auth middleware

        if (!password) {
            return res.status(400).json({ message: 'Password required' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.query(
            `UPDATE "adminUsers" SET password = $1 WHERE admin_id = $2`,
            [hashedPassword, userId]
        );

        res.status(200).json({ message: "Password set successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    } finally {
        db.release();
    }
};