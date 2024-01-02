# NetsiDownload Web Component

`NetsiDownload` is a custom web component that allows easy downloading of data, such as SVGs or other textual data, from your web application. When a user clicks on the NetsiDownload element, it triggers the download of the specified data with the set MIME type.

## Features

Easy to implement and use.
Customizable MIME types for different data formats.
Supports callback execution after download.

## Getting Started

These instructions will help you to implement NetsiDownload in your web application.

## Installation

Currently, you can directly include `NetsiDownload` in your project by copying the JavaScript class into your project.

## Usage

### Basic Usage

Include the NetsiDownload class in your JavaScript file or HTML page.

Use the netsi-download tag in your HTML, and specify the data attribute with the ID of the element that you want to download:

### html

```html
<netsi-download data="mySvgElement">Download SVG</netsi-download>

<svg id="mySvgElement" ...>...</svg>
```

### Attributes

`data`: (**Required**) The ID of the element in the DOM whose data you want to download.

`mime-type`: (_Optional_) The MIME type of the data to be downloaded. Defaults to `image/svg+xml`.

`ondownloaded`: (_Optional_) The name of the callback function to be executed after the download is triggered.

## Example

```html
import NetsiDownload from "https://esm.sh/netsi-download";

<netsi-download
  data="mySvg"
  mime-type="image/svg+xml"
  ondownloaded="downloadCallback"
  >&darr; Download SVG</netsi-download
>

<svg id="mySvg" ...><circle cx="100" cy="100" fill="orange" /></svg>

<script>
  function downloadCallback() {
    console.log("SVG download initiated.");
  }
</script>
```

## Contributing

Contributions to NetsiDownload are welcome. Please feel free to submit pull requests, create issues, or suggest new features.

## License

This project is open source and available under the Apache-2.0 license
