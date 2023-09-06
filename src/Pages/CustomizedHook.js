import * as React from "react";
import PropTypes from "prop-types";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const Root = styled("div")(
  ({ theme }) => `
  color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
  };
  font-size: 14px;
`
);

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")(
  ({ theme }) => `
  width: 90vw;
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;
  height : 6vh;

  &:hover {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
  }

  &.focused {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
  };
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

const Listbox = styled("ul")(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);
export default function CustomizedHook() {
    const re = new RegExp("[\w]*");
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
    ...rest
  } = useAutocomplete({
    id: "customized-hook-demo",
    defaultValue: [top100Films[1]],
    multiple: true,
    options: top100Films,
    getOptionLabel: (option) => option.title,
    getOptionDisabled:(option)=>{
        console.log(option,'disable');
        
    },
    onChange:(e)=>{
        console.log(re,'re');
        if (e.target.value!=re) {
            
        }
    }
  });
console.log(rest,'rest');
  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>Search</Label>
        <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
          {value.map((option, index) => (
            <StyledTag label={option.title} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} style={{ width: "500px" }} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.title}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
}


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

//attempt 2

// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { useAutocomplete } from "@mui/base/useAutocomplete";
// import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";
// import { styled } from "@mui/material/styles";
// import { autocompleteClasses } from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";

// const Root = styled("div")(
//   ({ theme }) => `
//   color: ${
//     theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
//   };
//   font-size: 14px;
// `
// );
// const Label = styled("label")`
//   padding: 0 0 4px;
//   line-height: 1.5;
//   display: block;
// `;

// const InputWrapper = styled("div")(
//   ({ theme }) => `
//   width: 90vw;
//   border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
//   background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
//   border-radius: 4px;
//   padding: 1px;
//   display: flex;
//   flex-wrap: wrap;
//   height : 6vh;

//   &:hover {
//     border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
//   }

//   &.focused {
//     border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
//     box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
//   }

//   & input {
//     background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
//     color: ${
//       theme.palette.mode === "dark"
//         ? "rgba(255,255,255,0.65)"
//         : "rgba(0,0,0,.85)"
//     };
//     height: 30px;
//     box-sizing: border-box;
//     padding: 4px 6px;
//     width: 0;
//     min-width: 30px;
//     flex-grow: 1;
//     border: 0;
//     margin: 0;
//     outline: 0;
//   }
// `
// );

// function Tag(props) {
//   const { label, onDelete, ...other } = props;
//   return (
//     <div {...other}>
//       <span>{label}</span>
//       <CloseIcon onClick={onDelete} />
//     </div>
//   );
// }

// Tag.propTypes = {
//   label: PropTypes.string.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

// const StyledTag = styled(Tag)(
//   ({ theme }) => `
//   display: flex;
//   align-items: center;
//   height: 24px;
//   margin: 2px;
//   line-height: 22px;
//   background-color: ${
//     theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
//   };
//   border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
//   border-radius: 2px;
//   box-sizing: content-box;
//   padding: 0 4px 0 10px;
//   outline: 0;
//   overflow: hidden;

//   &:focus {
//     border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
//     background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
//   }

//   & span {
//     overflow: hidden;
//     white-space: nowrap;
//     text-overflow: ellipsis;
//   }

//   & svg {
//     font-size: 12px;
//     cursor: pointer;
//     padding: 4px;
//   }
// `
// );

// const Listbox = styled("ul")(
//   ({ theme }) => `
//   width: 300px;
//   margin: 2px 0 0;
//   padding: 0;
//   position: absolute;
//   list-style: none;
//   background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
//   overflow: auto;
//   max-height: 250px;
//   border-radius: 4px;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
//   z-index: 1;

//   & li {
//     padding: 5px 12px;
//     display: flex;

//     & span {
//       flex-grow: 1;
//     }

//     & svg {
//       color: transparent;
//     }
//   }

//   & li[aria-selected='true'] {
//     background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
//     font-weight: 600;

//     & svg {
//       color: #1890ff;
//     }
//   }

