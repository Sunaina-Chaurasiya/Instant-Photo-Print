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
    printCopiesBtn = document.getElementById("print-layout"),  
    printCopiesModal = document.getElementById("print-copies-modal"),
    printCopiesModalClose = printCopiesModal.querySelector(".close"),
    copiesInput = document.getElementById("copies-input"),
    printCopiesButton = document.getElementById("print-copies-btn"),
    passportResizeBtn = document.getElementById("passport-resize");

let brightness = 100, saturation = 100, contrast = 100, grayscale = 0, blur = 0, invert = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;
let cropper = null;
let originalImageSrc = "";
let isPassportSize = false; // Flag to track if the image is resized to passport size

const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) contrast(${contrast}%) grayscale(${grayscale}%) blur(${blur}px) invert(${invert}%)`;
};

const loadImage = () => {
    let file = fileInput.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    originalImageSrc = previewImg.src; 
    previewImg.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disable");
    });
};

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
        } else if (option.id === "grayscale") {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        } else if (option.id === "blur") {
            filterSlider.max = "100";
            filterSlider.value = blur;
            filterValue.innerText = `${blur}px`;
        } else if (option.id === "invert") {
            filterSlider.max = "100";
            filterSlider.value = invert;
            filterValue.innerText = `${invert}%`;
        }
    });
});

filterSlider.addEventListener("input", () => {
    setTimeout(() => {
        updateFilter();
    }, 500); 
});

const updateFilter = () => {
    const selectedFilter = document.querySelector(".filter .active");
    
    filterValue.innerText = selectedFilter.id === "blur" ? `${filterSlider.value}px` : `${filterSlider.value}%`;

    if (selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if (selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if (selectedFilter.id === "contrast") {
        contrast = filterSlider.value;
    } else if (selectedFilter.id === "grayscale") {
        grayscale = filterSlider.value;
    } else if (selectedFilter.id === "blur") {
        blur = filterSlider.value;
    } else if (selectedFilter.id === "invert") {
        invert = filterSlider.value;
    }

    applyFilter();
};

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
    setTimeout(() => {
        brightness = 100; saturation = 100; contrast = 100; grayscale = 0; blur = 0; invert = 0;
        rotate = 0; flipHorizontal = 1; flipVertical = 1;
        previewImg.src = originalImageSrc;
        filterOptions[0].click();
        applyFilter(); 
        isPassportSize = false; // Reset passport size flag
    }, 500);
};

const loaderContainer = document.querySelector(".loader-container");

const saveImage = () => {
    loaderContainer.style.display = "block";

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) contrast(${contrast}%) grayscale(${grayscale}%) blur(${blur}px) invert(${invert}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotate * Math.PI / 180);
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/jpeg");

    setTimeout(() => {
        const downloadImg = new Image();
        downloadImg.src = imageData;

        downloadImg.onload = () => {
            const link = document.createElement("a");
            link.download = "image.jpg";
            link.href = imageData;
            link.click();

            loaderContainer.style.display = "none";
        };

        downloadImg.onerror = () => {
            console.error("Failed to process the image.");
            loaderContainer.style.display = "none";
        };
    }, 1000); 
};

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
downloadImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());

cropBtn.addEventListener("click", () => {
    setTimeout(() => {
        cropModal.style.display = "block";
        imageToCrop.src = previewImg.src;
        cropper = new Cropper(imageToCrop, {
            aspectRatio: NaN, 
            viewMode: 1,
        });
    }, 500);
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
        } else if (ratio === "3:4") { 
            cropper.setAspectRatio(3 / 4);
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
    setTimeout(() => {
        textModal.style.display = "block"; 
    }, 500);
});

textModalClose.addEventListener("click", () => {
    textModal.style.display = "none";
});

addTextModalBtn.addEventListener("click", () => {
    setTimeout(() => {
        const text = document.getElementById("text-input").value;
        const dateInput = document.getElementById("date-input").value;
        const fontSize = parseInt(document.getElementById("font-size-input").value, 10); 
        const fontSizePx = `${fontSize}px`;

        const formattedDate = formatDate(dateInput);

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = previewImg.naturalWidth;
        canvas.height = previewImg.naturalHeight;

        const img = new Image();
        img.src = previewImg.src;

        img.onload = () => {
            ctx.drawImage(img, 0, 0);

            ctx.font = `${fontSizePx} Arial`; 
            ctx.fillStyle = "black";

            let lines = [];
            let line = '';
            const words = text.split(' ');

            words.forEach((word) => {
                let testLine = `${line}${word} `;
                let testWidth = ctx.measureText(testLine).width;
                if (testWidth > canvas.width - 20) {
                    lines.push(line);
                    line = `${word} `;
                } else {
                    line = testLine;
                }
            });

            lines.push(line);

            const lineHeight = fontSize;
            const textHeight = lines.length * lineHeight;
            const dateHeight = formattedDate ? lineHeight : 0;

            const totalHeight = textHeight + dateHeight;
            const backgroundY = canvas.height - totalHeight;

            ctx.fillStyle = 'white';
            ctx.fillRect(0, backgroundY, canvas.width, totalHeight);

            ctx.fillStyle = "black";
            let textY = backgroundY + lineHeight;

            lines.forEach((line, index) => {
                const lineWidth = ctx.measureText(line).width;
                const textX = (canvas.width - lineWidth) / 2;
                ctx.fillText(line, textX, textY + index * lineHeight); 
            });

            if (formattedDate) {
                const dateWidth = ctx.measureText(formattedDate).width;
                const dateX = (canvas.width - dateWidth) / 2;
                textY += lines.length * lineHeight;
                ctx.fillText(formattedDate, dateX, textY);
            }

            previewImg.src = canvas.toDataURL();
            textModal.style.display = "none";
        };
    }, 500);
});

function formatDate(dateInput) {
    if (!dateInput) return '';

    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`;
}

