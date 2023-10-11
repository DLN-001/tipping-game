namespace screen {
    /**
    * Computes the famous Fibonacci number sequence!
    */
    //% block="LED|state" blockGap=8
    export function ledState(): string[][] {
        return [
            initializeColumnArray2(),
            initializeColumnArray2(),
            initializeColumnArray2(),
            initializeColumnArray2(),
            initializeColumnArray2()
        ]
    }

    /**
    * Computes the famous Fibonacci number sequence!
    */
    //% block="Create|Screen|Image" blockGap=8
    export function createScreenImage() : Image {
        let test = led.screenshot()
        return led.screenshot()
    }

    /**
    * Computes the famous Fibonacci number sequence!
    */
    //% block="Compare|LED|State %ledState1 %ledState2" blockGap=8
    export function compareLEDState(ledState1: string[][], ledState2: string[][]) : boolean {
        let ledState1String = ""
        let ledState2String = ""
        ledState1.forEach((element) => element.forEach((element) => ledState1String = ledState1String + element))
        ledState2.forEach((element) => element.forEach((element) => ledState2String = ledState2String + element))
        return ledState1String === ledState2String
    }

    /**
    * Computes the famous Fibonacci number sequence!
    */
    //% block="Current|LED|State" blockGap=8
    export function currentLEDState() : string[][] {
        let myReturn = ledState()
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (led.pointBrightness(i, j) > 0) {
                    myReturn[i][j] = "#"
                }
            }
        }

        return myReturn
    }
}

// Add your code here
function initializeColumnArray2() {
    let image1 = images.createImage(`
    #...#
    .#.#.
    ..#..
    .#.#.
    #...#
    `)
    return [
        ".",
        ".",
        ".",
        ".",
        "."
    ]
}

