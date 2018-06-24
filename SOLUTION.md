# Solution Docs

### NEW API

```
new ApiRequestAutocomplete(document.getElementById('gh-user'), {
  numOfResults: 10,
  url: 'https://api.github.com/search/users',
  onSelect: (ghUserId, ghUser, input, list) => {
    input.value = ghUser;
    list.innerHTML = '';
  },
});

```

1. In the new api, the user can pass a `url` that is used by the api.
2. Then the `onSelect` method was modified. The method takes in `ghUser, input, and list`.
3. Just an added feature, when a user selects (via clicks) the user's name, it then adds the name as the input and removes the list. 
4. 




The same steps to run the application still apply: 
1. Run `npm install`
2. Run `npm start` (runs `webpack-dev-server`)
3. Open `http://localhost:8080` on your browser.


### Solution

1. For step one I created an exhance component called `ApiRequestAutocomplete` which extends from `Autocomplete`. The enhanced component works with either a HTTP source, not both. While the regular `Autocomplete` works with a data array. 

2. As for the keyboard shortcuts, I was able to hook `up, down, and enter` for users who have inputed data. Since the feature would need to work on state and the new enhanced component. I added the feature to `Autocomplete` for that it is inherited in `ApiRequestAutocomplete`. 



## Requirements (UPDATED)

- [x] The component should be reusable. It should be possible to have multiple
  instances of the component on the same page.
- [x] The "States" example that uses a data array should continue to work.
- The component should accept any HTTP endpoint, not just the
  `https://api.github.com/users` example above.
- [x] Your component should work correctly in Chrome, don’t worry about
  cross-browser compatibility.
- [x]You can use small DOM helpers like jQuery or utilities from Lodash, but not
  larger libraries/frameworks like React, Angular or Vue.js
- [x] You don't need to preserve any of the existing code; feel free to modify them
  as you wish.
- [x] New APIs should be documented in `SOLUTION.md`.
