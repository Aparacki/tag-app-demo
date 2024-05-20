import { queryClient } from "@api/config"
import { Box, ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { theme } from "@styles"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { TagsView } from "./views/TagsView/TagsView"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReactQueryDevtools initialIsOpen={false} />
        <Box display="flex" height="100vh" justifyContent="center" width="100%">
          <TagsView />
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
