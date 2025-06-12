<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Midtrans\Snap;
use Midtrans\Config;
use App\Models\Transaction; // pastikan model ada
use Illuminate\Support\Facades\Log;

class TransactionController extends Controller
{
    public function createMidtrans(Request $request)
    {
        try {
            Config::$serverKey = env('MIDTRANS_SERVER_KEY');
            Config::$isProduction = false;
            Config::$isSanitized = true;
            Config::$is3ds = true;

            $orderId = 'ORDER-' . time();

            // Simpan transaksi ke DB (optional dulu)
            Transaction::create([
                'venue_id' => $request->venue_id,
                'date' => $request->date,
                'times' => implode(',', $request->times),
                'name' => $request->name,
                'phone' => $request->phone,
                'amount' => (int) $request->amount,
                'order_id' => $orderId,
                'payment_method' => $request->payment_method,
                'payment_status' => 'pending',
                'admin_status' => 'waiting',
            ]);

            $params = [
                'transaction_details' => [
                    'order_id' => $orderId,
                    'gross_amount' => (int) $request->amount,
                ],
                'customer_details' => [
                    'first_name' => $request->name,
                    'phone' => $request->phone,
                ],
            ];

            $snapToken = Snap::getSnapToken($params);
            return response()->json(['snap_token' => $snapToken]);
        } catch (\Exception $e) {
            Log::error('Midtrans Error: ' . $e->getMessage());
            return response()->json(['error' => 'Midtrans gagal'], 500);
        }
    }
}
