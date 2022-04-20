// fetch is a side effect
// it is gathering info from another source
//    besides the arguments to the function

async function function_that_uses_fetch(_fetch = fetch) {
    const result = await _fetch("http://ip.jsontest.com")

    console.log(result)

    if (result.ok === false)
        return false
    else
        return await result.json()
}

async function test_function_that_uses_fetch() {
    // need a fn that emulates fetch
    // 1. need to accecpt a string arg
    // 2. need to return a promise
    // 3. promise needs to supply an object with an 'ok' field
    // 4. 'ok' field must have type boolean
    const _fetch_not_ok = (url) => {
      return new Promise(((resolve, reject) => {
          resolve({
              ok: false
          })
      }))
    }

    const response = await function_that_uses_fetch(_fetch_not_ok)

    if (response === false)
        console.log("Passed")
    else
        console.log("Failed", response)
}

test_function_that_uses_fetch()