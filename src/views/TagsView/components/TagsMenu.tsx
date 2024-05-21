import { AutoAwesome, AutoAwesomeOutlined, LocalOfferOutlined } from "@mui/icons-material"
import { ListItemIcon, ListItemText, MenuItem, MenuList } from "@mui/material"
import type { ReactNode } from "react"

const MenuElement = ({ text, Icon, disabled }: { text: string; Icon: ReactNode; disabled?: boolean }) => (
  <MenuItem disabled={disabled}>
    <ListItemIcon>{Icon}</ListItemIcon>
    <ListItemText>{text}</ListItemText>
  </MenuItem>
)

export const TagsMenu = () => (
  <MenuList disablePadding>
    <MenuElement disabled Icon={<AutoAwesomeOutlined fontSize="small" />} text="CMS AI" />
    <MenuElement Icon={<AutoAwesome fontSize="small" />} text="Analizuj tekst" />
    <MenuElement Icon={<LocalOfferOutlined fontSize="small" />} text="Najpopularniejsze tagi" />
  </MenuList>
)
