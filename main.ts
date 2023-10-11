input.onButtonPressed(Button.A, function () {
    if (screen.compareLEDState(savedLEDState, screen.currentLEDState())) {
        basic.showIcon(IconNames.Happy)
    } else {
        basic.showIcon(IconNames.No)
    }
})
input.onGesture(Gesture.LogoUp, function () {
    basic.showIcon(IconNames.SmallHeart)
})
input.onGesture(Gesture.TiltLeft, function () {
	
})
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Heart)
})
input.onGesture(Gesture.TiltRight, function () {
	
})
input.onGesture(Gesture.LogoDown, function () {
    basic.showIcon(IconNames.House)
})
let savedLEDState: string[][] = []
basic.showIcon(IconNames.Heart)
savedLEDState = screen.currentLEDState()
basic.pause(1000)
basic.clearScreen()
basic.pause(1000)
led.plot(2, 1)
led.plot(1, 2)
led.plot(3, 2)
led.plot(2, 3)
basic.forever(function () {
	
})
