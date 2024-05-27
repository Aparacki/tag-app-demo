import { cleanup, fireEvent, render, screen, waitFor, within } from "@test-utils/custom-render"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"

import { TagSelect } from "./TagSelect"
import * as mock from "./TagSelect.mocks"

const { optionsMock } = mock

describe("TagSelect Component Tests", () => {
  afterEach(() => {
    cleanup()
  })
  const SELECT_OPTIONS_LIST_ID = "tag-select-options-list"
  const searchInput = () => screen.getByPlaceholderText("Wyszukaj grupę lub tag")
  const saveButton = () => screen.getByText("zapisz", { exact: false })

  it("should render initial tags correctly", () => {
    render(<TagSelect data={optionsMock} options={[]} />)

    const chip1 = screen.getByText("JavaScript")
    const chip2 = screen.getByText("Angular")
    expect([chip1, chip2]).toHaveLength(2)
  })

  it("should render correctly with no initial tags", () => {
    render(<TagSelect options={[]} />)
    const item = screen.getByText("Brak tagów")
    expect(item).toBeTruthy()
  })

  it("should handle search input and submit callbacks correctly", async () => {
    const onSubmit = vi.fn()
    const onChangeInput = vi.fn()

    render(<TagSelect data={optionsMock} options={optionsMock} onChangeInput={onChangeInput} onSubmit={onSubmit} />)

    fireEvent.click(searchInput())
    await userEvent.type(searchInput(), "jav")
    await waitFor(() => {
      expect(onChangeInput).toHaveBeenCalledWith("jav")
    })

    fireEvent.click(saveButton())
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(optionsMock)
    })
  })

  it("should check, save, uncheck, and save tags correctly", async () => {
    render(<TagSelect options={optionsMock} />)

    await userEvent.click(searchInput())
    expect(screen.getByTestId(SELECT_OPTIONS_LIST_ID)).toBeTruthy()
    const firstTag = () => screen.getByText("HTML")
    const secondTag = () => screen.getByText("CSS")

    fireEvent.click(firstTag())
    fireEvent.click(secondTag())
    fireEvent.click(saveButton())
    expect(screen.queryByText(SELECT_OPTIONS_LIST_ID)).toBeNull()
    const chip1 = screen.getByText("HTML")
    const chip2 = screen.getByText("CSS")
    expect([chip1, chip2]).toHaveLength(2)

    await userEvent.click(searchInput(), {})
    fireEvent.click(firstTag())
    fireEvent.click(saveButton())
    expect(screen.getByText("CSS")).toBeTruthy()
    expect(screen.queryByText("HTML")).toBeNull()
  })

  it("should remove tags correctly", () => {
    const onSubmit = vi.fn()

    render(<TagSelect data={optionsMock.slice(0, 2)} options={optionsMock} onSubmit={onSubmit} />)

    const removeButtons = () => within(screen.getByTestId("tag-select-chips-list")).queryAllByTestId("CancelIcon")
    removeButtons().map((element) => fireEvent.click(element))

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(removeButtons()).toHaveLength(0)
  })

  it("should open the tag list when clicking on the search input and close on escape key click", async () => {
    render(<TagSelect options={optionsMock} />)

    await userEvent.click(searchInput())
    expect(screen.getByTestId(SELECT_OPTIONS_LIST_ID)).toBeTruthy()

    await userEvent.keyboard("{esc}")
    expect(screen.queryByText(SELECT_OPTIONS_LIST_ID)).toBeNull()
  })

  it("should render new tags correctly when initial values prop change", () => {
    const { Component, changeStateHandler } = mock.setup
    render(<Component />)

    expect(screen.getByText("JavaScript")).toBeTruthy()
    expect(screen.getByText("CSS")).toBeTruthy()
    expect(screen.getByText("React")).toBeTruthy()

    changeStateHandler("newProps")
    expect(screen.getByText("JavaScript")).toBeTruthy()
    expect(screen.queryByText("CSS")).toBeNull()
    expect(screen.queryByText("React")).toBeNull()
  })

  it("should render error info and block submitting on initial data retrieval error", async () => {
    const { Component, changeStateHandler } = mock.setup
    render(<Component />)

    expect(screen.getByText("JavaScript")).toBeTruthy()

    changeStateHandler("initError")
    expect(screen.queryByText("Błąd pobierania tagów")).toBeTruthy()
    expect(screen.queryByText("JavaScript")).toBeNull()

    await userEvent.click(searchInput())
    expect(screen.getByTestId(SELECT_OPTIONS_LIST_ID)).toBeTruthy()
    expect(screen.findByText("Błąd pobierania tagów")).toBeTruthy()
    expect(saveButton()).toBeDisabled()
  })

  it("should render error info and block submitting while rendering options list", async () => {
    const { Component, changeStateHandler } = mock.setup
    render(<Component />)

    expect(screen.getByText("JavaScript")).toBeTruthy()

    await userEvent.click(searchInput())
    expect(screen.getByTestId(SELECT_OPTIONS_LIST_ID)).toBeTruthy()
    expect(screen.getByText("JavaScript")).toBeTruthy()

    changeStateHandler("optionsError")
    expect(screen.queryByText("Błąd pobierania tagów")).toBeTruthy()
    expect(screen.queryByText("JavaScript")).toBeNull()
    expect(saveButton()).toBeDisabled()

    await userEvent.keyboard("{esc}")
    expect(screen.findByText("JavaScript")).toBeTruthy()
  })
})
