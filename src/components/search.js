import {
  Autocomplete,
  TextField,
  Typography,
  CircularProgress,
  debounce,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
export default function Search() {
  const logoref = React.useRef(); //image reference

  const [options, setOptions] = useState([]); // options for the Autocomplete
  const [value, setValue] = useState(null); //Value of the selected option
  const [inputValue, setInputValue] = useState(""); //Value of the Input Field
  const [loading, setLoading] = useState(false); //Loading State
  const [error, setError] = useState(""); //Image Error State

  // OnChange of value of the Input Field, fetch the data from the API
  useEffect(() => {
    const find = async () => {
      try {
        if (inputValue === null || inputValue === "") {
          setLoading(false);
          setOptions([]);
          return;
        }
        const res = await fetch(
          `http://universities.hipolabs.com/search?name=${inputValue}`
        );
        const data = await res.json();
        setOptions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.log(err);
      }
    };
    find();
  }, [inputValue]);

  // On Selection of value of the Input Field, set the logo of the college
  useEffect(() => {
    if (value === null || value === "") return;
    logoref.current.src = `https://logo.clearbit.com/${value.web_pages[0]}`;
  }, [value]);

  return (
    <>
      {/* Heading */}
      <Typography
        variant="h3"
        sx={{ margin: 2, textAlign: "center" }}
        color="primary"
        fontWeight="700"
      >
        College Selector
      </Typography>
      {/* Autocomplete search */}
      <Autocomplete
        sx={{ width: 3 / 4, maxWidth: 1000, margin: 2 }}
        options={options}
        loading={loading}
        value={value || null}
        getOptionLabel={(option) => option.name}
        onChange={(e, newValue) => setValue(newValue)}
        onInputChange={debounce((e) => {
          setLoading(true);
          setInputValue(e.target.value);
          console.log(inputValue);
        }, 1000)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select College"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      {value && !error && (
        // Image
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: 2,
          }}
        >
          <img
            ref={logoref}
            alt="collegeLogo"
            onError={() => setError("Image Not Found")}
          />
          <Typography variant="h5" sx={{ marginTop: 2 }}>
            {value?.name}
          </Typography>
        </Box>
      )}
      {error && (
        // Error
        <Typography variant="h5" sx={{ marginTop: 2, color: "red" }}>
          {error}
        </Typography>
      )}
    </>
  );
}
