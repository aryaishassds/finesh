<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AR with QR Code</title>

  <!-- تضمين مكتبة A-Frame و AR.js -->
  <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
  <script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.7.2/aframe/build/aframe-ar.min.js"></script>

  <style>
    body, html {
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: black;
    }
  </style>
</head>
<body>

  <!-- مشهد AR -->
  <a-scene embedded arjs>

    <!-- علامة مخصصة لقراءة QR code (أو أي رمز مخصص) -->
    <a-marker type="barcode" value="5"> <!-- قيمة '5' هنا هي ID الـ QR Code -->
      <!-- تحميل نموذج ثلاثي الأبعاد -->
      <a-entity gltf-model="#3d-model" scale="0.5 0.5 0.5" position="0 0 0"></a-entity>
    </a-marker>

    <!-- الكاميرا الخاصة بالمشهد -->
    <a-entity camera></a-entity>
  </a-scene>

  <!-- تعريف النموذج ثلاثي الأبعاد -->
  <a-assets>
    <!-- تحميل النموذج من GitHub باستخدام رابط Raw -->
    <a-asset-item id="3d-model" src="https://raw.githubusercontent.com/aryaishassds/GLB/main/%D8%AD%D9%84%D8%B2%D9%88%D9%86.glb"></a-asset-item>
  </a-assets>

</body>
</html>
