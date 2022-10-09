import { render, screen } from "@testing-library/react";
import Language from "./Language";
import "@testing-library/jest-dom";
import Colors from "~/constants/Colors";
import { BOLD_WEIGHT, EXTRA_BOLD_WEIGHT } from "~/constants/Variables";

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string): string => str,
      i18n: {
        language: "ko-KR"
      }
    };
  }
}));

describe("📂 components/common/Languages/Language", () => {
  // text
  test("🟢 renders label well", () => {
    render(<Language label="한국어" type="ko-KR" />);
    const LanguageText = screen.getByText(/한국어/i);
    expect(LanguageText).toBeInTheDocument();
  });

  test("🔴 renders not render other label well", () => {
    render(<Language label="한국어" type="ko-KR" />);
    const LanguageText = screen.queryByText(/한국 어/i);
    expect(LanguageText).not.toBeInTheDocument();
  });

  // color
  test("🟢 check color when selected", () => {
    render(<Language label="한국어" type="ko-KR" />);
    const LanguageText = screen.getByText(/한국어/i);
    expect(LanguageText).toHaveStyle(`color: ${Colors.green00}`);
  });

  test("🟢 check color when not selected", () => {
    render(<Language label="영어" type="en-US" />);
    const LanguageText = screen.getByText(/영어/i);
    expect(LanguageText).toHaveStyle(`color: ${Colors.black}`);
  });

  test("🔴 check color when selected", () => {
    render(<Language label="한국어" type="ko-KR" />);
    const LanguageText = screen.getByText(/한국어/i);
    expect(LanguageText).not.toHaveStyle(`color: ${Colors.white}`);
  });

  test("🔴 check color when not selected", () => {
    render(<Language label="영어" type="en-US" />);
    const LanguageText = screen.getByText(/영어/i);
    expect(LanguageText).not.toHaveStyle(`color: ${Colors.green00}`);
  });

  // weight
  test("🟢 check font weight when selected", () => {
    render(<Language label="한국어" type="ko-KR" />);
    const LanguageText = screen.getByText(/한국어/i);
    expect(LanguageText).toHaveStyle(`font-weight: ${EXTRA_BOLD_WEIGHT}`);
  });

  test("🟢 check font weight when not selected", () => {
    render(<Language label="영어" type="en-US" />);
    const LanguageText = screen.getByText(/영어/i);
    expect(LanguageText).toHaveStyle(`font-weight: ${BOLD_WEIGHT}`);
  });

  test("🔴 check font weight when selected", () => {
    render(<Language label="한국어" type="ko-KR" />);
    const LanguageText = screen.getByText(/한국어/i);
    expect(LanguageText).not.toHaveStyle(`font-weight: ${BOLD_WEIGHT}`);
  });

  test("🔴 check font weight when not selected", () => {
    render(<Language label="영어" type="en-US" />);
    const LanguageText = screen.getByText(/영어/i);
    expect(LanguageText).not.toHaveStyle(`font-weight: ${EXTRA_BOLD_WEIGHT}`);
  });
});
