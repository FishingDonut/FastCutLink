import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

interface Idata {
    email: string,
    password: string,
    passwordConfirm?: string
}

export async function POST(req: NextRequest) {
    try {
        const { email, password }: Idata = await req.json();

        const findUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if(findUser){
            return NextResponse.json({message: "Erro, email ou senha invalido"}, {status: 400});
        }

        const prismaResponse = await prisma.user.create({
            data: {
                email: email, password: password
            }
        });

        return NextResponse.json(prismaResponse, {status: 201});
    } catch (error) {
        return NextResponse.json(error);
    }
}