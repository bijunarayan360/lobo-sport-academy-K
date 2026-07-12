import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Lobo Sport Academy
        </h1>
        <p className="max-w-2xl text-lg text-gray-600">
          Professional sports training management system. Track students, manage programs,
          handle payments, and monitor performance all in one place.
        </p>
        <div className="flex gap-4">
          <Link href="/auth/signin">
            <Button size="lg">Sign In</Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="outline" size="lg">Register</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
