<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <title>عرض وتحميل نماذج ثلاثية الأبعاد</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body, html {
            margin: 0;
            padding: 0;
            overflow: hidden;
            font-family: Arial, sans-serif;
        }
        #header {
            background-color: #333;
            color: #fff;
            padding: 10px;
            text-align: center;
        }
        #upload-form, #view-options, #qr-code {
            margin: 20px;
            padding: 20px;
            background: #f4f4f4;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        #upload-form input, #upload-form button, #view-options select {
            margin-top: 10px;
        }
        #view-options {
            display: flex;
            justify-content: center;
        }
        #view-options select {
            padding: 10px;
        }
        #qr-code img {
            max-width: 100%;
        }
        a-scene {
            width: 100%;
            height: 100vh;
            display: block;
        }
    </style>
</head>
<body>
    <div id="header">
        <h1>عرض وتحميل نماذج ثلاثية الأبعاد</h1>
    </div>

    <div id="upload-form">
        <input type="file" id="file-input" accept=".gltf, .glb" />
        <button type="button" onclick="generateQRCode()">توليد رمز QR</button>
    </div>

    <div id="view-options">
        <select id="view-option">
            <option value="world">عرض في عالم مفتوح</option>
            <option value="marker">عرض ثابت على ورقة</option>
        </select>
    </div>

    <div id="qr-code"></div>

    <a-scene 
        embedded 
        arjs="sourceType: webcam; debugUIEnabled: false;" 
        vr-mode-ui="enabled: false">
        <a-marker id="marker" type="barcode" value="5">
            <a-entity id="uploaded-model" position="0 0 0" scale="1 1 1"></a-entity>
        </a-marker>
        <a-entity id="world-view" position="0 0 -5" scale="1 1 1"></a-entity>
        <a-entity camera></a-entity>
    </a-scene>

    <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/AR-js-org/AR.js/aframe/build/aframe-ar.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/qrious/dist/qrious.min.js"></script>
    <script>
        const fileInput = document.getElementById('file-input');
        const modelEntity = document.getElementById('uploaded-model');
        const worldView = document.getElementById('world-view');
        const viewOption = document.getElementById('view-option');

        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const modelUrl = e.target.result;
                    modelEntity.setAttribute('gltf-model', modelUrl);
                    worldView.setAttribute('gltf-model', modelUrl);
                };
                reader.readAsDataURL(file);
            }
        });

        viewOption.addEventListener('change', function(event) {
            const option = event.target.value;
            if (option === 'world') {
                document.getElementById('marker').style.display = 'none';
                document.getElementById('world-view').style.display = 'block';
            } else {
                document.getElementById('marker').style.display = 'block';
                document.getElementById('world-view').style.display = 'none';
            }
        });

        function generateQRCode() {
            const qr = new QRious({
                element: document.getElementById('qr-code'),
                value: window.location.href,
                size: 200
            });
        }
    </script>
</body>
</html>
