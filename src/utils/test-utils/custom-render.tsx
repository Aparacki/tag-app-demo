import "@testing-library/jest-dom";

import { Layout } from "@components/Layout/Layout"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { theme } from "@styles"
import type { RenderOptions } from "@testing-library/react"
import { render } from "@testing-library/react"
import type { ReactElement } from "react"
import type React from "react"

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>{children}</Layout>
    </ThemeProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// eslint-disable-next-line react-refresh/only-export-components, import/export
export * from "@testing-library/react"
// eslint-disable-next-line import/export
export { customRender as render }

export { default as userEvent } from "@testing-library/user-event"
