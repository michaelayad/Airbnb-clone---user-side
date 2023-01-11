import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey, grey, pink } from '@mui/material/colors';


const AppThemeProvider = (props) => {

    const theme = createTheme({
        typography: {
            allVariants: {
                fontFamily: 'Inconsolata',
                textTransform: 'none',
                fontSize: 15
            }
        },
        palette: {
            primary: {
                main: grey[700],
                dark: blueGrey[900]
            },
            secondary: {
                main: pink[500]
            }
        },
        components: {
            MuiTypography: {
                defaultProps: {
                    sx: {
                        px: 1,
                    },
                    variant: 'subtitle2',
                    textTransform: 'capitalize',
                },
            },
            MuiStack: {
                defaultProps: {
                    sx: {
                        px: 2,
                        py: 1,
                    },
                    spacing: 2,
                    direction: 'row',
                },
            },
            MuiPaper: {
                defaultProps: {
                    elevation: 0,
                },
            },
            MuiLink: {
                defaultProps: {
                    sx: {
                        color: (theme) => theme.palette.primary.main
                    },
                    underline: 'none',
                },
            },
            MuiButton: {
                defaultProps: {
                    size: 'small',
                    p: 0,
                    disableRipple: true,
                },
                variant: 'text',
            },
            MuiTab: {
                defaultProps: {
                    disableRipple: true,
                },
            },
            MuiFormControlLabel: {
                defaultProps: {
                    sx: {
                        color: (theme) => theme.palette.primary.main,
                },
            },
            
            componentsProps:{
                typography:{
                    fontSize:20,
                    
                }
            }
            },
            MuiCheckbox: {
                defaultProps: {
                    disableRipple: true,
                    sx: {
                        color: (theme) => theme.palette.primary.dark,
                        '&.Mui-checked': {
                            color: (theme) => theme.palette.primary.dark
                        }
                    }
                }
            }
        },
    })

    return (
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    );
}

export default AppThemeProvider;
