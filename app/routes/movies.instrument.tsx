import { P5CanvasInstance } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { useEffect, useState } from "react";
import { ClientOnly } from "remix-utils/client-only";

function sketch(p5: P5CanvasInstance, w: number, h: number) {
  let hValue = 120;
  let lValue = 0;
  let sValue = 0;
  let c = p5.color(`hsl(${hValue}, ${sValue}%, ${lValue}%)`);
  const inp = p5.createInput("    Click Here, Press Any Key");
  inp.size((w / 8) * 6, (h / 8) * 4);
  inp.style("background-color", "hsl(240, 10%, 5%)");
  inp.style("color", "white");
  inp.style("border", "1px solid gray");
  inp.style("outline", "none");

  p5.setup = () => {
    p5.createCanvas(0, 0);
    p5.noFill();
  };

  p5.draw = () => {
    inp.input(myInputEvent);
  };

  function mapToHSL(
    number: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ) {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function myInputEvent(this: any) {
    const pressedNumber = this.value().charCodeAt(this.value().length - 1);
    const ooga = Math.floor(mapToHSL(pressedNumber, 33, 127, 0, 359));

    c = p5.color(`hsl(${hValue}, ${sValue}%, ${lValue}%)`);

    hValue = ooga;
    sValue = Math.floor(Math.random() * (100 - 80) + 80);
    lValue = Math.floor(Math.random() * (60 - 40) + 40);
    inp.style("background-color", c);
    inp.style("color", "rgba(0, 0, 0, 0");
    inp.value(" ");
  }
}

export default function ColorBox() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sketchWrapper = (p5: P5CanvasInstance) => {
    sketch(p5, windowDimensions.width, windowDimensions.height);
  };

  return (
    <div className="max-h-full p-12 pb-3 text-center">
      <p className="text-justify pb-8 text-soft-white">
        The image instrument is a MIDI-controlled live video editing tool I
        built in Max MSP/Jitter. It can be used as a rhythm-oriented video
        editing software as well as for live performance with more traditional
        musical instruments. Each channel is assigned a different video, which
        can be modulated by various parameters and subsequently “played.” Here
        is a rudimentary, still-image only demo built for this website by Parker
        Jones (in P5.js) that gives an idea of what the image instrument can do.
        Click in the box and press any key on your keyboard.
      </p>
      <ClientOnly fallback={<div />}>
        {() => <NextReactP5Wrapper sketch={sketchWrapper} />}
      </ClientOnly>
    </div>
  );
}
