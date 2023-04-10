#include "Adafruit_Thermal.h"
#include "adalogo.h"
#include "adaqrcode.h"
#include "lastimage.h"

#include "SoftwareSerial.h"
#define TX_PIN 6 // Arduino transmit  YELLOW WIRE  labeled RX on printer
#define RX_PIN 5 // Arduino receive   GREEN WIRE   labeled TX on printer

SoftwareSerial mySerial(RX_PIN, TX_PIN); // Declare SoftwareSerial obj first
Adafruit_Thermal printer(&mySerial);     // Pass addr to printer constructor

void setup() {
  pinMode(7, OUTPUT); digitalWrite(7, LOW);

  mySerial.begin(19200);  // Initialize SoftwareSerial
  //Serial1.begin(19200); // Use this instead if using hardware serial
  printer.begin();        // Init printer (same regardless of serial type)

  // Font options
  printer.setFont('A');

  printer.inverseOff();
  printer.doubleHeightOff();

  // Set text justification (right, center, left) -- accepts 'L', 'C', 'R'
  printer.justify('R');

  printer.setSize('S');

  printer.setLineHeight(); // Reset to default

  // Barcode examples:
  // CODE39 is the most common alphanumeric barcode:
  printer.printBarcode("ADAFRUT", CODE39);
  printer.setBarcodeHeight(100);
  // Print UPC line on product barcodes:
  printer.printBarcode("123456789123", UPC_A);

  // Print the bitmap:
  printer.printBitmap(lastimage_width, lastimage_height, lastimage_data);
  printer.println("FontA (caption goes here)");
  printer.feed(2);

  printer.sleep();      // Tell printer to sleep
  delay(3000L);         // Sleep for 3 seconds
  printer.wake();       // MUST wake() before printing again, even if reset
  printer.setDefault(); // Restore printer to defaults
}

void loop() {
}