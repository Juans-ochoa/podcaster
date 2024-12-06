import { cn } from "@/lib/utils";
import Link from "next/link";

interface PropsHeader {
  headerTitle: string;
  titleClassName?: string;
}

const Header = ({ headerTitle, titleClassName }: PropsHeader) => {
  return (
    <header className="flex items-center justify-between">
      {headerTitle && (
        <h2 className={cn("text-18 font-bold text-white-1", titleClassName)}>
          {headerTitle}
        </h2>
      )}
      <Link href="/discover" className="text-16 font-semibold text-orange-1">
        See all
      </Link>
    </header>
  );
};

export default Header;
