import { useEffect } from 'react';
import { useRouter } from 'next/router';

type Props = {
  toUrl: string;
  condition: boolean;
};

export default function useRedirect({ toUrl, condition }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (condition && router.pathname !== toUrl)
      router.replace(toUrl, undefined, { shallow: true });
  }, [condition, toUrl, router]);
}
