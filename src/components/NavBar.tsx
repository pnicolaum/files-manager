'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem =
  | { label: string; href: string }
  | { divider: true }

const navItems: NavItem[] = [
  { label: 'PDF Splitter', href: '/pdf-splitter' },
  { label: 'PDF Binder', href: '/pdf-binder' },
  { divider: true },
  { label: 'PDF to JPG', href: '/pdf-to-jpg' },
  { label: 'JPG to PDF', href: '/jpg-to-pdf' },
  { divider: true },
  { label: 'JPG to PNG', href: '/jpg-to-png' },
  { label: 'PNG to JPG', href: '/png-to-jpg' },
]

const NavMenu = () => {
  const pathname = usePathname()

  return (
    <nav className='flex flex-col items-center mt-5'>
        <h1 className='text-4xl'><Link
                href="/"> Files manager</Link></h1>
        <ul className="flex flex-wrap items-center gap-4 m-10 text-m font-medium text-gray-600">
        {navItems.map((item, index) =>
            'divider' in item ? (
            <span key={index} className="h-4 border-l border-gray-300 mx-2" />
            ) : (
            <li key={item.href}>
                <Link
                href={item.href}
                className={`px-2 py-1 rounded-md transition-colors duration-200 ${
                    pathname === item.href
                    ? 'bg-blue-100 text-blue-600 font-semibold'
                    : 'hover:bg-gray-100'
                }`}
                >
                {item.label}
                </Link>
            </li>
            )
        )}
        </ul>
    </nav>
  )
}

export default NavMenu
