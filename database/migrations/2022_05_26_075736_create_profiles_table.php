<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('gender_id')->constrained('db_variable_details');
            $table->foreignId('looking_for_id')->constrained('db_variable_details')->nullable();
            $table->foreignId('education_id')->constrained('db_variable_details')->nullable();

            $table->foreignId('region_id')->constrained('regions')->nullable();
            $table->foreignId('nationality_id')->constrained('nationalities')->nullable();
            $table->foreignId('religion_id')->constrained('religions')->nullable();
            
            //add remaining foreign table columns with constraints


            $table->foreignId('sexual_orientation_id')->constrained('db_variable_details')->nullable();
            $table->foreignId('vaccine_id')->constrained('db_variable_details')->nullable();
            $table->foreignId('relationship_status_id')->constrained('db_variable_details')->nullable();
            $table->foreignId('alcohol_consumption_id')->constrained('db_variable_details')->nullable();
            $table->foreignId('smoke_id')->constrained('db_variable_details')->nullable();

            $table->string('dob')->nullable();
            $table->string('age')->nullable();
            $table->string('profession')->nullable();
            $table->string('height')->nullable();
            $table->string('children')->nullable();
            $table->string('annual_income')->nullable();
            $table->string('hobby_id')->nullable();
            $table->string('zip_code')->nullable();
            $table->boolean('have_body_art')->default(false);
            $table->string('location')->nullable();
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->string('about_me')->nullable();

            $table->string('physical_type')->nullable();
            $table->string('sign_id')->nullable();
            $table->string('Festiches')->nullable();
            $table->string('personality')->nullable();
            $table->string('quality_id')->nullable();
            
            $table->string('last_relation_text')->nullable();
            $table->boolean('is_online')->default(false);
            // $table->enum('online_status_toggle', ['yes', 'no'])->nullable();
            $table->enum('age_status_toggle', ['yes', 'no'])->nullable();
            $table->integer('no_of_likes')->nullable();
            $table->softDeletes('deleted_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profiles');
    }
}