const spinnerContainer = document.querySelector(".spinner-container");

const removeBackground = async () => {
    spinnerContainer.style.display = "block"; 
    const apiKey = 'sC7dJypwKCuavJhdCjrH9nLv'; 
    const formData = new FormData();
    formData.append('image_file', fileInput.files[0]);

    try {
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
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while removing the background');
    } finally {
        spinnerContainer.style.display = "none"; 
    }
};

removeBgBtn.addEventListener("click", removeBackground);

printCopiesBtn.addEventListener("click", () => {
    printCopiesModal.style.display = "block";
});

printCopiesModalClose.addEventListener("click", () => {
    printCopiesModal.style.display = "none";
});

printCopiesButton.addEventListener("click", () => {
    const copies = parseInt(copiesInput.value, 10); 
    if (isNaN(copies) || copies <= 0) {
        alert("Please enter a valid number of copies.");
        return;
    }
    printImageCopies(copies);
    printCopiesModal.style.display = "none";
});

const printImageCopies = (copies) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert("Failed to open print window. Please check your browser settings.");
        return;
    }
    
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Print Copies</title>');

    const imgStyle = isPassportSize 
        ? 'width: 1.25in; height: 1.5in; margin-right: 5px; margin-bottom: 5px;' 
        : 'margin-right: 5px; margin-bottom: 5px;';
    
    printWindow.document.write(`
        <style>
            @page { margin: 0; }
            body { margin: 10px; } 
            img { ${imgStyle} }
        </style>
    `);

    printWindow.document.write('</head><body>'); 

    for (let i = 0; i < copies; i++) {
        printWindow.document.write(`<img src="${previewImg.src}" alt="Photo Copy ${i + 1}">`);
    }

    printWindow.document.write('</body></html>');
    printWindow.document.close(); 
    printWindow.focus(); 
    printWindow.print(); 
};

const generateBgBtn = document.getElementById("generate-background");

const backgrounds = [
    '#FF5733', '#33FF57','#ff9a9e', '#fad0c4', 
    '#fad0c4',  '#3357FF', '#F3FF33', '#FF33A8'];

const generateBackground = () => {
    spinnerContainer.style.display = "block";

    setTimeout(() => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = previewImg.naturalWidth;
        canvas.height = previewImg.naturalHeight;

        const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];

        ctx.fillStyle = randomBackground;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const img = new Image();
        img.src = previewImg.src;

        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            previewImg.src = canvas.toDataURL();
            spinnerContainer.style.display = "none";
        };

        img.onerror = () => {
            console.error("Failed to load the image.");
            spinnerContainer.style.display = "none";
        };
    }, 2000);
};

const colorPicker = document.getElementById("color-picker");
const applyBackgroundBtn = document.getElementById("apply-background-btn");

const applyBackgroundColor = () => {
    spinnerContainer.style.display = "block";
    setTimeout(() => {
    const selectedColor = colorPicker.value;
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.fillStyle = selectedColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.src = previewImg.src;

    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        previewImg.src = canvas.toDataURL();
        spinnerContainer.style.display = "none";
    };

    img.onerror = () => {
        console.error("Failed to load the image.");
        spinnerContainer.style.display = "none";
    };
}, 500);
};

applyBackgroundBtn.addEventListener("click", applyBackgroundColor);
