AudioSerial
===========

AudioSerial.js is a small javascript class I developed that enables developers to send 'UART' commands over a standard headphone cable. This was used in my senior embedded systems design class to send commands from the headphone port of an iPhone to an Atmel ATmega168, requiring only a comparator on the recieving board to convert the AC audio signal (essentially square waves from -2.5V to 2.5V) into a stable digital signal (0V to 5V) for the processor to poll. I used a threshold voltage of .5V such that for any input to the comparator below .5V (-2.5V to .5V), the comparator output would be 0V. Using .5V instead of 0V as the comparing voltage helped eliminate noise on the converted digital line.    

At this time AudioSerial.js is limited to one-way communication (send only). 

Please note: due to limitations of DACs, AudioSerial.js uses inverted start and stop bits, so the line idles at 0V rather than 5V.

    audio_serial = new AudioSerial(9600,48000);
    audio_serial.putString("THIS IS A STRING SENT OVER UART");
