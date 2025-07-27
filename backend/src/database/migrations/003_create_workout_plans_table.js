/**
 * Migration: Create workout plans table
 */

exports.up = function(knex) {
  return knex.schema.createTable('workout_plans', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.text('description');
    table.uuid('created_by_user_id').references('id').inTable('users').notNullable();
    table.enum('difficulty_level', ['beginner', 'intermediate', 'advanced']);
    table.integer('estimated_duration_minutes');
    table.integer('estimated_calories_burned');
    table.string('target_muscle_groups'); // JSON array
    table.string('equipment_needed'); // JSON array
    table.string('tags'); // JSON array for categorization
    table.boolean('is_public').defaultTo(false);
    table.boolean('is_template').defaultTo(false);
    table.integer('likes_count').defaultTo(0);
    table.integer('uses_count').defaultTo(0);
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);
    
    // Indexes
    table.index('created_by_user_id');
    table.index('difficulty_level');
    table.index('is_public');
    table.index('is_template');
    table.index('target_muscle_groups');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('workout_plans');
};
