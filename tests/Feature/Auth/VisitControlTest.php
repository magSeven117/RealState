<?php

namespace Tests\Feature;

use App\Models\House;
use App\Models\User;
use App\Models\Visit;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class VisitControlTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_visit_screen_can_be_rendered(): void
    {
        $user = User::factory()->create();

        $user->roles()->sync([1]);

        $user->save();

        $response = $this->actingAs($user)->get(route("visit"));

        $response->assertStatus(200);
    }

    public function test_visit_screen_unauthenticated_rendered(): void
    {
        $response = $this->get(route("visit"));

        $response->assertStatus(302)->assertRedirect(route("login"));
    }

    public function test_visit_can_be_created(): void
    {
        $query = House::first();
            
        $response = $this->post("/visit/".$query->id,[
            'name' => 'test', 
            'last_name' => 'test', 
            'email' => 'test@testing.com', 
            'phone' => '0987654321', 
            'term' => true, 
            'calendar' => now()->addDays(120)->toDateString(),
        ]);

        $response->assertStatus(302)->assertRedirect('/visit/'.$query->id);

        $this->assertDatabaseHas('visits', [
            'email' => 'test@testing.com', 
        ]);
    }

    public function test_visit_empty_input_created(): void
    {
        $query = House::find(5);

        $response = $this->post("/visit/".$query->id,[
            'name' => '', 
            'last_name' => '', 
            'email' => '', 
            'phone' => '', 
            'term' => false, 
            'calendar' => null,
        ]);

        $response->assertStatus(302)->assertInvalid([
            'name',              
            'last_name',      
            'email',             
            'phone',              
            'term',
            'calendar',         
        ]);
    }

    public function test_visit_can_be_deleted(): void
    {
        $user = User::factory()->create();

        $user->roles()->sync([1]);

        $user->save();

        $query = Visit::first();

        $response = $this->actingAs($user)->post("/dashboard/visit/delete/".$query->id);

        $response->assertStatus(302)->assertRedirect(route("visit"));
    }

    public function test_visit_unauthenticated_deleted(): void
    {
        $query = Visit::first();

        $response = $this->post("/dashboard/visit/delete/".$query->id);

        $response->assertStatus(302)->assertRedirect(route("login"));
    }

    public function test_visit_id_not_exist_deleted(): void
    {
        $user = User::factory()->create();

        $user->roles()->sync([1]);

        $user->save();

        $response = $this->actingAs($user)->post("/dashboard/visit/delete/999999999");

        $response->assertStatus(302)
            ->assertRedirect(route("visit"));
    }

    public function test_visit_can_be_mark_pending(): void
    {
        $user = User::factory()->create();

        $user->roles()->sync([1]);

        $user->save();

        $query = Visit::where("pending_visit", false)->first();

        $response = $this->actingAs($user)->post("/dashboard/visit/pending/".$query->id."/".$user->id);

        $response->assertStatus(302)->assertRedirect(route("visit"));

        $this->assertDatabaseHas('visits', [
            'id' => $query->id,
            'user_id' => $user->id
        ]);
    }

    public function test_visit_unauthenticated_mark_pending(): void
    {
        $query = Visit::where("pending_visit", false)->first();

        $response = $this->post("/dashboard/visit/pending/".$query->id."/1");

        $response->assertStatus(302)->assertRedirect(route("login"));
    }

    public function test_visit_id_not_exist_mark_pending(): void
    {
        $user = User::factory()->create();

        $user->roles()->sync([1]);

        $user->save();

        $response = $this->actingAs($user)->post("/dashboard/visit/pending/99999/99999");

        $response->assertStatus(302)->assertRedirect(route("visit"));
    }

    public function test_visit_can_be_mark_visited(): void
    {
        $user = User::factory()->create();

        $user->roles()->sync([1]);

        $user->save();

        $query = Visit::where("pending_visit", false)->first();

        $response = $this->actingAs($user)->post("/dashboard/visit/visited/".$query->id);

        $response->assertStatus(302)->assertRedirect(route("visit.pending"));

        $this->assertDatabaseMissing('visits', [
            'id' => $query->id,
            'visited_date' => null
        ]);
    }

    public function test_visit_unauthenticated_mark_visited(): void
    {
        $query = Visit::where("pending_visit", false)->first();

        $response = $this->post("/dashboard/visit/visited/".$query->id);

        $response->assertStatus(302)->assertRedirect(route("login"));
    }

    public function test_visit_id_not_exist_mark_visited(): void
    {
        $user = User::factory()->create();

        $user->roles()->sync([1]);

        $user->save();

        $response = $this->actingAs($user)->post("/dashboard/visit/visited/99999");

        $response->assertStatus(302)->assertRedirect(route("visit.pending"));
    }
}