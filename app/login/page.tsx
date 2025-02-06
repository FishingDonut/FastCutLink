'use client';

import { Box, Button, FormControl, FormHelperText, Grid2 as Grid, Input, InputLabel, Typography } from "@mui/material";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from 'next/link';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function page() {

    const [messageError, setMessageError] = useState<String>("");

    const registerSchema = z.object({
        email: z.string().email("Presisa ser um email valido"),
        password: z.string().min(8, "Presisa ter 8 caracteres.")
    });

    type RegisterSchema = z.infer<typeof registerSchema>;


    const { formState: { errors }, handleSubmit, register } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema)
    });

    const router = useRouter();

    const handleRegisterFormSuccess = async (data: RegisterSchema) => {
        try {
            const { email, password } = data;
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false
            });

            if (!result) {
                return;
            } else if (result?.status != 200) {
                setMessageError(result?.error || "Erro Login");
                return;
            } else {
                setMessageError("");
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Grid alignItems="center" flexDirection="column" display="flex" margin={2}><Image width={250} height={250} alt="logo" src="/image/logo3.png" /></Grid>

            <Box margin={1} flexDirection="column" display="flex" alignItems="center">
                <form onSubmit={handleSubmit(handleRegisterFormSuccess)}>

                    <Grid container alignItems="center" flexDirection="column" display="flex" spacing={1} margin={1}>

                        <Box display="flex" flexDirection="column">
                            <Typography color="primary" variant="h4">Login</Typography>
                            <Typography color="gray" variant="subtitle1">Entre com a sua conta.</Typography>
                            {messageError && <Typography variant="subtitle2" color="error" id={"api-error"}>{messageError}</Typography>}
                        </Box>

                        <Grid spacing={4} container margin={1} display="flex" flexDirection="column" justifyContent="center">
                            <Grid size={12}>
                                <FormControl error={!!errors?.email} variant="standard">
                                    <Input {...register('email')} placeholder="Email" type="email"></Input>
                                    {errors?.email && <FormHelperText id={"email-error"}>{errors?.email.message}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            <Grid size={12}>
                                <FormControl error={errors?.password ? true : false} variant="standard">
                                    <Input  {...register('password')} placeholder="Senha" type="password"></Input>
                                    {errors?.password && <FormHelperText id={"password-error"}>{errors?.password.message}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            <Box display="flex" flexDirection="column" alignItems="center" maxWidth={200}>
                                <Typography color="gray" variant="subtitle2">By signing up you agree to our <Typography component={Link} href="/terms" color="white" style={{ textDecoration: 'underline' }}>Terms</Typography>, <Typography component={Link} href="/privacy-policy" color="white" style={{ textDecoration: 'underline' }}>Privacy Policy</Typography>, and <Typography component={Link} href="/cookie-policy" color="white" style={{ textDecoration: 'underline' }}>Cookie Use</Typography></Typography>
                            </Box>

                            <Grid size={12}>
                                <Button color="secondary" type="submit" fullWidth variant="contained">
                                    <Typography fontWeight="bold">LOGIN</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </>
    );
}