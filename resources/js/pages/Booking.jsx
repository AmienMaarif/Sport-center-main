import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import MainLayout from '@/components/MainLayout';

export default function Booking() {
  const { venue, selectedDate, selectedTimes } = usePage().props;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const totalPrice = venue.price * selectedTimes.length;

  const handleSubmit = (e) => {
    e.preventDefault();

    Inertia.post('/booking', {
      venue_id: venue.id,
      name,
      phone,
      date: selectedDate,
      time_slots: selectedTimes,
      total_price: totalPrice,
    });
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Form Booking</h1>

        <div className="mb-6 space-y-2 text-sm text-gray-700">
          <p><strong>Venue:</strong> {venue.name}</p>
          <p><strong>Tanggal:</strong> {selectedDate}</p>
          <p><strong>Jam:</strong> {selectedTimes.join(', ')}</p>
          <p><strong>Total Harga:</strong> Rp. {totalPrice.toLocaleString('id-ID')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Nama Lengkap</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Nomor HP</label>
            <input
              type="tel"
              className="w-full border rounded px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded"
          >
            Konfirmasi Booking
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