//   & li.${autocompleteClasses.focused} {
//     background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
//     cursor: pointer;

//     & svg {
//       color: currentColor;
//     }
//   }
// `
// );

// // ... (Your other styled components)

// export default function CustomizedHook() {
//   const [searchText, setSearchText] = useState(""); // State to store the search text
//   const {
//     getRootProps,
//     getInputLabelProps,
//     getInputProps,
//     getTagProps,
//     getListboxProps,
//     getOptionProps,
//     groupedOptions,
//     value,
//     focused,
//     setAnchorEl,
//   } = useAutocomplete({
//     id: "customized-hook-demo",
//     defaultValue: [],
//     multiple: true,
//     options: top100Films,
//     getOptionLabel: (option) => option.title,
//   });

//   // Function to update the search text state
//   const handleSearchInputChange = (event) => {
//     setSearchText(event.target.value);
//   };

//   // Parse search text and split into terms
//   const searchTerms = searchText
//     .split(/\s+/) // Split by whitespace
//     .filter((term) => term.trim() !== ""); // Remove empty terms

//   // Filter options based on search terms
//   const filteredOptions = top100Films.filter((option) => {
//     // Check if any of the search terms are found in the option title
//     return searchTerms.some((term) =>
//       option.title.toLowerCase().includes(term.toLowerCase())
//     );
//   });

//   return (
//     <Root>
//       <div {...getRootProps()}>
//         <Label {...getInputLabelProps()}>Search</Label>
//         <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
//           {value.map((option, index) => (
//             <StyledTag label={option.title} {...getTagProps({ index })} />
//           ))}
//           <input
//             {...getInputProps()}
//             style={{ width: "500px" }}
//             value={searchText}
//             onChange={handleSearchInputChange}
//           />
//         </InputWrapper>
//       </div>
//       {filteredOptions.length > 0 ? (
//         <Listbox {...getListboxProps()}>
//           {filteredOptions.map((option, index) => (
//             <li {...getOptionProps({ option, index })}>
//               <span>{option.title}</span>
//               <CheckIcon fontSize="small" />
//             </li>
//           ))}
//         </Listbox>
//       ) : null}
//     </Root>
//   );
// }

// // ... (Your top100Films data)

//  const top100Films = [
//    { title: "Payment Processing Fees", year: 1994 },
//    { title: "Payroll Bonus G&A", year: 1972 },
//    { title: "Sum", year: 1974 },
//   { title: "Payroll Bonus S&M", year: 2008 },
//    { title: "Salary Increase Month ", year: 1957 },
//    { title: "Schindler's List", year: 1993 },
//    { title: "Pulp Fiction", year: 1994 },
//    {
//      title: "The Lord of the Rings: The Return of the King",
//      year: 2003,
//    },

// ];



//attempt 3 

// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { useAutocomplete } from "@mui/base/useAutocomplete";
// import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";
// import { styled } from "@mui/material/styles";
// import { autocompleteClasses } from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";

// const Root = styled("div")(
//   ({ theme }) => `
//   //   color: ${
//     theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
//   };
//      font-size: 14px;
//    `
// );

// const Label = styled("label")`
//   padding: 0 0 4px;
//   line-height: 1.5;
//   display: block;
// `;

// const InputWrapper = styled("div")(
//   ({ theme }) => `
//     width: 90vw;
//     border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
//     background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
//     border-radius: 4px;
//     padding: 1px;
//     display: flex;
//     flex-wrap: wrap;
//     height : 6vh;
  
//     &:hover {
//       border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
//     }
  
//     &.focused {
//       border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
//       box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
//     }
  
//     & input {
//       background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
//       color: ${
//         theme.palette.mode === "dark"
//           ? "rgba(255,255,255,0.65)"
//           : "rgba(0,0,0,.85)"
//       };
//       height: 30px;
//       box-sizing: border-box;
//       padding: 4px 6px;
//       width: 0;
//       min-width: 30px;
//       flex-grow: 1;
//       border: 0;
//       margin: 0;
//       outline: 0;
//     }
//   `
// );

