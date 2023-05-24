import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SvgIconsSize from "./ButtonHome";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth";

export default function LinkR() {
  const { isLoggedIn } = useAuth();
  return (
    <Stack direction="row" spacing={1}>
      {isLoggedIn && 
        <Button
        component={NavLink}
        to="/Contact"
        sx={{
          color: "white",
          borderRadius: "2rem",
          size: "medium",
          padding: 4,
        }}
      >
        <div className="text-xs sm:text-xs md:text-xs lg:text-md xl:text-md mr-4">
          Contact
        </div>
      </Button>
      }
      <Button
        component={NavLink}
        to="/Login"
        sx={{
          color: "white",
          borderRadius: "2rem",
          size: "medium",
          padding: 4,
          fontSize: "24px",
        }}
      >
        <div className="text-lg sm:text-xl md:text-xl lg:text-lg xl:text-xl mr-4">
          <FaUserCircle />
        </div>
      </Button>
    </Stack>
  );
}
