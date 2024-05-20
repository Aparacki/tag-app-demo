import { Box, ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { theme } from "@styles"

import { TagsView } from "./pages/TagsView/TagsView"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <ReactQueryDevtools initialIsOpen={false} />
        <TagsView />
      </Box>
    </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
