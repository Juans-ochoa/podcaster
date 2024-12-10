"use client";

import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const router = useRef(useRouter());

  const pathname = usePathname();

  const debouncedValue = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedValue) {
      router.current.push(`/discover/?search=${debouncedValue}`);
    } else if (!debouncedValue && pathname === "/discover") {
      router.current.push("/discover");
    }
  }, [debouncedValue, pathname]);

  return (
    <div className="relative mt-8 block">
      <Input
        className="input-class py-6 pl-12 focus-visible:ring-offset-orange-1"
        placeholder="Search for podcasts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onLoad={() => setSearch("")}
      />
      <Image
        src="/icons/search.svg"
        alt="search"
        height={20}
        width={20}
        className="absolute left-4 top-3.5"
      />
    </div>
  );
};

export default SearchBar;
