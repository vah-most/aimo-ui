[← Back to main page][main-page]

# AimoPagination

**AimoPagination** is an implementation of table-pagination for react with fully-controllable style.

<div style="text-align: left">
<img src="AimoPagination1.gif" width="175px" height="29px"/>
<img src="AimoPagination2.gif" width="175px" height="29px"/>
<img src="AimoPagination3.gif" width="175px" height="29px"/>
</div>

## Contents

- [Install](#install)
- [Use](#use)
- [API](#api)
- [License](#license)

## Install

To install **AimoPagination** package in react (requires react >= 18.0.0), you can use [yarn][]:

```sh
yarn add @aimo.ui/aimo-pagination
```

or [npm][]:

```sh
npm install @aimo.ui/aimo-pagination
```

## Use

In order to use **AimoPagination** component, you should import it using:

```js
import AimoPagination from "@aimo.ui/aimo-pagination";
```

Following example shows how you can use `<AimoPagination>` component in your code:

```js
...
const App= () => {
  ...
  return (
    <div  className="appBody">
      <table>
      ...
      </table>
      <AimoPagination
        containerClassName="paginationContainer"
        disabledArrowClassName="paginationDisabledArrow"
        onPageChange={handlePageChange}
        pageContainerClassName="paginationPage"
        pageContainerDisabledClassName="paginationDisabledPage"
        pageCount={pageCount}
        pageTextClassName="paginationPageText"
        renderNext={(isClickable) => (
          <div
            className={`paginationArrow ${ isClickable ? "" : "paginationDisabledArrow" }`} >
            »
          </div>
        )}
        renderPrev={(isClickable) => (
          <div
            className={`paginationArrow ${ isClickable ? "" : "paginationDisabledArrow" }`} >
            «
          </div>
        )}
        selectedTextClassName="paginationSelectedPageText"
        selectedContainerClassName="paginationSelectedPageContainer"
      />
    </div>
  );
};
```

## API

Below is the list of all the props that can be used with `<AimoPagination>` component.

| Name                               | Type       | Default | Description                                                                                                                               |
| ---------------------------------- | ---------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **breakLabel**                     | `string`   | `'...'` | Replace break-label with this character/text                                                                                              |
| **breakContainerClassName**        | `string`   | `''`    | Extra class name for break-label container `<div>`                                                                                        |
| **breakTextClassName**             | `string`   | `''`    | Extra class name for break-label text                                                                                                     |
| **containerClassName**             | `string`   | `''`    | Extra class name for pagination component container `<div>`                                                                               |
| **nextContainerClassName**         | `string`   | `''`    | Extra class name for next-label container `<div>`                                                                                         |
| **onPageChange**                   | `function` | `null`  | **Required.** Callback function for onPageChange event                                                                                    |
| **pageContainerClassName**         | `string`   | `''`    | Extra class name for page-number container `<div>`                                                                                        |
| **pageContainerDisabledClassName** | `string`   | `''`    | Extra class name for page-number container `<div>` when page is disabled                                                                  |
| **pageCount**                      | `number`   | `1`     | **Required.** Number of pages                                                                                                             |
| **pageTextClassName**              | `string`   | `''`    | Extra class name for page-number text                                                                                                     |
| **prevContainerClassName**         | `string`   | `''`    | Extra class name for previous-label container `<div>`                                                                                     |
| **renderNext**                     | `function` | `null`  | Render function to have custom `next` label                                                                                               |
| **renderOnZeroPage**               | `function` | `null`  | Render function to have custom view when `pageCount` is zero. By default, pagination component will not be displayed if `pageCount === 0` |
| **renderPrev**                     | `function` | `null`  | Render function to have custom `previous` label                                                                                           |
| **selectedContainerClassName**     | `string`   | `''`    | Extra class name for selected page-number container `<div>`                                                                               |
| **selectedTextClassName**          | `string`   | `''`    | Extra class name for selected page-number text                                                                                            |

## License

[MIT][license] © [Mostafa Vahabzadeh][author]

[main-page]: ../README.md
[yarn]: https://yarnpkg.com/cli/add
[npm]: https://docs.npmjs.com/cli/install
[license]: ../LICENSE
[author]: https://github.com/vah-most

```

```
