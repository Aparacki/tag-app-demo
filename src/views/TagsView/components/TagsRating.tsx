import { Alert } from "@components/common/Alert"
import { Remove } from "@mui/icons-material"
import type { RatingProps, SvgIconOwnProps } from "@mui/material"
import { Box, Rating, Typography } from "@mui/material"

type Score = "empty" | "low" | "high"

export const TagsRating = (props: RatingProps & { value: number }) => {
  const HIGH_SCORE = 5

  const score: Score = (() => {
    if (!props.value) return "empty"
    if (props.value < HIGH_SCORE) return "low"
    return "high"
  })()

  const title = (
    {
      empty: "Brak",
      low: "Słabo",
      high: "Dobrze",
    } satisfies Record<Score, string>
  )[score]

  const color = (
    {
      empty: "red",
      low: "red",
      high: "green",
    } satisfies Record<Score, string>
  )[score]

  const colorIcon = (
    {
      empty: "error",
      low: "error",
      high: "success",
    } satisfies Record<Score, NonNullable<SvgIconOwnProps["color"]>>
  )[score]

  return (
    <>
      <Box display="flex">
        <Typography color={color} pr={1}>
          {title}
        </Typography>
        <Rating
          readOnly
          emptyIcon={<Remove fontSize="inherit" style={{ opacity: 0.55 }} />}
          icon={<Remove color={colorIcon} />}
          precision={0.5}
          {...props}
        />
      </Box>
      {score === "low" && (
        <Alert severity="default">{`Zbyt malo tagów. Dodaj jeszcze ${HIGH_SCORE - props.value} aby poprawić widoczność artykułu`}</Alert>
      )}
      {score === "empty" && (
        <Alert severity="default">{`Brak tagów. Dodaj tagi aby poprawić widoczność artykułu`}</Alert>
      )}
    </>
  )
}
