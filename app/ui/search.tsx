'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChangeEventHandler } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const searchParamName = 'query';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const handleChange: ChangeEventHandler<HTMLInputElement> =
    useDebouncedCallback((event) => {
      const term = event.target.value;
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      if (term) {
        params.set(searchParamName, term);
      } else {
        params.delete(searchParamName);
      }

      replace(`${pathname}?${params.toString()}`);
    }, 300);

  return (
    <div className='relative flex flex-1 flex-shrink-0'>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <input
        className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
        placeholder={placeholder}
        onChange={handleChange}
        defaultValue={searchParams.get(searchParamName)?.toString()}
      />
      <MagnifyingGlassIcon className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
    </div>
  );
}
