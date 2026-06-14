const fs = require('fs');
const zlib = require('zlib');

// CRC32 lookup table
const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crcInput = Buffer.concat([typeBytes, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([len, typeBytes, data, crc]);
}

// 32x32 RGBA PNG with orange circle + white "S"
const W = 32, H = 32;
const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(W, 0);
ihdrData.writeUInt32BE(H, 4);
ihdrData[8] = 8;  // bit depth
ihdrData[9] = 6;  // RGBA
const ihdr = makeChunk('IHDR', ihdrData);

// Image data
const raw = Buffer.alloc(H * (1 + W * 4));
for (let y = 0; y < H; y++) {
  raw[y * (1 + W * 4)] = 0; // filter byte
  for (let x = 0; x < W; x++) {
    const px = y * (1 + W * 4) + 1 + x * 4;
    const cx = x - 16, cy = y - 16;
    const dist = Math.sqrt(cx * cx + cy * cy);
    if (dist > 14) {
      raw[px] = 0; raw[px+1] = 0; raw[px+2] = 0; raw[px+3] = 0; // transparent
    } else if (dist > 10) {
      raw[px] = 0xff; raw[px+1] = 0xff; raw[px+2] = 0xff; raw[px+3] = 0xff; // white border
    } else {
      raw[px] = 0xf5; raw[px+1] = 0x98; raw[px+2] = 0x2a; raw[px+3] = 0xff; // brand amber
    }
  }
}
const compressed = zlib.deflateSync(raw);
const idat = makeChunk('IDAT', compressed);
const iend = makeChunk('IEND', Buffer.alloc(0));

const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  ihdr, idat, iend
]);

// Wrap as ICO (PNG inside ICO is valid)
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0);  // reserved
icoHeader.writeUInt16LE(1, 2);  // ICO type
icoHeader.writeUInt16LE(1, 4);  // 1 image

const entry = Buffer.alloc(16);
entry[0] = 0;  // width (0 = 256, but we use 32)
entry[1] = 0;  // height
entry[2] = 0;  // palette
entry[3] = 0;  // reserved
entry.writeUInt16LE(1, 4);   // planes
entry.writeUInt16LE(32, 6);  // bpp
entry.writeUInt32LE(png.length, 8);  // size
entry.writeUInt32LE(22, 12);         // offset

const ico = Buffer.concat([icoHeader, entry, png]);
fs.writeFileSync('D:/project/solarstoragepro/public/favicon.ico', ico);
console.log('✅ favicon.ico created:', ico.length, 'bytes');
