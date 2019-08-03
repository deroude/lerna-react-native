## Credits

Based loosely on [this](https://michalzalecki.com/solve-code-sharing-and-setup-project-with-lerna-and-monorepo/) article and the [mostly useless Metro configuration docs](https://facebook.github.io/metro/docs/en/configuration) ; the [code](https://github.com/facebook/metro/blob/master/packages/metro-resolver/src/resolve.js) was more useful.

## Getting started

In the root folder:

```lerna bootstrap --hoist --nohoist=react-native```

We need the `nohoist` option because we will invoke react native CLI from each folder and it will fail miserably otherwise.

This command will gather all the dependencies, except react-native to a single `node_modules` folder in the root of the project.

Now, you can go to either the `packages/investify` or the `packages/whitelabel` folders and run:

```react-native run-android```

## Useful info

In Windows, the metro cache is located at `%appdata%\Local\Temp\metro-cache`. Just delete that folder if you have a feeling your changes aren't reflected.