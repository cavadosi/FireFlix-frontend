import { ReactNode } from "react";

export function PageWrapper({children}: {children: ReactNode}) {
  return <div className="flex flex-1 flex-col gap-4 px-4 w-full">{children}</div>;
}
