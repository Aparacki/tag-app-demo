import { grey } from "@mui/material/colors"
import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "default" && {
            backgroundColor: "transparent",
            color: grey[600],
          }),
        }),
      },
    },
  },
})

declare module "@mui/material/Alert" {
  interface AlertPropsColorOverrides {
    default: true
  }
}
