import { useState } from "react";
import svgPaths from "./svg-63y8z7pj7c";

function Paragraph() {
  return (
    <div className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] h-[27px] leading-[0] relative shrink-0 w-[328.81px]" data-name="Paragraph">
      <div className="-translate-y-1/2 absolute flex flex-col justify-center left-0 text-[#1a1a1a] text-[18px] top-[13px] w-[244.106px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[27px]">{`Urban Upgrade Drivers — Singapore `}</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col justify-center left-[248.69px] text-[#9a9a9a] text-[11px] top-[14.5px] w-[80.126px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">· updated 1d ago</p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="SVG">
          <path d={svgPaths.p1e6cd100} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeWidth="1.08333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex gap-[6px] items-center px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Svg />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[11.4px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Defined by</p>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p21c5cc80} id="Vector" stroke="var(--stroke-0, #1A1A1A)" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-white content-stretch flex gap-[6px] items-center px-[13px] py-[8px] relative rounded-[8px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Svg1 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Export</p>
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p36e99600} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-[#6b3c72] content-stretch flex gap-[6px] items-center px-[13px] py-[8px] relative rounded-[8px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#6b3c72] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Svg2 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">
        <p className="leading-[18px]">Ask Lumos</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Button />
      <BackgroundBorder2 />
      <BackgroundBorder3 />
    </div>
  );
}

function Margin() {
  return (
    <div className="flex-[1_0_0] min-w-[300.04998779296875px] relative" data-name="Margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[315.141px] relative size-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.999px] items-center relative size-full">
        <Paragraph />
        <Margin />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.6px] uppercase w-full">
          <p className="leading-[15px]">Audience size</p>
        </div>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-[#e7f3ec] content-stretch flex items-center left-[50.81px] px-[6px] py-[2px] rounded-[999px] top-[6px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2f7d4f] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">▲ +8% vs Q4</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[25px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#1a1a1a] text-[21px] top-[11.5px] w-[43.131px]">
          <p className="leading-[23.1px]">387k</p>
        </div>
        <Background />
      </div>
    </div>
  );
}

function VerticalBorder() {
  return (
    <div className="relative self-stretch shrink-0 w-[238.75px]" data-name="VerticalBorder">
      <div aria-hidden className="absolute border-[#e5e5e2] border-r border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3px] items-start pl-[14px] pr-[15px] py-[10px] relative size-full">
        <Container4 />
        <Container5 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.6px] uppercase w-full">
          <p className="leading-[15px]">Median travel</p>
        </div>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="absolute bg-[#f3f3f1] content-stretch flex items-center left-[58.88px] px-[6px] py-[2px] rounded-[999px] top-[6px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">▲ +1.1km</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[25px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#1a1a1a] text-[21px] top-[11.5px] w-[51.157px]">
          <p className="leading-[23.1px]">14.2km</p>
        </div>
        <Background1 />
      </div>
    </div>
  );
}

function VerticalBorder1() {
  return (
    <div className="relative self-stretch shrink-0 w-[238.75px]" data-name="VerticalBorder">
      <div aria-hidden className="absolute border-[#e5e5e2] border-r border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3px] items-start pl-[14px] pr-[15px] py-[10px] relative size-full">
        <Container6 />
        <Container7 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.6px] uppercase w-full">
          <p className="leading-[15px]">Top postcode</p>
        </div>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="absolute bg-[#f1e9ff] content-stretch flex items-center left-[58.11px] px-[7px] py-[2px] rounded-[999px] top-[6px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">3.8×</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[25px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#1a1a1a] text-[21px] top-[11.5px] w-[51.143px]">
          <p className="leading-[23.1px]">259xxx</p>
        </div>
        <Background2 />
      </div>
    </div>
  );
}

function VerticalBorder2() {
  return (
    <div className="relative self-stretch shrink-0 w-[238.75px]" data-name="VerticalBorder">
      <div aria-hidden className="absolute border-[#e5e5e2] border-r border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3px] items-start pl-[14px] pr-[15px] py-[10px] relative size-full">
        <Container8 />
        <Container9 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.6px] uppercase w-full">
        <p className="leading-[15px]">Distinctive</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="absolute bg-[#f1e9ff] content-stretch flex items-center left-[48.58px] px-[7px] py-[2px] rounded-[999px] top-[6px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">own 3yr+</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[25px] relative shrink-0 w-full" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#1a1a1a] text-[21px] top-[11.5px] w-[41.12px]">
        <p className="leading-[23.1px]">62%</p>
      </div>
      <Background3 />
    </div>
  );
}

