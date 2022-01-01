const runner = () => {
  const s = function () {
    const _postMessage = postMessage;
    const _addEventListener = addEventListener;
    const _eval = eval;

    const results: boolean[] = [];
    const expect = <T = any>(received: T) => {
      return {
        toBe: (expected: T) => {
          try {
            results.push(received === expected);
          } catch (err) {
            results.push(false);
          }
        },
      };
    };

    (function (obj) {
      let current = obj;
      const keepProperties = [
        // Required
        "Object",
        "Function",
        "Infinity",
        "NaN",
        "undefined",
        "caches",
        "TEMPORARY",
        "PERSISTENT",
        // Optional, but trivial to get back
        "Array",
        "Boolean",
        "Number",
        "String",
        "Symbol",
        "Map",
        "Math",
        "Set",
        "JSON",
        "Date",
        "RegExp",
        "BigInt",
        "Intl",
        // "Error",
        // "Generator",
        // "GeneratorFunction",
        // "AsyncFunction",
        // "AsyncGenerator",
        // "AsyncGeneratorFunction",
        "encodeURI",
        "encodeURIComponent",
        "decodeURI",
        "decodeURIComponent",
      ];

      do {
        Object.getOwnPropertyNames(current).forEach(function (name) {
          if (keepProperties.indexOf(name) === -1) {
            // console.log(name);
            delete current[name];
          }
        });

        current = Object.getPrototypeOf(current);
      } while (current !== Object.prototype);
      current["expect"] = expect;
      // @ts-ignore
    })(this);

    _addEventListener("message", function (e) {
      // var f = new Function("", "return (" + e.data + "\n);");
      try {
        _eval(e.data);
        _postMessage(results);
      } catch (err: any) {
        if ("message" in err) {
          _postMessage(err.message);
        }
      }
    });
  }.toString();

  return s;
};

export function safeEval(
  untrustedCode: string,
  timeout: number = 1000
): Promise<boolean[] | string> {
  return new Promise(function (resolve, reject) {
    var blobURL = URL.createObjectURL(
      new Blob([`(${runner()})()`], { type: "application/javascript" })
    );

    var worker = new Worker(blobURL);
    URL.revokeObjectURL(blobURL);

    worker.onmessage = function (evt) {
      worker.terminate();
      resolve(evt.data);
    };

    worker.onerror = function (evt) {
      reject(new Error(evt.message));
    };

    worker.postMessage(untrustedCode);

    setTimeout(function () {
      worker.terminate();
      reject(new Error("The worker timed out."));
    }, timeout);
  });
}
