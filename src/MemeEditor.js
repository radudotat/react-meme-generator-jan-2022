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

function formatUrl(api, textTemplate, textTop, textBottom) {
  return `${api}/${textTemplate}/${textTop.replaceAll(
    ' ',
    '_',
  )}/${textBottom.replaceAll(' ', '_')}.png`;
}

export default function MemeEditor() {
  const api = 'https://api.memegen.link/images';

  const [textTop, setTextTop] = useState('_');
  const [textBottom, setTextBottom] = useState('_');
  const [textTemplate, setTextTemplate] = useState('joker');
  const [imagePreview, setImagePreview] = useState(api);

  /* let template = textTemplate; */

  function preloadImage(url) {
    /* console.log('preloadImage', url); */
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
      // Use a timeout - otherwise the loop will run instantly
      // and you will be left with the last value
      const timeout = setTimeout(
        () => {
          /* console.log('textTemplate', textTemplate); */
          const urlParams = `${formatUrl(
            api,
            textTemplate,
            textTop,
            textBottom,
          )}?height=600&width=600`;
          preloadImage(urlParams);
        },
        // 500ms timeout
        500,
      );
      return () => clearTimeout(timeout);
    },
    // Call the function every time the imagePreview changes
    [imagePreview, textTemplate, textBottom, textTop],
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
            e.preventDefault();
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
            e.preventDefault();
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
            e.preventDefault();
            const currentValue = e.target.value;
            setTextTemplate(currentValue);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const currentValue = e.target.value;
              /* console.log('Pressed Enter > ', currentValue); */
              setTextTemplate(currentValue);
            }
          }}
        />
      </label>
      <button
        onClick={(e) => {
          e.preventDefault();
          /* template = textTemplate; */
          const downloadUrl = `${formatUrl(
            api,
            textTemplate,
            textTop,
            textBottom,
          )}?height=600&width=600`;
          fetch(downloadUrl)
            .then((response) => response.blob())
            .then((blob) => {
              /* console.log(blob); */
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'meme-generator.png';
              document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
              a.click();
              a.remove(); // afterwards we remove the element again
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      >
        Download
      </button>
    </form>
  );
}
