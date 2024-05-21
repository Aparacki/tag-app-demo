import { TagChipList, TagErrorAlert, TagOptionsList } from "@components/TagSelect/components"
import { useAutocomplete } from "@mui/base/useAutocomplete"
import { Close, Search } from "@mui/icons-material"
import { Box, Button, CircularProgress, Grid, IconButton, List, TextField } from "@mui/material"
import { type FC, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

export type Option = {
  optionKey: number | string
  label: string
  extraText?: string
}
export interface TagSelectProps {
  delay?: number
  disabledSubmit?: boolean
  initValues?: Option[]
  isError?: boolean
  isErrorInitValues?: boolean
  isLoading?: boolean
  isLoadingInitValues?: boolean
  onChange?: (values: Option[]) => void
  onChangeInput?: (values: string) => void
  onSubmit?: (values: Option[]) => void
  options: Option[] | undefined
}

export const TagSelect: FC<TagSelectProps> = ({
  delay = 600,
  disabledSubmit,
  initValues = [],
  isError,
  isErrorInitValues,
  isLoading,
  isLoadingInitValues,
  onChange,
  onChangeInput,
  onSubmit,
  options = [],
}) => {
  const [selectedValues, setSelectedValues] = useState<Option[]>([])
  const [temporaryValues, setTemporaryValues] = useState<Option[]>([])
  const [show, setShow] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const isSubmitDisabled = disabledSubmit || isError || isErrorInitValues

  const onClose = () => {
    setTemporaryValues(selectedValues)
    handleChangeInput("")
    setShow(false)
  }

  const onSave = () => {
    handleChangeValues(temporaryValues)
    onSubmit?.(temporaryValues)
    handleChangeInput("")
    setShow(false)
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

  const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions, value } = useAutocomplete<
    Option,
    true,
    true,
    false
  >({
    multiple: true,
    options,
    getOptionLabel: (option) => option.label,
    isOptionEqualToValue: (a, b) => a.optionKey === b.optionKey,
    inputValue,
    value: temporaryValues,
    onChange: (_, newValue) => {
      setTemporaryValues(newValue)
    },
    onInputChange: (_, newInputValue, reason) => {
      if (reason !== "reset") handleChangeInput(newInputValue)
    },
    open: show,
    onClose: (_, reason) => {
      if (reason !== "escape") return
      onClose()
    },
    onOpen: () => {
      setShow(true)
    },
    filterOptions: (option) => option,
  })

  const initValuesDeps = JSON.stringify(initValues)
  useEffect(() => {
    if (!initValues) return
    handleChangeValues(initValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initValuesDeps])

  return (
    <Grid container item spacing={2} xs={12}>
      <Grid item xs={12}>
        <div {...getRootProps()}>
          <TextField
            fullWidth
            inputProps={getInputProps()}
            placeholder="Wyszukaj grupę lub tag"
            variant="standard"
            InputProps={{
              startAdornment: <Search fontSize="small" />,
              endAdornment: (
                <>
                  {isLoading && (
                    <Box>
                      <CircularProgress color="inherit" size={16} />
                    </Box>
                  )}
                  {show && (
                    <IconButton size="small" onClick={onClose}>
                      <Close fontSize="small" />
                    </IconButton>
                  )}
                </>
              ),
            }}
          />
        </div>
      </Grid>
      {show && (
        <Grid item xs={12}>
          <List {...getListboxProps()} disablePadding data-testid="tag-select-options-list">
            {isError ? (
              <TagErrorAlert />
            ) : (
              <TagOptionsList getOptionProps={getOptionProps} groupedOptions={groupedOptions} value={value} />
            )}
            <Box p={1}>
              <Button fullWidth color="primary" disabled={isSubmitDisabled} variant="contained" onClick={onSave}>
                Zapisz
              </Button>
            </Box>
          </List>
        </Grid>
      )}
      {!show && (
        <>
          {isLoadingInitValues && (
            <Grid item xs={12}>
              <Box alignItems="center" display="flex" width="100%">
                <CircularProgress size={16} sx={{ m: "auto" }} />
              </Box>
            </Grid>
          )}
          {!isLoadingInitValues && (
            <Grid item xs={12}>
              <TagChipList isError={isErrorInitValues} selectedValues={selectedValues} onDelete={onDelete} />
            </Grid>
          )}
        </>
      )}
    </Grid>
  )
}
