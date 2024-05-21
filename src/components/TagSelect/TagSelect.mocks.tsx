import type { Tag } from "@api/tags/useTagsQuery"
import { TagSelect } from "@components/TagSelect/TagSelect"
import { fireEvent, screen } from "@test-utils/custom-render"
import { mapTagToOption } from "@views/TagsView/utils"
import { useState } from "react"

export const tagsMock = [
  { id: 1, title: "JavaScript", occurrence: 15 },
  { id: 2, title: "React", occurrence: 10 },
  { id: 3, title: "TypeScript", occurrence: 8 },
  { id: 4, title: "HTML", occurrence: 20 },
  { id: 5, title: "CSS", occurrence: 18 },
  { id: 6, title: "Node.js", occurrence: 12 },
  { id: 7, title: "Express.js", occurrence: 7 },
  { id: 8, title: "MongoDB", occurrence: 5 },
  { id: 9, title: "Redux", occurrence: 9 },
  { id: 10, title: "Webpack", occurrence: 6 },
  { id: 11, title: "Babel", occurrence: 4 },
  { id: 12, title: "Vue.js", occurrence: 3 },
  { id: 13, title: "Angular", occurrence: 2 },
  { id: 14, title: "Sass", occurrence: 4 },
  { id: 15, title: "Bootstrap", occurrence: 8 },
  { id: 16, title: "Jest", occurrence: 7 },
  { id: 17, title: "Cypress", occurrence: 3 },
  { id: 18, title: "Docker", occurrence: 5 },
  { id: 19, title: "GraphQL", occurrence: 6 },
  { id: 20, title: "REST", occurrence: 10 },
] as const satisfies Tag[]

export const optionsMock = mapTagToOption(tagsMock)

const buttons = {
  newProps: "new props button",
  initError: "set init error button",
  optionsError: "set options error button",
}

export const setup = {
  changeStateHandler: (action: keyof typeof buttons) => fireEvent.click(screen.getByText(buttons[action])),
  Component: () => {
    const [values, setValues] = useState(optionsMock)
    const [isInitValuesError, setIsInitValuesError] = useState(false)
    const [isOptionsError, setIsOptionsError] = useState(false)
    return (
      <>
        <button
          onClick={() => {
            setValues(optionsMock.slice(0, 1))
          }}
        >
          {buttons.newProps}
        </button>
        <button
          onClick={() => {
            setIsInitValuesError(true)
          }}
        >
          {buttons.initError}
        </button>
        <button
          onClick={() => {
            setIsOptionsError(true)
          }}
        >
          {buttons.optionsError}
        </button>
        <TagSelect
          initValues={values}
          isError={isOptionsError}
          isErrorInitValues={isInitValuesError}
          options={optionsMock}
        />
      </>
    )
  },
}
