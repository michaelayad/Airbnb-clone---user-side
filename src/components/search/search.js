
import React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
// react icons
import { IoSearchCircleSharp } from 'react-icons/io5';
import { pink } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';


const choices = [
    { id: 1, text: 'Anywhere' },
    { id: 2, text: 'Any week' },
    { id: 3, text: 'Add guest', withIcon: true },
];
const Search = ({isScreenSmall}) => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <Paper
                sx={{
                    borderRadius: 20,
                    ml: `${isScreenSmall?'0':'20px'}`,
                    display:`${isScreenSmall?'flex':''}`,
                    justifyContent:`${isScreenSmall?'center':''}`
                }}
                elevation={3}
            >
                <Stack
                    sx={{
                        borderRadius: 20,
                        px: `${isScreenSmall?'60px':'30px'}`,
                        width:"100%",
                        display:'flex',
                        justifyContent:'space-between',
                        direction:`${i18n.language==='en'?"ltr":"rtl"}`
                    }}
                    divider={<Divider orientation="vertical" flexItem />}
                >
                    {choices.map((choice) => {
                        return (
                            <Button key={choice.id} >
                                <Typography
                                    sx={{
                                        color: (theme) => theme.palette.text.primary,
                                        fontWeight: 'bold',
                                        overflow: 'hidden',
                                        width:"100%",
                                        
                                    }}
                                >
                                    {choice.text}
                                </Typography>
                                {choice.withIcon && (
                                    <Box
                                        sx={{
                                            pl: `${i18n.language==="en"?"16px":"0px"}`,
                                            mt: 0,
                                            pr: `${i18n.language==="en"?"16px":"24px"}`,
                                        }}
                                    >
                                        <IoSearchCircleSharp color={pink[500]} size={32} />
                                    </Box>
                                )}
                            </Button>
                        );
                    })}
                </Stack>
            </Paper>

        </>
    );
};

export default Search;