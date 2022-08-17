[← Back to main page][main-page]

# AimoSideMenu

This component is a fully-controllable side-menu component for React. It supports right-to-left view, and gives you full control to pass extra css classes for different section and define and use you own render functions for your customized view.

## Contents

- [Install](#install)
- [Use](#use)
- [API](#api)
- [License](#license)

## Install

**AimoSideMenu** is a part of **aimo-ui** component library. See [here][aimo-ui#install] for installation guides.

## Use

In order to use aimo-ui components, you can either import the **Aimo** super-component, and use components as a part of **Aimo**. See [here][aimo-ui#use] for details on how to import **aimo-ui** components.

A simple example of using **AimoSideMenu** is like this:

```js
...
    <Aimo.AimoSideMenu
        headerText="Example Menu"
        menuItems={[
            {
                text: "First Menu Item",
                onClick: () => { ... }
            },
            {
                text: "Second Menu Item",
                onClick: () => { ... }
            },
            {
                text: "Third Menu Item",
                onClick: () => { ... }
            },
            {
                isSeparator: true,
            }
        ]}
      />
...
```

## API

Below is the list of all the props that we can use with `<AimoSideMenu>` component.

| Name                       | Type       | Default  | Description                                                                                                                                                                                                                                                          |
| -------------------------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **containerClassName**     | `string`   | `null`   | Extra class name for Side-Menu container                                                                                                                                                                                                                             |
| **headerText**             | `string`   | `'Menu'` | Menu title text                                                                                                                                                                                                                                                      |
| **hideCompactView**        | `boolean`  | `false`  | Whether to hide compact view (icons-only view)                                                                                                                                                                                                                       |
| **hideHeader**             | `boolean`  | `false`  | Whether to hide menu title                                                                                                                                                                                                                                           |
| **iconContainerClassName** | `string`   | `null`   | Extra class name for each menu-item icon                                                                                                                                                                                                                             |
| **menuItems**              | `array`    | `[]`     | **Required.** Array of menu-item objects. See below for avaiable properties of menu-item objects                                                                                                                                                                     |
| **renderHeaderIcon**       | `function` | `null`   | Replace the render function of header icon. Two arguments values will be sent to given `renderHeaderIcon` function. `isCompact`: a boolean value which tells if compact view is enabled and `toggleCompact`: a function which can be used to toggle the compact view |
| **renderHeaderText**       | `function` | `null`   | Replace the render function of header text. Passing this property overrides setting `headerText`.                                                                                                                                                                    |
| **renderSeparator**        | `function` | `null`   | Replace the render function of separator line.                                                                                                                                                                                                                       |
| **rtl**                    | `boolean`  | `null`   | Whether to display menu-items and accordion effect in right-to-left direction                                                                                                                                                                                        |
| **textContainerClassName** | `string`   | `null`   | Extra class name for each menu-item text                                                                                                                                                                                                                             |

**menuItems** property is an array of objects with the following properties:

| Name            | Type       | Default | Description                                                                                                         |
| --------------- | ---------- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| **isSeparator** | `boolean`  | `false` | Display a separator line after last item                                                                            |
| **text**        | `string`   | `null`  | Menu-item text                                                                                                      |
| **renderIcon**  | `function` | `null`  | Render function for displaying icon of the menu-item                                                                |
| **renderText**  | `function` | `null`  | Render function for displaying text of the menu-item. Setting one of `text` or `renderText` properties is required. |

## License

[MIT][license] © [Mostafa Vahabzadeh][author]

[main-page]: ../README.md
[aimo-ui#install]: ../README.md#install
[aimo-ui#use]: ../README.md#use
[license]: ../LICENSE
[author]: https://github.com/vah-most
