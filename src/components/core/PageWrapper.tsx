import { ReactNode } from "react";

export function PageWrapper({children}: {children: ReactNode}) {
  return <div className="flex flex-1 flex-col gap-4 p-4 pt-0 w-full overflow-x-hidden">{children}</div>;
}
