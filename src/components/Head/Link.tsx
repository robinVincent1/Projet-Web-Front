import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SvgIconsSize from "./ButtonHome";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth";


export default function TextButtons() {
  const { isLoggedIn } = useAuth();
  return (
    <Stack direction={"row"} spacing={0}>
      <Button
        component={NavLink}
        to="/Accueil"
        sx={{
          color: "white",
          borderRadius: "2rem",
          size: "small",
        }}
      >
        <SvgIconsSize />
      </Button>
      {isLoggedIn && 
      <div className="font-bold items-center text-center justify-center flex">
        <Button
        component={NavLink}
        to="/Programme"
        sx={{
          color: "white",
          borderRadius: "2rem",
          size: "medium",
          padding: 4,
        }}
      >
        <div className="font-bold text-xs sm:text-xs md:text-xs lg:text-md xl:text-md mr-4">
          Programme
        </div>
      </Button>
      <Button
        component={NavLink}
        to="/Performance"
        sx={{
          color: "white",
          borderRadius: "2rem",
          size: "medium",
          padding: 4,
        }}
        href="#text-buttons"
      >
        <div className=" font-bold text-xs sm:text-xs md:text-xs lg:text-md xl:text-md ml-4">
          Performance
        </div>
      </Button>
      </div>
      }
    </Stack>
  );
}
