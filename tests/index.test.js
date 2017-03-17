'use strict';

const { expect } = require('chai'),
			Dymo = require('../lib');

describe('dymo library', () => {
	it('should get printers', (done) => {
		let dymo = new Dymo();
		dymo.getPrinters()
			.then((printersResponseText) => {
				expect(printersResponseText).to.not.be.undefined;
				expect(printersResponseText.length).to.be.greaterThan(0);
				done();
			});
	});

	it.skip('should print a label', (done) => {
		var labelXml = `<?xml version="1.0" encoding="utf-8"?>
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
										            <Font Family="Helvetica" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
										            <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
										          </Attributes>
										        </Element>
										        <Element>
										          <String>EST123</String>
										          <Attributes>
										            <Font Family="Helvetica" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
										            <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
										          </Attributes>
										        </Element>
										      </StyledText>
										    </TextObject>
										    <Bounds X="335.9998" Y="57.6001" Width="5337.6" Height="3192"/>
										  </ObjectInfo>
										</DieCutLabel>`;
		let dymo = new Dymo();
		dymo.print('DYMO LabelWriter 450', labelXml)
		.then((result) => {
		  console.log(result);
		  done();
    })
		.catch((err) => {
			done(err);
			throw err;
		});
		
	});
});