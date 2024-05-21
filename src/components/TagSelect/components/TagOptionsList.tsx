import type { Option } from "@components/TagSelect/TagSelect"
import type { useAutocomplete } from "@mui/base/useAutocomplete"
import { Box, Checkbox, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"

export const TagOptionsList = ({
  getOptionProps,
  groupedOptions,
  value,
}: Pick<ReturnType<typeof useAutocomplete<Option, true>>, "getOptionProps" | "groupedOptions" | "value">) =>
  groupedOptions.length === 0 ? (
    <Typography textAlign="center">Brak wyników</Typography>
  ) : (
    <Box maxHeight={300} sx={{ overflow: "auto" }}>
      {(groupedOptions as Option[]).map((option, index) => (
        <ListItem {...getOptionProps({ option, index })} key={option.optionKey} dense disablePadding sx={{ pr: 1 }}>
          <ListItemButton disableGutters>
            <ListItemText>
              <Checkbox
                checked={value.map((element) => element.optionKey).includes(option.optionKey)}
                size="small"
                sx={{ padding: 0.5 }}
              />
              {option.label}
            </ListItemText>
            {!!option.extraText && (
              <Typography color="text.secondary" variant="body2">
                {option.extraText}
              </Typography>
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </Box>
  )
