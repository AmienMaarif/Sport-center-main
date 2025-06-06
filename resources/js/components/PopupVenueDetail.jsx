import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';

export default function PopupVenueDetail({ venue, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [userData, setUserData] = useState({ name: '', phone: '' });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    '07:00-08:00', '08:00-09:00', '09:00-10:00', '10:00-11:00',
    '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00',
    '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00',
    '19:00-20:00', '20:00-21:00', '21:00-22:00', '22:00-23:00'
  ];

  useEffect(() => {
    // Snap Midtrans script
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY);
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const toggleTimeSlot = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]
    );
  };

  const calculateTotal = () => (venue.price || 0) * selectedTimes.length;

  const handleMidtransPay = async () => {
    const newErrors = {};
    if (!userData.name.trim()) newErrors.name = 'Nama wajib diisi';
    if (!userData.phone.trim()) newErrors.phone = 'Nomor telepon wajib diisi';
    if (!paymentMethod) newErrors.payment = 'Pilih metode pembayaran';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/booking/midtrans', {
        venue_id: venue.id,
        date: selectedDate,
        times: selectedTimes,
        name: userData.name,
        phone: userData.phone,
        amount: calculateTotal(),
        payment_method: paymentMethod,
      });

      const { snap_token } = response.data;

      window.snap.pay(snap_token, {
        onSuccess: function (result) {
          alert('Pembayaran berhasil!');
          onClose();
        },
        onPending: function (result) {
          alert('Menunggu pembayaran...');
          onClose();
        },
        onError: function (result) {
          console.error('Payment Error:', result);
          alert('Pembayaran gagal!');
        },
        onClose: function () {
          alert('Kamu menutup popup pembayaran.');
        }
      });

    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-2xl w-full rounded-lg shadow-lg overflow-y-auto max-h-[90vh] p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-black text-xl font-bold"
        >
          &times;
        </button>

        {/* Step 1: Pilih Jam */}
        {step === 1 && (
          <>
            <img
              src={venue.image ? `/storage/${venue.image}` : '/images/default.jpg'}
              alt={venue.name}
              className="w-full h-60 object-cover rounded mb-4"
            />
           <h2 className="text-2xl font-bold mb-2">{venue.name}</h2>
<p className="text-gray-600 mb-1">Lokasi: {venue.location}</p>
<p className="text-gray-600 mb-1">Harga: Rp. {venue.price?.toLocaleString('id-ID')} / jam</p>
<p className="text-gray-600 mb-1">Tipe: {venue.type}</p>
{venue.facilities && venue.facilities.length > 0 && (
  <p className="text-gray-600 mb-4">
    Fasilitas: {Array.isArray(venue.facilities) ? venue.facilities.join(', ') : venue.facilities}
  </p>
)}

            <label className="block mb-2 font-semibold">Tanggal</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedTimes([]);
              }}
              min={new Date().toISOString().split('T')[0]}
              className="border rounded px-3 py-2 w-full mb-4"
            />

            <label className="block mb-2 font-semibold">Pilih Jam</label>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => toggleTimeSlot(time)}
                  className={`py-1 text-sm rounded ${
                    selectedTimes.includes(time)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <span className="font-semibold">Total: Rp. {calculateTotal().toLocaleString('id-ID')}</span>
              <button
                onClick={() => selectedTimes.length > 0 && setStep(2)}
                className={`px-4 py-2 rounded ${
                  selectedTimes.length > 0
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
                disabled={selectedTimes.length === 0}
              >
                Lanjutkan
              </button>
            </div>
          </>
        )}

        {/* Step 2: Isi Data & Bayar */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-4">Isi Data & Pembayaran</h2>

            <div className="bg-gray-100 rounded-lg p-4 mb-6 text-sm space-y-2">
              <DetailRow label="Lapangan" value={venue.name} />
              <DetailRow label="Tanggal" value={selectedDate} />
              <DetailRow label="Jam" value={selectedTimes.join(', ')} />
              <DetailRow label="Total Harga" value={`Rp. ${calculateTotal().toLocaleString('id-ID')}`} />
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Nama Lengkap</label>
                <input
                  type="text"
                  className={`w-full border rounded px-3 py-2 ${errors.name ? 'border-red-500' : ''}`}
                  value={userData.name}
                  onChange={(e) => {
                    setUserData({ ...userData, name: e.target.value });
                    setErrors((prev) => ({ ...prev, name: null }));
                  }}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Nomor Telepon</label>
                <input
                  type="text"
                  className={`w-full border rounded px-3 py-2 ${errors.phone ? 'border-red-500' : ''}`}
                  value={userData.phone}
                  onChange={(e) => {
                    setUserData({ ...userData, phone: e.target.value });
                    setErrors((prev) => ({ ...prev, phone: null }));
                  }}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Metode Pembayaran</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="midtrans"
                      checked={paymentMethod === 'midtrans'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>Bayar Online (QRIS / Bank Transfer / E-Wallet)</span>
                  </label>
                </div>
                {errors.payment && <p className="text-red-500 text-sm">{errors.payment}</p>}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(1)} className="px-4 py-2 border rounded">Kembali</button>
              <button
                onClick={handleMidtransPay}
                disabled={isSubmitting}
                className={`px-4 py-2 rounded text-white ${isSubmitting ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
              >
                {isSubmitting ? 'Memproses...' : 'Bayar Sekarang'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const DetailRow = ({ label, value }) => (
  <div className="flex items-start">
    <span className="w-32 font-medium text-gray-600">{label}</span>
    <span className="text-gray-800">: {value}</span>
  </div>
);
