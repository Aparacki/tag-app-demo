import { useTagsListOptionsQuery, useTagsListSelectedListQuery } from "@api/tags/useTagsQuery"
import type { TagSelectProps } from "@components/TagSelect/TagSelect"
import { TagSelect } from "@components/TagSelect/TagSelect"
import { Divider, Grid, Paper, Typography } from "@mui/material"
import { useState } from "react"

import { TagsMenu, TagsRating } from "./components"
import { mapTagToOption } from "./utils"

export const TagsView = () => {
  const [filters, setFilters] = useState("")
  const tagsList = useTagsListOptionsQuery({ name: filters })
  const selectedTags = useTagsListSelectedListQuery()
  const [ratingValue, setRatingValue] = useState(0)

  const onSubmit: TagSelectProps["onSubmit"] = (options) => {
    // save API handler
    console.log("onSubmit", options)
  }
  const onChange: TagSelectProps["onChange"] = (options) => {
    setRatingValue(options.length)
  }

  return (
    <Paper sx={{ width: "100%", maxWidth: 350, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Tagi</Typography>
        </Grid>
        <Grid item xs={12}>
          <TagSelect
            disabledSubmit={selectedTags.isLoading}
            initValues={mapTagToOption(selectedTags.data)}
            isLoading={tagsList.isFetching}
            isLoadingInitValues={selectedTags.isLoading}
            options={mapTagToOption(tagsList.data)}
            onChange={onChange}
            onChangeInput={setFilters}
            onSubmit={onSubmit}
          />
        </Grid>
        <Grid item xs={12}>
          <TagsMenu />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {!selectedTags.isLoading && (
          <Grid item xs={12}>
            <TagsRating value={ratingValue} />
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}
