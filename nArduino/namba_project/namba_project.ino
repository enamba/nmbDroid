/*
 PROJECT: nmbDroid 
 PROGRAMMER: Eduardo Namba
 DATE: Apr 21, 2015
 FILE: namba_project.ino
 LICENSE: Public domain
*/

#define START_CMD_CHAR '*'
#define CMD_CHANGE_DIRECTION 9
#define PIN_HIGH 1
#define PIN_LOW 0

//     POS1      | POS2 |   POS3   |   POS4   |   POS5    |  POS6
//               |      | dirMotL  | onOffMotL| onOffMotR | dirMotR
// START_CMD_CHAR| CMD  | pin_num4 | pin_num5 | pin_num6  | pin_num7
//       *       |  9#  |    0#    |    0#    |    0#     |   0#

// *9#0#1#1#0# - back
// *9#1#1#1#1# - front
// *9#1#1#1#0# - right
// *9#0#1#1#1# - left
// *9#0#0#0#0# - stop

int count = 0;
int pin_num6 = 0;
int pin_num5 = 0;
int pin_num7 = 0;
int pin_num4 = 0;

void setup() {
  Serial.begin(9600);
  Serial.println("nmbDroid - Controller");
  Serial.flush();
}

void loop()
{
  Serial.flush();
  int ard_command = 0;

  char get_char = ' ';  //read serial

  // wait for incoming data
  if (Serial.available() < 1) return; // if serial empty, return to loop().

  // parse incoming command start flag 
  get_char = Serial.read(); // GET POS1
  if (get_char != START_CMD_CHAR) return; // if no command start flag, return to loop().

  // parse incoming command type
  ard_command = Serial.parseInt(); // GET POS2

  if (ard_command == CMD_CHANGE_DIRECTION){

    pin_num4 = Serial.parseInt();  // GET POS3
    pin_num5 = Serial.parseInt();  // GET POS4
    pin_num6 = Serial.parseInt();  // GET POS5
    pin_num7 = Serial.parseInt();  // GET POS6
    
    if (pin_num4 == PIN_LOW) pin_num4 = LOW;
    else if (pin_num4 == PIN_HIGH) pin_num4 = HIGH;
    else return; // error in pin value. return. 
    if (pin_num5 == PIN_LOW) pin_num5 = LOW;
    else if (pin_num5 == PIN_HIGH) pin_num5 = HIGH;
    else return; // error in pin value. return. 
    if (pin_num6 == PIN_LOW) pin_num6 = LOW;
    else if (pin_num6 == PIN_HIGH) pin_num6 = HIGH;
    else return; // error in pin value. return. 
    if (pin_num7 == PIN_LOW) pin_num7 = LOW;
    else if (pin_num7 == PIN_HIGH) pin_num7 = HIGH;
    else return; // error in pin value. return. 
    
    set_digitalwrite( 4,  pin_num4); //direction L
    set_digitalwrite( 5,  pin_num5); //on off Motor L
    set_digitalwrite( 6,  pin_num6); //on off Motor R 
    set_digitalwrite( 7,  pin_num7); //direction R
    count = count + 1;
    Serial.print(count);
    Serial.println(" - CHANGED COMMAND");
    return;
  }
}

//select the requested pin# for DigitalWrite action
void set_digitalwrite(int pin_num, int pin_value)
{
  switch (pin_num) {
  case 13:
    pinMode(13, OUTPUT);
    digitalWrite(13, pin_value);  
    break;
  case 12:
    pinMode(12, OUTPUT);
    digitalWrite(12, pin_value);   
    break;
  case 11:
    pinMode(11, OUTPUT);
    digitalWrite(11, pin_value);         
    break;
  case 10:
    pinMode(10, OUTPUT);
    digitalWrite(10, pin_value);         
    break;
  case 9:
    pinMode(9, OUTPUT);
    digitalWrite(9, pin_value);         
    break;
  case 8:
    pinMode(8, OUTPUT);
    digitalWrite(8, pin_value);         
    break;
  case 7:
    pinMode(7, OUTPUT);
    digitalWrite(7, pin_value);         
    break;
  case 6:
    pinMode(6, OUTPUT);
    digitalWrite(6, pin_value);         
    break;
  case 5:
    pinMode(5, OUTPUT);
    digitalWrite(5, pin_value); 
    break;
  case 4:
    pinMode(4, OUTPUT);
    digitalWrite(4, pin_value);         
    break;
  case 3:
    pinMode(3, OUTPUT);
    digitalWrite(3, pin_value);         
    break;
  case 2:
    pinMode(2, OUTPUT);
    digitalWrite(2, pin_value); 
    break;      
    // default: 
    // if nothing else matches, do the default
    // default is optional
  } 
}

