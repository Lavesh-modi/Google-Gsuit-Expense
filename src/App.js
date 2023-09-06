import "./App.css";
import Stack from "@mui/material/Stack";
// import Button from '@mui/material/Button';
import CustomizedHook from "./Pages/CustomizedHook";

import CssBaseline from "@mui/material/CssBaseline";
// import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Collapse from "./Pages/Collapse";
import Button from "@mui/material-next/Button";

import AddIcon from "@mui/icons-material/Add";
import SearchBar from "./Pages/Search";
// import MultiSelectSearchBar from "./Pages/Search";
import CustomizedAutocomplete from "./Pages/Search";
function App(props) {
  return (
    <>
      
     <div className="App">
      
       <Collapse data="#Error" name="Google GSuite Expense"></Collapse>
       <CustomizedHook></CustomizedHook>
       {/* <h3 >Add segement </h3> */}
       <Button color="primary" size="large"> <AddIcon>
      </AddIcon>   Add segement{" "}
       </Button>

       <Collapse data="$0.00" name="Hardware Expense"></Collapse>
       <Collapse data="$680.00" name="Dental & Vision Expense "></Collapse>
       <Collapse data="$3500.00" name="Health Insurance Expense "></Collapse>
   <Collapse data="$11,652.00" name="Advertising Budget "></Collapse>
     </div>
</>
  )
}

export default App;
