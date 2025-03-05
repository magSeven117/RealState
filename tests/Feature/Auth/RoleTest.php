<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RoleTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_roles_screen_can_be_rendered(): void
    {
        $user = User::factory()->create();

        $user->roles()->sync([1]);

        $user->save();

        $response = $this->actingAs($user)->get(route("roles"));

        $response->assertStatus(200);
    }

    public function test_roles_screen_unauthenticated_rendered(): void
    {
        $response = $this->get(route("roles"));

        $response->assertStatus(302)->assertRedirect(route("login"));
    }

    public function test_role_can_be_created(): void
    {
        $user = User::factory()->create();

        $user->roles()->sync([1]);

        $user->save();

        $response = $this->actingAs($user)->post("/dashboard/role/create", [
            'role' => 'test',
            'permissions' => [1]
        ]);

        $response->assertStatus(302)->assertRedirect(route("roles"));

        $this->assertDatabaseHas('roles',[
            'name' => 'test'
        ]);
    }

    public function test_role_unauthenticated_created(): void
    {
        $response = $this->post("/dashboard/role/create",[
            'role' => 'test',
            'permissions' => [1]
        ]);

        $response->assertStatus(302)->assertRedirect(route("login"));
    }

    public function test_role_empty_input_created(): void
    {
        $user = User::factory()->create();

        $user->roles()->sync([1]);

        $user->save();

        $response = $this->actingAs($user)->post("/dashboard/role/create",[
            'role' => '',
            'permissions' => ''
        ]);

        $response->assertStatus(302)->assertInvalid([
            'role',
            'permissions',           
        ]);
    }

    public function test_role_can_be_updated(): void
    {
        $user = User::factory()->create();

        $user->roles()->sync([1]);

        $user->save();

        $role = Role::create([
            'name'=>'test'
        ]);

        $response = $this->actingAs($user)->post("/dashboard/role/update", [
            'role' => $role->name,
            'permissions' => [1, 2]
        ]);

        $response->assertStatus(302)->assertRedirect(route("roles"));
    }

    public function test_role_unauthenticated_updated(): void
    {
        $response = $this->post("/dashboard/role/update",[
            'role' => 'test',
            'permissions' => [1]
        ]);

        $response->assertStatus(302)->assertRedirect(route("login"));
    }

    public function test_role_empty_input_updated(): void
    {
        $user = User::factory()->create();

        $user->roles()->sync([1]);

        $user->save();

        $response = $this->actingAs($user)->post("/dashboard/role/update",[
            'role' => '',
            'permissions' => ''
        ]);

        $response->assertStatus(302)->assertInvalid([
            'role',
            'permissions',           
        ]);
    }

    public function test_role_can_be_delete(): void
    {
        $user = User::factory()->create();

        $user->roles()->sync([1]);

        $user->save();

        $role = Role::create([
            'name'=>'test'
        ]);

        $response = $this->actingAs($user)->delete("/dashboard/role/delete/".$role->id);

        $response->assertStatus(302)->assertRedirect(route("roles"));

        $this->assertDatabaseMissing('roles', [
            'name' => $role->name
        ]);
    }

    public function test_role_unauthenticated_delete(): void
    {
        $role = Role::create([
            'name'=>'test'
        ]);

        $response = $this->delete("/dashboard/role/delete/".$role->name);

        $response->assertStatus(302)->assertRedirect(route("login"));
    }

    public function test_role_empty_input_delete(): void
    {
        $user = User::factory()->create();

        $user->roles()->sync([1]);

        $user->save();

        $response = $this->actingAs($user)->delete("/dashboard/role/delete/1000000");

        $response->assertStatus(302)
            ->assertRedirect()
            ->assertSessionHas('error', 'Role not found');
    }
}
