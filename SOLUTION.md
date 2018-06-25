# Solution Docs

The same steps to run the application still apply: 
1. Run `npm install`
2. Run `npm start` (runs `webpack-dev-server`)
3. Open `http://localhost:8080` on your browser.

### NEW API Request class

```
new ApiRequestAutocomplete(document.getElementById('gh-user'), {
  numOfResults: 10,
  url: 'https://api.github.com/search/users',
  onSelect: (ghUserId, ghUser, input, list) => {
    const updatedInputWithUser = input;
    const removeList = list;
    updatedInputWithUser.value = ghUser;
    removeList.innerHTML = '';
  },
});
```

1. I extended the class for Autocomplete for ApiRequestAutocomplete, the user can pass a `url` that is used by the api. The numOfResults still functions properly and is able to set the requested number of results from github. 
2. The `onSelect` method was also modified. The method takes in `ghUserId, ghUser, input, list`.
3. Just an added feature, when a user selects (via clicks) the user's name, it then adds the name as the input and removes the list(this can be removed and the desired functionality will still work. )

### Solution

1. For step one I created an exhance component called `ApiRequestAutocomplete` which extends from `Autocomplete`. The enhanced component works with either a HTTP source, not both. While the regular `Autocomplete` works with a data array. 

2. As for the keyboard shortcuts, I was able to hook `up, down, and enter` for users who have inputed data. Since the feature would need to work on state and the new enhanced component. I added the feature to `Autocomplete` for that it is inherited in `ApiRequestAutocomplete`. 


## Requirements (UPDATED)

- [x] The component should be reusable. It should be possible to have multiple
  instances of the component on the same page.
- [x] The "States" example that uses a data array should continue to work.
- The component should accept any HTTP endpoint, not just the
  `https://api.github.com/users` example above. 
  `This proved longer to do with the allot time. When I ran through the through process, I would crate an array of objects that would be passed to the new component and the component would take the key and value and pass they as url paraments. With this thought process I ran into an issue that would complicate things if the data we needed would be nested. Take the github api for example. We need to map the array it items in order to displace them in the results list. So the varied data structures would complicated how the data is passed to component, so I spent time mapping it solely for the github api for this scenerio. `
- [x] Your component should work correctly in Chrome, don’t worry about
  cross-browser compatibility.
- [x] You can use small DOM helpers like jQuery or utilities from Lodash, but not
  larger libraries/frameworks like React, Angular or Vue.js
- [x] You don't need to preserve any of the existing code; feel free to modify them
  as you wish.
- [x] New APIs should be documented in `SOLUTION.md`.