function Container10() {
  return (
    <div className="relative self-stretch shrink-0 w-[237.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3px] items-start px-[14px] py-[10px] relative size-full">
        <Container11 />
        <Container12 />
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Border">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <VerticalBorder />
        <VerticalBorder1 />
        <VerticalBorder2 />
        <Container10 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-[27px] pt-[15px] px-[17px] relative size-full">
        <Container2 />
        <Border />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] min-w-px relative rounded-[9px] self-stretch" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center p-[10px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[13px] text-center whitespace-nowrap">
            <p className="leading-[19.5px]">Audience Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#f1e9ff] flex-[1_0_0] min-w-px relative rounded-[9px] self-stretch" data-name="Background">
      <div className="flex flex-col items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center p-[10px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[13px] text-center whitespace-nowrap">
            <p className="leading-[19.5px]">{`Mobility & Movement`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="flex-[1_0_0] min-w-px relative rounded-[9px] self-stretch" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center p-[10px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[13px] text-center whitespace-nowrap">
            <p className="leading-[19.5px]">{`Temporal & Seasonal`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="flex-[1_0_0] min-w-px relative rounded-[9px] self-stretch" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center p-[10px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[13px] text-center whitespace-nowrap">
            <p className="leading-[19.5px]">Digital Twin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="bg-white h-[50px] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-start justify-center p-[5px] relative size-full">
          <Container13 />
          <Background4 />
          <Container14 />
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[9px] tracking-[0.54px] uppercase whitespace-nowrap">
          <p className="leading-[13.5px]">Date</p>
        </div>
      </div>
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="SVG">
          <path d={svgPaths.pa029e20} id="Vector" stroke="var(--stroke-0, #9A9A9A)" strokeWidth="1.08333" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="-translate-y-1/2 absolute bg-white content-stretch flex gap-[9px] items-center left-0 px-[13px] py-[8px] rounded-[10px] top-[calc(50%+6.5px)]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container17 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">Jan–Mar 2026</p>
      </div>
      <Svg3 />
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[9px] tracking-[0.54px] uppercase whitespace-nowrap">
          <p className="leading-[13.5px]">Geography</p>
        </div>
      </div>
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="SVG">
          <path d={svgPaths.pa029e20} id="Vector" stroke="var(--stroke-0, #9A9A9A)" strokeWidth="1.08333" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder6() {
  return (
    <div className="-translate-y-1/2 absolute bg-white content-stretch flex gap-[9px] items-center left-[169.42px] px-[13px] py-[8px] rounded-[10px] top-[calc(50%+6.5px)]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container18 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Singapore</p>
      </div>
      <Svg4 />
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[9px] tracking-[0.54px] uppercase whitespace-nowrap">
          <p className="leading-[13.5px]">Indexed vs</p>
        </div>
      </div>
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="SVG">
          <path d={svgPaths.pa029e20} id="Vector" stroke="var(--stroke-0, #9A9A9A)" strokeWidth="1.08333" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder7() {
  return (
    <div className="-translate-y-1/2 absolute bg-white content-stretch flex gap-[9px] items-center left-[387.23px] px-[13px] py-[8px] rounded-[10px] top-[calc(50%+6.5px)]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container19 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Metro average</p>
      </div>
      <Svg5 />
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="SVG">
          <path d={svgPaths.p2f97fc0} id="Vector" stroke="var(--stroke-0, #6B3C72)" strokeWidth="1.08333" />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="opacity-70 relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[9px] tracking-[0.54px] uppercase whitespace-nowrap">
          <p className="leading-[13.5px]">Compare</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder8() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#f1e9ff] content-stretch flex gap-[9px] items-center left-[584.47px] px-[13px] py-[8px] rounded-[10px] top-[calc(50%+6.5px)]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#bebde7] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Svg6 />
      <Container20 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">vs same period last year</p>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#f1e9ff] relative self-stretch shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[7.5px] pt-[6px] px-[12px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[11px] whitespace-nowrap">
          <p className="leading-[16.5px]">Index</p>
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[7.5px] pt-[6px] px-[12px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[11px] whitespace-nowrap">
          <p className="leading-[16.5px]">%</p>
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[7.5px] pt-[6px] px-[12px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[11px] whitespace-nowrap">
          <p className="leading-[16.5px]">Count</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder9() {
  return (
    <div className="-translate-y-1/2 absolute bg-white h-[32.5px] left-[853.72px] rounded-[9px] top-[calc(50%+6.5px)]" data-name="Background+Border">
      <div className="content-stretch flex items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Background5 />
        <Container21 />
        <Container22 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[9px]" />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[59px] relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder5 />
      <BackgroundBorder6 />
      <BackgroundBorder7 />
      <BackgroundBorder8 />
      <BackgroundBorder9 />
    </div>
  );
}

function Svg7() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p26c02ef0} id="Vector" stroke="var(--stroke-0, #6B3C72)" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Svg7 />
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] tracking-[1.2px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[15px]">Takeaway · where they are</p>
        </div>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="max-w-[807.8389892578125px] relative shrink-0 w-[807.83px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] pt-[1.2px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[20px] whitespace-nowrap">
          <p className="leading-[26px]">Home origins concentrate in central and eastern Singapore, with longer median travel distances reflecting car-dependent commute patterns.</p>
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="max-w-[652.3930053710938px] relative shrink-0 w-[652.39px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] pb-[7.795px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="mb-0">
            <span className="leading-[20.8px]">{`Home origins concentrate in `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              Buona Vista, Bishan and Tampines
            </span>
            <span className="leading-[20.8px]">{`, over-indexing up to `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              3.8×
            </span>
            <span className="leading-[20.8px]">, and the same</span>
          </p>
          <p className="mb-0">
            <span className="leading-[20.8px]">{`postcodes lead their spend. `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              42%
            </span>
            <span className="leading-[20.8px]">{` reached weekly (1.6×). Median travel distance is `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              14.2km
            </span>
            <span className="leading-[20.8px]">;</span>
          </p>
          <p>
            <span className="leading-[20.8px]">{`the 90th percentile is `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              52km
            </span>
            <span className="leading-[20.8px]">.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[18px] whitespace-nowrap">
        <p className="leading-[27px]">14.2km</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Median travel</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="relative self-stretch shrink-0 w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container27 />
        <Container28 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[18px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[27px]">3.8×</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Top postcode</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="relative self-stretch shrink-0 w-[75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container30 />
        <Container31 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[18px] whitespace-nowrap">
        <p className="leading-[27px]">42%</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Weekly reach</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="relative self-stretch shrink-0 w-[97px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container33 />
        <Container34 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[18px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[27px]">1.9×</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Best panel index</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="relative self-stretch shrink-0 w-[93px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container36 />
        <Container37 />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="h-[59px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[#bebde7] border-dashed border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-wrap gap-[0px_26px] items-start pt-[15px] relative size-full">
        <Container26 />
        <Container29 />
        <Container32 />
        <Container35 />
      </div>
    </div>
  );
}

function Svg8() {
  return (
    <div className="-translate-y-1/2 absolute left-0 size-[13px] top-1/2" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="SVG">
          <path d={svgPaths.p3b202300} id="Vector" stroke="var(--stroke-0, #6B3C72)" strokeWidth="1.08333" />
        </g>
      </svg>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[73.45px]" data-name="Container">
      <Svg8 />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-[19px] not-italic text-[#6b3c72] text-[11px] top-[calc(50%-0.75px)] w-[55.162px]">
        <p className="leading-[16.5px]">Regenerate</p>
      </div>
    </div>
  );
}

function Svg9() {
  return (
    <div className="-translate-y-1/2 absolute left-0 size-[13px] top-1/2" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="SVG">
          <path d={svgPaths.p28dcf070} id="Vector" stroke="var(--stroke-0, #6B3C72)" strokeWidth="1.08333" />
        </g>
      </svg>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[94.27px]" data-name="Container">
      <Svg9 />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-[19px] not-italic text-[#6b3c72] text-[11px] top-[calc(50%-0.75px)] w-[76.112px]">
        <p className="leading-[16.5px]">Ask a follow-up</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14px] items-center pt-[5.2px] relative size-full">
        <Container39 />
        <Container40 />
      </div>
    </div>
  );
}

function BackgroundBorder10() {
  return (
    <div className="bg-gradient-to-b from-[#f7f1ff] relative rounded-[14px] shrink-0 to-[#fbfaff] w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#bebde7] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[7.8px] items-start pb-[19px] pt-[33px] px-[21px] relative size-full">
        <Container23 />
        <Container24 />
        <Container25 />
        <HorizontalBorder />
        <Container38 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">Where they live</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Symbols:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">Density of home origins · top over-indexing postcodes · hover → segment mix</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[370px]" data-name="Container">
      <Container44 />
      <Container45 />
    </div>
  );
}

function Svg10() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="SVG">
          <path d={svgPaths.p3e661000} id="Vector" stroke="var(--stroke-0, #6B3C72)" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder11() {
  return (
    <div className="bg-[#f1e9ff] content-stretch flex gap-[5px] h-[24px] items-center pb-[5px] pt-[4px] px-[10px] relative rounded-[7px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#bebde7] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg10 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[10px] tracking-[0.2px] whitespace-nowrap">
        <p className="leading-[15px]">Ask</p>
      </div>
    </div>
  );
}

function Svg11() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="SVG">
          <path d={svgPaths.p145a2600} id="Vector" stroke="var(--stroke-0, #9A9A9A)" strokeWidth="1.08333" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder12() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg11 />
    </div>
  );
}

function Svg12() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="SVG">
          <path d={svgPaths.p14acbe40} id="Vector" stroke="var(--stroke-0, #9A9A9A)" strokeWidth="1.08333" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder13() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg12 />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <BackgroundBorder11 />
      <BackgroundBorder12 />
      <BackgroundBorder13 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="flex-[1_0_0] min-w-[109.37999725341797px] relative" data-name="Margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[467.859px] relative size-full">
          <Container46 />
        </div>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8.001px] items-start relative size-full">
        <Container43 />
        <Margin1 />
      </div>
    </div>
  );
}

function Svg13() {
  return (
    <div className="absolute inset-[1px_0.69px_1px_1px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 692.48 197.999">
        <g clipPath="url(#clip0_10012_16277)" id="SVG">
          <path d="M0 83.1594L692.48 75.2394" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.1" strokeWidth="3.9509" />
          <path d="M332.39 0L367.014 197.999" id="Vector_2" stroke="var(--stroke-0, white)" strokeOpacity="0.1" strokeWidth="3.9509" />
          <path d="M0 130.679L692.48 138.599" id="Vector_3" stroke="var(--stroke-0, white)" strokeOpacity="0.07" strokeWidth="3.29242" />
          <path d={svgPaths.p1392ff80} fill="var(--fill-0, #7896AF)" fillOpacity="0.16" id="Vector_4" />
          <path d={svgPaths.p32b8db80} fill="var(--fill-0, #9A6BA1)" id="Vector_5" stroke="var(--stroke-0, white)" strokeOpacity="0.22" strokeWidth="1.31697" />
          <path d={svgPaths.p758700} fill="var(--fill-0, #6B3C72)" id="Vector_6" stroke="var(--stroke-0, white)" strokeOpacity="0.22" strokeWidth="1.31697" />
          <path d={svgPaths.p34f49800} fill="var(--fill-0, #CDB6D2)" id="Vector_7" stroke="var(--stroke-0, white)" strokeOpacity="0.22" strokeWidth="1.31697" />
          <path d={svgPaths.p39bc5600} fill="var(--fill-0, #B890BD)" id="Vector_8" stroke="var(--stroke-0, white)" strokeOpacity="0.22" strokeWidth="1.31697" />
          <path d={svgPaths.pbae8c40} fill="var(--fill-0, #6B3C72)" id="Vector_9" stroke="var(--stroke-0, white)" strokeOpacity="0.22" strokeWidth="1.31697" />
          <path d={svgPaths.pf0a5400} fill="var(--fill-0, #D8C6DC)" id="Vector_10" stroke="var(--stroke-0, white)" strokeOpacity="0.22" strokeWidth="1.31697" />
          <path d={svgPaths.p2a414000} fill="var(--fill-0, #EFE7F1)" id="Vector_11" stroke="var(--stroke-0, white)" strokeOpacity="0.22" strokeWidth="1.31697" />
        </g>
        <defs>
          <clipPath id="clip0_10012_16277">
            <rect fill="white" height="197.999" width="692.48" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[43.06%_40.51%_49.44%_49%] items-start" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.45)] tracking-[0.4px] whitespace-nowrap">
        <p className="leading-[15px]">SINGAPORE</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start py-px relative shrink-0" data-name="Margin">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[8px] text-[rgba(255,255,255,0.55)] whitespace-nowrap">
        <p className="leading-[12px]">High</p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start py-px relative shrink-0" data-name="Margin">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[8px] text-[rgba(255,255,255,0.55)] whitespace-nowrap">
        <p className="leading-[12px]">Low</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute content-stretch flex flex-col items-center right-[8.19px] top-[9px]" data-name="Container">
      <Margin2 />
      <div className="bg-[#6b3c72] h-[11px] relative shrink-0 w-[12px]" data-name="Background" />
      <div className="bg-[#9a6ba1] h-[11px] relative shrink-0 w-[12px]" data-name="Background" />
      <div className="bg-[#b890bd] h-[11px] relative shrink-0 w-[12px]" data-name="Background" />
      <div className="bg-[#d8c6dc] h-[11px] relative shrink-0 w-[12px]" data-name="Background" />
      <div className="bg-[#efe7f1] h-[11px] relative shrink-0 w-[12px]" data-name="Background" />
      <Margin3 />
    </div>
  );
}

function Background6() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.94)] bottom-[9px] content-stretch flex flex-col items-start px-[8px] py-[4px] right-[8.48px] rounded-[7px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Symbols:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p>
          <span className="leading-[15px]">{`Hover 308xxx → `}</span>
          <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Symbols:Regular',sans-serif] leading-[15px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
            38% Premium Drivers · 24% Young Pros
          </span>
        </p>
      </div>
    </div>
  );
}

function BackgroundBorder14() {
  return (
    <div className="bg-[#23262f] col-1 h-[200px] justify-self-stretch relative rounded-[10px] row-1 shrink-0" data-name="Background+Border">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Svg13 />
        <Container48 />
        <Container49 />
        <Background6 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[1px] uppercase w-full">
        <p className="leading-[15px]">Top over-indexing postcodes</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">259xxx Buona Vista</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">3.8×</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container55 />
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#f3f3f1] col-2 content-stretch flex flex-col h-[16px] items-start justify-center justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="bg-[#6b3c72] flex-[1_0_0] min-h-px relative rounded-[6px] w-full" data-name="Background" />
    </div>
  );
}

function Container52() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___120px_minmax(0,1fr)_48px] grid-rows-[_18px] h-[19px] pt-px relative shrink-0 w-full" data-name="Container">
      <Container53 />
      <Container54 />
      <Background7 />
    </div>
  );
}

function Container57() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">308xxx Bishan</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">3.4×</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container59 />
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#6b3c72] inset-[0_10%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container56() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___120px_minmax(0,1fr)_48px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container57 />
      <Container58 />
      <Background8 />
    </div>
  );
}

function Container61() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">529xxx Tampines</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">3.1×</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container63 />
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_22%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container60() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___120px_minmax(0,1fr)_48px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container61 />
      <Container62 />
      <Background9 />
    </div>
  );
}

function Container65() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">738xxx Woodlands</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">2.8×</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container67 />
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_29%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container64() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___120px_minmax(0,1fr)_48px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container65 />
      <Container66 />
      <Background10 />
    </div>
  );
}

function Container69() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">520xxx Ang Mo Kio</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">2.6×</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container71 />
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_36%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container68() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___120px_minmax(0,1fr)_48px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container69 />
      <Container70 />
      <Background11 />
    </div>
  );
}

