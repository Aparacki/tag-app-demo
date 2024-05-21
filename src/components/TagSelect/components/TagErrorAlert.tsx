import { Alert } from "@components/common/Alert"

export interface Props {}

export const TagErrorAlert = () => {
  return (
    <Alert severity="error" variant="standard">
      Błąd pobierania tagów
    </Alert>
  )
}
