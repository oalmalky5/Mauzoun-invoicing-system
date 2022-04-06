<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Invoice;
use App\Models\User;
use Carbon\Carbon;
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
        $Invoices = Invoice::query();
        $data['quick_stats']['alltime_invoices_count'] = $Invoices->count();
        $data['quick_stats']['alltime_invoices_amount'] = $Invoices->sum('total');
        $data['quick_stats']['weekly_invoices_count'] = $Invoices->whereDate('date', '>=', Carbon::today()->subDays(7))->count();
        $data['quick_stats']['weekly_invoices_amount'] = $Invoices->whereDate('date', '>=', Carbon::today()->subDays(7))->sum('total');
        $data['quick_stats']['monthly_invoices_count'] = $Invoices->whereDate('date', '>=', Carbon::today()->subDays(30))->count();
        $data['quick_stats']['monthly_invoices_amount'] = $Invoices->whereDate('date', '>=', Carbon::today()->subDays(30))->sum('total');
        $data['quick_stats']['yesterday_invoices_count'] = $Invoices->whereDate('date', '>=', Carbon::today()->subDays(1))->count();
        $data['quick_stats']['yesterday_invoices_amount'] = $Invoices->whereDate('date', '>=', Carbon::today()->subDays(1))->sum('total');
        $data['quick_stats']['today_invoices_count'] = $Invoices->whereDate('date', '=', Carbon::now())->count();
        $data['quick_stats']['today_invoices_amount'] = $Invoices->whereDate('date', '=', Carbon::now())->sum('total');
        return response()->json([
            'status' => true,
            'data' => $data
        ]);
    }

}
