import { Link } from "@prisma/client";
import { Session } from "next-auth";

export default async function UseGetLinks(session: Session | null): Promise<Link[] | null> {
    try {
        const response = await fetch("api/user/find", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: session?.user.email })
        });

        if (!response.ok) {
            return null;
        }

        const user = await response.json();

        if (!user?.link) {
            return null;
        }

        return user.link as Link[];
    } catch (error) {
        throw ("deu ruim " + error);
    }
}