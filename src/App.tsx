import { queryClient } from "@api/config"
import { Layout } from "@components/Layout/Layout"
import { Menu } from "@components/Menu/Menu"
import { ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { theme } from "@styles"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReactQueryDevtools initialIsOpen={false} />
        <Layout>
          <Menu />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
