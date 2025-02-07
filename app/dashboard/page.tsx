'use client';

import { Grid2 as Grid, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useEffect, useState } from "react";
import useGetLinks from "./useGetLinks";
import { useSession } from "next-auth/react";
import { Link, User } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function Page() {
    const { data: session, status } = useSession();
    const [links, setlinks] = useState<Link | null>(null);

    const router = useRouter();

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                if(status === "loading" || !session || !session.user){
                    return;
                }

                if (status != "authenticated") {
                    router.push("/");
                    return
                };

                const response: Link|null = await useGetLinks(session);

                if (!response) {
                    router.push("/");
                }
                
                setlinks(response);
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell>1</TableCell>
                                <TableCell>jorge</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}
