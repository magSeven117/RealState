<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UsersTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_users_screen_can_be_rendered(): void
    {
        $user = User::factory()->create();
        
        $user->roles()->sync([1]);

        $user->save();

        $response = $this->actingAs($user)->get(route("users"));

        $response->assertStatus(200);
    }

    public function test_users_screen_unauthenticated_rendered(): void
    {
        $response = $this->get(route("users"));

        $response->assertStatus(302)->assertRedirect(route("login"));
    }

    public function test_users_create_screen_can_be_rendered(): void
    {
        $user = User::factory()->create();
        
        $user->roles()->sync([1]);

        $user->save();

        $response = $this->actingAs($user)->get("/dashboard/users/create");

        $response->assertStatus(200);
    }

    public function test_users_create_screen_unauthenticated_rendered(): void
    {
        $response = $this->get("/dashboard/users/create");

        $response->assertStatus(302)->assertRedirect(route("login"));
    }

    public function test_users_update_screen_can_be_rendered(): void
    {
        $user = User::factory()->create();
        
        $user->roles()->sync([1]);

        $user->save();

        $query = User::first();

        $response = $this->actingAs($user)->get("/dashboard/users/update/".$query->id);

        $response->assertStatus(200);
    }

    public function test_users_update_screen_unauthenticated_rendered(): void
    {
        $query = User::first();

        $response = $this->get("/dashboard/users/update/".$query->id);

        $response->assertStatus(302)->assertRedirect(route("login"));
    }

    public function test_users_can_be_created(): void
    {
        $user = User::factory()->create();
        
        $user->roles()->sync([1]);

        $user->save();

        $response = $this->actingAs($user)->post("/dashboard/users/create/",[
            'name' => 'test',
            'email' => 'test@test.com',
            'password' => 'test',
            'role' => [1,2]
        ]);

        $response->assertStatus(302)->assertRedirect(route("users"));

        $this->assertDatabaseHas('users',[
            'name' => 'test',
            'email' => 'test@test.com'
        ]);
    }

    public function test_users_unauthenticated_created(): void
    {
        $response = $this->post("/dashboard/users/create/",[
            'name' => 'test',
            'email' => 'test@test.com',
            'password' => 'test',
            'role' => 'testing'
        ]);

        $response->assertStatus(302)->assertRedirect(route("login"));
    }

    public function test_users_empty_input_created(): void
    {
        $user = User::factory()->create();
        
        $user->roles()->sync([1]);

        $user->save();

        $response = $this->actingAs($user)->post("/dashboard/users/create/",[
            'name' => '',
            'email' => '',
            'password' => '',
        ]);

        $response->assertStatus(302)->assertInvalid([
            'name',
            'email',
            'password',      
        ]);
    }


    public function test_users_can_be_updated(): void
    {
        $user = User::factory()->create();
        
        $user->roles()->sync([1]);

        $user->save();

        $query = User::find(5);

        $response = $this->actingAs($user)->post("/dashboard/users/update/".$query->id,[
            'name' => 'test',
            'email' => 'test@update.com',
            'password' => 'test',
        ]);

        $response->assertStatus(302)->assertRedirect(route("users"));

        $this->assertDatabaseHas('users',[
            'id' => $query->id,
            'name' => 'test',
            'email' => 'test@update.com'
        ]);
    }

    public function test_users_unauthenticated_updated(): void
    {
        $query = User::find(5);

        $response = $this->post("/dashboard/users/update/".$query->id,[
            'name' => 'test',
            'email' => 'test@test.com',
            'password' => 'test',
            'role' => [1,2]
        ]);

        $response->assertStatus(302)->assertRedirect(route("login"));
    }

    public function test_users_empty_input_updated(): void
    {
        $user = User::factory()->create();
        
        $user->roles()->sync([1]);

        $user->save();

        $query = User::find(5);

        $response = $this->actingAs($user)->post("/dashboard/users/update/".$query->id,[
            'name' => '',
            'email' => '',
            'password' => '',
        ]);

        $response->assertStatus(302)->assertInvalid([
            'name',
            'email',
            'password',        
        ]);
    }
}