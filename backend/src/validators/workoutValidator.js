const Joi = require('joi');

const workoutSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  description: Joi.string().trim().max(500).allow(''),
  difficulty_level: Joi.string().valid('beginner', 'intermediate', 'advanced'),
  estimated_duration_minutes: Joi.number().integer().min(1).max(300),
  estimated_calories_burned: Joi.number().integer().min(1).max(2000),
  target_muscle_groups: Joi.array().items(Joi.string()),
  equipment_needed: Joi.array().items(Joi.string()),
  tags: Joi.array().items(Joi.string()),
  is_public: Joi.boolean().default(false),
  is_template: Joi.boolean().default(false)
});

const workoutUpdateSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100),
  description: Joi.string().trim().max(500).allow(''),
  difficulty_level: Joi.string().valid('beginner', 'intermediate', 'advanced'),
  estimated_duration_minutes: Joi.number().integer().min(1).max(300),
  estimated_calories_burned: Joi.number().integer().min(1).max(2000),
  target_muscle_groups: Joi.array().items(Joi.string()),
  equipment_needed: Joi.array().items(Joi.string()),
  tags: Joi.array().items(Joi.string()),
  is_public: Joi.boolean(),
  is_template: Joi.boolean()
});

const validateWorkout = (data) => {
  return workoutSchema.validate(data, { abortEarly: false });
};

const validateWorkoutUpdate = (data) => {
  return workoutUpdateSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateWorkout,
  validateWorkoutUpdate,
  workoutSchema,
  workoutUpdateSchema
};
