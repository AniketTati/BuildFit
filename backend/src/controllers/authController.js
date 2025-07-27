const User = require('../models/User');
const { hashPassword, verifyPassword } = require('../services/password');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../middleware/auth');
const { 
  registerSchema, 
  loginSchema, 
  forgotPasswordSchema, 
  refreshTokenSchema,
  validate 
} = require('../validators/auth');

/**
 * Authentication Controller
 * Handles user registration, login, logout, and token management
 */

class AuthController {
  /**
   * Register a new user
   * POST /api/v1/auth/register
   */
  async register(req, res) {
    try {
      // Validate input
      const { error, value } = validate(registerSchema, req.body);
      if (error) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'Please check your input',
          details: error.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message
          }))
        });
      }

      const { email, password, firstName, lastName, ...profileData } = value;

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          error: 'Conflict',
          message: 'An account with this email already exists'
        });
      }

      // Hash password
      const passwordHash = await hashPassword(password);

      // Create user
      const userData = {
        email,
        passwordHash,
        firstName,
        lastName,
        ...profileData
      };

      const user = await User.create(userData);

      // Generate tokens
      const tokenPayload = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      };

      const accessToken = generateAccessToken(tokenPayload);
      const refreshToken = generateRefreshToken({ id: user.id });

      res.status(201).json({
        message: 'User registered successfully',
        user,
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: '24h'
        }
      });

    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to register user'
      });
    }
  }

  /**
   * Login user
   * POST /api/v1/auth/login
   */
  async login(req, res) {
    try {
      // Validate input
      const { error, value } = validate(loginSchema, req.body);
      if (error) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'Please check your input',
          details: error.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message
          }))
        });
      }

      const { email, password } = value;

      // Find user with password hash
      const userWithPassword = await User.findByEmailWithPassword(email);
      if (!userWithPassword) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Invalid email or password'
        });
      }

      // Check if account is active
      if (!userWithPassword.is_active) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Account is deactivated'
        });
      }

      // Verify password
      const isPasswordValid = await verifyPassword(password, userWithPassword.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Invalid email or password'
        });
      }

      // Update last login
      await User.updateLastLogin(userWithPassword.id);

      // Get user data without password
      const user = await User.findById(userWithPassword.id);

      // Generate tokens
      const tokenPayload = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      };

      const accessToken = generateAccessToken(tokenPayload);
      const refreshToken = generateRefreshToken({ id: user.id });

      res.json({
        message: 'Login successful',
        user,
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: '24h'
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to login'
      });
    }
  }

  /**
   * Refresh access token
   * POST /api/v1/auth/refresh
   */
  async refreshToken(req, res) {
    try {
      // Validate input
      const { error, value } = validate(refreshTokenSchema, req.body);
      if (error) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'Refresh token is required'
        });
      }

      const { refreshToken } = value;

      // Verify refresh token
      const decoded = await verifyToken(refreshToken, process.env.JWT_SECRET || 'buildfit-dev-secret-key-change-in-production');
      
      // Find user
      const user = await User.findById(decoded.id);
      if (!user || !user.isActive) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Invalid refresh token'
        });
      }

      // Generate new access token
      const tokenPayload = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      };

      const newAccessToken = generateAccessToken(tokenPayload);

      res.json({
        message: 'Token refreshed successfully',
        tokens: {
          accessToken: newAccessToken,
          expiresIn: '24h'
        }
      });

    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Refresh token expired'
        });
      }
      
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Invalid refresh token'
        });
      }

      console.error('Token refresh error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to refresh token'
      });
    }
  }

  /**
   * Get current user profile
   * GET /api/v1/auth/me
   */
  async getCurrentUser(req, res) {
    try {
      // User is attached to request by auth middleware
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'User not found'
        });
      }

      res.json({
        message: 'User profile retrieved successfully',
        user
      });

    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to get user profile'
      });
    }
  }

  /**
   * Logout user (invalidate token on client side)
   * POST /api/v1/auth/logout
   */
  async logout(req, res) {
    try {
      // In a JWT stateless system, logout is typically handled on the client side
      // by removing the token. This endpoint can be used for logging purposes
      // or future token blacklisting implementation.

      res.json({
        message: 'Logout successful'
      });

    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to logout'
      });
    }
  }

  /**
   * Request password reset
   * POST /api/v1/auth/forgot-password
   */
  async forgotPassword(req, res) {
    try {
      // Validate input
      const { error, value } = validate(forgotPasswordSchema, req.body);
      if (error) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'Please provide a valid email address'
        });
      }

      const { email } = value;

      // Check if user exists
      const user = await User.findByEmail(email);
      if (!user) {
        // Don't reveal if email exists for security
        return res.json({
          message: 'If an account with this email exists, a password reset link will be sent'
        });
      }

      // TODO: Implement email service for password reset
      // For now, return success message
      res.json({
        message: 'If an account with this email exists, a password reset link will be sent'
      });

    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to process password reset request'
      });
    }
  }
}

module.exports = new AuthController();
