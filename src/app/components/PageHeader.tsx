import { LucideIcon } from "lucide-react";
import Link from "next/link";

export default function PageHeader({
  Title,
  Subtitle,
  cta
}: {
  Title: string;
  Subtitle: string;
  cta?: {
    label: string;
    href: string;
    Icon?: LucideIcon;
  };
}) {
  return (
    <div className="flex w-full justify-between py-3 px-6 bg-bgPrimary border border-border sticky top-[21px] rounded-2xl">
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold">{Title}</h1>
        <p className="text-base scale-[90%] origin-left">{Subtitle}</p>
      </div>
      {cta && (
        <Link
          className="border border-border bg-primary text-txt flex items-center justify-center px-4 py-2 rounded-2xl"
          href={cta.href}
        >
          <span>{cta.label}</span>
          {cta.Icon && (
            <span className="ml-4">
              <cta.Icon />
            </span>
          )}
        </Link>
      )}
    </div>
  );
}
