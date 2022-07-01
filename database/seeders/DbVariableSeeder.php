<?php

namespace Database\Seeders;

use App\Models\DbVariable;
use App\Models\DbVariableDetail;
use Illuminate\Database\Seeder;

class DbVariableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // DbVariableDetail::truncate();
        // DbVariable::truncate();

        $gender = DbVariable::create([
            "name" => "Gender"
        ]);

        $rate = DbVariable::create([
            "name" => "Rate"
        ]);

        $rs = DbVariable::create([
            "name" => "RelationshipStatus"
        ]);

        $lf = DbVariable::create([
            "name" => "LookingFor"
        ]);

        $education = DbVariable::create([
            "name" => "Education"
        ]);

        $so = DbVariable::create([
            "name" => "SexualOrientation"
        ]);

        $vaccine = DbVariable::create([
            "name" => "Vaccine"
        ]);


        DbVariableDetail::insert([

            //gender
            [
                "variable_id" => $gender->id,
                "value" => "Male"
            ],
            [
                "variable_id" => $gender->id,
                "value" => "Female"
            ],

            //rate (alchol consumption or smoke)
            [
                "variable_id" => $gender->id,
                "value" => "Other"
            ],
            [
                "variable_id" => $rate->id,
                "value" => "Daily"
            ],
            [
                "variable_id" => $rate->id,
                "value" => "Weekly"
            ],
            [
                "variable_id" => $rate->id,
                "value" => "Monthly"
            ],
            [
                "variable_id" => $rate->id,
                "value" => "Annually"
            ],
            [
                "variable_id" => $rate->id,
                "value" => "Occasionally"
            ],
            [
                "variable_id" => $rate->id,
                "value" => "None"
            ],

            //relationship status
            [
                "variable_id" => $rs->id,
                "value" => "Single"
            ],
            [
                "variable_id" => $rs->id,
                "value" => "Engaged"
            ], [
                "variable_id" => $rs->id,
                "value" => "Married"
            ], [
                "variable_id" => $rs->id,
                "value" => "Divorced"
            ],

            //looking for
            [
                "variable_id" => $lf->id,
                "value" => "Male"
            ],
            [
                "variable_id" => $lf->id,
                "value" => "Female"
            ],
            [
                "variable_id" => $lf->id,
                "value" => "Other"
            ],

            //education
            [
                "variable_id" => $education->id,
                "value" => "School"
            ],
            [
                "variable_id" => $education->id,
                "value" => "High School"
            ], [
                "variable_id" => $education->id,
                "value" => "Bachelors"
            ], [
                "variable_id" => $education->id,
                "value" => "Masters"
            ], [
                "variable_id" => $education->id,
                "value" => "Doctrate"
            ],

            //sexual orientation
            [
                "variable_id" => $so->id,
                "value" => "Heterosexual"
            ],
            [
                "variable_id" => $so->id,
                "value" => "Homosexual"
            ],
            [
                "variable_id" => $so->id,
                "value" => "Bisexual"
            ],
            [
                "variable_id" => $so->id,
                "value" => "Asexual"
            ],

            //vaccine 
            [
                "variable_id" => $vaccine->id,
                "value" => "Fully vaccinated"
            ],[
                "variable_id" => $vaccine->id,
                "value" => "Partially vaccinated"
            ],
            [
                "variable_id" => $vaccine->id,
                "value" => "None"
            ],
        ]);

    }
}
