<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\VenueController;
use App\Http\Controllers\BookingController;
use App\Models\Venue;
use Illuminate\Http\Request;

// =================== PUBLIC ROUTES =================== //

// Halaman Utama
Route::get('/', function () {
    $venues = Venue::all();
    return Inertia::render('Home', [
        'venues' => $venues
    ]);
})->name('home');

// Halaman Daftar Venue
Route::get('/venue', [VenueController::class, 'index'])->name('venue');

// Detail Venue
Route::get('/venue/{id}', [VenueController::class, 'show'])->name('venue.detail');

// Halaman Booking (tampil form setelah klik "Pesan Sekarang")
Route::get('/booking', function (Request $request) {
    if (!$request->has(['venue_id', 'date', 'times'])) {
        return Inertia::render('Booking', [
            'bookings' => [],
            'error' => 'Data booking tidak lengkap'
        ]);
    }

    $venue = Venue::findOrFail($request->venue_id);
    return Inertia::render('Booking', [
        'venue' => $venue,
        'selectedDate' => $request->date,
        'selectedTimes' => explode(',', $request->times)
    ]);
})->name('booking.form');

// Simpan Booking dari Form (POST)
Route::post('/booking', [BookingController::class, 'store'])->name('booking.store');

// Cari booking berdasarkan kode (opsional)
Route::get('/booking-code', [BookingController::class, 'showByCode'])->name('booking.code');

// Halaman lain
Route::get('/contact', fn() => Inertia::render('Contact'))->name('contact');
Route::get('/login', fn() => Inertia::render('Login'))->name('login');


// =================== ADMIN ROUTES (Hanya Jika Login) =================== //
Route::middleware(['auth'])->group(function () {
    Route::get('/admin/dashboard', fn() => Inertia::render('pages/Dashboard'))->name('admin.dashboard');
    Route::get('/admin/bookings', [BookingController::class, 'index'])->name('admin.booking');
});
