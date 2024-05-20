import { Alert } from "@components/common/Alert"
import { Remove } from "@mui/icons-material"
import type { RatingProps } from "@mui/material"
import { Box, Rating, Typography } from "@mui/material"

export const TagsRating = (props: RatingProps) => {
  const value = props.value ?? 0
  const isBad = value < 4
  return (
    <>
      <Box display="flex">
        <Typography color={isBad ? "red" : "green"} pr={1}>
          {isBad ? "Słabo" : "Dobrze"}
        </Typography>
        <Rating
          readOnly
          emptyIcon={<Remove fontSize="inherit" style={{ opacity: 0.55 }} />}
          icon={<Remove color={isBad ? "error" : "success"} />}
          precision={0.5}
          {...props}
        />
      </Box>
      {isBad && (
        <Alert severity="default">{`Zbyt malo tagów. Dodaj jeszcze ${5 - value} aby poprawić widoczność artykułu`}</Alert>
      )}
    </>
  )
}
