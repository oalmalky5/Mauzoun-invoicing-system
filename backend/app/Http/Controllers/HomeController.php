<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Invoice;
use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $data['customers'] = Customer::count();
        $data['users'] = User::count();
        $data['invoices'] = Invoice::count();
        $data['invoices_amount'] = Invoice::sum('total');
        $data['top_customers'] = Customer::withCount('invoices')->withSum('invoices', 'total')->orderBy('invoices_sum_total', 'DESC')->limit(5)->get();
        return response()->json([
            'status' => true,
            'data' => $data
        ]);
    }

}
