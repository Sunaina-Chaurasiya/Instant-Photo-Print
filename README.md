# Instant-Photo-Print

## Overview

This project is an image editor that allows users to apply various filters, rotate, crop, and edit images by adding text, removing the background, and generating or applying a background color. The editor provides a user-friendly interface for modifying images and saving the edited output. The project utilizes HTML, CSS, and JavaScript along with several external libraries like Cropper.js for cropping and Remove.bg API for background removal.

## Features

### Filters
- **Brightness**: Adjusts the brightness of the image (0-200%).
- **Saturation**: Adjusts the saturation of the image (0-200%).
- **Contrast**: Adjusts the contrast of the image (0-200%).
- **Grayscale**: Converts the image to grayscale (0-100%).
- **Blur**: Applies a blur effect to the image (0-100px).
- **Invert**: Inverts the colors of the image (0-100%).

### Rotate & Flip
- **Rotate Left**: Rotates the image 90 degrees to the left.
- **Rotate Right**: Rotates the image 90 degrees to the right.
- **Flip Horizontal**: Flips the image horizontally.
- **Flip Vertical**: Flips the image vertically.

### Additional Options
- **Crop**: Crop the image with customizable aspect ratios using the Cropper.js library.
- **Add Text**: Add custom text and date to the image with selectable font size.
- **Print Layout**: Print multiple copies of the edited image.
- **Remove Background**: Removes the background from the image using the Remove.bg API.
- **Generate Background**: Generates a random background color behind the image.
- **Apply Background Color**: Allows the user to select and apply a custom background color.

### Save & Download
- **Reset Filters**: Resets all applied filters and transformations to the original image state.
- **Download Image**: Downloads the edited image in JPEG format.

## Installation

### Prerequisites
- A modern web browser.
- Internet connection (for external resources like APIs and libraries).

### Instructions
1. Clone or download this repository to your local machine.
2. Open the `index.html` file in your preferred web browser.

## Usage

1. **Choose Image**: Click on the "Choose Image" button and select an image from your computer.
2. **Apply Filters**: Click on the filter buttons to apply different filters. Adjust the slider to fine-tune the effect.
3. **Rotate & Flip**: Use the rotate and flip buttons to change the orientation of the image.
4. **Crop Image**: Click the "Crop" button to open the cropping modal, select the aspect ratio, and crop the image.
5. **Add Text**: Use the "Add Text" button to open the text modal, enter the desired text, date, and font size, then add it to the image.
6. **Remove Background**: Click on "Remove Background" to automatically remove the background from the image (requires API key).
7. **Apply Background**: Use the color picker to choose a background color or generate a random background.
8. **Download Image**: Once editing is complete, click the "Download Image" button to save the edited image.

## External Libraries and APIs

- **[Cropper.js](https://fengyuanchen.github.io/cropperjs/)**: Used for cropping images with customizable aspect ratios.
- **[Remove.bg API](https://www.remove.bg/api)**: API for removing image backgrounds. An API key is required.
- **[FontAwesome](https://fontawesome.com/)** and **[Boxicons](https://boxicons.com/)**: Icons used in the interface.
- **[Cropper.js CSS](https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.min.css)**: Required for the Cropper.js library.
