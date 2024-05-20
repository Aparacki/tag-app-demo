import { ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { theme } from "@styles"

import { theme } from "@theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App
