import type { Option } from "@components/TagSelect/TagSelect"
import { Box, Chip, Typography } from "@mui/material"

export const TagChipList = ({
  selectedValues,
  onDelete,
}: {
  selectedValues: Option[]
  onDelete: (value: Option) => void
}) => (
  <Box data-testid="tag-select-chips-list" display="flex" flexWrap="wrap">
    {selectedValues?.length ? (
      selectedValues.map((element) => (
        <Box key={element.optionKey} p={0.5} width="fit-content">
          <Chip
            label={element.label}
            variant="outlined"
            onDelete={() => {
              onDelete(element)
            }}
          />
        </Box>
      ))
    ) : (
      <Typography textAlign="center">Brak tagów</Typography>
    )}
  </Box>
)
