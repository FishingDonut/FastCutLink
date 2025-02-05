import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

async function handler(req: NextRequest) {
    try{
        const data = await req.json();

        const prismaResponse = await prisma.user.findFirst({where: {
            email: data.email
        }});
    
        return NextResponse.json(prismaResponse);
    } catch (error){
        return NextResponse.json(error);
    }
}

export { handler as POST,};