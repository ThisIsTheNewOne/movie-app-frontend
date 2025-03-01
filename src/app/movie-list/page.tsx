"use client";

import { usePathname } from 'next/navigation';

export default function Page() {
    const pathname = usePathname();

    
    return <div>
        <p>Movie list Page</p>
        <div>{pathname}</div>
    </div>;
  }