import { Close, Search } from "@mui/icons-material"
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  ClickAwayListener,
  Divider,
  Grid,
  IconButton,
  ListItemText,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material"
import { type FC, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

export type Option = {
  optionKey: number | string
  label: string
  extraText?: string
}
export interface TagSelectProps {
  isLoading?: boolean
  isLoadingInitValues?: boolean
  options: Option[] | undefined
  initValues?: Option[]
  onChange?: (values: Option[]) => void
  onSubmit?: (values: Option[]) => void
  onChangeInput?: (values: string) => void
  disabledSubmit?: boolean
  delay?: number
}

export const TagSelect: FC<TagSelectProps> = ({
  isLoading,
  options = [],
  initValues = [],
  onChange,
  onSubmit,
  onChangeInput,
  disabledSubmit,
  delay = 600,
  isLoadingInitValues,
}) => {
  const [selectedValues, setSelectedValues] = useState<Option[]>([])
  const [temporaryValues, setTemporaryValues] = useState<Option[]>([])
  const [show, setShow] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const isSubmitSave = temporaryValues.length === 0 || disabledSubmit

  const onClose = () => {
    setTemporaryValues(selectedValues)
    setShow(false)
  }
  const onClear = () => {
    handleChangeInput("")
  }

  const onSave = () => {
    handleChangeValues(temporaryValues)
    onSubmit?.(temporaryValues)
    setShow(false)
    onClear()
  }

  const onDelete = (tag: Option) => {
    const values = selectedValues.filter((element) => element.optionKey !== tag.optionKey)
    handleChangeValues(values)
    onSubmit?.(values)
  }

  const debounceOnChangeInput = useDebouncedCallback((value: string) => onChangeInput?.(value), delay)

  const handleChangeInput = (value: string) => {
    setInputValue(value)
    debounceOnChangeInput?.(value)
  }

  const handleChangeValues = (selectedOptions: Option[]) => {
    setSelectedValues(selectedOptions)
    setTemporaryValues(selectedOptions)
    onChange?.(selectedOptions)
  }

  const initValuesDeps = JSON.stringify(initValues)
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
                  <Button fullWidth color="primary" disabled={isSubmitSave} variant="contained" onClick={onSave}>
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
                  endAdornment: (
                    <>
                      {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                      {inputValue?.length ? (
                        <IconButton size="small" onClick={onClear}>
                          <Close fontSize="small" />
                        </IconButton>
                      ) : null}
                    </>
                  ),
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
              handleChangeInput(v)
            }}
            onOpen={() => {
              setShow(true)
            }}
          />
        </ClickAwayListener>
      </Grid>
      {isLoadingInitValues && (
        <Grid item xs={12}>
          <Box alignItems="center" display="flex" width="100%">
            <CircularProgress size={16} sx={{ m: "auto" }} />
          </Box>
        </Grid>
      )}
      {!isLoadingInitValues && selectedValues.length > 0 && (
        <>
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
          {selectedValues.length > 0 && (
            <Grid item xs={12}>
              <Divider />
            </Grid>
          )}
        </>
      )}
    </Grid>
  )
}
