/* eslint-disable jest/valid-title */
import fs from "fs"
import { renderToString } from "katex"
import MarkdownIt from "markdown-it"
import dollarmathPlugin from "../src"

/** Read a "fixtures" file, containing a set of tests:
 *
 * test name
 * .
 * input text
 * .
 * expected output
 * .
 *
 * */
function readFixtures(name: string): string[][] {
  const fixtures = fs.readFileSync(`tests/fixtures/${name}.md`).toString()
  return fixtures.split("\n.\n\n").map(s => s.split("\n.\n"))
}

describe("Parses basic", () => {
  readFixtures("basic").forEach(([name, text, expected]) => {
    const mdit = MarkdownIt("commonmark").use(dollarmathPlugin, {
      allow_space: false,
      allow_digits: false,
      double_inline: true,
      allow_labels: true
    })
    const rendered = mdit.render(text)
    it(name, () => expect(rendered.trim()).toEqual(expected.trim()))
  })

  readFixtures("katex").forEach(([name, text, expected]) => {
    const mdit = MarkdownIt("commonmark").use(dollarmathPlugin, {
      allow_space: false,
      allow_digits: false,
      double_inline: true,
      allow_labels: true,
      renderer: renderToString,
      optionsInline: { throwOnError: false, displayMode: false },
      optionsBlock: { throwOnError: false, displayMode: true }
    })
    let rendered = mdit.render(text)
    // remove styles
    rendered = rendered.replace(/style="[^"]+"/g, 'style=""')
    // console.log(rendered)
    it(name, () => expect(rendered.trim()).toEqual(expected.trim()))
  })
})
