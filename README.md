# aimo-ui

A collection of useful react components

## Contents

- [What is this?](#what-is-this)
- [Install](#install)
- [Use](#use)
- [Components](#components)
- [License](#license)

## What is this?

**Aimo-UI** is a collection of some useful [React][] components which can be used easily in any react application. It's still a work-in-progress and has a long way to get perfect. Also, I accept any suggestions for other useful components to add to this collection.

## Install

To install **aimo-ui** package in react (requires version > 18.0.0), you can use [yarn][]:

```sh
yarn install aimo-ui
```

or [npm][]:

```sh
npm install aimo-ui
```

## Use

In order to use aimo-ui components, you can either import the **Aimo** super-component, and use components as a part of **Aimo**:

```js
import  Aimo  from  "aimo-ui";
...
const  App= () => {
    return (
        <div  className="appContainer">
            <Aimo.AimoSideMenu
                headerText="Aimo-UI Components"
				menuItems={menuItems}
			/>
			<div  className="appBody">
				<h1  className="appTitle">
					<Aimo.AimoIcon  name="sitemap"  className="appTitleIcon"  />
					Welcome to Aimo-UI Component Library Tutorial
				</h1>
			</div>
	    </div>
    );
};
```

or import only the specific components that you want to use:

```js
import  AimoIcon  from  "aimo-ui/AimoIcon";
import  AimoSideMenu  from  "aimo-ui/AimoSideMenu";
...
const  App= () => {
    return (
        <div  className="appContainer">
            <AimoSideMenu
                headerText="Aimo-UI Components"
				menuItems={menuItems}
			/>
			<div  className="appBody">
				<h1  className="appTitle">
					<AimoIcon  name="sitemap"  className="appTitleIcon"  />
					Welcome to Aimo-UI Component Library Tutorial
				</h1>
			</div>
	    </div>
    );
};
```

## Components

These are the components that are part of **aimo-ui** so far:  
| Name | Description | API |
| ------------ | ----------- | --- |
| AimoIcon | Easy icon-display component which uses **font-awesome** icon library | [] |
| AimoSideMenu | A fully-controllable accordion side-menu component | [] |
| AimoTable | An easy-to-use table component | [] |

## License

[MIT][license] © [Mostafa Vahabzadeh][author]
