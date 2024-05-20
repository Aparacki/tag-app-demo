import { Box, ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { theme } from "@styles"

import { TagsView } from "./pages/TagsView/TagsView"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box alignItems="center" display="flex" height="100vh" justifyContent="center" width="100%">
        <TagsView />
      </Box>
    </ThemeProvider>
  )
}

export default App
