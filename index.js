const fileInput = document.querySelector(".file-input"),
    filterOptions = document.querySelectorAll(".filter button"),
    filterName = document.querySelector(".name"),
    filterValue = document.querySelector(".value"),
    filterSlider = document.querySelector(".slider input"),
    rotateOptions = document.querySelectorAll(".rotate button"),
    previewImg = document.querySelector(".preview-img img"),
    resetFilterBtn = document.querySelector(".reset-filter"),
    chooseImgBtn = document.querySelector(".choose-img"),
    downloadImgBtn = document.querySelector(".download-img"),
    cropBtn = document.getElementById("crop"),
    addTextBtn = document.getElementById("add-text"),
    printLayoutBtn = document.getElementById("print-layout"),
    removeBgBtn = document.getElementById("remove-background"),
    aspectRatioButtons = document.querySelectorAll(".aspect-ratio-button"),
    cropModal = document.getElementById("crop-modal"),
    cropModalClose = cropModal.querySelector(".close"),
    imageToCrop = document.getElementById("image-to-crop"),
    cropModalBtn = document.getElementById("crop-btn"),
    textModal = document.getElementById("text-modal"),
    textModalClose = textModal.querySelector(".close"),
    textInput = document.getElementById("text-input"),
    addTextModalBtn = document.getElementById("add-text-btn"),
    sharpnessBtn = document.getElementById("sharpness"),
    blurBtn = document.getElementById("blur"),
    printCopiesBtn = document.getElementById("print-layout");

let brightness = 100, saturation = 100, contrast = 100, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;
let cropper = null;
let originalImageSrc = ""; // Store the original image source

const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) contrast(${contrast}%) grayscale(${grayscale}%)`;
}

const loadImage = () => {
    let file = fileInput.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    originalImageSrc = previewImg.src; // Store the original image source
    previewImg.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disable");
    });
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if (option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if (option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        } else if (option.id === "contrast") {
            filterSlider.max = "200";
            filterSlider.value = contrast;
            filterValue.innerText = `${contrast}%`;
        } else {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    if (selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if (selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if (selectedFilter.id === "contrast") {
        contrast = filterSlider.value;
    } else {
        grayscale = filterSlider.value;
    }
    applyFilter();
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if (option.id === "left") {
            rotate -= 90;
        } else if (option.id === "right") {
            rotate += 90;
        } else if (option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    });
});

const resetFilter = () => {
    brightness = 100; saturation = 100; contrast = 100; grayscale = 0;
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    previewImg.src = originalImageSrc; // Reset to the original image source
    filterOptions[0].click();
    applyFilter();
}

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) contrast(${contrast}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotate * Math.PI / 180);
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
downloadImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());

cropBtn.addEventListener("click", () => {
    cropModal.style.display = "block";
    imageToCrop.src = previewImg.src;
    cropper = new Cropper(imageToCrop, {
        aspectRatio: NaN, 
        viewMode: 1,
    });
});

cropModalClose.addEventListener("click", () => {
    cropModal.style.display = "none";
    if (cropper) {
        cropper.destroy();
        cropper = null;
    }
});

aspectRatioButtons.forEach(button => {
    button.addEventListener("click", () => {
        const ratio = button.dataset.ratio;
        if (ratio === "16:9") {
            cropper.setAspectRatio(16 / 9);
        } else if (ratio === "4:3") {
            cropper.setAspectRatio(4 / 3);
        } else if (ratio === "3:4") {
            cropper.setAspectRatio(3 / 4);
        } else if (ratio === "2:3") {
            cropper.setAspectRatio(2 / 3);
        } else if (ratio === "1.25:1.5") { 
            cropper.setAspectRatio(1.25 / 1.5);
        } else {
            cropper.setAspectRatio(NaN);
        }
    });
});

cropModalBtn.addEventListener("click", () => {
    const croppedCanvas = cropper.getCroppedCanvas();
    const croppedImageUrl = croppedCanvas.toDataURL("image/png");
    previewImg.src = croppedImageUrl;
    cropModal.style.display = "none";
    cropper.destroy();
    cropper = null;
});


addTextBtn.addEventListener("click", () => {
    textModal.style.display = "block";
});

textModalClose.addEventListener("click", () => {
    textModal.style.display = "none";
});

addTextModalBtn.addEventListener("click", () => {
    const text = textInput.value;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const margin = 10; 

    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    const img = new Image();
    img.src = previewImg.src;

    img.onload = () => {
        ctx.drawImage(img, 0, 0);

        ctx.font = "20px Arial"; 
        ctx.fillStyle = "black";
        const textWidth = canvas.width - margin * 2; 
        let lines = [];
        let line = '';
        let words = text.split(' ');

        for (let word of words) {
            let testLine = line + word + ' ';
            let testWidth = ctx.measureText(testLine).width;
            if (testWidth > textWidth) {
                lines.push(line);
                line = word + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line);

        const lineHeight = 24;
        const textHeight = lines.length * lineHeight;
        const textX = margin;
        const textY = canvas.height - textHeight - margin;

        ctx.fillStyle = 'white';
        ctx.fillRect(textX - 10, textY - 10, textWidth + 20, textHeight -10);

        ctx.fillStyle = "black";
        lines.forEach((line, index) => {
            ctx.fillText(line, textX , textY + (index + 1) * lineHeight -20); 
        });

        previewImg.src = canvas.toDataURL();
        textModal.style.display = "none";
    };
});

const removeBackground = async () => {
    const apiKey = 'rwobx1XV8N9B5C6b9vyMbiiR'; 
    const formData = new FormData();
    formData.append('image_file', fileInput.files[0]);

    const response = await fetch(`https://api.remove.bg/v1.0/removebg`, {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey,
        },
        body: formData,
    });

    if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        previewImg.src = url;
    } else {
        alert('Failed to remove background');
    }
};

removeBgBtn.addEventListener("click", removeBackground);

printCopiesBtn.addEventListener("click", () => {
    let copies = prompt("How many copies of the photo do you want to print?");
    if (copies) {
        copies = parseInt(copies);
        if (isNaN(copies) || copies <= 0) {
            alert("Please enter a valid number of copies.");
            return;
        }
        printImageCopies(copies);
    }
});

const printImageCopies = (copies) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print Copies</title>');
    for (let i = 0; i < copies; i++) {
        printWindow.document.write(`<img src="${previewImg.src}" alt="Photo Copy ${i + 1}">`);
    }
    printWindow.document.write('</title></head></html>');
    printWindow.document.close();
    printWindow.print();
}

blurBtn.addEventListener("click", () => {
    const blurAmount = prompt("Enter the blur amount (e.g., 5px):");
    if (blurAmount) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = previewImg.naturalWidth;
        canvas.height = previewImg.naturalHeight;

        const img = new Image();
        img.src = previewImg.src;

        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            ctx.filter = `blur(${blurAmount})`;
            ctx.drawImage(img, 0, 0);

            previewImg.src = canvas.toDataURL();
        };
    }
});

sharpnessBtn.addEventListener("click", () => {
    const sharpnessAmount = prompt("Enter the sharpness amount (e.g., 1.5):");
    if (sharpnessAmount) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = previewImg.naturalWidth;
        canvas.height = previewImg.naturalHeight;

        const img = new Image();
        img.src = previewImg.src;

        img.onload = () => {
            ctx.drawImage(img, 0, 0);

            // Apply a basic sharpness filter
            ctx.filter = `contrast(${sharpnessAmount})`;
            ctx.drawImage(img, 0, 0);

            previewImg.src = canvas.toDataURL();
        };
    }
});