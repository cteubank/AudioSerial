AudioSerial
===========

AudioSerial.js is a small javascript class I developed that enables developers to send 'serial' commands over a standard headphone cable. This was used in my senior embedded systems design class to send commands from the headphone port of an iPhone to an Atmel ATmega168, requiring only a comparator to convert the AC audio signal into a stable digital signal for the processor to read.

Please note: due to limitations of DACs, AudioSerial.js uses inverted start and stop bits, so the line idles at 0V rather than 5V.

    audio_serial = new AudioSerial(9600,48000);
    audio_serial.putString("THIS IS A STRING SENT OVER SERIAL");
