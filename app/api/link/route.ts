import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

async function handler(req: NextRequest, res: NextResponse) {
    try{
        const data = await req.json();
    
        const prismaResponse = await prisma.link.create({data: data});
        return NextResponse.json(prismaResponse);
    } catch (error){
        return NextResponse.json(error);
    }
}

export { handler as GET, handler as POST };