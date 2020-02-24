<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Listing;

class ListingController extends Controller
{

    private function add_image_urls($model, $id)
    {
        // menambahkan data array ke $model atau data listing (id,title,address, etc)
        // example : "image_1" => "http://127.0.0.1:8000/images/1/Image_1.jpg"
        for($i = 1; $i <=4; $i++) {
            $model['image_'.$i] = asset( 'images/'.$id.'/Image_'.$i.'.jpg' );
        }
        return $model;
    }

    private function get_listing($listing)
    {
        $model = $listing->toArray();
        for($i = 1; $i <=4; $i++) {
            $model['image_' . $i] = asset(
                'images/' . $listing->id . '/Image_' . $i . '.jpg'
            );
        }
        return collect(['listing' => $model]);
    }

    public function get_listing_api(Listing $listing){
        $data = $this->get_listing($listing);
        return response()->json($data);
    }

    // cara pertama kita ambil id url ($listing) 
    // dan cari data listing
    // public function get_listing_web($id='1'){
    //     $listing    = Listing::findOrFail($id);
    //     $model      = $listing->toArray();
    //     $model      = $this->add_image_urls($model, $listing->id);
    //     return view('app', ['data' => $model]);
    // }
    
    // cara kedua tidak ambil id, 
    // perncarian data listing langsung di lakukan ORM
    // data ditampung dalam parameter (Listing $listing)
    public function get_listing_web(Listing $listing, Request $request){
        // $model      = $listing->toArray();
        // $model      = $this->add_image_urls($model, $listing->id);
        $data = $this->get_listing($listing);
        $data = $this->add_meta_data($data, $request);
        return view('app', ['data' => $data]);
    }


    private function get_listing_summaries(){
        $collection     = Listing::all([
            'id', 'address', 'title', 'price_per_night' 
        ]);
        $collection->transform(function($listing){
            $listing->thumb = asset('images/'.$listing->id.'/Image_1_thumb.jpg');
            return $listing;
        });
        $data = collect(['listings'=> $collection->toArray()]);
        // $data = $this->add_meta_data($data, $request);
        // return view('app', ['data' => $data]);
    }

    public function get_home_web(Request $request){
        $data = $this->get_listing_summaries();
        $data = $this->add_meta_data($data, $request);
        return view('app', ['data' => $data]);
    }

    private function add_meta_data($collection, $request)
    {
        return $collection->merge([
            'path' => $request->getPathInfo()
        ]);
    }

    public function get_home_api(){
        $data = $this->get_listing_summaries();
        return response()->json($data);
    }

}
