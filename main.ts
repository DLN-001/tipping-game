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
input.onGesture(Gesture.LogoUp, function () {
    changeInY = -1
    changeInX = 0
})
input.onGesture(Gesture.TiltLeft, function () {
    changeInY = 0
    changeInX = -1
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
input.onGesture(Gesture.ScreenUp, function () {
    changeInX = 0
    changeInY = 0
})
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
input.onGesture(Gesture.TiltRight, function () {
    changeInY = 0
    changeInX = 1
})
input.onGesture(Gesture.LogoDown, function () {
    changeInY = 1
    changeInX = 0
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
let changeInY = 0
let changeInX = 0
let plottedBrightness = 0
let cursorBrightness = 0
game.startCountdown(60000)
cursorBrightness = 125
plottedBrightness = 255
changeInX = 0
changeInY = 0
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
loops.everyInterval(500, function () {
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