function Container50() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[9px] items-start justify-self-stretch pb-[47px] pt-[2px] relative row-1 self-start shrink-0" data-name="Container">
      <Container51 />
      <Container52 />
      <Container56 />
      <Container60 />
      <Container64 />
      <Container68 />
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[200px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[14px] gap-y-[14px] grid grid-cols-[__minmax(0,1.40fr)_minmax(0,1fr)] grid-rows-[_200px] relative size-full">
        <BackgroundBorder14 />
        <Container50 />
      </div>
    </div>
  );
}

function Svg14() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="SVG">
          <path d={svgPaths.p124e7000} id="Vector" stroke="var(--stroke-0, #6B3C72)" />
        </g>
      </svg>
    </div>
  );
}

function Container72() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Svg14 />
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[9px] tracking-[1.08px] uppercase whitespace-nowrap">
          <p className="leading-[13.5px]">Takeaway</p>
        </div>
      </div>
    </div>
  );
}

// First takeaway point — residential concentration (unchanged copy).
function TakeawayBullet1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="point">
      <div className="font-['Jua:Regular',sans-serif] leading-[18.6px] text-[#6b3c72] text-[12px] shrink-0">•</div>
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] w-full" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18.6px]">
          <span>{`Five residential towns carry most of the audience — `}</span>
          <span className="text-[#6b3c72]">259xxx (3.8×)</span>
          <span>{`, `}</span>
          <span className="text-[#6b3c72]">308xxx (3.4×)</span>
          <span>{`, `}</span>
          <span className="text-[#6b3c72]">529xxx (3.1×)</span>
          <span>{`, `}</span>
          <span className="text-[#6b3c72]">738xxx (2.8×)</span>
          <span>{` and `}</span>
          <span className="text-[#6b3c72]">520xxx (2.6×)</span>
          <span>.</span>
        </p>
      </div>
    </div>
  );
}

