[← Back to main page][main-page]

# AimoSteps

**AimoSteps** is a component for React to help display flow-charts and work-flows.

<div style="text-align: center">
<img src="AimoSteps.gif" />
</div>

## Contents

- [Install](#install)
- [Use](#use)
- [API](#api)
- [License](#license)

## Install

To install **AimoSteps** package in react (requires react >= 18.0.0), you can use [yarn][]:

```sh
yarn add @aimo.ui/aimo-steps
```

or [npm][]:

```sh
npm install @aimo.ui/aimo-steps
```

## Use

In order to use **AimoSteps** component, you should import it using:

```js
import AimoSteps from "@aimo.ui/aimo-steps";
```

Following example shows how you can use `<AimoSteps>` component in your code:

```js
...
    <AimoSteps
        steps={[
            { id: 1, title: "Open" },
            { id: 2, color: "#6699cc", textColor: "#FFFFFF", title: "Backlog" },
            { id: 3, color: "#cd5b45", textColor: "#FFFFFF", title: "WIP" },
            { id: 4, color: "#f7e7ce", textColor: "#333333", title: "Review" },
            { id: 5, color: "#00b140", textColor: "#FFFFFF", title: "Testing" },
            { id: 6, color: "#330066", textColor: "#FFFFFF", title: "Ready" },
        ]}
    />
...
```

Also you can check out [**Aimo-steps Sample Usage Code**][demo-steps] for more advanced usage example.

## API

Below is the list of all the props that we can use with `<AimoSteps>` component.

| Name                 | Type      | Default | Description                                                                     |
| -------------------- | --------- | ------- | ------------------------------------------------------------------------------- |
| **animationDelay**   | `number`  | `1000`  | Number of milliseconds for each animation draw steps                            |
| **className**        | `string`  | `null`  | Extra class name for component container                                        |
| **disableAnimation** | `boolean` | `false` | Whether to display items all at once, or with animation                         |
| **stepClassName**    | `string`  | `null`  | Extra class name for `<div>` container of each step                             |
| **stepHeight**       | `number`  | `50`    | Height of the shape of each step (in pixels)                                    |
| **steps**            | `array`   | `[]`    | **Required.** Array of steps. See below for avaiable properties of step objects |
| **stepWidth**        | `number`  | `100`   | Width of the shape of each step (in pixels)                                     |

**steps** property is an array of objects with the following properties:

| Name          | Type     | Default | Description                                  |
| ------------- | -------- | ------- | -------------------------------------------- |
| **id**        | `number` | `null`  | Unique id of the step                        |
| **color**     | `string` | `null`  | Background-color of the shape of the step    |
| **textColor** | `string` | `null`  | Text-color of the text of the step           |
| **title**     | `string` | `null`  | Text to display inside the shape of the step |

## License

[MIT][license] © [Mostafa Vahabzadeh][author]

[main-page]: ../README.md
[yarn]: https://yarnpkg.com/cli/add
[npm]: https://docs.npmjs.com/cli/install
[demo-steps]: ../src/demo/MainPage.jsx
[license]: ../LICENSE
[author]: https://github.com/vah-most
