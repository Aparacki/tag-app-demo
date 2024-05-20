import { Close, Search } from "@mui/icons-material"
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  ClickAwayListener,
  Grid,
  IconButton,
  ListItemText,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material"
import { type FC, useEffect, useState } from "react"

export type Option = {
  optionKey: number | string
  label: string
  extraText?: string
}
export interface Props {
  isLoading: boolean
  options: Option[] | undefined
  initValues?: Option[]
  onChange: (values: Option[]) => void
  onSubmit?: (values: Option[]) => void
}

export const TagSelect: FC<Props> = ({ isLoading, options = [], initValues = [], onChange, onSubmit }) => {
  const [selectedValues, setSelectedValues] = useState<Option[]>([])
  const [temporaryValues, setTemporaryValues] = useState<Option[]>([])
  const [show, setShow] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const initValuesDeps = JSON.stringify(initValues)

  const onClose = () => {
    setTemporaryValues(selectedValues)
    setShow(false)
  }
  const onSave = () => {
    handleChangeValues(temporaryValues)
    onSubmit?.(temporaryValues)
    onClose()
  }

  const onDelete = (tag: Option) => {
    const values = selectedValues.filter((element) => element.optionKey !== tag.optionKey)
    handleChangeValues(values)
    onSubmit?.(values)
  }

  const onClear = () => {
    setInputValue("")
  }

  const handleChangeValues = (selectedOptions: Option[]) => {
    setSelectedValues(selectedOptions)
    setTemporaryValues(selectedOptions)
    onChange?.(selectedOptions)
  }

  useEffect(() => {
    if (!initValues) return
    handleChangeValues(initValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initValuesDeps])

  return (
    <Grid container item spacing={2} xs={12}>
      <Grid item xs={12}>
        <ClickAwayListener onClickAway={onClose}>
          <Autocomplete<Option, true, true>
            disableClearable
            multiple
            forcePopupIcon={false}
            getOptionLabel={(option) => option.label}
            inputValue={inputValue}
            isOptionEqualToValue={(a, b) => a.optionKey === b.optionKey}
            limitTags={5}
            loading={isLoading}
            open={show}
            options={options}
            renderTags={() => null}
            size="small"
            value={temporaryValues}
            PaperComponent={(children, ...props) => (
              <Paper
                {...props}
                className={children.className}
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                {children.children}
                <Box p={1}>
                  <Button fullWidth color="primary" disabled={isLoading} variant="contained" onClick={onSave}>
                    Zapisz
                  </Button>
                </Box>
              </Paper>
            )}
            renderInput={(parameters) => (
              <TextField
                {...parameters}
                label="Wyszukaj grupę lub tag"
                variant="standard"
                InputProps={{
                  ...parameters.InputProps,
                  startAdornment: <Search fontSize="small" />,
                  endAdornment: inputValue?.length ? (
                    <IconButton size="small" onClick={onClear}>
                      <Close fontSize="small" />
                    </IconButton>
                  ) : null,
                }}
              />
            )}
            renderOption={(props, tag, { selected }) => (
              <MenuItem {...props} key={tag.optionKey} sx={{ padding: 0 }}>
                <ListItemText>
                  <Checkbox checked={selected} size="small" sx={{ padding: 0.5 }} />
                  {tag.label}
                </ListItemText>
                {!!tag.extraText && (
                  <Typography color="text.secondary" variant="body2">
                    {tag.extraText}
                  </Typography>
                )}
              </MenuItem>
            )}
            onChange={(_, v) => {
              setTemporaryValues(v)
            }}
            onClose={(_, reason) => {
              if (reason !== "escape" && reason !== "toggleInput") return
              setShow(false)
            }}
            onInputChange={(_, v, reason) => {
              if (reason === "reset") return
              setInputValue(v)
            }}
            onOpen={() => {
              setShow(true)
            }}
          />
        </ClickAwayListener>
      </Grid>
      {isLoading && (
        <Grid item xs={12}>
          <Box alignItems="center" display="flex" width="100%">
            <CircularProgress size={16} sx={{ m: "auto" }} />
          </Box>
        </Grid>
      )}
      {selectedValues.length > 0 && (
        <Grid item xs={12}>
          <Box display="flex" flexWrap="wrap">
            {selectedValues.map((element) => (
              <Box key={element.optionKey} p={0.5} width="fit-content">
                <Chip
                  label={element.label}
                  variant="outlined"
                  onDelete={() => {
                    onDelete(element)
                  }}
                />
              </Box>
            ))}
          </Box>
        </Grid>
      )}
    </Grid>
  )
}
