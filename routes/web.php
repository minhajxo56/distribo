<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Main Dashboard
    Route::inertia('/dashboard', 'dashboard')->name('dashboard');

    // Primary Modules (Index Pages)
    Route::inertia('/orders', 'orders/index')->name('orders.index');
    Route::inertia('/sales', 'sales/index')->name('sales.index');
    Route::inertia('/inventory', 'inventory/index')->name('inventory.index'); // Labeled as "Stock" in UI
    Route::inertia('/delivery', 'delivery/index')->name('delivery.index');
    Route::inertia('/expenses', 'expenses/index')->name('expenses.index');
    Route::inertia('/employees', 'employees/index')->name('employees.index');
});

require __DIR__.'/settings.php';