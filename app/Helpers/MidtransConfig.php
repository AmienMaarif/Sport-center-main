<?php

namespace App\Helpers;

use Midtrans\Config;

class MidtransConfig
{
    public static function set()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production', false);
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }
}
