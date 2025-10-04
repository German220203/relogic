'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {

    return(
        <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
            <Image
                src="/LOGO_blanco-removebg-preview.png"
                alt="Logo Relogic"
                width={120}
                height={120}
            />
            <p className="mt-4 md:mt-0">© {new Date().getFullYear()} Relogic</p>
            <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#"><span>Twitter</span></Link>
            <Link href="#"><span>Facebook</span></Link>
            <Link href="#"><span>Instagram</span></Link>
            </div>
        </div>
        </footer>
    )
}