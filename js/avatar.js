'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview');
  var photoPreview = document.querySelector('.ad-form__photo');

  var uploadFileHandler = function (fileChooser, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var child = preview.querySelector('img');
        if (preview.contains(child)) {
          child.src = reader.result;
        } else {
          var img = document.createElement('img');
          img.src = reader.result;
          img.width = preview.clientWidth;
          img.height = preview.clientHeight;
          preview.appendChild(img);
        }
      });

      reader.readAsDataURL(file);
    }
  };

  avatarFileChooser.addEventListener('change', function () {
    uploadFileHandler(avatarFileChooser, avatarPreview);
  });

  photoFileChooser.addEventListener('change', function () {
    uploadFileHandler(photoFileChooser, photoPreview);
  });
})();
