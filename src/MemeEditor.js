/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

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

const api = 'https://api.memegen.link/images/preview.jpg';

/* const preloadedImageUrls = new Set(); */

export default function MemeEditor() {
  const [textTop, setTextTop] = useState('');
  const [textBottom, setTextBottom] = useState('');
  const [textTemplate, setTextTemplate] = useState('joker');
  let template = textTemplate;

  const [imagePreview, setImagePreview] = useState(
    'https://api.memegen.link/images/preview.jpg',
  );

  function preloadImage(url) {
    let resUrl = {};

    void fetch(url)
      .then((response) => {
        resUrl = response.url;
        setImagePreview(resUrl);
      })
      .then((data) => console.log('data', data));
  }

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
            setTextTop(e.target.value);
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
            setTextBottom(e.target.value);
          }}
        />
      </label>
      <label id="meme-template">
        Meme template
        <input
          css={styleInputs}
          /* onChange={(e) => {
            setTextTemplate(e.target.value);
          }} */
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              template = e.target.value;
              console.log('Pressed Enter > ', template);

              const urlParams = `${api}?template=${template}&lines[]=${textTop}&lines[]=${textBottom}`;

              preloadImage(urlParams);
            }
          }}
        />
      </label>
      <button
        onClick={() => {
          setTextTemplate('joker');
          template = textTemplate;
          const urlParams = `${api}?template=${template}&lines[]=${textTop}&lines[]=${textBottom}`;

          preloadImage(urlParams);
        }}
      >
        Preview
      </button>
      <button
        onClick={() => {
          template = textTemplate;
          const urlParams = `${api}?template=${template}&lines[]=${textTop}&lines[]=${textBottom}`;

          preloadImage(urlParams);
        }}
      >
        Download
      </button>
    </form>
  );
}
