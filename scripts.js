document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file-input');
    const modelEntity = document.getElementById('uploaded-model');
    const worldView = document.getElementById('world-view');
    const viewOption = document.getElementById('view-option');
    const modelFrame = document.getElementById('model-frame');

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const modelUrl = e.target.result;

                // تحديث النموذج ثلاثي الأبعاد في A-Frame
                modelEntity.setAttribute('gltf-model', modelUrl);
                worldView.setAttribute('gltf-model', modelUrl);

                // تحديث الـ iframe
                const iframeContent = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>عرض نموذج ثلاثي الأبعاد</title>
                        <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
                    </head>
                    <body>
                        <a-scene>
                            <a-entity position="0 0 0" scale="1 1 1" gltf-model="${modelUrl}"></a-entity>
                            <a-camera position="0 1.6 3"></a-camera>
                        </a-scene>
                    </body>
                    </html>
                `;
                const blob = new Blob([iframeContent], { type: 'text/html' });
                modelFrame.src = URL.createObjectURL(blob);
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

    document.querySelector('button').addEventListener('click', function() {
        const qr = new QRious({
            element: document.getElementById('qr-code'),
            value: window.location.href,
            size: 200
        });
    });

    // Add controls for the model
    const moveUpBtn = document.getElementById('move-up');
    const moveDownBtn = document.getElementById('move-down');
    const rotateLeftBtn = document.getElementById('rotate-left');
    const rotateRightBtn = document.getElementById('rotate-right');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');

    let modelPosition = { x: 0, y: 0, z: 0 };
    let modelRotation = { x: 0, y: 0, z: 0 };
    let modelScale = 1;

    moveUpBtn.addEventListener('click', () => {
        modelPosition.y += 0.1;
        modelEntity.setAttribute('position', modelPosition);
    });

    moveDownBtn.addEventListener('click', () => {
        modelPosition.y -= 0.1;
        modelEntity.setAttribute('position', modelPosition);
    });

    rotateLeftBtn.addEventListener('click', () => {
        modelRotation.y -= 10;
        modelEntity.setAttribute('rotation', modelRotation);
    });

    rotateRightBtn.addEventListener('click', () => {
        modelRotation.y += 10;
        modelEntity.setAttribute('rotation', modelRotation);
    });

    zoomInBtn.addEventListener('click', () => {
        modelScale += 0.1;
        modelEntity.setAttribute('scale', modelScale + ' ' + modelScale + ' ' + modelScale);
    });

    zoomOutBtn.addEventListener('click', () => {
        modelScale -= 0.1;
        if (modelScale < 0.1) modelScale = 0.1; // Prevent scale from getting too small
        modelEntity.setAttribute('scale', modelScale + ' ' + modelScale + ' ' + modelScale);
    });
});
