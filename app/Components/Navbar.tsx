"use client";
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, Button } from "@nextui-org/react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from 'next-auth/react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();
  const { data: session } = useSession()
  const { user } = session || {};
  const handleMenuItemClick = (path: string) => {
    setIsMenuOpen(false); // Close menu
    router.push(path); // Navigate to the path
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen} shouldHideOnScroll>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <p className="font-bold text-inherit">Expense Tracker</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/transactions" className="text-foreground">
            All Transactions
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/transactions/new" className="text-foreground">
            New Transaction
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/settings" className="text-foreground">
            Settings
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          {session ? (
            <Button color="primary" variant="flat" onClick={() => signOut()}>
              Sign Out
            </Button>
          ) : (
            <Button color="primary" variant="flat" onClick={() => signIn()}>
              Sign In
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="dark">
        <NavbarItem>
          <Button className="w-full text-foreground hover:text-primary" onClick={() => handleMenuItemClick('/transactions')}>
            All Transactions
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button className="w-full text-foreground hover:text-primary" onClick={() => handleMenuItemClick('/transactions/new')}>
            New Transaction
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button className="w-full text-foreground hover:text-primary" onClick={() => handleMenuItemClick('/settings')}>
            Settings
          </Button>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
}
