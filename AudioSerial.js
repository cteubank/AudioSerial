function AudioSerial (buad, fs) {
/*TODO:
    +Test for highest supported buad rate at various sample rates
*/
    
  //PROPERTIES
    //Default Values
    buad = buad || 9600;
    fs = fs || 48000;
    
    //BUAD Rate
    this.buad = buad;
    
    //Audio Sample Rate, for best performance should be 48000
    this.fs= fs;
        
    
  //CONSTRUCTOR
    //Make sure browser supports AudioContext, which is necessary for playback
    if (!window.AudioContext) {
        if (!window.webkitAudioContext) {
            console.log("Failed to initialize AudioSerial: Browser does not support AudioContext");
        }
        window.AudioContext = window.webkitAudioContext;
    }
    this.audio_context = new AudioContext();   
    
    
  //METHODS
    //Sends characters one at a time over audio channel in serial communication format
    this.putString = function(string_out) {
        //Number of samples necessary to represent 12 bits
        //12*(Samples/second)/(Bits/second) = 12*(samples/bit)
        var bit_length = this.fs/this.buad;
        var buffer_length = 12*bit_length;
        
        //Output characters over serial one at a time
        for(var char_number = 0; char_number < string_out.length; char_number++){
            //Initialize empty buffer
            var buffer   = this.audio_context.createBuffer(2, buffer_length, this.fs);
            var buf_0    = buffer.getChannelData(0);
            var buf_1    = buffer.getChannelData(1);
            var char_code = string_out.charCodeAt(char_number);

            //Credit http://answers.yahoo.com/question/index?qid=20080513193113AAJTqIt
            var char_code_binary = '';
            for (var i = 0; i < 8; i++) {
                char_code_binary = (char_code%2) + char_code_binary;
                char_code = Math.floor(char_code/2);
            }
            console.log("Char: "+string_out[char_number]+" Code: "+string_out.charCodeAt(char_number)+" Bin: "+char_code_binary);

            
            //Add start bit to buffer
            for(var i = bit_length; i < 2*bit_length; i++){
                buf_0[i] = 1;
            }
            
            //Add individual bits for character to buffer, LSB first
            for(var bit_number=7; bit_number>=0; bit_number--){
                var bit_value = char_code_binary[bit_number];
                console.log("bit value "+bit_number+": "+bit_value);
                for(var i = (bit_number+2)*bit_length; i < (bit_number+3)*bit_length; i++){
                    buf_0[i] = parseInt(bit_value);
                }  
            }
            
            //Add stop bit to buffer
            for(var i = bit_length; i < 2*bit_length; i++){
                buf_0[i] = 1;
            }
            
            //Play the audio signal for this character
            var node = this.audio_context.createBufferSource(0);
            node.buffer = buffer;
            node.connect(this.audio_context.destination);
            node.noteOn(this.audio_context.currentTime + 0.5);
            
        }

    };
    
}
