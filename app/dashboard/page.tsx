'use client';

import { Grid2 as Grid, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";



export default function Page() {
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
