export function urlify_location(name) {
  return name.toLowerCase().replace(new RegExp(" ", "g"), "-");
}

// Blatantly stolen from npm "canvas" library
function loadImage(src, options) {
  return new Promise(function (resolve, reject) {
    const image = Object.assign(document.createElement("img"), options);

    function cleanup() {
      image.onload = null;
      image.onerror = null;
    }

    image.onload = function () {
      cleanup();
      resolve(image);
    };
    image.onerror = function () {
      cleanup();
      reject(new Error('Failed to load the image "' + src + '"'));
    };

    image.src = src;
  });
}

export async function generatePinIcon(color) {
  if (color[0] === "#") {
    color = color.slice(1);
  }

  let data_url = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='34.209' width='24'%3E%3Cpath fill='none' d='M10.35 19.01h24v24h-24z'/%3E%3Cpath stroke-width='.421' stroke='%23000' fill='%23${color}' d='M12 .21A11.78 11.78 0 0 0 .21 12C.21 20.842 12 33.895 12 33.895S23.79 20.842 23.79 12A11.78 11.78 0 0 0 12 .21zm0 16A4.212 4.212 0 0 1 7.79 12 4.212 4.212 0 0 1 12 7.79 4.212 4.212 0 0 1 16.21 12 4.212 4.212 0 0 1 12 16.21z'/%3E%3C/svg%3E`;
  return await loadImage(data_url);
}

// Stolen from https://jonlabelle.com/snippets/view/javascript/lighten-and-darken-colors-in-javascript
export function lightenColor(colorCode, amount) {
  var usePound = false;

  if (colorCode[0] === "#") {
    colorCode = colorCode.slice(1);
    usePound = true;
  }

  var num = parseInt(colorCode, 16);

  var r = (num >> 16) + amount;

  if (r > 255) {
    r = 255;
  } else if (r < 0) {
    r = 0;
  }

  var b = ((num >> 8) & 0x00ff) + amount;

  if (b > 255) {
    b = 255;
  } else if (b < 0) {
    b = 0;
  }

  var g = (num & 0x0000ff) + amount;

  if (g > 255) {
    g = 255;
  } else if (g < 0) {
    g = 0;
  }

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}
