import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Headers from "./Header";

export default function Root() {
    return (
        <Box>
            <Headers />
            <Outlet />
        </Box>
    );
}
