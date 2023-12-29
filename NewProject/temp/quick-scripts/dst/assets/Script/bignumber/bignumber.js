
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/bignumber/bignumber.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1424dOYhT1AZq7/lwQP6Bet', 'bignumber');
// Script/bignumber/bignumber.js

"use strict";

;

(function (globalObject) {
  'use strict';
  /*
   *      bignumber.js v9.1.2
   *      A JavaScript library for arbitrary-precision arithmetic.
   *      https://github.com/MikeMcl/bignumber.js
   *      Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
   *      MIT Licensed.
   *
   *      BigNumber.prototype methods     |  BigNumber methods
   *                                      |
   *      absoluteValue            abs    |  clone
   *      comparedTo                      |  config               set
   *      decimalPlaces            dp     |      DECIMAL_PLACES
   *      dividedBy                div    |      ROUNDING_MODE
   *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
   *      exponentiatedBy          pow    |      RANGE
   *      integerValue                    |      CRYPTO
   *      isEqualTo                eq     |      MODULO_MODE
   *      isFinite                        |      POW_PRECISION
   *      isGreaterThan            gt     |      FORMAT
   *      isGreaterThanOrEqualTo   gte    |      ALPHABET
   *      isInteger                       |  isBigNumber
   *      isLessThan               lt     |  maximum              max
   *      isLessThanOrEqualTo      lte    |  minimum              min
   *      isNaN                           |  random
   *      isNegative                      |  sum
   *      isPositive                      |
   *      isZero                          |
   *      minus                           |
   *      modulo                   mod    |
   *      multipliedBy             times  |
   *      negated                         |
   *      plus                            |
   *      precision                sd     |
   *      shiftedBy                       |
   *      squareRoot               sqrt   |
   *      toExponential                   |
   *      toFixed                         |
   *      toFormat                        |
   *      toFraction                      |
   *      toJSON                          |
   *      toNumber                        |
   *      toPrecision                     |
   *      toString                        |
   *      valueOf                         |
   *
   */

  var BigNumber,
      isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
      mathceil = Math.ceil,
      mathfloor = Math.floor,
      bignumberError = '[BigNumber Error] ',
      tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ',
      BASE = 1e14,
      LOG_BASE = 14,
      MAX_SAFE_INTEGER = 0x1fffffffffffff,
      // 2^53 - 1
  // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
  POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
      SQRT_BASE = 1e7,
      // EDITABLE
  // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
  // the arguments to toExponential, toFixed, toFormat, and toPrecision.
  MAX = 1E9; // 0 to MAX_INT32

  /*
   * Create and return a BigNumber constructor.
   */

  function clone(configObject) {
    var div,
        convertBase,
        parseNumeric,
        P = BigNumber.prototype = {
      constructor: BigNumber,
      toString: null,
      valueOf: null
    },
        ONE = new BigNumber(1),
        //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------
    // The default values below must be integers within the inclusive ranges stated.
    // The values can also be changed at run-time using BigNumber.set.
    // The maximum number of decimal places for operations involving division.
    DECIMAL_PLACES = 20,
        // 0 to MAX
    // The rounding mode used when rounding to the above decimal places, and when using
    // toExponential, toFixed, toFormat and toPrecision, and round (default value).
    // UP         0 Away from zero.
    // DOWN       1 Towards zero.
    // CEIL       2 Towards +Infinity.
    // FLOOR      3 Towards -Infinity.
    // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
    // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
    // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
    // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
    // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
    ROUNDING_MODE = 4,
        // 0 to 8
    // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]
    // The exponent value at and beneath which toString returns exponential notation.
    // Number type: -7
    TO_EXP_NEG = -7,
        // 0 to -MAX
    // The exponent value at and above which toString returns exponential notation.
    // Number type: 21
    TO_EXP_POS = 21,
        // 0 to MAX
    // RANGE : [MIN_EXP, MAX_EXP]
    // The minimum exponent value, beneath which underflow to zero occurs.
    // Number type: -324  (5e-324)
    MIN_EXP = -1e7,
        // -1 to -MAX
    // The maximum exponent value, above which overflow to Infinity occurs.
    // Number type:  308  (1.7976931348623157e+308)
    // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
    MAX_EXP = 1e7,
        // 1 to MAX
    // Whether to use cryptographically-secure random number generation, if available.
    CRYPTO = false,
        // true or false
    // The modulo mode used when calculating the modulus: a mod n.
    // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
    // The remainder (r) is calculated as: r = a - n * q.
    //
    // UP        0 The remainder is positive if the dividend is negative, else is negative.
    // DOWN      1 The remainder has the same sign as the dividend.
    //             This modulo mode is commonly known as 'truncated division' and is
    //             equivalent to (a % n) in JavaScript.
    // FLOOR     3 The remainder has the same sign as the divisor (Python %).
    // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
    // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
    //             The remainder is always positive.
    //
    // The truncated division, floored division, Euclidian division and IEEE 754 remainder
    // modes are commonly used for the modulus operation.
    // Although the other rounding modes can also be used, they may not give useful results.
    MODULO_MODE = 1,
        // 0 to 9
    // The maximum number of significant digits of the result of the exponentiatedBy operation.
    // If POW_PRECISION is 0, there will be unlimited significant digits.
    POW_PRECISION = 0,
        // 0 to MAX
    // The format specification used by the BigNumber.prototype.toFormat method.
    FORMAT = {
      prefix: '',
      groupSize: 3,
      secondaryGroupSize: 0,
      groupSeparator: ',',
      decimalSeparator: '.',
      fractionGroupSize: 0,
      fractionGroupSeparator: '\xA0',
      // non-breaking space
      suffix: ''
    },
        // The alphabet used for base conversion. It must be at least 2 characters long, with no '+',
    // '-', '.', whitespace, or repeated character.
    // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
    ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz',
        alphabetHasNormalDecimalDigits = true; //------------------------------------------------------------------------------------------
    // CONSTRUCTOR

    /*
     * The BigNumber constructor and exported function.
     * Create and return a new instance of a BigNumber object.
     *
     * v {number|string|BigNumber} A numeric value.
     * [b] {number} The base of v. Integer, 2 to ALPHABET.length inclusive.
     */

    function BigNumber(v, b) {
      var alphabet,
          c,
          caseChanged,
          e,
          i,
          isNum,
          len,
          str,
          x = this; // Enable constructor call without `new`.

      if (!(x instanceof BigNumber)) return new BigNumber(v, b);

      if (b == null) {
        if (v && v._isBigNumber === true) {
          x.s = v.s;

          if (!v.c || v.e > MAX_EXP) {
            x.c = x.e = null;
          } else if (v.e < MIN_EXP) {
            x.c = [x.e = 0];
          } else {
            x.e = v.e;
            x.c = v.c.slice();
          }

          return;
        }

        if ((isNum = typeof v == 'number') && v * 0 == 0) {
          // Use `1 / n` to handle minus zero also.
          x.s = 1 / v < 0 ? (v = -v, -1) : 1; // Fast path for integers, where n < 2147483648 (2**31).

          if (v === ~~v) {
            for (e = 0, i = v; i >= 10; i /= 10, e++) {
              ;
            }

            if (e > MAX_EXP) {
              x.c = x.e = null;
            } else {
              x.e = e;
              x.c = [v];
            }

            return;
          }

          str = String(v);
        } else {
          if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);
          x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
        } // Decimal point?


        if ((e = str.indexOf('.')) > -1) str = str.replace('.', ''); // Exponential form?

        if ((i = str.search(/e/i)) > 0) {
          // Determine exponent.
          if (e < 0) e = i;
          e += +str.slice(i + 1);
          str = str.substring(0, i);
        } else if (e < 0) {
          // Integer.
          e = str.length;
        }
      } else {
        // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
        intCheck(b, 2, ALPHABET.length, 'Base'); // Allow exponential notation to be used with base 10 argument, while
        // also rounding to DECIMAL_PLACES as with other bases.

        if (b == 10 && alphabetHasNormalDecimalDigits) {
          x = new BigNumber(v);
          return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
        }

        str = String(v);

        if (isNum = typeof v == 'number') {
          // Avoid potential interpretation of Infinity and NaN as base 44+ values.
          if (v * 0 != 0) return parseNumeric(x, str, isNum, b);
          x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1; // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'

          if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
            throw Error(tooManyDigits + v);
          }
        } else {
          x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
        }

        alphabet = ALPHABET.slice(0, b);
        e = i = 0; // Check that str is a valid base b number.
        // Don't use RegExp, so alphabet can contain special characters.

        for (len = str.length; i < len; i++) {
          if (alphabet.indexOf(c = str.charAt(i)) < 0) {
            if (c == '.') {
              // If '.' is not the first character and it has not be found before.
              if (i > e) {
                e = len;
                continue;
              }
            } else if (!caseChanged) {
              // Allow e.g. hexadecimal 'FF' as well as 'ff'.
              if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
                caseChanged = true;
                i = -1;
                e = 0;
                continue;
              }
            }

            return parseNumeric(x, String(v), isNum, b);
          }
        } // Prevent later check for length on converted number.


        isNum = false;
        str = convertBase(str, b, 10, x.s); // Decimal point?

        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');else e = str.length;
      } // Determine leading zeros.


      for (i = 0; str.charCodeAt(i) === 48; i++) {
        ;
      } // Determine trailing zeros.


      for (len = str.length; str.charCodeAt(--len) === 48;) {
        ;
      }

      if (str = str.slice(i, ++len)) {
        len -= i; // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'

        if (isNum && BigNumber.DEBUG && len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
          throw Error(tooManyDigits + x.s * v);
        } // Overflow?


        if ((e = e - i - 1) > MAX_EXP) {
          // Infinity.
          x.c = x.e = null; // Underflow?
        } else if (e < MIN_EXP) {
          // Zero.
          x.c = [x.e = 0];
        } else {
          x.e = e;
          x.c = []; // Transform base
          // e is the base 10 exponent.
          // i is where to slice str to get the first element of the coefficient array.

          i = (e + 1) % LOG_BASE;
          if (e < 0) i += LOG_BASE; // i < 1

          if (i < len) {
            if (i) x.c.push(+str.slice(0, i));

            for (len -= LOG_BASE; i < len;) {
              x.c.push(+str.slice(i, i += LOG_BASE));
            }

            i = LOG_BASE - (str = str.slice(i)).length;
          } else {
            i -= len;
          }

          for (; i--; str += '0') {
            ;
          }

          x.c.push(+str);
        }
      } else {
        // Zero.
        x.c = [x.e = 0];
      }
    } // CONSTRUCTOR PROPERTIES


    BigNumber.clone = clone;
    BigNumber.ROUND_UP = 0;
    BigNumber.ROUND_DOWN = 1;
    BigNumber.ROUND_CEIL = 2;
    BigNumber.ROUND_FLOOR = 3;
    BigNumber.ROUND_HALF_UP = 4;
    BigNumber.ROUND_HALF_DOWN = 5;
    BigNumber.ROUND_HALF_EVEN = 6;
    BigNumber.ROUND_HALF_CEIL = 7;
    BigNumber.ROUND_HALF_FLOOR = 8;
    BigNumber.EUCLID = 9;
    /*
     * Configure infrequently-changing library-wide settings.
     *
     * Accept an object with the following optional properties (if the value of a property is
     * a number, it must be an integer within the inclusive range stated):
     *
     *   DECIMAL_PLACES   {number}           0 to MAX
     *   ROUNDING_MODE    {number}           0 to 8
     *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
     *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
     *   CRYPTO           {boolean}          true or false
     *   MODULO_MODE      {number}           0 to 9
     *   POW_PRECISION       {number}           0 to MAX
     *   ALPHABET         {string}           A string of two or more unique characters which does
     *                                       not contain '.'.
     *   FORMAT           {object}           An object with some of the following properties:
     *     prefix                 {string}
     *     groupSize              {number}
     *     secondaryGroupSize     {number}
     *     groupSeparator         {string}
     *     decimalSeparator       {string}
     *     fractionGroupSize      {number}
     *     fractionGroupSeparator {string}
     *     suffix                 {string}
     *
     * (The values assigned to the above FORMAT object properties are not checked for validity.)
     *
     * E.g.
     * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
     *
     * Ignore properties/parameters set to null or undefined, except for ALPHABET.
     *
     * Return an object with the properties current values.
     */

    BigNumber.config = BigNumber.set = function (obj) {
      var p, v;

      if (obj != null) {
        if (typeof obj == 'object') {
          // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            DECIMAL_PLACES = v;
          } // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
          // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'


          if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
            v = obj[p];
            intCheck(v, 0, 8, p);
            ROUNDING_MODE = v;
          } // EXPONENTIAL_AT {number|number[]}
          // Integer, -MAX to MAX inclusive or
          // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
          // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'


          if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
            v = obj[p];

            if (v && v.pop) {
              intCheck(v[0], -MAX, 0, p);
              intCheck(v[1], 0, MAX, p);
              TO_EXP_NEG = v[0];
              TO_EXP_POS = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
            }
          } // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
          // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
          // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'


          if (obj.hasOwnProperty(p = 'RANGE')) {
            v = obj[p];

            if (v && v.pop) {
              intCheck(v[0], -MAX, -1, p);
              intCheck(v[1], 1, MAX, p);
              MIN_EXP = v[0];
              MAX_EXP = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);

              if (v) {
                MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
              } else {
                throw Error(bignumberError + p + ' cannot be zero: ' + v);
              }
            }
          } // CRYPTO {boolean} true or false.
          // '[BigNumber Error] CRYPTO not true or false: {v}'
          // '[BigNumber Error] crypto unavailable'


          if (obj.hasOwnProperty(p = 'CRYPTO')) {
            v = obj[p];

            if (v === !!v) {
              if (v) {
                if (typeof crypto != 'undefined' && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                  CRYPTO = v;
                } else {
                  CRYPTO = !v;
                  throw Error(bignumberError + 'crypto unavailable');
                }
              } else {
                CRYPTO = v;
              }
            } else {
              throw Error(bignumberError + p + ' not true or false: ' + v);
            }
          } // MODULO_MODE {number} Integer, 0 to 9 inclusive.
          // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'


          if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
            v = obj[p];
            intCheck(v, 0, 9, p);
            MODULO_MODE = v;
          } // POW_PRECISION {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'


          if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            POW_PRECISION = v;
          } // FORMAT {object}
          // '[BigNumber Error] FORMAT not an object: {v}'


          if (obj.hasOwnProperty(p = 'FORMAT')) {
            v = obj[p];
            if (typeof v == 'object') FORMAT = v;else throw Error(bignumberError + p + ' not an object: ' + v);
          } // ALPHABET {string}
          // '[BigNumber Error] ALPHABET invalid: {v}'


          if (obj.hasOwnProperty(p = 'ALPHABET')) {
            v = obj[p]; // Disallow if less than two characters,
            // or if it contains '+', '-', '.', whitespace, or a repeated character.

            if (typeof v == 'string' && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
              alphabetHasNormalDecimalDigits = v.slice(0, 10) == '0123456789';
              ALPHABET = v;
            } else {
              throw Error(bignumberError + p + ' invalid: ' + v);
            }
          }
        } else {
          // '[BigNumber Error] Object expected: {v}'
          throw Error(bignumberError + 'Object expected: ' + obj);
        }
      }

      return {
        DECIMAL_PLACES: DECIMAL_PLACES,
        ROUNDING_MODE: ROUNDING_MODE,
        EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
        RANGE: [MIN_EXP, MAX_EXP],
        CRYPTO: CRYPTO,
        MODULO_MODE: MODULO_MODE,
        POW_PRECISION: POW_PRECISION,
        FORMAT: FORMAT,
        ALPHABET: ALPHABET
      };
    };
    /*
     * Return true if v is a BigNumber instance, otherwise return false.
     *
     * If BigNumber.DEBUG is true, throw if a BigNumber instance is not well-formed.
     *
     * v {any}
     *
     * '[BigNumber Error] Invalid BigNumber: {v}'
     */


    BigNumber.isBigNumber = function (v) {
      if (!v || v._isBigNumber !== true) return false;
      if (!BigNumber.DEBUG) return true;
      var i,
          n,
          c = v.c,
          e = v.e,
          s = v.s;

      out: if ({}.toString.call(c) == '[object Array]') {
        if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {
          // If the first element is zero, the BigNumber value must be zero.
          if (c[0] === 0) {
            if (e === 0 && c.length === 1) return true;
            break out;
          } // Calculate number of digits that c[0] should have, based on the exponent.


          i = (e + 1) % LOG_BASE;
          if (i < 1) i += LOG_BASE; // Calculate number of digits of c[0].
          //if (Math.ceil(Math.log(c[0] + 1) / Math.LN10) == i) {

          if (String(c[0]).length == i) {
            for (i = 0; i < c.length; i++) {
              n = c[i];
              if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
            } // Last element cannot be zero, unless it is the only element.


            if (n !== 0) return true;
          }
        } // Infinity/NaN

      } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
        return true;
      }

      throw Error(bignumberError + 'Invalid BigNumber: ' + v);
    };
    /*
     * Return a new BigNumber whose value is the maximum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */


    BigNumber.maximum = BigNumber.max = function () {
      return maxOrMin(arguments, -1);
    };
    /*
     * Return a new BigNumber whose value is the minimum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */


    BigNumber.minimum = BigNumber.min = function () {
      return maxOrMin(arguments, 1);
    };
    /*
     * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
     * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
     * zeros are produced).
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
     * '[BigNumber Error] crypto unavailable'
     */


    BigNumber.random = function () {
      var pow2_53 = 0x20000000000000; // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
      // Check if Math.random() produces more than 32 bits of randomness.
      // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
      // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.

      var random53bitInt = Math.random() * pow2_53 & 0x1fffff ? function () {
        return mathfloor(Math.random() * pow2_53);
      } : function () {
        return (Math.random() * 0x40000000 | 0) * 0x800000 + (Math.random() * 0x800000 | 0);
      };
      return function (dp) {
        var a,
            b,
            e,
            k,
            v,
            i = 0,
            c = [],
            rand = new BigNumber(ONE);
        if (dp == null) dp = DECIMAL_PLACES;else intCheck(dp, 0, MAX);
        k = mathceil(dp / LOG_BASE);

        if (CRYPTO) {
          // Browsers supporting crypto.getRandomValues.
          if (crypto.getRandomValues) {
            a = crypto.getRandomValues(new Uint32Array(k *= 2));

            for (; i < k;) {
              // 53 bits:
              // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
              // 11111 11111111 11111111 11111111 11100000 00000000 00000000
              // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
              //                                     11111 11111111 11111111
              // 0x20000 is 2^21.
              v = a[i] * 0x20000 + (a[i + 1] >>> 11); // Rejection sampling:
              // 0 <= v < 9007199254740992
              // Probability that v >= 9e15, is
              // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251

              if (v >= 9e15) {
                b = crypto.getRandomValues(new Uint32Array(2));
                a[i] = b[0];
                a[i + 1] = b[1];
              } else {
                // 0 <= v <= 8999999999999999
                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 2;
              }
            }

            i = k / 2; // Node.js supporting crypto.randomBytes.
          } else if (crypto.randomBytes) {
            // buffer
            a = crypto.randomBytes(k *= 7);

            for (; i < k;) {
              // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
              // 0x100000000 is 2^32, 0x1000000 is 2^24
              // 11111 11111111 11111111 11111111 11111111 11111111 11111111
              // 0 <= v < 9007199254740992
              v = (a[i] & 31) * 0x1000000000000 + a[i + 1] * 0x10000000000 + a[i + 2] * 0x100000000 + a[i + 3] * 0x1000000 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

              if (v >= 9e15) {
                crypto.randomBytes(7).copy(a, i);
              } else {
                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 7;
              }
            }

            i = k / 7;
          } else {
            CRYPTO = false;
            throw Error(bignumberError + 'crypto unavailable');
          }
        } // Use Math.random.


        if (!CRYPTO) {
          for (; i < k;) {
            v = random53bitInt();
            if (v < 9e15) c[i++] = v % 1e14;
          }
        }

        k = c[--i];
        dp %= LOG_BASE; // Convert trailing digits to zeros according to dp.

        if (k && dp) {
          v = POWS_TEN[LOG_BASE - dp];
          c[i] = mathfloor(k / v) * v;
        } // Remove trailing elements which are zero.


        for (; c[i] === 0; c.pop(), i--) {
          ;
        } // Zero?


        if (i < 0) {
          c = [e = 0];
        } else {
          // Remove leading elements which are zero and adjust exponent accordingly.
          for (e = -1; c[0] === 0; c.splice(0, 1), e -= LOG_BASE) {
            ;
          } // Count the digits of the first element of c to determine leading zeros, and...


          for (i = 1, v = c[0]; v >= 10; v /= 10, i++) {
            ;
          } // adjust the exponent accordingly.


          if (i < LOG_BASE) e -= LOG_BASE - i;
        }

        rand.e = e;
        rand.c = c;
        return rand;
      };
    }();
    /*
     * Return a BigNumber whose value is the sum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */


    BigNumber.sum = function () {
      var i = 1,
          args = arguments,
          sum = new BigNumber(args[0]);

      for (; i < args.length;) {
        sum = sum.plus(args[i++]);
      }

      return sum;
    }; // PRIVATE FUNCTIONS
    // Called by BigNumber and BigNumber.prototype.toString.


    convertBase = function () {
      var decimal = '0123456789';
      /*
       * Convert string of baseIn to an array of numbers of baseOut.
       * Eg. toBaseOut('255', 10, 16) returns [15, 15].
       * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
       */

      function toBaseOut(str, baseIn, baseOut, alphabet) {
        var j,
            arr = [0],
            arrL,
            i = 0,
            len = str.length;

        for (; i < len;) {
          for (arrL = arr.length; arrL--; arr[arrL] *= baseIn) {
            ;
          }

          arr[0] += alphabet.indexOf(str.charAt(i++));

          for (j = 0; j < arr.length; j++) {
            if (arr[j] > baseOut - 1) {
              if (arr[j + 1] == null) arr[j + 1] = 0;
              arr[j + 1] += arr[j] / baseOut | 0;
              arr[j] %= baseOut;
            }
          }
        }

        return arr.reverse();
      } // Convert a numeric string of baseIn to a numeric string of baseOut.
      // If the caller is toString, we are converting from base 10 to baseOut.
      // If the caller is BigNumber, we are converting from baseIn to base 10.


      return function (str, baseIn, baseOut, sign, callerIsToString) {
        var alphabet,
            d,
            e,
            k,
            r,
            x,
            xc,
            y,
            i = str.indexOf('.'),
            dp = DECIMAL_PLACES,
            rm = ROUNDING_MODE; // Non-integer.

        if (i >= 0) {
          k = POW_PRECISION; // Unlimited precision.

          POW_PRECISION = 0;
          str = str.replace('.', '');
          y = new BigNumber(baseIn);
          x = y.pow(str.length - i);
          POW_PRECISION = k; // Convert str as if an integer, then restore the fraction part by dividing the
          // result by its base raised to a power.

          y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'), 10, baseOut, decimal);
          y.e = y.c.length;
        } // Convert the number as integer.


        xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet = ALPHABET, decimal) : (alphabet = decimal, ALPHABET)); // xc now represents str as an integer and converted to baseOut. e is the exponent.

        e = k = xc.length; // Remove trailing zeros.

        for (; xc[--k] == 0; xc.pop()) {
          ;
        } // Zero?


        if (!xc[0]) return alphabet.charAt(0); // Does str represent an integer? If so, no need for the division.

        if (i < 0) {
          --e;
        } else {
          x.c = xc;
          x.e = e; // The sign is needed for correct rounding.

          x.s = sign;
          x = div(x, y, dp, rm, baseOut);
          xc = x.c;
          r = x.r;
          e = x.e;
        } // xc now represents str converted to baseOut.
        // THe index of the rounding digit.


        d = e + dp + 1; // The rounding digit: the digit to the right of the digit that may be rounded up.

        i = xc[d]; // Look at the rounding digits and mode to determine whether to round up.

        k = baseOut / 2;
        r = r || d < 0 || xc[d + 1] != null;
        r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : i > k || i == k && (rm == 4 || r || rm == 6 && xc[d - 1] & 1 || rm == (x.s < 0 ? 8 : 7)); // If the index of the rounding digit is not greater than zero, or xc represents
        // zero, then the result of the base conversion is zero or, if rounding up, a value
        // such as 0.00001.

        if (d < 1 || !xc[0]) {
          // 1^-dp or 0
          str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
        } else {
          // Truncate xc to the required number of decimal places.
          xc.length = d; // Round up?

          if (r) {
            // Rounding up may mean the previous digit has to be rounded up and so on.
            for (--baseOut; ++xc[--d] > baseOut;) {
              xc[d] = 0;

              if (!d) {
                ++e;
                xc = [1].concat(xc);
              }
            }
          } // Determine trailing zeros.


          for (k = xc.length; !xc[--k];) {
            ;
          } // E.g. [4, 11, 15] becomes 4bf.


          for (i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++])) {
            ;
          } // Add leading zeros, decimal point and trailing zeros as required.


          str = toFixedPoint(str, e, alphabet.charAt(0));
        } // The caller will add the sign.


        return str;
      };
    }(); // Perform division in the specified base. Called by div and convertBase.


    div = function () {
      // Assume non-zero x and k.
      function multiply(x, k, base) {
        var m,
            temp,
            xlo,
            xhi,
            carry = 0,
            i = x.length,
            klo = k % SQRT_BASE,
            khi = k / SQRT_BASE | 0;

        for (x = x.slice(); i--;) {
          xlo = x[i] % SQRT_BASE;
          xhi = x[i] / SQRT_BASE | 0;
          m = khi * xlo + xhi * klo;
          temp = klo * xlo + m % SQRT_BASE * SQRT_BASE + carry;
          carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
          x[i] = temp % base;
        }

        if (carry) x = [carry].concat(x);
        return x;
      }

      function compare(a, b, aL, bL) {
        var i, cmp;

        if (aL != bL) {
          cmp = aL > bL ? 1 : -1;
        } else {
          for (i = cmp = 0; i < aL; i++) {
            if (a[i] != b[i]) {
              cmp = a[i] > b[i] ? 1 : -1;
              break;
            }
          }
        }

        return cmp;
      }

      function subtract(a, b, aL, base) {
        var i = 0; // Subtract b from a.

        for (; aL--;) {
          a[aL] -= i;
          i = a[aL] < b[aL] ? 1 : 0;
          a[aL] = i * base + a[aL] - b[aL];
        } // Remove leading zeros.


        for (; !a[0] && a.length > 1; a.splice(0, 1)) {
          ;
        }
      } // x: dividend, y: divisor.


      return function (x, y, dp, rm, base) {
        var cmp,
            e,
            i,
            more,
            n,
            prod,
            prodL,
            q,
            qc,
            rem,
            remL,
            rem0,
            xi,
            xL,
            yc0,
            yL,
            yz,
            s = x.s == y.s ? 1 : -1,
            xc = x.c,
            yc = y.c; // Either NaN, Infinity or 0?

        if (!xc || !xc[0] || !yc || !yc[0]) {
          return new BigNumber( // Return NaN if either NaN, or both Infinity or 0.
          !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
          xc && xc[0] == 0 || !yc ? s * 0 : s / 0);
        }

        q = new BigNumber(s);
        qc = q.c = [];
        e = x.e - y.e;
        s = dp + e + 1;

        if (!base) {
          base = BASE;
          e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
          s = s / LOG_BASE | 0;
        } // Result exponent may be one less then the current value of e.
        // The coefficients of the BigNumbers from convertBase may have trailing zeros.


        for (i = 0; yc[i] == (xc[i] || 0); i++) {
          ;
        }

        if (yc[i] > (xc[i] || 0)) e--;

        if (s < 0) {
          qc.push(1);
          more = true;
        } else {
          xL = xc.length;
          yL = yc.length;
          i = 0;
          s += 2; // Normalise xc and yc so highest order digit of yc is >= base / 2.

          n = mathfloor(base / (yc[0] + 1)); // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
          // if (n > 1 || n++ == 1 && yc[0] < base / 2) {

          if (n > 1) {
            yc = multiply(yc, n, base);
            xc = multiply(xc, n, base);
            yL = yc.length;
            xL = xc.length;
          }

          xi = yL;
          rem = xc.slice(0, yL);
          remL = rem.length; // Add zeros to make remainder as long as divisor.

          for (; remL < yL; rem[remL++] = 0) {
            ;
          }

          yz = yc.slice();
          yz = [0].concat(yz);
          yc0 = yc[0];
          if (yc[1] >= base / 2) yc0++; // Not necessary, but to prevent trial digit n > base, when using base 3.
          // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;

          do {
            n = 0; // Compare divisor and remainder.

            cmp = compare(yc, rem, yL, remL); // If divisor < remainder.

            if (cmp < 0) {
              // Calculate trial digit, n.
              rem0 = rem[0];
              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0); // n is how many times the divisor goes into the current remainder.

              n = mathfloor(rem0 / yc0); //  Algorithm:
              //  product = divisor multiplied by trial digit (n).
              //  Compare product and remainder.
              //  If product is greater than remainder:
              //    Subtract divisor from product, decrement trial digit.
              //  Subtract product from remainder.
              //  If product was less than remainder at the last compare:
              //    Compare new remainder and divisor.
              //    If remainder is greater than divisor:
              //      Subtract divisor from remainder, increment trial digit.

              if (n > 1) {
                // n may be > base only when base is 3.
                if (n >= base) n = base - 1; // product = divisor * trial digit.

                prod = multiply(yc, n, base);
                prodL = prod.length;
                remL = rem.length; // Compare product and remainder.
                // If product > remainder then trial digit n too high.
                // n is 1 too high about 5% of the time, and is not known to have
                // ever been more than 1 too high.

                while (compare(prod, rem, prodL, remL) == 1) {
                  n--; // Subtract divisor from product.

                  subtract(prod, yL < prodL ? yz : yc, prodL, base);
                  prodL = prod.length;
                  cmp = 1;
                }
              } else {
                // n is 0 or 1, cmp is -1.
                // If n is 0, there is no need to compare yc and rem again below,
                // so change cmp to 1 to avoid it.
                // If n is 1, leave cmp as -1, so yc and rem are compared again.
                if (n == 0) {
                  // divisor < remainder, so n must be at least 1.
                  cmp = n = 1;
                } // product = divisor


                prod = yc.slice();
                prodL = prod.length;
              }

              if (prodL < remL) prod = [0].concat(prod); // Subtract product from remainder.

              subtract(rem, prod, remL, base);
              remL = rem.length; // If product was < remainder.

              if (cmp == -1) {
                // Compare divisor and new remainder.
                // If divisor < new remainder, subtract divisor from remainder.
                // Trial digit n too low.
                // n is 1 too low about 5% of the time, and very rarely 2 too low.
                while (compare(yc, rem, yL, remL) < 1) {
                  n++; // Subtract divisor from remainder.

                  subtract(rem, yL < remL ? yz : yc, remL, base);
                  remL = rem.length;
                }
              }
            } else if (cmp === 0) {
              n++;
              rem = [0];
            } // else cmp === 1 and n will be 0
            // Add the next digit, n, to the result array.


            qc[i++] = n; // Update the remainder.

            if (rem[0]) {
              rem[remL++] = xc[xi] || 0;
            } else {
              rem = [xc[xi]];
              remL = 1;
            }
          } while ((xi++ < xL || rem[0] != null) && s--);

          more = rem[0] != null; // Leading zero?

          if (!qc[0]) qc.splice(0, 1);
        }

        if (base == BASE) {
          // To calculate q.e, first get the number of digits of qc[0].
          for (i = 1, s = qc[0]; s >= 10; s /= 10, i++) {
            ;
          }

          round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more); // Caller is convertBase.
        } else {
          q.e = e;
          q.r = +more;
        }

        return q;
      };
    }();
    /*
     * Return a string representing the value of BigNumber n in fixed-point or exponential
     * notation rounded to the specified decimal places or significant digits.
     *
     * n: a BigNumber.
     * i: the index of the last digit required (i.e. the digit that may be rounded up).
     * rm: the rounding mode.
     * id: 1 (toExponential) or 2 (toPrecision).
     */


    function format(n, i, rm, id) {
      var c0, e, ne, len, str;
      if (rm == null) rm = ROUNDING_MODE;else intCheck(rm, 0, 8);
      if (!n.c) return n.toString();
      c0 = n.c[0];
      ne = n.e;

      if (i == null) {
        str = coeffToString(n.c);
        str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS) ? toExponential(str, ne) : toFixedPoint(str, ne, '0');
      } else {
        n = round(new BigNumber(n), i, rm); // n.e may have changed if the value was rounded up.

        e = n.e;
        str = coeffToString(n.c);
        len = str.length; // toPrecision returns exponential notation if the number of significant digits
        // specified is less than the number of digits necessary to represent the integer
        // part of the value in fixed-point notation.
        // Exponential notation.

        if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {
          // Append zeros?
          for (; len < i; str += '0', len++) {
            ;
          }

          str = toExponential(str, e); // Fixed-point notation.
        } else {
          i -= ne;
          str = toFixedPoint(str, e, '0'); // Append zeros?

          if (e + 1 > len) {
            if (--i > 0) for (str += '.'; i--; str += '0') {
              ;
            }
          } else {
            i += e - len;

            if (i > 0) {
              if (e + 1 == len) str += '.';

              for (; i--; str += '0') {
                ;
              }
            }
          }
        }
      }

      return n.s < 0 && c0 ? '-' + str : str;
    } // Handle BigNumber.max and BigNumber.min.
    // If any number is NaN, return NaN.


    function maxOrMin(args, n) {
      var k,
          y,
          i = 1,
          x = new BigNumber(args[0]);

      for (; i < args.length; i++) {
        y = new BigNumber(args[i]);

        if (!y.s || (k = compare(x, y)) === n || k === 0 && x.s === n) {
          x = y;
        }
      }

      return x;
    }
    /*
     * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
     * Called by minus, plus and times.
     */


    function normalise(n, c, e) {
      var i = 1,
          j = c.length; // Remove trailing zeros.

      for (; !c[--j]; c.pop()) {
        ;
      } // Calculate the base 10 exponent. First get the number of digits of c[0].


      for (j = c[0]; j >= 10; j /= 10, i++) {
        ;
      } // Overflow?


      if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {
        // Infinity.
        n.c = n.e = null; // Underflow?
      } else if (e < MIN_EXP) {
        // Zero.
        n.c = [n.e = 0];
      } else {
        n.e = e;
        n.c = c;
      }

      return n;
    } // Handle values that fail the validity test in BigNumber.


    parseNumeric = function () {
      var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
          dotAfter = /^([^.]+)\.$/,
          dotBefore = /^\.([^.]+)$/,
          isInfinityOrNaN = /^-?(Infinity|NaN)$/,
          whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
      return function (x, str, isNum, b) {
        var base,
            s = isNum ? str : str.replace(whitespaceOrPlus, ''); // No exception on ±Infinity or NaN.

        if (isInfinityOrNaN.test(s)) {
          x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
        } else {
          if (!isNum) {
            // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
            s = s.replace(basePrefix, function (m, p1, p2) {
              base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
              return !b || b == base ? p1 : m;
            });

            if (b) {
              base = b; // E.g. '1.' to '1', '.1' to '0.1'

              s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
            }

            if (str != s) return new BigNumber(s, base);
          } // '[BigNumber Error] Not a number: {n}'
          // '[BigNumber Error] Not a base {b} number: {n}'


          if (BigNumber.DEBUG) {
            throw Error(bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
          } // NaN


          x.s = null;
        }

        x.c = x.e = null;
      };
    }();
    /*
     * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
     * If r is truthy, it is known that there are more digits after the rounding digit.
     */


    function round(x, sd, rm, r) {
      var d,
          i,
          j,
          k,
          n,
          ni,
          rd,
          xc = x.c,
          pows10 = POWS_TEN; // if x is not Infinity or NaN...

      if (xc) {
        // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
        // n is a base 1e14 number, the value of the element of array x.c containing rd.
        // ni is the index of n within x.c.
        // d is the number of digits of n.
        // i is the index of rd within n including leading zeros.
        // j is the actual index of rd within n (if < 0, rd is a leading zero).
        out: {
          // Get the number of digits of the first element of xc.
          for (d = 1, k = xc[0]; k >= 10; k /= 10, d++) {
            ;
          }

          i = sd - d; // If the rounding digit is in the first element of xc...

          if (i < 0) {
            i += LOG_BASE;
            j = sd;
            n = xc[ni = 0]; // Get the rounding digit at index j of n.

            rd = mathfloor(n / pows10[d - j - 1] % 10);
          } else {
            ni = mathceil((i + 1) / LOG_BASE);

            if (ni >= xc.length) {
              if (r) {
                // Needed by sqrt.
                for (; xc.length <= ni; xc.push(0)) {
                  ;
                }

                n = rd = 0;
                d = 1;
                i %= LOG_BASE;
                j = i - LOG_BASE + 1;
              } else {
                break out;
              }
            } else {
              n = k = xc[ni]; // Get the number of digits of n.

              for (d = 1; k >= 10; k /= 10, d++) {
                ;
              } // Get the index of rd within n.


              i %= LOG_BASE; // Get the index of rd within n, adjusted for leading zeros.
              // The number of leading zeros of n is given by LOG_BASE - d.

              j = i - LOG_BASE + d; // Get the rounding digit at index j of n.

              rd = j < 0 ? 0 : mathfloor(n / pows10[d - j - 1] % 10);
            }
          }

          r = r || sd < 0 || // Are there any non-zero digits after the rounding digit?
          // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
          // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
          xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);
          r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
          (i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));

          if (sd < 1 || !xc[0]) {
            xc.length = 0;

            if (r) {
              // Convert sd to decimal places.
              sd -= x.e + 1; // 1, 0.1, 0.01, 0.001, 0.0001 etc.

              xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
              x.e = -sd || 0;
            } else {
              // Zero.
              xc[0] = x.e = 0;
            }

            return x;
          } // Remove excess digits.


          if (i == 0) {
            xc.length = ni;
            k = 1;
            ni--;
          } else {
            xc.length = ni + 1;
            k = pows10[LOG_BASE - i]; // E.g. 56700 becomes 56000 if 7 is the rounding digit.
            // j > 0 means i > number of leading zeros of n.

            xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
          } // Round up?


          if (r) {
            for (;;) {
              // If the digit to be rounded up is in the first element of xc...
              if (ni == 0) {
                // i will be the length of xc[0] before k is added.
                for (i = 1, j = xc[0]; j >= 10; j /= 10, i++) {
                  ;
                }

                j = xc[0] += k;

                for (k = 1; j >= 10; j /= 10, k++) {
                  ;
                } // if i != k the length has increased.


                if (i != k) {
                  x.e++;
                  if (xc[0] == BASE) xc[0] = 1;
                }

                break;
              } else {
                xc[ni] += k;
                if (xc[ni] != BASE) break;
                xc[ni--] = 0;
                k = 1;
              }
            }
          } // Remove trailing zeros.


          for (i = xc.length; xc[--i] === 0; xc.pop()) {
            ;
          }
        } // Overflow? Infinity.


        if (x.e > MAX_EXP) {
          x.c = x.e = null; // Underflow? Zero.
        } else if (x.e < MIN_EXP) {
          x.c = [x.e = 0];
        }
      }

      return x;
    }

    function valueOf(n) {
      var str,
          e = n.e;
      if (e === null) return n.toString();
      str = coeffToString(n.c);
      str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e, '0');
      return n.s < 0 ? '-' + str : str;
    } // PROTOTYPE/INSTANCE METHODS

    /*
     * Return a new BigNumber whose value is the absolute value of this BigNumber.
     */


    P.absoluteValue = P.abs = function () {
      var x = new BigNumber(this);
      if (x.s < 0) x.s = 1;
      return x;
    };
    /*
     * Return
     *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
     *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
     *   0 if they have the same value,
     *   or null if the value of either is NaN.
     */


    P.comparedTo = function (y, b) {
      return compare(this, new BigNumber(y, b));
    };
    /*
     * If dp is undefined or null or true or false, return the number of decimal places of the
     * value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     *
     * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */


    P.decimalPlaces = P.dp = function (dp, rm) {
      var c,
          n,
          v,
          x = this;

      if (dp != null) {
        intCheck(dp, 0, MAX);
        if (rm == null) rm = ROUNDING_MODE;else intCheck(rm, 0, 8);
        return round(new BigNumber(x), dp + x.e + 1, rm);
      }

      if (!(c = x.c)) return null;
      n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE; // Subtract the number of trailing zeros of the last number.

      if (v = c[v]) for (; v % 10 == 0; v /= 10, n--) {
        ;
      }
      if (n < 0) n = 0;
      return n;
    };
    /*
     *  n / 0 = I
     *  n / N = N
     *  n / I = 0
     *  0 / n = 0
     *  0 / 0 = N
     *  0 / N = N
     *  0 / I = 0
     *  N / n = N
     *  N / 0 = N
     *  N / N = N
     *  N / I = N
     *  I / n = I
     *  I / 0 = I
     *  I / N = N
     *  I / I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
     * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */


    P.dividedBy = P.div = function (y, b) {
      return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
    };
    /*
     * Return a new BigNumber whose value is the integer part of dividing the value of this
     * BigNumber by the value of BigNumber(y, b).
     */


    P.dividedToIntegerBy = P.idiv = function (y, b) {
      return div(this, new BigNumber(y, b), 0, 1);
    };
    /*
     * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
     *
     * If m is present, return the result modulo m.
     * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
     * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
     *
     * The modular power operation works efficiently when x, n, and m are integers, otherwise it
     * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
     *
     * n {number|string|BigNumber} The exponent. An integer.
     * [m] {number|string|BigNumber} The modulus.
     *
     * '[BigNumber Error] Exponent not an integer: {n}'
     */


    P.exponentiatedBy = P.pow = function (n, m) {
      var half,
          isModExp,
          i,
          k,
          more,
          nIsBig,
          nIsNeg,
          nIsOdd,
          y,
          x = this;
      n = new BigNumber(n); // Allow NaN and ±Infinity, but not other non-integers.

      if (n.c && !n.isInteger()) {
        throw Error(bignumberError + 'Exponent not an integer: ' + valueOf(n));
      }

      if (m != null) m = new BigNumber(m); // Exponent of MAX_SAFE_INTEGER is 15.

      nIsBig = n.e > 14; // If x is NaN, ±Infinity, ±0 or ±1, or n is ±Infinity, NaN or ±0.

      if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {
        // The sign of the result of pow when x is negative depends on the evenness of n.
        // If +n overflows to ±Infinity, the evenness of n would be not be known.
        y = new BigNumber(Math.pow(+valueOf(x), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
        return m ? y.mod(m) : y;
      }

      nIsNeg = n.s < 0;

      if (m) {
        // x % m returns NaN if abs(m) is zero, or m is NaN.
        if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);
        isModExp = !nIsNeg && x.isInteger() && m.isInteger();
        if (isModExp) x = x.mod(m); // Overflow to ±Infinity: >=2**1e10 or >=1.0000024**1e15.
        // Underflow to ±0: <=0.79**1e10 or <=0.9999975**1e15.
      } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0 // [1, 240000000]
      ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7 // [80000000000000]  [99999750000000]
      : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {
        // If x is negative and n is odd, k = -0, else k = 0.
        k = x.s < 0 && isOdd(n) ? -0 : 0; // If x >= 1, k = ±Infinity.

        if (x.e > -1) k = 1 / k; // If n is negative return ±0, else return ±Infinity.

        return new BigNumber(nIsNeg ? 1 / k : k);
      } else if (POW_PRECISION) {
        // Truncating each coefficient array to a length of k after each multiplication
        // equates to truncating significant digits to POW_PRECISION + [28, 41],
        // i.e. there will be a minimum of 28 guard digits retained.
        k = mathceil(POW_PRECISION / LOG_BASE + 2);
      }

      if (nIsBig) {
        half = new BigNumber(0.5);
        if (nIsNeg) n.s = 1;
        nIsOdd = isOdd(n);
      } else {
        i = Math.abs(+valueOf(n));
        nIsOdd = i % 2;
      }

      y = new BigNumber(ONE); // Performs 54 loop iterations for n of 9007199254740991.

      for (;;) {
        if (nIsOdd) {
          y = y.times(x);
          if (!y.c) break;

          if (k) {
            if (y.c.length > k) y.c.length = k;
          } else if (isModExp) {
            y = y.mod(m); //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
          }
        }

        if (i) {
          i = mathfloor(i / 2);
          if (i === 0) break;
          nIsOdd = i % 2;
        } else {
          n = n.times(half);
          round(n, n.e + 1, 1);

          if (n.e > 14) {
            nIsOdd = isOdd(n);
          } else {
            i = +valueOf(n);
            if (i === 0) break;
            nIsOdd = i % 2;
          }
        }

        x = x.times(x);

        if (k) {
          if (x.c && x.c.length > k) x.c.length = k;
        } else if (isModExp) {
          x = x.mod(m); //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
        }
      }

      if (isModExp) return y;
      if (nIsNeg) y = ONE.div(y);
      return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
    };
    /*
     * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
     * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
     */


    P.integerValue = function (rm) {
      var n = new BigNumber(this);
      if (rm == null) rm = ROUNDING_MODE;else intCheck(rm, 0, 8);
      return round(n, n.e + 1, rm);
    };
    /*
     * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
     * otherwise return false.
     */


    P.isEqualTo = P.eq = function (y, b) {
      return compare(this, new BigNumber(y, b)) === 0;
    };
    /*
     * Return true if the value of this BigNumber is a finite number, otherwise return false.
     */


    P.isFinite = function () {
      return !!this.c;
    };
    /*
     * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
     * otherwise return false.
     */


    P.isGreaterThan = P.gt = function (y, b) {
      return compare(this, new BigNumber(y, b)) > 0;
    };
    /*
     * Return true if the value of this BigNumber is greater than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */


    P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;
    };
    /*
     * Return true if the value of this BigNumber is an integer, otherwise return false.
     */


    P.isInteger = function () {
      return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
    };
    /*
     * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
     * otherwise return false.
     */


    P.isLessThan = P.lt = function (y, b) {
      return compare(this, new BigNumber(y, b)) < 0;
    };
    /*
     * Return true if the value of this BigNumber is less than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */


    P.isLessThanOrEqualTo = P.lte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
    };
    /*
     * Return true if the value of this BigNumber is NaN, otherwise return false.
     */


    P.isNaN = function () {
      return !this.s;
    };
    /*
     * Return true if the value of this BigNumber is negative, otherwise return false.
     */


    P.isNegative = function () {
      return this.s < 0;
    };
    /*
     * Return true if the value of this BigNumber is positive, otherwise return false.
     */


    P.isPositive = function () {
      return this.s > 0;
    };
    /*
     * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
     */


    P.isZero = function () {
      return !!this.c && this.c[0] == 0;
    };
    /*
     *  n - 0 = n
     *  n - N = N
     *  n - I = -I
     *  0 - n = -n
     *  0 - 0 = 0
     *  0 - N = N
     *  0 - I = -I
     *  N - n = N
     *  N - 0 = N
     *  N - N = N
     *  N - I = N
     *  I - n = I
     *  I - 0 = I
     *  I - N = N
     *  I - I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber minus the value of
     * BigNumber(y, b).
     */


    P.minus = function (y, b) {
      var i,
          j,
          t,
          xLTy,
          x = this,
          a = x.s;
      y = new BigNumber(y, b);
      b = y.s; // Either NaN?

      if (!a || !b) return new BigNumber(NaN); // Signs differ?

      if (a != b) {
        y.s = -b;
        return x.plus(y);
      }

      var xe = x.e / LOG_BASE,
          ye = y.e / LOG_BASE,
          xc = x.c,
          yc = y.c;

      if (!xe || !ye) {
        // Either Infinity?
        if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN); // Either zero?

        if (!xc[0] || !yc[0]) {
          // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
          return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x : // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
          ROUNDING_MODE == 3 ? -0 : 0);
        }
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice(); // Determine which is the bigger number.

      if (a = xe - ye) {
        if (xLTy = a < 0) {
          a = -a;
          t = xc;
        } else {
          ye = xe;
          t = yc;
        }

        t.reverse(); // Prepend zeros to equalise exponents.

        for (b = a; b--; t.push(0)) {
          ;
        }

        t.reverse();
      } else {
        // Exponents equal. Check digit by digit.
        j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

        for (a = b = 0; b < j; b++) {
          if (xc[b] != yc[b]) {
            xLTy = xc[b] < yc[b];
            break;
          }
        }
      } // x < y? Point xc to the array of the bigger number.


      if (xLTy) {
        t = xc;
        xc = yc;
        yc = t;
        y.s = -y.s;
      }

      b = (j = yc.length) - (i = xc.length); // Append zeros to xc if shorter.
      // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.

      if (b > 0) for (; b--; xc[i++] = 0) {
        ;
      }
      b = BASE - 1; // Subtract yc from xc.

      for (; j > a;) {
        if (xc[--j] < yc[j]) {
          for (i = j; i && !xc[--i]; xc[i] = b) {
            ;
          }

          --xc[i];
          xc[j] += BASE;
        }

        xc[j] -= yc[j];
      } // Remove leading zeros and adjust exponent accordingly.


      for (; xc[0] == 0; xc.splice(0, 1), --ye) {
        ;
      } // Zero?


      if (!xc[0]) {
        // Following IEEE 754 (2008) 6.3,
        // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
        y.s = ROUNDING_MODE == 3 ? -1 : 1;
        y.c = [y.e = 0];
        return y;
      } // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
      // for finite x and y.


      return normalise(y, xc, ye);
    };
    /*
     *   n % 0 =  N
     *   n % N =  N
     *   n % I =  n
     *   0 % n =  0
     *  -0 % n = -0
     *   0 % 0 =  N
     *   0 % N =  N
     *   0 % I =  0
     *   N % n =  N
     *   N % 0 =  N
     *   N % N =  N
     *   N % I =  N
     *   I % n =  N
     *   I % 0 =  N
     *   I % N =  N
     *   I % I =  N
     *
     * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
     * BigNumber(y, b). The result depends on the value of MODULO_MODE.
     */


    P.modulo = P.mod = function (y, b) {
      var q,
          s,
          x = this;
      y = new BigNumber(y, b); // Return NaN if x is Infinity or NaN, or y is NaN or zero.

      if (!x.c || !y.s || y.c && !y.c[0]) {
        return new BigNumber(NaN); // Return x if y is Infinity or x is zero.
      } else if (!y.c || x.c && !x.c[0]) {
        return new BigNumber(x);
      }

      if (MODULO_MODE == 9) {
        // Euclidian division: q = sign(y) * floor(x / abs(y))
        // r = x - qy    where  0 <= r < abs(y)
        s = y.s;
        y.s = 1;
        q = div(x, y, 0, 3);
        y.s = s;
        q.s *= s;
      } else {
        q = div(x, y, 0, MODULO_MODE);
      }

      y = x.minus(q.times(y)); // To match JavaScript %, ensure sign of zero is sign of dividend.

      if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;
      return y;
    };
    /*
     *  n * 0 = 0
     *  n * N = N
     *  n * I = I
     *  0 * n = 0
     *  0 * 0 = 0
     *  0 * N = N
     *  0 * I = N
     *  N * n = N
     *  N * 0 = N
     *  N * N = N
     *  N * I = N
     *  I * n = I
     *  I * 0 = N
     *  I * N = N
     *  I * I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
     * of BigNumber(y, b).
     */


    P.multipliedBy = P.times = function (y, b) {
      var c,
          e,
          i,
          j,
          k,
          m,
          xcL,
          xlo,
          xhi,
          ycL,
          ylo,
          yhi,
          zc,
          base,
          sqrtBase,
          x = this,
          xc = x.c,
          yc = (y = new BigNumber(y, b)).c; // Either NaN, ±Infinity or ±0?

      if (!xc || !yc || !xc[0] || !yc[0]) {
        // Return NaN if either is NaN, or one is 0 and the other is Infinity.
        if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
          y.c = y.e = y.s = null;
        } else {
          y.s *= x.s; // Return ±Infinity if either is ±Infinity.

          if (!xc || !yc) {
            y.c = y.e = null; // Return ±0 if either is ±0.
          } else {
            y.c = [0];
            y.e = 0;
          }
        }

        return y;
      }

      e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
      y.s *= x.s;
      xcL = xc.length;
      ycL = yc.length; // Ensure xc points to longer array and xcL to its length.

      if (xcL < ycL) {
        zc = xc;
        xc = yc;
        yc = zc;
        i = xcL;
        xcL = ycL;
        ycL = i;
      } // Initialise the result array with zeros.


      for (i = xcL + ycL, zc = []; i--; zc.push(0)) {
        ;
      }

      base = BASE;
      sqrtBase = SQRT_BASE;

      for (i = ycL; --i >= 0;) {
        c = 0;
        ylo = yc[i] % sqrtBase;
        yhi = yc[i] / sqrtBase | 0;

        for (k = xcL, j = i + k; j > i;) {
          xlo = xc[--k] % sqrtBase;
          xhi = xc[k] / sqrtBase | 0;
          m = yhi * xlo + xhi * ylo;
          xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j] + c;
          c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
          zc[j--] = xlo % base;
        }

        zc[j] = c;
      }

      if (c) {
        ++e;
      } else {
        zc.splice(0, 1);
      }

      return normalise(y, zc, e);
    };
    /*
     * Return a new BigNumber whose value is the value of this BigNumber negated,
     * i.e. multiplied by -1.
     */


    P.negated = function () {
      var x = new BigNumber(this);
      x.s = -x.s || null;
      return x;
    };
    /*
     *  n + 0 = n
     *  n + N = N
     *  n + I = I
     *  0 + n = n
     *  0 + 0 = 0
     *  0 + N = N
     *  0 + I = I
     *  N + n = N
     *  N + 0 = N
     *  N + N = N
     *  N + I = N
     *  I + n = I
     *  I + 0 = I
     *  I + N = N
     *  I + I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber plus the value of
     * BigNumber(y, b).
     */


    P.plus = function (y, b) {
      var t,
          x = this,
          a = x.s;
      y = new BigNumber(y, b);
      b = y.s; // Either NaN?

      if (!a || !b) return new BigNumber(NaN); // Signs differ?

      if (a != b) {
        y.s = -b;
        return x.minus(y);
      }

      var xe = x.e / LOG_BASE,
          ye = y.e / LOG_BASE,
          xc = x.c,
          yc = y.c;

      if (!xe || !ye) {
        // Return ±Infinity if either ±Infinity.
        if (!xc || !yc) return new BigNumber(a / 0); // Either zero?
        // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.

        if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice(); // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.

      if (a = xe - ye) {
        if (a > 0) {
          ye = xe;
          t = yc;
        } else {
          a = -a;
          t = xc;
        }

        t.reverse();

        for (; a--; t.push(0)) {
          ;
        }

        t.reverse();
      }

      a = xc.length;
      b = yc.length; // Point xc to the longer array, and b to the shorter length.

      if (a - b < 0) {
        t = yc;
        yc = xc;
        xc = t;
        b = a;
      } // Only start adding at yc.length - 1 as the further digits of xc can be ignored.


      for (a = 0; b;) {
        a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
        xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
      }

      if (a) {
        xc = [a].concat(xc);
        ++ye;
      } // No need to check for zero, as +x + +y != 0 && -x + -y != 0
      // ye = MAX_EXP + 1 possible


      return normalise(y, xc, ye);
    };
    /*
     * If sd is undefined or null or true or false, return the number of significant digits of
     * the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     * If sd is true include integer-part trailing zeros in the count.
     *
     * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
     *                     boolean: whether to count integer-part trailing zeros: true or false.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */


    P.precision = P.sd = function (sd, rm) {
      var c,
          n,
          v,
          x = this;

      if (sd != null && sd !== !!sd) {
        intCheck(sd, 1, MAX);
        if (rm == null) rm = ROUNDING_MODE;else intCheck(rm, 0, 8);
        return round(new BigNumber(x), sd, rm);
      }

      if (!(c = x.c)) return null;
      v = c.length - 1;
      n = v * LOG_BASE + 1;

      if (v = c[v]) {
        // Subtract the number of trailing zeros of the last element.
        for (; v % 10 == 0; v /= 10, n--) {
          ;
        } // Add the number of digits of the first element.


        for (v = c[0]; v >= 10; v /= 10, n++) {
          ;
        }
      }

      if (sd && x.e + 1 > n) n = x.e + 1;
      return n;
    };
    /*
     * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
     * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
     *
     * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
     */


    P.shiftedBy = function (k) {
      intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
      return this.times('1e' + k);
    };
    /*
     *  sqrt(-n) =  N
     *  sqrt(N) =  N
     *  sqrt(-I) =  N
     *  sqrt(I) =  I
     *  sqrt(0) =  0
     *  sqrt(-0) = -0
     *
     * Return a new BigNumber whose value is the square root of the value of this BigNumber,
     * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */


    P.squareRoot = P.sqrt = function () {
      var m,
          n,
          r,
          rep,
          t,
          x = this,
          c = x.c,
          s = x.s,
          e = x.e,
          dp = DECIMAL_PLACES + 4,
          half = new BigNumber('0.5'); // Negative/NaN/Infinity/zero?

      if (s !== 1 || !c || !c[0]) {
        return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
      } // Initial estimate.


      s = Math.sqrt(+valueOf(x)); // Math.sqrt underflow/overflow?
      // Pass x to Math.sqrt as integer, then adjust the exponent of the result.

      if (s == 0 || s == 1 / 0) {
        n = coeffToString(c);
        if ((n.length + e) % 2 == 0) n += '0';
        s = Math.sqrt(+n);
        e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

        if (s == 1 / 0) {
          n = '5e' + e;
        } else {
          n = s.toExponential();
          n = n.slice(0, n.indexOf('e') + 1) + e;
        }

        r = new BigNumber(n);
      } else {
        r = new BigNumber(s + '');
      } // Check for zero.
      // r could be zero if MIN_EXP is changed after the this value was created.
      // This would cause a division by zero (x/t) and hence Infinity below, which would cause
      // coeffToString to throw.


      if (r.c[0]) {
        e = r.e;
        s = e + dp;
        if (s < 3) s = 0; // Newton-Raphson iteration.

        for (;;) {
          t = r;
          r = half.times(t.plus(div(x, t, dp, 1)));

          if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {
            // The exponent of r may here be one less than the final result exponent,
            // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
            // are indexed correctly.
            if (r.e < e) --s;
            n = n.slice(s - 3, s + 1); // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
            // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
            // iteration.

            if (n == '9999' || !rep && n == '4999') {
              // On the first iteration only, check to see if rounding up gives the
              // exact result as the nines may infinitely repeat.
              if (!rep) {
                round(t, t.e + DECIMAL_PLACES + 2, 0);

                if (t.times(t).eq(x)) {
                  r = t;
                  break;
                }
              }

              dp += 4;
              s += 4;
              rep = 1;
            } else {
              // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
              // result. If not, then there are further digits and m will be truthy.
              if (!+n || !+n.slice(1) && n.charAt(0) == '5') {
                // Truncate to the first rounding digit.
                round(r, r.e + DECIMAL_PLACES + 2, 1);
                m = !r.times(r).eq(x);
              }

              break;
            }
          }
        }
      }

      return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
    };
    /*
     * Return a string representing the value of this BigNumber in exponential notation and
     * rounded using ROUNDING_MODE to dp fixed decimal places.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */


    P.toExponential = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp++;
      }

      return format(this, dp, rm, 1);
    };
    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounding
     * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
     * but e.g. (-0.00001).toFixed(0) is '-0'.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */


    P.toFixed = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp = dp + this.e + 1;
      }

      return format(this, dp, rm);
    };
    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounded
     * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
     * of the format or FORMAT object (see BigNumber.set).
     *
     * The formatting object may contain some or all of the properties shown below.
     *
     * FORMAT = {
     *   prefix: '',
     *   groupSize: 3,
     *   secondaryGroupSize: 0,
     *   groupSeparator: ',',
     *   decimalSeparator: '.',
     *   fractionGroupSize: 0,
     *   fractionGroupSeparator: '\xA0',      // non-breaking space
     *   suffix: ''
     * };
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     * [format] {object} Formatting options. See FORMAT pbject above.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     * '[BigNumber Error] Argument not an object: {format}'
     */


    P.toFormat = function (dp, rm, format) {
      var str,
          x = this;

      if (format == null) {
        if (dp != null && rm && typeof rm == 'object') {
          format = rm;
          rm = null;
        } else if (dp && typeof dp == 'object') {
          format = dp;
          dp = rm = null;
        } else {
          format = FORMAT;
        }
      } else if (typeof format != 'object') {
        throw Error(bignumberError + 'Argument not an object: ' + format);
      }

      str = x.toFixed(dp, rm);

      if (x.c) {
        var i,
            arr = str.split('.'),
            g1 = +format.groupSize,
            g2 = +format.secondaryGroupSize,
            groupSeparator = format.groupSeparator || '',
            intPart = arr[0],
            fractionPart = arr[1],
            isNeg = x.s < 0,
            intDigits = isNeg ? intPart.slice(1) : intPart,
            len = intDigits.length;

        if (g2) {
          i = g1;
          g1 = g2;
          g2 = i;
          len -= i;
        }

        if (g1 > 0 && len > 0) {
          i = len % g1 || g1;
          intPart = intDigits.substr(0, i);

          for (; i < len; i += g1) {
            intPart += groupSeparator + intDigits.substr(i, g1);
          }

          if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
          if (isNeg) intPart = '-' + intPart;
        }

        str = fractionPart ? intPart + (format.decimalSeparator || '') + ((g2 = +format.fractionGroupSize) ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'), '$&' + (format.fractionGroupSeparator || '')) : fractionPart) : intPart;
      }

      return (format.prefix || '') + str + (format.suffix || '');
    };
    /*
     * Return an array of two BigNumbers representing the value of this BigNumber as a simple
     * fraction with an integer numerator and an integer denominator.
     * The denominator will be a positive non-zero value less than or equal to the specified
     * maximum denominator. If a maximum denominator is not specified, the denominator will be
     * the lowest value necessary to represent the number exactly.
     *
     * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
     *
     * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
     */


    P.toFraction = function (md) {
      var d,
          d0,
          d1,
          d2,
          e,
          exp,
          n,
          n0,
          n1,
          q,
          r,
          s,
          x = this,
          xc = x.c;

      if (md != null) {
        n = new BigNumber(md); // Throw if md is less than one or is not an integer, unless it is Infinity.

        if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
          throw Error(bignumberError + 'Argument ' + (n.isInteger() ? 'out of range: ' : 'not an integer: ') + valueOf(n));
        }
      }

      if (!xc) return new BigNumber(x);
      d = new BigNumber(ONE);
      n1 = d0 = new BigNumber(ONE);
      d1 = n0 = new BigNumber(ONE);
      s = coeffToString(xc); // Determine initial denominator.
      // d is a power of 10 and the minimum max denominator that specifies the value exactly.

      e = d.e = s.length - x.e - 1;
      d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
      md = !md || n.comparedTo(d) > 0 ? e > 0 ? d : n1 : n;
      exp = MAX_EXP;
      MAX_EXP = 1 / 0;
      n = new BigNumber(s); // n0 = d1 = 0

      n0.c[0] = 0;

      for (;;) {
        q = div(n, d, 0, 1);
        d2 = d0.plus(q.times(d1));
        if (d2.comparedTo(md) == 1) break;
        d0 = d1;
        d1 = d2;
        n1 = n0.plus(q.times(d2 = n1));
        n0 = d2;
        d = n.minus(q.times(d2 = d));
        n = d2;
      }

      d2 = div(md.minus(d0), d1, 0, 1);
      n0 = n0.plus(d2.times(n1));
      d0 = d0.plus(d2.times(d1));
      n0.s = n1.s = x.s;
      e = e * 2; // Determine which fraction is closer to x, n0/d0 or n1/d1

      r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];
      MAX_EXP = exp;
      return r;
    };
    /*
     * Return the value of this BigNumber converted to a number primitive.
     */


    P.toNumber = function () {
      return +valueOf(this);
    };
    /*
     * Return a string representing the value of this BigNumber rounded to sd significant digits
     * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
     * necessary to represent the integer part of the value in fixed-point notation, then use
     * exponential notation.
     *
     * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */


    P.toPrecision = function (sd, rm) {
      if (sd != null) intCheck(sd, 1, MAX);
      return format(this, sd, rm, 2);
    };
    /*
     * Return a string representing the value of this BigNumber in base b, or base 10 if b is
     * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
     * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
     * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
     * TO_EXP_NEG, return exponential notation.
     *
     * [b] {number} Integer, 2 to ALPHABET.length inclusive.
     *
     * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
     */


    P.toString = function (b) {
      var str,
          n = this,
          s = n.s,
          e = n.e; // Infinity or NaN?

      if (e === null) {
        if (s) {
          str = 'Infinity';
          if (s < 0) str = '-' + str;
        } else {
          str = 'NaN';
        }
      } else {
        if (b == null) {
          str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(coeffToString(n.c), e) : toFixedPoint(coeffToString(n.c), e, '0');
        } else if (b === 10 && alphabetHasNormalDecimalDigits) {
          n = round(new BigNumber(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
          str = toFixedPoint(coeffToString(n.c), n.e, '0');
        } else {
          intCheck(b, 2, ALPHABET.length, 'Base');
          str = convertBase(toFixedPoint(coeffToString(n.c), e, '0'), 10, b, s, true);
        }

        if (s < 0 && n.c[0]) str = '-' + str;
      }

      return str;
    };
    /*
     * Return as toString, but do not accept a base argument, and include the minus sign for
     * negative zero.
     */


    P.valueOf = P.toJSON = function () {
      return valueOf(this);
    };

    P._isBigNumber = true;
    if (configObject != null) BigNumber.set(configObject);
    return BigNumber;
  } // PRIVATE HELPER FUNCTIONS
  // These functions don't need access to variables,
  // e.g. DECIMAL_PLACES, in the scope of the `clone` function above.


  function bitFloor(n) {
    var i = n | 0;
    return n > 0 || n === i ? i : i - 1;
  } // Return a coefficient array as a string of base 10 digits.


  function coeffToString(a) {
    var s,
        z,
        i = 1,
        j = a.length,
        r = a[0] + '';

    for (; i < j;) {
      s = a[i++] + '';
      z = LOG_BASE - s.length;

      for (; z--; s = '0' + s) {
        ;
      }

      r += s;
    } // Determine trailing zeros.


    for (j = r.length; r.charCodeAt(--j) === 48;) {
      ;
    }

    return r.slice(0, j + 1 || 1);
  } // Compare the value of BigNumbers x and y.


  function compare(x, y) {
    var a,
        b,
        xc = x.c,
        yc = y.c,
        i = x.s,
        j = y.s,
        k = x.e,
        l = y.e; // Either NaN?

    if (!i || !j) return null;
    a = xc && !xc[0];
    b = yc && !yc[0]; // Either zero?

    if (a || b) return a ? b ? 0 : -j : i; // Signs differ?

    if (i != j) return i;
    a = i < 0;
    b = k == l; // Either Infinity?

    if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1; // Compare exponents.

    if (!b) return k > l ^ a ? 1 : -1;
    j = (k = xc.length) < (l = yc.length) ? k : l; // Compare digit by digit.

    for (i = 0; i < j; i++) {
      if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;
    } // Compare lengths.


    return k == l ? 0 : k > l ^ a ? 1 : -1;
  }
  /*
   * Check that n is a primitive number, an integer, and in range, otherwise throw.
   */


  function intCheck(n, min, max, name) {
    if (n < min || n > max || n !== mathfloor(n)) {
      throw Error(bignumberError + (name || 'Argument') + (typeof n == 'number' ? n < min || n > max ? ' out of range: ' : ' not an integer: ' : ' not a primitive number: ') + String(n));
    }
  } // Assumes finite n.


  function isOdd(n) {
    var k = n.c.length - 1;
    return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
  }

  function toExponential(str, e) {
    return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) + (e < 0 ? 'e' : 'e+') + e;
  }

  function toFixedPoint(str, e, z) {
    var len, zs; // Negative exponent?

    if (e < 0) {
      // Prepend zeros.
      for (zs = z + '.'; ++e; zs += z) {
        ;
      }

      str = zs + str; // Positive exponent
    } else {
      len = str.length; // Append zeros.

      if (++e > len) {
        for (zs = z, e -= len; --e; zs += z) {
          ;
        }

        str += zs;
      } else if (e < len) {
        str = str.slice(0, e) + '.' + str.slice(e);
      }
    }

    return str;
  } // EXPORT


  BigNumber = clone();
  BigNumber['default'] = BigNumber.BigNumber = BigNumber; // AMD.

  if (typeof define == 'function' && define.amd) {
    define(function () {
      return BigNumber;
    }); // Node.js and other environments that support module.exports.
  } else if (typeof module != 'undefined' && module.exports) {
    module.exports = BigNumber; // Browser.
  } else {
    if (!globalObject) {
      globalObject = typeof self != 'undefined' && self ? self : window;
    }

    globalObject.BigNumber = BigNumber;
  }
})(void 0);

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvYmlnbnVtYmVyL2JpZ251bWJlci5qcyJdLCJuYW1lcyI6WyJnbG9iYWxPYmplY3QiLCJCaWdOdW1iZXIiLCJpc051bWVyaWMiLCJtYXRoY2VpbCIsIk1hdGgiLCJjZWlsIiwibWF0aGZsb29yIiwiZmxvb3IiLCJiaWdudW1iZXJFcnJvciIsInRvb01hbnlEaWdpdHMiLCJCQVNFIiwiTE9HX0JBU0UiLCJNQVhfU0FGRV9JTlRFR0VSIiwiUE9XU19URU4iLCJTUVJUX0JBU0UiLCJNQVgiLCJjbG9uZSIsImNvbmZpZ09iamVjdCIsImRpdiIsImNvbnZlcnRCYXNlIiwicGFyc2VOdW1lcmljIiwiUCIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwidG9TdHJpbmciLCJ2YWx1ZU9mIiwiT05FIiwiREVDSU1BTF9QTEFDRVMiLCJST1VORElOR19NT0RFIiwiVE9fRVhQX05FRyIsIlRPX0VYUF9QT1MiLCJNSU5fRVhQIiwiTUFYX0VYUCIsIkNSWVBUTyIsIk1PRFVMT19NT0RFIiwiUE9XX1BSRUNJU0lPTiIsIkZPUk1BVCIsInByZWZpeCIsImdyb3VwU2l6ZSIsInNlY29uZGFyeUdyb3VwU2l6ZSIsImdyb3VwU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImZyYWN0aW9uR3JvdXBTaXplIiwiZnJhY3Rpb25Hcm91cFNlcGFyYXRvciIsInN1ZmZpeCIsIkFMUEhBQkVUIiwiYWxwaGFiZXRIYXNOb3JtYWxEZWNpbWFsRGlnaXRzIiwidiIsImIiLCJhbHBoYWJldCIsImMiLCJjYXNlQ2hhbmdlZCIsImUiLCJpIiwiaXNOdW0iLCJsZW4iLCJzdHIiLCJ4IiwiX2lzQmlnTnVtYmVyIiwicyIsInNsaWNlIiwiU3RyaW5nIiwidGVzdCIsImNoYXJDb2RlQXQiLCJpbmRleE9mIiwicmVwbGFjZSIsInNlYXJjaCIsInN1YnN0cmluZyIsImxlbmd0aCIsImludENoZWNrIiwicm91bmQiLCJERUJVRyIsIkVycm9yIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJ0b0xvd2VyQ2FzZSIsInB1c2giLCJST1VORF9VUCIsIlJPVU5EX0RPV04iLCJST1VORF9DRUlMIiwiUk9VTkRfRkxPT1IiLCJST1VORF9IQUxGX1VQIiwiUk9VTkRfSEFMRl9ET1dOIiwiUk9VTkRfSEFMRl9FVkVOIiwiUk9VTkRfSEFMRl9DRUlMIiwiUk9VTkRfSEFMRl9GTE9PUiIsIkVVQ0xJRCIsImNvbmZpZyIsInNldCIsIm9iaiIsInAiLCJoYXNPd25Qcm9wZXJ0eSIsInBvcCIsImNyeXB0byIsImdldFJhbmRvbVZhbHVlcyIsInJhbmRvbUJ5dGVzIiwiRVhQT05FTlRJQUxfQVQiLCJSQU5HRSIsImlzQmlnTnVtYmVyIiwibiIsIm91dCIsImNhbGwiLCJtYXhpbXVtIiwibWF4IiwibWF4T3JNaW4iLCJhcmd1bWVudHMiLCJtaW5pbXVtIiwibWluIiwicmFuZG9tIiwicG93Ml81MyIsInJhbmRvbTUzYml0SW50IiwiZHAiLCJhIiwiayIsInJhbmQiLCJVaW50MzJBcnJheSIsImNvcHkiLCJzcGxpY2UiLCJzdW0iLCJhcmdzIiwicGx1cyIsImRlY2ltYWwiLCJ0b0Jhc2VPdXQiLCJiYXNlSW4iLCJiYXNlT3V0IiwiaiIsImFyciIsImFyckwiLCJyZXZlcnNlIiwic2lnbiIsImNhbGxlcklzVG9TdHJpbmciLCJkIiwiciIsInhjIiwieSIsInJtIiwicG93IiwidG9GaXhlZFBvaW50IiwiY29lZmZUb1N0cmluZyIsImNvbmNhdCIsIm11bHRpcGx5IiwiYmFzZSIsIm0iLCJ0ZW1wIiwieGxvIiwieGhpIiwiY2FycnkiLCJrbG8iLCJraGkiLCJjb21wYXJlIiwiYUwiLCJiTCIsImNtcCIsInN1YnRyYWN0IiwibW9yZSIsInByb2QiLCJwcm9kTCIsInEiLCJxYyIsInJlbSIsInJlbUwiLCJyZW0wIiwieGkiLCJ4TCIsInljMCIsInlMIiwieXoiLCJ5YyIsIk5hTiIsImJpdEZsb29yIiwiZm9ybWF0IiwiaWQiLCJjMCIsIm5lIiwidG9FeHBvbmVudGlhbCIsIm5vcm1hbGlzZSIsImJhc2VQcmVmaXgiLCJkb3RBZnRlciIsImRvdEJlZm9yZSIsImlzSW5maW5pdHlPck5hTiIsIndoaXRlc3BhY2VPclBsdXMiLCJpc05hTiIsInAxIiwicDIiLCJzZCIsIm5pIiwicmQiLCJwb3dzMTAiLCJhYnNvbHV0ZVZhbHVlIiwiYWJzIiwiY29tcGFyZWRUbyIsImRlY2ltYWxQbGFjZXMiLCJkaXZpZGVkQnkiLCJkaXZpZGVkVG9JbnRlZ2VyQnkiLCJpZGl2IiwiZXhwb25lbnRpYXRlZEJ5IiwiaGFsZiIsImlzTW9kRXhwIiwibklzQmlnIiwibklzTmVnIiwibklzT2RkIiwiaXNJbnRlZ2VyIiwiaXNPZGQiLCJtb2QiLCJ0aW1lcyIsImludGVnZXJWYWx1ZSIsImlzRXF1YWxUbyIsImVxIiwiaXNGaW5pdGUiLCJpc0dyZWF0ZXJUaGFuIiwiZ3QiLCJpc0dyZWF0ZXJUaGFuT3JFcXVhbFRvIiwiZ3RlIiwiaXNMZXNzVGhhbiIsImx0IiwiaXNMZXNzVGhhbk9yRXF1YWxUbyIsImx0ZSIsImlzTmVnYXRpdmUiLCJpc1Bvc2l0aXZlIiwiaXNaZXJvIiwibWludXMiLCJ0IiwieExUeSIsInhlIiwieWUiLCJtb2R1bG8iLCJtdWx0aXBsaWVkQnkiLCJ4Y0wiLCJ5Y0wiLCJ5bG8iLCJ5aGkiLCJ6YyIsInNxcnRCYXNlIiwibmVnYXRlZCIsInByZWNpc2lvbiIsInNoaWZ0ZWRCeSIsInNxdWFyZVJvb3QiLCJzcXJ0IiwicmVwIiwidG9GaXhlZCIsInRvRm9ybWF0Iiwic3BsaXQiLCJnMSIsImcyIiwiaW50UGFydCIsImZyYWN0aW9uUGFydCIsImlzTmVnIiwiaW50RGlnaXRzIiwic3Vic3RyIiwiUmVnRXhwIiwidG9GcmFjdGlvbiIsIm1kIiwiZDAiLCJkMSIsImQyIiwiZXhwIiwibjAiLCJuMSIsInRvTnVtYmVyIiwidG9QcmVjaXNpb24iLCJ0b0pTT04iLCJ6IiwibCIsIm5hbWUiLCJ6cyIsImRlZmluZSIsImFtZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJzZWxmIiwid2luZG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7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QixJQUFnQ0EsTUFBTSxDQUFDQyxPQUEzQyxFQUFvRDtJQUN6REQsTUFBTSxDQUFDQyxPQUFQLEdBQWlCM1EsU0FBakIsQ0FEeUQsQ0FHM0Q7RUFDQyxDQUpNLE1BSUE7SUFDTCxJQUFJLENBQUNELFlBQUwsRUFBbUI7TUFDakJBLFlBQVksR0FBRyxPQUFPNlEsSUFBUCxJQUFlLFdBQWYsSUFBOEJBLElBQTlCLEdBQXFDQSxJQUFyQyxHQUE0Q0MsTUFBM0Q7SUFDRDs7SUFFRDlRLFlBQVksQ0FBQ0MsU0FBYixHQUF5QkEsU0FBekI7RUFDRDtBQUNGLENBejJGQSIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiOyhmdW5jdGlvbiAoZ2xvYmFsT2JqZWN0KSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuLypcclxuICogICAgICBiaWdudW1iZXIuanMgdjkuMS4yXHJcbiAqICAgICAgQSBKYXZhU2NyaXB0IGxpYnJhcnkgZm9yIGFyYml0cmFyeS1wcmVjaXNpb24gYXJpdGhtZXRpYy5cclxuICogICAgICBodHRwczovL2dpdGh1Yi5jb20vTWlrZU1jbC9iaWdudW1iZXIuanNcclxuICogICAgICBDb3B5cmlnaHQgKGMpIDIwMjIgTWljaGFlbCBNY2xhdWdobGluIDxNOGNoODhsQGdtYWlsLmNvbT5cclxuICogICAgICBNSVQgTGljZW5zZWQuXHJcbiAqXHJcbiAqICAgICAgQmlnTnVtYmVyLnByb3RvdHlwZSBtZXRob2RzICAgICB8ICBCaWdOdW1iZXIgbWV0aG9kc1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIGFic29sdXRlVmFsdWUgICAgICAgICAgICBhYnMgICAgfCAgY2xvbmVcclxuICogICAgICBjb21wYXJlZFRvICAgICAgICAgICAgICAgICAgICAgIHwgIGNvbmZpZyAgICAgICAgICAgICAgIHNldFxyXG4gKiAgICAgIGRlY2ltYWxQbGFjZXMgICAgICAgICAgICBkcCAgICAgfCAgICAgIERFQ0lNQUxfUExBQ0VTXHJcbiAqICAgICAgZGl2aWRlZEJ5ICAgICAgICAgICAgICAgIGRpdiAgICB8ICAgICAgUk9VTkRJTkdfTU9ERVxyXG4gKiAgICAgIGRpdmlkZWRUb0ludGVnZXJCeSAgICAgICBpZGl2ICAgfCAgICAgIEVYUE9ORU5USUFMX0FUXHJcbiAqICAgICAgZXhwb25lbnRpYXRlZEJ5ICAgICAgICAgIHBvdyAgICB8ICAgICAgUkFOR0VcclxuICogICAgICBpbnRlZ2VyVmFsdWUgICAgICAgICAgICAgICAgICAgIHwgICAgICBDUllQVE9cclxuICogICAgICBpc0VxdWFsVG8gICAgICAgICAgICAgICAgZXEgICAgIHwgICAgICBNT0RVTE9fTU9ERVxyXG4gKiAgICAgIGlzRmluaXRlICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgIFBPV19QUkVDSVNJT05cclxuICogICAgICBpc0dyZWF0ZXJUaGFuICAgICAgICAgICAgZ3QgICAgIHwgICAgICBGT1JNQVRcclxuICogICAgICBpc0dyZWF0ZXJUaGFuT3JFcXVhbFRvICAgZ3RlICAgIHwgICAgICBBTFBIQUJFVFxyXG4gKiAgICAgIGlzSW50ZWdlciAgICAgICAgICAgICAgICAgICAgICAgfCAgaXNCaWdOdW1iZXJcclxuICogICAgICBpc0xlc3NUaGFuICAgICAgICAgICAgICAgbHQgICAgIHwgIG1heGltdW0gICAgICAgICAgICAgIG1heFxyXG4gKiAgICAgIGlzTGVzc1RoYW5PckVxdWFsVG8gICAgICBsdGUgICAgfCAgbWluaW11bSAgICAgICAgICAgICAgbWluXHJcbiAqICAgICAgaXNOYU4gICAgICAgICAgICAgICAgICAgICAgICAgICB8ICByYW5kb21cclxuICogICAgICBpc05lZ2F0aXZlICAgICAgICAgICAgICAgICAgICAgIHwgIHN1bVxyXG4gKiAgICAgIGlzUG9zaXRpdmUgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIGlzWmVybyAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIG1pbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIG1vZHVsbyAgICAgICAgICAgICAgICAgICBtb2QgICAgfFxyXG4gKiAgICAgIG11bHRpcGxpZWRCeSAgICAgICAgICAgICB0aW1lcyAgfFxyXG4gKiAgICAgIG5lZ2F0ZWQgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHBsdXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHByZWNpc2lvbiAgICAgICAgICAgICAgICBzZCAgICAgfFxyXG4gKiAgICAgIHNoaWZ0ZWRCeSAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHNxdWFyZVJvb3QgICAgICAgICAgICAgICBzcXJ0ICAgfFxyXG4gKiAgICAgIHRvRXhwb25lbnRpYWwgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvRml4ZWQgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvRm9ybWF0ICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvRnJhY3Rpb24gICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvSlNPTiAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvTnVtYmVyICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvUHJlY2lzaW9uICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvU3RyaW5nICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHZhbHVlT2YgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKlxyXG4gKi9cclxuXHJcblxyXG4gIHZhciBCaWdOdW1iZXIsXHJcbiAgICBpc051bWVyaWMgPSAvXi0/KD86XFxkKyg/OlxcLlxcZCopP3xcXC5cXGQrKSg/OmVbKy1dP1xcZCspPyQvaSxcclxuICAgIG1hdGhjZWlsID0gTWF0aC5jZWlsLFxyXG4gICAgbWF0aGZsb29yID0gTWF0aC5mbG9vcixcclxuXHJcbiAgICBiaWdudW1iZXJFcnJvciA9ICdbQmlnTnVtYmVyIEVycm9yXSAnLFxyXG4gICAgdG9vTWFueURpZ2l0cyA9IGJpZ251bWJlckVycm9yICsgJ051bWJlciBwcmltaXRpdmUgaGFzIG1vcmUgdGhhbiAxNSBzaWduaWZpY2FudCBkaWdpdHM6ICcsXHJcblxyXG4gICAgQkFTRSA9IDFlMTQsXHJcbiAgICBMT0dfQkFTRSA9IDE0LFxyXG4gICAgTUFYX1NBRkVfSU5URUdFUiA9IDB4MWZmZmZmZmZmZmZmZmYsICAgICAgICAgLy8gMl41MyAtIDFcclxuICAgIC8vIE1BWF9JTlQzMiA9IDB4N2ZmZmZmZmYsICAgICAgICAgICAgICAgICAgIC8vIDJeMzEgLSAxXHJcbiAgICBQT1dTX1RFTiA9IFsxLCAxMCwgMTAwLCAxZTMsIDFlNCwgMWU1LCAxZTYsIDFlNywgMWU4LCAxZTksIDFlMTAsIDFlMTEsIDFlMTIsIDFlMTNdLFxyXG4gICAgU1FSVF9CQVNFID0gMWU3LFxyXG5cclxuICAgIC8vIEVESVRBQkxFXHJcbiAgICAvLyBUaGUgbGltaXQgb24gdGhlIHZhbHVlIG9mIERFQ0lNQUxfUExBQ0VTLCBUT19FWFBfTkVHLCBUT19FWFBfUE9TLCBNSU5fRVhQLCBNQVhfRVhQLCBhbmRcclxuICAgIC8vIHRoZSBhcmd1bWVudHMgdG8gdG9FeHBvbmVudGlhbCwgdG9GaXhlZCwgdG9Gb3JtYXQsIGFuZCB0b1ByZWNpc2lvbi5cclxuICAgIE1BWCA9IDFFOTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDAgdG8gTUFYX0lOVDMyXHJcblxyXG5cclxuICAvKlxyXG4gICAqIENyZWF0ZSBhbmQgcmV0dXJuIGEgQmlnTnVtYmVyIGNvbnN0cnVjdG9yLlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGNsb25lKGNvbmZpZ09iamVjdCkge1xyXG4gICAgdmFyIGRpdiwgY29udmVydEJhc2UsIHBhcnNlTnVtZXJpYyxcclxuICAgICAgUCA9IEJpZ051bWJlci5wcm90b3R5cGUgPSB7IGNvbnN0cnVjdG9yOiBCaWdOdW1iZXIsIHRvU3RyaW5nOiBudWxsLCB2YWx1ZU9mOiBudWxsIH0sXHJcbiAgICAgIE9ORSA9IG5ldyBCaWdOdW1iZXIoMSksXHJcblxyXG5cclxuICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBFRElUQUJMRSBDT05GSUcgREVGQVVMVFMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcbiAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlcyBiZWxvdyBtdXN0IGJlIGludGVnZXJzIHdpdGhpbiB0aGUgaW5jbHVzaXZlIHJhbmdlcyBzdGF0ZWQuXHJcbiAgICAgIC8vIFRoZSB2YWx1ZXMgY2FuIGFsc28gYmUgY2hhbmdlZCBhdCBydW4tdGltZSB1c2luZyBCaWdOdW1iZXIuc2V0LlxyXG5cclxuICAgICAgLy8gVGhlIG1heGltdW0gbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIGZvciBvcGVyYXRpb25zIGludm9sdmluZyBkaXZpc2lvbi5cclxuICAgICAgREVDSU1BTF9QTEFDRVMgPSAyMCwgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIE1BWFxyXG5cclxuICAgICAgLy8gVGhlIHJvdW5kaW5nIG1vZGUgdXNlZCB3aGVuIHJvdW5kaW5nIHRvIHRoZSBhYm92ZSBkZWNpbWFsIHBsYWNlcywgYW5kIHdoZW4gdXNpbmdcclxuICAgICAgLy8gdG9FeHBvbmVudGlhbCwgdG9GaXhlZCwgdG9Gb3JtYXQgYW5kIHRvUHJlY2lzaW9uLCBhbmQgcm91bmQgKGRlZmF1bHQgdmFsdWUpLlxyXG4gICAgICAvLyBVUCAgICAgICAgIDAgQXdheSBmcm9tIHplcm8uXHJcbiAgICAgIC8vIERPV04gICAgICAgMSBUb3dhcmRzIHplcm8uXHJcbiAgICAgIC8vIENFSUwgICAgICAgMiBUb3dhcmRzICtJbmZpbml0eS5cclxuICAgICAgLy8gRkxPT1IgICAgICAzIFRvd2FyZHMgLUluZmluaXR5LlxyXG4gICAgICAvLyBIQUxGX1VQICAgIDQgVG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIHVwLlxyXG4gICAgICAvLyBIQUxGX0RPV04gIDUgVG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIGRvd24uXHJcbiAgICAgIC8vIEhBTEZfRVZFTiAgNiBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdG93YXJkcyBldmVuIG5laWdoYm91ci5cclxuICAgICAgLy8gSEFMRl9DRUlMICA3IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCB0b3dhcmRzICtJbmZpbml0eS5cclxuICAgICAgLy8gSEFMRl9GTE9PUiA4IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCB0b3dhcmRzIC1JbmZpbml0eS5cclxuICAgICAgUk9VTkRJTkdfTU9ERSA9IDQsICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIDhcclxuXHJcbiAgICAgIC8vIEVYUE9ORU5USUFMX0FUIDogW1RPX0VYUF9ORUcgLCBUT19FWFBfUE9TXVxyXG5cclxuICAgICAgLy8gVGhlIGV4cG9uZW50IHZhbHVlIGF0IGFuZCBiZW5lYXRoIHdoaWNoIHRvU3RyaW5nIHJldHVybnMgZXhwb25lbnRpYWwgbm90YXRpb24uXHJcbiAgICAgIC8vIE51bWJlciB0eXBlOiAtN1xyXG4gICAgICBUT19FWFBfTkVHID0gLTcsICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDAgdG8gLU1BWFxyXG5cclxuICAgICAgLy8gVGhlIGV4cG9uZW50IHZhbHVlIGF0IGFuZCBhYm92ZSB3aGljaCB0b1N0cmluZyByZXR1cm5zIGV4cG9uZW50aWFsIG5vdGF0aW9uLlxyXG4gICAgICAvLyBOdW1iZXIgdHlwZTogMjFcclxuICAgICAgVE9fRVhQX1BPUyA9IDIxLCAgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIE1BWFxyXG5cclxuICAgICAgLy8gUkFOR0UgOiBbTUlOX0VYUCwgTUFYX0VYUF1cclxuXHJcbiAgICAgIC8vIFRoZSBtaW5pbXVtIGV4cG9uZW50IHZhbHVlLCBiZW5lYXRoIHdoaWNoIHVuZGVyZmxvdyB0byB6ZXJvIG9jY3Vycy5cclxuICAgICAgLy8gTnVtYmVyIHR5cGU6IC0zMjQgICg1ZS0zMjQpXHJcbiAgICAgIE1JTl9FWFAgPSAtMWU3LCAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLTEgdG8gLU1BWFxyXG5cclxuICAgICAgLy8gVGhlIG1heGltdW0gZXhwb25lbnQgdmFsdWUsIGFib3ZlIHdoaWNoIG92ZXJmbG93IHRvIEluZmluaXR5IG9jY3Vycy5cclxuICAgICAgLy8gTnVtYmVyIHR5cGU6ICAzMDggICgxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOClcclxuICAgICAgLy8gRm9yIE1BWF9FWFAgPiAxZTcsIGUuZy4gbmV3IEJpZ051bWJlcignMWUxMDAwMDAwMDAnKS5wbHVzKDEpIG1heSBiZSBzbG93LlxyXG4gICAgICBNQVhfRVhQID0gMWU3LCAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDEgdG8gTUFYXHJcblxyXG4gICAgICAvLyBXaGV0aGVyIHRvIHVzZSBjcnlwdG9ncmFwaGljYWxseS1zZWN1cmUgcmFuZG9tIG51bWJlciBnZW5lcmF0aW9uLCBpZiBhdmFpbGFibGUuXHJcbiAgICAgIENSWVBUTyA9IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHJ1ZSBvciBmYWxzZVxyXG5cclxuICAgICAgLy8gVGhlIG1vZHVsbyBtb2RlIHVzZWQgd2hlbiBjYWxjdWxhdGluZyB0aGUgbW9kdWx1czogYSBtb2Qgbi5cclxuICAgICAgLy8gVGhlIHF1b3RpZW50IChxID0gYSAvIG4pIGlzIGNhbGN1bGF0ZWQgYWNjb3JkaW5nIHRvIHRoZSBjb3JyZXNwb25kaW5nIHJvdW5kaW5nIG1vZGUuXHJcbiAgICAgIC8vIFRoZSByZW1haW5kZXIgKHIpIGlzIGNhbGN1bGF0ZWQgYXM6IHIgPSBhIC0gbiAqIHEuXHJcbiAgICAgIC8vXHJcbiAgICAgIC8vIFVQICAgICAgICAwIFRoZSByZW1haW5kZXIgaXMgcG9zaXRpdmUgaWYgdGhlIGRpdmlkZW5kIGlzIG5lZ2F0aXZlLCBlbHNlIGlzIG5lZ2F0aXZlLlxyXG4gICAgICAvLyBET1dOICAgICAgMSBUaGUgcmVtYWluZGVyIGhhcyB0aGUgc2FtZSBzaWduIGFzIHRoZSBkaXZpZGVuZC5cclxuICAgICAgLy8gICAgICAgICAgICAgVGhpcyBtb2R1bG8gbW9kZSBpcyBjb21tb25seSBrbm93biBhcyAndHJ1bmNhdGVkIGRpdmlzaW9uJyBhbmQgaXNcclxuICAgICAgLy8gICAgICAgICAgICAgZXF1aXZhbGVudCB0byAoYSAlIG4pIGluIEphdmFTY3JpcHQuXHJcbiAgICAgIC8vIEZMT09SICAgICAzIFRoZSByZW1haW5kZXIgaGFzIHRoZSBzYW1lIHNpZ24gYXMgdGhlIGRpdmlzb3IgKFB5dGhvbiAlKS5cclxuICAgICAgLy8gSEFMRl9FVkVOIDYgVGhpcyBtb2R1bG8gbW9kZSBpbXBsZW1lbnRzIHRoZSBJRUVFIDc1NCByZW1haW5kZXIgZnVuY3Rpb24uXHJcbiAgICAgIC8vIEVVQ0xJRCAgICA5IEV1Y2xpZGlhbiBkaXZpc2lvbi4gcSA9IHNpZ24obikgKiBmbG9vcihhIC8gYWJzKG4pKS5cclxuICAgICAgLy8gICAgICAgICAgICAgVGhlIHJlbWFpbmRlciBpcyBhbHdheXMgcG9zaXRpdmUuXHJcbiAgICAgIC8vXHJcbiAgICAgIC8vIFRoZSB0cnVuY2F0ZWQgZGl2aXNpb24sIGZsb29yZWQgZGl2aXNpb24sIEV1Y2xpZGlhbiBkaXZpc2lvbiBhbmQgSUVFRSA3NTQgcmVtYWluZGVyXHJcbiAgICAgIC8vIG1vZGVzIGFyZSBjb21tb25seSB1c2VkIGZvciB0aGUgbW9kdWx1cyBvcGVyYXRpb24uXHJcbiAgICAgIC8vIEFsdGhvdWdoIHRoZSBvdGhlciByb3VuZGluZyBtb2RlcyBjYW4gYWxzbyBiZSB1c2VkLCB0aGV5IG1heSBub3QgZ2l2ZSB1c2VmdWwgcmVzdWx0cy5cclxuICAgICAgTU9EVUxPX01PREUgPSAxLCAgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIDlcclxuXHJcbiAgICAgIC8vIFRoZSBtYXhpbXVtIG51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHMgb2YgdGhlIHJlc3VsdCBvZiB0aGUgZXhwb25lbnRpYXRlZEJ5IG9wZXJhdGlvbi5cclxuICAgICAgLy8gSWYgUE9XX1BSRUNJU0lPTiBpcyAwLCB0aGVyZSB3aWxsIGJlIHVubGltaXRlZCBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICAgIFBPV19QUkVDSVNJT04gPSAwLCAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byBNQVhcclxuXHJcbiAgICAgIC8vIFRoZSBmb3JtYXQgc3BlY2lmaWNhdGlvbiB1c2VkIGJ5IHRoZSBCaWdOdW1iZXIucHJvdG90eXBlLnRvRm9ybWF0IG1ldGhvZC5cclxuICAgICAgRk9STUFUID0ge1xyXG4gICAgICAgIHByZWZpeDogJycsXHJcbiAgICAgICAgZ3JvdXBTaXplOiAzLFxyXG4gICAgICAgIHNlY29uZGFyeUdyb3VwU2l6ZTogMCxcclxuICAgICAgICBncm91cFNlcGFyYXRvcjogJywnLFxyXG4gICAgICAgIGRlY2ltYWxTZXBhcmF0b3I6ICcuJyxcclxuICAgICAgICBmcmFjdGlvbkdyb3VwU2l6ZTogMCxcclxuICAgICAgICBmcmFjdGlvbkdyb3VwU2VwYXJhdG9yOiAnXFx4QTAnLCAgICAgICAgLy8gbm9uLWJyZWFraW5nIHNwYWNlXHJcbiAgICAgICAgc3VmZml4OiAnJ1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgLy8gVGhlIGFscGhhYmV0IHVzZWQgZm9yIGJhc2UgY29udmVyc2lvbi4gSXQgbXVzdCBiZSBhdCBsZWFzdCAyIGNoYXJhY3RlcnMgbG9uZywgd2l0aCBubyAnKycsXHJcbiAgICAgIC8vICctJywgJy4nLCB3aGl0ZXNwYWNlLCBvciByZXBlYXRlZCBjaGFyYWN0ZXIuXHJcbiAgICAgIC8vICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWiRfJ1xyXG4gICAgICBBTFBIQUJFVCA9ICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonLFxyXG4gICAgICBhbHBoYWJldEhhc05vcm1hbERlY2ltYWxEaWdpdHMgPSB0cnVlO1xyXG5cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcbiAgICAvLyBDT05TVFJVQ1RPUlxyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogVGhlIEJpZ051bWJlciBjb25zdHJ1Y3RvciBhbmQgZXhwb3J0ZWQgZnVuY3Rpb24uXHJcbiAgICAgKiBDcmVhdGUgYW5kIHJldHVybiBhIG5ldyBpbnN0YW5jZSBvZiBhIEJpZ051bWJlciBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogdiB7bnVtYmVyfHN0cmluZ3xCaWdOdW1iZXJ9IEEgbnVtZXJpYyB2YWx1ZS5cclxuICAgICAqIFtiXSB7bnVtYmVyfSBUaGUgYmFzZSBvZiB2LiBJbnRlZ2VyLCAyIHRvIEFMUEhBQkVULmxlbmd0aCBpbmNsdXNpdmUuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIEJpZ051bWJlcih2LCBiKSB7XHJcbiAgICAgIHZhciBhbHBoYWJldCwgYywgY2FzZUNoYW5nZWQsIGUsIGksIGlzTnVtLCBsZW4sIHN0cixcclxuICAgICAgICB4ID0gdGhpcztcclxuXHJcbiAgICAgIC8vIEVuYWJsZSBjb25zdHJ1Y3RvciBjYWxsIHdpdGhvdXQgYG5ld2AuXHJcbiAgICAgIGlmICghKHggaW5zdGFuY2VvZiBCaWdOdW1iZXIpKSByZXR1cm4gbmV3IEJpZ051bWJlcih2LCBiKTtcclxuXHJcbiAgICAgIGlmIChiID09IG51bGwpIHtcclxuXHJcbiAgICAgICAgaWYgKHYgJiYgdi5faXNCaWdOdW1iZXIgPT09IHRydWUpIHtcclxuICAgICAgICAgIHgucyA9IHYucztcclxuXHJcbiAgICAgICAgICBpZiAoIXYuYyB8fCB2LmUgPiBNQVhfRVhQKSB7XHJcbiAgICAgICAgICAgIHguYyA9IHguZSA9IG51bGw7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHYuZSA8IE1JTl9FWFApIHtcclxuICAgICAgICAgICAgeC5jID0gW3guZSA9IDBdO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgeC5lID0gdi5lO1xyXG4gICAgICAgICAgICB4LmMgPSB2LmMuc2xpY2UoKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoKGlzTnVtID0gdHlwZW9mIHYgPT0gJ251bWJlcicpICYmIHYgKiAwID09IDApIHtcclxuXHJcbiAgICAgICAgICAvLyBVc2UgYDEgLyBuYCB0byBoYW5kbGUgbWludXMgemVybyBhbHNvLlxyXG4gICAgICAgICAgeC5zID0gMSAvIHYgPCAwID8gKHYgPSAtdiwgLTEpIDogMTtcclxuXHJcbiAgICAgICAgICAvLyBGYXN0IHBhdGggZm9yIGludGVnZXJzLCB3aGVyZSBuIDwgMjE0NzQ4MzY0OCAoMioqMzEpLlxyXG4gICAgICAgICAgaWYgKHYgPT09IH5+dikge1xyXG4gICAgICAgICAgICBmb3IgKGUgPSAwLCBpID0gdjsgaSA+PSAxMDsgaSAvPSAxMCwgZSsrKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlID4gTUFYX0VYUCkge1xyXG4gICAgICAgICAgICAgIHguYyA9IHguZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgeC5lID0gZTtcclxuICAgICAgICAgICAgICB4LmMgPSBbdl07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBzdHIgPSBTdHJpbmcodik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICBpZiAoIWlzTnVtZXJpYy50ZXN0KHN0ciA9IFN0cmluZyh2KSkpIHJldHVybiBwYXJzZU51bWVyaWMoeCwgc3RyLCBpc051bSk7XHJcblxyXG4gICAgICAgICAgeC5zID0gc3RyLmNoYXJDb2RlQXQoMCkgPT0gNDUgPyAoc3RyID0gc3RyLnNsaWNlKDEpLCAtMSkgOiAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRGVjaW1hbCBwb2ludD9cclxuICAgICAgICBpZiAoKGUgPSBzdHIuaW5kZXhPZignLicpKSA+IC0xKSBzdHIgPSBzdHIucmVwbGFjZSgnLicsICcnKTtcclxuXHJcbiAgICAgICAgLy8gRXhwb25lbnRpYWwgZm9ybT9cclxuICAgICAgICBpZiAoKGkgPSBzdHIuc2VhcmNoKC9lL2kpKSA+IDApIHtcclxuXHJcbiAgICAgICAgICAvLyBEZXRlcm1pbmUgZXhwb25lbnQuXHJcbiAgICAgICAgICBpZiAoZSA8IDApIGUgPSBpO1xyXG4gICAgICAgICAgZSArPSArc3RyLnNsaWNlKGkgKyAxKTtcclxuICAgICAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgaSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlIDwgMCkge1xyXG5cclxuICAgICAgICAgIC8vIEludGVnZXIuXHJcbiAgICAgICAgICBlID0gc3RyLmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gQmFzZSB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7Yn0nXHJcbiAgICAgICAgaW50Q2hlY2soYiwgMiwgQUxQSEFCRVQubGVuZ3RoLCAnQmFzZScpO1xyXG5cclxuICAgICAgICAvLyBBbGxvdyBleHBvbmVudGlhbCBub3RhdGlvbiB0byBiZSB1c2VkIHdpdGggYmFzZSAxMCBhcmd1bWVudCwgd2hpbGVcclxuICAgICAgICAvLyBhbHNvIHJvdW5kaW5nIHRvIERFQ0lNQUxfUExBQ0VTIGFzIHdpdGggb3RoZXIgYmFzZXMuXHJcbiAgICAgICAgaWYgKGIgPT0gMTAgJiYgYWxwaGFiZXRIYXNOb3JtYWxEZWNpbWFsRGlnaXRzKSB7XHJcbiAgICAgICAgICB4ID0gbmV3IEJpZ051bWJlcih2KTtcclxuICAgICAgICAgIHJldHVybiByb3VuZCh4LCBERUNJTUFMX1BMQUNFUyArIHguZSArIDEsIFJPVU5ESU5HX01PREUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RyID0gU3RyaW5nKHYpO1xyXG5cclxuICAgICAgICBpZiAoaXNOdW0gPSB0eXBlb2YgdiA9PSAnbnVtYmVyJykge1xyXG5cclxuICAgICAgICAgIC8vIEF2b2lkIHBvdGVudGlhbCBpbnRlcnByZXRhdGlvbiBvZiBJbmZpbml0eSBhbmQgTmFOIGFzIGJhc2UgNDQrIHZhbHVlcy5cclxuICAgICAgICAgIGlmICh2ICogMCAhPSAwKSByZXR1cm4gcGFyc2VOdW1lcmljKHgsIHN0ciwgaXNOdW0sIGIpO1xyXG5cclxuICAgICAgICAgIHgucyA9IDEgLyB2IDwgMCA/IChzdHIgPSBzdHIuc2xpY2UoMSksIC0xKSA6IDE7XHJcblxyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIE51bWJlciBwcmltaXRpdmUgaGFzIG1vcmUgdGhhbiAxNSBzaWduaWZpY2FudCBkaWdpdHM6IHtufSdcclxuICAgICAgICAgIGlmIChCaWdOdW1iZXIuREVCVUcgJiYgc3RyLnJlcGxhY2UoL14wXFwuMCp8XFwuLywgJycpLmxlbmd0aCA+IDE1KSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgICAodG9vTWFueURpZ2l0cyArIHYpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB4LnMgPSBzdHIuY2hhckNvZGVBdCgwKSA9PT0gNDUgPyAoc3RyID0gc3RyLnNsaWNlKDEpLCAtMSkgOiAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWxwaGFiZXQgPSBBTFBIQUJFVC5zbGljZSgwLCBiKTtcclxuICAgICAgICBlID0gaSA9IDA7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHRoYXQgc3RyIGlzIGEgdmFsaWQgYmFzZSBiIG51bWJlci5cclxuICAgICAgICAvLyBEb24ndCB1c2UgUmVnRXhwLCBzbyBhbHBoYWJldCBjYW4gY29udGFpbiBzcGVjaWFsIGNoYXJhY3RlcnMuXHJcbiAgICAgICAgZm9yIChsZW4gPSBzdHIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgIGlmIChhbHBoYWJldC5pbmRleE9mKGMgPSBzdHIuY2hhckF0KGkpKSA8IDApIHtcclxuICAgICAgICAgICAgaWYgKGMgPT0gJy4nKSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIElmICcuJyBpcyBub3QgdGhlIGZpcnN0IGNoYXJhY3RlciBhbmQgaXQgaGFzIG5vdCBiZSBmb3VuZCBiZWZvcmUuXHJcbiAgICAgICAgICAgICAgaWYgKGkgPiBlKSB7XHJcbiAgICAgICAgICAgICAgICBlID0gbGVuO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFjYXNlQ2hhbmdlZCkge1xyXG5cclxuICAgICAgICAgICAgICAvLyBBbGxvdyBlLmcuIGhleGFkZWNpbWFsICdGRicgYXMgd2VsbCBhcyAnZmYnLlxyXG4gICAgICAgICAgICAgIGlmIChzdHIgPT0gc3RyLnRvVXBwZXJDYXNlKCkgJiYgKHN0ciA9IHN0ci50b0xvd2VyQ2FzZSgpKSB8fFxyXG4gICAgICAgICAgICAgICAgICBzdHIgPT0gc3RyLnRvTG93ZXJDYXNlKCkgJiYgKHN0ciA9IHN0ci50b1VwcGVyQ2FzZSgpKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZUNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZU51bWVyaWMoeCwgU3RyaW5nKHYpLCBpc051bSwgYik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQcmV2ZW50IGxhdGVyIGNoZWNrIGZvciBsZW5ndGggb24gY29udmVydGVkIG51bWJlci5cclxuICAgICAgICBpc051bSA9IGZhbHNlO1xyXG4gICAgICAgIHN0ciA9IGNvbnZlcnRCYXNlKHN0ciwgYiwgMTAsIHgucyk7XHJcblxyXG4gICAgICAgIC8vIERlY2ltYWwgcG9pbnQ/XHJcbiAgICAgICAgaWYgKChlID0gc3RyLmluZGV4T2YoJy4nKSkgPiAtMSkgc3RyID0gc3RyLnJlcGxhY2UoJy4nLCAnJyk7XHJcbiAgICAgICAgZWxzZSBlID0gc3RyLmxlbmd0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRGV0ZXJtaW5lIGxlYWRpbmcgemVyb3MuXHJcbiAgICAgIGZvciAoaSA9IDA7IHN0ci5jaGFyQ29kZUF0KGkpID09PSA0ODsgaSsrKTtcclxuXHJcbiAgICAgIC8vIERldGVybWluZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgICAgZm9yIChsZW4gPSBzdHIubGVuZ3RoOyBzdHIuY2hhckNvZGVBdCgtLWxlbikgPT09IDQ4Oyk7XHJcblxyXG4gICAgICBpZiAoc3RyID0gc3RyLnNsaWNlKGksICsrbGVuKSkge1xyXG4gICAgICAgIGxlbiAtPSBpO1xyXG5cclxuICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gTnVtYmVyIHByaW1pdGl2ZSBoYXMgbW9yZSB0aGFuIDE1IHNpZ25pZmljYW50IGRpZ2l0czoge259J1xyXG4gICAgICAgIGlmIChpc051bSAmJiBCaWdOdW1iZXIuREVCVUcgJiZcclxuICAgICAgICAgIGxlbiA+IDE1ICYmICh2ID4gTUFYX1NBRkVfSU5URUdFUiB8fCB2ICE9PSBtYXRoZmxvb3IodikpKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgICAodG9vTWFueURpZ2l0cyArICh4LnMgKiB2KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgLy8gT3ZlcmZsb3c/XHJcbiAgICAgICAgaWYgKChlID0gZSAtIGkgLSAxKSA+IE1BWF9FWFApIHtcclxuXHJcbiAgICAgICAgICAvLyBJbmZpbml0eS5cclxuICAgICAgICAgIHguYyA9IHguZSA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIFVuZGVyZmxvdz9cclxuICAgICAgICB9IGVsc2UgaWYgKGUgPCBNSU5fRVhQKSB7XHJcblxyXG4gICAgICAgICAgLy8gWmVyby5cclxuICAgICAgICAgIHguYyA9IFt4LmUgPSAwXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgeC5lID0gZTtcclxuICAgICAgICAgIHguYyA9IFtdO1xyXG5cclxuICAgICAgICAgIC8vIFRyYW5zZm9ybSBiYXNlXHJcblxyXG4gICAgICAgICAgLy8gZSBpcyB0aGUgYmFzZSAxMCBleHBvbmVudC5cclxuICAgICAgICAgIC8vIGkgaXMgd2hlcmUgdG8gc2xpY2Ugc3RyIHRvIGdldCB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgY29lZmZpY2llbnQgYXJyYXkuXHJcbiAgICAgICAgICBpID0gKGUgKyAxKSAlIExPR19CQVNFO1xyXG4gICAgICAgICAgaWYgKGUgPCAwKSBpICs9IExPR19CQVNFOyAgLy8gaSA8IDFcclxuXHJcbiAgICAgICAgICBpZiAoaSA8IGxlbikge1xyXG4gICAgICAgICAgICBpZiAoaSkgeC5jLnB1c2goK3N0ci5zbGljZSgwLCBpKSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxlbiAtPSBMT0dfQkFTRTsgaSA8IGxlbjspIHtcclxuICAgICAgICAgICAgICB4LmMucHVzaCgrc3RyLnNsaWNlKGksIGkgKz0gTE9HX0JBU0UpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaSA9IExPR19CQVNFIC0gKHN0ciA9IHN0ci5zbGljZShpKSkubGVuZ3RoO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaSAtPSBsZW47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZm9yICg7IGktLTsgc3RyICs9ICcwJyk7XHJcbiAgICAgICAgICB4LmMucHVzaCgrc3RyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIC8vIFplcm8uXHJcbiAgICAgICAgeC5jID0gW3guZSA9IDBdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIENPTlNUUlVDVE9SIFBST1BFUlRJRVNcclxuXHJcblxyXG4gICAgQmlnTnVtYmVyLmNsb25lID0gY2xvbmU7XHJcblxyXG4gICAgQmlnTnVtYmVyLlJPVU5EX1VQID0gMDtcclxuICAgIEJpZ051bWJlci5ST1VORF9ET1dOID0gMTtcclxuICAgIEJpZ051bWJlci5ST1VORF9DRUlMID0gMjtcclxuICAgIEJpZ051bWJlci5ST1VORF9GTE9PUiA9IDM7XHJcbiAgICBCaWdOdW1iZXIuUk9VTkRfSEFMRl9VUCA9IDQ7XHJcbiAgICBCaWdOdW1iZXIuUk9VTkRfSEFMRl9ET1dOID0gNTtcclxuICAgIEJpZ051bWJlci5ST1VORF9IQUxGX0VWRU4gPSA2O1xyXG4gICAgQmlnTnVtYmVyLlJPVU5EX0hBTEZfQ0VJTCA9IDc7XHJcbiAgICBCaWdOdW1iZXIuUk9VTkRfSEFMRl9GTE9PUiA9IDg7XHJcbiAgICBCaWdOdW1iZXIuRVVDTElEID0gOTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIENvbmZpZ3VyZSBpbmZyZXF1ZW50bHktY2hhbmdpbmcgbGlicmFyeS13aWRlIHNldHRpbmdzLlxyXG4gICAgICpcclxuICAgICAqIEFjY2VwdCBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIG9wdGlvbmFsIHByb3BlcnRpZXMgKGlmIHRoZSB2YWx1ZSBvZiBhIHByb3BlcnR5IGlzXHJcbiAgICAgKiBhIG51bWJlciwgaXQgbXVzdCBiZSBhbiBpbnRlZ2VyIHdpdGhpbiB0aGUgaW5jbHVzaXZlIHJhbmdlIHN0YXRlZCk6XHJcbiAgICAgKlxyXG4gICAgICogICBERUNJTUFMX1BMQUNFUyAgIHtudW1iZXJ9ICAgICAgICAgICAwIHRvIE1BWFxyXG4gICAgICogICBST1VORElOR19NT0RFICAgIHtudW1iZXJ9ICAgICAgICAgICAwIHRvIDhcclxuICAgICAqICAgRVhQT05FTlRJQUxfQVQgICB7bnVtYmVyfG51bWJlcltdfSAgLU1BWCB0byBNQVggIG9yICBbLU1BWCB0byAwLCAwIHRvIE1BWF1cclxuICAgICAqICAgUkFOR0UgICAgICAgICAgICB7bnVtYmVyfG51bWJlcltdfSAgLU1BWCB0byBNQVggKG5vdCB6ZXJvKSAgb3IgIFstTUFYIHRvIC0xLCAxIHRvIE1BWF1cclxuICAgICAqICAgQ1JZUFRPICAgICAgICAgICB7Ym9vbGVhbn0gICAgICAgICAgdHJ1ZSBvciBmYWxzZVxyXG4gICAgICogICBNT0RVTE9fTU9ERSAgICAgIHtudW1iZXJ9ICAgICAgICAgICAwIHRvIDlcclxuICAgICAqICAgUE9XX1BSRUNJU0lPTiAgICAgICB7bnVtYmVyfSAgICAgICAgICAgMCB0byBNQVhcclxuICAgICAqICAgQUxQSEFCRVQgICAgICAgICB7c3RyaW5nfSAgICAgICAgICAgQSBzdHJpbmcgb2YgdHdvIG9yIG1vcmUgdW5pcXVlIGNoYXJhY3RlcnMgd2hpY2ggZG9lc1xyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3QgY29udGFpbiAnLicuXHJcbiAgICAgKiAgIEZPUk1BVCAgICAgICAgICAge29iamVjdH0gICAgICAgICAgIEFuIG9iamVjdCB3aXRoIHNvbWUgb2YgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gICAgICogICAgIHByZWZpeCAgICAgICAgICAgICAgICAge3N0cmluZ31cclxuICAgICAqICAgICBncm91cFNpemUgICAgICAgICAgICAgIHtudW1iZXJ9XHJcbiAgICAgKiAgICAgc2Vjb25kYXJ5R3JvdXBTaXplICAgICB7bnVtYmVyfVxyXG4gICAgICogICAgIGdyb3VwU2VwYXJhdG9yICAgICAgICAge3N0cmluZ31cclxuICAgICAqICAgICBkZWNpbWFsU2VwYXJhdG9yICAgICAgIHtzdHJpbmd9XHJcbiAgICAgKiAgICAgZnJhY3Rpb25Hcm91cFNpemUgICAgICB7bnVtYmVyfVxyXG4gICAgICogICAgIGZyYWN0aW9uR3JvdXBTZXBhcmF0b3Ige3N0cmluZ31cclxuICAgICAqICAgICBzdWZmaXggICAgICAgICAgICAgICAgIHtzdHJpbmd9XHJcbiAgICAgKlxyXG4gICAgICogKFRoZSB2YWx1ZXMgYXNzaWduZWQgdG8gdGhlIGFib3ZlIEZPUk1BVCBvYmplY3QgcHJvcGVydGllcyBhcmUgbm90IGNoZWNrZWQgZm9yIHZhbGlkaXR5LilcclxuICAgICAqXHJcbiAgICAgKiBFLmcuXHJcbiAgICAgKiBCaWdOdW1iZXIuY29uZmlnKHsgREVDSU1BTF9QTEFDRVMgOiAyMCwgUk9VTkRJTkdfTU9ERSA6IDQgfSlcclxuICAgICAqXHJcbiAgICAgKiBJZ25vcmUgcHJvcGVydGllcy9wYXJhbWV0ZXJzIHNldCB0byBudWxsIG9yIHVuZGVmaW5lZCwgZXhjZXB0IGZvciBBTFBIQUJFVC5cclxuICAgICAqXHJcbiAgICAgKiBSZXR1cm4gYW4gb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgY3VycmVudCB2YWx1ZXMuXHJcbiAgICAgKi9cclxuICAgIEJpZ051bWJlci5jb25maWcgPSBCaWdOdW1iZXIuc2V0ID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICB2YXIgcCwgdjtcclxuXHJcbiAgICAgIGlmIChvYmogIT0gbnVsbCkge1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PSAnb2JqZWN0Jykge1xyXG5cclxuICAgICAgICAgIC8vIERFQ0lNQUxfUExBQ0VTIHtudW1iZXJ9IEludGVnZXIsIDAgdG8gTUFYIGluY2x1c2l2ZS5cclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBERUNJTUFMX1BMQUNFUyB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7dn0nXHJcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHAgPSAnREVDSU1BTF9QTEFDRVMnKSkge1xyXG4gICAgICAgICAgICB2ID0gb2JqW3BdO1xyXG4gICAgICAgICAgICBpbnRDaGVjayh2LCAwLCBNQVgsIHApO1xyXG4gICAgICAgICAgICBERUNJTUFMX1BMQUNFUyA9IHY7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gUk9VTkRJTkdfTU9ERSB7bnVtYmVyfSBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIFJPVU5ESU5HX01PREUge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge3Z9J1xyXG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwID0gJ1JPVU5ESU5HX01PREUnKSkge1xyXG4gICAgICAgICAgICB2ID0gb2JqW3BdO1xyXG4gICAgICAgICAgICBpbnRDaGVjayh2LCAwLCA4LCBwKTtcclxuICAgICAgICAgICAgUk9VTkRJTkdfTU9ERSA9IHY7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gRVhQT05FTlRJQUxfQVQge251bWJlcnxudW1iZXJbXX1cclxuICAgICAgICAgIC8vIEludGVnZXIsIC1NQVggdG8gTUFYIGluY2x1c2l2ZSBvclxyXG4gICAgICAgICAgLy8gW2ludGVnZXIgLU1BWCB0byAwIGluY2x1c2l2ZSwgMCB0byBNQVggaW5jbHVzaXZlXS5cclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBFWFBPTkVOVElBTF9BVCB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7dn0nXHJcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHAgPSAnRVhQT05FTlRJQUxfQVQnKSkge1xyXG4gICAgICAgICAgICB2ID0gb2JqW3BdO1xyXG4gICAgICAgICAgICBpZiAodiAmJiB2LnBvcCkge1xyXG4gICAgICAgICAgICAgIGludENoZWNrKHZbMF0sIC1NQVgsIDAsIHApO1xyXG4gICAgICAgICAgICAgIGludENoZWNrKHZbMV0sIDAsIE1BWCwgcCk7XHJcbiAgICAgICAgICAgICAgVE9fRVhQX05FRyA9IHZbMF07XHJcbiAgICAgICAgICAgICAgVE9fRVhQX1BPUyA9IHZbMV07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaW50Q2hlY2sodiwgLU1BWCwgTUFYLCBwKTtcclxuICAgICAgICAgICAgICBUT19FWFBfTkVHID0gLShUT19FWFBfUE9TID0gdiA8IDAgPyAtdiA6IHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gUkFOR0Uge251bWJlcnxudW1iZXJbXX0gTm9uLXplcm8gaW50ZWdlciwgLU1BWCB0byBNQVggaW5jbHVzaXZlIG9yXHJcbiAgICAgICAgICAvLyBbaW50ZWdlciAtTUFYIHRvIC0xIGluY2x1c2l2ZSwgaW50ZWdlciAxIHRvIE1BWCBpbmNsdXNpdmVdLlxyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIFJBTkdFIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZXxjYW5ub3QgYmUgemVyb306IHt2fSdcclxuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCA9ICdSQU5HRScpKSB7XHJcbiAgICAgICAgICAgIHYgPSBvYmpbcF07XHJcbiAgICAgICAgICAgIGlmICh2ICYmIHYucG9wKSB7XHJcbiAgICAgICAgICAgICAgaW50Q2hlY2sodlswXSwgLU1BWCwgLTEsIHApO1xyXG4gICAgICAgICAgICAgIGludENoZWNrKHZbMV0sIDEsIE1BWCwgcCk7XHJcbiAgICAgICAgICAgICAgTUlOX0VYUCA9IHZbMF07XHJcbiAgICAgICAgICAgICAgTUFYX0VYUCA9IHZbMV07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaW50Q2hlY2sodiwgLU1BWCwgTUFYLCBwKTtcclxuICAgICAgICAgICAgICBpZiAodikge1xyXG4gICAgICAgICAgICAgICAgTUlOX0VYUCA9IC0oTUFYX0VYUCA9IHYgPCAwID8gLXYgOiB2KTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyBwICsgJyBjYW5ub3QgYmUgemVybzogJyArIHYpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIENSWVBUTyB7Ym9vbGVhbn0gdHJ1ZSBvciBmYWxzZS5cclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBDUllQVE8gbm90IHRydWUgb3IgZmFsc2U6IHt2fSdcclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBjcnlwdG8gdW5hdmFpbGFibGUnXHJcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHAgPSAnQ1JZUFRPJykpIHtcclxuICAgICAgICAgICAgdiA9IG9ialtwXTtcclxuICAgICAgICAgICAgaWYgKHYgPT09ICEhdikge1xyXG4gICAgICAgICAgICAgIGlmICh2KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNyeXB0byAhPSAndW5kZWZpbmVkJyAmJiBjcnlwdG8gJiZcclxuICAgICAgICAgICAgICAgICAoY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB8fCBjcnlwdG8ucmFuZG9tQnl0ZXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgIENSWVBUTyA9IHY7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBDUllQVE8gPSAhdjtcclxuICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAgICAgICAgIChiaWdudW1iZXJFcnJvciArICdjcnlwdG8gdW5hdmFpbGFibGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgQ1JZUFRPID0gdjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAgICAgKGJpZ251bWJlckVycm9yICsgcCArICcgbm90IHRydWUgb3IgZmFsc2U6ICcgKyB2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIE1PRFVMT19NT0RFIHtudW1iZXJ9IEludGVnZXIsIDAgdG8gOSBpbmNsdXNpdmUuXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gTU9EVUxPX01PREUge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge3Z9J1xyXG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwID0gJ01PRFVMT19NT0RFJykpIHtcclxuICAgICAgICAgICAgdiA9IG9ialtwXTtcclxuICAgICAgICAgICAgaW50Q2hlY2sodiwgMCwgOSwgcCk7XHJcbiAgICAgICAgICAgIE1PRFVMT19NT0RFID0gdjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBQT1dfUFJFQ0lTSU9OIHtudW1iZXJ9IEludGVnZXIsIDAgdG8gTUFYIGluY2x1c2l2ZS5cclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBQT1dfUFJFQ0lTSU9OIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHt2fSdcclxuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCA9ICdQT1dfUFJFQ0lTSU9OJykpIHtcclxuICAgICAgICAgICAgdiA9IG9ialtwXTtcclxuICAgICAgICAgICAgaW50Q2hlY2sodiwgMCwgTUFYLCBwKTtcclxuICAgICAgICAgICAgUE9XX1BSRUNJU0lPTiA9IHY7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gRk9STUFUIHtvYmplY3R9XHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gRk9STUFUIG5vdCBhbiBvYmplY3Q6IHt2fSdcclxuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCA9ICdGT1JNQVQnKSkge1xyXG4gICAgICAgICAgICB2ID0gb2JqW3BdO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHYgPT0gJ29iamVjdCcpIEZPUk1BVCA9IHY7XHJcbiAgICAgICAgICAgIGVsc2UgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAgIChiaWdudW1iZXJFcnJvciArIHAgKyAnIG5vdCBhbiBvYmplY3Q6ICcgKyB2KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBBTFBIQUJFVCB7c3RyaW5nfVxyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIEFMUEhBQkVUIGludmFsaWQ6IHt2fSdcclxuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCA9ICdBTFBIQUJFVCcpKSB7XHJcbiAgICAgICAgICAgIHYgPSBvYmpbcF07XHJcblxyXG4gICAgICAgICAgICAvLyBEaXNhbGxvdyBpZiBsZXNzIHRoYW4gdHdvIGNoYXJhY3RlcnMsXHJcbiAgICAgICAgICAgIC8vIG9yIGlmIGl0IGNvbnRhaW5zICcrJywgJy0nLCAnLicsIHdoaXRlc3BhY2UsIG9yIGEgcmVwZWF0ZWQgY2hhcmFjdGVyLlxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHYgPT0gJ3N0cmluZycgJiYgIS9eLj8kfFsrXFwtLlxcc118KC4pLipcXDEvLnRlc3QodikpIHtcclxuICAgICAgICAgICAgICBhbHBoYWJldEhhc05vcm1hbERlY2ltYWxEaWdpdHMgPSB2LnNsaWNlKDAsIDEwKSA9PSAnMDEyMzQ1Njc4OSc7XHJcbiAgICAgICAgICAgICAgQUxQSEFCRVQgPSB2O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgICAgIChiaWdudW1iZXJFcnJvciArIHAgKyAnIGludmFsaWQ6ICcgKyB2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBPYmplY3QgZXhwZWN0ZWQ6IHt2fSdcclxuICAgICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgKGJpZ251bWJlckVycm9yICsgJ09iamVjdCBleHBlY3RlZDogJyArIG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIERFQ0lNQUxfUExBQ0VTOiBERUNJTUFMX1BMQUNFUyxcclxuICAgICAgICBST1VORElOR19NT0RFOiBST1VORElOR19NT0RFLFxyXG4gICAgICAgIEVYUE9ORU5USUFMX0FUOiBbVE9fRVhQX05FRywgVE9fRVhQX1BPU10sXHJcbiAgICAgICAgUkFOR0U6IFtNSU5fRVhQLCBNQVhfRVhQXSxcclxuICAgICAgICBDUllQVE86IENSWVBUTyxcclxuICAgICAgICBNT0RVTE9fTU9ERTogTU9EVUxPX01PREUsXHJcbiAgICAgICAgUE9XX1BSRUNJU0lPTjogUE9XX1BSRUNJU0lPTixcclxuICAgICAgICBGT1JNQVQ6IEZPUk1BVCxcclxuICAgICAgICBBTFBIQUJFVDogQUxQSEFCRVRcclxuICAgICAgfTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB2IGlzIGEgQmlnTnVtYmVyIGluc3RhbmNlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAgICpcclxuICAgICAqIElmIEJpZ051bWJlci5ERUJVRyBpcyB0cnVlLCB0aHJvdyBpZiBhIEJpZ051bWJlciBpbnN0YW5jZSBpcyBub3Qgd2VsbC1mb3JtZWQuXHJcbiAgICAgKlxyXG4gICAgICogdiB7YW55fVxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBJbnZhbGlkIEJpZ051bWJlcjoge3Z9J1xyXG4gICAgICovXHJcbiAgICBCaWdOdW1iZXIuaXNCaWdOdW1iZXIgPSBmdW5jdGlvbiAodikge1xyXG4gICAgICBpZiAoIXYgfHwgdi5faXNCaWdOdW1iZXIgIT09IHRydWUpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKCFCaWdOdW1iZXIuREVCVUcpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgdmFyIGksIG4sXHJcbiAgICAgICAgYyA9IHYuYyxcclxuICAgICAgICBlID0gdi5lLFxyXG4gICAgICAgIHMgPSB2LnM7XHJcblxyXG4gICAgICBvdXQ6IGlmICh7fS50b1N0cmluZy5jYWxsKGMpID09ICdbb2JqZWN0IEFycmF5XScpIHtcclxuXHJcbiAgICAgICAgaWYgKChzID09PSAxIHx8IHMgPT09IC0xKSAmJiBlID49IC1NQVggJiYgZSA8PSBNQVggJiYgZSA9PT0gbWF0aGZsb29yKGUpKSB7XHJcblxyXG4gICAgICAgICAgLy8gSWYgdGhlIGZpcnN0IGVsZW1lbnQgaXMgemVybywgdGhlIEJpZ051bWJlciB2YWx1ZSBtdXN0IGJlIHplcm8uXHJcbiAgICAgICAgICBpZiAoY1swXSA9PT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoZSA9PT0gMCAmJiBjLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGJyZWFrIG91dDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBDYWxjdWxhdGUgbnVtYmVyIG9mIGRpZ2l0cyB0aGF0IGNbMF0gc2hvdWxkIGhhdmUsIGJhc2VkIG9uIHRoZSBleHBvbmVudC5cclxuICAgICAgICAgIGkgPSAoZSArIDEpICUgTE9HX0JBU0U7XHJcbiAgICAgICAgICBpZiAoaSA8IDEpIGkgKz0gTE9HX0JBU0U7XHJcblxyXG4gICAgICAgICAgLy8gQ2FsY3VsYXRlIG51bWJlciBvZiBkaWdpdHMgb2YgY1swXS5cclxuICAgICAgICAgIC8vaWYgKE1hdGguY2VpbChNYXRoLmxvZyhjWzBdICsgMSkgLyBNYXRoLkxOMTApID09IGkpIHtcclxuICAgICAgICAgIGlmIChTdHJpbmcoY1swXSkubGVuZ3RoID09IGkpIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgbiA9IGNbaV07XHJcbiAgICAgICAgICAgICAgaWYgKG4gPCAwIHx8IG4gPj0gQkFTRSB8fCBuICE9PSBtYXRoZmxvb3IobikpIGJyZWFrIG91dDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTGFzdCBlbGVtZW50IGNhbm5vdCBiZSB6ZXJvLCB1bmxlc3MgaXQgaXMgdGhlIG9ubHkgZWxlbWVudC5cclxuICAgICAgICAgICAgaWYgKG4gIT09IDApIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIC8vIEluZmluaXR5L05hTlxyXG4gICAgICB9IGVsc2UgaWYgKGMgPT09IG51bGwgJiYgZSA9PT0gbnVsbCAmJiAocyA9PT0gbnVsbCB8fCBzID09PSAxIHx8IHMgPT09IC0xKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgIChiaWdudW1iZXJFcnJvciArICdJbnZhbGlkIEJpZ051bWJlcjogJyArIHYpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIG1heGltdW0gb2YgdGhlIGFyZ3VtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBhcmd1bWVudHMge251bWJlcnxzdHJpbmd8QmlnTnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBCaWdOdW1iZXIubWF4aW11bSA9IEJpZ051bWJlci5tYXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBtYXhPck1pbihhcmd1bWVudHMsIC0xKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSBtaW5pbXVtIG9mIHRoZSBhcmd1bWVudHMuXHJcbiAgICAgKlxyXG4gICAgICogYXJndW1lbnRzIHtudW1iZXJ8c3RyaW5nfEJpZ051bWJlcn1cclxuICAgICAqL1xyXG4gICAgQmlnTnVtYmVyLm1pbmltdW0gPSBCaWdOdW1iZXIubWluID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gbWF4T3JNaW4oYXJndW1lbnRzLCAxKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdpdGggYSByYW5kb20gdmFsdWUgZXF1YWwgdG8gb3IgZ3JlYXRlciB0aGFuIDAgYW5kIGxlc3MgdGhhbiAxLFxyXG4gICAgICogYW5kIHdpdGggZHAsIG9yIERFQ0lNQUxfUExBQ0VTIGlmIGRwIGlzIG9taXR0ZWQsIGRlY2ltYWwgcGxhY2VzIChvciBsZXNzIGlmIHRyYWlsaW5nXHJcbiAgICAgKiB6ZXJvcyBhcmUgcHJvZHVjZWQpLlxyXG4gICAgICpcclxuICAgICAqIFtkcF0ge251bWJlcn0gRGVjaW1hbCBwbGFjZXMuIEludGVnZXIsIDAgdG8gTUFYIGluY2x1c2l2ZS5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge2RwfSdcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBjcnlwdG8gdW5hdmFpbGFibGUnXHJcbiAgICAgKi9cclxuICAgIEJpZ051bWJlci5yYW5kb20gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgcG93Ml81MyA9IDB4MjAwMDAwMDAwMDAwMDA7XHJcblxyXG4gICAgICAvLyBSZXR1cm4gYSA1MyBiaXQgaW50ZWdlciBuLCB3aGVyZSAwIDw9IG4gPCA5MDA3MTk5MjU0NzQwOTkyLlxyXG4gICAgICAvLyBDaGVjayBpZiBNYXRoLnJhbmRvbSgpIHByb2R1Y2VzIG1vcmUgdGhhbiAzMiBiaXRzIG9mIHJhbmRvbW5lc3MuXHJcbiAgICAgIC8vIElmIGl0IGRvZXMsIGFzc3VtZSBhdCBsZWFzdCA1MyBiaXRzIGFyZSBwcm9kdWNlZCwgb3RoZXJ3aXNlIGFzc3VtZSBhdCBsZWFzdCAzMCBiaXRzLlxyXG4gICAgICAvLyAweDQwMDAwMDAwIGlzIDJeMzAsIDB4ODAwMDAwIGlzIDJeMjMsIDB4MWZmZmZmIGlzIDJeMjEgLSAxLlxyXG4gICAgICB2YXIgcmFuZG9tNTNiaXRJbnQgPSAoTWF0aC5yYW5kb20oKSAqIHBvdzJfNTMpICYgMHgxZmZmZmZcclxuICAgICAgID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gbWF0aGZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3cyXzUzKTsgfVxyXG4gICAgICAgOiBmdW5jdGlvbiAoKSB7IHJldHVybiAoKE1hdGgucmFuZG9tKCkgKiAweDQwMDAwMDAwIHwgMCkgKiAweDgwMDAwMCkgK1xyXG4gICAgICAgICAoTWF0aC5yYW5kb20oKSAqIDB4ODAwMDAwIHwgMCk7IH07XHJcblxyXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGRwKSB7XHJcbiAgICAgICAgdmFyIGEsIGIsIGUsIGssIHYsXHJcbiAgICAgICAgICBpID0gMCxcclxuICAgICAgICAgIGMgPSBbXSxcclxuICAgICAgICAgIHJhbmQgPSBuZXcgQmlnTnVtYmVyKE9ORSk7XHJcblxyXG4gICAgICAgIGlmIChkcCA9PSBudWxsKSBkcCA9IERFQ0lNQUxfUExBQ0VTO1xyXG4gICAgICAgIGVsc2UgaW50Q2hlY2soZHAsIDAsIE1BWCk7XHJcblxyXG4gICAgICAgIGsgPSBtYXRoY2VpbChkcCAvIExPR19CQVNFKTtcclxuXHJcbiAgICAgICAgaWYgKENSWVBUTykge1xyXG5cclxuICAgICAgICAgIC8vIEJyb3dzZXJzIHN1cHBvcnRpbmcgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5cclxuICAgICAgICAgIGlmIChjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XHJcblxyXG4gICAgICAgICAgICBhID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDMyQXJyYXkoayAqPSAyKSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKDsgaSA8IGs7KSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIDUzIGJpdHM6XHJcbiAgICAgICAgICAgICAgLy8gKChNYXRoLnBvdygyLCAzMikgLSAxKSAqIE1hdGgucG93KDIsIDIxKSkudG9TdHJpbmcoMilcclxuICAgICAgICAgICAgICAvLyAxMTExMSAxMTExMTExMSAxMTExMTExMSAxMTExMTExMSAxMTEwMDAwMCAwMDAwMDAwMCAwMDAwMDAwMFxyXG4gICAgICAgICAgICAgIC8vICgoTWF0aC5wb3coMiwgMzIpIC0gMSkgPj4+IDExKS50b1N0cmluZygyKVxyXG4gICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDExMTExIDExMTExMTExIDExMTExMTExXHJcbiAgICAgICAgICAgICAgLy8gMHgyMDAwMCBpcyAyXjIxLlxyXG4gICAgICAgICAgICAgIHYgPSBhW2ldICogMHgyMDAwMCArIChhW2kgKyAxXSA+Pj4gMTEpO1xyXG5cclxuICAgICAgICAgICAgICAvLyBSZWplY3Rpb24gc2FtcGxpbmc6XHJcbiAgICAgICAgICAgICAgLy8gMCA8PSB2IDwgOTAwNzE5OTI1NDc0MDk5MlxyXG4gICAgICAgICAgICAgIC8vIFByb2JhYmlsaXR5IHRoYXQgdiA+PSA5ZTE1LCBpc1xyXG4gICAgICAgICAgICAgIC8vIDcxOTkyNTQ3NDA5OTIgLyA5MDA3MTk5MjU0NzQwOTkyIH49IDAuMDAwOCwgaS5lLiAxIGluIDEyNTFcclxuICAgICAgICAgICAgICBpZiAodiA+PSA5ZTE1KSB7XHJcbiAgICAgICAgICAgICAgICBiID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDMyQXJyYXkoMikpO1xyXG4gICAgICAgICAgICAgICAgYVtpXSA9IGJbMF07XHJcbiAgICAgICAgICAgICAgICBhW2kgKyAxXSA9IGJbMV07XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAwIDw9IHYgPD0gODk5OTk5OTk5OTk5OTk5OVxyXG4gICAgICAgICAgICAgICAgLy8gMCA8PSAodiAlIDFlMTQpIDw9IDk5OTk5OTk5OTk5OTk5XHJcbiAgICAgICAgICAgICAgICBjLnB1c2godiAlIDFlMTQpO1xyXG4gICAgICAgICAgICAgICAgaSArPSAyO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpID0gayAvIDI7XHJcblxyXG4gICAgICAgICAgLy8gTm9kZS5qcyBzdXBwb3J0aW5nIGNyeXB0by5yYW5kb21CeXRlcy5cclxuICAgICAgICAgIH0gZWxzZSBpZiAoY3J5cHRvLnJhbmRvbUJ5dGVzKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBidWZmZXJcclxuICAgICAgICAgICAgYSA9IGNyeXB0by5yYW5kb21CeXRlcyhrICo9IDcpO1xyXG5cclxuICAgICAgICAgICAgZm9yICg7IGkgPCBrOykge1xyXG5cclxuICAgICAgICAgICAgICAvLyAweDEwMDAwMDAwMDAwMDAgaXMgMl40OCwgMHgxMDAwMDAwMDAwMCBpcyAyXjQwXHJcbiAgICAgICAgICAgICAgLy8gMHgxMDAwMDAwMDAgaXMgMl4zMiwgMHgxMDAwMDAwIGlzIDJeMjRcclxuICAgICAgICAgICAgICAvLyAxMTExMSAxMTExMTExMSAxMTExMTExMSAxMTExMTExMSAxMTExMTExMSAxMTExMTExMSAxMTExMTExMVxyXG4gICAgICAgICAgICAgIC8vIDAgPD0gdiA8IDkwMDcxOTkyNTQ3NDA5OTJcclxuICAgICAgICAgICAgICB2ID0gKChhW2ldICYgMzEpICogMHgxMDAwMDAwMDAwMDAwKSArIChhW2kgKyAxXSAqIDB4MTAwMDAwMDAwMDApICtcclxuICAgICAgICAgICAgICAgICAoYVtpICsgMl0gKiAweDEwMDAwMDAwMCkgKyAoYVtpICsgM10gKiAweDEwMDAwMDApICtcclxuICAgICAgICAgICAgICAgICAoYVtpICsgNF0gPDwgMTYpICsgKGFbaSArIDVdIDw8IDgpICsgYVtpICsgNl07XHJcblxyXG4gICAgICAgICAgICAgIGlmICh2ID49IDllMTUpIHtcclxuICAgICAgICAgICAgICAgIGNyeXB0by5yYW5kb21CeXRlcyg3KS5jb3B5KGEsIGkpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gMCA8PSAodiAlIDFlMTQpIDw9IDk5OTk5OTk5OTk5OTk5XHJcbiAgICAgICAgICAgICAgICBjLnB1c2godiAlIDFlMTQpO1xyXG4gICAgICAgICAgICAgICAgaSArPSA3O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpID0gayAvIDc7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBDUllQVE8gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAgIChiaWdudW1iZXJFcnJvciArICdjcnlwdG8gdW5hdmFpbGFibGUnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVzZSBNYXRoLnJhbmRvbS5cclxuICAgICAgICBpZiAoIUNSWVBUTykge1xyXG5cclxuICAgICAgICAgIGZvciAoOyBpIDwgazspIHtcclxuICAgICAgICAgICAgdiA9IHJhbmRvbTUzYml0SW50KCk7XHJcbiAgICAgICAgICAgIGlmICh2IDwgOWUxNSkgY1tpKytdID0gdiAlIDFlMTQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBrID0gY1stLWldO1xyXG4gICAgICAgIGRwICU9IExPR19CQVNFO1xyXG5cclxuICAgICAgICAvLyBDb252ZXJ0IHRyYWlsaW5nIGRpZ2l0cyB0byB6ZXJvcyBhY2NvcmRpbmcgdG8gZHAuXHJcbiAgICAgICAgaWYgKGsgJiYgZHApIHtcclxuICAgICAgICAgIHYgPSBQT1dTX1RFTltMT0dfQkFTRSAtIGRwXTtcclxuICAgICAgICAgIGNbaV0gPSBtYXRoZmxvb3IoayAvIHYpICogdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSB0cmFpbGluZyBlbGVtZW50cyB3aGljaCBhcmUgemVyby5cclxuICAgICAgICBmb3IgKDsgY1tpXSA9PT0gMDsgYy5wb3AoKSwgaS0tKTtcclxuXHJcbiAgICAgICAgLy8gWmVybz9cclxuICAgICAgICBpZiAoaSA8IDApIHtcclxuICAgICAgICAgIGMgPSBbZSA9IDBdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgLy8gUmVtb3ZlIGxlYWRpbmcgZWxlbWVudHMgd2hpY2ggYXJlIHplcm8gYW5kIGFkanVzdCBleHBvbmVudCBhY2NvcmRpbmdseS5cclxuICAgICAgICAgIGZvciAoZSA9IC0xIDsgY1swXSA9PT0gMDsgYy5zcGxpY2UoMCwgMSksIGUgLT0gTE9HX0JBU0UpO1xyXG5cclxuICAgICAgICAgIC8vIENvdW50IHRoZSBkaWdpdHMgb2YgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYyB0byBkZXRlcm1pbmUgbGVhZGluZyB6ZXJvcywgYW5kLi4uXHJcbiAgICAgICAgICBmb3IgKGkgPSAxLCB2ID0gY1swXTsgdiA+PSAxMDsgdiAvPSAxMCwgaSsrKTtcclxuXHJcbiAgICAgICAgICAvLyBhZGp1c3QgdGhlIGV4cG9uZW50IGFjY29yZGluZ2x5LlxyXG4gICAgICAgICAgaWYgKGkgPCBMT0dfQkFTRSkgZSAtPSBMT0dfQkFTRSAtIGk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByYW5kLmUgPSBlO1xyXG4gICAgICAgIHJhbmQuYyA9IGM7XHJcbiAgICAgICAgcmV0dXJuIHJhbmQ7XHJcbiAgICAgIH07XHJcbiAgICB9KSgpO1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSBzdW0gb2YgdGhlIGFyZ3VtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBhcmd1bWVudHMge251bWJlcnxzdHJpbmd8QmlnTnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBCaWdOdW1iZXIuc3VtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgaSA9IDEsXHJcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50cyxcclxuICAgICAgICBzdW0gPSBuZXcgQmlnTnVtYmVyKGFyZ3NbMF0pO1xyXG4gICAgICBmb3IgKDsgaSA8IGFyZ3MubGVuZ3RoOykgc3VtID0gc3VtLnBsdXMoYXJnc1tpKytdKTtcclxuICAgICAgcmV0dXJuIHN1bTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8vIFBSSVZBVEUgRlVOQ1RJT05TXHJcblxyXG5cclxuICAgIC8vIENhbGxlZCBieSBCaWdOdW1iZXIgYW5kIEJpZ051bWJlci5wcm90b3R5cGUudG9TdHJpbmcuXHJcbiAgICBjb252ZXJ0QmFzZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBkZWNpbWFsID0gJzAxMjM0NTY3ODknO1xyXG5cclxuICAgICAgLypcclxuICAgICAgICogQ29udmVydCBzdHJpbmcgb2YgYmFzZUluIHRvIGFuIGFycmF5IG9mIG51bWJlcnMgb2YgYmFzZU91dC5cclxuICAgICAgICogRWcuIHRvQmFzZU91dCgnMjU1JywgMTAsIDE2KSByZXR1cm5zIFsxNSwgMTVdLlxyXG4gICAgICAgKiBFZy4gdG9CYXNlT3V0KCdmZicsIDE2LCAxMCkgcmV0dXJucyBbMiwgNSwgNV0uXHJcbiAgICAgICAqL1xyXG4gICAgICBmdW5jdGlvbiB0b0Jhc2VPdXQoc3RyLCBiYXNlSW4sIGJhc2VPdXQsIGFscGhhYmV0KSB7XHJcbiAgICAgICAgdmFyIGosXHJcbiAgICAgICAgICBhcnIgPSBbMF0sXHJcbiAgICAgICAgICBhcnJMLFxyXG4gICAgICAgICAgaSA9IDAsXHJcbiAgICAgICAgICBsZW4gPSBzdHIubGVuZ3RoO1xyXG5cclxuICAgICAgICBmb3IgKDsgaSA8IGxlbjspIHtcclxuICAgICAgICAgIGZvciAoYXJyTCA9IGFyci5sZW5ndGg7IGFyckwtLTsgYXJyW2FyckxdICo9IGJhc2VJbik7XHJcblxyXG4gICAgICAgICAgYXJyWzBdICs9IGFscGhhYmV0LmluZGV4T2Yoc3RyLmNoYXJBdChpKyspKTtcclxuXHJcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoYXJyW2pdID4gYmFzZU91dCAtIDEpIHtcclxuICAgICAgICAgICAgICBpZiAoYXJyW2ogKyAxXSA9PSBudWxsKSBhcnJbaiArIDFdID0gMDtcclxuICAgICAgICAgICAgICBhcnJbaiArIDFdICs9IGFycltqXSAvIGJhc2VPdXQgfCAwO1xyXG4gICAgICAgICAgICAgIGFycltqXSAlPSBiYXNlT3V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXJyLnJldmVyc2UoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ29udmVydCBhIG51bWVyaWMgc3RyaW5nIG9mIGJhc2VJbiB0byBhIG51bWVyaWMgc3RyaW5nIG9mIGJhc2VPdXQuXHJcbiAgICAgIC8vIElmIHRoZSBjYWxsZXIgaXMgdG9TdHJpbmcsIHdlIGFyZSBjb252ZXJ0aW5nIGZyb20gYmFzZSAxMCB0byBiYXNlT3V0LlxyXG4gICAgICAvLyBJZiB0aGUgY2FsbGVyIGlzIEJpZ051bWJlciwgd2UgYXJlIGNvbnZlcnRpbmcgZnJvbSBiYXNlSW4gdG8gYmFzZSAxMC5cclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdHIsIGJhc2VJbiwgYmFzZU91dCwgc2lnbiwgY2FsbGVySXNUb1N0cmluZykge1xyXG4gICAgICAgIHZhciBhbHBoYWJldCwgZCwgZSwgaywgciwgeCwgeGMsIHksXHJcbiAgICAgICAgICBpID0gc3RyLmluZGV4T2YoJy4nKSxcclxuICAgICAgICAgIGRwID0gREVDSU1BTF9QTEFDRVMsXHJcbiAgICAgICAgICBybSA9IFJPVU5ESU5HX01PREU7XHJcblxyXG4gICAgICAgIC8vIE5vbi1pbnRlZ2VyLlxyXG4gICAgICAgIGlmIChpID49IDApIHtcclxuICAgICAgICAgIGsgPSBQT1dfUFJFQ0lTSU9OO1xyXG5cclxuICAgICAgICAgIC8vIFVubGltaXRlZCBwcmVjaXNpb24uXHJcbiAgICAgICAgICBQT1dfUFJFQ0lTSU9OID0gMDtcclxuICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKCcuJywgJycpO1xyXG4gICAgICAgICAgeSA9IG5ldyBCaWdOdW1iZXIoYmFzZUluKTtcclxuICAgICAgICAgIHggPSB5LnBvdyhzdHIubGVuZ3RoIC0gaSk7XHJcbiAgICAgICAgICBQT1dfUFJFQ0lTSU9OID0gaztcclxuXHJcbiAgICAgICAgICAvLyBDb252ZXJ0IHN0ciBhcyBpZiBhbiBpbnRlZ2VyLCB0aGVuIHJlc3RvcmUgdGhlIGZyYWN0aW9uIHBhcnQgYnkgZGl2aWRpbmcgdGhlXHJcbiAgICAgICAgICAvLyByZXN1bHQgYnkgaXRzIGJhc2UgcmFpc2VkIHRvIGEgcG93ZXIuXHJcblxyXG4gICAgICAgICAgeS5jID0gdG9CYXNlT3V0KHRvRml4ZWRQb2ludChjb2VmZlRvU3RyaW5nKHguYyksIHguZSwgJzAnKSxcclxuICAgICAgICAgICAxMCwgYmFzZU91dCwgZGVjaW1hbCk7XHJcbiAgICAgICAgICB5LmUgPSB5LmMubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ29udmVydCB0aGUgbnVtYmVyIGFzIGludGVnZXIuXHJcblxyXG4gICAgICAgIHhjID0gdG9CYXNlT3V0KHN0ciwgYmFzZUluLCBiYXNlT3V0LCBjYWxsZXJJc1RvU3RyaW5nXHJcbiAgICAgICAgID8gKGFscGhhYmV0ID0gQUxQSEFCRVQsIGRlY2ltYWwpXHJcbiAgICAgICAgIDogKGFscGhhYmV0ID0gZGVjaW1hbCwgQUxQSEFCRVQpKTtcclxuXHJcbiAgICAgICAgLy8geGMgbm93IHJlcHJlc2VudHMgc3RyIGFzIGFuIGludGVnZXIgYW5kIGNvbnZlcnRlZCB0byBiYXNlT3V0LiBlIGlzIHRoZSBleHBvbmVudC5cclxuICAgICAgICBlID0gayA9IHhjLmxlbmd0aDtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgICAgIGZvciAoOyB4Y1stLWtdID09IDA7IHhjLnBvcCgpKTtcclxuXHJcbiAgICAgICAgLy8gWmVybz9cclxuICAgICAgICBpZiAoIXhjWzBdKSByZXR1cm4gYWxwaGFiZXQuY2hhckF0KDApO1xyXG5cclxuICAgICAgICAvLyBEb2VzIHN0ciByZXByZXNlbnQgYW4gaW50ZWdlcj8gSWYgc28sIG5vIG5lZWQgZm9yIHRoZSBkaXZpc2lvbi5cclxuICAgICAgICBpZiAoaSA8IDApIHtcclxuICAgICAgICAgIC0tZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgeC5jID0geGM7XHJcbiAgICAgICAgICB4LmUgPSBlO1xyXG5cclxuICAgICAgICAgIC8vIFRoZSBzaWduIGlzIG5lZWRlZCBmb3IgY29ycmVjdCByb3VuZGluZy5cclxuICAgICAgICAgIHgucyA9IHNpZ247XHJcbiAgICAgICAgICB4ID0gZGl2KHgsIHksIGRwLCBybSwgYmFzZU91dCk7XHJcbiAgICAgICAgICB4YyA9IHguYztcclxuICAgICAgICAgIHIgPSB4LnI7XHJcbiAgICAgICAgICBlID0geC5lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8geGMgbm93IHJlcHJlc2VudHMgc3RyIGNvbnZlcnRlZCB0byBiYXNlT3V0LlxyXG5cclxuICAgICAgICAvLyBUSGUgaW5kZXggb2YgdGhlIHJvdW5kaW5nIGRpZ2l0LlxyXG4gICAgICAgIGQgPSBlICsgZHAgKyAxO1xyXG5cclxuICAgICAgICAvLyBUaGUgcm91bmRpbmcgZGlnaXQ6IHRoZSBkaWdpdCB0byB0aGUgcmlnaHQgb2YgdGhlIGRpZ2l0IHRoYXQgbWF5IGJlIHJvdW5kZWQgdXAuXHJcbiAgICAgICAgaSA9IHhjW2RdO1xyXG5cclxuICAgICAgICAvLyBMb29rIGF0IHRoZSByb3VuZGluZyBkaWdpdHMgYW5kIG1vZGUgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdG8gcm91bmQgdXAuXHJcblxyXG4gICAgICAgIGsgPSBiYXNlT3V0IC8gMjtcclxuICAgICAgICByID0gciB8fCBkIDwgMCB8fCB4Y1tkICsgMV0gIT0gbnVsbDtcclxuXHJcbiAgICAgICAgciA9IHJtIDwgNCA/IChpICE9IG51bGwgfHwgcikgJiYgKHJtID09IDAgfHwgcm0gPT0gKHgucyA8IDAgPyAzIDogMikpXHJcbiAgICAgICAgICAgICAgOiBpID4gayB8fCBpID09IGsgJiYocm0gPT0gNCB8fCByIHx8IHJtID09IDYgJiYgeGNbZCAtIDFdICYgMSB8fFxyXG4gICAgICAgICAgICAgICBybSA9PSAoeC5zIDwgMCA/IDggOiA3KSk7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBpbmRleCBvZiB0aGUgcm91bmRpbmcgZGlnaXQgaXMgbm90IGdyZWF0ZXIgdGhhbiB6ZXJvLCBvciB4YyByZXByZXNlbnRzXHJcbiAgICAgICAgLy8gemVybywgdGhlbiB0aGUgcmVzdWx0IG9mIHRoZSBiYXNlIGNvbnZlcnNpb24gaXMgemVybyBvciwgaWYgcm91bmRpbmcgdXAsIGEgdmFsdWVcclxuICAgICAgICAvLyBzdWNoIGFzIDAuMDAwMDEuXHJcbiAgICAgICAgaWYgKGQgPCAxIHx8ICF4Y1swXSkge1xyXG5cclxuICAgICAgICAgIC8vIDFeLWRwIG9yIDBcclxuICAgICAgICAgIHN0ciA9IHIgPyB0b0ZpeGVkUG9pbnQoYWxwaGFiZXQuY2hhckF0KDEpLCAtZHAsIGFscGhhYmV0LmNoYXJBdCgwKSkgOiBhbHBoYWJldC5jaGFyQXQoMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAvLyBUcnVuY2F0ZSB4YyB0byB0aGUgcmVxdWlyZWQgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzLlxyXG4gICAgICAgICAgeGMubGVuZ3RoID0gZDtcclxuXHJcbiAgICAgICAgICAvLyBSb3VuZCB1cD9cclxuICAgICAgICAgIGlmIChyKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBSb3VuZGluZyB1cCBtYXkgbWVhbiB0aGUgcHJldmlvdXMgZGlnaXQgaGFzIHRvIGJlIHJvdW5kZWQgdXAgYW5kIHNvIG9uLlxyXG4gICAgICAgICAgICBmb3IgKC0tYmFzZU91dDsgKyt4Y1stLWRdID4gYmFzZU91dDspIHtcclxuICAgICAgICAgICAgICB4Y1tkXSA9IDA7XHJcblxyXG4gICAgICAgICAgICAgIGlmICghZCkge1xyXG4gICAgICAgICAgICAgICAgKytlO1xyXG4gICAgICAgICAgICAgICAgeGMgPSBbMV0uY29uY2F0KHhjKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBEZXRlcm1pbmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICAgICAgICBmb3IgKGsgPSB4Yy5sZW5ndGg7ICF4Y1stLWtdOyk7XHJcblxyXG4gICAgICAgICAgLy8gRS5nLiBbNCwgMTEsIDE1XSBiZWNvbWVzIDRiZi5cclxuICAgICAgICAgIGZvciAoaSA9IDAsIHN0ciA9ICcnOyBpIDw9IGs7IHN0ciArPSBhbHBoYWJldC5jaGFyQXQoeGNbaSsrXSkpO1xyXG5cclxuICAgICAgICAgIC8vIEFkZCBsZWFkaW5nIHplcm9zLCBkZWNpbWFsIHBvaW50IGFuZCB0cmFpbGluZyB6ZXJvcyBhcyByZXF1aXJlZC5cclxuICAgICAgICAgIHN0ciA9IHRvRml4ZWRQb2ludChzdHIsIGUsIGFscGhhYmV0LmNoYXJBdCgwKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaGUgY2FsbGVyIHdpbGwgYWRkIHRoZSBzaWduLlxyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICAgIH07XHJcbiAgICB9KSgpO1xyXG5cclxuXHJcbiAgICAvLyBQZXJmb3JtIGRpdmlzaW9uIGluIHRoZSBzcGVjaWZpZWQgYmFzZS4gQ2FsbGVkIGJ5IGRpdiBhbmQgY29udmVydEJhc2UuXHJcbiAgICBkaXYgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgLy8gQXNzdW1lIG5vbi16ZXJvIHggYW5kIGsuXHJcbiAgICAgIGZ1bmN0aW9uIG11bHRpcGx5KHgsIGssIGJhc2UpIHtcclxuICAgICAgICB2YXIgbSwgdGVtcCwgeGxvLCB4aGksXHJcbiAgICAgICAgICBjYXJyeSA9IDAsXHJcbiAgICAgICAgICBpID0geC5sZW5ndGgsXHJcbiAgICAgICAgICBrbG8gPSBrICUgU1FSVF9CQVNFLFxyXG4gICAgICAgICAga2hpID0gayAvIFNRUlRfQkFTRSB8IDA7XHJcblxyXG4gICAgICAgIGZvciAoeCA9IHguc2xpY2UoKTsgaS0tOykge1xyXG4gICAgICAgICAgeGxvID0geFtpXSAlIFNRUlRfQkFTRTtcclxuICAgICAgICAgIHhoaSA9IHhbaV0gLyBTUVJUX0JBU0UgfCAwO1xyXG4gICAgICAgICAgbSA9IGtoaSAqIHhsbyArIHhoaSAqIGtsbztcclxuICAgICAgICAgIHRlbXAgPSBrbG8gKiB4bG8gKyAoKG0gJSBTUVJUX0JBU0UpICogU1FSVF9CQVNFKSArIGNhcnJ5O1xyXG4gICAgICAgICAgY2FycnkgPSAodGVtcCAvIGJhc2UgfCAwKSArIChtIC8gU1FSVF9CQVNFIHwgMCkgKyBraGkgKiB4aGk7XHJcbiAgICAgICAgICB4W2ldID0gdGVtcCAlIGJhc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2FycnkpIHggPSBbY2FycnldLmNvbmNhdCh4KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIGNvbXBhcmUoYSwgYiwgYUwsIGJMKSB7XHJcbiAgICAgICAgdmFyIGksIGNtcDtcclxuXHJcbiAgICAgICAgaWYgKGFMICE9IGJMKSB7XHJcbiAgICAgICAgICBjbXAgPSBhTCA+IGJMID8gMSA6IC0xO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgZm9yIChpID0gY21wID0gMDsgaSA8IGFMOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChhW2ldICE9IGJbaV0pIHtcclxuICAgICAgICAgICAgICBjbXAgPSBhW2ldID4gYltpXSA/IDEgOiAtMTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNtcDtcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gc3VidHJhY3QoYSwgYiwgYUwsIGJhc2UpIHtcclxuICAgICAgICB2YXIgaSA9IDA7XHJcblxyXG4gICAgICAgIC8vIFN1YnRyYWN0IGIgZnJvbSBhLlxyXG4gICAgICAgIGZvciAoOyBhTC0tOykge1xyXG4gICAgICAgICAgYVthTF0gLT0gaTtcclxuICAgICAgICAgIGkgPSBhW2FMXSA8IGJbYUxdID8gMSA6IDA7XHJcbiAgICAgICAgICBhW2FMXSA9IGkgKiBiYXNlICsgYVthTF0gLSBiW2FMXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBsZWFkaW5nIHplcm9zLlxyXG4gICAgICAgIGZvciAoOyAhYVswXSAmJiBhLmxlbmd0aCA+IDE7IGEuc3BsaWNlKDAsIDEpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8geDogZGl2aWRlbmQsIHk6IGRpdmlzb3IuXHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoeCwgeSwgZHAsIHJtLCBiYXNlKSB7XHJcbiAgICAgICAgdmFyIGNtcCwgZSwgaSwgbW9yZSwgbiwgcHJvZCwgcHJvZEwsIHEsIHFjLCByZW0sIHJlbUwsIHJlbTAsIHhpLCB4TCwgeWMwLFxyXG4gICAgICAgICAgeUwsIHl6LFxyXG4gICAgICAgICAgcyA9IHgucyA9PSB5LnMgPyAxIDogLTEsXHJcbiAgICAgICAgICB4YyA9IHguYyxcclxuICAgICAgICAgIHljID0geS5jO1xyXG5cclxuICAgICAgICAvLyBFaXRoZXIgTmFOLCBJbmZpbml0eSBvciAwP1xyXG4gICAgICAgIGlmICgheGMgfHwgIXhjWzBdIHx8ICF5YyB8fCAheWNbMF0pIHtcclxuXHJcbiAgICAgICAgICByZXR1cm4gbmV3IEJpZ051bWJlcihcclxuXHJcbiAgICAgICAgICAgLy8gUmV0dXJuIE5hTiBpZiBlaXRoZXIgTmFOLCBvciBib3RoIEluZmluaXR5IG9yIDAuXHJcbiAgICAgICAgICAgIXgucyB8fCAheS5zIHx8ICh4YyA/IHljICYmIHhjWzBdID09IHljWzBdIDogIXljKSA/IE5hTiA6XHJcblxyXG4gICAgICAgICAgICAvLyBSZXR1cm4gwrEwIGlmIHggaXMgwrEwIG9yIHkgaXMgwrFJbmZpbml0eSwgb3IgcmV0dXJuIMKxSW5maW5pdHkgYXMgeSBpcyDCsTAuXHJcbiAgICAgICAgICAgIHhjICYmIHhjWzBdID09IDAgfHwgIXljID8gcyAqIDAgOiBzIC8gMFxyXG4gICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcSA9IG5ldyBCaWdOdW1iZXIocyk7XHJcbiAgICAgICAgcWMgPSBxLmMgPSBbXTtcclxuICAgICAgICBlID0geC5lIC0geS5lO1xyXG4gICAgICAgIHMgPSBkcCArIGUgKyAxO1xyXG5cclxuICAgICAgICBpZiAoIWJhc2UpIHtcclxuICAgICAgICAgIGJhc2UgPSBCQVNFO1xyXG4gICAgICAgICAgZSA9IGJpdEZsb29yKHguZSAvIExPR19CQVNFKSAtIGJpdEZsb29yKHkuZSAvIExPR19CQVNFKTtcclxuICAgICAgICAgIHMgPSBzIC8gTE9HX0JBU0UgfCAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVzdWx0IGV4cG9uZW50IG1heSBiZSBvbmUgbGVzcyB0aGVuIHRoZSBjdXJyZW50IHZhbHVlIG9mIGUuXHJcbiAgICAgICAgLy8gVGhlIGNvZWZmaWNpZW50cyBvZiB0aGUgQmlnTnVtYmVycyBmcm9tIGNvbnZlcnRCYXNlIG1heSBoYXZlIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgICAgIGZvciAoaSA9IDA7IHljW2ldID09ICh4Y1tpXSB8fCAwKTsgaSsrKTtcclxuXHJcbiAgICAgICAgaWYgKHljW2ldID4gKHhjW2ldIHx8IDApKSBlLS07XHJcblxyXG4gICAgICAgIGlmIChzIDwgMCkge1xyXG4gICAgICAgICAgcWMucHVzaCgxKTtcclxuICAgICAgICAgIG1vcmUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB4TCA9IHhjLmxlbmd0aDtcclxuICAgICAgICAgIHlMID0geWMubGVuZ3RoO1xyXG4gICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICBzICs9IDI7XHJcblxyXG4gICAgICAgICAgLy8gTm9ybWFsaXNlIHhjIGFuZCB5YyBzbyBoaWdoZXN0IG9yZGVyIGRpZ2l0IG9mIHljIGlzID49IGJhc2UgLyAyLlxyXG5cclxuICAgICAgICAgIG4gPSBtYXRoZmxvb3IoYmFzZSAvICh5Y1swXSArIDEpKTtcclxuXHJcbiAgICAgICAgICAvLyBOb3QgbmVjZXNzYXJ5LCBidXQgdG8gaGFuZGxlIG9kZCBiYXNlcyB3aGVyZSB5Y1swXSA9PSAoYmFzZSAvIDIpIC0gMS5cclxuICAgICAgICAgIC8vIGlmIChuID4gMSB8fCBuKysgPT0gMSAmJiB5Y1swXSA8IGJhc2UgLyAyKSB7XHJcbiAgICAgICAgICBpZiAobiA+IDEpIHtcclxuICAgICAgICAgICAgeWMgPSBtdWx0aXBseSh5YywgbiwgYmFzZSk7XHJcbiAgICAgICAgICAgIHhjID0gbXVsdGlwbHkoeGMsIG4sIGJhc2UpO1xyXG4gICAgICAgICAgICB5TCA9IHljLmxlbmd0aDtcclxuICAgICAgICAgICAgeEwgPSB4Yy5sZW5ndGg7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgeGkgPSB5TDtcclxuICAgICAgICAgIHJlbSA9IHhjLnNsaWNlKDAsIHlMKTtcclxuICAgICAgICAgIHJlbUwgPSByZW0ubGVuZ3RoO1xyXG5cclxuICAgICAgICAgIC8vIEFkZCB6ZXJvcyB0byBtYWtlIHJlbWFpbmRlciBhcyBsb25nIGFzIGRpdmlzb3IuXHJcbiAgICAgICAgICBmb3IgKDsgcmVtTCA8IHlMOyByZW1bcmVtTCsrXSA9IDApO1xyXG4gICAgICAgICAgeXogPSB5Yy5zbGljZSgpO1xyXG4gICAgICAgICAgeXogPSBbMF0uY29uY2F0KHl6KTtcclxuICAgICAgICAgIHljMCA9IHljWzBdO1xyXG4gICAgICAgICAgaWYgKHljWzFdID49IGJhc2UgLyAyKSB5YzArKztcclxuICAgICAgICAgIC8vIE5vdCBuZWNlc3NhcnksIGJ1dCB0byBwcmV2ZW50IHRyaWFsIGRpZ2l0IG4gPiBiYXNlLCB3aGVuIHVzaW5nIGJhc2UgMy5cclxuICAgICAgICAgIC8vIGVsc2UgaWYgKGJhc2UgPT0gMyAmJiB5YzAgPT0gMSkgeWMwID0gMSArIDFlLTE1O1xyXG5cclxuICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgbiA9IDA7XHJcblxyXG4gICAgICAgICAgICAvLyBDb21wYXJlIGRpdmlzb3IgYW5kIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgY21wID0gY29tcGFyZSh5YywgcmVtLCB5TCwgcmVtTCk7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBkaXZpc29yIDwgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICBpZiAoY21wIDwgMCkge1xyXG5cclxuICAgICAgICAgICAgICAvLyBDYWxjdWxhdGUgdHJpYWwgZGlnaXQsIG4uXHJcblxyXG4gICAgICAgICAgICAgIHJlbTAgPSByZW1bMF07XHJcbiAgICAgICAgICAgICAgaWYgKHlMICE9IHJlbUwpIHJlbTAgPSByZW0wICogYmFzZSArIChyZW1bMV0gfHwgMCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIG4gaXMgaG93IG1hbnkgdGltZXMgdGhlIGRpdmlzb3IgZ29lcyBpbnRvIHRoZSBjdXJyZW50IHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICBuID0gbWF0aGZsb29yKHJlbTAgLyB5YzApO1xyXG5cclxuICAgICAgICAgICAgICAvLyAgQWxnb3JpdGhtOlxyXG4gICAgICAgICAgICAgIC8vICBwcm9kdWN0ID0gZGl2aXNvciBtdWx0aXBsaWVkIGJ5IHRyaWFsIGRpZ2l0IChuKS5cclxuICAgICAgICAgICAgICAvLyAgQ29tcGFyZSBwcm9kdWN0IGFuZCByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgLy8gIElmIHByb2R1Y3QgaXMgZ3JlYXRlciB0aGFuIHJlbWFpbmRlcjpcclxuICAgICAgICAgICAgICAvLyAgICBTdWJ0cmFjdCBkaXZpc29yIGZyb20gcHJvZHVjdCwgZGVjcmVtZW50IHRyaWFsIGRpZ2l0LlxyXG4gICAgICAgICAgICAgIC8vICBTdWJ0cmFjdCBwcm9kdWN0IGZyb20gcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIC8vICBJZiBwcm9kdWN0IHdhcyBsZXNzIHRoYW4gcmVtYWluZGVyIGF0IHRoZSBsYXN0IGNvbXBhcmU6XHJcbiAgICAgICAgICAgICAgLy8gICAgQ29tcGFyZSBuZXcgcmVtYWluZGVyIGFuZCBkaXZpc29yLlxyXG4gICAgICAgICAgICAgIC8vICAgIElmIHJlbWFpbmRlciBpcyBncmVhdGVyIHRoYW4gZGl2aXNvcjpcclxuICAgICAgICAgICAgICAvLyAgICAgIFN1YnRyYWN0IGRpdmlzb3IgZnJvbSByZW1haW5kZXIsIGluY3JlbWVudCB0cmlhbCBkaWdpdC5cclxuXHJcbiAgICAgICAgICAgICAgaWYgKG4gPiAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gbiBtYXkgYmUgPiBiYXNlIG9ubHkgd2hlbiBiYXNlIGlzIDMuXHJcbiAgICAgICAgICAgICAgICBpZiAobiA+PSBiYXNlKSBuID0gYmFzZSAtIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcHJvZHVjdCA9IGRpdmlzb3IgKiB0cmlhbCBkaWdpdC5cclxuICAgICAgICAgICAgICAgIHByb2QgPSBtdWx0aXBseSh5YywgbiwgYmFzZSk7XHJcbiAgICAgICAgICAgICAgICBwcm9kTCA9IHByb2QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgcmVtTCA9IHJlbS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ29tcGFyZSBwcm9kdWN0IGFuZCByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBwcm9kdWN0ID4gcmVtYWluZGVyIHRoZW4gdHJpYWwgZGlnaXQgbiB0b28gaGlnaC5cclxuICAgICAgICAgICAgICAgIC8vIG4gaXMgMSB0b28gaGlnaCBhYm91dCA1JSBvZiB0aGUgdGltZSwgYW5kIGlzIG5vdCBrbm93biB0byBoYXZlXHJcbiAgICAgICAgICAgICAgICAvLyBldmVyIGJlZW4gbW9yZSB0aGFuIDEgdG9vIGhpZ2guXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoY29tcGFyZShwcm9kLCByZW0sIHByb2RMLCByZW1MKSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgIG4tLTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIC8vIFN1YnRyYWN0IGRpdmlzb3IgZnJvbSBwcm9kdWN0LlxyXG4gICAgICAgICAgICAgICAgICBzdWJ0cmFjdChwcm9kLCB5TCA8IHByb2RMID8geXogOiB5YywgcHJvZEwsIGJhc2UpO1xyXG4gICAgICAgICAgICAgICAgICBwcm9kTCA9IHByb2QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICBjbXAgPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gbiBpcyAwIG9yIDEsIGNtcCBpcyAtMS5cclxuICAgICAgICAgICAgICAgIC8vIElmIG4gaXMgMCwgdGhlcmUgaXMgbm8gbmVlZCB0byBjb21wYXJlIHljIGFuZCByZW0gYWdhaW4gYmVsb3csXHJcbiAgICAgICAgICAgICAgICAvLyBzbyBjaGFuZ2UgY21wIHRvIDEgdG8gYXZvaWQgaXQuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBuIGlzIDEsIGxlYXZlIGNtcCBhcyAtMSwgc28geWMgYW5kIHJlbSBhcmUgY29tcGFyZWQgYWdhaW4uXHJcbiAgICAgICAgICAgICAgICBpZiAobiA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAvLyBkaXZpc29yIDwgcmVtYWluZGVyLCBzbyBuIG11c3QgYmUgYXQgbGVhc3QgMS5cclxuICAgICAgICAgICAgICAgICAgY21wID0gbiA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcHJvZHVjdCA9IGRpdmlzb3JcclxuICAgICAgICAgICAgICAgIHByb2QgPSB5Yy5zbGljZSgpO1xyXG4gICAgICAgICAgICAgICAgcHJvZEwgPSBwcm9kLmxlbmd0aDtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGlmIChwcm9kTCA8IHJlbUwpIHByb2QgPSBbMF0uY29uY2F0KHByb2QpO1xyXG5cclxuICAgICAgICAgICAgICAvLyBTdWJ0cmFjdCBwcm9kdWN0IGZyb20gcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIHN1YnRyYWN0KHJlbSwgcHJvZCwgcmVtTCwgYmFzZSk7XHJcbiAgICAgICAgICAgICAgcmVtTCA9IHJlbS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAvLyBJZiBwcm9kdWN0IHdhcyA8IHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICBpZiAoY21wID09IC0xKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ29tcGFyZSBkaXZpc29yIGFuZCBuZXcgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgICAgLy8gSWYgZGl2aXNvciA8IG5ldyByZW1haW5kZXIsIHN1YnRyYWN0IGRpdmlzb3IgZnJvbSByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgICAvLyBUcmlhbCBkaWdpdCBuIHRvbyBsb3cuXHJcbiAgICAgICAgICAgICAgICAvLyBuIGlzIDEgdG9vIGxvdyBhYm91dCA1JSBvZiB0aGUgdGltZSwgYW5kIHZlcnkgcmFyZWx5IDIgdG9vIGxvdy5cclxuICAgICAgICAgICAgICAgIHdoaWxlIChjb21wYXJlKHljLCByZW0sIHlMLCByZW1MKSA8IDEpIHtcclxuICAgICAgICAgICAgICAgICAgbisrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgLy8gU3VidHJhY3QgZGl2aXNvciBmcm9tIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICAgICAgc3VidHJhY3QocmVtLCB5TCA8IHJlbUwgPyB5eiA6IHljLCByZW1MLCBiYXNlKTtcclxuICAgICAgICAgICAgICAgICAgcmVtTCA9IHJlbS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNtcCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgIG4rKztcclxuICAgICAgICAgICAgICByZW0gPSBbMF07XHJcbiAgICAgICAgICAgIH0gLy8gZWxzZSBjbXAgPT09IDEgYW5kIG4gd2lsbCBiZSAwXHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgdGhlIG5leHQgZGlnaXQsIG4sIHRvIHRoZSByZXN1bHQgYXJyYXkuXHJcbiAgICAgICAgICAgIHFjW2krK10gPSBuO1xyXG5cclxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSByZW1haW5kZXIuXHJcbiAgICAgICAgICAgIGlmIChyZW1bMF0pIHtcclxuICAgICAgICAgICAgICByZW1bcmVtTCsrXSA9IHhjW3hpXSB8fCAwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHJlbSA9IFt4Y1t4aV1dO1xyXG4gICAgICAgICAgICAgIHJlbUwgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IHdoaWxlICgoeGkrKyA8IHhMIHx8IHJlbVswXSAhPSBudWxsKSAmJiBzLS0pO1xyXG5cclxuICAgICAgICAgIG1vcmUgPSByZW1bMF0gIT0gbnVsbDtcclxuXHJcbiAgICAgICAgICAvLyBMZWFkaW5nIHplcm8/XHJcbiAgICAgICAgICBpZiAoIXFjWzBdKSBxYy5zcGxpY2UoMCwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYmFzZSA9PSBCQVNFKSB7XHJcblxyXG4gICAgICAgICAgLy8gVG8gY2FsY3VsYXRlIHEuZSwgZmlyc3QgZ2V0IHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIHFjWzBdLlxyXG4gICAgICAgICAgZm9yIChpID0gMSwgcyA9IHFjWzBdOyBzID49IDEwOyBzIC89IDEwLCBpKyspO1xyXG5cclxuICAgICAgICAgIHJvdW5kKHEsIGRwICsgKHEuZSA9IGkgKyBlICogTE9HX0JBU0UgLSAxKSArIDEsIHJtLCBtb3JlKTtcclxuXHJcbiAgICAgICAgLy8gQ2FsbGVyIGlzIGNvbnZlcnRCYXNlLlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBxLmUgPSBlO1xyXG4gICAgICAgICAgcS5yID0gK21vcmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcTtcclxuICAgICAgfTtcclxuICAgIH0pKCk7XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiBCaWdOdW1iZXIgbiBpbiBmaXhlZC1wb2ludCBvciBleHBvbmVudGlhbFxyXG4gICAgICogbm90YXRpb24gcm91bmRlZCB0byB0aGUgc3BlY2lmaWVkIGRlY2ltYWwgcGxhY2VzIG9yIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgICAqXHJcbiAgICAgKiBuOiBhIEJpZ051bWJlci5cclxuICAgICAqIGk6IHRoZSBpbmRleCBvZiB0aGUgbGFzdCBkaWdpdCByZXF1aXJlZCAoaS5lLiB0aGUgZGlnaXQgdGhhdCBtYXkgYmUgcm91bmRlZCB1cCkuXHJcbiAgICAgKiBybTogdGhlIHJvdW5kaW5nIG1vZGUuXHJcbiAgICAgKiBpZDogMSAodG9FeHBvbmVudGlhbCkgb3IgMiAodG9QcmVjaXNpb24pLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBmb3JtYXQobiwgaSwgcm0sIGlkKSB7XHJcbiAgICAgIHZhciBjMCwgZSwgbmUsIGxlbiwgc3RyO1xyXG5cclxuICAgICAgaWYgKHJtID09IG51bGwpIHJtID0gUk9VTkRJTkdfTU9ERTtcclxuICAgICAgZWxzZSBpbnRDaGVjayhybSwgMCwgOCk7XHJcblxyXG4gICAgICBpZiAoIW4uYykgcmV0dXJuIG4udG9TdHJpbmcoKTtcclxuXHJcbiAgICAgIGMwID0gbi5jWzBdO1xyXG4gICAgICBuZSA9IG4uZTtcclxuXHJcbiAgICAgIGlmIChpID09IG51bGwpIHtcclxuICAgICAgICBzdHIgPSBjb2VmZlRvU3RyaW5nKG4uYyk7XHJcbiAgICAgICAgc3RyID0gaWQgPT0gMSB8fCBpZCA9PSAyICYmIChuZSA8PSBUT19FWFBfTkVHIHx8IG5lID49IFRPX0VYUF9QT1MpXHJcbiAgICAgICAgID8gdG9FeHBvbmVudGlhbChzdHIsIG5lKVxyXG4gICAgICAgICA6IHRvRml4ZWRQb2ludChzdHIsIG5lLCAnMCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG4gPSByb3VuZChuZXcgQmlnTnVtYmVyKG4pLCBpLCBybSk7XHJcblxyXG4gICAgICAgIC8vIG4uZSBtYXkgaGF2ZSBjaGFuZ2VkIGlmIHRoZSB2YWx1ZSB3YXMgcm91bmRlZCB1cC5cclxuICAgICAgICBlID0gbi5lO1xyXG5cclxuICAgICAgICBzdHIgPSBjb2VmZlRvU3RyaW5nKG4uYyk7XHJcbiAgICAgICAgbGVuID0gc3RyLmxlbmd0aDtcclxuXHJcbiAgICAgICAgLy8gdG9QcmVjaXNpb24gcmV0dXJucyBleHBvbmVudGlhbCBub3RhdGlvbiBpZiB0aGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gICAgICAgIC8vIHNwZWNpZmllZCBpcyBsZXNzIHRoYW4gdGhlIG51bWJlciBvZiBkaWdpdHMgbmVjZXNzYXJ5IHRvIHJlcHJlc2VudCB0aGUgaW50ZWdlclxyXG4gICAgICAgIC8vIHBhcnQgb2YgdGhlIHZhbHVlIGluIGZpeGVkLXBvaW50IG5vdGF0aW9uLlxyXG5cclxuICAgICAgICAvLyBFeHBvbmVudGlhbCBub3RhdGlvbi5cclxuICAgICAgICBpZiAoaWQgPT0gMSB8fCBpZCA9PSAyICYmIChpIDw9IGUgfHwgZSA8PSBUT19FWFBfTkVHKSkge1xyXG5cclxuICAgICAgICAgIC8vIEFwcGVuZCB6ZXJvcz9cclxuICAgICAgICAgIGZvciAoOyBsZW4gPCBpOyBzdHIgKz0gJzAnLCBsZW4rKyk7XHJcbiAgICAgICAgICBzdHIgPSB0b0V4cG9uZW50aWFsKHN0ciwgZSk7XHJcblxyXG4gICAgICAgIC8vIEZpeGVkLXBvaW50IG5vdGF0aW9uLlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpIC09IG5lO1xyXG4gICAgICAgICAgc3RyID0gdG9GaXhlZFBvaW50KHN0ciwgZSwgJzAnKTtcclxuXHJcbiAgICAgICAgICAvLyBBcHBlbmQgemVyb3M/XHJcbiAgICAgICAgICBpZiAoZSArIDEgPiBsZW4pIHtcclxuICAgICAgICAgICAgaWYgKC0taSA+IDApIGZvciAoc3RyICs9ICcuJzsgaS0tOyBzdHIgKz0gJzAnKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGkgKz0gZSAtIGxlbjtcclxuICAgICAgICAgICAgaWYgKGkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGUgKyAxID09IGxlbikgc3RyICs9ICcuJztcclxuICAgICAgICAgICAgICBmb3IgKDsgaS0tOyBzdHIgKz0gJzAnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG4ucyA8IDAgJiYgYzAgPyAnLScgKyBzdHIgOiBzdHI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIEhhbmRsZSBCaWdOdW1iZXIubWF4IGFuZCBCaWdOdW1iZXIubWluLlxyXG4gICAgLy8gSWYgYW55IG51bWJlciBpcyBOYU4sIHJldHVybiBOYU4uXHJcbiAgICBmdW5jdGlvbiBtYXhPck1pbihhcmdzLCBuKSB7XHJcbiAgICAgIHZhciBrLCB5LFxyXG4gICAgICAgIGkgPSAxLFxyXG4gICAgICAgIHggPSBuZXcgQmlnTnVtYmVyKGFyZ3NbMF0pO1xyXG5cclxuICAgICAgZm9yICg7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgeSA9IG5ldyBCaWdOdW1iZXIoYXJnc1tpXSk7XHJcbiAgICAgICAgaWYgKCF5LnMgfHwgKGsgPSBjb21wYXJlKHgsIHkpKSA9PT0gbiB8fCBrID09PSAwICYmIHgucyA9PT0gbikge1xyXG4gICAgICAgICAgeCA9IHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4geDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFN0cmlwIHRyYWlsaW5nIHplcm9zLCBjYWxjdWxhdGUgYmFzZSAxMCBleHBvbmVudCBhbmQgY2hlY2sgYWdhaW5zdCBNSU5fRVhQIGFuZCBNQVhfRVhQLlxyXG4gICAgICogQ2FsbGVkIGJ5IG1pbnVzLCBwbHVzIGFuZCB0aW1lcy5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gbm9ybWFsaXNlKG4sIGMsIGUpIHtcclxuICAgICAgdmFyIGkgPSAxLFxyXG4gICAgICAgIGogPSBjLmxlbmd0aDtcclxuXHJcbiAgICAgICAvLyBSZW1vdmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICAgIGZvciAoOyAhY1stLWpdOyBjLnBvcCgpKTtcclxuXHJcbiAgICAgIC8vIENhbGN1bGF0ZSB0aGUgYmFzZSAxMCBleHBvbmVudC4gRmlyc3QgZ2V0IHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIGNbMF0uXHJcbiAgICAgIGZvciAoaiA9IGNbMF07IGogPj0gMTA7IGogLz0gMTAsIGkrKyk7XHJcblxyXG4gICAgICAvLyBPdmVyZmxvdz9cclxuICAgICAgaWYgKChlID0gaSArIGUgKiBMT0dfQkFTRSAtIDEpID4gTUFYX0VYUCkge1xyXG5cclxuICAgICAgICAvLyBJbmZpbml0eS5cclxuICAgICAgICBuLmMgPSBuLmUgPSBudWxsO1xyXG5cclxuICAgICAgLy8gVW5kZXJmbG93P1xyXG4gICAgICB9IGVsc2UgaWYgKGUgPCBNSU5fRVhQKSB7XHJcblxyXG4gICAgICAgIC8vIFplcm8uXHJcbiAgICAgICAgbi5jID0gW24uZSA9IDBdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG4uZSA9IGU7XHJcbiAgICAgICAgbi5jID0gYztcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG47XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIEhhbmRsZSB2YWx1ZXMgdGhhdCBmYWlsIHRoZSB2YWxpZGl0eSB0ZXN0IGluIEJpZ051bWJlci5cclxuICAgIHBhcnNlTnVtZXJpYyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBiYXNlUHJlZml4ID0gL14oLT8pMChbeGJvXSkoPz1cXHdbXFx3Ll0qJCkvaSxcclxuICAgICAgICBkb3RBZnRlciA9IC9eKFteLl0rKVxcLiQvLFxyXG4gICAgICAgIGRvdEJlZm9yZSA9IC9eXFwuKFteLl0rKSQvLFxyXG4gICAgICAgIGlzSW5maW5pdHlPck5hTiA9IC9eLT8oSW5maW5pdHl8TmFOKSQvLFxyXG4gICAgICAgIHdoaXRlc3BhY2VPclBsdXMgPSAvXlxccypcXCsoPz1bXFx3Ll0pfF5cXHMrfFxccyskL2c7XHJcblxyXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHgsIHN0ciwgaXNOdW0sIGIpIHtcclxuICAgICAgICB2YXIgYmFzZSxcclxuICAgICAgICAgIHMgPSBpc051bSA/IHN0ciA6IHN0ci5yZXBsYWNlKHdoaXRlc3BhY2VPclBsdXMsICcnKTtcclxuXHJcbiAgICAgICAgLy8gTm8gZXhjZXB0aW9uIG9uIMKxSW5maW5pdHkgb3IgTmFOLlxyXG4gICAgICAgIGlmIChpc0luZmluaXR5T3JOYU4udGVzdChzKSkge1xyXG4gICAgICAgICAgeC5zID0gaXNOYU4ocykgPyBudWxsIDogcyA8IDAgPyAtMSA6IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmICghaXNOdW0pIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGJhc2VQcmVmaXggPSAvXigtPykwKFt4Ym9dKSg/PVxcd1tcXHcuXSokKS9pXHJcbiAgICAgICAgICAgIHMgPSBzLnJlcGxhY2UoYmFzZVByZWZpeCwgZnVuY3Rpb24gKG0sIHAxLCBwMikge1xyXG4gICAgICAgICAgICAgIGJhc2UgPSAocDIgPSBwMi50b0xvd2VyQ2FzZSgpKSA9PSAneCcgPyAxNiA6IHAyID09ICdiJyA/IDIgOiA4O1xyXG4gICAgICAgICAgICAgIHJldHVybiAhYiB8fCBiID09IGJhc2UgPyBwMSA6IG07XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGIpIHtcclxuICAgICAgICAgICAgICBiYXNlID0gYjtcclxuXHJcbiAgICAgICAgICAgICAgLy8gRS5nLiAnMS4nIHRvICcxJywgJy4xJyB0byAnMC4xJ1xyXG4gICAgICAgICAgICAgIHMgPSBzLnJlcGxhY2UoZG90QWZ0ZXIsICckMScpLnJlcGxhY2UoZG90QmVmb3JlLCAnMC4kMScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RyICE9IHMpIHJldHVybiBuZXcgQmlnTnVtYmVyKHMsIGJhc2UpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBOb3QgYSBudW1iZXI6IHtufSdcclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBOb3QgYSBiYXNlIHtifSBudW1iZXI6IHtufSdcclxuICAgICAgICAgIGlmIChCaWdOdW1iZXIuREVCVUcpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyAnTm90IGEnICsgKGIgPyAnIGJhc2UgJyArIGIgOiAnJykgKyAnIG51bWJlcjogJyArIHN0cik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gTmFOXHJcbiAgICAgICAgICB4LnMgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgeC5jID0geC5lID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJvdW5kIHggdG8gc2Qgc2lnbmlmaWNhbnQgZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgcm0uIENoZWNrIGZvciBvdmVyL3VuZGVyLWZsb3cuXHJcbiAgICAgKiBJZiByIGlzIHRydXRoeSwgaXQgaXMga25vd24gdGhhdCB0aGVyZSBhcmUgbW9yZSBkaWdpdHMgYWZ0ZXIgdGhlIHJvdW5kaW5nIGRpZ2l0LlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByb3VuZCh4LCBzZCwgcm0sIHIpIHtcclxuICAgICAgdmFyIGQsIGksIGosIGssIG4sIG5pLCByZCxcclxuICAgICAgICB4YyA9IHguYyxcclxuICAgICAgICBwb3dzMTAgPSBQT1dTX1RFTjtcclxuXHJcbiAgICAgIC8vIGlmIHggaXMgbm90IEluZmluaXR5IG9yIE5hTi4uLlxyXG4gICAgICBpZiAoeGMpIHtcclxuXHJcbiAgICAgICAgLy8gcmQgaXMgdGhlIHJvdW5kaW5nIGRpZ2l0LCBpLmUuIHRoZSBkaWdpdCBhZnRlciB0aGUgZGlnaXQgdGhhdCBtYXkgYmUgcm91bmRlZCB1cC5cclxuICAgICAgICAvLyBuIGlzIGEgYmFzZSAxZTE0IG51bWJlciwgdGhlIHZhbHVlIG9mIHRoZSBlbGVtZW50IG9mIGFycmF5IHguYyBjb250YWluaW5nIHJkLlxyXG4gICAgICAgIC8vIG5pIGlzIHRoZSBpbmRleCBvZiBuIHdpdGhpbiB4LmMuXHJcbiAgICAgICAgLy8gZCBpcyB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiBuLlxyXG4gICAgICAgIC8vIGkgaXMgdGhlIGluZGV4IG9mIHJkIHdpdGhpbiBuIGluY2x1ZGluZyBsZWFkaW5nIHplcm9zLlxyXG4gICAgICAgIC8vIGogaXMgdGhlIGFjdHVhbCBpbmRleCBvZiByZCB3aXRoaW4gbiAoaWYgPCAwLCByZCBpcyBhIGxlYWRpbmcgemVybykuXHJcbiAgICAgICAgb3V0OiB7XHJcblxyXG4gICAgICAgICAgLy8gR2V0IHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIHRoZSBmaXJzdCBlbGVtZW50IG9mIHhjLlxyXG4gICAgICAgICAgZm9yIChkID0gMSwgayA9IHhjWzBdOyBrID49IDEwOyBrIC89IDEwLCBkKyspO1xyXG4gICAgICAgICAgaSA9IHNkIC0gZDtcclxuXHJcbiAgICAgICAgICAvLyBJZiB0aGUgcm91bmRpbmcgZGlnaXQgaXMgaW4gdGhlIGZpcnN0IGVsZW1lbnQgb2YgeGMuLi5cclxuICAgICAgICAgIGlmIChpIDwgMCkge1xyXG4gICAgICAgICAgICBpICs9IExPR19CQVNFO1xyXG4gICAgICAgICAgICBqID0gc2Q7XHJcbiAgICAgICAgICAgIG4gPSB4Y1tuaSA9IDBdO1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0IHRoZSByb3VuZGluZyBkaWdpdCBhdCBpbmRleCBqIG9mIG4uXHJcbiAgICAgICAgICAgIHJkID0gbWF0aGZsb29yKG4gLyBwb3dzMTBbZCAtIGogLSAxXSAlIDEwKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5pID0gbWF0aGNlaWwoKGkgKyAxKSAvIExPR19CQVNFKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuaSA+PSB4Yy5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBOZWVkZWQgYnkgc3FydC5cclxuICAgICAgICAgICAgICAgIGZvciAoOyB4Yy5sZW5ndGggPD0gbmk7IHhjLnB1c2goMCkpO1xyXG4gICAgICAgICAgICAgICAgbiA9IHJkID0gMDtcclxuICAgICAgICAgICAgICAgIGQgPSAxO1xyXG4gICAgICAgICAgICAgICAgaSAlPSBMT0dfQkFTRTtcclxuICAgICAgICAgICAgICAgIGogPSBpIC0gTE9HX0JBU0UgKyAxO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBicmVhayBvdXQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG4gPSBrID0geGNbbmldO1xyXG5cclxuICAgICAgICAgICAgICAvLyBHZXQgdGhlIG51bWJlciBvZiBkaWdpdHMgb2Ygbi5cclxuICAgICAgICAgICAgICBmb3IgKGQgPSAxOyBrID49IDEwOyBrIC89IDEwLCBkKyspO1xyXG5cclxuICAgICAgICAgICAgICAvLyBHZXQgdGhlIGluZGV4IG9mIHJkIHdpdGhpbiBuLlxyXG4gICAgICAgICAgICAgIGkgJT0gTE9HX0JBU0U7XHJcblxyXG4gICAgICAgICAgICAgIC8vIEdldCB0aGUgaW5kZXggb2YgcmQgd2l0aGluIG4sIGFkanVzdGVkIGZvciBsZWFkaW5nIHplcm9zLlxyXG4gICAgICAgICAgICAgIC8vIFRoZSBudW1iZXIgb2YgbGVhZGluZyB6ZXJvcyBvZiBuIGlzIGdpdmVuIGJ5IExPR19CQVNFIC0gZC5cclxuICAgICAgICAgICAgICBqID0gaSAtIExPR19CQVNFICsgZDtcclxuXHJcbiAgICAgICAgICAgICAgLy8gR2V0IHRoZSByb3VuZGluZyBkaWdpdCBhdCBpbmRleCBqIG9mIG4uXHJcbiAgICAgICAgICAgICAgcmQgPSBqIDwgMCA/IDAgOiBtYXRoZmxvb3IobiAvIHBvd3MxMFtkIC0gaiAtIDFdICUgMTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgciA9IHIgfHwgc2QgPCAwIHx8XHJcblxyXG4gICAgICAgICAgLy8gQXJlIHRoZXJlIGFueSBub24temVybyBkaWdpdHMgYWZ0ZXIgdGhlIHJvdW5kaW5nIGRpZ2l0P1xyXG4gICAgICAgICAgLy8gVGhlIGV4cHJlc3Npb24gIG4gJSBwb3dzMTBbZCAtIGogLSAxXSAgcmV0dXJucyBhbGwgZGlnaXRzIG9mIG4gdG8gdGhlIHJpZ2h0XHJcbiAgICAgICAgICAvLyBvZiB0aGUgZGlnaXQgYXQgaiwgZS5nLiBpZiBuIGlzIDkwODcxNCBhbmQgaiBpcyAyLCB0aGUgZXhwcmVzc2lvbiBnaXZlcyA3MTQuXHJcbiAgICAgICAgICAgeGNbbmkgKyAxXSAhPSBudWxsIHx8IChqIDwgMCA/IG4gOiBuICUgcG93czEwW2QgLSBqIC0gMV0pO1xyXG5cclxuICAgICAgICAgIHIgPSBybSA8IDRcclxuICAgICAgICAgICA/IChyZCB8fCByKSAmJiAocm0gPT0gMCB8fCBybSA9PSAoeC5zIDwgMCA/IDMgOiAyKSlcclxuICAgICAgICAgICA6IHJkID4gNSB8fCByZCA9PSA1ICYmIChybSA9PSA0IHx8IHIgfHwgcm0gPT0gNiAmJlxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgZGlnaXQgdG8gdGhlIGxlZnQgb2YgdGhlIHJvdW5kaW5nIGRpZ2l0IGlzIG9kZC5cclxuICAgICAgICAgICAgKChpID4gMCA/IGogPiAwID8gbiAvIHBvd3MxMFtkIC0gal0gOiAwIDogeGNbbmkgLSAxXSkgJSAxMCkgJiAxIHx8XHJcbiAgICAgICAgICAgICBybSA9PSAoeC5zIDwgMCA/IDggOiA3KSk7XHJcblxyXG4gICAgICAgICAgaWYgKHNkIDwgMSB8fCAheGNbMF0pIHtcclxuICAgICAgICAgICAgeGMubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmIChyKSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIENvbnZlcnQgc2QgdG8gZGVjaW1hbCBwbGFjZXMuXHJcbiAgICAgICAgICAgICAgc2QgLT0geC5lICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gMSwgMC4xLCAwLjAxLCAwLjAwMSwgMC4wMDAxIGV0Yy5cclxuICAgICAgICAgICAgICB4Y1swXSA9IHBvd3MxMFsoTE9HX0JBU0UgLSBzZCAlIExPR19CQVNFKSAlIExPR19CQVNFXTtcclxuICAgICAgICAgICAgICB4LmUgPSAtc2QgfHwgMDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gWmVyby5cclxuICAgICAgICAgICAgICB4Y1swXSA9IHguZSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB4O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFJlbW92ZSBleGNlc3MgZGlnaXRzLlxyXG4gICAgICAgICAgaWYgKGkgPT0gMCkge1xyXG4gICAgICAgICAgICB4Yy5sZW5ndGggPSBuaTtcclxuICAgICAgICAgICAgayA9IDE7XHJcbiAgICAgICAgICAgIG5pLS07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB4Yy5sZW5ndGggPSBuaSArIDE7XHJcbiAgICAgICAgICAgIGsgPSBwb3dzMTBbTE9HX0JBU0UgLSBpXTtcclxuXHJcbiAgICAgICAgICAgIC8vIEUuZy4gNTY3MDAgYmVjb21lcyA1NjAwMCBpZiA3IGlzIHRoZSByb3VuZGluZyBkaWdpdC5cclxuICAgICAgICAgICAgLy8gaiA+IDAgbWVhbnMgaSA+IG51bWJlciBvZiBsZWFkaW5nIHplcm9zIG9mIG4uXHJcbiAgICAgICAgICAgIHhjW25pXSA9IGogPiAwID8gbWF0aGZsb29yKG4gLyBwb3dzMTBbZCAtIGpdICUgcG93czEwW2pdKSAqIGsgOiAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFJvdW5kIHVwP1xyXG4gICAgICAgICAgaWYgKHIpIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAoOyA7KSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIElmIHRoZSBkaWdpdCB0byBiZSByb3VuZGVkIHVwIGlzIGluIHRoZSBmaXJzdCBlbGVtZW50IG9mIHhjLi4uXHJcbiAgICAgICAgICAgICAgaWYgKG5pID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpIHdpbGwgYmUgdGhlIGxlbmd0aCBvZiB4Y1swXSBiZWZvcmUgayBpcyBhZGRlZC5cclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDEsIGogPSB4Y1swXTsgaiA+PSAxMDsgaiAvPSAxMCwgaSsrKTtcclxuICAgICAgICAgICAgICAgIGogPSB4Y1swXSArPSBrO1xyXG4gICAgICAgICAgICAgICAgZm9yIChrID0gMTsgaiA+PSAxMDsgaiAvPSAxMCwgaysrKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiBpICE9IGsgdGhlIGxlbmd0aCBoYXMgaW5jcmVhc2VkLlxyXG4gICAgICAgICAgICAgICAgaWYgKGkgIT0gaykge1xyXG4gICAgICAgICAgICAgICAgICB4LmUrKztcclxuICAgICAgICAgICAgICAgICAgaWYgKHhjWzBdID09IEJBU0UpIHhjWzBdID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgeGNbbmldICs9IGs7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGNbbmldICE9IEJBU0UpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgeGNbbmktLV0gPSAwO1xyXG4gICAgICAgICAgICAgICAgayA9IDE7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgICAgICAgZm9yIChpID0geGMubGVuZ3RoOyB4Y1stLWldID09PSAwOyB4Yy5wb3AoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBPdmVyZmxvdz8gSW5maW5pdHkuXHJcbiAgICAgICAgaWYgKHguZSA+IE1BWF9FWFApIHtcclxuICAgICAgICAgIHguYyA9IHguZSA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIFVuZGVyZmxvdz8gWmVyby5cclxuICAgICAgICB9IGVsc2UgaWYgKHguZSA8IE1JTl9FWFApIHtcclxuICAgICAgICAgIHguYyA9IFt4LmUgPSAwXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB4O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiB2YWx1ZU9mKG4pIHtcclxuICAgICAgdmFyIHN0cixcclxuICAgICAgICBlID0gbi5lO1xyXG5cclxuICAgICAgaWYgKGUgPT09IG51bGwpIHJldHVybiBuLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICBzdHIgPSBjb2VmZlRvU3RyaW5nKG4uYyk7XHJcblxyXG4gICAgICBzdHIgPSBlIDw9IFRPX0VYUF9ORUcgfHwgZSA+PSBUT19FWFBfUE9TXHJcbiAgICAgICAgPyB0b0V4cG9uZW50aWFsKHN0ciwgZSlcclxuICAgICAgICA6IHRvRml4ZWRQb2ludChzdHIsIGUsICcwJyk7XHJcblxyXG4gICAgICByZXR1cm4gbi5zIDwgMCA/ICctJyArIHN0ciA6IHN0cjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gUFJPVE9UWVBFL0lOU1RBTkNFIE1FVEhPRFNcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIGFic29sdXRlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyLlxyXG4gICAgICovXHJcbiAgICBQLmFic29sdXRlVmFsdWUgPSBQLmFicyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHggPSBuZXcgQmlnTnVtYmVyKHRoaXMpO1xyXG4gICAgICBpZiAoeC5zIDwgMCkgeC5zID0gMTtcclxuICAgICAgcmV0dXJuIHg7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuXHJcbiAgICAgKiAgIDEgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIGdyZWF0ZXIgdGhhbiB0aGUgdmFsdWUgb2YgQmlnTnVtYmVyKHksIGIpLFxyXG4gICAgICogICAtMSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgbGVzcyB0aGFuIHRoZSB2YWx1ZSBvZiBCaWdOdW1iZXIoeSwgYiksXHJcbiAgICAgKiAgIDAgaWYgdGhleSBoYXZlIHRoZSBzYW1lIHZhbHVlLFxyXG4gICAgICogICBvciBudWxsIGlmIHRoZSB2YWx1ZSBvZiBlaXRoZXIgaXMgTmFOLlxyXG4gICAgICovXHJcbiAgICBQLmNvbXBhcmVkVG8gPSBmdW5jdGlvbiAoeSwgYikge1xyXG4gICAgICByZXR1cm4gY29tcGFyZSh0aGlzLCBuZXcgQmlnTnVtYmVyKHksIGIpKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBJZiBkcCBpcyB1bmRlZmluZWQgb3IgbnVsbCBvciB0cnVlIG9yIGZhbHNlLCByZXR1cm4gdGhlIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyBvZiB0aGVcclxuICAgICAqIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyLCBvciBudWxsIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyDCsUluZmluaXR5IG9yIE5hTi5cclxuICAgICAqXHJcbiAgICAgKiBPdGhlcndpc2UsIGlmIGRwIGlzIGEgbnVtYmVyLCByZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzXHJcbiAgICAgKiBCaWdOdW1iZXIgcm91bmRlZCB0byBhIG1heGltdW0gb2YgZHAgZGVjaW1hbCBwbGFjZXMgdXNpbmcgcm91bmRpbmcgbW9kZSBybSwgb3JcclxuICAgICAqIFJPVU5ESU5HX01PREUgaWYgcm0gaXMgb21pdHRlZC5cclxuICAgICAqXHJcbiAgICAgKiBbZHBdIHtudW1iZXJ9IERlY2ltYWwgcGxhY2VzOiBpbnRlZ2VyLCAwIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICAgKlxyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtkcHxybX0nXHJcbiAgICAgKi9cclxuICAgIFAuZGVjaW1hbFBsYWNlcyA9IFAuZHAgPSBmdW5jdGlvbiAoZHAsIHJtKSB7XHJcbiAgICAgIHZhciBjLCBuLCB2LFxyXG4gICAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgICAgaWYgKGRwICE9IG51bGwpIHtcclxuICAgICAgICBpbnRDaGVjayhkcCwgMCwgTUFYKTtcclxuICAgICAgICBpZiAocm0gPT0gbnVsbCkgcm0gPSBST1VORElOR19NT0RFO1xyXG4gICAgICAgIGVsc2UgaW50Q2hlY2socm0sIDAsIDgpO1xyXG5cclxuICAgICAgICByZXR1cm4gcm91bmQobmV3IEJpZ051bWJlcih4KSwgZHAgKyB4LmUgKyAxLCBybSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghKGMgPSB4LmMpKSByZXR1cm4gbnVsbDtcclxuICAgICAgbiA9ICgodiA9IGMubGVuZ3RoIC0gMSkgLSBiaXRGbG9vcih0aGlzLmUgLyBMT0dfQkFTRSkpICogTE9HX0JBU0U7XHJcblxyXG4gICAgICAvLyBTdWJ0cmFjdCB0aGUgbnVtYmVyIG9mIHRyYWlsaW5nIHplcm9zIG9mIHRoZSBsYXN0IG51bWJlci5cclxuICAgICAgaWYgKHYgPSBjW3ZdKSBmb3IgKDsgdiAlIDEwID09IDA7IHYgLz0gMTAsIG4tLSk7XHJcbiAgICAgIGlmIChuIDwgMCkgbiA9IDA7XHJcblxyXG4gICAgICByZXR1cm4gbjtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiAgbiAvIDAgPSBJXHJcbiAgICAgKiAgbiAvIE4gPSBOXHJcbiAgICAgKiAgbiAvIEkgPSAwXHJcbiAgICAgKiAgMCAvIG4gPSAwXHJcbiAgICAgKiAgMCAvIDAgPSBOXHJcbiAgICAgKiAgMCAvIE4gPSBOXHJcbiAgICAgKiAgMCAvIEkgPSAwXHJcbiAgICAgKiAgTiAvIG4gPSBOXHJcbiAgICAgKiAgTiAvIDAgPSBOXHJcbiAgICAgKiAgTiAvIE4gPSBOXHJcbiAgICAgKiAgTiAvIEkgPSBOXHJcbiAgICAgKiAgSSAvIG4gPSBJXHJcbiAgICAgKiAgSSAvIDAgPSBJXHJcbiAgICAgKiAgSSAvIE4gPSBOXHJcbiAgICAgKiAgSSAvIEkgPSBOXHJcbiAgICAgKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgZGl2aWRlZCBieSB0aGUgdmFsdWUgb2ZcclxuICAgICAqIEJpZ051bWJlcih5LCBiKSwgcm91bmRlZCBhY2NvcmRpbmcgdG8gREVDSU1BTF9QTEFDRVMgYW5kIFJPVU5ESU5HX01PREUuXHJcbiAgICAgKi9cclxuICAgIFAuZGl2aWRlZEJ5ID0gUC5kaXYgPSBmdW5jdGlvbiAoeSwgYikge1xyXG4gICAgICByZXR1cm4gZGl2KHRoaXMsIG5ldyBCaWdOdW1iZXIoeSwgYiksIERFQ0lNQUxfUExBQ0VTLCBST1VORElOR19NT0RFKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSBpbnRlZ2VyIHBhcnQgb2YgZGl2aWRpbmcgdGhlIHZhbHVlIG9mIHRoaXNcclxuICAgICAqIEJpZ051bWJlciBieSB0aGUgdmFsdWUgb2YgQmlnTnVtYmVyKHksIGIpLlxyXG4gICAgICovXHJcbiAgICBQLmRpdmlkZWRUb0ludGVnZXJCeSA9IFAuaWRpdiA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHJldHVybiBkaXYodGhpcywgbmV3IEJpZ051bWJlcih5LCBiKSwgMCwgMSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBleHBvbmVudGlhdGVkIGJ5IG4uXHJcbiAgICAgKlxyXG4gICAgICogSWYgbSBpcyBwcmVzZW50LCByZXR1cm4gdGhlIHJlc3VsdCBtb2R1bG8gbS5cclxuICAgICAqIElmIG4gaXMgbmVnYXRpdmUgcm91bmQgYWNjb3JkaW5nIHRvIERFQ0lNQUxfUExBQ0VTIGFuZCBST1VORElOR19NT0RFLlxyXG4gICAgICogSWYgUE9XX1BSRUNJU0lPTiBpcyBub24temVybyBhbmQgbSBpcyBub3QgcHJlc2VudCwgcm91bmQgdG8gUE9XX1BSRUNJU0lPTiB1c2luZyBST1VORElOR19NT0RFLlxyXG4gICAgICpcclxuICAgICAqIFRoZSBtb2R1bGFyIHBvd2VyIG9wZXJhdGlvbiB3b3JrcyBlZmZpY2llbnRseSB3aGVuIHgsIG4sIGFuZCBtIGFyZSBpbnRlZ2Vycywgb3RoZXJ3aXNlIGl0XHJcbiAgICAgKiBpcyBlcXVpdmFsZW50IHRvIGNhbGN1bGF0aW5nIHguZXhwb25lbnRpYXRlZEJ5KG4pLm1vZHVsbyhtKSB3aXRoIGEgUE9XX1BSRUNJU0lPTiBvZiAwLlxyXG4gICAgICpcclxuICAgICAqIG4ge251bWJlcnxzdHJpbmd8QmlnTnVtYmVyfSBUaGUgZXhwb25lbnQuIEFuIGludGVnZXIuXHJcbiAgICAgKiBbbV0ge251bWJlcnxzdHJpbmd8QmlnTnVtYmVyfSBUaGUgbW9kdWx1cy5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gRXhwb25lbnQgbm90IGFuIGludGVnZXI6IHtufSdcclxuICAgICAqL1xyXG4gICAgUC5leHBvbmVudGlhdGVkQnkgPSBQLnBvdyA9IGZ1bmN0aW9uIChuLCBtKSB7XHJcbiAgICAgIHZhciBoYWxmLCBpc01vZEV4cCwgaSwgaywgbW9yZSwgbklzQmlnLCBuSXNOZWcsIG5Jc09kZCwgeSxcclxuICAgICAgICB4ID0gdGhpcztcclxuXHJcbiAgICAgIG4gPSBuZXcgQmlnTnVtYmVyKG4pO1xyXG5cclxuICAgICAgLy8gQWxsb3cgTmFOIGFuZCDCsUluZmluaXR5LCBidXQgbm90IG90aGVyIG5vbi1pbnRlZ2Vycy5cclxuICAgICAgaWYgKG4uYyAmJiAhbi5pc0ludGVnZXIoKSkge1xyXG4gICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyAnRXhwb25lbnQgbm90IGFuIGludGVnZXI6ICcgKyB2YWx1ZU9mKG4pKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG0gIT0gbnVsbCkgbSA9IG5ldyBCaWdOdW1iZXIobSk7XHJcblxyXG4gICAgICAvLyBFeHBvbmVudCBvZiBNQVhfU0FGRV9JTlRFR0VSIGlzIDE1LlxyXG4gICAgICBuSXNCaWcgPSBuLmUgPiAxNDtcclxuXHJcbiAgICAgIC8vIElmIHggaXMgTmFOLCDCsUluZmluaXR5LCDCsTAgb3IgwrExLCBvciBuIGlzIMKxSW5maW5pdHksIE5hTiBvciDCsTAuXHJcbiAgICAgIGlmICgheC5jIHx8ICF4LmNbMF0gfHwgeC5jWzBdID09IDEgJiYgIXguZSAmJiB4LmMubGVuZ3RoID09IDEgfHwgIW4uYyB8fCAhbi5jWzBdKSB7XHJcblxyXG4gICAgICAgIC8vIFRoZSBzaWduIG9mIHRoZSByZXN1bHQgb2YgcG93IHdoZW4geCBpcyBuZWdhdGl2ZSBkZXBlbmRzIG9uIHRoZSBldmVubmVzcyBvZiBuLlxyXG4gICAgICAgIC8vIElmICtuIG92ZXJmbG93cyB0byDCsUluZmluaXR5LCB0aGUgZXZlbm5lc3Mgb2YgbiB3b3VsZCBiZSBub3QgYmUga25vd24uXHJcbiAgICAgICAgeSA9IG5ldyBCaWdOdW1iZXIoTWF0aC5wb3coK3ZhbHVlT2YoeCksIG5Jc0JpZyA/IG4ucyAqICgyIC0gaXNPZGQobikpIDogK3ZhbHVlT2YobikpKTtcclxuICAgICAgICByZXR1cm4gbSA/IHkubW9kKG0pIDogeTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbklzTmVnID0gbi5zIDwgMDtcclxuXHJcbiAgICAgIGlmIChtKSB7XHJcblxyXG4gICAgICAgIC8vIHggJSBtIHJldHVybnMgTmFOIGlmIGFicyhtKSBpcyB6ZXJvLCBvciBtIGlzIE5hTi5cclxuICAgICAgICBpZiAobS5jID8gIW0uY1swXSA6ICFtLnMpIHJldHVybiBuZXcgQmlnTnVtYmVyKE5hTik7XHJcblxyXG4gICAgICAgIGlzTW9kRXhwID0gIW5Jc05lZyAmJiB4LmlzSW50ZWdlcigpICYmIG0uaXNJbnRlZ2VyKCk7XHJcblxyXG4gICAgICAgIGlmIChpc01vZEV4cCkgeCA9IHgubW9kKG0pO1xyXG5cclxuICAgICAgLy8gT3ZlcmZsb3cgdG8gwrFJbmZpbml0eTogPj0yKioxZTEwIG9yID49MS4wMDAwMDI0KioxZTE1LlxyXG4gICAgICAvLyBVbmRlcmZsb3cgdG8gwrEwOiA8PTAuNzkqKjFlMTAgb3IgPD0wLjk5OTk5NzUqKjFlMTUuXHJcbiAgICAgIH0gZWxzZSBpZiAobi5lID4gOSAmJiAoeC5lID4gMCB8fCB4LmUgPCAtMSB8fCAoeC5lID09IDBcclxuICAgICAgICAvLyBbMSwgMjQwMDAwMDAwXVxyXG4gICAgICAgID8geC5jWzBdID4gMSB8fCBuSXNCaWcgJiYgeC5jWzFdID49IDI0ZTdcclxuICAgICAgICAvLyBbODAwMDAwMDAwMDAwMDBdICBbOTk5OTk3NTAwMDAwMDBdXHJcbiAgICAgICAgOiB4LmNbMF0gPCA4ZTEzIHx8IG5Jc0JpZyAmJiB4LmNbMF0gPD0gOTk5OTk3NWU3KSkpIHtcclxuXHJcbiAgICAgICAgLy8gSWYgeCBpcyBuZWdhdGl2ZSBhbmQgbiBpcyBvZGQsIGsgPSAtMCwgZWxzZSBrID0gMC5cclxuICAgICAgICBrID0geC5zIDwgMCAmJiBpc09kZChuKSA/IC0wIDogMDtcclxuXHJcbiAgICAgICAgLy8gSWYgeCA+PSAxLCBrID0gwrFJbmZpbml0eS5cclxuICAgICAgICBpZiAoeC5lID4gLTEpIGsgPSAxIC8gaztcclxuXHJcbiAgICAgICAgLy8gSWYgbiBpcyBuZWdhdGl2ZSByZXR1cm4gwrEwLCBlbHNlIHJldHVybiDCsUluZmluaXR5LlxyXG4gICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKG5Jc05lZyA/IDEgLyBrIDogayk7XHJcblxyXG4gICAgICB9IGVsc2UgaWYgKFBPV19QUkVDSVNJT04pIHtcclxuXHJcbiAgICAgICAgLy8gVHJ1bmNhdGluZyBlYWNoIGNvZWZmaWNpZW50IGFycmF5IHRvIGEgbGVuZ3RoIG9mIGsgYWZ0ZXIgZWFjaCBtdWx0aXBsaWNhdGlvblxyXG4gICAgICAgIC8vIGVxdWF0ZXMgdG8gdHJ1bmNhdGluZyBzaWduaWZpY2FudCBkaWdpdHMgdG8gUE9XX1BSRUNJU0lPTiArIFsyOCwgNDFdLFxyXG4gICAgICAgIC8vIGkuZS4gdGhlcmUgd2lsbCBiZSBhIG1pbmltdW0gb2YgMjggZ3VhcmQgZGlnaXRzIHJldGFpbmVkLlxyXG4gICAgICAgIGsgPSBtYXRoY2VpbChQT1dfUFJFQ0lTSU9OIC8gTE9HX0JBU0UgKyAyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG5Jc0JpZykge1xyXG4gICAgICAgIGhhbGYgPSBuZXcgQmlnTnVtYmVyKDAuNSk7XHJcbiAgICAgICAgaWYgKG5Jc05lZykgbi5zID0gMTtcclxuICAgICAgICBuSXNPZGQgPSBpc09kZChuKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpID0gTWF0aC5hYnMoK3ZhbHVlT2YobikpO1xyXG4gICAgICAgIG5Jc09kZCA9IGkgJSAyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB5ID0gbmV3IEJpZ051bWJlcihPTkUpO1xyXG5cclxuICAgICAgLy8gUGVyZm9ybXMgNTQgbG9vcCBpdGVyYXRpb25zIGZvciBuIG9mIDkwMDcxOTkyNTQ3NDA5OTEuXHJcbiAgICAgIGZvciAoOyA7KSB7XHJcblxyXG4gICAgICAgIGlmIChuSXNPZGQpIHtcclxuICAgICAgICAgIHkgPSB5LnRpbWVzKHgpO1xyXG4gICAgICAgICAgaWYgKCF5LmMpIGJyZWFrO1xyXG5cclxuICAgICAgICAgIGlmIChrKSB7XHJcbiAgICAgICAgICAgIGlmICh5LmMubGVuZ3RoID4gaykgeS5jLmxlbmd0aCA9IGs7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzTW9kRXhwKSB7XHJcbiAgICAgICAgICAgIHkgPSB5Lm1vZChtKTsgICAgLy95ID0geS5taW51cyhkaXYoeSwgbSwgMCwgTU9EVUxPX01PREUpLnRpbWVzKG0pKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpKSB7XHJcbiAgICAgICAgICBpID0gbWF0aGZsb29yKGkgLyAyKTtcclxuICAgICAgICAgIGlmIChpID09PSAwKSBicmVhaztcclxuICAgICAgICAgIG5Jc09kZCA9IGkgJSAyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuID0gbi50aW1lcyhoYWxmKTtcclxuICAgICAgICAgIHJvdW5kKG4sIG4uZSArIDEsIDEpO1xyXG5cclxuICAgICAgICAgIGlmIChuLmUgPiAxNCkge1xyXG4gICAgICAgICAgICBuSXNPZGQgPSBpc09kZChuKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGkgPSArdmFsdWVPZihuKTtcclxuICAgICAgICAgICAgaWYgKGkgPT09IDApIGJyZWFrO1xyXG4gICAgICAgICAgICBuSXNPZGQgPSBpICUgMjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHggPSB4LnRpbWVzKHgpO1xyXG5cclxuICAgICAgICBpZiAoaykge1xyXG4gICAgICAgICAgaWYgKHguYyAmJiB4LmMubGVuZ3RoID4gaykgeC5jLmxlbmd0aCA9IGs7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc01vZEV4cCkge1xyXG4gICAgICAgICAgeCA9IHgubW9kKG0pOyAgICAvL3ggPSB4Lm1pbnVzKGRpdih4LCBtLCAwLCBNT0RVTE9fTU9ERSkudGltZXMobSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzTW9kRXhwKSByZXR1cm4geTtcclxuICAgICAgaWYgKG5Jc05lZykgeSA9IE9ORS5kaXYoeSk7XHJcblxyXG4gICAgICByZXR1cm4gbSA/IHkubW9kKG0pIDogayA/IHJvdW5kKHksIFBPV19QUkVDSVNJT04sIFJPVU5ESU5HX01PREUsIG1vcmUpIDogeTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciByb3VuZGVkIHRvIGFuIGludGVnZXJcclxuICAgICAqIHVzaW5nIHJvdW5kaW5nIG1vZGUgcm0sIG9yIFJPVU5ESU5HX01PREUgaWYgcm0gaXMgb21pdHRlZC5cclxuICAgICAqXHJcbiAgICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICAgKlxyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtybX0nXHJcbiAgICAgKi9cclxuICAgIFAuaW50ZWdlclZhbHVlID0gZnVuY3Rpb24gKHJtKSB7XHJcbiAgICAgIHZhciBuID0gbmV3IEJpZ051bWJlcih0aGlzKTtcclxuICAgICAgaWYgKHJtID09IG51bGwpIHJtID0gUk9VTkRJTkdfTU9ERTtcclxuICAgICAgZWxzZSBpbnRDaGVjayhybSwgMCwgOCk7XHJcbiAgICAgIHJldHVybiByb3VuZChuLCBuLmUgKyAxLCBybSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZiBCaWdOdW1iZXIoeSwgYiksXHJcbiAgICAgKiBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBQLmlzRXF1YWxUbyA9IFAuZXEgPSBmdW5jdGlvbiAoeSwgYikge1xyXG4gICAgICByZXR1cm4gY29tcGFyZSh0aGlzLCBuZXcgQmlnTnVtYmVyKHksIGIpKSA9PT0gMDtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgYSBmaW5pdGUgbnVtYmVyLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBQLmlzRmluaXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gISF0aGlzLmM7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIGdyZWF0ZXIgdGhhbiB0aGUgdmFsdWUgb2YgQmlnTnVtYmVyKHksIGIpLFxyXG4gICAgICogb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgUC5pc0dyZWF0ZXJUaGFuID0gUC5ndCA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHJldHVybiBjb21wYXJlKHRoaXMsIG5ldyBCaWdOdW1iZXIoeSwgYikpID4gMDtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZlxyXG4gICAgICogQmlnTnVtYmVyKHksIGIpLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBQLmlzR3JlYXRlclRoYW5PckVxdWFsVG8gPSBQLmd0ZSA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHJldHVybiAoYiA9IGNvbXBhcmUodGhpcywgbmV3IEJpZ051bWJlcih5LCBiKSkpID09PSAxIHx8IGIgPT09IDA7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBhbiBpbnRlZ2VyLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBQLmlzSW50ZWdlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuICEhdGhpcy5jICYmIGJpdEZsb29yKHRoaXMuZSAvIExPR19CQVNFKSA+IHRoaXMuYy5sZW5ndGggLSAyO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBsZXNzIHRoYW4gdGhlIHZhbHVlIG9mIEJpZ051bWJlcih5LCBiKSxcclxuICAgICAqIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNMZXNzVGhhbiA9IFAubHQgPSBmdW5jdGlvbiAoeSwgYikge1xyXG4gICAgICByZXR1cm4gY29tcGFyZSh0aGlzLCBuZXcgQmlnTnVtYmVyKHksIGIpKSA8IDA7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byB0aGUgdmFsdWUgb2ZcclxuICAgICAqIEJpZ051bWJlcih5LCBiKSwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgUC5pc0xlc3NUaGFuT3JFcXVhbFRvID0gUC5sdGUgPSBmdW5jdGlvbiAoeSwgYikge1xyXG4gICAgICByZXR1cm4gKGIgPSBjb21wYXJlKHRoaXMsIG5ldyBCaWdOdW1iZXIoeSwgYikpKSA9PT0gLTEgfHwgYiA9PT0gMDtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgTmFOLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBQLmlzTmFOID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gIXRoaXMucztcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgbmVnYXRpdmUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNOZWdhdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucyA8IDA7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIHBvc2l0aXZlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBQLmlzUG9zaXRpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnMgPiAwO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyAwIG9yIC0wLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBQLmlzWmVybyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuICEhdGhpcy5jICYmIHRoaXMuY1swXSA9PSAwO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqICBuIC0gMCA9IG5cclxuICAgICAqICBuIC0gTiA9IE5cclxuICAgICAqICBuIC0gSSA9IC1JXHJcbiAgICAgKiAgMCAtIG4gPSAtblxyXG4gICAgICogIDAgLSAwID0gMFxyXG4gICAgICogIDAgLSBOID0gTlxyXG4gICAgICogIDAgLSBJID0gLUlcclxuICAgICAqICBOIC0gbiA9IE5cclxuICAgICAqICBOIC0gMCA9IE5cclxuICAgICAqICBOIC0gTiA9IE5cclxuICAgICAqICBOIC0gSSA9IE5cclxuICAgICAqICBJIC0gbiA9IElcclxuICAgICAqICBJIC0gMCA9IElcclxuICAgICAqICBJIC0gTiA9IE5cclxuICAgICAqICBJIC0gSSA9IE5cclxuICAgICAqXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBtaW51cyB0aGUgdmFsdWUgb2ZcclxuICAgICAqIEJpZ051bWJlcih5LCBiKS5cclxuICAgICAqL1xyXG4gICAgUC5taW51cyA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHZhciBpLCBqLCB0LCB4TFR5LFxyXG4gICAgICAgIHggPSB0aGlzLFxyXG4gICAgICAgIGEgPSB4LnM7XHJcblxyXG4gICAgICB5ID0gbmV3IEJpZ051bWJlcih5LCBiKTtcclxuICAgICAgYiA9IHkucztcclxuXHJcbiAgICAgIC8vIEVpdGhlciBOYU4/XHJcbiAgICAgIGlmICghYSB8fCAhYikgcmV0dXJuIG5ldyBCaWdOdW1iZXIoTmFOKTtcclxuXHJcbiAgICAgIC8vIFNpZ25zIGRpZmZlcj9cclxuICAgICAgaWYgKGEgIT0gYikge1xyXG4gICAgICAgIHkucyA9IC1iO1xyXG4gICAgICAgIHJldHVybiB4LnBsdXMoeSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciB4ZSA9IHguZSAvIExPR19CQVNFLFxyXG4gICAgICAgIHllID0geS5lIC8gTE9HX0JBU0UsXHJcbiAgICAgICAgeGMgPSB4LmMsXHJcbiAgICAgICAgeWMgPSB5LmM7XHJcblxyXG4gICAgICBpZiAoIXhlIHx8ICF5ZSkge1xyXG5cclxuICAgICAgICAvLyBFaXRoZXIgSW5maW5pdHk/XHJcbiAgICAgICAgaWYgKCF4YyB8fCAheWMpIHJldHVybiB4YyA/ICh5LnMgPSAtYiwgeSkgOiBuZXcgQmlnTnVtYmVyKHljID8geCA6IE5hTik7XHJcblxyXG4gICAgICAgIC8vIEVpdGhlciB6ZXJvP1xyXG4gICAgICAgIGlmICgheGNbMF0gfHwgIXljWzBdKSB7XHJcblxyXG4gICAgICAgICAgLy8gUmV0dXJuIHkgaWYgeSBpcyBub24temVybywgeCBpZiB4IGlzIG5vbi16ZXJvLCBvciB6ZXJvIGlmIGJvdGggYXJlIHplcm8uXHJcbiAgICAgICAgICByZXR1cm4geWNbMF0gPyAoeS5zID0gLWIsIHkpIDogbmV3IEJpZ051bWJlcih4Y1swXSA/IHggOlxyXG5cclxuICAgICAgICAgICAvLyBJRUVFIDc1NCAoMjAwOCkgNi4zOiBuIC0gbiA9IC0wIHdoZW4gcm91bmRpbmcgdG8gLUluZmluaXR5XHJcbiAgICAgICAgICAgUk9VTkRJTkdfTU9ERSA9PSAzID8gLTAgOiAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHhlID0gYml0Rmxvb3IoeGUpO1xyXG4gICAgICB5ZSA9IGJpdEZsb29yKHllKTtcclxuICAgICAgeGMgPSB4Yy5zbGljZSgpO1xyXG5cclxuICAgICAgLy8gRGV0ZXJtaW5lIHdoaWNoIGlzIHRoZSBiaWdnZXIgbnVtYmVyLlxyXG4gICAgICBpZiAoYSA9IHhlIC0geWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHhMVHkgPSBhIDwgMCkge1xyXG4gICAgICAgICAgYSA9IC1hO1xyXG4gICAgICAgICAgdCA9IHhjO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB5ZSA9IHhlO1xyXG4gICAgICAgICAgdCA9IHljO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdC5yZXZlcnNlKCk7XHJcblxyXG4gICAgICAgIC8vIFByZXBlbmQgemVyb3MgdG8gZXF1YWxpc2UgZXhwb25lbnRzLlxyXG4gICAgICAgIGZvciAoYiA9IGE7IGItLTsgdC5wdXNoKDApKTtcclxuICAgICAgICB0LnJldmVyc2UoKTtcclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgLy8gRXhwb25lbnRzIGVxdWFsLiBDaGVjayBkaWdpdCBieSBkaWdpdC5cclxuICAgICAgICBqID0gKHhMVHkgPSAoYSA9IHhjLmxlbmd0aCkgPCAoYiA9IHljLmxlbmd0aCkpID8gYSA6IGI7XHJcblxyXG4gICAgICAgIGZvciAoYSA9IGIgPSAwOyBiIDwgajsgYisrKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHhjW2JdICE9IHljW2JdKSB7XHJcbiAgICAgICAgICAgIHhMVHkgPSB4Y1tiXSA8IHljW2JdO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHggPCB5PyBQb2ludCB4YyB0byB0aGUgYXJyYXkgb2YgdGhlIGJpZ2dlciBudW1iZXIuXHJcbiAgICAgIGlmICh4TFR5KSB7XHJcbiAgICAgICAgdCA9IHhjO1xyXG4gICAgICAgIHhjID0geWM7XHJcbiAgICAgICAgeWMgPSB0O1xyXG4gICAgICAgIHkucyA9IC15LnM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGIgPSAoaiA9IHljLmxlbmd0aCkgLSAoaSA9IHhjLmxlbmd0aCk7XHJcblxyXG4gICAgICAvLyBBcHBlbmQgemVyb3MgdG8geGMgaWYgc2hvcnRlci5cclxuICAgICAgLy8gTm8gbmVlZCB0byBhZGQgemVyb3MgdG8geWMgaWYgc2hvcnRlciBhcyBzdWJ0cmFjdCBvbmx5IG5lZWRzIHRvIHN0YXJ0IGF0IHljLmxlbmd0aC5cclxuICAgICAgaWYgKGIgPiAwKSBmb3IgKDsgYi0tOyB4Y1tpKytdID0gMCk7XHJcbiAgICAgIGIgPSBCQVNFIC0gMTtcclxuXHJcbiAgICAgIC8vIFN1YnRyYWN0IHljIGZyb20geGMuXHJcbiAgICAgIGZvciAoOyBqID4gYTspIHtcclxuXHJcbiAgICAgICAgaWYgKHhjWy0tal0gPCB5Y1tqXSkge1xyXG4gICAgICAgICAgZm9yIChpID0gajsgaSAmJiAheGNbLS1pXTsgeGNbaV0gPSBiKTtcclxuICAgICAgICAgIC0teGNbaV07XHJcbiAgICAgICAgICB4Y1tqXSArPSBCQVNFO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgeGNbal0gLT0geWNbal07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJlbW92ZSBsZWFkaW5nIHplcm9zIGFuZCBhZGp1c3QgZXhwb25lbnQgYWNjb3JkaW5nbHkuXHJcbiAgICAgIGZvciAoOyB4Y1swXSA9PSAwOyB4Yy5zcGxpY2UoMCwgMSksIC0teWUpO1xyXG5cclxuICAgICAgLy8gWmVybz9cclxuICAgICAgaWYgKCF4Y1swXSkge1xyXG5cclxuICAgICAgICAvLyBGb2xsb3dpbmcgSUVFRSA3NTQgKDIwMDgpIDYuMyxcclxuICAgICAgICAvLyBuIC0gbiA9ICswICBidXQgIG4gLSBuID0gLTAgIHdoZW4gcm91bmRpbmcgdG93YXJkcyAtSW5maW5pdHkuXHJcbiAgICAgICAgeS5zID0gUk9VTkRJTkdfTU9ERSA9PSAzID8gLTEgOiAxO1xyXG4gICAgICAgIHkuYyA9IFt5LmUgPSAwXTtcclxuICAgICAgICByZXR1cm4geTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTm8gbmVlZCB0byBjaGVjayBmb3IgSW5maW5pdHkgYXMgK3ggLSAreSAhPSBJbmZpbml0eSAmJiAteCAtIC15ICE9IEluZmluaXR5XHJcbiAgICAgIC8vIGZvciBmaW5pdGUgeCBhbmQgeS5cclxuICAgICAgcmV0dXJuIG5vcm1hbGlzZSh5LCB4YywgeWUpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqICAgbiAlIDAgPSAgTlxyXG4gICAgICogICBuICUgTiA9ICBOXHJcbiAgICAgKiAgIG4gJSBJID0gIG5cclxuICAgICAqICAgMCAlIG4gPSAgMFxyXG4gICAgICogIC0wICUgbiA9IC0wXHJcbiAgICAgKiAgIDAgJSAwID0gIE5cclxuICAgICAqICAgMCAlIE4gPSAgTlxyXG4gICAgICogICAwICUgSSA9ICAwXHJcbiAgICAgKiAgIE4gJSBuID0gIE5cclxuICAgICAqICAgTiAlIDAgPSAgTlxyXG4gICAgICogICBOICUgTiA9ICBOXHJcbiAgICAgKiAgIE4gJSBJID0gIE5cclxuICAgICAqICAgSSAlIG4gPSAgTlxyXG4gICAgICogICBJICUgMCA9ICBOXHJcbiAgICAgKiAgIEkgJSBOID0gIE5cclxuICAgICAqICAgSSAlIEkgPSAgTlxyXG4gICAgICpcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIG1vZHVsbyB0aGUgdmFsdWUgb2ZcclxuICAgICAqIEJpZ051bWJlcih5LCBiKS4gVGhlIHJlc3VsdCBkZXBlbmRzIG9uIHRoZSB2YWx1ZSBvZiBNT0RVTE9fTU9ERS5cclxuICAgICAqL1xyXG4gICAgUC5tb2R1bG8gPSBQLm1vZCA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHZhciBxLCBzLFxyXG4gICAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgICAgeSA9IG5ldyBCaWdOdW1iZXIoeSwgYik7XHJcblxyXG4gICAgICAvLyBSZXR1cm4gTmFOIGlmIHggaXMgSW5maW5pdHkgb3IgTmFOLCBvciB5IGlzIE5hTiBvciB6ZXJvLlxyXG4gICAgICBpZiAoIXguYyB8fCAheS5zIHx8IHkuYyAmJiAheS5jWzBdKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBCaWdOdW1iZXIoTmFOKTtcclxuXHJcbiAgICAgIC8vIFJldHVybiB4IGlmIHkgaXMgSW5maW5pdHkgb3IgeCBpcyB6ZXJvLlxyXG4gICAgICB9IGVsc2UgaWYgKCF5LmMgfHwgeC5jICYmICF4LmNbMF0pIHtcclxuICAgICAgICByZXR1cm4gbmV3IEJpZ051bWJlcih4KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKE1PRFVMT19NT0RFID09IDkpIHtcclxuXHJcbiAgICAgICAgLy8gRXVjbGlkaWFuIGRpdmlzaW9uOiBxID0gc2lnbih5KSAqIGZsb29yKHggLyBhYnMoeSkpXHJcbiAgICAgICAgLy8gciA9IHggLSBxeSAgICB3aGVyZSAgMCA8PSByIDwgYWJzKHkpXHJcbiAgICAgICAgcyA9IHkucztcclxuICAgICAgICB5LnMgPSAxO1xyXG4gICAgICAgIHEgPSBkaXYoeCwgeSwgMCwgMyk7XHJcbiAgICAgICAgeS5zID0gcztcclxuICAgICAgICBxLnMgKj0gcztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBxID0gZGl2KHgsIHksIDAsIE1PRFVMT19NT0RFKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgeSA9IHgubWludXMocS50aW1lcyh5KSk7XHJcblxyXG4gICAgICAvLyBUbyBtYXRjaCBKYXZhU2NyaXB0ICUsIGVuc3VyZSBzaWduIG9mIHplcm8gaXMgc2lnbiBvZiBkaXZpZGVuZC5cclxuICAgICAgaWYgKCF5LmNbMF0gJiYgTU9EVUxPX01PREUgPT0gMSkgeS5zID0geC5zO1xyXG5cclxuICAgICAgcmV0dXJuIHk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogIG4gKiAwID0gMFxyXG4gICAgICogIG4gKiBOID0gTlxyXG4gICAgICogIG4gKiBJID0gSVxyXG4gICAgICogIDAgKiBuID0gMFxyXG4gICAgICogIDAgKiAwID0gMFxyXG4gICAgICogIDAgKiBOID0gTlxyXG4gICAgICogIDAgKiBJID0gTlxyXG4gICAgICogIE4gKiBuID0gTlxyXG4gICAgICogIE4gKiAwID0gTlxyXG4gICAgICogIE4gKiBOID0gTlxyXG4gICAgICogIE4gKiBJID0gTlxyXG4gICAgICogIEkgKiBuID0gSVxyXG4gICAgICogIEkgKiAwID0gTlxyXG4gICAgICogIEkgKiBOID0gTlxyXG4gICAgICogIEkgKiBJID0gSVxyXG4gICAgICpcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIG11bHRpcGxpZWQgYnkgdGhlIHZhbHVlXHJcbiAgICAgKiBvZiBCaWdOdW1iZXIoeSwgYikuXHJcbiAgICAgKi9cclxuICAgIFAubXVsdGlwbGllZEJ5ID0gUC50aW1lcyA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHZhciBjLCBlLCBpLCBqLCBrLCBtLCB4Y0wsIHhsbywgeGhpLCB5Y0wsIHlsbywgeWhpLCB6YyxcclxuICAgICAgICBiYXNlLCBzcXJ0QmFzZSxcclxuICAgICAgICB4ID0gdGhpcyxcclxuICAgICAgICB4YyA9IHguYyxcclxuICAgICAgICB5YyA9ICh5ID0gbmV3IEJpZ051bWJlcih5LCBiKSkuYztcclxuXHJcbiAgICAgIC8vIEVpdGhlciBOYU4sIMKxSW5maW5pdHkgb3IgwrEwP1xyXG4gICAgICBpZiAoIXhjIHx8ICF5YyB8fCAheGNbMF0gfHwgIXljWzBdKSB7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiBOYU4gaWYgZWl0aGVyIGlzIE5hTiwgb3Igb25lIGlzIDAgYW5kIHRoZSBvdGhlciBpcyBJbmZpbml0eS5cclxuICAgICAgICBpZiAoIXgucyB8fCAheS5zIHx8IHhjICYmICF4Y1swXSAmJiAheWMgfHwgeWMgJiYgIXljWzBdICYmICF4Yykge1xyXG4gICAgICAgICAgeS5jID0geS5lID0geS5zID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgeS5zICo9IHgucztcclxuXHJcbiAgICAgICAgICAvLyBSZXR1cm4gwrFJbmZpbml0eSBpZiBlaXRoZXIgaXMgwrFJbmZpbml0eS5cclxuICAgICAgICAgIGlmICgheGMgfHwgIXljKSB7XHJcbiAgICAgICAgICAgIHkuYyA9IHkuZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgLy8gUmV0dXJuIMKxMCBpZiBlaXRoZXIgaXMgwrEwLlxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgeS5jID0gWzBdO1xyXG4gICAgICAgICAgICB5LmUgPSAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGUgPSBiaXRGbG9vcih4LmUgLyBMT0dfQkFTRSkgKyBiaXRGbG9vcih5LmUgLyBMT0dfQkFTRSk7XHJcbiAgICAgIHkucyAqPSB4LnM7XHJcbiAgICAgIHhjTCA9IHhjLmxlbmd0aDtcclxuICAgICAgeWNMID0geWMubGVuZ3RoO1xyXG5cclxuICAgICAgLy8gRW5zdXJlIHhjIHBvaW50cyB0byBsb25nZXIgYXJyYXkgYW5kIHhjTCB0byBpdHMgbGVuZ3RoLlxyXG4gICAgICBpZiAoeGNMIDwgeWNMKSB7XHJcbiAgICAgICAgemMgPSB4YztcclxuICAgICAgICB4YyA9IHljO1xyXG4gICAgICAgIHljID0gemM7XHJcbiAgICAgICAgaSA9IHhjTDtcclxuICAgICAgICB4Y0wgPSB5Y0w7XHJcbiAgICAgICAgeWNMID0gaTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gSW5pdGlhbGlzZSB0aGUgcmVzdWx0IGFycmF5IHdpdGggemVyb3MuXHJcbiAgICAgIGZvciAoaSA9IHhjTCArIHljTCwgemMgPSBbXTsgaS0tOyB6Yy5wdXNoKDApKTtcclxuXHJcbiAgICAgIGJhc2UgPSBCQVNFO1xyXG4gICAgICBzcXJ0QmFzZSA9IFNRUlRfQkFTRTtcclxuXHJcbiAgICAgIGZvciAoaSA9IHljTDsgLS1pID49IDA7KSB7XHJcbiAgICAgICAgYyA9IDA7XHJcbiAgICAgICAgeWxvID0geWNbaV0gJSBzcXJ0QmFzZTtcclxuICAgICAgICB5aGkgPSB5Y1tpXSAvIHNxcnRCYXNlIHwgMDtcclxuXHJcbiAgICAgICAgZm9yIChrID0geGNMLCBqID0gaSArIGs7IGogPiBpOykge1xyXG4gICAgICAgICAgeGxvID0geGNbLS1rXSAlIHNxcnRCYXNlO1xyXG4gICAgICAgICAgeGhpID0geGNba10gLyBzcXJ0QmFzZSB8IDA7XHJcbiAgICAgICAgICBtID0geWhpICogeGxvICsgeGhpICogeWxvO1xyXG4gICAgICAgICAgeGxvID0geWxvICogeGxvICsgKChtICUgc3FydEJhc2UpICogc3FydEJhc2UpICsgemNbal0gKyBjO1xyXG4gICAgICAgICAgYyA9ICh4bG8gLyBiYXNlIHwgMCkgKyAobSAvIHNxcnRCYXNlIHwgMCkgKyB5aGkgKiB4aGk7XHJcbiAgICAgICAgICB6Y1tqLS1dID0geGxvICUgYmFzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHpjW2pdID0gYztcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGMpIHtcclxuICAgICAgICArK2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgemMuc3BsaWNlKDAsIDEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbm9ybWFsaXNlKHksIHpjLCBlKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBuZWdhdGVkLFxyXG4gICAgICogaS5lLiBtdWx0aXBsaWVkIGJ5IC0xLlxyXG4gICAgICovXHJcbiAgICBQLm5lZ2F0ZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciB4ID0gbmV3IEJpZ051bWJlcih0aGlzKTtcclxuICAgICAgeC5zID0gLXgucyB8fCBudWxsO1xyXG4gICAgICByZXR1cm4geDtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiAgbiArIDAgPSBuXHJcbiAgICAgKiAgbiArIE4gPSBOXHJcbiAgICAgKiAgbiArIEkgPSBJXHJcbiAgICAgKiAgMCArIG4gPSBuXHJcbiAgICAgKiAgMCArIDAgPSAwXHJcbiAgICAgKiAgMCArIE4gPSBOXHJcbiAgICAgKiAgMCArIEkgPSBJXHJcbiAgICAgKiAgTiArIG4gPSBOXHJcbiAgICAgKiAgTiArIDAgPSBOXHJcbiAgICAgKiAgTiArIE4gPSBOXHJcbiAgICAgKiAgTiArIEkgPSBOXHJcbiAgICAgKiAgSSArIG4gPSBJXHJcbiAgICAgKiAgSSArIDAgPSBJXHJcbiAgICAgKiAgSSArIE4gPSBOXHJcbiAgICAgKiAgSSArIEkgPSBJXHJcbiAgICAgKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgcGx1cyB0aGUgdmFsdWUgb2ZcclxuICAgICAqIEJpZ051bWJlcih5LCBiKS5cclxuICAgICAqL1xyXG4gICAgUC5wbHVzID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgdmFyIHQsXHJcbiAgICAgICAgeCA9IHRoaXMsXHJcbiAgICAgICAgYSA9IHgucztcclxuXHJcbiAgICAgIHkgPSBuZXcgQmlnTnVtYmVyKHksIGIpO1xyXG4gICAgICBiID0geS5zO1xyXG5cclxuICAgICAgLy8gRWl0aGVyIE5hTj9cclxuICAgICAgaWYgKCFhIHx8ICFiKSByZXR1cm4gbmV3IEJpZ051bWJlcihOYU4pO1xyXG5cclxuICAgICAgLy8gU2lnbnMgZGlmZmVyP1xyXG4gICAgICAgaWYgKGEgIT0gYikge1xyXG4gICAgICAgIHkucyA9IC1iO1xyXG4gICAgICAgIHJldHVybiB4Lm1pbnVzKHkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgeGUgPSB4LmUgLyBMT0dfQkFTRSxcclxuICAgICAgICB5ZSA9IHkuZSAvIExPR19CQVNFLFxyXG4gICAgICAgIHhjID0geC5jLFxyXG4gICAgICAgIHljID0geS5jO1xyXG5cclxuICAgICAgaWYgKCF4ZSB8fCAheWUpIHtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIMKxSW5maW5pdHkgaWYgZWl0aGVyIMKxSW5maW5pdHkuXHJcbiAgICAgICAgaWYgKCF4YyB8fCAheWMpIHJldHVybiBuZXcgQmlnTnVtYmVyKGEgLyAwKTtcclxuXHJcbiAgICAgICAgLy8gRWl0aGVyIHplcm8/XHJcbiAgICAgICAgLy8gUmV0dXJuIHkgaWYgeSBpcyBub24temVybywgeCBpZiB4IGlzIG5vbi16ZXJvLCBvciB6ZXJvIGlmIGJvdGggYXJlIHplcm8uXHJcbiAgICAgICAgaWYgKCF4Y1swXSB8fCAheWNbMF0pIHJldHVybiB5Y1swXSA/IHkgOiBuZXcgQmlnTnVtYmVyKHhjWzBdID8geCA6IGEgKiAwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgeGUgPSBiaXRGbG9vcih4ZSk7XHJcbiAgICAgIHllID0gYml0Rmxvb3IoeWUpO1xyXG4gICAgICB4YyA9IHhjLnNsaWNlKCk7XHJcblxyXG4gICAgICAvLyBQcmVwZW5kIHplcm9zIHRvIGVxdWFsaXNlIGV4cG9uZW50cy4gRmFzdGVyIHRvIHVzZSByZXZlcnNlIHRoZW4gZG8gdW5zaGlmdHMuXHJcbiAgICAgIGlmIChhID0geGUgLSB5ZSkge1xyXG4gICAgICAgIGlmIChhID4gMCkge1xyXG4gICAgICAgICAgeWUgPSB4ZTtcclxuICAgICAgICAgIHQgPSB5YztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYSA9IC1hO1xyXG4gICAgICAgICAgdCA9IHhjO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdC5yZXZlcnNlKCk7XHJcbiAgICAgICAgZm9yICg7IGEtLTsgdC5wdXNoKDApKTtcclxuICAgICAgICB0LnJldmVyc2UoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYSA9IHhjLmxlbmd0aDtcclxuICAgICAgYiA9IHljLmxlbmd0aDtcclxuXHJcbiAgICAgIC8vIFBvaW50IHhjIHRvIHRoZSBsb25nZXIgYXJyYXksIGFuZCBiIHRvIHRoZSBzaG9ydGVyIGxlbmd0aC5cclxuICAgICAgaWYgKGEgLSBiIDwgMCkge1xyXG4gICAgICAgIHQgPSB5YztcclxuICAgICAgICB5YyA9IHhjO1xyXG4gICAgICAgIHhjID0gdDtcclxuICAgICAgICBiID0gYTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gT25seSBzdGFydCBhZGRpbmcgYXQgeWMubGVuZ3RoIC0gMSBhcyB0aGUgZnVydGhlciBkaWdpdHMgb2YgeGMgY2FuIGJlIGlnbm9yZWQuXHJcbiAgICAgIGZvciAoYSA9IDA7IGI7KSB7XHJcbiAgICAgICAgYSA9ICh4Y1stLWJdID0geGNbYl0gKyB5Y1tiXSArIGEpIC8gQkFTRSB8IDA7XHJcbiAgICAgICAgeGNbYl0gPSBCQVNFID09PSB4Y1tiXSA/IDAgOiB4Y1tiXSAlIEJBU0U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChhKSB7XHJcbiAgICAgICAgeGMgPSBbYV0uY29uY2F0KHhjKTtcclxuICAgICAgICArK3llO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBObyBuZWVkIHRvIGNoZWNrIGZvciB6ZXJvLCBhcyAreCArICt5ICE9IDAgJiYgLXggKyAteSAhPSAwXHJcbiAgICAgIC8vIHllID0gTUFYX0VYUCArIDEgcG9zc2libGVcclxuICAgICAgcmV0dXJuIG5vcm1hbGlzZSh5LCB4YywgeWUpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIElmIHNkIGlzIHVuZGVmaW5lZCBvciBudWxsIG9yIHRydWUgb3IgZmFsc2UsIHJldHVybiB0aGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0cyBvZlxyXG4gICAgICogdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyLCBvciBudWxsIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyDCsUluZmluaXR5IG9yIE5hTi5cclxuICAgICAqIElmIHNkIGlzIHRydWUgaW5jbHVkZSBpbnRlZ2VyLXBhcnQgdHJhaWxpbmcgemVyb3MgaW4gdGhlIGNvdW50LlxyXG4gICAgICpcclxuICAgICAqIE90aGVyd2lzZSwgaWYgc2QgaXMgYSBudW1iZXIsIHJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXNcclxuICAgICAqIEJpZ051bWJlciByb3VuZGVkIHRvIGEgbWF4aW11bSBvZiBzZCBzaWduaWZpY2FudCBkaWdpdHMgdXNpbmcgcm91bmRpbmcgbW9kZSBybSwgb3JcclxuICAgICAqIFJPVU5ESU5HX01PREUgaWYgcm0gaXMgb21pdHRlZC5cclxuICAgICAqXHJcbiAgICAgKiBzZCB7bnVtYmVyfGJvb2xlYW59IG51bWJlcjogc2lnbmlmaWNhbnQgZGlnaXRzOiBpbnRlZ2VyLCAxIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgIGJvb2xlYW46IHdoZXRoZXIgdG8gY291bnQgaW50ZWdlci1wYXJ0IHRyYWlsaW5nIHplcm9zOiB0cnVlIG9yIGZhbHNlLlxyXG4gICAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBBcmd1bWVudCB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7c2R8cm19J1xyXG4gICAgICovXHJcbiAgICBQLnByZWNpc2lvbiA9IFAuc2QgPSBmdW5jdGlvbiAoc2QsIHJtKSB7XHJcbiAgICAgIHZhciBjLCBuLCB2LFxyXG4gICAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgICAgaWYgKHNkICE9IG51bGwgJiYgc2QgIT09ICEhc2QpIHtcclxuICAgICAgICBpbnRDaGVjayhzZCwgMSwgTUFYKTtcclxuICAgICAgICBpZiAocm0gPT0gbnVsbCkgcm0gPSBST1VORElOR19NT0RFO1xyXG4gICAgICAgIGVsc2UgaW50Q2hlY2socm0sIDAsIDgpO1xyXG5cclxuICAgICAgICByZXR1cm4gcm91bmQobmV3IEJpZ051bWJlcih4KSwgc2QsIHJtKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCEoYyA9IHguYykpIHJldHVybiBudWxsO1xyXG4gICAgICB2ID0gYy5sZW5ndGggLSAxO1xyXG4gICAgICBuID0gdiAqIExPR19CQVNFICsgMTtcclxuXHJcbiAgICAgIGlmICh2ID0gY1t2XSkge1xyXG5cclxuICAgICAgICAvLyBTdWJ0cmFjdCB0aGUgbnVtYmVyIG9mIHRyYWlsaW5nIHplcm9zIG9mIHRoZSBsYXN0IGVsZW1lbnQuXHJcbiAgICAgICAgZm9yICg7IHYgJSAxMCA9PSAwOyB2IC89IDEwLCBuLS0pO1xyXG5cclxuICAgICAgICAvLyBBZGQgdGhlIG51bWJlciBvZiBkaWdpdHMgb2YgdGhlIGZpcnN0IGVsZW1lbnQuXHJcbiAgICAgICAgZm9yICh2ID0gY1swXTsgdiA+PSAxMDsgdiAvPSAxMCwgbisrKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNkICYmIHguZSArIDEgPiBuKSBuID0geC5lICsgMTtcclxuXHJcbiAgICAgIHJldHVybiBuO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIHNoaWZ0ZWQgYnkgayBwbGFjZXNcclxuICAgICAqIChwb3dlcnMgb2YgMTApLiBTaGlmdCB0byB0aGUgcmlnaHQgaWYgbiA+IDAsIGFuZCB0byB0aGUgbGVmdCBpZiBuIDwgMC5cclxuICAgICAqXHJcbiAgICAgKiBrIHtudW1iZXJ9IEludGVnZXIsIC1NQVhfU0FGRV9JTlRFR0VSIHRvIE1BWF9TQUZFX0lOVEVHRVIgaW5jbHVzaXZlLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBBcmd1bWVudCB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7a30nXHJcbiAgICAgKi9cclxuICAgIFAuc2hpZnRlZEJ5ID0gZnVuY3Rpb24gKGspIHtcclxuICAgICAgaW50Q2hlY2soaywgLU1BWF9TQUZFX0lOVEVHRVIsIE1BWF9TQUZFX0lOVEVHRVIpO1xyXG4gICAgICByZXR1cm4gdGhpcy50aW1lcygnMWUnICsgayk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogIHNxcnQoLW4pID0gIE5cclxuICAgICAqICBzcXJ0KE4pID0gIE5cclxuICAgICAqICBzcXJ0KC1JKSA9ICBOXHJcbiAgICAgKiAgc3FydChJKSA9ICBJXHJcbiAgICAgKiAgc3FydCgwKSA9ICAwXHJcbiAgICAgKiAgc3FydCgtMCkgPSAtMFxyXG4gICAgICpcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHNxdWFyZSByb290IG9mIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlcixcclxuICAgICAqIHJvdW5kZWQgYWNjb3JkaW5nIHRvIERFQ0lNQUxfUExBQ0VTIGFuZCBST1VORElOR19NT0RFLlxyXG4gICAgICovXHJcbiAgICBQLnNxdWFyZVJvb3QgPSBQLnNxcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBtLCBuLCByLCByZXAsIHQsXHJcbiAgICAgICAgeCA9IHRoaXMsXHJcbiAgICAgICAgYyA9IHguYyxcclxuICAgICAgICBzID0geC5zLFxyXG4gICAgICAgIGUgPSB4LmUsXHJcbiAgICAgICAgZHAgPSBERUNJTUFMX1BMQUNFUyArIDQsXHJcbiAgICAgICAgaGFsZiA9IG5ldyBCaWdOdW1iZXIoJzAuNScpO1xyXG5cclxuICAgICAgLy8gTmVnYXRpdmUvTmFOL0luZmluaXR5L3plcm8/XHJcbiAgICAgIGlmIChzICE9PSAxIHx8ICFjIHx8ICFjWzBdKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBCaWdOdW1iZXIoIXMgfHwgcyA8IDAgJiYgKCFjIHx8IGNbMF0pID8gTmFOIDogYyA/IHggOiAxIC8gMCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEluaXRpYWwgZXN0aW1hdGUuXHJcbiAgICAgIHMgPSBNYXRoLnNxcnQoK3ZhbHVlT2YoeCkpO1xyXG5cclxuICAgICAgLy8gTWF0aC5zcXJ0IHVuZGVyZmxvdy9vdmVyZmxvdz9cclxuICAgICAgLy8gUGFzcyB4IHRvIE1hdGguc3FydCBhcyBpbnRlZ2VyLCB0aGVuIGFkanVzdCB0aGUgZXhwb25lbnQgb2YgdGhlIHJlc3VsdC5cclxuICAgICAgaWYgKHMgPT0gMCB8fCBzID09IDEgLyAwKSB7XHJcbiAgICAgICAgbiA9IGNvZWZmVG9TdHJpbmcoYyk7XHJcbiAgICAgICAgaWYgKChuLmxlbmd0aCArIGUpICUgMiA9PSAwKSBuICs9ICcwJztcclxuICAgICAgICBzID0gTWF0aC5zcXJ0KCtuKTtcclxuICAgICAgICBlID0gYml0Rmxvb3IoKGUgKyAxKSAvIDIpIC0gKGUgPCAwIHx8IGUgJSAyKTtcclxuXHJcbiAgICAgICAgaWYgKHMgPT0gMSAvIDApIHtcclxuICAgICAgICAgIG4gPSAnNWUnICsgZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbiA9IHMudG9FeHBvbmVudGlhbCgpO1xyXG4gICAgICAgICAgbiA9IG4uc2xpY2UoMCwgbi5pbmRleE9mKCdlJykgKyAxKSArIGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByID0gbmV3IEJpZ051bWJlcihuKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByID0gbmV3IEJpZ051bWJlcihzICsgJycpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDaGVjayBmb3IgemVyby5cclxuICAgICAgLy8gciBjb3VsZCBiZSB6ZXJvIGlmIE1JTl9FWFAgaXMgY2hhbmdlZCBhZnRlciB0aGUgdGhpcyB2YWx1ZSB3YXMgY3JlYXRlZC5cclxuICAgICAgLy8gVGhpcyB3b3VsZCBjYXVzZSBhIGRpdmlzaW9uIGJ5IHplcm8gKHgvdCkgYW5kIGhlbmNlIEluZmluaXR5IGJlbG93LCB3aGljaCB3b3VsZCBjYXVzZVxyXG4gICAgICAvLyBjb2VmZlRvU3RyaW5nIHRvIHRocm93LlxyXG4gICAgICBpZiAoci5jWzBdKSB7XHJcbiAgICAgICAgZSA9IHIuZTtcclxuICAgICAgICBzID0gZSArIGRwO1xyXG4gICAgICAgIGlmIChzIDwgMykgcyA9IDA7XHJcblxyXG4gICAgICAgIC8vIE5ld3Rvbi1SYXBoc29uIGl0ZXJhdGlvbi5cclxuICAgICAgICBmb3IgKDsgOykge1xyXG4gICAgICAgICAgdCA9IHI7XHJcbiAgICAgICAgICByID0gaGFsZi50aW1lcyh0LnBsdXMoZGl2KHgsIHQsIGRwLCAxKSkpO1xyXG5cclxuICAgICAgICAgIGlmIChjb2VmZlRvU3RyaW5nKHQuYykuc2xpY2UoMCwgcykgPT09IChuID0gY29lZmZUb1N0cmluZyhyLmMpKS5zbGljZSgwLCBzKSkge1xyXG5cclxuICAgICAgICAgICAgLy8gVGhlIGV4cG9uZW50IG9mIHIgbWF5IGhlcmUgYmUgb25lIGxlc3MgdGhhbiB0aGUgZmluYWwgcmVzdWx0IGV4cG9uZW50LFxyXG4gICAgICAgICAgICAvLyBlLmcgMC4wMDA5OTk5IChlLTQpIC0tPiAwLjAwMSAoZS0zKSwgc28gYWRqdXN0IHMgc28gdGhlIHJvdW5kaW5nIGRpZ2l0c1xyXG4gICAgICAgICAgICAvLyBhcmUgaW5kZXhlZCBjb3JyZWN0bHkuXHJcbiAgICAgICAgICAgIGlmIChyLmUgPCBlKSAtLXM7XHJcbiAgICAgICAgICAgIG4gPSBuLnNsaWNlKHMgLSAzLCBzICsgMSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUaGUgNHRoIHJvdW5kaW5nIGRpZ2l0IG1heSBiZSBpbiBlcnJvciBieSAtMSBzbyBpZiB0aGUgNCByb3VuZGluZyBkaWdpdHNcclxuICAgICAgICAgICAgLy8gYXJlIDk5OTkgb3IgNDk5OSAoaS5lLiBhcHByb2FjaGluZyBhIHJvdW5kaW5nIGJvdW5kYXJ5KSBjb250aW51ZSB0aGVcclxuICAgICAgICAgICAgLy8gaXRlcmF0aW9uLlxyXG4gICAgICAgICAgICBpZiAobiA9PSAnOTk5OScgfHwgIXJlcCAmJiBuID09ICc0OTk5Jykge1xyXG5cclxuICAgICAgICAgICAgICAvLyBPbiB0aGUgZmlyc3QgaXRlcmF0aW9uIG9ubHksIGNoZWNrIHRvIHNlZSBpZiByb3VuZGluZyB1cCBnaXZlcyB0aGVcclxuICAgICAgICAgICAgICAvLyBleGFjdCByZXN1bHQgYXMgdGhlIG5pbmVzIG1heSBpbmZpbml0ZWx5IHJlcGVhdC5cclxuICAgICAgICAgICAgICBpZiAoIXJlcCkge1xyXG4gICAgICAgICAgICAgICAgcm91bmQodCwgdC5lICsgREVDSU1BTF9QTEFDRVMgKyAyLCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodC50aW1lcyh0KS5lcSh4KSkge1xyXG4gICAgICAgICAgICAgICAgICByID0gdDtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBkcCArPSA0O1xyXG4gICAgICAgICAgICAgIHMgKz0gNDtcclxuICAgICAgICAgICAgICByZXAgPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAvLyBJZiByb3VuZGluZyBkaWdpdHMgYXJlIG51bGwsIDB7MCw0fSBvciA1MHswLDN9LCBjaGVjayBmb3IgZXhhY3RcclxuICAgICAgICAgICAgICAvLyByZXN1bHQuIElmIG5vdCwgdGhlbiB0aGVyZSBhcmUgZnVydGhlciBkaWdpdHMgYW5kIG0gd2lsbCBiZSB0cnV0aHkuXHJcbiAgICAgICAgICAgICAgaWYgKCErbiB8fCAhK24uc2xpY2UoMSkgJiYgbi5jaGFyQXQoMCkgPT0gJzUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVHJ1bmNhdGUgdG8gdGhlIGZpcnN0IHJvdW5kaW5nIGRpZ2l0LlxyXG4gICAgICAgICAgICAgICAgcm91bmQociwgci5lICsgREVDSU1BTF9QTEFDRVMgKyAyLCAxKTtcclxuICAgICAgICAgICAgICAgIG0gPSAhci50aW1lcyhyKS5lcSh4KTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcm91bmQociwgci5lICsgREVDSU1BTF9QTEFDRVMgKyAxLCBST1VORElOR19NT0RFLCBtKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpbiBleHBvbmVudGlhbCBub3RhdGlvbiBhbmRcclxuICAgICAqIHJvdW5kZWQgdXNpbmcgUk9VTkRJTkdfTU9ERSB0byBkcCBmaXhlZCBkZWNpbWFsIHBsYWNlcy5cclxuICAgICAqXHJcbiAgICAgKiBbZHBdIHtudW1iZXJ9IERlY2ltYWwgcGxhY2VzLiBJbnRlZ2VyLCAwIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICAgKlxyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtkcHxybX0nXHJcbiAgICAgKi9cclxuICAgIFAudG9FeHBvbmVudGlhbCA9IGZ1bmN0aW9uIChkcCwgcm0pIHtcclxuICAgICAgaWYgKGRwICE9IG51bGwpIHtcclxuICAgICAgICBpbnRDaGVjayhkcCwgMCwgTUFYKTtcclxuICAgICAgICBkcCsrO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmb3JtYXQodGhpcywgZHAsIHJtLCAxKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpbiBmaXhlZC1wb2ludCBub3RhdGlvbiByb3VuZGluZ1xyXG4gICAgICogdG8gZHAgZml4ZWQgZGVjaW1hbCBwbGFjZXMgdXNpbmcgcm91bmRpbmcgbW9kZSBybSwgb3IgUk9VTkRJTkdfTU9ERSBpZiBybSBpcyBvbWl0dGVkLlxyXG4gICAgICpcclxuICAgICAqIE5vdGU6IGFzIHdpdGggSmF2YVNjcmlwdCdzIG51bWJlciB0eXBlLCAoLTApLnRvRml4ZWQoMCkgaXMgJzAnLFxyXG4gICAgICogYnV0IGUuZy4gKC0wLjAwMDAxKS50b0ZpeGVkKDApIGlzICctMCcuXHJcbiAgICAgKlxyXG4gICAgICogW2RwXSB7bnVtYmVyfSBEZWNpbWFsIHBsYWNlcy4gSW50ZWdlciwgMCB0byBNQVggaW5jbHVzaXZlLlxyXG4gICAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBBcmd1bWVudCB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7ZHB8cm19J1xyXG4gICAgICovXHJcbiAgICBQLnRvRml4ZWQgPSBmdW5jdGlvbiAoZHAsIHJtKSB7XHJcbiAgICAgIGlmIChkcCAhPSBudWxsKSB7XHJcbiAgICAgICAgaW50Q2hlY2soZHAsIDAsIE1BWCk7XHJcbiAgICAgICAgZHAgPSBkcCArIHRoaXMuZSArIDE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZvcm1hdCh0aGlzLCBkcCwgcm0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGluIGZpeGVkLXBvaW50IG5vdGF0aW9uIHJvdW5kZWRcclxuICAgICAqIHVzaW5nIHJtIG9yIFJPVU5ESU5HX01PREUgdG8gZHAgZGVjaW1hbCBwbGFjZXMsIGFuZCBmb3JtYXR0ZWQgYWNjb3JkaW5nIHRvIHRoZSBwcm9wZXJ0aWVzXHJcbiAgICAgKiBvZiB0aGUgZm9ybWF0IG9yIEZPUk1BVCBvYmplY3QgKHNlZSBCaWdOdW1iZXIuc2V0KS5cclxuICAgICAqXHJcbiAgICAgKiBUaGUgZm9ybWF0dGluZyBvYmplY3QgbWF5IGNvbnRhaW4gc29tZSBvciBhbGwgb2YgdGhlIHByb3BlcnRpZXMgc2hvd24gYmVsb3cuXHJcbiAgICAgKlxyXG4gICAgICogRk9STUFUID0ge1xyXG4gICAgICogICBwcmVmaXg6ICcnLFxyXG4gICAgICogICBncm91cFNpemU6IDMsXHJcbiAgICAgKiAgIHNlY29uZGFyeUdyb3VwU2l6ZTogMCxcclxuICAgICAqICAgZ3JvdXBTZXBhcmF0b3I6ICcsJyxcclxuICAgICAqICAgZGVjaW1hbFNlcGFyYXRvcjogJy4nLFxyXG4gICAgICogICBmcmFjdGlvbkdyb3VwU2l6ZTogMCxcclxuICAgICAqICAgZnJhY3Rpb25Hcm91cFNlcGFyYXRvcjogJ1xceEEwJywgICAgICAvLyBub24tYnJlYWtpbmcgc3BhY2VcclxuICAgICAqICAgc3VmZml4OiAnJ1xyXG4gICAgICogfTtcclxuICAgICAqXHJcbiAgICAgKiBbZHBdIHtudW1iZXJ9IERlY2ltYWwgcGxhY2VzLiBJbnRlZ2VyLCAwIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICAgKiBbZm9ybWF0XSB7b2JqZWN0fSBGb3JtYXR0aW5nIG9wdGlvbnMuIFNlZSBGT1JNQVQgcGJqZWN0IGFib3ZlLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBBcmd1bWVudCB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7ZHB8cm19J1xyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IG5vdCBhbiBvYmplY3Q6IHtmb3JtYXR9J1xyXG4gICAgICovXHJcbiAgICBQLnRvRm9ybWF0ID0gZnVuY3Rpb24gKGRwLCBybSwgZm9ybWF0KSB7XHJcbiAgICAgIHZhciBzdHIsXHJcbiAgICAgICAgeCA9IHRoaXM7XHJcblxyXG4gICAgICBpZiAoZm9ybWF0ID09IG51bGwpIHtcclxuICAgICAgICBpZiAoZHAgIT0gbnVsbCAmJiBybSAmJiB0eXBlb2Ygcm0gPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgIGZvcm1hdCA9IHJtO1xyXG4gICAgICAgICAgcm0gPSBudWxsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZHAgJiYgdHlwZW9mIGRwID09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICBmb3JtYXQgPSBkcDtcclxuICAgICAgICAgIGRwID0gcm0gPSBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3JtYXQgPSBGT1JNQVQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBmb3JtYXQgIT0gJ29iamVjdCcpIHtcclxuICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgKGJpZ251bWJlckVycm9yICsgJ0FyZ3VtZW50IG5vdCBhbiBvYmplY3Q6ICcgKyBmb3JtYXQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzdHIgPSB4LnRvRml4ZWQoZHAsIHJtKTtcclxuXHJcbiAgICAgIGlmICh4LmMpIHtcclxuICAgICAgICB2YXIgaSxcclxuICAgICAgICAgIGFyciA9IHN0ci5zcGxpdCgnLicpLFxyXG4gICAgICAgICAgZzEgPSArZm9ybWF0Lmdyb3VwU2l6ZSxcclxuICAgICAgICAgIGcyID0gK2Zvcm1hdC5zZWNvbmRhcnlHcm91cFNpemUsXHJcbiAgICAgICAgICBncm91cFNlcGFyYXRvciA9IGZvcm1hdC5ncm91cFNlcGFyYXRvciB8fCAnJyxcclxuICAgICAgICAgIGludFBhcnQgPSBhcnJbMF0sXHJcbiAgICAgICAgICBmcmFjdGlvblBhcnQgPSBhcnJbMV0sXHJcbiAgICAgICAgICBpc05lZyA9IHgucyA8IDAsXHJcbiAgICAgICAgICBpbnREaWdpdHMgPSBpc05lZyA/IGludFBhcnQuc2xpY2UoMSkgOiBpbnRQYXJ0LFxyXG4gICAgICAgICAgbGVuID0gaW50RGlnaXRzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgaWYgKGcyKSB7XHJcbiAgICAgICAgICBpID0gZzE7XHJcbiAgICAgICAgICBnMSA9IGcyO1xyXG4gICAgICAgICAgZzIgPSBpO1xyXG4gICAgICAgICAgbGVuIC09IGk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZzEgPiAwICYmIGxlbiA+IDApIHtcclxuICAgICAgICAgIGkgPSBsZW4gJSBnMSB8fCBnMTtcclxuICAgICAgICAgIGludFBhcnQgPSBpbnREaWdpdHMuc3Vic3RyKDAsIGkpO1xyXG4gICAgICAgICAgZm9yICg7IGkgPCBsZW47IGkgKz0gZzEpIGludFBhcnQgKz0gZ3JvdXBTZXBhcmF0b3IgKyBpbnREaWdpdHMuc3Vic3RyKGksIGcxKTtcclxuICAgICAgICAgIGlmIChnMiA+IDApIGludFBhcnQgKz0gZ3JvdXBTZXBhcmF0b3IgKyBpbnREaWdpdHMuc2xpY2UoaSk7XHJcbiAgICAgICAgICBpZiAoaXNOZWcpIGludFBhcnQgPSAnLScgKyBpbnRQYXJ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RyID0gZnJhY3Rpb25QYXJ0XHJcbiAgICAgICAgID8gaW50UGFydCArIChmb3JtYXQuZGVjaW1hbFNlcGFyYXRvciB8fCAnJykgKyAoKGcyID0gK2Zvcm1hdC5mcmFjdGlvbkdyb3VwU2l6ZSlcclxuICAgICAgICAgID8gZnJhY3Rpb25QYXJ0LnJlcGxhY2UobmV3IFJlZ0V4cCgnXFxcXGR7JyArIGcyICsgJ31cXFxcQicsICdnJyksXHJcbiAgICAgICAgICAgJyQmJyArIChmb3JtYXQuZnJhY3Rpb25Hcm91cFNlcGFyYXRvciB8fCAnJykpXHJcbiAgICAgICAgICA6IGZyYWN0aW9uUGFydClcclxuICAgICAgICAgOiBpbnRQYXJ0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gKGZvcm1hdC5wcmVmaXggfHwgJycpICsgc3RyICsgKGZvcm1hdC5zdWZmaXggfHwgJycpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhbiBhcnJheSBvZiB0d28gQmlnTnVtYmVycyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGFzIGEgc2ltcGxlXHJcbiAgICAgKiBmcmFjdGlvbiB3aXRoIGFuIGludGVnZXIgbnVtZXJhdG9yIGFuZCBhbiBpbnRlZ2VyIGRlbm9taW5hdG9yLlxyXG4gICAgICogVGhlIGRlbm9taW5hdG9yIHdpbGwgYmUgYSBwb3NpdGl2ZSBub24temVybyB2YWx1ZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHNwZWNpZmllZFxyXG4gICAgICogbWF4aW11bSBkZW5vbWluYXRvci4gSWYgYSBtYXhpbXVtIGRlbm9taW5hdG9yIGlzIG5vdCBzcGVjaWZpZWQsIHRoZSBkZW5vbWluYXRvciB3aWxsIGJlXHJcbiAgICAgKiB0aGUgbG93ZXN0IHZhbHVlIG5lY2Vzc2FyeSB0byByZXByZXNlbnQgdGhlIG51bWJlciBleGFjdGx5LlxyXG4gICAgICpcclxuICAgICAqIFttZF0ge251bWJlcnxzdHJpbmd8QmlnTnVtYmVyfSBJbnRlZ2VyID49IDEsIG9yIEluZmluaXR5LiBUaGUgbWF4aW11bSBkZW5vbWluYXRvci5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX0gOiB7bWR9J1xyXG4gICAgICovXHJcbiAgICBQLnRvRnJhY3Rpb24gPSBmdW5jdGlvbiAobWQpIHtcclxuICAgICAgdmFyIGQsIGQwLCBkMSwgZDIsIGUsIGV4cCwgbiwgbjAsIG4xLCBxLCByLCBzLFxyXG4gICAgICAgIHggPSB0aGlzLFxyXG4gICAgICAgIHhjID0geC5jO1xyXG5cclxuICAgICAgaWYgKG1kICE9IG51bGwpIHtcclxuICAgICAgICBuID0gbmV3IEJpZ051bWJlcihtZCk7XHJcblxyXG4gICAgICAgIC8vIFRocm93IGlmIG1kIGlzIGxlc3MgdGhhbiBvbmUgb3IgaXMgbm90IGFuIGludGVnZXIsIHVubGVzcyBpdCBpcyBJbmZpbml0eS5cclxuICAgICAgICBpZiAoIW4uaXNJbnRlZ2VyKCkgJiYgKG4uYyB8fCBuLnMgIT09IDEpIHx8IG4ubHQoT05FKSkge1xyXG4gICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAgKGJpZ251bWJlckVycm9yICsgJ0FyZ3VtZW50ICcgK1xyXG4gICAgICAgICAgICAgIChuLmlzSW50ZWdlcigpID8gJ291dCBvZiByYW5nZTogJyA6ICdub3QgYW4gaW50ZWdlcjogJykgKyB2YWx1ZU9mKG4pKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgheGMpIHJldHVybiBuZXcgQmlnTnVtYmVyKHgpO1xyXG5cclxuICAgICAgZCA9IG5ldyBCaWdOdW1iZXIoT05FKTtcclxuICAgICAgbjEgPSBkMCA9IG5ldyBCaWdOdW1iZXIoT05FKTtcclxuICAgICAgZDEgPSBuMCA9IG5ldyBCaWdOdW1iZXIoT05FKTtcclxuICAgICAgcyA9IGNvZWZmVG9TdHJpbmcoeGMpO1xyXG5cclxuICAgICAgLy8gRGV0ZXJtaW5lIGluaXRpYWwgZGVub21pbmF0b3IuXHJcbiAgICAgIC8vIGQgaXMgYSBwb3dlciBvZiAxMCBhbmQgdGhlIG1pbmltdW0gbWF4IGRlbm9taW5hdG9yIHRoYXQgc3BlY2lmaWVzIHRoZSB2YWx1ZSBleGFjdGx5LlxyXG4gICAgICBlID0gZC5lID0gcy5sZW5ndGggLSB4LmUgLSAxO1xyXG4gICAgICBkLmNbMF0gPSBQT1dTX1RFTlsoZXhwID0gZSAlIExPR19CQVNFKSA8IDAgPyBMT0dfQkFTRSArIGV4cCA6IGV4cF07XHJcbiAgICAgIG1kID0gIW1kIHx8IG4uY29tcGFyZWRUbyhkKSA+IDAgPyAoZSA+IDAgPyBkIDogbjEpIDogbjtcclxuXHJcbiAgICAgIGV4cCA9IE1BWF9FWFA7XHJcbiAgICAgIE1BWF9FWFAgPSAxIC8gMDtcclxuICAgICAgbiA9IG5ldyBCaWdOdW1iZXIocyk7XHJcblxyXG4gICAgICAvLyBuMCA9IGQxID0gMFxyXG4gICAgICBuMC5jWzBdID0gMDtcclxuXHJcbiAgICAgIGZvciAoOyA7KSAge1xyXG4gICAgICAgIHEgPSBkaXYobiwgZCwgMCwgMSk7XHJcbiAgICAgICAgZDIgPSBkMC5wbHVzKHEudGltZXMoZDEpKTtcclxuICAgICAgICBpZiAoZDIuY29tcGFyZWRUbyhtZCkgPT0gMSkgYnJlYWs7XHJcbiAgICAgICAgZDAgPSBkMTtcclxuICAgICAgICBkMSA9IGQyO1xyXG4gICAgICAgIG4xID0gbjAucGx1cyhxLnRpbWVzKGQyID0gbjEpKTtcclxuICAgICAgICBuMCA9IGQyO1xyXG4gICAgICAgIGQgPSBuLm1pbnVzKHEudGltZXMoZDIgPSBkKSk7XHJcbiAgICAgICAgbiA9IGQyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBkMiA9IGRpdihtZC5taW51cyhkMCksIGQxLCAwLCAxKTtcclxuICAgICAgbjAgPSBuMC5wbHVzKGQyLnRpbWVzKG4xKSk7XHJcbiAgICAgIGQwID0gZDAucGx1cyhkMi50aW1lcyhkMSkpO1xyXG4gICAgICBuMC5zID0gbjEucyA9IHgucztcclxuICAgICAgZSA9IGUgKiAyO1xyXG5cclxuICAgICAgLy8gRGV0ZXJtaW5lIHdoaWNoIGZyYWN0aW9uIGlzIGNsb3NlciB0byB4LCBuMC9kMCBvciBuMS9kMVxyXG4gICAgICByID0gZGl2KG4xLCBkMSwgZSwgUk9VTkRJTkdfTU9ERSkubWludXMoeCkuYWJzKCkuY29tcGFyZWRUbyhcclxuICAgICAgICAgIGRpdihuMCwgZDAsIGUsIFJPVU5ESU5HX01PREUpLm1pbnVzKHgpLmFicygpKSA8IDEgPyBbbjEsIGQxXSA6IFtuMCwgZDBdO1xyXG5cclxuICAgICAgTUFYX0VYUCA9IGV4cDtcclxuXHJcbiAgICAgIHJldHVybiByO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgY29udmVydGVkIHRvIGEgbnVtYmVyIHByaW1pdGl2ZS5cclxuICAgICAqL1xyXG4gICAgUC50b051bWJlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuICt2YWx1ZU9mKHRoaXMpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIHJvdW5kZWQgdG8gc2Qgc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAgICAgKiB1c2luZyByb3VuZGluZyBtb2RlIHJtIG9yIFJPVU5ESU5HX01PREUuIElmIHNkIGlzIGxlc3MgdGhhbiB0aGUgbnVtYmVyIG9mIGRpZ2l0c1xyXG4gICAgICogbmVjZXNzYXJ5IHRvIHJlcHJlc2VudCB0aGUgaW50ZWdlciBwYXJ0IG9mIHRoZSB2YWx1ZSBpbiBmaXhlZC1wb2ludCBub3RhdGlvbiwgdGhlbiB1c2VcclxuICAgICAqIGV4cG9uZW50aWFsIG5vdGF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIFtzZF0ge251bWJlcn0gU2lnbmlmaWNhbnQgZGlnaXRzLiBJbnRlZ2VyLCAxIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICAgKlxyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtzZHxybX0nXHJcbiAgICAgKi9cclxuICAgIFAudG9QcmVjaXNpb24gPSBmdW5jdGlvbiAoc2QsIHJtKSB7XHJcbiAgICAgIGlmIChzZCAhPSBudWxsKSBpbnRDaGVjayhzZCwgMSwgTUFYKTtcclxuICAgICAgcmV0dXJuIGZvcm1hdCh0aGlzLCBzZCwgcm0sIDIpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGluIGJhc2UgYiwgb3IgYmFzZSAxMCBpZiBiIGlzXHJcbiAgICAgKiBvbWl0dGVkLiBJZiBhIGJhc2UgaXMgc3BlY2lmaWVkLCBpbmNsdWRpbmcgYmFzZSAxMCwgcm91bmQgYWNjb3JkaW5nIHRvIERFQ0lNQUxfUExBQ0VTIGFuZFxyXG4gICAgICogUk9VTkRJTkdfTU9ERS4gSWYgYSBiYXNlIGlzIG5vdCBzcGVjaWZpZWQsIGFuZCB0aGlzIEJpZ051bWJlciBoYXMgYSBwb3NpdGl2ZSBleHBvbmVudFxyXG4gICAgICogdGhhdCBpcyBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gVE9fRVhQX1BPUywgb3IgYSBuZWdhdGl2ZSBleHBvbmVudCBlcXVhbCB0byBvciBsZXNzIHRoYW5cclxuICAgICAqIFRPX0VYUF9ORUcsIHJldHVybiBleHBvbmVudGlhbCBub3RhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBbYl0ge251bWJlcn0gSW50ZWdlciwgMiB0byBBTFBIQUJFVC5sZW5ndGggaW5jbHVzaXZlLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBCYXNlIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtifSdcclxuICAgICAqL1xyXG4gICAgUC50b1N0cmluZyA9IGZ1bmN0aW9uIChiKSB7XHJcbiAgICAgIHZhciBzdHIsXHJcbiAgICAgICAgbiA9IHRoaXMsXHJcbiAgICAgICAgcyA9IG4ucyxcclxuICAgICAgICBlID0gbi5lO1xyXG5cclxuICAgICAgLy8gSW5maW5pdHkgb3IgTmFOP1xyXG4gICAgICBpZiAoZSA9PT0gbnVsbCkge1xyXG4gICAgICAgIGlmIChzKSB7XHJcbiAgICAgICAgICBzdHIgPSAnSW5maW5pdHknO1xyXG4gICAgICAgICAgaWYgKHMgPCAwKSBzdHIgPSAnLScgKyBzdHI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN0ciA9ICdOYU4nO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoYiA9PSBudWxsKSB7XHJcbiAgICAgICAgICBzdHIgPSBlIDw9IFRPX0VYUF9ORUcgfHwgZSA+PSBUT19FWFBfUE9TXHJcbiAgICAgICAgICAgPyB0b0V4cG9uZW50aWFsKGNvZWZmVG9TdHJpbmcobi5jKSwgZSlcclxuICAgICAgICAgICA6IHRvRml4ZWRQb2ludChjb2VmZlRvU3RyaW5nKG4uYyksIGUsICcwJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChiID09PSAxMCAmJiBhbHBoYWJldEhhc05vcm1hbERlY2ltYWxEaWdpdHMpIHtcclxuICAgICAgICAgIG4gPSByb3VuZChuZXcgQmlnTnVtYmVyKG4pLCBERUNJTUFMX1BMQUNFUyArIGUgKyAxLCBST1VORElOR19NT0RFKTtcclxuICAgICAgICAgIHN0ciA9IHRvRml4ZWRQb2ludChjb2VmZlRvU3RyaW5nKG4uYyksIG4uZSwgJzAnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaW50Q2hlY2soYiwgMiwgQUxQSEFCRVQubGVuZ3RoLCAnQmFzZScpO1xyXG4gICAgICAgICAgc3RyID0gY29udmVydEJhc2UodG9GaXhlZFBvaW50KGNvZWZmVG9TdHJpbmcobi5jKSwgZSwgJzAnKSwgMTAsIGIsIHMsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHMgPCAwICYmIG4uY1swXSkgc3RyID0gJy0nICsgc3RyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gc3RyO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhcyB0b1N0cmluZywgYnV0IGRvIG5vdCBhY2NlcHQgYSBiYXNlIGFyZ3VtZW50LCBhbmQgaW5jbHVkZSB0aGUgbWludXMgc2lnbiBmb3JcclxuICAgICAqIG5lZ2F0aXZlIHplcm8uXHJcbiAgICAgKi9cclxuICAgIFAudmFsdWVPZiA9IFAudG9KU09OID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gdmFsdWVPZih0aGlzKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIFAuX2lzQmlnTnVtYmVyID0gdHJ1ZTtcclxuXHJcbiAgICBpZiAoY29uZmlnT2JqZWN0ICE9IG51bGwpIEJpZ051bWJlci5zZXQoY29uZmlnT2JqZWN0KTtcclxuXHJcbiAgICByZXR1cm4gQmlnTnVtYmVyO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIFBSSVZBVEUgSEVMUEVSIEZVTkNUSU9OU1xyXG5cclxuICAvLyBUaGVzZSBmdW5jdGlvbnMgZG9uJ3QgbmVlZCBhY2Nlc3MgdG8gdmFyaWFibGVzLFxyXG4gIC8vIGUuZy4gREVDSU1BTF9QTEFDRVMsIGluIHRoZSBzY29wZSBvZiB0aGUgYGNsb25lYCBmdW5jdGlvbiBhYm92ZS5cclxuXHJcblxyXG4gIGZ1bmN0aW9uIGJpdEZsb29yKG4pIHtcclxuICAgIHZhciBpID0gbiB8IDA7XHJcbiAgICByZXR1cm4gbiA+IDAgfHwgbiA9PT0gaSA/IGkgOiBpIC0gMTtcclxuICB9XHJcblxyXG5cclxuICAvLyBSZXR1cm4gYSBjb2VmZmljaWVudCBhcnJheSBhcyBhIHN0cmluZyBvZiBiYXNlIDEwIGRpZ2l0cy5cclxuICBmdW5jdGlvbiBjb2VmZlRvU3RyaW5nKGEpIHtcclxuICAgIHZhciBzLCB6LFxyXG4gICAgICBpID0gMSxcclxuICAgICAgaiA9IGEubGVuZ3RoLFxyXG4gICAgICByID0gYVswXSArICcnO1xyXG5cclxuICAgIGZvciAoOyBpIDwgajspIHtcclxuICAgICAgcyA9IGFbaSsrXSArICcnO1xyXG4gICAgICB6ID0gTE9HX0JBU0UgLSBzLmxlbmd0aDtcclxuICAgICAgZm9yICg7IHotLTsgcyA9ICcwJyArIHMpO1xyXG4gICAgICByICs9IHM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGV0ZXJtaW5lIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgZm9yIChqID0gci5sZW5ndGg7IHIuY2hhckNvZGVBdCgtLWopID09PSA0ODspO1xyXG5cclxuICAgIHJldHVybiByLnNsaWNlKDAsIGogKyAxIHx8IDEpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIENvbXBhcmUgdGhlIHZhbHVlIG9mIEJpZ051bWJlcnMgeCBhbmQgeS5cclxuICBmdW5jdGlvbiBjb21wYXJlKHgsIHkpIHtcclxuICAgIHZhciBhLCBiLFxyXG4gICAgICB4YyA9IHguYyxcclxuICAgICAgeWMgPSB5LmMsXHJcbiAgICAgIGkgPSB4LnMsXHJcbiAgICAgIGogPSB5LnMsXHJcbiAgICAgIGsgPSB4LmUsXHJcbiAgICAgIGwgPSB5LmU7XHJcblxyXG4gICAgLy8gRWl0aGVyIE5hTj9cclxuICAgIGlmICghaSB8fCAhaikgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgYSA9IHhjICYmICF4Y1swXTtcclxuICAgIGIgPSB5YyAmJiAheWNbMF07XHJcblxyXG4gICAgLy8gRWl0aGVyIHplcm8/XHJcbiAgICBpZiAoYSB8fCBiKSByZXR1cm4gYSA/IGIgPyAwIDogLWogOiBpO1xyXG5cclxuICAgIC8vIFNpZ25zIGRpZmZlcj9cclxuICAgIGlmIChpICE9IGopIHJldHVybiBpO1xyXG5cclxuICAgIGEgPSBpIDwgMDtcclxuICAgIGIgPSBrID09IGw7XHJcblxyXG4gICAgLy8gRWl0aGVyIEluZmluaXR5P1xyXG4gICAgaWYgKCF4YyB8fCAheWMpIHJldHVybiBiID8gMCA6ICF4YyBeIGEgPyAxIDogLTE7XHJcblxyXG4gICAgLy8gQ29tcGFyZSBleHBvbmVudHMuXHJcbiAgICBpZiAoIWIpIHJldHVybiBrID4gbCBeIGEgPyAxIDogLTE7XHJcblxyXG4gICAgaiA9IChrID0geGMubGVuZ3RoKSA8IChsID0geWMubGVuZ3RoKSA/IGsgOiBsO1xyXG5cclxuICAgIC8vIENvbXBhcmUgZGlnaXQgYnkgZGlnaXQuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgajsgaSsrKSBpZiAoeGNbaV0gIT0geWNbaV0pIHJldHVybiB4Y1tpXSA+IHljW2ldIF4gYSA/IDEgOiAtMTtcclxuXHJcbiAgICAvLyBDb21wYXJlIGxlbmd0aHMuXHJcbiAgICByZXR1cm4gayA9PSBsID8gMCA6IGsgPiBsIF4gYSA/IDEgOiAtMTtcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIENoZWNrIHRoYXQgbiBpcyBhIHByaW1pdGl2ZSBudW1iZXIsIGFuIGludGVnZXIsIGFuZCBpbiByYW5nZSwgb3RoZXJ3aXNlIHRocm93LlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGludENoZWNrKG4sIG1pbiwgbWF4LCBuYW1lKSB7XHJcbiAgICBpZiAobiA8IG1pbiB8fCBuID4gbWF4IHx8IG4gIT09IG1hdGhmbG9vcihuKSkge1xyXG4gICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgKGJpZ251bWJlckVycm9yICsgKG5hbWUgfHwgJ0FyZ3VtZW50JykgKyAodHlwZW9mIG4gPT0gJ251bWJlcidcclxuICAgICAgICAgPyBuIDwgbWluIHx8IG4gPiBtYXggPyAnIG91dCBvZiByYW5nZTogJyA6ICcgbm90IGFuIGludGVnZXI6ICdcclxuICAgICAgICAgOiAnIG5vdCBhIHByaW1pdGl2ZSBudW1iZXI6ICcpICsgU3RyaW5nKG4pKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvLyBBc3N1bWVzIGZpbml0ZSBuLlxyXG4gIGZ1bmN0aW9uIGlzT2RkKG4pIHtcclxuICAgIHZhciBrID0gbi5jLmxlbmd0aCAtIDE7XHJcbiAgICByZXR1cm4gYml0Rmxvb3Iobi5lIC8gTE9HX0JBU0UpID09IGsgJiYgbi5jW2tdICUgMiAhPSAwO1xyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIHRvRXhwb25lbnRpYWwoc3RyLCBlKSB7XHJcbiAgICByZXR1cm4gKHN0ci5sZW5ndGggPiAxID8gc3RyLmNoYXJBdCgwKSArICcuJyArIHN0ci5zbGljZSgxKSA6IHN0cikgK1xyXG4gICAgIChlIDwgMCA/ICdlJyA6ICdlKycpICsgZTtcclxuICB9XHJcblxyXG5cclxuICBmdW5jdGlvbiB0b0ZpeGVkUG9pbnQoc3RyLCBlLCB6KSB7XHJcbiAgICB2YXIgbGVuLCB6cztcclxuXHJcbiAgICAvLyBOZWdhdGl2ZSBleHBvbmVudD9cclxuICAgIGlmIChlIDwgMCkge1xyXG5cclxuICAgICAgLy8gUHJlcGVuZCB6ZXJvcy5cclxuICAgICAgZm9yICh6cyA9IHogKyAnLic7ICsrZTsgenMgKz0geik7XHJcbiAgICAgIHN0ciA9IHpzICsgc3RyO1xyXG5cclxuICAgIC8vIFBvc2l0aXZlIGV4cG9uZW50XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZW4gPSBzdHIubGVuZ3RoO1xyXG5cclxuICAgICAgLy8gQXBwZW5kIHplcm9zLlxyXG4gICAgICBpZiAoKytlID4gbGVuKSB7XHJcbiAgICAgICAgZm9yICh6cyA9IHosIGUgLT0gbGVuOyAtLWU7IHpzICs9IHopO1xyXG4gICAgICAgIHN0ciArPSB6cztcclxuICAgICAgfSBlbHNlIGlmIChlIDwgbGVuKSB7XHJcbiAgICAgICAgc3RyID0gc3RyLnNsaWNlKDAsIGUpICsgJy4nICsgc3RyLnNsaWNlKGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN0cjtcclxuICB9XHJcblxyXG5cclxuICAvLyBFWFBPUlRcclxuXHJcblxyXG4gIEJpZ051bWJlciA9IGNsb25lKCk7XHJcbiAgQmlnTnVtYmVyWydkZWZhdWx0J10gPSBCaWdOdW1iZXIuQmlnTnVtYmVyID0gQmlnTnVtYmVyO1xyXG5cclxuICAvLyBBTUQuXHJcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XHJcbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkgeyByZXR1cm4gQmlnTnVtYmVyOyB9KTtcclxuXHJcbiAgLy8gTm9kZS5qcyBhbmQgb3RoZXIgZW52aXJvbm1lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cy5cclxuICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgIG1vZHVsZS5leHBvcnRzID0gQmlnTnVtYmVyO1xyXG5cclxuICAvLyBCcm93c2VyLlxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAoIWdsb2JhbE9iamVjdCkge1xyXG4gICAgICBnbG9iYWxPYmplY3QgPSB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmID8gc2VsZiA6IHdpbmRvdztcclxuICAgIH1cclxuXHJcbiAgICBnbG9iYWxPYmplY3QuQmlnTnVtYmVyID0gQmlnTnVtYmVyO1xyXG4gIH1cclxufSkodGhpcyk7XHJcbiJdfQ==