// Second takeaway point — the mode + weekday/weekend difference.
function TakeawayBullet2() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="point">
      <div className="font-['Jua:Regular',sans-serif] leading-[18.6px] text-[#6b3c72] text-[12px] shrink-0">•</div>
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] w-full" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18.6px]">
          <span>{`Daytime pulls to the `}</span>
          <span className="text-[#6b3c72]">{`CBD & one-north`}</span>
          <span>{`, while weekend spend spreads to `}</span>
          <span className="text-[#6b3c72]">{`Orchard & lifestyle malls`}</span>
          <span>{` — home, work and play split across three zones.`}</span>
        </p>
      </div>
    </div>
  );
}

// Mode (Residential / Daytime / Transaction) + day-part (Weekday / Weekend) switchers.
function SegPill({ label, active, onClick }: { label: string; active: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center rounded-[6px] px-[12px] py-[5px] transition-colors ${active ? 'bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.06)]' : 'hover:bg-[#ececea]'}`}
    >
      <span className={`font-['Jua:Regular',sans-serif] text-[12px] leading-[16px] whitespace-nowrap ${active ? 'text-[#6b3c72]' : 'text-[#6b6b6b]'}`}>{label}</span>
    </button>
  );
}

function ModeSwitchers({ whereMode, setWhereMode, dayType, setDayType }: { whereMode: GeoModeKey; setWhereMode: (m: GeoModeKey) => void; dayType: DayKey; setDayType: (d: DayKey) => void }) {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-between relative shrink-0 w-full" data-name="Mode + day-part controls">
      <div className="flex gap-[2px] items-center bg-[#f3f3f1] rounded-[8px] p-[3px] shrink-0">
        {(['Residential', 'Daytime', 'Transaction'] as GeoModeKey[]).map((m) => (
          <SegPill key={m} label={m} active={whereMode === m} onClick={() => setWhereMode(m)} />
        ))}
      </div>
      <div className="flex gap-[2px] items-center bg-[#f3f3f1] rounded-[8px] p-[3px] shrink-0">
        {(['Weekday', 'Weekend'] as DayKey[]).map((d) => (
          <SegPill key={d} label={d} active={dayType === d} onClick={() => setDayType(d)} />
        ))}
      </div>
    </div>
  );
}

// ── Interactive geo data ────────────────────────────────────────────────────
// Mirrors the Data-Explorer sidebar: switching mode / day-part swaps the heatmap
// fills, hover chip and top postcodes. The blob SHAPES stay fixed (same as the
// sidebar) — only the data driving them changes.
type GeoModeKey = 'Residential' | 'Daytime' | 'Transaction';
type DayKey = 'Weekday' | 'Weekend';
type GeoView = {
  fills: string[]; // 7 colours, one per heat blob (light = low density, dark = high)
  hover: { code: string; mix: string };
  postLabel: string;
  postcodes: { code: string; place: string; idx: string; w: number }[];
};

const HEAT_PATHS = [
  svgPaths.p32b8db80, svgPaths.p758700, svgPaths.p34f49800,
  svgPaths.p39bc5600, svgPaths.pbae8c40, svgPaths.pf0a5400, svgPaths.p2a414000,
];

const GEO_UUD: Record<GeoModeKey, Record<DayKey, GeoView>> = {
  Residential: {
    Weekday: {
      fills: ['#9A6BA1', '#6B3C72', '#CDB6D2', '#B890BD', '#6B3C72', '#D8C6DC', '#EFE7F1'],
      hover: { code: '308xxx', mix: '38% Premium Drivers · 24% Young Pros' },
      postLabel: 'Top home postcodes',
      postcodes: [
        { code: '259xxx', place: 'Buona Vista', idx: '3.8×', w: 1.0 },
        { code: '308xxx', place: 'Bishan', idx: '3.4×', w: 0.9 },
        { code: '529xxx', place: 'Tampines', idx: '3.1×', w: 0.82 },
        { code: '738xxx', place: 'Woodlands', idx: '2.8×', w: 0.74 },
        { code: '520xxx', place: 'Ang Mo Kio', idx: '2.6×', w: 0.68 },
      ],
    },
    Weekend: {
      fills: ['#B890BD', '#6B3C72', '#9A6BA1', '#CDB6D2', '#6B3C72', '#EFE7F1', '#D8C6DC'],
      hover: { code: '308xxx', mix: '41% Families · 22% Premium Drivers' },
      postLabel: 'Top home postcodes',
      postcodes: [
        { code: '308xxx', place: 'Bishan', idx: '3.6×', w: 1.0 },
        { code: '529xxx', place: 'Tampines', idx: '3.3×', w: 0.9 },
        { code: '259xxx', place: 'Buona Vista', idx: '3.0×', w: 0.8 },
        { code: '820xxx', place: 'Punggol', idx: '2.7×', w: 0.72 },
        { code: '738xxx', place: 'Woodlands', idx: '2.5×', w: 0.66 },
      ],
    },
  },
  Daytime: {
    Weekday: {
      fills: ['#6B3C72', '#9A6BA1', '#6B3C72', '#D8C6DC', '#B890BD', '#CDB6D2', '#EFE7F1'],
      hover: { code: '048xxx', mix: '52% Office workers · 19% Premium Drivers' },
      postLabel: 'Top daytime postcodes',
      postcodes: [
        { code: '048xxx', place: 'Raffles Place', idx: '4.1×', w: 1.0 },
        { code: '138xxx', place: 'one-north', idx: '3.6×', w: 0.88 },
        { code: '018xxx', place: 'Marina Bay', idx: '3.2×', w: 0.78 },
        { code: '088xxx', place: 'Tanjong Pagar', idx: '2.9×', w: 0.71 },
        { code: '486xxx', place: 'Changi Business', idx: '2.5×', w: 0.61 },
      ],
    },
    Weekend: {
      fills: ['#9A6BA1', '#B890BD', '#6B3C72', '#6B3C72', '#CDB6D2', '#D8C6DC', '#EFE7F1'],
      hover: { code: '238xxx', mix: '44% Shoppers · 21% Visitors' },
      postLabel: 'Top daytime postcodes',
      postcodes: [
        { code: '238xxx', place: 'Orchard', idx: '3.4×', w: 1.0 },
        { code: '138xxx', place: 'one-north', idx: '2.8×', w: 0.82 },
        { code: '600xxx', place: 'Jurong East', idx: '2.6×', w: 0.76 },
        { code: '018xxx', place: 'Marina Bay', idx: '2.4×', w: 0.71 },
        { code: '529xxx', place: 'Tampines', idx: '2.2×', w: 0.65 },
      ],
    },
  },
  Transaction: {
    Weekday: {
      fills: ['#6B3C72', '#CDB6D2', '#9A6BA1', '#B890BD', '#6B3C72', '#EFE7F1', '#D8C6DC'],
      hover: { code: '238xxx', mix: '36% Premium retail · 27% Dining' },
      postLabel: 'Top spend postcodes',
      postcodes: [
        { code: '238xxx', place: 'Orchard', idx: '3.9×', w: 1.0 },
        { code: '308xxx', place: 'Bishan', idx: '3.1×', w: 0.79 },
        { code: '048xxx', place: 'Raffles Place', idx: '2.9×', w: 0.74 },
        { code: '529xxx', place: 'Tampines', idx: '2.7×', w: 0.69 },
        { code: '259xxx', place: 'Buona Vista', idx: '2.5×', w: 0.64 },
      ],
    },
    Weekend: {
      fills: ['#6B3C72', '#6B3C72', '#B890BD', '#9A6BA1', '#D8C6DC', '#CDB6D2', '#EFE7F1'],
      hover: { code: '238xxx', mix: '48% Weekend leisure · 23% Families' },
      postLabel: 'Top spend postcodes',
      postcodes: [
        { code: '238xxx', place: 'Orchard', idx: '4.2×', w: 1.0 },
        { code: '098xxx', place: 'HarbourFront', idx: '3.5×', w: 0.83 },
        { code: '529xxx', place: 'Tampines', idx: '3.2×', w: 0.76 },
        { code: '600xxx', place: 'Jurong East', idx: '2.9×', w: 0.69 },
        { code: '308xxx', place: 'Bishan', idx: '2.6×', w: 0.62 },
      ],
    },
  },
};

// Dark heatmap — fixed blob shapes, fills driven by the active view (like the sidebar).
function MapHeat({ view, caption }: { view: GeoView; caption: string }) {
  return (
    <div className="bg-[#23262f] col-1 h-[200px] justify-self-stretch relative rounded-[10px] row-1 shrink-0" data-name="Background+Border">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[1px_0.69px_1px_1px]" data-name="SVG">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 692.48 197.999">
            <g clipPath="url(#clip_heat)">
              <path d="M0 83.1594L692.48 75.2394" stroke="white" strokeOpacity="0.1" strokeWidth="3.9509" />
              <path d="M332.39 0L367.014 197.999" stroke="white" strokeOpacity="0.1" strokeWidth="3.9509" />
              <path d="M0 130.679L692.48 138.599" stroke="white" strokeOpacity="0.07" strokeWidth="3.29242" />
              <path d={svgPaths.p1392ff80} fill="#7896AF" fillOpacity="0.16" />
              {HEAT_PATHS.map((d, i) => (
                <path key={i} d={d} fill={view.fills[i]} stroke="white" strokeOpacity="0.22" strokeWidth="1.31697" style={{ transition: 'fill 240ms ease' }} />
              ))}
            </g>
            <defs>
              <clipPath id="clip_heat"><rect fill="white" height="197.999" width="692.48" /></clipPath>
            </defs>
          </svg>
        </div>
        <div className="absolute left-[10px] top-[8px] font-['Jua:Regular',sans-serif] text-[9.5px] tracking-[0.6px] uppercase text-[rgba(255,255,255,0.5)] leading-[15px]">{caption}</div>
        <div className="absolute content-stretch flex flex-col inset-[43.06%_40.51%_49.44%_49%] items-start">
          <div className="font-['Jua:Regular',sans-serif] text-[10px] text-[rgba(255,255,255,0.45)] tracking-[0.4px] leading-[15px] whitespace-nowrap">SINGAPORE</div>
        </div>
        <div className="absolute content-stretch flex flex-col items-center right-[8.19px] top-[9px]">
          <div className="font-['Jua:Regular',sans-serif] text-[8px] text-[rgba(255,255,255,0.55)] leading-[12px] py-px">High</div>
          <div className="bg-[#6b3c72] h-[11px] w-[12px]" />
          <div className="bg-[#9a6ba1] h-[11px] w-[12px]" />
          <div className="bg-[#b890bd] h-[11px] w-[12px]" />
          <div className="bg-[#d8c6dc] h-[11px] w-[12px]" />
          <div className="bg-[#efe7f1] h-[11px] w-[12px]" />
          <div className="font-['Jua:Regular',sans-serif] text-[8px] text-[rgba(255,255,255,0.55)] leading-[12px] py-px">Low</div>
        </div>
        <div className="absolute bg-[rgba(255,255,255,0.94)] bottom-[9px] flex flex-col items-start px-[8px] py-[4px] right-[8.48px] rounded-[7px]">
          <p className="font-['Jua:Regular',sans-serif] text-[10px] text-[#6b6b6b] leading-[15px] whitespace-nowrap">
            <span>{`Hover ${view.hover.code} → `}</span>
            <span className="text-[#1a1a1a]">{view.hover.mix}</span>
          </p>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Postcodes({ view }: { view: GeoView }) {
  return (
    <div className="content-stretch flex flex-col gap-[9px] items-start col-2 justify-self-stretch row-1 self-start shrink-0 pt-[2px]" data-name="Top postcodes">
      <div className="font-['Jua:Regular',sans-serif] text-[10px] tracking-[1px] uppercase text-[#9a9a9a] leading-[15px] w-full">{view.postLabel}</div>
      {view.postcodes.map((p, i) => (
        <div key={p.code + p.place} className="grid grid-cols-[120px_minmax(0,1fr)_48px] gap-[10px] items-center w-full">
          <div className="overflow-clip">
            <p className="font-['Jua:Regular',sans-serif] text-[12px] text-[#1a1a1a] leading-[18px] whitespace-nowrap">{`${p.code} ${p.place}`}</p>
          </div>
          <div className="bg-[#f3f3f1] h-[16px] rounded-[6px] overflow-clip relative">
            <div className="absolute left-0 top-0 bottom-0 rounded-[6px]" style={{ width: `${Math.round(p.w * 100)}%`, background: i < 2 ? '#6b3c72' : '#bebde7', transition: 'width 240ms ease' }} />
          </div>
          <div className="text-right">
            <p className="font-['Jua:Regular',sans-serif] text-[12px] text-[#6b3c72] leading-[18px] whitespace-nowrap">{p.idx}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function MapAndPostcodes({ view, caption }: { view: GeoView; caption: string }) {
  return (
    <div className="h-[200px] relative shrink-0 w-full" data-name="Container">
      <div className="gap-x-[14px] gap-y-[14px] grid grid-cols-[minmax(0,1.40fr)_minmax(0,1fr)] grid-rows-[200px] relative size-full">
        <MapHeat view={view} caption={caption} />
        <Postcodes view={view} />
      </div>
    </div>
  );
}

function BackgroundVerticalBorder() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[10px] shrink-0 w-full" data-name="Background+VerticalBorder">
      <div aria-hidden className="absolute border-[#6b3c72] border-l-3 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start pl-[16px] pr-[13px] py-[12px] relative size-full">
        <Container72 />
        <TakeawayBullet1 />
        <TakeawayBullet2 />
      </div>
    </div>
  );
}

function WhereTheyLive() {
  const [whereMode, setWhereMode] = useState<GeoModeKey>('Residential');
  const [dayType, setDayType] = useState<DayKey>('Weekday');
  const view = GEO_UUD[whereMode][dayType];
  return (
    <div className="bg-white col-[1/span_2] justify-self-stretch relative rounded-[14px] row-1 self-start shrink-0" data-name="Where they live">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[17px] relative size-full">
        <Container42 />
        <BackgroundVerticalBorder />
        <ModeSwitchers whereMode={whereMode} setWhereMode={setWhereMode} dayType={dayType} setDayType={setDayType} />
        <MapAndPostcodes view={view} caption={`${whereMode} · ${dayType}`} />
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">{`Catchment & origin flows`}</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">{`How far they travel · median & 90th pct`}</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[197px]" data-name="Container">
      <Container76 />
      <Container77 />
    </div>
  );
}

function Svg15() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="SVG">
          <path d={svgPaths.p3e661000} id="Vector" stroke="var(--stroke-0, #6B3C72)" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder15() {
  return (
    <div className="bg-[#f1e9ff] content-stretch flex gap-[5px] h-[24px] items-center pb-[5px] pt-[4px] px-[10px] relative rounded-[7px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#bebde7] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg15 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[10px] tracking-[0.2px] whitespace-nowrap">
        <p className="leading-[15px]">Ask</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-[4.5px] pt-[3.5px] px-[9px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[10px] whitespace-nowrap">
            <p className="leading-[15px]">Map</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Svg16() {
  return (
    <div className="relative shrink-0 size-[11px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
        <g id="SVG">
          <path d={svgPaths.p2a738c60} id="Vector" stroke="var(--stroke-0, #6B3C72)" strokeWidth="0.916667" />
        </g>
      </svg>
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-[#f1e9ff] relative self-stretch shrink-0" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center pb-[4.5px] pt-[3.5px] px-[9px] relative size-full">
          <Svg16 />
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap">
            <p className="leading-[15px]">Trend</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Border1() {
  return (
    <div className="h-[25px] relative rounded-[7px] shrink-0" data-name="Border">
      <div className="content-stretch flex items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container79 />
        <Background12 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[4px] relative shrink-0" data-name="Margin">
      <Border1 />
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex gap-[3.99px] items-center relative shrink-0" data-name="Container">
      <BackgroundBorder15 />
      <Margin5 />
    </div>
  );
}

function Margin4() {
  return (
    <div className="flex-[1_0_0] min-w-[156.83999633789062px] relative" data-name="Margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[92.594px] relative size-full">
          <Container78 />
        </div>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8.006px] items-start relative size-full">
        <Container75 />
        <Margin4 />
      </div>
    </div>
  );
}

function Svg17() {
  return (
    <div className="h-[110px] relative shrink-0 w-full" data-name="SVG">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[78.18%_17.03%_21.82%_17.03%]" data-name="Vector">
          <div className="absolute inset-[-0.5px_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 381.758 1">
              <path d="M0 0.5H381.758" id="Vector" stroke="var(--stroke-0, #E5E5E2)" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] absolute font-['Jua:Regular',sans-serif] inset-[10.91%_71.98%_80%_17.47%] leading-[normal] not-italic text-[#9a9a9a] text-[8px]">90th pct (km)</p>
        <div className="absolute inset-[27.27%_17.03%_52.73%_17.03%]" data-name="Vector">
          <div className="absolute inset-[-4.54%_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 381.863 23.9973">
              <path d={svgPaths.pce78508} id="Vector" stroke="var(--stroke-0, #BEBDE7)" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[58.18%_17.03%_32.73%_17.03%]" data-name="Vector">
          <div className="absolute inset-[-12.5%_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 381.824 12.4991">
              <path d={svgPaths.p2b59f480} id="Vector" stroke="var(--stroke-0, #6B3C72)" strokeWidth="2.5" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[55.45%_16.37%_39.09%_82.31%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.63516 6">
            <path d={svgPaths.p12319d00} fill="var(--fill-0, #6B3C72)" id="Vector" />
          </svg>
        </div>
        <p className="[word-break:break-word] absolute font-['Jua:Regular',sans-serif] inset-[47.27%_18.57%_43.64%_73.74%] leading-[normal] not-italic text-[#6b3c72] text-[8px]">14.2km med</p>
        <div className="absolute inset-[24.55%_16.37%_70%_82.31%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.63516 6">
            <path d={svgPaths.p12319d00} fill="var(--fill-0, #BEBDE7)" id="Vector" />
          </svg>
        </div>
        <p className="[word-break:break-word] absolute font-['Jua:Regular',sans-serif] inset-[16.36%_20.11%_74.55%_75.93%] leading-[normal] not-italic text-[#6b6b6b] text-[8px]">52km</p>
        <p className="[word-break:break-word] absolute font-['Jua:Regular',sans-serif] inset-[84.55%_80.33%_7.27%_17.03%] leading-[normal] not-italic text-[#9a9a9a] text-[7px]">Oct</p>
        <p className="[word-break:break-word] absolute font-['Jua:Regular',sans-serif] inset-[84.55%_18.57%_7.27%_78.57%] leading-[normal] not-italic text-[#9a9a9a] text-[7px]">May</p>
      </div>
    </div>
  );
}

function Svg18() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="SVG">
          <path d={svgPaths.p124e7000} id="Vector" stroke="var(--stroke-0, #6B3C72)" />
        </g>
      </svg>
    </div>
  );
}

function Container80() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Svg18 />
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[9px] tracking-[1.08px] uppercase whitespace-nowrap">
          <p className="leading-[13.5px]">Takeaway</p>
        </div>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] w-full">
          <p className="mb-0">
            <span className="leading-[18.6px]">{`Urban Upgrade Drivers travel a median of `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular',sans-serif] leading-[18.6px] not-italic text-[#6b3c72]">14.2km</span>
            <span className="leading-[18.6px]">{`, with the `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular',sans-serif] leading-[18.6px] not-italic text-[#6b3c72]">90th percentile</span>
          </p>
          <p>
            <span className="leading-[18.6px]">{`extending to `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular',sans-serif] leading-[18.6px] not-italic text-[#6b3c72]">52km</span>
            <span className="leading-[18.6px]">{`. Travel distances are longer than average, consistent with car-dependent commuters across Singapore's residential towns.`}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function BackgroundVerticalBorder1() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[10px] shrink-0 w-full" data-name="Background+VerticalBorder">
      <div aria-hidden className="absolute border-[#6b3c72] border-l-3 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[5.3px] items-start pl-[16px] pr-[13px] py-[12px] relative size-full">
        <Container80 />
        <Container81 />
      </div>
    </div>
  );
}

