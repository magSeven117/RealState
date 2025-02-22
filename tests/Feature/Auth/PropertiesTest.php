<?php

namespace Tests\Feature;

use App\Models\House;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PropertiesTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_properties_screen_can_be_rendered(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route("properties"));

        $response->assertStatus(200);
    }

    public function test_properties_screen_unauthenticated_rendered(): void
    {
        $response = $this->get(route("properties"));

        $response->assertStatus(302)->assertRedirect(route("login"));
    }

    public function test_property_create_screen_can_be_rendered(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get("/dashboard/property/create");

        $response->assertStatus(200);
    }

    public function test_property_create_screen_unauthenticated_rendered(): void
    {
        $response = $this->get("/dashboard/property/create");

        $response->assertStatus(302)->assertRedirect(route("login"));
    }

    public function test_property_update_screen_can_be_rendered(): void
    {
        $user = User::factory()->create();

        $house = House::first();

        $response = $this->actingAs($user)->get("/dashboard/property/update/".$house->id);

        $response->assertStatus(200);
    }

    public function test_property_update_screen_unauthenticated_rendered(): void
    {
        $house = House::first();

        $response = $this->get("/dashboard/property/update/".$house->id);

        $response->assertStatus(302)->assertRedirect(route("login"));
    }

    public function test_property_unauthenticated_created(): void
    {
        $response = $this->post("/dashboard/property/create/",[
            'address' => 'test address',              
            'description' => 'test description',      
            'bathroom' => 2,             
            'date_construction' => now()->subYear(),
            'feature' => [1, 2],                 
            'floor' => 2,                          
            'images' => "image", 
            'price' => 20000,                 
            'quarters' => 2,              
            'type_house' => "house"
        ]);

        $response->assertStatus(302)->assertRedirect(route("login"));
    }

    public function test_property_empty_input_created(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post("/dashboard/property/create/",[
            'address' => '',              
            'description' => '',      
            'bathroom' => '',             
            'date_construction' => '',
            'feature' => '',                 
            'floor' => '',
            'price' => '',                 
            'quarters' => '',              
            'type_house' => ""
        ]);

        $response->assertStatus(302)->assertInvalid([
            'address',              
            'description',      
            'bathroom',             
            'date_construction',
            'feature',                 
            'floor', 
            'price',                 
            'quarters',              
            'type_house'          
        ]);
    }

    public function test_property_unauthenticated_updated(): void
    {
        $query = House::find(5);

        $response = $this->post("/dashboard/property/update/".$query->id,[
            'address' => '',              
            'description' => '',      
            'bathroom' => '',             
            'date_construction' => '',
            'feature' => '',                 
            'floor' => '',                          
            'images' => "", 
            'price' => '',                 
            'quarters' => '',              
            'type_house' => ""
        ]);

        $response->assertStatus(302)->assertRedirect(route("login"));
    }

    public function test_property_empty_input_updated(): void
    {
        $user = User::factory()->create();

        $query = House::find(5);

        $response = $this->actingAs($user)->post("/dashboard/property/update/".$query->id,[
            'address' => '',              
            'description' => '',      
            'bathroom' => '',             
            'date_construction' => '',             
            'floor' => '',
            'price' => '',                 
            'quarters' => '',              
            'type_house' => ""
        ]);

        $response->assertStatus(302)->assertInvalid([
            'address',              
            'description',      
            'bathroom',             
            'date_construction',              
            'floor',
            'price',                 
            'quarters',              
            'type_house'          
        ]);
    }
}