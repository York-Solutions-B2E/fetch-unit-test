// fetch is a side effect
// it is gathering info from another source
//    besides the arguments to the function

// dependency injection
async function function_that_uses_fetch(_fetch = fetch) {
    const result = await _fetch("http://ip.jsontest.com")

    const two = '1' + '1'
    const str = JSON.stringify("{}")

    document.getElementById("someID").innerHTML = JSON.stringify(result)

    // Fail first/fast
    if (result.ok === false)
        return false

    return await result.json()
}

function_that_uses_fetch()

async function test_function_that_uses_fetch() {
    // need a fn that emulates fetch
    // 1. need to accecpt a string arg
    // 2. need to return a promise
    // 3. promise needs to supply an object with an 'ok' field
    // 4. 'ok' field must have type boolean
    const _fetch_not_ok = (url) => {
        return new Promise((resolve, reject) => {
            resolve({
                ok: false
            })
        })
    }

    let response = await function_that_uses_fetch(_fetch_not_ok)

    if (response === false)
        console.log("Passed")
    else
        console.log("Failed", response)

    // ...
    // 5. promise needs to supply an object with a 'json' field
    // 6. 'json' field must have type function
    // 7. json function must return a promise
    // const _fetch_ok = url => new Promise((resolve => resolve({
    //         ok: true,
    //         json: () => new Promise(resolve => resolve({
    //             ip: "127.0.0.1"
    //         }))
    //     })
    // ))

    function supply_json(resolve) {
        const ip_obj = {
            ip: "127.0.0.1"
        }

        return resolve(ip_obj)
    }

    function promise_json() {
        return new Promise(supply_json)
    }

    function supply_response(resolve) {
        const response = {
            ok: true,
            json: promise_json
        }

        return resolve(response)
    }

    function _fetch_ok(url) {
        return new Promise(supply_response)
    }

    response = await function_that_uses_fetch(_fetch_ok)

    // object?.field checks if the object is defined:
    //   if so, proceed as normal i.e. object.field
    //   otherwise return undefined
    if (response?.ip === "127.0.0.1")
        console.log("Passed")
    else
        console.log("Failed", response)
}

test_function_that_uses_fetch()
