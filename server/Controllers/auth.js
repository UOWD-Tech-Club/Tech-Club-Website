export const logout = (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const verifyToken = (req, res) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // The token will be verified by the auth middleware
        // If we reach here, the token is valid
        res.status(200).json({ message: 'Token is valid' });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}; 