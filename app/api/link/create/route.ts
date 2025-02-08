import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

async function handler(req: NextRequest) {
    try{
        const data = await req.json();
        
        const response = await fetch(data.fullLink);
        
        if(!response.ok){
            return NextResponse.json("Link invalido", {status: 400}) ;
        }

        data["shortLink"] = Math.random().toString(36).substring(2, 2 + 6);

        const prismaResponse = await prisma.link.create({data: data});
        return NextResponse.json(prismaResponse);
    } catch (error){
        return NextResponse.json(error);
    }
}

export { handler as POST };