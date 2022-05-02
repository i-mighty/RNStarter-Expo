[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
![Build With TravisCI](https://travis-ci.org/i-mighty/RNStarter.svg?branch=master)
![Typed with TypeScript](https://flat.badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=blue&color=555555)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

# React Native Starter

<p style="text-align: center;"> ✨ A React Native Starter with 10+ commonly used libraries ✨ </p>

![RNStarter](https://dev-to-uploads.s3.amazonaws.com/i/tiwmovsyxzf5oal0hkwn.png)

## Overview

Anyone who had to setup a React Native project from scratch would agree that it takes a lot of time and really can be quite some stress. This project contains a very easy to use React Native boilerplate for your next app. This project was made from the ground to be robust and very flexible, so it is easy to add new libraries as well remove unused libraries from the initial setup. The initial setup contains: 

- React Native
- Typescript
- [NativeBase](#nativeBase)
- [Styled Components](#styled-components)
- [React Navigation](#react-navigation)
- [Redux](#store)
- [Redux-Saga](#store)
- [Apisauce](#apisauce)
- [Testing Library](#testing-library)
- [Detox](#detox)
- [ESLint and Prettier with pre-commit hooks](#eslint-and-prettier)

## Setting Up

First up, clone the repository

```
git clone https://github.com/i-mighty/RNStarter
```

### Renaming the App

Before proceeding, you might want to rename your app. For that, run

```
yarn rename "Your New App Name"
```

Next in rename your package folder in androidTest and change the package name in your DetoxTest.java folder to match the new package name

```
package Your New Package Name;

import com.wix.detox.Detox;
//Rest of the DetoxTest.java file
```

### Installation

Install the app dependencies by running

```
yarn install
```

That's literally all there is to it. you should be ready to deploy for your device platform

```
yarn run android // for android devices
```

```
yarn run ios // for ios devices
```

### Linking

With RN 0.60+, there is no need for manual linking at all as most libraries are automatically linked. NativeBase however is yet to implement automatic linking so we still have to resort to manually linking it (hopefully they do that soon). To link NativeBase assets files, run

```
react-native link native-base
```

### Directories

The project uses an absolute path resolution system for all files (thanks to tsconfig baseUrl and path). The baseUrl is the `src` folder and the root path alias is `@src`. For example the store is imported as `@src/stores`. If you wish to change this default configuration, edit the following parts of the `tsconfig` file.

```
"compilerOptions":{
  ...
  "baseUrl": "./src",
  "paths": {
  	"@src/": ["*"]
  }
  ...
}
```

## Customizations

### NativeBase

All customizations for NativeBase are in the `native-base-theme` folder. The changes and modification for styling are usually made to the `platform` variables file. Changes can also be made to the individual component files themselves. Any of the variable files can be used for styling. After updating your style variables, be sure to pass your style variable to the StyleProvider. The following code already exists in the project for passing styles to the app root

```
import { StyleProvider } from 'native-base';
import getTheme from '@src/native-base-theme/components';
import platform from '@src/native-base-theme/variables/platform';

<StyleProvider style={getTheme(platform)}>
 {
  //Rest of the app to be wrapped with a style provider
 }
</StyleProvider>
```

**NB:** The order in which the HOC are arranged in `src/App.tsx` is super important to ensure that it all work well. It is advised not to change the order at all (except of course you are totally sure of what you are doing).

Checkout the NativeBase documentation [here](https://docs.nativebase.io/Customize.html) for more explanation

Also to use the Toast from NativeBase (used by default to report errors and messages), we need to add another wrapper to the root component of our application.

```
import { Root } from 'native-base';

<Root>
  {
   // Root component for the application
  }
</Root>
```

This component has also been handled and you might never have to change it. Please refer to the docs here to get a deeper understanding.

##### Further Reference:

- Official NativeBase [documentation](https://docs.nativebase.io/)

### Styled Components

Styled components requires just a simple object to contain all variables passed. Values passed to styled-components are contained in `utils/theme` and can be customized to contain anything you want. Currently it contains `vars` for color and `dimens` for values used in various places within your app. Next up add your theme object to your

```
import { ThemeProvider } from 'styled-components/native';

<ThemeProvider theme={theme}>
  {
  	//Wrapped app component
  }
</ThemeProvider>
```

Please note that all the imports are from `styled-components/native` . For example, to make a Styled Component from the React Native Text component, here is how the code would be.

```
import styled from 'styled-components/native';
import { Text } from 'react-native';

const TitleText = styled(Text)<{ color?: string }>`
  font-size: 21px;
  color: ${({ theme, color }) => (color ? color : theme.vars.black)};
`;
```

As you can see, we can perform almost any kind of logic can within the styled components. Thanks to the template literals (backticks).

##### Further Reference:

- Official Styled Components [documentation](https://styled-components.com/docs)
- Styled Components for React Native [documentation](https://styled-components.com/docs/basics#react-native)

### React Navigation

Navigators should be stored in the `navigator` folder with sub-folders and composed into the RootNavigator which is imported into the Root Component. No special configurations were made from the initial React Navigation installation. From here, simply install your desired navigator and get going with ease.

We are starting with a StackNavigator, simply installed by running:

```
yarn add @react-navigation/stack
```

Next up, create your navigator

```
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator mode="modal">
      {
	  	//Stack Screen components e.g <Stack.Screen name="Welcome" component={/*Route component goes here*/} />
	  }
    </Stack.Navigator>
  );
};

```

Then you can export your navigator and create use it where ever as a component within your app.

Further reference can be gotten from the official [documentation](https://reactnavigation.org/docs/getting-started).

### Store

Although there is a lot of ways we can structure our files for stores, actions, sagas and their associated types, I was very intentional on creating a directory structure that was as easy to understanding as it was logically clean. It really should not take much to know where to find what file or folder and how to modify it. That being said, everything related to the app state management store is contained in the `stores` folder which should be further structured into sub-folders for the various parts of the store.

Each sub-folder then should contain files for actions. reducers, sagas and types. If there are multiple files of each kind for a single store, sub-folders can be used for actions, sagas, reducers and types.

An example structure for an hypothetical user authentication system would be

```
|-src
  |-stores
     |-auth
       |-actions
          login.actions.ts
          register.actions.ts
       |-reducers
       	  index.ts
          login.reducer.ts
          register.reducer.ts
       |-sagas
          index.ts
          login.sagas.ts
          register.saga.ts
       |-types
          login.types.ts
          register.types.ts
       index.ts
```

I know there are a lot of opinions as regards how to structure the store folders and connect the components. However, I made the current structure to be very intuitive for even anyone who knows the first thing about Redux stores.

Another hard choice I had to make was to Redux-Saga instead of Redux Thunk for side effects. Despite the obvious popularity of Redux Thunk, I personally prefer the easy to understand and very declarative syntax of Redux-Saga. It is straight forward and makes it easier to read through the code (once you have an understanding of the generator functions and how they work) by implementing complex logics in what looks like pure functions. Redux-Saga also have a lot of helpful functions that provide informations about the actions and awesome selectors (takeEvery, takeLatest). Redux sagas also are easily attached to and removed from your app as they do not replace your actions in anyway (another plus on ease of understanding).

##### Further Reference

Redux: Official [Documentation](https://redux.js.org/introduction/getting-started), [Middlewares](https://redux.js.org/advanced/middleware),

Redux-Saga: Official [Documentation](https://redux-saga.js.org/),

### Apisauce

Thanks to Infinitered for this awesome library. Apisauce is an easy to use wrapper around the very famous (or infamous) axios HTTP client. Apisauce provides standardized errors and a set of very easy to use libraries. To use Apisauce, simply create a new Apisauce instance. For this project, all API requests and service files can be imported from `@src/services`.

An example has already been made.

```
import { create } from 'apisauce';

const api = create({
  baseURL: 'app/base/url/goes/here', //Replace with your default api baseUrl
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});


```

Then feel free to use the new Apisauce instance anywhere within your application

```
api.get('/request')';
```

Requests can also be made with types

```
api.get<RequestResponseType, RequestErrorType>('/request');
```

All requests return a promise which can be listened for with an `await` within an `async` function.

The Apisauce [documentation](https://github.com/inifinitered/apisauce) contains more information and usage of the functions.

### Testing Library
Coming soon!
### Detox
Comming soon!
## License
MIT

## Contributors ✨
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/i-mighty"><img src="https://avatars0.githubusercontent.com/u/21091694?v=4" width="100px;" alt=""/><br /><sub><b>Adegboye Josiah</b></sub></a><br /><a href="https://github.com/i-mighty/RNStarter/commits?author=i-mighty" title="Tests">⚠️</a> <a href="https://github.com/i-mighty/RNStarter/commits?author=i-mighty" title="Code">💻</a> <a href="#ideas-i-mighty" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-i-mighty" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://rowlandekemezie.com"><img src="https://avatars1.githubusercontent.com/u/15085641?v=4" width="100px;" alt=""/><br /><sub><b>Rowland I. Ekemezie</b></sub></a><br /><a href="#ideas-rowlandekemezie" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/i-mighty/RNStarter/pulls?q=is%3Apr+reviewed-by%3Arowlandekemezie" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/iamNarcisse"><img src="https://avatars2.githubusercontent.com/u/43097772?v=4" width="100px;" alt=""/><br /><sub><b>iamNarcisse</b></sub></a><br /><a href="https://github.com/i-mighty/RNStarter/commits?author=iamNarcisse" title="Tests">⚠️</a> <a href="https://github.com/i-mighty/RNStarter/commits?author=iamNarcisse" title="Code">💻</a> <a href="#platform-iamNarcisse" title="Packaging/porting to new platform">📦</a> <a href="#maintenance-iamNarcisse" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
