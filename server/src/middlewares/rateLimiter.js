const { RateLimiterMemory } = require('rate-limiter-flexible');

const loginLimiter = new RateLimiterMemory({
    points: 5,
    duration: 60, 
    blockDuration: 60, 
});

const failedLoginLimiter = new RateLimiterMemory({
    points: 10, 
    duration: 600, 
    blockDuration: 600,
});

module.exports = {
    loginLimiter,
    failedLoginLimiter,
    rateLimitMiddleware: async (req, res, next) => {
        try {
            const ipAddr = req.ip;
            await loginLimiter.consume(ipAddr);
            next();
        } catch (error) {
            if (error instanceof Error) {
                next(error);
            } else {
                const timeLeft = Math.round(error.msBeforeNext / 1000) || 1;
                res.status(429).json({
                    success: false,
                    message: `Too many login attempts. Please try again in ${timeLeft} seconds`,
                });
            }
        }
    }
};