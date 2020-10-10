# dymojs

[![Build Status](https://travis-ci.org/dsandor/dymojs.svg?branch=master)](https://travis-ci.org/dsandor/dymojs)

#### Wicked simple pure javascript cross platform Dymo Labewriter printing module for Node.js with no platform dependencies.

This module works on **Mac**, **Linux**, and **Windows**.
 
 - no `gyp` build needed
 - no `Microsoft Visual Studio` needed.
 - no `gcc` or `c++` build needed 

### install

```
yarn add dymojs
```

or if you are stuck in the old school

```
npm i dymojs
```

### usage

```
const Dymo = require('dymojs'),
	   dymo = new Dymo();

dymo.print('DYMO LabelWriter 450', labelXml);
```

render a label preview

```
dymo.renderLabel(labelXml).then(imageData => {
	// returns imageData as base64 encoded png.
	// use <img src="data:image/png;base64,${imageData}"/>
	// or require("fs").writeFile("out.png", imageData, 'base64', function(err) {...});
});
```

### how do I get the xml for a label?
Open the free `DYMO Label` software and design a label.  When you have designed one save it.  The file it saves is an XML document like the one below.  Simply pass that XML or (hint hint) a version of that XML that you did some string replacement on to the print function with a printer name and you are printing labels.

### working example that prints a test label
This example will print TEST123 on a shipping size label (2 1/8" x 4") to a printer named 'DYMO LabelWriter 450'. 

```
const Dymo = require('dymojs'),
	   dymo = new Dymo();

dymo.print('DYMO LabelWriter 450', labelXml);

var labelXml = `
<?xml version="1.0" encoding="utf-8"?>
<DieCutLabel Version="8.0" Units="twips">
  <PaperOrientation>Landscape</PaperOrientation>
  <Id>LargeShipping</Id>
  <PaperName>30256 Shipping</PaperName>
  <DrawCommands>
    <RoundRectangle X="0" Y="0" Width="3331" Height="5715" Rx="270" Ry="270"/>
  </DrawCommands>
  <ObjectInfo>
    <TextObject>
      <Name>TEXT</Name>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
      <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
      <LinkedObjectName></LinkedObjectName>
      <Rotation>Rotation0</Rotation>
      <IsMirrored>False</IsMirrored>
      <IsVariable>False</IsVariable>
      <HorizontalAlignment>Left</HorizontalAlignment>
      <VerticalAlignment>Middle</VerticalAlignment>
      <TextFitMode>AlwaysFit</TextFitMode>
      <UseFullFontHeight>True</UseFullFontHeight>
      <Verticalized>False</Verticalized>
      <StyledText>
        <Element>
          <String>T</String>
          <Attributes>
            <Font Family="Helvetica" Size="13" 
            	Bold="False" Italic="False" Underline="False" Strikeout="False"/>
            <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
          </Attributes>
        </Element>
        <Element>
          <String>EST123</String>
          <Attributes>
            <Font Family="Helvetica" Size="13" 
            	Bold="False" Italic="False" Underline="False" Strikeout="False"/>
            <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
          </Attributes>
        </Element>
      </StyledText>
    </TextObject>
    <Bounds X="335.9998" Y="57.6001" Width="5337.6" Height="3192"/>
  </ObjectInfo>
</DieCutLabel>
`;
```
										
