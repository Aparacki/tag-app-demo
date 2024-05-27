import { Loader } from "@components/common/Loader"
import { TagChipList, TagOptionsList } from "@components/TagSelect/components"
import { useAutocomplete } from "@mui/base/useAutocomplete"
import { Close, Search } from "@mui/icons-material"
import { Box, Button, CircularProgress, Grid, IconButton, List, TextField } from "@mui/material"
import { type FC, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

const DELAY = 600

export type Option = {
  optionKey: number | string
  label: string
  extraText?: string
}
export interface TagSelectProps {
  disabledSubmit?: boolean
  data?: Option[]
  isError?: boolean
  isLoading?: boolean
  isLoadingData?: boolean
  onChangeInput?: (value: string) => void
  onSubmit?: (value: Option[]) => void
  options: Option[] | undefined
}

export const TagSelect: FC<TagSelectProps> = ({
  disabledSubmit,
  data = [],
  isError,
  isLoading: isLoadingOptions,
  isLoadingData,
  onChangeInput,
  onSubmit,
  options = [],
}) => {
  const [temporaryValues, setTemporaryValues] = useState<Option[]>(data)
  const [show, setShow] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const isSubmitDisabled = disabledSubmit || isError

  const onClose = () => {
    setTemporaryValues(data)
    handleChangeInput("")
    setShow(false)
  }

  const onSave = () => {
    onSubmit?.(temporaryValues)
    handleChangeInput("")
    setShow(false)
  }

  const onDelete = (tag: Option) => {
    const filteredValue = data.filter((element) => element.optionKey !== tag.optionKey)
    onSubmit?.(filteredValue)
  }

  const debounceOnChangeInput = useDebouncedCallback((value: string) => onChangeInput?.(value), DELAY)

  const handleChangeInput = (value: string) => {
    setInputValue(value)
    debounceOnChangeInput?.(value)
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
      setTemporaryValues(data)
      setShow(true)
    },
    filterOptions: (option) => option,
  })

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
                  {isLoadingOptions && (
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
            <TagOptionsList getOptionProps={getOptionProps} groupedOptions={groupedOptions} value={value} />
            <Box p={1}>
              <Button fullWidth color="primary" disabled={isSubmitDisabled} variant="contained" onClick={onSave}>
                Zapisz
              </Button>
            </Box>
          </List>
        </Grid>
      )}
      {!show && (
        <Grid item xs={12}>
          <Box position="relative">
            <Loader isLoading={isLoadingData} />
            <TagChipList data={data} isError={isError} onDelete={onDelete} />
          </Box>
        </Grid>
      )}
    </Grid>
  )
}
