"use client";
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, Button } from "@heroui/react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from 'next-auth/react';
import { LogIn } from "react-feather";

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
    <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
            <p className="font-bold text-inherit cursor-pointer" onClick={() => handleMenuItemClick('/')}>Expense Tracker</p>
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
            <Button variant="bordered" color="primary" onClick={() => signOut()}>
              Sign Out <span className="block md:hidden"><LogIn/></span>
            </Button>
          ) : (
            <Button variant="bordered" color="primary" onClick={() => signIn()}>
              Sign In 
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="dark justify-center">
        <NavbarItem>
          {/* <Button variant="bordered" className="w-full text-foreground hover:text-primary" onClick={() => handleMenuItemClick('/transactions')}>
            All Transactions
          </Button> */}
          <h1 onClick={() => handleMenuItemClick('/transactions')} className="w-full text-foreground hover:text-primary text-2xl">
            All Transactions
          </h1>
        </NavbarItem>
        <NavbarItem>
          {/* <Button variant="bordered" className="w-full text-foreground hover:text-primary" onClick={() => handleMenuItemClick('/transactions/new')}>
            New Transaction
          </Button> */}

          <h1 onClick={() => handleMenuItemClick('/transactions/new')} className="w-full text-foreground hover:text-primary  text-2xl">
            New Transactions
          </h1>
        </NavbarItem>
        <NavbarItem>
          {/* <Button variant="bordered" className="w-full text-foreground hover:text-primary" onClick={() => handleMenuItemClick('/settings')}>
            Settings
          </Button> */}
          <h1 onClick={() => handleMenuItemClick('/settings')} className="w-full text-foreground hover:text-primary text-2xl">
           Settings
          </h1>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
}