// function Tag(props) {
//   const { label, onDelete, ...other } = props;
//   return (
//     <div {...other}>
//       <span>{label}</span>
//       <CloseIcon onClick={onDelete} />
//     </div>
//   );
// }

// Tag.propTypes = {
//   label: PropTypes.string.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

// const StyledTag = styled(Tag)(
//   ({ theme }) => `
//     display: flex;
//     align-items: center;
//     height: 24px;
//     margin: 2px;
//     line-height: 22px;
//     background-color: ${
//       theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
//     };
//     border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
//     border-radius: 2px;
//     box-sizing: content-box;
//     padding: 0 4px 0 10px;
//     outline: 0;
//     overflow: hidden;
  
//     &:focus {
//       border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
//       background-color: ${
//         theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"
//       };
//     }
  
//     & span {
//       overflow: hidden;
//       white-space: nowrap;
//       text-overflow: ellipsis;
//     }
  
//     & svg {
//       font-size: 12px;
//       cursor: pointer;
//       padding: 4px;
//     }
//   `
// );

// const Listbox = styled("ul")(
//   ({ theme }) => `
//     width: 300px;
//     margin: 2px 0 0;
//     padding: 0;
//     position: absolute;
//     list-style: none;
//     background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
//     overflow: auto;
//     max-height: 250px;
//     border-radius: 4px;
//     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
//     z-index: 1;
  
//     & li {
//       padding: 5px 12px;
//       display: flex;
  
//       & span {
//         flex-grow: 1;
//       }
  
//       & svg {
//         color: transparent;
//       }
//     }
  
//     & li[aria-selected='true'] {
//       background-color: ${
//         theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"
//       };
//       font-weight: 600;
  
//       & svg {
//         color: #1890ff;
//       }
//     }
  
//     & li.${autocompleteClasses.focused} {
//       background-color: ${
//         theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"
//       };
//       cursor: pointer;
  
//       & svg {
//          color: currentColor;
//        }
//    }
//    `
// );

// // ... (Your other styled components)

// export default function CustomizedHook() {
//   const [searchText, setSearchText] = useState(""); // State to store the search text
//   const {
//     getRootProps,
//     getInputLabelProps,
//     getInputProps,
//     getTagProps,
//     getListboxProps,
//     getOptionProps,
//     groupedOptions,
//     value,
//     focused,
//     setAnchorEl,
//   } = useAutocomplete({
//     id: "customized-hook-demo",
//     defaultValue: [],
//     multiple: true,
//     options: top100Films,
//     getOptionLabel: (option) => option.title,
//   });

//   // Function to update the search text state
//   const handleSearchInputChange = (event) => {
//     setSearchText(event.target.value);
//   };

//   // Function to filter options based on search text with logical operators
//   const filterOptionsWithOperators = (options, query) => {
//     const lowerCaseQuery = query.toLowerCase();
//     return options.filter((option) => {
//       const lowerCaseTitle = option.title ? option.title.toLowerCase() : "";
//       return lowerCaseQuery.split(/\s+/).every((term) => {
//         if (term.startsWith("+")) {
//           // Apply AND operator
//           return lowerCaseTitle.includes(term.substring(1));
//         } else if (term.startsWith("|")) {
//           // Apply OR operator
//           return lowerCaseTitle.includes(term.substring(1));
//         } else {
//           // No operator, treat as OR
//           return lowerCaseTitle.includes(term);
//         }
//       });
//     });
//   };

//   // Filter options based on search text with logical operators
//   const filteredOptions = filterOptionsWithOperators(top100Films, searchText);

