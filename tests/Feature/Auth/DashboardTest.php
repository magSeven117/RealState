<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashBoardTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_dashboard_screen_can_be_rendered(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route("dashboard"));

        $response->assertStatus(200);
    }

    public function test_dashboard_screen_unauthenticated_rendered(): void
    {
        $response = $this->get(route("dashboard"));

        $response->assertStatus(302)->assertRedirect(route("login"));
    }
}
