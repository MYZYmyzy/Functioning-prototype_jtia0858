# Functioning-prototype_jtia0858

# Interactive notes 
*Mouse click to start play to start the music. The artwork starts flashing and its transparency is positively correlated with the amplitude of the music. Click pause to pause the flashing.*

# Detailed information
*I choose audio to drive my personal code. The colour and transparency of the image will be animated. The colour of the image will always change after the music starts and the transparency of the image is related to the amplitude of the audio, the higher the amplitude, the higher the transparency of the image.*

# Insight
*I was inspired by singers' concerts where there are flashing lights to set off the music, so I wanted to reflect the blinking feature.*

![An image of vocal recital](image.png)

# Technical description
*I used week10 and week11 lecture and Tutorial content，and I added code related to audio. I used the FFT as the core of the animation, through which I get the data to drive the animation. I use the if function to monitor if the audio is playing in real time to make sure that the audio is associated with the animation, and when the audio is playing, I call updateGrid to make the image change colour. I set up a play/pause button to start and stop the animation.*


