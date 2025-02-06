'use client';

import { Box, Button, FormControl, FormHelperText, Grid2 as Grid, Input, InputLabel, Typography } from "@mui/material";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function page() {

    const registerSchema = z.object({
        email: z.string().email("Need email"),
        password: z.string().min(8, "Need 8"),
        passwordConfirm: z.string().min(8, "Need 8")
    }).refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: "Passwords do not match."
    });

    type RegisterSchema = z.infer<typeof registerSchema>;


    const { formState: { errors }, handleSubmit, register } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = (data: RegisterSchema) => {
        console.log(data);
    }

    return (
        <>
            <Grid alignItems="center" flexDirection="column" display="flex" margin={2}><Image width={250} height={250} alt="logo" src="/image/logo3.png" /></Grid>

            <Box margin={1} flexDirection="column" display="flex" alignItems="center" height="100vh">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Grid container alignItems="center" flexDirection="column" display="flex" spacing={1} margin={1}>

                    <Box display="flex" flexDirection="column" margin={6}>
                    <Typography color="primary" variant="h4">Cadastro</Typography>
                    <Typography color="gray" variant="subtitle1">Vamos criar a sua conta.</Typography>
                </Box>

                        <Grid spacing={4} container margin={1} display="flex" justifyContent="center">
                            <Grid>
                                <FormControl error={!!errors?.email} variant="standard">
                                    <Input {...register('email')} placeholder="Email" type="email"></Input>
                                    {errors?.email && <FormHelperText id={"email-error"}>{errors?.email.message}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            <Grid>
                                <FormControl error={errors?.password ? true : false} variant="standard">
                                    <Input  {...register('password')} placeholder="Senha" type="password"></Input>
                                </FormControl>
                            </Grid>

                            <Grid>
                                <FormControl error={errors?.passwordConfirm ? true : false} variant="standard">
                                    <Input {...register('passwordConfirm')} placeholder="Repita a senha" type="password"></Input>
                                </FormControl>

                            </Grid>

                            <Grid size={12}>
                                <Button color="secondary" type="submit" fullWidth variant="contained">
                                    <Typography fontWeight="bold">CADASTRAR</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </>
    );
}