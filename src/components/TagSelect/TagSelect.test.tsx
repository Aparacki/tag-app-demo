import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@test-utils/custom-render"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"

import { TagSelect } from "./TagSelect"
import * as mock from "./TagSelect.mocks"

const { optionsMock } = mock

describe("TagSelect Component Tests", () => {
  afterEach(() => {
    cleanup()
  })
  const searchInput = () => screen.getByPlaceholderText("Wyszukaj grupę lub tag")
  const saveButton = () => screen.getByText("zapisz", { exact: false })

  it("should render initial tags correctly", () => {
    act(() => {
      render(<TagSelect initValues={optionsMock} options={[]} />)
    })
    const chip1 = screen.getByText("JavaScript")
    const chip2 = screen.getByText("Angular")
    expect([chip1, chip2]).toHaveLength(2)
  })

  it("should render correctly with no initial tags", () => {
    act(() => {
      render(<TagSelect options={[]} />)
    })
    const item = screen.getByText("Brak tagów")
    expect(item).toBeTruthy()
  })

  it("should handle search input and submit callbacks correctly", async () => {
    const onSubmit = vi.fn()
    const onChangeInput = vi.fn()

    render(
      <TagSelect initValues={optionsMock} options={optionsMock} onChangeInput={onChangeInput} onSubmit={onSubmit} />
    )
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
    expect(screen.getByTestId("tag-select-options-list")).toBeTruthy()
    const firstTag = () => screen.getByText("HTML")
    const secondTag = () => screen.getByText("CSS")

    fireEvent.click(firstTag())
    fireEvent.click(secondTag())
    fireEvent.click(saveButton())
    expect(screen.queryByText("tag-select-options-list")).toBeNull()
    const chip1 = screen.getByText("HTML")
    const chip2 = screen.getByText("CSS")
    expect([chip1, chip2]).toHaveLength(2)

    await userEvent.click(searchInput())
    fireEvent.click(firstTag())
    fireEvent.click(saveButton())
    expect(screen.getByText("CSS")).toBeTruthy()
    expect(screen.queryByText("HTML")).toBeNull()
  })

  it("should remove tags correctly", () => {
    const onSubmit = vi.fn()

    render(<TagSelect initValues={optionsMock.slice(0, 2)} options={optionsMock} onSubmit={onSubmit} />)
    const removeButtons = () => within(screen.getByTestId("tag-select-chips-list")).queryAllByTestId("CancelIcon")

    removeButtons().map((element) => fireEvent.click(element))

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(removeButtons()).toHaveLength(0)
  })

  it("should open and close the tag list when clicking on the search input", async () => {
    render(<TagSelect options={optionsMock} />)
    await userEvent.click(searchInput())
    expect(screen.getByTestId("tag-select-options-list")).toBeTruthy()
    await userEvent.click(searchInput())
    expect(screen.queryByText("tag-select-options-list")).toBeNull()
  })

  it("should render new tags correctly when initial values prop change", () => {
    const { Component, changeInitialValuesHandler } = mock.setup
    render(<Component />)
    expect(screen.getByText("JavaScript")).toBeTruthy()
    expect(screen.getByText("CSS")).toBeTruthy()
    expect(screen.getByText("React")).toBeTruthy()
    changeInitialValuesHandler()
    expect(screen.getByText("JavaScript")).toBeTruthy()
    expect(screen.queryByText("CSS")).toBeNull()
    expect(screen.queryByText("React")).toBeNull()
  })
})
