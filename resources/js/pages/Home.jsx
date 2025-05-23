import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import MainLayout from '@/components/MainLayout';
import SearchBar from '@/components/SearchBar';
import VenueCard from '@/components/VenueCard';

export default function Home() {
    const { venues } = usePage().props;
    const [search, setSearch] = useState('');

    const filteredVenues = venues
        .filter((v) => v.name.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 4); // hanya tampilkan 4 rekomendasi

    return (
        <MainLayout>
            {/* Hero / Intro */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">SPORT CENTER</h1>
                    <p className="text-gray-700 mb-4">
                        Platform untuk anda yang membutuhkan reservasi berbagai lapangan olahraga
                    </p>
                    <SearchBar search={search} setSearch={setSearch} onSearchClick={() => {}} />
                </div>
                <div>
                    <img
                        src="/storage/venues/Sport Center.png"
                        alt="Sport Center Banner"
                        className="rounded-md shadow"
                    />
                </div>
            </section>

            <hr className="my-10 border-t border-gray-300" />

            {/* Rekomendasi Venue */}
            <section className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Rekomendasi untuk kamu</h2>
                    <Link href="/venue" className="text-sm text-blue-600 hover:underline">
                        Lihat Semua
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {filteredVenues.length > 0 ? (
                        filteredVenues.map((venue) => (
                            <VenueCard key={venue.id} venue={venue} />
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full text-center">Lapangan tidak ditemukan.</p>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
