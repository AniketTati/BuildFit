/**
 * Migration: Create users table
 */

exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('email').notNullable().unique();
    table.string('password_hash').notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('profile_picture_url');
    table.date('date_of_birth');
    table.enum('gender', ['male', 'female', 'other', 'prefer_not_to_say']);
    table.decimal('height_cm', 5, 2); // Height in centimeters
    table.decimal('weight_kg', 5, 2); // Weight in kilograms
    table.enum('fitness_level', ['beginner', 'intermediate', 'advanced']);
    table.text('fitness_goals'); // JSON array of goals
    table.boolean('is_active').defaultTo(true);
    table.boolean('email_verified').defaultTo(false);
    table.timestamp('last_login_at');
    table.timestamps(true, true); // created_at, updated_at
    
    // Indexes
    table.index('email');
    table.index('is_active');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
