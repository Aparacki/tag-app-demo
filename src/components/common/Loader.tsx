import { alpha, Box, CircularProgress } from "@mui/material"
import type { FC } from "react"

export interface Props {
  isLoading?: boolean
}

export const Loader: FC<Props> = ({ isLoading }) => {
  if (!isLoading) return null
  return (
    <Box
      height="100%"
      position="absolute"
      sx={(t) => ({ background: alpha(t.palette.background.default, 0.5), zIndex: 1 })}
      width="100%"
    >
      <CircularProgress
        size={16}
        sx={{ m: "auto", position: "absolute", left: "50%", top: "50%", transform: "translate(50%, -50%)" }}
      />
    </Box>
  )
}
