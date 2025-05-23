import React from 'react';
import { Link } from '@inertiajs/react';

const VenueCard = ({ venue }) => {
    const imageUrl = venue.image
        ? `/storage/${venue.image}`
        : '/images/default.jpg';

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
                src={imageUrl}
                alt={venue.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{venue.name}</h3>
                <p className="text-gray-600 mb-4">Mulai dari {venue.price}</p>
                <Link
                    href={`/venue/${venue.id}`}
                    className="block w-full text-center py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                    Pesan
                </Link>
            </div>
        </div>
    );
};

export default VenueCard;
