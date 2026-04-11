<?php

use App\Http\Controllers\DeviceController;
use Illuminate\Support\Facades\Route;

// v1 API
Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('/v1/devices', DeviceController::class);
});
