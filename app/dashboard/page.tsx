'use client';

import { Grid2 as Grid, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useEffect, useState } from "react";
import UseGetLinks from "./UseGetLinks";
import { useSession } from "next-auth/react";
import { Link } from "@prisma/client";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy", { locale: ptBR });
}

export default function Page() {
    const { data: session, status } = useSession();
    const [links, setlinks] = useState<Link[] | null>(null);

    const titles = ["Id", "Name", "FullLink", "ShortLink", "Date"];

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

                const response: Link[] | null = await UseGetLinks(session);

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
                <Typography variant="h3" fontWeight="bold" color="primary">
                    Seus Links
                </Typography>
            </Grid>
            <Grid margin={0} padding={0} spacing={0} size={1}></Grid>
            <Grid size={10} margin={1}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow key={0}>
                                {
                                    titles.map((title) => (
                                        <TableCell align="center">
                                            <Typography color="primary.dark">{title}</Typography>
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                links && (
                                    links.map((link, index) => (
                                        <TableRow key={link.id}>
                                            <TableCell>
                                                <Typography color="secondary">{index + 1}</Typography>
                                            </TableCell>
                                            <TableCell>{link.name}</TableCell>
                                            <TableCell>
                                                <a href={link.fullLink}>
                                                    {link.fullLink}
                                                </a>
                                            </TableCell>
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
            <Grid margin={0} padding={0} spacing={0} size={1}></Grid>
        </Grid >
    );
}
