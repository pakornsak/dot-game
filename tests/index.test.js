require("@testing-library/jest-dom/extend-expect");
const fs = require("fs");
const { JSDOM } = require("jsdom");
const path = require("path");

describe("index.html", () => {
  const html = fs.readFileSync(path.resolve(__dirname, "../views/index.html"), "utf8");
  let dom;
  let container;

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    container = dom.window.document.body;
  });

  it("should render correctly", () => {
    expect(container.querySelector("#score")).toBeInTheDocument();
    expect(container.querySelector("#slider")).toBeInTheDocument();
    expect(container.querySelector("#speed")).toBeInTheDocument();
    expect(container.querySelector("#board")).toBeInTheDocument();
  });
});
