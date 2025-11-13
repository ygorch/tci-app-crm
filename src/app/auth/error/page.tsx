import { Suspense } from 'react';
import AuthErrorClient from './AuthErrorClient';
import Loading from '../loading';

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthErrorClient />
    </Suspense>
  );
}
