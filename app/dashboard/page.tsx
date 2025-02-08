'use client';

import { Grid2 as Grid, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useEffect, useState } from "react";
import useGetLinks from "./useGetLinks";
import { useSession } from "next-auth/react";
import { Link } from "@prisma/client";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const formatDate =  (dateString: string | Date) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy", { locale: ptBR });
}

export default function Page() {
    const { data: session, status } = useSession();
    const [links, setlinks] = useState<Link[] | null>(null);

    const router = useRouter();


    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("=== START ===")
                if (status === "loading") {
                    return;
                }

                if (status != "authenticated" || !session || !session.user) {
                    router.push("/");
                    return
                };

                const response: Link[] | null = await useGetLinks(session);

                if (!response) {
                    router.push("/");
                }

                setlinks(response);
                console.log("=== END ===")
            } catch (error) {
                router.push("/");
                throw (error);
            }
        }
        fetchData();
    }, [router, status, session])

    return (
        <Grid container display="flex" flexDirection="column" alignContent="center">
            <Grid>
                <Typography variant="h2" fontWeight="bold" color="primary">
                    DashBoard
                </Typography>
            </Grid>
            <Grid>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>FullLink</TableCell>
                                <TableCell>ShortLink</TableCell>
                                <TableCell>Data</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                links && (
                                    links.map((link) => (
                                        <TableRow >
                                            <TableCell>{link.id}</TableCell>
                                            <TableCell>{link.name}</TableCell>
                                            <TableCell>{link.fullLink}</TableCell>
                                            <TableCell>{link.shortLink}</TableCell>
                                            <TableCell>{formatDate(link.createdAt)}</TableCell>
                                        </TableRow>
                                    ))
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}
