const Joi = require('joi');

/**
 * Input validation schemas for authentication and user management
 */

// User registration validation schema
const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),

  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must be less than 128 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required'
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Password confirmation is required'
    }),

  firstName: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .required()
    .messages({
      'string.min': 'First name is required',
      'string.max': 'First name must be less than 50 characters',
      'any.required': 'First name is required'
    }),

  lastName: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .required()
    .messages({
      'string.min': 'Last name is required',
      'string.max': 'Last name must be less than 50 characters',
      'any.required': 'Last name is required'
    }),

  dateOfBirth: Joi.date()
    .max('now')
    .min('1900-01-01')
    .optional()
    .allow(null)
    .messages({
      'date.max': 'Date of birth cannot be in the future',
      'date.min': 'Please provide a valid date of birth'
    }),

  gender: Joi.string()
    .valid('male', 'female', 'other', 'prefer_not_to_say')
    .optional()
    .allow(null),

  heightCm: Joi.number()
    .min(50)
    .max(300)
    .optional()
    .allow(null)
    .messages({
      'number.min': 'Height must be at least 50cm',
      'number.max': 'Height must be less than 300cm'
    }),

  weightKg: Joi.number()
    .min(20)
    .max(500)
    .optional()
    .allow(null)
    .messages({
      'number.min': 'Weight must be at least 20kg',
      'number.max': 'Weight must be less than 500kg'
    }),

  fitnessLevel: Joi.string()
    .valid('beginner', 'intermediate', 'advanced')
    .default('beginner'),

  fitnessGoals: Joi.array()
    .items(Joi.string())
    .max(10)
    .optional()
    .allow(null)
    .messages({
      'array.max': 'You can select up to 10 fitness goals'
    })
});

// User login validation schema
const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),

  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required'
    })
});

// Password reset request schema
const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    })
});

// Password reset schema
const resetPasswordSchema = Joi.object({
  token: Joi.string()
    .required()
    .messages({
      'any.required': 'Reset token is required'
    }),

  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must be less than 128 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required'
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Password confirmation is required'
    })
});

// Token refresh schema
const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string()
    .required()
    .messages({
      'any.required': 'Refresh token is required'
    })
});

// Profile update schema
const updateProfileSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .optional()
    .messages({
      'string.min': 'First name cannot be empty',
      'string.max': 'First name must be less than 50 characters'
    }),

  lastName: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .optional()
    .messages({
      'string.min': 'Last name cannot be empty',
      'string.max': 'Last name must be less than 50 characters'
    }),

  dateOfBirth: Joi.date()
    .max('now')
    .min('1900-01-01')
    .optional()
    .allow(null)
    .messages({
      'date.max': 'Date of birth cannot be in the future',
      'date.min': 'Please provide a valid date of birth'
    }),

  gender: Joi.string()
    .valid('male', 'female', 'other', 'prefer_not_to_say')
    .optional()
    .allow(null),

  heightCm: Joi.number()
    .min(50)
    .max(300)
    .optional()
    .allow(null)
    .messages({
      'number.min': 'Height must be at least 50cm',
      'number.max': 'Height must be less than 300cm'
    }),

  weightKg: Joi.number()
    .min(20)
    .max(500)
    .optional()
    .allow(null)
    .messages({
      'number.min': 'Weight must be at least 20kg',
      'number.max': 'Weight must be less than 500kg'
    }),

  fitnessLevel: Joi.string()
    .valid('beginner', 'intermediate', 'advanced')
    .optional(),

  fitnessGoals: Joi.array()
    .items(Joi.string())
    .max(10)
    .optional()
    .allow(null)
    .messages({
      'array.max': 'You can select up to 10 fitness goals'
    })
});

/**
 * Validate request body against schema
 * @param {Object} schema - Joi validation schema
 * @param {Object} data - Data to validate
 * @returns {Object} Validation result
 */
const validate = (schema, data) => {
  return schema.validate(data, { 
    abortEarly: false, // Return all validation errors
    allowUnknown: false, // Don't allow unknown fields
    stripUnknown: true // Remove unknown fields from result
  });
};

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  refreshTokenSchema,
  updateProfileSchema,
  validate
};
