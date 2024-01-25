import "../shim.ts";

import assert from "assert";

import { placeholderTypes, sprintf } from "../utils.js";
import { XqBytesDec, XqBytesEnc } from "../func_replacements.js";
import { SendUsrChk } from "../impl.ts";

describe("debug_tools", () => {
  it("parses printed data", () => {
    const fmt = "string: %s, int: %d, float: %f, hexint: %02x, newline: \n\n last int: %d";
    const expected_placeholders = ["s", "d", "f", "x", "d"];
    const actual_placeholders = placeholderTypes(fmt);
    assert.deepEqual(actual_placeholders, expected_placeholders);
  });
  it("prints data back", () => {
    const fmt = "string: %s, int: %d, float: %f, hexint: %02x, newline: \n\n last int: %d";
    const in_values = ["potato", 5, 3.5, 0x20, 999];
    const expected_string = "string: potato, int: 5, float: 3.5, hexint: 0x20, newline: \n\n last int: 999";
    assert.deepEqual(sprintf(fmt, in_values), expected_string);
  });
});

describe("module", () => {
  const simple_enc_bytes = new Uint8Array([
    0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x00,
  ]);
  const simple_dec_bytes = new Uint8Array([
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  ]);
  const long_enc_bytes = new Uint8Array([
    0x01, 0x01, 0x01, 0x01, 0x03, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x01, 0x43, 0x40, 0x55, 0x42, 0x37, 0x31, 0x38, 0x34, 0x32, 0x30, 0x44, 0x59, 0x4d, 0x57, 0x52, 0x01, 0x01, 0x01,
    0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x30, 0x33, 0x32, 0x35, 0x34,
    0x37, 0x36, 0x39, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x31, 0x2f, 0x33, 0x34, 0x34, 0x2f, 0x33, 0x34, 0x34, 0x2f,
    0x33, 0x34, 0x34, 0x01, 0x01, 0x01, 0x31, 0x2f, 0x31, 0x2f, 0x31, 0x2f, 0x31, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x01, 0x01, 0x01, 0x31, 0x2f, 0x31, 0x2f, 0x31, 0x2f, 0x31, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x31, 0x2f, 0x31, 0x2f, 0x31, 0x2f, 0x31, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x31, 0x2f, 0x31,
    0x2f, 0x31, 0x2f, 0x31, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
  ]);
  const long_dec_bytes = new Uint8Array([
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x42, 0x41, 0x54, 0x43, 0x36, 0x30, 0x39, 0x35, 0x33, 0x31, 0x45, 0x58, 0x4c, 0x56,
    0x53, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x31,
    0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x30, 0x2e, 0x32, 0x35, 0x35, 0x2e,
    0x32, 0x35, 0x35, 0x2e, 0x32, 0x35, 0x35, 0x00, 0x00, 0x00, 0x30, 0x2e, 0x30, 0x2e, 0x30, 0x2e, 0x30, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x30, 0x2e, 0x30, 0x2e, 0x30, 0x2e, 0x30, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x30, 0x2e, 0x30, 0x2e, 0x30, 0x2e, 0x30, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x30, 0x2e, 0x30, 0x2e, 0x30, 0x2e, 0x30, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  ]);
  it("decrypts simple input", () => {
    const in_buf = new DataView(simple_enc_bytes.buffer.slice(0));
    XqBytesDec(in_buf, simple_enc_bytes.byteLength, 4); // this mutates in_buf
    assert.deepEqual(new Uint8Array(in_buf.buffer), simple_dec_bytes);
  });
  it("decrypts more complex input", () => {
    const in_buf = new DataView(long_enc_bytes.buffer.slice(0));
    XqBytesDec(in_buf, long_enc_bytes.byteLength, 4); // this mutates in_buf
    assert.deepEqual(new Uint8Array(in_buf.buffer), long_dec_bytes);
  });
  it("encrypts simple input", () => {
    const in_buf = new DataView(simple_dec_bytes.buffer.slice(0));
    XqBytesEnc(in_buf, simple_dec_bytes.byteLength, 4); // this mutates in_buf
    assert.deepEqual(new Uint8Array(in_buf.buffer), simple_enc_bytes);
  });
  it("encrypts more complex input", () => {
    const in_buf = new DataView(long_dec_bytes.buffer.slice(0));
    XqBytesEnc(in_buf, long_dec_bytes.byteLength, 4); // this mutates in_buf
    assert.deepEqual(new Uint8Array(in_buf.buffer), long_enc_bytes);
  });
  it("reverts Enc with Dec", () => {
    const in_buf = new DataView(long_dec_bytes.buffer.slice(0));
    XqBytesEnc(in_buf, long_dec_bytes.byteLength, 4); // this mutates in_buf
    assert.deepEqual(new Uint8Array(in_buf.buffer), long_enc_bytes); // ENC
    XqBytesDec(in_buf, long_dec_bytes.byteLength, 4); // this mutates in_buf
    assert.deepEqual(new Uint8Array(in_buf.buffer), long_dec_bytes); //DEC
  });
});

const hstrToBA = (hs) => new Uint8Array(hs.match(/../g).map((h) => parseInt(h, 16))).buffer;
describe("make packet", () => {
  it("builds a good SendUsrChk", () => {
    const expected_str =
      "f1d000b0d1000000110a2010a400ff00000000006f01010101010101010101010101010101010101010101010101010160656c686f01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010160656c68";
    const expected = hstrToBA(expected_str);
    assert.deepEqual(SendUsrChk("admin", "admin").buffer, expected);
  });
});
