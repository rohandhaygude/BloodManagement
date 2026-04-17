export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();

    let cookieName;
    if (user.role === "Patient") cookieName = "patientToken";
    else if (user.role === "Donor") cookieName = "donorToken";
    else cookieName = "adminToken";

    const expiresDays = Number(process.env.COOKIE_EXPIRES_IN) || 7;

    res.status(statusCode).cookie(cookieName, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: expiresDays * 24 * 60 * 60 * 1000
    }).json({ token,
        success: true,
        message,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }
    });
};