//   return (
//     <Root>
//       <div {...getRootProps()}>
//         <Label {...getInputLabelProps()}>Search</Label>
//         <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
//           {value.map((option, index) => (
//             <StyledTag label={option.title} {...getTagProps({ index })} />
//           ))}
//           <input
//             {...getInputProps()}
//             style={{ width: "500px" }}
//             value={searchText}
//             onChange={handleSearchInputChange}
//           />
//         </InputWrapper>
//       </div>
//       {filteredOptions.length > 0 ? (
//         <Listbox {...getListboxProps()}>
//           {filteredOptions.map((option, index) => (
//             <li {...getOptionProps({ option, index })}>
//               <span>{option.title}</span>
//               <CheckIcon fontSize="small" />
//             </li>
//           ))}
//         </Listbox>
//       ) : null}
//     </Root>
//   );
// }

// Fiction", year: 1994 },
//   {
//     title: "The Lord of the Rings: The Return of the King",
//     year: 2003, const top100Films = [
//   { title: "Payment Processing Fees", year: 1994 },
//   { title: "Payroll Bonus G&A", year: 1972 },
//   { title: "Sum", year: 1974 },
//   { title: "Payroll Bonus S&M", year: 2008 },
//   { title: "Salary Increase Month ", year: 1957 },
//   { title: "Schindler's List", year: 1993 },
//   { title: "Pulp
//   },
// ];



//attempt 5 


// import * as React from "react";
// import PropTypes from "prop-types";
// import { useAutocomplete } from "@mui/base/useAutocomplete";
// import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";
// import { styled } from "@mui/material/styles";
// import { autocompleteClasses } from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";

// const Root = styled("div")(
//   ({ theme }) => `
//   color: ${
//     theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
//   };
//   font-size: 14px;
// `
// );

// const Label = styled("label")`
//   padding: 0 0 4px;
//   line-height: 1.5;
//   display: block;
// `;

// const InputWrapper = styled("div")(
//   ({ theme }) => `
//   width: 90vw;
//   border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
//   background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
//   border-radius: 4px;
//   padding: 1px;
//   display: flex;
//   flex-wrap: wrap;
//   height: 6vh;

//   &:hover {
//     border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
//   }

//   &.focused {
//     border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
//     box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
//   }

//   & input {
//     background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
//     color: ${
//       theme.palette.mode === "dark"
//         ? "rgba(255,255,255,0.65)"
//         : "rgba(0,0,0,.85)"
//     };
//     height: 30px;
//     box-sizing: border-box;
//     padding: 4px 6px;
//     width: 0;
//     min-width: 30px;
//     flex-grow: 1;
//     border: 0;
//     margin: 0;
//     outline: 0;
//   }
// `
// );

// function Tag(props) {
//   const { label, onDelete, ...other } = props;
//   return (
//     <div {...other}>
//       <span>{label}</span>
//       <CloseIcon onClick={onDelete} />
//     </div>
//   );
// }

// Tag.propTypes = {
//   label: PropTypes.string.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

// const StyledTag = styled(Tag)(
//   ({ theme }) => `
//   display: flex;
//   align-items: center;
//   height: 24px;
//   margin: 2px;
//   line-height: 22px;
//   background-color: ${
//     theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
//   };
//   border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
//   border-radius: 2px;
//   box-sizing: content-box;
//   padding: 0 4px 0 10px;
//   outline: 0;
//   overflow: hidden;

//   &:focus {
//     border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
//     background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
//   }

//   & span {
//     overflow: hidden;
//     white-space: nowrap;
//     text-overflow: ellipsis;
//   }

//   & svg {
//     font-size: 12px;
//     cursor: pointer;
//     padding: 4px;
//   }
// `
// );

// const Listbox = styled("ul")(
//   ({ theme }) => `
//   width: 300px;
//   margin: 2px 0 0;
//   padding: 0;
//   position: absolute;
//   list-style: none;
//   background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
//   overflow: auto;
//   max-height: 250px;
//   border-radius: 4px;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
//   z-index: 1;

//   & li {
//     padding: 5px 12px;
//     display: flex;

//     & span {
//       flex-grow: 1;
//     }

//     & svg {
//       color: transparent;
//     }
//   }

//   & li[aria-selected='true'] {
//     background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
//     font-weight: 600;

//     & svg {
//       color: #1890ff;
//     }
//   }

//   & li.${autocompleteClasses.focused} {
//     background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
//     cursor: pointer;

