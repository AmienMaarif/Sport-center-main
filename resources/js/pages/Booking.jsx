import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import MainLayout from '@/components/MainLayout'; // sesuaikan dengan layout kamu
import { usePage } from '@inertiajs/react';

export default function Booking() {
  const [searchCode, setSearchCode] = useState('');
  const { booking } = usePage().props; // data dari backend (jika ada)

  const handleSearch = () => {
    if (!searchCode) return;
    Inertia.visit(`/booking?code=${searchCode}`);
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto py-10 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Cek Status Booking</h1>

        {/* Form Pencarian */}
        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Masukkan Kode Booking Anda"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            className="flex-1 border rounded px-4 py-2"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Cari
          </button>
        </div>

        {/* Jika ditemukan */}
        {booking ? (
          <div className="bg-white shadow-md p-4 rounded border">
            <h2 className="text-lg font-semibold mb-2">Detail Booking</h2>
            <p><strong>Kode Booking:</strong> {booking.code}</p>
            <p><strong>Nama:</strong> {booking.customer_name}</p>
            <p><strong>Venue:</strong> {booking.venue_name}</p>
            <p><strong>Tanggal:</strong> {booking.date}</p>
            <p><strong>Jam:</strong> {booking.time}</p>
            <p><strong>Status:</strong> <span className={`font-bold ${booking.status === 'lunas' ? 'text-green-600' : 'text-yellow-600'}`}>{booking.status}</span></p>

            {booking.status === 'lunas' && (
              <div className="mt-4">
                <a href={`/download-tiket/${booking.code}`} className="text-blue-500 underline">
                  Unduh Tiket (PDF)
                </a>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 italic">Silakan masukkan kode booking untuk melihat status.</p>
        )}
      </div>
    </MainLayout>
  );
}
