import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import MainLayout from '@/components/MainLayout';
import SearchBar from '@/components/SearchBar';
import VenueCard from '@/components/VenueCard';

export default function Venue() {
    const { venues } = usePage().props;
    const [search, setSearch] = useState('');

    const filteredVenues = venues.filter((venue) =>
        venue.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <MainLayout>
            <div className="px-6 py-8">
                <h1 className="text-2xl text-center font-bold mb-6">Daftar Lapangan</h1>

                <div className="mb-6 flex justify-center">
                    <SearchBar
                        search={search}
                        setSearch={setSearch}
                        onSearchClick={() => {}}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredVenues.length > 0 ? (
                        filteredVenues.map((venue) => (
                            <VenueCard key={venue.id} venue={venue} />
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full text-center">Lapangan tidak ditemukan.</p>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
