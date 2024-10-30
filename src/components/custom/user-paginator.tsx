"use client"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export const UserPaginator = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [prevUrl, setPrevUrl] = useState<string>('');
  const [nextUrl, setNextUrl] = useState<string>('');

  useEffect(() => {
    const currentPage = parseInt(searchParams.get('page') || '1');
    
    // Create new URLSearchParams instance for manipulation
    const createNewParams = () => new URLSearchParams(searchParams.toString());

    // Calculate previous page URL
    if (currentPage > 1) {
      const prevParams = createNewParams();
      prevParams.set('page', (currentPage - 1).toString());
      setPrevUrl(`${pathname}?${prevParams.toString()}`);
    } else {
      setPrevUrl('');
    }

    // Calculate next page URL
    const nextParams = createNewParams();
    nextParams.set('page', (currentPage + 1).toString());
    setNextUrl(`${pathname}?${nextParams.toString()}`);
  }, [searchParams, pathname]);

  const handleNavigation = (url: string) => {
    if (url) {
      router.push(url);
    }
  };

  return <Pagination className="mt-4">
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious 
          href={prevUrl}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation(prevUrl);
          }}
          aria-disabled={!prevUrl}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext 
          href={nextUrl}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation(nextUrl);
          }}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
}