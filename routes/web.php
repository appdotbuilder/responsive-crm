<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    // Redirect authenticated users to contacts
    if (auth()->check()) {
        return redirect()->route('contacts.index');
    }
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Contact management routes
    Route::resource('contacts', ContactController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
