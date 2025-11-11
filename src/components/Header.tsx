import SignOutButton from '@/components/SignOutButton';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold text-gray-800">Coffee CRM</h1>
        </Link>
        <SignOutButton />
      </div>
    </header>
  );
}
