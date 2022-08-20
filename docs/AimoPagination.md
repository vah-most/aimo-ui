[← Back to main page][main-page]

# AimoPagination

**AimoPagination** is an implementation of table-pagination for react with fully-controllable style.

## Contents

- [Install](#install)
- [Use](#use)
- [API](#api)
- [License](#license)

## Install

**AimoPagination** is a part of **aimo-ui** component library. See [here][aimo-ui#install] for installation guides.

## Use

In order to use aimo-ui components, you can either import the **Aimo** super-component, and use components as a part of **Aimo**. See [here][aimo-ui#use] for details on how to import **aimo-ui** components.

Below is an example of using **AimoPagination** for a table:

```js
...
          <AimoPagination
            onPageChange={(page) => console.log("Selected page changed to: ", page)}
            pageCount={Math.ceil(totalData.length / rowsPerPage)}
          />
...
```

## API

Below is the list of all the props that can be used with `<AimoPagination>` component.

| Name                           | Type       | Default | Description                                                                                                                               |
| ------------------------------ | ---------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **breakLabel**                 | `string`   | `'...'` | Replace break-label with this character/text                                                                                              |
| **breakContainerClassName**    | `string`   | `null`  | Extra class name for break-label container `<div>`                                                                                        |
| **breakTextClassName**         | `string`   | `null`  | Extra class name for break-label text                                                                                                     |
| **containerClassName**         | `string`   | `null`  | Extra class name for pagination component container `<div>`                                                                               |
| **nextLabel**                  | `string`   | `'>'`   | Replace next-label with this character/text                                                                                               |
| **nextContainerClassName**     | `string`   | `null`  | Extra class name for next-label container `<div>`                                                                                         |
| **nextTextClassName**          | `string`   | `null`  | Extra class name for next-label text                                                                                                      |
| **onPageChange**               | `function` | `null`  | **Required.** Callback function for onPageChange event                                                                                    |
| **pageCount**                  | `number`   | `null`  | **Required.** Number of pages                                                                                                             |
| **pageContainerClassName**     | `string`   | `null`  | Extra class name for page-number container `<div>`                                                                                        |
| **pageTextClassName**          | `string`   | `null`  | Extra class name for page-number text                                                                                                     |
| **previousLabel**              | `string`   | `'<'`   | Replace previous-label with this character/text                                                                                           |
| **prevContainerClassName**     | `string`   | `null`  | Extra class name for previous-label container `<div>`                                                                                     |
| **prevTextClassName**          | `string`   | `null`  | Extra class name for previous-label text                                                                                                  |
| **renderOnZeroPage**           | `function` | `null`  | Render function to have custom view when `pageCount` is zero. By default, pagination component will not be displayed if `pageCount === 0` |
| **selectedContainerClassName** | `string`   | `null`  | Extra class name for selected page-number container `<div>`                                                                               |
| **selectedTextClassName**      | `string`   | `null`  | Extra class name for selected page-number text                                                                                            |

## License

[MIT][license] © [Mostafa Vahabzadeh][author]

[main-page]: ../README.md
[aimo-ui#install]: ../README.md#install
[aimo-ui#use]: ../README.md#use
[license]: ../LICENSE
[author]: https://github.com/vah-most
