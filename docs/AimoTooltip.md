[← Back to main page][main-page]

# AimoTooltip

**AimoTooltip** is a simple on-hover tooltip component for react.

## Contents

- [Install](#install)
- [Use](#use)
- [API](#api)
- [License](#license)

## Install

**AimoTooltip** is a part of **aimo-ui** component library. See [here][aimo-ui#install] for installation guides.

## Use

In order to use aimo-ui components, you can either import the **Aimo** super-component, and use components as a part of **Aimo**. See [here][aimo-ui#use] for details on how to import **aimo-ui** components.

Below is an example of using **AimoTooltip**. You have to set `id` for the target component for which you want to show the tooltip, then place the `<AimoTooltip>` component after the target component, and pass given target-id to it.

```js
...
          <button id="myButtonId" type="button">
            Click On Me!
          </button>
          <AimoTooltip target="myButtonId">
            This is some information about what this button does!
          </AimoTooltip>
...
```

## API

Below is the list of all the props that can be used with `<AimoTooltip>` component.

| Name                   | Type     | Default | Description                                                                                   |
| ---------------------- | -------- | ------- | --------------------------------------------------------------------------------------------- |
| **arrowClassName**     | `string` | `null`  | Extra class name for tooltip arrow                                                            |
| **bodyClassName**      | `string` | `null`  | Extra class name for tooltip body                                                             |
| **children**           | `node`   | `null`  | **Required.** The content of tooltip                                                          |
| **containerClassName** | `string` | `null`  | Extra class name for tooltip container `<div>`                                                |
| **target**             | `string` | `null`  | **Required.** The `id` of the html element, on-hover of which this tooltip would be displayed |

## License

[MIT][license] © [Mostafa Vahabzadeh][author]

[main-page]: ../README.md
[aimo-ui#install]: ../README.md#install
[aimo-ui#use]: ../README.md#use
[license]: ../LICENSE
[author]: https://github.com/vah-most
