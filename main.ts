function determineDestinationBrightness (X: number, Y: number) {
    destinationBrightness = led.pointBrightness(X, Y)
}
input.onButtonPressed(Button.A, function () {
    if (destinationBrightness == plottedBrightness) {
        destinationBrightness = 0
        led.plotBrightness(cursorXPosition, cursorYPosition, 0)
    } else {
        destinationBrightness = plottedBrightness
        led.plotBrightness(cursorXPosition, cursorYPosition, plottedBrightness)
    }
})
function startNewImage () {
    if (imageIndex >= imageList.length) {
        imageIndex = 0
    }
    game.pause()
    basic.pause(500)
    imageList[imageIndex].showImage(0)
    savedLEDState = screen.currentLEDState()
    basic.pause(1000)
    basic.clearScreen()
    game.resume()
    destinationBrightness = 0
    savedBrightness = 0
    cursorYPosition = 2
    cursorXPosition = 2
    destinationXPosition = cursorXPosition
    destinationYPosition = cursorYPosition
    savedXPosition = cursorXPosition
    savedYPosition = cursorYPosition
    led.plotBrightness(cursorXPosition, cursorYPosition, cursorBrightness)
}
function processMoveCursorX (movingRightIndicator: boolean) {
    savedXPosition = cursorXPosition
    savedYPosition = cursorYPosition
    savedBrightness = destinationBrightness
    destinationXPosition = determineXDestination(cursorXPosition, movingRightIndicator)
    determineDestinationBrightness(destinationXPosition, cursorYPosition)
    cursorXPosition = destinationXPosition
    led.plotBrightness(savedXPosition, savedYPosition, savedBrightness)
}
function processMoveCursorY (movingUpIndicator: boolean) {
    savedXPosition = cursorXPosition
    savedYPosition = cursorYPosition
    savedBrightness = destinationBrightness
    destinationYPosition = determineYDestination(cursorYPosition, movingUpIndicator)
    determineDestinationBrightness(cursorXPosition, destinationYPosition)
    cursorYPosition = destinationYPosition
    led.plotBrightness(savedXPosition, savedYPosition, savedBrightness)
}
input.onButtonPressed(Button.B, function () {
    checkingImage = true
})
function determineXDestination (currentXPosition: number, movingRightIndicator: boolean) {
    if (movingRightIndicator) {
        if (currentXPosition == 4) {
            return 0
        } else {
            return currentXPosition + 1
        }
    } else {
        if (currentXPosition == 0) {
            return 4
        } else {
            return currentXPosition + -1
        }
    }
}
function determineYDestination (currentYPosition: number, movingUpIndicator: boolean) {
    if (movingUpIndicator) {
        if (currentYPosition == 0) {
            return 4
        } else {
            return currentYPosition + -1
        }
    } else {
        if (currentYPosition == 4) {
            return 0
        } else {
            return currentYPosition + 1
        }
    }
}
let screenImage: Image = null
let cursorToggleIndicator = false
let roll = 0
let pitch = 0
let checkingImage = false
let savedYPosition = 0
let savedXPosition = 0
let destinationYPosition = 0
let destinationXPosition = 0
let savedBrightness = 0
let savedLEDState: string[][] = []
let cursorYPosition = 0
let cursorXPosition = 0
let destinationBrightness = 0
let imageIndex = 0
let imageList: Image[] = []
let plottedBrightness = 0
let cursorBrightness = 0
game.startCountdown(120000)
cursorBrightness = 50
plottedBrightness = 255
let changeInX = 0
let changeInY = 0
imageList = [
images.iconImage(IconNames.SmallDiamond),
images.iconImage(IconNames.SmallHeart),
images.iconImage(IconNames.SmallSquare),
images.iconImage(IconNames.Tortoise),
images.iconImage(IconNames.Target),
images.iconImage(IconNames.Duck),
images.iconImage(IconNames.Skull),
images.iconImage(IconNames.Ghost),
images.iconImage(IconNames.Chessboard),
images.createImage(`
    # # # . #
    . # . # #
    # # # . .
    # . # # #
    . # . # .
    `)
]
imageIndex = 0
startNewImage()
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    roll = input.rotation(Rotation.Roll)
    if (Math.abs(pitch) < 15 && Math.abs(roll) < 15) {
        changeInX = 0
        changeInY = 0
    } else {
        if (Math.abs(pitch) < Math.abs(roll)) {
            if (0 < roll) {
                changeInY = 0
                changeInX = 1
            } else {
                changeInY = 0
                changeInX = -1
            }
        } else {
            if (0 < pitch) {
                changeInY = -1
                changeInX = 0
            } else {
                changeInY = 1
                changeInX = 0
            }
        }
    }
})
loops.everyInterval(750, function () {
    if (game.isGameOver()) {
        cursorBrightness = 0
    } else {
        if (changeInX == -1) {
            processMoveCursorX(false)
        }
        if (changeInX == 1) {
            processMoveCursorX(true)
        }
        if (changeInY == -1) {
            processMoveCursorY(false)
        }
        if (changeInY == 1) {
            processMoveCursorY(true)
        }
        if (changeInX == 0 && changeInY == 0) {
            if (cursorToggleIndicator) {
                cursorToggleIndicator = false
                led.plotBrightness(cursorXPosition, cursorYPosition, cursorBrightness)
            } else {
                cursorToggleIndicator = true
                led.plotBrightness(cursorXPosition, cursorYPosition, destinationBrightness)
            }
        } else {
            led.plotBrightness(cursorXPosition, cursorYPosition, cursorBrightness)
        }
        if (checkingImage) {
            led.plotBrightness(cursorXPosition, cursorYPosition, destinationBrightness)
            screenImage = screen.createScreenImage()
            if (screen.compareLEDState(savedLEDState, screen.currentLEDState())) {
                basic.showIcon(IconNames.Happy)
                basic.pause(200)
                imageIndex += 1
                game.addScore(1)
                startNewImage()
            } else {
                basic.showIcon(IconNames.No)
                basic.pause(200)
                screenImage.showImage(0)
            }
            checkingImage = false
        }
    }
})
