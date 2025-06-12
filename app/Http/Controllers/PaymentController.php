<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Helpers\MidtransConfig;
use Midtrans\Snap;

class PaymentController extends Controller
{
    public function getSnapToken(Request $request)
    {
        // Validasi input booking_code
        $request->validate([
            'booking_code' => 'required|string|exists:transactions,booking_code',
        ]);

        $bookingCode = $request->booking_code;

        // Cari data transaksi
        $transaction = Transaction::where('booking_code', $bookingCode)->firstOrFail();

        // Setup Midtrans
        MidtransConfig::set();

        // Buat parameter Snap
        $params = [
            'transaction_details' => [
                'order_id' => $transaction->booking_code,
                'gross_amount' => $transaction->total_price,
            ],
            'customer_details' => [
                'first_name' => $transaction->name,
                'phone' => $transaction->phone,
            ],
        ];

        // Generate Snap Token
        $snapToken = Snap::getSnapToken($params);

        return response()->json([
            'snapToken' => $snapToken,
        ]);
    }
}
