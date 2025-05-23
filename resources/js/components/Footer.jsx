import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Kontak</h3>
                        <div className="space-y-2">
                            <div className="flex items-start">
                                <svg className="h-6 w-6 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p className="text-gray-600">
                                    Jl. Inspeksi Kalimalang, Tegal Danas<br />
                                    Cikarang Pusat, Bekasi, Jawa Barat<br />
                                    17530
                                </p>
                            </div>
                            <div className="flex items-center">
                                <svg className="h-6 w-6 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <p className="text-gray-600">+62 812-3456-7890</p>
                            </div>
                            <div className="flex items-center">
                                <svg className="h-6 w-6 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <p className="text-gray-600">sportcenterID@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="h-64 md:h-full min-h-[300px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2834772147584!2d107.17742631476885!3d-6.221436995493974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698c1a8fcd6325%3A0x4e1c05c11b1b0051!2sJl.%20Inspeksi%20Kalimalang%2C%20Tegal%20Danas%2C%20Kec.%20Cikarang%20Pusat%2C%20Kabupaten%20Bekasi%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1650942358974!5m2!1sid!2sid"
                            className="w-full h-full rounded-lg"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-center text-gray-600">
                        © {new Date().getFullYear()} Sport Center. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 