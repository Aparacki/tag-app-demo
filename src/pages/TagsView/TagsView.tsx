import { useTagsQuery } from "@api/tags/useTagsQuery"
import { TagSelect } from "@components/TagSelect/TagSelect"
import { Grid, Paper, Typography } from "@mui/material"
import { type ComponentProps, type FC, useState } from "react"

import { TagsRating } from "./components"
import { mapTagToOption } from "./utils"

export interface Props {}

export const TagsView: FC<Props> = () => {
  const { isLoading, tags, initTags, isLoadingInitTags } = useTagsQuery()
  const [ratingValue, setRatingValue] = useState(0)

  const onSubmit: ComponentProps<typeof TagSelect>["onSubmit"] = (options) => {
    // save API handler
    console.log("onSubmit", options)
  }
  return (
    <Paper sx={{ width: "100%", maxWidth: 350, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Tagi</Typography>
        </Grid>
        <Grid item xs={12}>
          <TagSelect
            initValues={mapTagToOption(initTags)}
            isLoading={isLoading || isLoadingInitTags}
            options={mapTagToOption(tags)}
            onSubmit={onSubmit}
            onChange={(options) => {
              setRatingValue(options.length)
            }}
          />
        </Grid>
        {!isLoading && !isLoadingInitTags && (
          <Grid item xs={12}>
            <TagsRating value={ratingValue} />
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}
