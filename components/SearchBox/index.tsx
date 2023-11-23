import { InputBase, alpha, styled } from '@mui/material';
import React from 'react'

interface SearchBoxProps {
    placeholder: string;
    value: string;
    autoFocus?: boolean;
    onChange: (value: string) => void;
}

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: "10px",
    border: "1px solid #fff",
    backgroundColor: "#fff", //alpha(theme.palette.common.white, 0.0),
    // "&:hover": {
    //     backgroundColor: alpha(theme.palette.common.white, 0.0),
    // },
    marginLeft: 0,
    marginRight: "10px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(0),
        width: "auto"
    }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    right: 0,
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#21328d",
    fontWeight: 600
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 0, 1, 2),
        paddingRight: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "100%",
            "&:focus": {
                width: "100%"
            }
        }
    }
}))
const SearchBox = (props: SearchBoxProps) => {
    const { placeholder, value, autoFocus, onChange } = props;
    return (
        <Search>
            <SearchIconWrapper>
                <i className='ri-search-2-line' />
            </SearchIconWrapper>
            <StyledInputBase
                value={value}
                sx={{ width: "100%" }}
                placeholder={placeholder}
                autoFocus={autoFocus}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => onChange(e.target.value)}
            />
        </Search>
    )
}

export default SearchBox