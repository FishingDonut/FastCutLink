import { Box, Button, Grid2 as Grid, Input, Typography } from "@mui/material";
import Image from "next/image";

export default function page() {
    return (
        <>
            <Grid alignItems="center" flexDirection="column" display="flex" margin={2}><Image width={250} height={250} alt="logo" src="/image/logo3.png" /></Grid>

            <Box margin={1} flexDirection="column" display="flex" alignItems="center" height="100vh">
                <Grid margin={2}><Typography variant="h4" color="secondary" fontWeight="bold">Login</Typography></Grid>
                <Grid margin={2}>
                    <Input placeholder="Email" type="email"></Input>
                </Grid>
                <Grid margin={2}>
                    <Input placeholder="Senha" type="password"></Input>
                </Grid>
                <Grid margin={2}>
                    <Button variant="contained"><Typography fontWeight="bold">CADASTRAR</Typography></Button>
                </Grid>
            </Box>
        </>
    );
}