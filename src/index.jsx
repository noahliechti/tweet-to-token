import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Form, Input, Select } from "rfv";

import "./style.scss";
// import handler from "../take-screenshot/take-screenshot";

// console.log(handler);

// const options = {
//   method: "POST",
//   headers: { "Content-Type": "application/json; charset=utf-8" },
//   body: JSON.stringify({
//     pageToScreenshot:
//       "https://twitter.com/Rainmaker1973/status/1478285768493834240",
//   }),
// };
fetch("./take-screenshot/take-screenshot", options)
  .then((res) => res.json())
  .then((res) => {
    console.log("worked");
  })
  .catch((err) => {
    console.log(err);
    document.getElementById("result").textContent = `Error: ${err.toString()}`;
  });

const apiURL =
  process.env.REACT_APP_ENV === "development"
    ? "http://localhost:3000"
    : "http://get-tweet-data-image.herokuapp.com";
console.log(apiURL, process.env.REACT_APP_ENV);

const validations = {
  empty: [
    {
      rule: "isLength",
      args: { min: 1 },
      invalidFeedback: "Please provide a value",
    },
  ],
};

const App = () => {
  const [imageData, setImageData] = useState();

  const [formIsSubmitting, setFormIsSubmitting] = useState(false);
  const onSubmit = (res) => {
    if (res.isFormValid) {
      setImageData("");
      setFormIsSubmitting(true);
    }
  };
  const postSubmit = (res) => {
    console.log("post submit", res.items, res.data);
    setFormIsSubmitting(false);
    setImageData(res.data);
  };

  const saveBase64AsFile = (base64, fileName) => {
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.setAttribute("type", "hidden");
    link.href = `data:text/plain;base64, ${base64}`;
    link.download = fileName;
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        postSubmit={postSubmit}
        postOptions={{
          method: "post",
          url: "/.netlify/functions/take-screenshot",
        }}
      >
        <fieldset disabled={formIsSubmitting}>
          <div className="narrowInputs one">
            <div className="inputWrapper">
              <label htmlFor="tweetURL">Tweet URL</label>
              <div className="inputWithButton">
                <Input
                  type="text"
                  id="tweetURL"
                  name="tweetURL"
                  validations={validations.empty}
                  placeholder="https://twitter.com/ozgrozer/status/1355138534777245697"
                />

                <button type="submit" className="submitButton">
                  <i className="icon icon-navigate_next" />
                </button>
              </div>
            </div>
          </div>

          <div className="narrowInputs two">
            <div className="inputWrapper">
              <label htmlFor="theme">Theme</label>
              <Select id="theme" name="theme" value="light">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </Select>
            </div>

            <div className="inputWrapper">
              <label htmlFor="lang">Lang</label>
              <Select id="lang" name="lang" value="en">
                <option value="en">en</option>
                <option value="de">de</option>
              </Select>
            </div>
          </div>

          <div className="generatedImageWrapper">
            {imageData ? (
              <div>
                <img
                  className="generatedImage"
                  src={`data:image/png;base64,${imageData}`}
                />

                <button
                  type="button"
                  className="saveImageButton"
                  onClick={() => saveBase64AsFile(imageData, "tweet.png")}
                >
                  <i className="icon icon-file_download" />
                </button>
              </div>
            ) : (
              <div className="helpText">
                {formIsSubmitting ? (
                  <div>Loading...</div>
                ) : (
                  <div>Type the tweet URL above</div>
                )}
              </div>
            )}
          </div>
        </fieldset>
      </Form>

      <div className="socials">
        <a href="https://github.com/ozgrozer" target="_blank" rel="noreferrer">
          <i className="icon icon-github" />
        </a>

        <a href="https://twitter.com/ozgrozer" target="_blank" rel="noreferrer">
          <i className="icon icon-twitter" />
        </a>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