function CatchmentWithTrendToggle() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative rounded-[14px] row-2 self-start shrink-0" data-name="Catchment with TREND toggle">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[17px] relative size-full">
        <Container74 />
        <Svg17 />
        <BackgroundVerticalBorder1 />
      </div>
    </div>
  );
}

function Background13() {
  return (
    <div className="absolute bg-[#f1e9ff] h-[11px] left-[138.22px] rounded-[5px] top-[5.22px] w-[87.09px]" data-name="Background">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-[6px] not-italic text-[#6b3c72] text-[9px] top-[5.5px] tracking-[0.36px] w-[75.118px]">
        <p className="leading-[13.5px]">TRANSACTIONAL</p>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#1a1a1a] text-[14px] top-[10px] w-[131.117px]">
        <p className="leading-[21px]">{`Where they transact `}</p>
      </div>
      <Background13 />
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap">
        <p className="leading-[16.5px]">Geographic spend density</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start min-w-[225.30999755859375px] relative shrink-0 w-[225.31px]" data-name="Container">
      <Container84 />
      <Container85 />
    </div>
  );
}

function Svg19() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="SVG">
          <path d={svgPaths.p3e661000} id="Vector" stroke="var(--stroke-0, #6B3C72)" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder16() {
  return (
    <div className="bg-[#f1e9ff] content-stretch flex gap-[5px] h-[24px] items-center pb-[5px] pt-[4px] px-[10px] relative rounded-[7px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#bebde7] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg19 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[10px] tracking-[0.2px] whitespace-nowrap">
        <p className="leading-[15px]">Ask</p>
      </div>
    </div>
  );
}

function Svg20() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="SVG">
          <path d={svgPaths.p145a2600} id="Vector" stroke="var(--stroke-0, #9A9A9A)" strokeWidth="1.08333" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder17() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg20 />
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex gap-[3.99px] items-center relative shrink-0" data-name="Container">
      <BackgroundBorder16 />
      <BackgroundBorder17 />
    </div>
  );
}

