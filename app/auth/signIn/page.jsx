"use client";

import { useState, useEffect } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const { data: session } = useSession();
    const router = useRouter();
    const [providers, setProviders] = useState(null);

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        };
        fetchProviders();
    }, []);

    useEffect(() => {
        // Redirect if already signed in
        if (session) {
            router.push("/");
        }
    }, [session, router]);

    if (session) {
        // Return null if already redirected to avoid rendering further
        return null;
    }

    return (
        <div className="flex flex-col w-full h-[calc(100vh-64px)] gap-3 items-center justify-center">
            {providers &&
                Object.values(providers).map((provider) => (
                    <div key={provider.name} className="w-64 h-fit flex flex-col items-center justify-center">
                        {provider.name === "Google" ? (
                            <img src="/google.png" className="cursor-pointer flex" onClick={() => signIn(provider.id)} />
                        ) : (
                            <img src="/github1.png" className="cursor-pointer flex" onClick={() => signIn(provider.id)} />
                        )}
                    </div>
                ))}
        </div>
    );
}
