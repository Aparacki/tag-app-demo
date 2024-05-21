import { AutoAwesomeOutlined, LocalOfferOutlined, PhotoFilterOutlined } from "@mui/icons-material"
import { Box, IconButton, Paper, Popover } from "@mui/material"
import { TagsView } from "@views/TagsView"
import { useState } from "react"

export const Menu = () => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorElement)
  const [view, setView] = useState<"tags" | "">("")
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, viewKey: "tags") => {
    setAnchorElement(event.currentTarget)
    setView(viewKey)
  }
  const handleClose = () => {
    setAnchorElement(null)
    setView("")
  }

  return (
    <>
      <Paper>
        <Box display="flex" flexDirection="column">
          <IconButton
            onClick={(e) => {
              handleClick(e, "tags")
            }}
          >
            <LocalOfferOutlined />
          </IconButton>
          <IconButton>
            <AutoAwesomeOutlined />
          </IconButton>
          <IconButton>
            <PhotoFilterOutlined />
          </IconButton>
        </Box>
      </Paper>
      <Popover
        anchorEl={anchorElement}
        elevation={3}
        open={open && view === "tags"}
        anchorOrigin={{
          vertical: "top",
          horizontal: 50,
        }}
        onClose={handleClose}
      >
        <TagsView />
      </Popover>
    </>
  )
}
