import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

async function handler(req: NextRequest) {
    try{
        const { id } = await req.json();

        if(!id){
            return NextResponse.json(`Use um id valido.`);
        }

        const prismaResponse = await prisma.link.delete({where: {
            id: Number(id)
        }});

        return NextResponse.json(prismaResponse);
    } catch{
        return NextResponse.json(`Nao existe esse link`);
    }
}

export { handler as DELETE };