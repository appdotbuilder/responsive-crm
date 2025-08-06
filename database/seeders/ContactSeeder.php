<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::factory()->admin()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        // Create regular users
        $user1 = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ]);

        $user2 = User::factory()->create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
        ]);

        // Create contacts for admin (can see all)
        Contact::factory()->count(15)->create([
            'user_id' => $admin->id,
        ]);

        // Create contacts for regular users
        Contact::factory()->count(10)->create([
            'user_id' => $user1->id,
        ]);

        Contact::factory()->count(8)->create([
            'user_id' => $user2->id,
        ]);

        // Create some specific demo contacts
        Contact::create([
            'user_id' => $user1->id,
            'first_name' => 'Alice',
            'last_name' => 'Johnson',
            'email' => 'alice.johnson@techcorp.com',
            'phone' => '+1 (555) 123-4567',
            'company' => 'TechCorp Inc.',
            'position' => 'Senior Developer',
            'address' => '123 Tech Street, San Francisco, CA 94102',
            'notes' => 'Met at the developer conference. Interested in our new product line.',
            'status' => 'active',
        ]);

        Contact::create([
            'user_id' => $user1->id,
            'first_name' => 'Bob',
            'last_name' => 'Wilson',
            'email' => 'bob.wilson@startupco.com',
            'phone' => '+1 (555) 987-6543',
            'company' => 'StartupCo',
            'position' => 'CEO',
            'address' => '456 Innovation Ave, Austin, TX 78701',
            'notes' => 'Potential partnership opportunity. Follow up next month.',
            'status' => 'active',
        ]);
    }
}