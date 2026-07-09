import { test } from "node:test";
import assert from "node:assert/strict";
import { isValidEmail, normalizeEmail } from "./validateEmail.ts";

test("accepts a normal email", () => {
  assert.equal(isValidEmail("user@example.com"), true);
});

test("trims and lowercases", () => {
  assert.equal(normalizeEmail("  User@Example.COM "), "user@example.com");
  assert.equal(isValidEmail("  User@Example.COM "), true);
});

test("rejects missing @", () => {
  assert.equal(isValidEmail("userexample.com"), false);
});

test("rejects missing domain tld", () => {
  assert.equal(isValidEmail("user@example"), false);
});

test("rejects whitespace inside", () => {
  assert.equal(isValidEmail("us er@example.com"), false);
});

test("rejects empty and too-short", () => {
  assert.equal(isValidEmail(""), false);
  assert.equal(isValidEmail("a@b.c"), false);
});
