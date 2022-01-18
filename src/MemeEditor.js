/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const styleInputs = css`
  display: block;
  color: black;
  border: solid 1px gray;
  text-align: center;
  height: 2em;
  text-align: center;
  margin: auto;
`;

const styleImg = css`
  display: block;
  margin: 0.25em;
`;

/* const preloadedImageUrls = new Set(); */

export default function MemeEditor() {
  const api = 'https://api.memegen.link/images/preview.jpg';

  const [textTop, setTextTop] = useState('');
  const [textBottom, setTextBottom] = useState('');
  const [textTemplate, setTextTemplate] = useState('joker');
  const [imagePreview, setImagePreview] = useState(api);

  let template = textTemplate;

  function preloadImage(url) {
    let resUrl = {};

    fetch(url)
      .then((response) => {
        resUrl = response.url;
        setImagePreview(resUrl);
      })
      .then((data) => console.log('data', data))
      .catch(() => {});
  }

  useEffect(
    () => {
      const urlParams = `${api}?template=${template}&lines[]=${textTop}&lines[]=${textBottom}`;
      preloadImage(urlParams);
    },
    // Call the function every time the imagePreview changes
    [imagePreview, template, textBottom, textTop],
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label id="meme-top">
        Top text
        <input
          css={styleInputs}
          onChange={(e) => {
            const currentValue = e.target.value;
            setTextTop(currentValue);
          }}
        />
      </label>
      <img
        css={styleImg}
        src={imagePreview}
        alt="meme"
        data-test-id="meme-image"
      />
      <label id="meme-bottom">
        Bottom text
        <input
          css={styleInputs}
          onChange={(e) => {
            const currentValue = e.target.value;
            setTextBottom(currentValue);
          }}
        />
      </label>
      <label id="meme-template">
        Meme template
        <input
          css={styleInputs}
          onChange={(e) => {
            const currentValue = e.target.value;
            setTextTemplate(currentValue);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              e.stopPropagation();
              const currentValue = e.target.value;
              console.log('Pressed Enter > ', currentValue);
              setTextTemplate(currentValue);
            }
          }}
        />
      </label>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          template = textTemplate;
          const downloadUrl = `${api}?template=${template}&lines[]=${textTop}&lines[]=${textBottom}`;
          fetch(downloadUrl)
            .then((response) => {
              /* console.log(response, response.blob()); */
              const json = JSON.stringify(response);
              const blob = new Blob([json], { type: 'octet/stream' });
              const url = window.URL.createObjectURL(blob);
              window.location.assign(url);
            })
            .then((data) => console.log('data', data))
            .catch(() => {});
        }}
      >
        Download
      </button>
    </form>
  );
}
