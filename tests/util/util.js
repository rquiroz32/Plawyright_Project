export async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
};

export function returnMatchCount(expectedValue, arrayOfColValues) {
    let matchCount = 0
    let actualVal
    for (const colVal of arrayOfColValues) {
        if (colVal === expectedValue) {
            matchCount++
            actualVal = colVal
        }
        else {
            console.log(`Mismatch found, expected ${expectedValue} but received ${colVal}`)
        }
    }

    if (matchCount > 0) {
        console.log(`found ${matchCount} number of matches expected value: ${expectedValue} and found actual value of ${actualVal}`)
    }

    return matchCount.toString()
}