function Margin6() {
  return (
    <div className="flex-[1_0_0] min-w-[81.37999725341797px] relative" data-name="Margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[140.312px] relative size-full">
          <Container86 />
        </div>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8.008px] items-start relative size-full">
        <Container83 />
        <Margin6 />
      </div>
    </div>
  );
}

function Svg21() {
  return (
    <div className="absolute inset-[3px_1px_1px_1px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 577 116">
        <g clipPath="url(#clip0_10012_16264)" id="SVG">
          <path d="M0 46.4L577 51.04" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.1" strokeWidth="2.29234" />
          <path d="M265.42 0L288.5 116" id="Vector_2" stroke="var(--stroke-0, white)" strokeOpacity="0.1" strokeWidth="2.29234" />
        </g>
        <defs>
          <clipPath id="clip0_10012_16264">
            <rect fill="white" height="116" width="577" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Background14() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.94)] bottom-[9px] content-stretch flex flex-col items-start px-[8px] py-[4px] right-[9.5px] rounded-[7px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p>
          <span className="leading-[15px]">{`Top spend: `}</span>
          <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[15px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
            259xxx · 308xxx · 529xxx
          </span>
        </p>
      </div>
    </div>
  );
}

function BackgroundBorder18() {
  return (
    <div className="bg-[#23262f] h-[120px] relative rounded-[10px] shrink-0 w-full" data-name="Background+Border">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Svg21 />
        <div className="absolute bg-[#6b3c72] inset-[43.1%_52.44%_51.07%_46.02%] rounded-[3.5px]" data-name="Background" />
        <div className="absolute bg-[#bebde7] inset-[39.23%_57.86%_56.6%_41.04%] rounded-[2.5px]" data-name="Background" />
        <div className="absolute bg-[#6b3c72] inset-[41.17%_47.69%_53.83%_50.99%] rounded-[3px]" data-name="Background" />
        <div className="absolute bg-[#bebde7] inset-[48.9%_49.9%_46.93%_49%] rounded-[2.5px]" data-name="Background" />
        <div className="absolute bg-[#bebde7] inset-[45.99%_61.07%_50.68%_38.05%] rounded-[2px]" data-name="Background" />
        <div className="absolute bg-[#6b3c72] inset-[56.63%_36.95%_39.2%_61.95%] rounded-[2.5px]" data-name="Background" />
        <div className="absolute bg-[#bebde7] inset-[60.5%_32.2%_36.17%_66.92%] rounded-[2px]" data-name="Background" />
        <Background14 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container88() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.6px] uppercase w-full">
          <p className="leading-[15px]">Avg monthly spend</p>
        </div>
      </div>
    </div>
  );
}

