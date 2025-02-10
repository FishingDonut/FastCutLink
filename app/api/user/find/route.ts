import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { Prisma} from "@prisma/client";

type User = Prisma.UserGetPayload<{}>;

async function handler(req: NextRequest) {
    try{
        const data = await req.json();


        const prismaResponse: User|null = await prisma.user.findFirst({where: {
            email: data.email
        }, include: { link : true}
    });
    
        return NextResponse.json(prismaResponse);
    } catch (error){
        return NextResponse.json(error);
    }
}

export { handler as POST,};