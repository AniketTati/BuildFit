const knex = require('../database/connection');
const { v4: uuidv4 } = require('uuid');

/**
 * User Model
 * Handles database operations for users
 */

class User {
  constructor() {
    this.tableName = 'users';
  }

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created user
   */
  async create(userData) {
    const user = {
      id: uuidv4(),
      email: userData.email.toLowerCase().trim(),
      password_hash: userData.passwordHash,
      first_name: userData.firstName.trim(),
      last_name: userData.lastName.trim(),
      profile_picture_url: userData.profilePictureUrl || null,
      date_of_birth: userData.dateOfBirth || null,
      gender: userData.gender || null,
      height_cm: userData.heightCm || null,
      weight_kg: userData.weightKg || null,
      fitness_level: userData.fitnessLevel || 'beginner',
      fitness_goals: userData.fitnessGoals ? JSON.stringify(userData.fitnessGoals) : null,
      is_active: true,
      email_verified: false,
      created_at: new Date(),
      updated_at: new Date()
    };

    const [createdUser] = await knex(this.tableName)
      .insert(user)
      .returning(['id', 'email', 'first_name', 'last_name', 'profile_picture_url', 
                 'date_of_birth', 'gender', 'height_cm', 'weight_kg', 'fitness_level', 
                 'fitness_goals', 'is_active', 'email_verified', 'created_at', 'updated_at']);

    return this.formatUser(createdUser);
  }

  /**
   * Find user by ID
   * @param {string} id - User ID
   * @returns {Promise<Object|null>} User or null
   */
  async findById(id) {
    const user = await knex(this.tableName)
      .where({ id })
      .first();

    return user ? this.formatUser(user) : null;
  }

  /**
   * Find user by email
   * @param {string} email - User email
   * @returns {Promise<Object|null>} User or null
   */
  async findByEmail(email) {
    const user = await knex(this.tableName)
      .where({ email: email.toLowerCase().trim() })
      .first();

    return user ? this.formatUser(user) : null;
  }

  /**
   * Find user by email with password hash (for authentication)
   * @param {string} email - User email
   * @returns {Promise<Object|null>} User with password hash or null
   */
  async findByEmailWithPassword(email) {
    const user = await knex(this.tableName)
      .where({ email: email.toLowerCase().trim() })
      .first();

    return user;
  }

  /**
   * Update user by ID
   * @param {string} id - User ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object|null>} Updated user or null
   */
  async updateById(id, updateData) {
    const updateFields = {
      ...updateData,
      updated_at: new Date()
    };

    // Handle JSON fields
    if (updateData.fitnessGoals) {
      updateFields.fitness_goals = JSON.stringify(updateData.fitnessGoals);
    }

    const [updatedUser] = await knex(this.tableName)
      .where({ id })
      .update(updateFields)
      .returning(['id', 'email', 'first_name', 'last_name', 'profile_picture_url',
                 'date_of_birth', 'gender', 'height_cm', 'weight_kg', 'fitness_level',
                 'fitness_goals', 'is_active', 'email_verified', 'created_at', 'updated_at']);

    return updatedUser ? this.formatUser(updatedUser) : null;
  }

  /**
   * Update last login timestamp
   * @param {string} id - User ID
   * @returns {Promise<void>}
   */
  async updateLastLogin(id) {
    await knex(this.tableName)
      .where({ id })
      .update({
        last_login_at: new Date(),
        updated_at: new Date()
      });
  }

  /**
   * Soft delete user (set is_active to false)
   * @param {string} id - User ID
   * @returns {Promise<boolean>} Success status
   */
  async softDelete(id) {
    const result = await knex(this.tableName)
      .where({ id })
      .update({
        is_active: false,
        updated_at: new Date()
      });

    return result > 0;
  }

  /**
   * Check if email exists
   * @param {string} email - Email to check
   * @returns {Promise<boolean>} True if email exists
   */
  async emailExists(email) {
    const user = await knex(this.tableName)
      .where({ email: email.toLowerCase().trim() })
      .first();

    return !!user;
  }

  /**
   * Get user count
   * @returns {Promise<number>} Total user count
   */
  async getCount() {
    const result = await knex(this.tableName)
      .where({ is_active: true })
      .count('id as count')
      .first();

    return parseInt(result.count);
  }

  /**
   * Format user object (remove sensitive data, parse JSON fields)
   * @param {Object} user - Raw user from database
   * @returns {Object} Formatted user
   */
  formatUser(user) {
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      profilePictureUrl: user.profile_picture_url,
      dateOfBirth: user.date_of_birth,
      gender: user.gender,
      heightCm: user.height_cm,
      weightKg: user.weight_kg,
      fitnessLevel: user.fitness_level,
      fitnessGoals: user.fitness_goals ? JSON.parse(user.fitness_goals) : [],
      isActive: user.is_active,
      emailVerified: user.email_verified,
      lastLoginAt: user.last_login_at,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    };
  }
}

module.exports = new User();
