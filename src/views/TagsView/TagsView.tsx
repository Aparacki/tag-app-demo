import { useTagsListOptionsQuery, useTagsListSelectedListQuery } from "@api/tags/useTagsQuery"
import type { TagSelectProps } from "@components/TagSelect/TagSelect"
import { TagSelect } from "@components/TagSelect/TagSelect"
import { Close } from "@mui/icons-material"
import { Divider, Grid, IconButton, Paper, Typography } from "@mui/material"
import { useState } from "react"

import { TagsMenu, TagsRating } from "./components"
import { mapTagToOption } from "./utils"

export const TagsView = ({ onClose }: { onClose: () => void }) => {
  const [filters, setFilters] = useState("")
  const tagsList = useTagsListOptionsQuery({ name: filters })
  const selectedTags = useTagsListSelectedListQuery()
  const [ratingValue, setRatingValue] = useState(0)

  const onSubmit: TagSelectProps["onSubmit"] = (_) => {
    // save API handler
  }
  const onChange: TagSelectProps["onChange"] = (options) => {
    setRatingValue(options.length)
  }

  return (
    <Paper elevation={0} sx={{ width: "100%", maxWidth: 350, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Typography variant="h5">Tagi</Typography>
        </Grid>
        <Grid item>
          <IconButton sx={{ ml: "auto" }} onClick={onClose}>
            <Close />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <TagSelect
            disabledSubmit={selectedTags.isLoading}
            initValues={mapTagToOption(selectedTags.data)}
            isError={selectedTags.isError || tagsList.isError}
            isErrorInitValues={selectedTags.isError}
            isLoading={tagsList.isFetching}
            isLoadingInitValues={selectedTags.isLoading}
            options={mapTagToOption(tagsList.data)}
            onChange={onChange}
            onChangeInput={setFilters}
            onSubmit={onSubmit}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
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
