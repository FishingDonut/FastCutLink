'use client';

import { Grid2 as Grid, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Modal, Box, Paper, FormControl, Input } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { FormEvent, useEffect, useState } from "react";
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
    const [open, setOpen] = useState<boolean>(false);

    const titles = ["Id", "Name", "FullLink", "ShortLink", "Date"];

    const router = useRouter();

    const onDelete = async (id: number) => {
        const response = await fetch("api/link/delete", {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });
        if (response.ok) {
            setlinks((prevLinks) => prevLinks ? prevLinks.filter(link => link.id !== id) : [])
        }
    }

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

    const onCreateUserLink = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const { name, fullLink } = await { name: formData.get("name"), fullLink: formData.get("fullLink") }

        const response = await fetch("api/link/create", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: session?.user.id,
                name: name,
                fullLink: fullLink
            })
        });

        const newLink = await response.json();

        if (response.ok) {
            setlinks((prevLinks) => prevLinks ? [...prevLinks, newLink] : [newLink]);
            setOpen(false);
        }
    }

    return (
        <Grid container display="flex" flexDirection="column" alignContent="center">
            <Grid container display="flex" alignContent="center">
                <Grid size={1}>
                </Grid>
                <Grid size={10}>
                    <Typography variant="h3" align="center" margin={1} fontWeight="bold" color="primary">
                        Seus Links
                    </Typography>
                </Grid>
                <Grid size={1}>
                </Grid>
            </Grid>
            <Grid margin={0} padding={0} spacing={0} size={1}></Grid>
            <Grid size={10} margin={1}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow key={0}>
                                {
                                    titles.map((title, index) => (
                                        <TableCell key={index} align="left">
                                            <Typography fontWeight="bold" color="secondary">{title}</Typography>
                                        </TableCell>
                                    ))
                                }
                                <TableCell>
                                    <Button variant="outlined" onClick={() => { setOpen(true) }}>
                                        <AddIcon />
                                    </Button>
                                </TableCell>
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
                                            <TableCell>
                                                <Typography fontWeight="bold">{link.name}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <a href={link.fullLink}>
                                                    {link.fullLink}
                                                </a>
                                            </TableCell>
                                            <TableCell>{link.shortLink}</TableCell>
                                            <TableCell>{formatDate(link.createdAt)}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => { onDelete(link.id) }} color="warning" variant="contained"><DeleteForeverIcon className="dark:invert" /></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid margin={0} padding={0} spacing={0} size={1}></Grid>
            <Modal open={open} onClose={() => { setOpen(false) }}>
                <Box
                    padding={2}
                    component={Paper}
                    bgcolor="black"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    position="absolute"
                    top="25%"
                    bottom="25%"
                    left="25%"
                    right="25%"
                >
                    <Grid size={12} id="title-modal">
                        <Typography variant="h2" color="primary" className="hidden sm:block" fontWeight="bold">Criar Link</Typography>
                        <Typography variant="h6" color="primary" className="block sm:hidden" fontWeight="bold">Criar Link</Typography>
                    </Grid>
                    <Grid margin={2} size={12} id="body">
                        <form onSubmit={(event) => { onCreateUserLink(event) }}>
                            <Grid margin={2} size={12}>
                                <FormControl variant="standard">
                                    <Input name="name" placeholder="Name"></Input>
                                </FormControl>
                            </Grid>
                            <Grid margin={2} size={12}>
                                <FormControl variant="standard">
                                    <Input name="fullLink" placeholder="FullLink"></Input>
                                </FormControl>
                            </Grid>
                            <Grid display="flex" alignItems="center" flexDirection="column" size={12}>
                                <Button type="submit" onClick={() => { }} variant="contained" fullWidth>
                                    <SaveIcon className="dark:invert" />
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
                </Box>
            </Modal>
        </Grid >
    );
}
