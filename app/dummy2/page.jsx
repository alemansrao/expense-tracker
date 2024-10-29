"use client"
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
const page = () => {
    const { data: session } = useSession();
    const { user } = session || {};
    return user?.image ? (
        <Image src={user.image} alt="User Image" width={100} height={100} />
    ) : (
        <p>No image available</p>
    );
}

export default page