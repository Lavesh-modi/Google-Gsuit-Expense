import { useState } from "react";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import CustomizedHook from "./CustomizedHook";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InfoIcon from '@mui/icons-material/Info';

export default function (props) {
  const { data,name } = props;

  const theme = {
    spacing: 6,
  }
  
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* <h1
        style={{
          display: "flex",
          justifyContent: "center",
          color: "green",
        }}
      >
        GeeksForGeeks
      </h1> */}
      <Card
        sx={{
          minWidth: 3,
          border: "1px solid rgba(211,211,211,0.6)",
        }}
      >
        <CardHeader
          title={name}
        
          action={
            <IconButton
              onClick={() => setOpen(!open)}
              aria-label="expand"
              size="small"
            >
              <InfoIcon/>

              
              {open ? <MoreHorizIcon /> : <MoreHorizIcon />}
            </IconButton>
          }
        ></CardHeader>
        <div
          style={{
            backgroundColor: "rgba(211,211,211,0.4)",
          }}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <CardContent>
              <Container
                sx={{
                  height: 10,
                  lineHeight: 0,
                  ml:1,
                  
                }}
              >
              <h2>{data}</h2>
              {/* <CustomizedHook></CustomizedHook> */}
               
              </Container>
            </CardContent>
          </Collapse>
        </div>
      </Card>
    </>
  );
}
