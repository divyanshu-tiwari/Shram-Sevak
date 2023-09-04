import { Typography } from "@mui/material"
import * as React from 'react';
import { useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from "@mui/material";
export const AdminActionMenu = ({setPage, navs}) => {
    return (
        <>
         <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Item>
                            <Button size="large" fullWidth onClick={() => setPage(navs.addCategory)}>Add Category</Button>
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Item>
                            <Button size="large" fullWidth onClick={() => setPage(navs.addSkill)}>Add Skill</Button>
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Item>
                            <Button size="large" fullWidth onClick={() => setPage(navs.addState)}>Add State</Button>
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Item>
                            <Button size="large" fullWidth onClick={() => setPage(navs.addCity)}>Add City</Button>
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Item>
                            <Button size="large" fullWidth onClick={() => setPage(navs.addLocality)}>Add Locality</Button>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

