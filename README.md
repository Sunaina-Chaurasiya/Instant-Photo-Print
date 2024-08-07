# Instant-Photo-Print

## Overview

This project is a web-based photo editor that allows users to edit images by applying filters, rotating, flipping, cropping, adding text, removing backgrounds, and more. It features an intuitive user interface with a range of editing tools and options.

## Features

- **Image Filters:** Adjust brightness, saturation, contrast, and grayscale.
- **Rotation & Flip:** Rotate the image by 90 degrees and flip it horizontally or vertically.
- **Crop:** Crop the image to various aspect ratios or freely.
- **Add Text:** Insert and position text on the image.
- **Remove Background:** Use the remove.bg API to eliminate image backgrounds.
- **Print Layout:** Print multiple copies of the edited image.
- **Blur & Sharpness:** Apply blur and sharpness effects to the image.

## Setup

### Prerequisites

- A modern web browser.
- Internet connection (for external libraries and APIs).

### File Structure

- `index.html` - The main HTML file.
- `main.css` - The CSS file for styling the editor.
- `index.js` - The JavaScript file for the editor's functionality.
- `images/` - Directory containing image assets.

### Dependencies

- **CSS Libraries:**
  - Boxicons (via CDN)
  - Font Awesome (via CDN)
- **JavaScript Libraries:**
  - Cropper.js (via CDN)

## How to Use

1. **Load an Image:**
   - Click "Choose Image" to upload an image file.
   - The selected image will be displayed in the preview area.

2. **Apply Filters:**
   - Use the filter buttons (Brightness, Saturation, Contrast, Grayscale) to select and adjust filter values.
   - Use the slider to modify the intensity of the selected filter.

3. **Rotate and Flip:**
   - Use the rotate and flip buttons to adjust the orientation of the image.

4. **Crop the Image:**
   - Click "Crop" to open the cropping modal.
   - Select an aspect ratio and adjust the cropping area.
   - Click "Crop" in the modal to apply the crop.

5. **Add Text:**
   - Click "Text" to open the text modal.
   - Enter text in the input field and click "Add Text" to overlay it on the image.

6. **Remove Background:**
   - Click "Removebg" to remove the background using the remove.bg API.

7. **Apply Blur & Sharpness:**
   - Click "Blur" to apply a blur effect and "Sharpness" to adjust the image sharpness.
   - Enter the desired values in the prompts.

8. **Print the Image:**
   - Click "Print" and specify the number of copies to print.

9. **Reset Filters:**
   - Click "Reset Filters" to revert to the original image and remove all applied filters.

10. **Download Image:**
    - Click "Download Image" to save the edited image to your device.

## API Key

For background removal functionality, you need an API key from [remove.bg](https://www.remove.bg/api). Replace the `apiKey` variable in `index.js` with your actual API key.

## Troubleshooting

- Ensure all external libraries and APIs are accessible.
- Verify that your browser supports modern JavaScript features.
- If images are not displaying or functionalities are not working, check the browser console for errors.


## Contributing

Feel free to contribute to this project by submitting issues, feature requests, or pull requests.

## Contact

For any questions or feedback, please reach out to [sunainamonika2703@gmail.com].
