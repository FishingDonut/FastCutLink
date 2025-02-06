import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

interface Idata {
    email: string,
    password: string,
    passwordConfirm: string
}

async function handler(req: NextRequest) {
    try {
        const { email, password }: Idata = await req.json();

        const prismaResponse = await prisma.user.findFirst({
            where: {
                email: email
            }, include: { link: true }
        });

        if (!prismaResponse) {
            return NextResponse.json({ message: "Senha ou Email errado." }, { status: 400 });
        }

        if (prismaResponse.password === password) {
            return NextResponse.json({ message: "Success" }, { status: 200 });
        }

        return NextResponse.json({ message: "Senha ou Email errado." }, { status: 400 });
    } catch (error) {
        return NextResponse.json(error);
    }
}

export { handler as POST, };