//     & svg {
//       color: currentColor;
//     }
//   }
// `
// );

// export default function CustomizedHook() {
//   const {
//     getRootProps,
//     getInputLabelProps,
//     getInputProps,
//     getTagProps,
//     getListboxProps,
//     getOptionProps,
//     groupedOptions,
//     value,
//     focused,
//     setAnchorEl,
//     setValue,
//     clearSelection,
//   } = useAutocomplete({
//     id: "customized-hook-demo",
//     defaultValue: [],
//     multiple: true,
//     options: top100Films,
//     getOptionLabel: (option) => option.title,
//   });

//   // Function to handle changes in the input value
//   const handleInputChange = (event, newValue) => {
//     const inputValue = newValue.trim();
//     let newValues = value;

//     // Check if the inputValue contains the "+" operator
//     if (inputValue.includes("+")) {
//       const terms = inputValue.split("+").map((term) => term.trim());
//       newValues = [...newValues, ...terms];
//     } else {
//       newValues = [...newValues, inputValue];
//     }

//     // Update the Autocomplete values
//     value.length === 0 ? clearSelection() : setValue(newValues);
//   };

//   return (
//     <Root>
//       <div {...getRootProps()}>
//         <Label {...getInputLabelProps()}>Search</Label>
//         <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
//           {value.map((option, index) => (
//             <StyledTag label={option} {...getTagProps({ index })} />
//           ))}
//           <input
//             {...getInputProps({
//               style: { width: "500px" },
//               onChange: handleInputChange,
//             })}
//           />
//         </InputWrapper>
//       </div>
//       {groupedOptions.length > 0 ? (
//         <Listbox {...getListboxProps()}>
//           {groupedOptions.map((option, index) => (
//             <li {...getOptionProps({ option, index })}>
//               <span>{option.title}</span>
//               <CheckIcon fontSize="small" />
//             </li>
//           ))}
//         </Listbox>
//       ) : null}
//     </Root>
//   );
// }


// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

// const top100Films = [


//   { title: "Payment Processing Fees", year: 1994 },
//   { title: "Payroll Bonus G&A", year: 1972 },
//   { title: "Sum", year: 1974 },
//   { title: "Payroll Bonus S&M", year: 2008 },
//   { title: "Salary Increase Month ", year: 1957 },
//   { title: "Schindler's List", year: 1993 },
//   { title: "Pulp Fiction", year: 1994 },
//   {
//     title: "The Lord of the Rings: The Return of the King",
//     year: 2003,
//   },

// ];




//attempting 6 

// import * as React from "react";
// import PropTypes from "prop-types";
// import { useAutocomplete } from "@mui/base/useAutocomplete";
// import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";
// import { styled } from "@mui/material/styles";
// import { autocompleteClasses } from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";

// const Root = styled("div")(
//   ({ theme }) => `
//   color: ${
//     theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
//   };
//   font-size: 14px;
// `
// );

// const Label = styled("label")`
//   padding: 0 0 4px;
//   line-height: 1.5;
//   display: block;
// `;

// const InputWrapper = styled("div")(
//   ({ theme }) => `
//   width: 90vw;
//   border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
//   background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
//   border-radius: 4px;
//   padding: 1px;
//   display: flex;
//   flex-wrap: wrap;
//   height: 6vh;

//   &:hover {
//     border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
//   }

//   &.focused {
//     border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
//     box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
//   }

//   & input {
//     background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
//     color: ${
//       theme.palette.mode === "dark"
//         ? "rgba(255,255,255,0.65)"
//         : "rgba(0,0,0,.85)"
//     };
//     height: 30px;
//     box-sizing: border-box;
//     padding: 4px 6px;
//     width: 0;
//     min-width: 30px;
//     flex-grow: 1;
//     border: 0;
//     margin: 0;
//     outline: 0;
//   }
// `
// );

// function Tag(props) {
//   const { label, onDelete, ...other } = props;
//   return (
//     <div {...other}>
//       <span>{label}</span>
//       <CloseIcon onClick={onDelete} />
//     </div>
//   );
// }

