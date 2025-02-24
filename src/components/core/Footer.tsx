import { Github } from "lucide-react";
import { Separator } from "../ui/separator";

const navigation = [
  {
    name: "Facebook",
    href: "https://github.com/cavadosi",
    icon: Github,
  },
];

export default function Footer() {
  return (
    < div className="">
      <Separator />
      <footer className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center gap-x-6 md:order-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-300"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-center text-sm/6 text-gray-400 md:order-1 md:mt-0">
            &copy; 2025 Cavadosi. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