function Margin7() {
  return (
    <div className="content-stretch flex flex-col items-start py-[4px] relative shrink-0" data-name="Margin">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[18px] whitespace-nowrap">
        <p className="leading-[27px]">$210</p>
      </div>
    </div>
  );
}

function Background15() {
  return (
    <div className="bg-[#f1e9ff] content-stretch flex items-center px-[7px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">1.3×</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-center flex flex-wrap gap-[0px_6px] items-center relative size-full">
        <Margin7 />
        <Background15 />
      </div>
    </div>
  );
}

function BackgroundBorder19() {
  return (
    <div className="bg-[#fafaf8] col-1 justify-self-stretch relative rounded-[10px] row-1 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col items-start p-[11px] relative size-full">
        <Container88 />
        <Container89 />
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.6px] uppercase w-full">
          <p className="leading-[15px]">In-store / online</p>
        </div>
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] w-full">
          <p className="leading-[21px]">64 / 36</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder20() {
  return (
    <div className="bg-[#fafaf8] col-2 justify-self-stretch relative rounded-[10px] row-1 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-[21px] pt-[11px] px-[11px] relative size-full">
        <Container90 />
        <Container91 />
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[10px] gap-y-[10px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_72px] relative size-full">
        <BackgroundBorder19 />
        <BackgroundBorder20 />
      </div>
    </div>
  );
}

function WhereTheyTransact() {
  return (
    <div className="bg-white col-2 justify-self-stretch relative rounded-[14px] row-2 self-start shrink-0" data-name="Where they transact">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[10px] items-start pb-[19.69px] pt-[17px] px-[17px] relative size-full">
        <Container82 />
        <BackgroundBorder18 />
        <Container87 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[auto_288.19px] pt-[14px] relative shrink-0 w-full" data-name="Container">
      <WhereTheyLive />
      <CatchmentWithTrendToggle />
      <WhereTheyTransact />
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">{`Competitor & POI visitation`}</p>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">Rival stores · share, last 3 mo</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[172px]" data-name="Container">
      <Container95 />
      <Container96 />
    </div>
  );
}

function Container93() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container94 />
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Premium Car Dealer</p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">42% · 1.6×</p>
      </div>
    </div>
  );
}

function Background16() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#6b3c72] inset-[0_16.01%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container97() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[10px] gap-y-[10px] grid grid-cols-[___120px_minmax(0,1fr)_64px] grid-rows-[_18px] pt-[3px] relative size-full">
        <Container98 />
        <Container99 />
        <Background16 />
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Auto showroom</p>
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[12px] text-right whitespace-nowrap">
        <p className="leading-[18px]">31%</p>
      </div>
    </div>
  );
}

function Background17() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_38%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container100() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[10px] gap-y-[10px] grid grid-cols-[___120px_minmax(0,1fr)_64px] grid-rows-[_18px] relative size-full">
        <Container101 />
        <Container102 />
        <Background17 />
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Car accessories</p>
      </div>
    </div>
  );
}

function Container105() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[12px] text-right whitespace-nowrap">
        <p className="leading-[18px]">27%</p>
      </div>
    </div>
  );
}

function Background18() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_46%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container103() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[10px] gap-y-[10px] grid grid-cols-[___120px_minmax(0,1fr)_64px] grid-rows-[_18px] relative size-full">
        <Container104 />
        <Container105 />
        <Background18 />
      </div>
    </div>
  );
}

function CompetitorPoi() {
  return (
    <div className="bg-[#fafaf8] col-1 justify-self-stretch relative rounded-[14px] row-1 self-start shrink-0" data-name="Competitor / POI">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[9px] items-start pb-[73px] pt-[17px] px-[17px] relative size-full">
        <Container93 />
        <Container97 />
        <Container100 />
        <Container103 />
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">{`Frequency & recency`}</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">Visitor mix · median gap 11 days</p>
      </div>
    </div>
  );
}

function Container107() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[152px]" data-name="Container">
      <Container108 />
      <Container109 />
    </div>
  );
}

function Container106() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container107 />
      </div>
    </div>
  );
}

