<?php
use App\Listing;

Route::get('/', function () {
    return view('app');
});

// Route::get('listing/{listing}', function(Listing $listing){
//     $model = $listing->toArray();
//     return view('app', ['model'=>$model]);
// });

Route::get('/listing/{listing}', 'ListingController@get_listing_web');
