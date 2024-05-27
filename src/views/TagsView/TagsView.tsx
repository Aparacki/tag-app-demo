import { useTagOptionsQuery, useTagsListSelectedListQuery, useTagsMutation } from "@api/tags/useTagsQuery"
import type { TagSelectProps } from "@components/TagSelect/TagSelect"
import { TagSelect } from "@components/TagSelect/TagSelect"
import { Close } from "@mui/icons-material"
import { Divider, Grid, IconButton, Paper, Typography } from "@mui/material"
import { useState } from "react"

import { TagsMenu, TagsRating } from "./components"
import { mapOptionToTag, mapTagToOption } from "./utils"

export const TagsView = ({ onClose }: { onClose: () => void }) => {
  const [filters, setFilters] = useState("")
  const tagsListQuery = useTagOptionsQuery({ name: filters })
  const selectedTagsQuery = useTagsListSelectedListQuery()
  const { updateTagsMutation } = useTagsMutation()

  const onSubmit: TagSelectProps["onSubmit"] = (value) => {
    updateTagsMutation.mutate(mapOptionToTag(value))
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
            data={mapTagToOption(selectedTagsQuery.data)}
            disabledSubmit={selectedTagsQuery.isLoading}
            isError={selectedTagsQuery.isError}
            isLoading={tagsListQuery.isLoading}
            isLoadingData={selectedTagsQuery.isLoading || updateTagsMutation.isPending}
            options={mapTagToOption(tagsListQuery.data)}
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
        <Grid item xs={12}>
          <TagsRating value={selectedTagsQuery?.data?.length ?? 0} />
        </Grid>
      </Grid>
    </Paper>
  )
}
