<?php

namespace Tests\Feature;

use App\Models\House;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RenderTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    /**
     * Test for rendering Home 
     */
    public function test_render_home_screen_can_be_rendered(): void
    {
        $response = $this->get(route("home"));

        $response->assertStatus(200);
    }

    /**
     * Test for rendering Properties 
     */
    public function test_render_properties_screen_can_be_rendered(): void
    {
        $response = $this->get("/properties");

        $response->assertStatus(200);
    }

    public function test_render_contact_screen_can_be_rendered(): void
    {
        $response = $this->get("/contact");

        $response->assertStatus(200);
    }

    public function test_render_visit_screen_can_be_rendered(): void
    {
        $house = House::published(true)->first();

        $response = $this->get("/visit/".$house->id);

        $response->assertStatus(200);
    }
}
