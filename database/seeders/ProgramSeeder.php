<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('programs')->insert([
            ['name' => 'School', 'slug' => 'schools'],
            ['name' => 'Higher Education', 'slug' => 'higher-educations',],
            ['name' => 'Marriage', 'slug' => 'marriages',],
            ['name' => 'Ration', 'slug' => 'rations',],
            ['name' => 'Patient', 'slug' => 'patients',],
        ]);
    }
}
