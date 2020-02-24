<?php
// use App\Listing;

Route::get('/home', 'ListingController@get_home_web');

Route::get('/', function () {
   return redirect('/home');
});

// Route::get('listing/{listing}', function(Listing $listing){
//     $model = $listing->toArray();
//     return view('app', ['model'=>$model]);
// });

Route::get('/listing/{listing?}', 'ListingController@get_listing_web');
