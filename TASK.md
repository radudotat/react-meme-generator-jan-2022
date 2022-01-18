Create a web app with React that allows for users to generate and download memes using the https://memegen.link/ website.

It should allow the user to:

- [ ] Enter text for the top and bottom of the meme
  - [ ] The top text box needs to have a label element associated with it containing the text `Top text`
  - [ ] The bottom text box needs to have a label element associated with it with the text `Bottom text`
- [ ] Preview the generated meme
  - [ ] The image element needs to have an html attribute set as follows: `data-test-id="meme-image"`
- [ ] Change the meme template (the background image)
  - [ ] The meme template selector element needs to have a label element associated with it containing the text `Meme template`
  - [ ] If the user clicks on the label of the meme template selector, types the text `doge` and then hits enter, the `doge` meme template needs to be selected
- [ ] Download the meme by clicking on a button
  - [ ] The button element needs to contain the exact text `Download`

## Stretch goals:

- [ ] Reduce the amount of times a meme image is generated (don't generate it every time a user presses a key). Instead, generate a new image when the user clicks a button
  - [ ] The button element needs to have an html attribute set as follows: `data-test-id="generate-meme"`
- [ ] Use a `#`, `?` and `/` in your meme text
- [ ] Save a history of generated meme top text, bottom text, and meme photo type. This history should reappear on refresh of the application.
- [ ] Make your application work offline (without a network connection) with the [PWA capabilities built in to `create-react-app`](https://create-react-app.dev/docs/making-a-progressive-web-app/). Any meme images that were generated while online in the application should be available to be generated again offline as well.
- [ ] Create a favicon that identifies your app: (see [Generating and Adding Favicons](https://learn.upleveled.io/courses/btcmp-l-webfs-gen-0/modules/cheatsheet-design-ux/#generating-and-adding-favicons))

## Acceptance Criteria

- [ ] Preflight runs through without errors in your project
  - [ ] Link in your GitHub repo's About section: Netlify deployed website
- [ ] Link to CodeSandbox in comment below
- [ ] [Drone bot](https://learn.upleveled.io/courses/btcmp-l-webfs-gen-0/modules/cheatsheet-tasks/#upleveled-drone) has been tagged and responded with a passing message
- [ ] Correct GitHub commit message format (see [Writing Commit Messages](https://learn.upleveled.io/courses/btcmp-l-webfs-gen-0/modules/cheatsheet-git-github/#writing-commit-messages))
