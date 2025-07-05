import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconHome,
  IconLogout,
  IconRocket,
  IconTerminal2,
  IconNewSection,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { signOut } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/",
    },
    {
      title: "Profile",
      icon: <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/Profile",
    },
    {
      title: "Vortex",
      icon: <IconUsers className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/vortex",
    },
    {
      title: "Startups",
      icon: <IconRocket className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/startups",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "https://github.com/mohakchakraborty2004/Catalyst",
    },
  ];

  return (
    <html lang="en">
      <body className="relative pb-20"> {/* give padding bottom for dock spacing */}
        {children}

        {/* Dock fixed at bottom */}
        <div className="fixed bottom-4 w-full z-50 flex items-center justify-center">
          <FloatingDock
            mobileClassName="translate-y-20"
            items={links}
          />
        </div>
      </body>
    </html>
  );
}