// Tag.propTypes = {
//   label: PropTypes.string.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

// const StyledTag = styled(Tag)(
//   ({ theme }) => `
//   display: flex;
//   align-items: center;
//   height: 24px;
//   margin: 2px;
//   line-height: 22px;
//   background-color: ${
//     theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
//   };
//   border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
//   border-radius: 2px;
//   box-sizing: content-box;
//   padding: 0 4px 0 10px;
//   outline: 0;
//   overflow: hidden;

//   &:focus {
//     border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
//     background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
//   }

//   & span {
//     overflow: hidden;
//     white-space: nowrap;
//     text-overflow: ellipsis;
//   }

//   & svg {
//     font-size: 12px;
//     cursor: pointer;
//     padding: 4px;
//   }
// `
// );

// const Listbox = styled("ul")(
//   ({ theme }) => `
//   width: 300px;
//   margin: 2px 0 0;
//   padding: 0;
//   position: absolute;
//   list-style: none;
//   background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
//   overflow: auto;
//   max-height: 250px;
//   border-radius: 4px;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
//   z-index: 1;

//   & li {
//     padding: 5px 12px;
//     display: flex;

//     & span {
//       flex-grow: 1;
//     }

//     & svg {
//       color: transparent;
//     }
//   }

//   & li[aria-selected='true'] {
//     background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
//     font-weight: 600;

//     & svg {
//       color: #1890ff;
//     }
//   }

//   & li.${autocompleteClasses.focused} {
//     background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
//     cursor: pointer;

//     & svg {
//       color: currentColor;
//     }
//   }
// `
// );

// export default function CustomizedHook() {
//   const {
//     getRootProps,
//     getInputLabelProps,
//     getInputProps,
//     getTagProps,
//     getListboxProps,
//     getOptionProps,
//     groupedOptions,
//     value,
//     focused,
//     setAnchorEl,
//     setValue,
//     clearSelection,
//   } = useAutocomplete({
//     id: "customized-hook-demo",
//     defaultValue: [],
//     multiple: true,
//     options: top100Films,
//   });

//   // Function to handle changes in the input value
//   const handleInputChange = (event, newValue) => {
//     const inputValue = newValue.trim();
//     let newValues = value;

//     // Check if the inputValue contains the "+" operator
//     if (inputValue.includes("+")) {
//       const terms = inputValue.split("+").map((term) => term.trim());
//       newValues = [...newValues, ...terms];
//     } else {
//       newValues = [...newValues, inputValue];
//     }

//     // Update the Autocomplete values
//     value.length === 0 ? clearSelection() : setValue(newValues);
//   };

//   return (
//     <Root>
//       <div {...getRootProps()}>
//         <Label {...getInputLabelProps()}>Search</Label>
//         <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
//           {value.map((option, index) => (
//             <StyledTag label={option} {...getTagProps({ index })} key={index} />
//           ))}
//           <input
//             {...getInputProps({
//               style: { width: "500px" },
//               onChange: handleInputChange,
//             })}
//           />
//         </InputWrapper>
//       </div>
//       {groupedOptions.length > 0 ? (
//         <Listbox {...getListboxProps()}>
//           {groupedOptions.map((option, index) => (
//             <li {...getOptionProps({ option, index })} key={index}>
//               <span>{option}</span>
//               <CheckIcon fontSize="small" />
//             </li>
//           ))}
//         </Listbox>
//       ) : null}
//     </Root>
//   );
// }

// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//   { title: "Payment Processing Fees", year: 1994 },
//   { title: "Payroll Bonus G&A", year: 1972 },
//   { title: "Sum", year: 1974 },
//   { title: "Payroll Bonus S&M", year: 2008 },
//   { title: "Salary Increase Month", year: 1957 },
//   { title: "Schindler's List", year: 1993 },
//   { title: "Pulp Fiction", year: 1994 },
//   {
//     title: "The Lord of the Rings: The Return of the King",
//     year: 2003,
//   },
// ];
