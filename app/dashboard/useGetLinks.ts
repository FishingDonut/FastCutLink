import { Link, User } from "@prisma/client";
import { Session } from "next-auth";

export default async function useGetLinks(session:Session | null): Promise<Link|null> {
    try {
        const response = await fetch("api/user/find", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: session?.user.email})
        });
        
        if(!response.ok){
            return null;
        }

        const user:User = await response.json();
        const link:Link = user?.link;

        console.log(link);
        return link;
    } catch (error) {
        throw ("deu ruim " + error);
    }
}