def on_button_pressed_a():
    pass
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_gesture_logo_up():
    pass
input.on_gesture(Gesture.LOGO_UP, on_gesture_logo_up)

def on_gesture_tilt_left():
    pass
input.on_gesture(Gesture.TILT_LEFT, on_gesture_tilt_left)

def on_button_pressed_b():
    pass
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_gesture_tilt_right():
    pass
input.on_gesture(Gesture.TILT_RIGHT, on_gesture_tilt_right)

def on_gesture_logo_down():
    pass
input.on_gesture(Gesture.LOGO_DOWN, on_gesture_logo_down)

image1 = images.icon_image(IconNames.HEART)
image1.show_image(0)
basic.pause(2000)
basic.clear_screen()
led.plot(1, 2)
led.plot(3, 2)

def on_forever():
    pass
basic.forever(on_forever)
