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
            // Verifica o status da sessão e redireciona se necessário
            if (status === "loading" || !session || !session.user) {
                return; // Se a sessão está carregando ou não existe, sai da execução
            }

            if (status !== "authenticated") {
                router.push("/"); // Redireciona para a página inicial caso não esteja autenticado
                return; // Retorna para evitar execução do código abaixo
            }

            try {
                const response: Link | null = await useGetLinks(session);

                if (!response) {
                    router.push("/"); // Se não houver link, redireciona
                    return; // Retorna para evitar setar o estado de links
                }

                setlinks(response); // Agora só define o estado se a resposta for válida

            } catch (error) {
                router.push("/"); // Se ocorrer erro, redireciona
                console.error(error); // Exibe o erro no console
            }
        }

        fetchData(); // Chama a função assíncrona
    }, [router, status, session]);

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
