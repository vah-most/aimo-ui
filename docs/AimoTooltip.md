[← Back to main page][main-page]

# AimoTooltip

**AimoTooltip** is a simple easy-to-use tooltip for React.

## Contents

- [Install](#install)
- [Use](#use)
- [API](#api)
- [License](#license)

## Install

To install **AimoTooltip** package in react (requires react >= 18.0.0), you can use [yarn][]:

```sh
yarn add @aimo.ui/aimo-tooltip
```

or [npm][]:

```sh
npm install @aimo.ui/aimo-tooltip
```

## Use

In order to use **AimoTooltip** component, you should import it using:

```js
import AimoTooltip from "@aimo.ui/aimo-tooltip";
```

Following example shows how you can easily use `<AimoTooltip>` component in your code:

```js
...
const App= () => {
  ...
  return (
    <div  className="appBody">
      ...
      <Button id="verifyButton">
        Verify
      </Button>
      <AimoTooltip target="verifyButton">
        Click to check if your answers are correct.
      </AimoTooltip>
      ...
    </div>
  );
};
```

## API

Below is the list of all the props that can be used with `<AimoTooltip>` component.

| Name                   | Type       | Default    | Description                                                                          |
| ---------------------- | ---------- | ---------- | ------------------------------------------------------------------------------------ |
| **arrowClassName**     | `string`   | `''`       | Extra class name for the arrow of the tooltip bubble                                 |
| **arrowPosition**      | `string`   | `'center'` | Specify tooltip arrow position (valid values are `'left'`, `'center'` and `'right'`) |
| **bodyClassName**      | `string`   | `''`       | Extra class name for the body of the tooltip bubble                                  |
| **children**           | `node`     | `null`     | **Required.** Tooltip content                                                        |
| **containerClassName** | `function` | `''`       | Extra class name for tooltip bubble container                                        |
| **target**             | `string`   | `null`     | **Required.** `id` of the element you want tooltip to get displayed for              |

## License

[MIT][license] © [Mostafa Vahabzadeh][author]

[main-page]: ../README.md
[yarn]: https://yarnpkg.com/cli/add
[npm]: https://docs.npmjs.com/cli/install
[license]: ../LICENSE
[author]: https://github.com/vah-most
