import { Suspense } from 'react';
import ActionCompletedClient from './ActionCompletedClient';
import Loading from '../loading';

export default function ActionCompletedPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ActionCompletedClient />
    </Suspense>
  );
}
