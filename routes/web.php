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
    Route::inertia('/inventory', 'inventory/index')->name('inventory.index');
    Route::inertia('/delivery', 'delivery/index')->name('delivery.index');
    Route::inertia('/expenses', 'expenses/index')->name('expenses.index');
    Route::inertia('/employees', 'employees/index')->name('employees.index');

    // Newly Added Modules
    Route::inertia('/accounting', 'accounting/index')->name('accounting.index');
    Route::inertia('/support', 'support/index')->name('support.index');
    Route::inertia('/settings', 'settings/index')->name('settings.index');
    Route::inertia('/partners', 'partners/index')->name('partners.index');
    Route::inertia('/premium', 'premium/index')->name('premium.index');
    Route::inertia('/account', 'account/index')->name('account.index');
    Route::inertia('/calendar', 'calendar/index')->name('calendar.index');
    Route::inertia('/calculator', 'calculator/index')->name('calculator.index');
    Route::inertia('/notes', 'notes/index')->name('notes.index');
});