function Svg22() {
  return (
    <div className="relative shrink-0 size-[80px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
        <g id="SVG">
          <path d={svgPaths.p38a8f100} id="Vector" stroke="var(--stroke-0, #F3F3F1)" strokeWidth="11.4286" />
          <path d={svgPaths.p38a8f100} id="Vector_2" stroke="var(--stroke-0, #6B3C72)" strokeDasharray="118.1 72.38" strokeWidth="11.4286" />
          <path d={svgPaths.p38a8f100} id="Vector_3" stroke="var(--stroke-0, #BEBDE7)" strokeDasharray="49.52 140.95" strokeWidth="11.4286" />
          <path d={svgPaths.p38a8f100} id="Vector_4" stroke="var(--stroke-0, #CDB6D2)" strokeDasharray="22.86 167.62" strokeWidth="11.4286" />
        </g>
      </svg>
    </div>
  );
}

function Container112() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute bg-[#6b3c72] left-0 rounded-[3px] size-[9px] top-[4.13px]" data-name="Background" />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] left-[14px] text-[#6b6b6b] text-[11px] top-[7.5px] w-[69.113px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">One-off · 62%</p>
      </div>
    </div>
  );
}

function Container113() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute bg-[#bebde7] left-0 rounded-[3px] size-[9px] top-[4.13px]" data-name="Background" />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] left-[14px] text-[#6b6b6b] text-[11px] top-[7.5px] w-[79.122px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">Returning · 26%</p>
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute bg-[#cdb6d2] left-0 rounded-[3px] size-[9px] top-[4.13px]" data-name="Background" />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] left-[14px] text-[#6b6b6b] text-[11px] top-[7.5px] w-[55.177px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">Loyal · 12%</p>
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-[92.88px]" data-name="Container">
      <Container112 />
      <Container113 />
      <Container114 />
    </div>
  );
}

function Container110() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Svg22 />
        <Container111 />
      </div>
    </div>
  );
}

function Frequency() {
  return (
    <div className="bg-[#fafaf8] col-2 justify-self-stretch relative rounded-[14px] row-1 self-start shrink-0" data-name="Frequency">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-[65px] pt-[17px] px-[17px] relative size-full">
        <Container106 />
        <Container110 />
      </div>
    </div>
  );
}

function Container117() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">Reach by site</p>
      </div>
    </div>
  );
}

function Container118() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">Top LUMOS panels · $/1k reached</p>
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[160px]" data-name="Container">
      <Container117 />
      <Container118 />
    </div>
  );
}

function Container115() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container116 />
      </div>
    </div>
  );
}

function Cell() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8.5px] pt-[7px] px-[8px] relative shrink-0 w-[115.52px]" data-name="Cell">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[normal]">Panel</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8.5px] pt-[7px] px-[8px] relative shrink-0 w-[67.83px]" data-name="Cell">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[normal]">Wkly imp.</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8.5px] pt-[7px] px-[8px] relative shrink-0 w-[54.5px]" data-name="Cell">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[normal]">$/1k</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8.5px] pt-[7px] px-[8px] relative shrink-0 w-[50.16px]" data-name="Cell">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[normal]">Idx</p>
      </div>
    </div>
  );
}

function HeaderRow() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Header → Row">
      <Cell />
      <Cell1 />
      <Cell2 />
      <Cell3 />
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[11.5px] pt-[10.5px] px-[8px] relative shrink-0 w-[115.52px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[normal]">Orchard Rd</p>
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[11.5px] pt-[10.5px] px-[8px] relative shrink-0 w-[67.83px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[12px] whitespace-nowrap">
        <p className="leading-[normal]">142k</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[11.5px] pt-[10.5px] px-[8px] relative shrink-0 w-[54.5px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[12px] whitespace-nowrap">
        <p className="leading-[normal]">$9.20</p>
      </div>
    </div>
  );
}

function Background19() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-[4px] pt-[3px] px-[7px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[normal]">1.9×</p>
        </div>
      </div>
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] pt-[8px] px-[8px] relative shrink-0 w-[50.16px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <Background19 />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data />
      <Data1 />
      <Data2 />
      <Data3 />
    </div>
  );
}

function Data4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[11.5px] pt-[10.5px] px-[8px] relative shrink-0 w-[115.52px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[normal]">Buona Vista · one-north</p>
      </div>
    </div>
  );
}

function Data5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[11.5px] pt-[10.5px] px-[8px] relative shrink-0 w-[67.83px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[12px] whitespace-nowrap">
        <p className="leading-[normal]">98.5k</p>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[11.5px] pt-[10.5px] px-[8px] relative shrink-0 w-[54.5px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[12px] whitespace-nowrap">
        <p className="leading-[normal]">$11.40</p>
      </div>
    </div>
  );
}

function Background20() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-[4px] pt-[3px] px-[7px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[normal]">1.7×</p>
        </div>
      </div>
    </div>
  );
}

function Data7() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] pt-[8px] px-[8px] relative shrink-0 w-[50.16px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <Background20 />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data4 />
      <Data5 />
      <Data6 />
      <Data7 />
    </div>
  );
}

function Data8() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[11.5px] pt-[10.5px] px-[8px] relative shrink-0 w-[115.52px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[normal]">Marina Bay · CBD</p>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[11.5px] pt-[10.5px] px-[8px] relative shrink-0 w-[67.83px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[12px] whitespace-nowrap">
        <p className="leading-[normal]">87.2k</p>
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[11.5px] pt-[10.5px] px-[8px] relative shrink-0 w-[54.5px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[12px] whitespace-nowrap">
        <p className="leading-[normal]">$12.80</p>
      </div>
    </div>
  );
}

function Background21() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-[4px] pt-[3px] px-[7px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[normal]">1.5×</p>
        </div>
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] pt-[8px] px-[8px] relative shrink-0 w-[50.16px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <Background21 />
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data8 />
      <Data9 />
      <Data10 />
      <Data11 />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <Row />
      <Row1 />
      <Row2 />
    </div>
  );
}

function Table() {
  return (
    <div className="relative shrink-0 w-full" data-name="Table">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <HeaderRow />
        <Body />
      </div>
    </div>
  );
}

function ReachBySite() {
  return (
    <div className="bg-[#fafaf8] col-3 justify-self-stretch relative rounded-[14px] row-1 self-start shrink-0" data-name="Reach by site">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[17px] relative size-full">
        <Container115 />
        <Table />
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_213.50px] h-[213.5px] relative shrink-0 w-full" data-name="Container">
      <CompetitorPoi />
      <Frequency />
      <ReachBySite />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <BackgroundBorder1 />
      <BackgroundBorder4 />
      <Container16 />
      <BackgroundBorder10 />
      <Container41 />
      <Container92 />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container1 />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#f3f3f1] relative rounded-[16px] shrink-0 w-[1280px]" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[21px] relative rounded-[inherit] size-full">
        <Container />
      </div>
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Container119() {
  return <div className="h-[20px] max-w-[1280px] relative shrink-0 w-[1100px]" data-name="Container" />;
}

function Margin8() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1280px] pt-[14px] relative shrink-0" data-name="Margin">
      <Container119 />
    </div>
  );
}

export default function Screen2Mobility() {
  return (
    <div className="content-stretch flex flex-col items-center relative size-full" data-name="SCREEN 2 — MOBILITY">
      <BackgroundBorder />
      <Margin8 />
    </div>
  );
}