import { Info } from "@mui/icons-material"
import type { AlertProps } from "@mui/material/Alert"
import MuiAlert from "@mui/material/Alert"
import { styled } from "@mui/material/styles"

export const StyledAlert = styled(MuiAlert)((props) => ({
  ...(props.severity === "default" && { paddingLeft: 0, paddingRight: 0 }),
}))

export const Alert = (props: AlertProps) => {
  const Icon = props.severity === "default" ? <Info fontSize="inherit" /> : null
  return <StyledAlert icon={Icon} {...props} />
}
