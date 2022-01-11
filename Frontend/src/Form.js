import React, { useState } from "react";
import { useUrls } from "./url-context";
import { URL_REGEX, API_URL } from "./Utility";

export default function Form() {
  const [url, setUrl] = useState("");
  const { dispatch, state } = useUrls();
  const urls = state.urls;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUrlValid(url)) {
      fetchShortUrl(url);
      setUrl("");
    } else {
      alert("Please enter correct url");
    }
  };

  const isUrlValid = (url) => {
    return URL_REGEX.test(url);
  };

  const fetchShortUrl = (url) => {
    fetch(`${API_URL}?url=${url}`)
      .then((res) => res.json())
      .then(
        (result) => {
          dispatch({ type: "STORE_URL", url: result.result.short_link });
        },
        (error) => {
          alert(error.error);
        }
      );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>

      {state.urls.length > 0 &&
        urls.map((url, index) => {
          return (
            <>
              <h3 key={index}>
                {url}
                <button onClick={() => navigator.clipboard.writeText(url)}>
                  copy
                </button>
              </h3>
            </>
          );
        })}
    </>
  );
}
