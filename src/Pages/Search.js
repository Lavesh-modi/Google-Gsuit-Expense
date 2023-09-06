import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const CustomizedAutocomplete = () => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);

    // Check if the input ends with an operator character (e.g., +)
    const operatorPattern = /[\+\-\*\/]/; // You can add more operators as needed
    if (operatorPattern.test(newInputValue)) {
      // Display the list of suggestions
      setOptions(top100Films);
    } else {
      // Hide the list of suggestions
      setOptions([]);
    }
  };

  const handleAddOption = (option) => {
    setSelectedOptions([...selectedOptions, option]);
    setInputValue("");
    setOptions([]);
  };

  return (
    <Stack spacing={2}>
      <Autocomplete
        value={null}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={options}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField {...params} label="Search" variant="outlined" fullWidth />
        )}
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        style={{ display: options.length > 0 ? "block" : "none" }}
      />
      <div>
        Selected Options:{" "}
        {selectedOptions.map((option) => option.title).join(" ")}
      </div>
    </Stack>
  );
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "Payment Processing Fees", year: 1994 },
  { title: "Payroll Bonus G&A", year: 1972 },
  { title: "Sum", year: 1974 },
  { title: "Payroll Bonus S&M", year: 2008 },
  { title: "Salary Increase Month ", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
];

export default CustomizedAutocomplete;
