/**
 * Shared Footer Links Component
 * Eliminates duplication of footer links across pages
 */

import Link from 'next/link';
import { FOOTER_LINKS } from '@/lib/constants';

/**
 * Reusable footer policy links grid
 */
export function FooterLinks() {
    const allLinks = [...FOOTER_LINKS.POLICIES, ...FOOTER_LINKS.SUPPORT];

    return (
        <div className="grid grid-cols-2 gap-3 text-sm">
            {allLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-600 hover:text-red-600 transition-colors"
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
}
