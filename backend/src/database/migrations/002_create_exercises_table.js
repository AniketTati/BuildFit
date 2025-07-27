/**
 * Migration: Create exercises table
 */

exports.up = function(knex) {
  return knex.schema.createTable('exercises', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.text('description');
    table.text('instructions');
    table.string('muscle_groups'); // JSON array of muscle groups
    table.string('equipment_needed'); // JSON array of equipment
    table.enum('difficulty_level', ['beginner', 'intermediate', 'advanced']);
    table.enum('exercise_type', ['strength', 'cardio', 'flexibility', 'balance', 'sport']);
    table.string('demo_video_url');
    table.string('demo_image_url');
    table.integer('estimated_calories_per_minute');
    table.boolean('is_custom').defaultTo(false);
    table.uuid('created_by_user_id').references('id').inTable('users');
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);
    
    // Indexes
    table.index('name');
    table.index('muscle_groups');
    table.index('equipment_needed');
    table.index('difficulty_level');
    table.index('exercise_type');
    table.index('is_custom');
    table.index('created_by_user_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('exercises');
};
