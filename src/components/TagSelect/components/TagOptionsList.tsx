import type { Option } from "@components/TagSelect/TagSelect"
import type { useAutocomplete } from "@mui/base/useAutocomplete"
import { Box, Checkbox, ListItemText, MenuItem, Typography } from "@mui/material"

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
        <MenuItem {...getOptionProps({ option, index })} key={option.optionKey} sx={{ padding: 0 }}>
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
        </MenuItem>
      ))}
    </Box>
  )
