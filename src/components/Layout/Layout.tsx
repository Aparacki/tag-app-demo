import { Box, Container } from "@mui/material"
import type { FC, ReactNode } from "react"

export interface Props {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <Container maxWidth="sm">
      <Box pt={10} width="fit-content">
        {children}
      </Box>
    </Container>
  )
}
