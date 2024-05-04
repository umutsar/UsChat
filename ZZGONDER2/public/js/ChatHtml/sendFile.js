
const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');

let screenWidth = window.innerWidth;

console.log(screenWidth)

fileInput.addEventListener('change', function () {
    // Seçilen dosyaların sayısını kontrol et
    if (this.files.length > 0) {
        // Önizleme bölgesini temizle
        imagePreview.innerHTML = '';

        // Her bir seçili dosya için önizleme oluştur
        for (const file of this.files) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const img = document.createElement('img');
                const button = document.createAttribute('button')
                img.src = e.target.result;
                img.style.maxWidth = '200px'; // İsteğe bağlı: önizleme boyutunu sınırla
                img.style.maxHeight = '200px';


                img.onload = function () {
                    const heightInVh = (img.height / window.innerHeight) * 100;
                    const widthInVw = (img.width / window.innerWidth) * 100;

                    if (screenWidth >= 0 && screenWidth <= 767) {
                        document.getElementById("imagePreviewParent").style.display = "flex"
                        document.getElementById("messages").style.maxHeight = `${80 - parseInt(heightInVh)}vh`;
                        document.getElementById("messages").style.height = `${80 - parseInt(heightInVh)}vh`;
                    }
                    else {
                        console.log(`Yükseklik: ${heightInVh}vh, Genişlik: ${widthInVw}vw`);
                        document.getElementById("imagePreviewParent").style.display = "flex"
                        document.getElementById("messages").style.maxHeight = `${74 - parseInt(heightInVh)}vh`;
                        document.getElementById("messages").style.height = `${74 - parseInt(heightInVh)}vh`;
                    }

                };


                document.getElementById("imagePreviewParent").style.display = "flex"

                imagePreview.innerHTML = `
                <button id="removeButton">X</button>
                `

                imagePreview.appendChild(img);

                document.getElementById("removeButton").addEventListener("click", () => {
                    fileInput.value = '';
                    document.getElementById("imagePreviewParent").style.display = "none"
                    if (screenWidth >= 0 && screenWidth <= 767) {
                        document.getElementById("messages").style.maxHeight = "74vh";
                        document.getElementById("messages").style.height = "74vh";
                    }
                    else {
                        document.getElementById("messages").style.maxHeight = "80vh";
                        document.getElementById("messages").style.height = "80vh";
                    }

                })

            };

            reader.readAsDataURL(file);
        }
    }

});
