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

To install **aimo-ui** package in react (requires react >= 18.0.0), you can use [yarn][]:

```sh
yarn add aimo-ui
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
                headerText="Aimo-UI Example"
				menuItems={menuItems}
			/>
			<div  className="appBody">
				<h1  className="appTitle">
					<Aimo.AimoIcon  name="sitemap"  className="appTitleIcon"  />
					Aimo-UI Component Library Example
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
                headerText="Aimo-UI Example"
				menuItems={menuItems}
			/>
			<div  className="appBody">
				<h1  className="appTitle">
					<AimoIcon  name="sitemap"  className="appTitleIcon"  />
					Aimo-UI Component Library Example
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
| **AimoPagination** | A table-pagination component with fully-controllable style | [View][aimopagination]|

## License

[MIT][license] © [Mostafa Vahabzadeh][author]

[react]: http://reactjs.org
[yarn]: https://yarnpkg.com/cli/add
[npm]: https://docs.npmjs.com/cli/install
[aimopagination]: docs/AimoPagination.md
[aimosidemenu]: docs/AimoSideMenu.md
[aimotable]: docs/AimoTable.md
[aimotooltip]: docs/AimoTooltip.md
[license]: LICENSE
[author]: https://github.com/vah-most
