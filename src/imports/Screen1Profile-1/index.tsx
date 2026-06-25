import svgPaths from "./svg-4hncmq2fds";

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
          <p className="leading-[15px]">Index vs national</p>
        </div>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="absolute bg-[#e7f3ec] content-stretch flex items-center left-[45.3px] px-[6px] py-[2px] rounded-[999px] top-[6px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#2f7d4f] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">▲ +0.3×</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[25px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] left-0 text-[#1a1a1a] text-[21px] top-[11.5px] w-[38.106px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[23.1px]">2.1×</p>
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
          <p className="leading-[15px]">{`Peak day & hour`}</p>
        </div>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="[word-break:break-word] absolute h-[23.09px] leading-[0] left-0 top-0 w-[74.81px]" data-name="Paragraph">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center left-0 not-italic text-[#1a1a1a] text-[21px] top-[11.5px] w-[34.104px]">
        <p className="leading-[23.1px]">{`Sat `}</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center left-[39.42px] text-[#6b6b6b] text-[12px] top-[14px] w-[35.117px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.2px]">10–12pm</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="absolute bg-[#f1e9ff] content-stretch flex items-center left-[82.81px] px-[7px] py-[2px] rounded-[999px] top-[6px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">2.3×</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[25px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph1 />
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

function BackgroundBorder4() {
  return (
    <div className="absolute bg-[#f3f3f1] bottom-[33.5px] content-stretch flex flex-col items-start left-0 pb-[5.5px] pt-[4px] px-[11px] rounded-[999px] top-[13px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p>
          <span className="leading-[16.5px]">Filters:</span>
          <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[16.5px] text-[#6b6b6b]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{` Running-app users · park/trail dwell`}</span>
        </p>
      </div>
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="absolute bg-[#f3f3f1] bottom-[33.5px] content-stretch flex flex-col items-start left-[239.59px] pb-[5.5px] pt-[4px] px-[11px] rounded-[999px] top-[13px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p>
          <span className="leading-[16.5px]">Sources:</span>
          <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[16.5px] text-[#6b6b6b]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{` LUMOS panels · GWI · Telco · Card & loyalty`}</span>
        </p>
      </div>
    </div>
  );
}

function BackgroundBorder6() {
  return (
    <div className="absolute bg-[#f3f3f1] bottom-[33.5px] content-stretch flex flex-col items-start left-[526.64px] pb-[5.5px] pt-[4px] px-[11px] rounded-[999px] top-[13px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p>
          <span className="leading-[16.5px]">Window:</span>
          <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[16.5px] text-[#6b6b6b]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{` Jan–Mar 2026 · rolling 90d`}</span>
        </p>
      </div>
    </div>
  );
}

function BackgroundBorder7() {
  return (
    <div className="absolute bg-[#f3f3f1] bottom-[33.5px] content-stretch flex flex-col items-start left-[733.09px] pb-[5.5px] pt-[4px] px-[11px] rounded-[999px] top-[13px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[11px] whitespace-nowrap">
        <p>
          <span className="leading-[16.5px]">Geo:</span>
          <span className="[word-break:break-word] font-['Jua:Regular',sans-serif] leading-[16.5px] not-italic text-[#6b6b6b]">{` Singapore`}</span>
        </p>
      </div>
    </div>
  );
}

function BackgroundBorder8() {
  return (
    <div className="absolute bg-[#f3f3f1] bottom-0 content-stretch flex flex-col items-start left-0 pb-[5.5px] pt-[4px] px-[11px] rounded-[999px] top-[46.5px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p>
          <span className="leading-[16.5px]">Confidence:</span>
          <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[16.5px] text-[#6b6b6b]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{` ±2.1% @ 95% CI`}</span>
        </p>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="h-[73px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[#e5e5e2] border-dashed border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <BackgroundBorder4 />
        <BackgroundBorder5 />
        <BackgroundBorder6 />
        <BackgroundBorder7 />
        <BackgroundBorder8 />
      </div>
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
        <HorizontalBorder />
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
            <p className="leading-[19.5px]">Audience Profile</p>
          </div>
        </div>
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

function BackgroundBorder9() {
  return (
    <div className="bg-white h-[50px] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-start justify-center p-[5px] relative size-full">
          <Background4 />
          <Container13 />
          <Container14 />
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
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

function BackgroundBorder10() {
  return (
    <div className="-translate-y-1/2 absolute bg-white content-stretch flex gap-[9px] items-center left-0 px-[13px] py-[8px] rounded-[10px] top-[calc(50%+6px)]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container16 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">Jan–Mar 2026</p>
      </div>
      <Svg3 />
    </div>
  );
}

function Container17() {
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

function BackgroundBorder11() {
  return (
    <div className="-translate-y-1/2 absolute bg-white content-stretch flex gap-[9px] items-center left-[169.42px] px-[13px] py-[8px] rounded-[10px] top-[calc(50%+6px)]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container17 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Singapore</p>
      </div>
      <Svg4 />
    </div>
  );
}

function Container18() {
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

function BackgroundBorder12() {
  return (
    <div className="-translate-y-1/2 absolute bg-white content-stretch flex gap-[9px] items-center left-[387.23px] px-[13px] py-[8px] rounded-[10px] top-[calc(50%+6px)]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container18 />
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

function Container19() {
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

function BackgroundBorder13() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#f1e9ff] content-stretch flex gap-[9px] items-center left-[584.47px] px-[13px] py-[8px] rounded-[10px] top-[calc(50%+6px)]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#bebde7] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Svg6 />
      <Container19 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">vs previous quarter</p>
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

function Container20() {
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

function Container21() {
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

function BackgroundBorder14() {
  return (
    <div className="-translate-y-1/2 absolute bg-white h-[32.5px] left-[853.72px] rounded-[9px] top-[calc(50%+6px)]" data-name="Background+Border">
      <div className="content-stretch flex items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Background5 />
        <Container20 />
        <Container21 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[9px]" />
    </div>
  );
}

function GlobalFilterBar() {
  return (
    <div className="h-[62px] relative shrink-0 w-full" data-name="GLOBAL FILTER BAR">
      <BackgroundBorder10 />
      <BackgroundBorder11 />
      <BackgroundBorder12 />
      <BackgroundBorder13 />
      <BackgroundBorder14 />
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

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.4px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">Updated for Jan–Mar 2026</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex h-[15px] items-start relative shrink-0" data-name="Container">
      <Container24 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="flex-[1_0_0] min-w-[146.30999755859375px] relative" data-name="Margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[616.875px] relative size-full">
          <Container23 />
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Svg7 />
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] tracking-[1.2px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[15px]">Takeaway · who they are</p>
        </div>
        <Margin1 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="max-w-[807.8389892578125px] relative shrink-0 w-[807.83px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] pt-[1.3px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[20px] whitespace-nowrap">
          <p className="leading-[26px] mb-0">Affluent mid-career professionals who over-index across premium automotive, financial</p>
          <p className="leading-[26px]">services and aspirational lifestyle brands.</p>
        </div>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="max-w-[652.3930053710938px] relative shrink-0 w-[652.39px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] pb-[7.3px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="mb-0">
            <span className="leading-[20.8px]">{`Urban Upgrade Drivers over-index highest on premium vehicle brands (2.1×) and financial services (1.8×), with an average`}</span>
          </p>
          <p className="mb-0">
            <span className="leading-[20.8px]">{`household income of $148k and 72% of spend in-person. They skew professional (1.6×) and slightly male (58%), and`}</span>
          </p>
          <p className="mb-0">
            <span className="leading-[20.8px]">{`concentrate in the $120–200k household band. Their strongest brand affinities are CarousellAuto (2.4×),`}</span>
          </p>
          <p>
            <span className="leading-[20.8px]">{`BMW (2.0×) and Mercedes-Benz (1.9×).`}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[18px] whitespace-nowrap">
        <p className="leading-[27px]">387k</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">People</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="relative self-stretch shrink-0 w-[37px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container28 />
        <Container29 />
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="absolute bg-[#e7f3ec] content-stretch flex items-center left-[37.97px] px-[6px] py-[2px] rounded-[999px] top-[6px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#2f7d4f] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">▲ +0.3×</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] left-0 text-[#6b3c72] text-[18px] top-[13px] w-[32.199px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[27px]">2.1×</p>
      </div>
      <Background6 />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Index vs national</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="relative self-stretch shrink-0 w-[84px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container31 />
        <Container32 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[18px] whitespace-nowrap">
        <p className="leading-[27px]">$148k</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Avg HHI</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="relative self-stretch shrink-0 w-[63px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container34 />
        <Container35 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[18px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[27px]">2.4×</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Auto interest</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="relative self-stretch shrink-0 w-[96px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container37 />
        <Container38 />
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="h-[59px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[#bebde7] border-dashed border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-wrap gap-[0px_26px] items-start pt-[15px] relative size-full">
        <Container27 />
        <Container30 />
        <Container33 />
        <Container36 />
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

function Container40() {
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

function Container41() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[94.27px]" data-name="Container">
      <Svg9 />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-[19px] not-italic text-[#6b3c72] text-[11px] top-[calc(50%-0.75px)] w-[76.112px]">
        <p className="leading-[16.5px]">Ask a follow-up</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14px] items-center pt-[5.3px] relative size-full">
        <Container40 />
        <Container41 />
      </div>
    </div>
  );
}

function AiKeyTakeawayHero() {
  return (
    <div className="bg-gradient-to-b from-[#f7f1ff] relative rounded-[14px] shrink-0 to-[#fbfaff] w-full" data-name="AI KEY TAKEAWAY HERO">
      <div aria-hidden className="absolute border border-[#bebde7] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[7.7px] items-start pb-[19px] pt-[33px] px-[21px] relative size-full">
        <Container22 />
        <Container25 />
        <Container26 />
        <HorizontalBorder1 />
        <Container39 />
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">{`Demographics & occupation`}</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap">
        <p className="leading-[16.5px]">Indexed vs metro</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[168px]" data-name="Container">
      <Container45 />
      <Container46 />
    </div>
  );
}

function Container43() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container44 />
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.6px] uppercase w-full">
          <p className="leading-[15px]">Core age</p>
        </div>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[18px] w-full" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[27px]">32–52</p>
        </div>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[7px] py-[2px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[15px]">1.4×</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder15() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative rounded-[10px] row-1 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[2px] items-start p-[11px] relative size-full">
        <Container48 />
        <Container49 />
        <Background7 />
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.6px] uppercase w-full">
          <p className="leading-[15px]">Female share</p>
        </div>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[18px] w-full">
          <p className="leading-[27px]">42%</p>
        </div>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[7px] py-[2px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[15px]">1.1×</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder16() {
  return (
    <div className="bg-white col-2 justify-self-stretch relative rounded-[10px] row-1 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[2px] items-start p-[11px] relative size-full">
        <Container50 />
        <Container51 />
        <Background8 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.6px] uppercase w-full">
          <p className="leading-[15px]">Occupation</p>
        </div>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] w-full">
          <p className="leading-[21px]">Professional</p>
        </div>
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[7px] py-[2px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[15px]">1.4×</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder17() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative rounded-[10px] row-2 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[2px] items-start p-[11px] relative size-full">
        <Container52 />
        <Container53 />
        <Background9 />
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.6px] uppercase w-full">
          <p className="leading-[15px]">Life stage</p>
        </div>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] w-full">
          <p className="leading-[21px]">Homeowners 61%</p>
        </div>
      </div>
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[7px] py-[2px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[15px]">1.6×</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder18() {
  return (
    <div className="bg-white col-2 justify-self-stretch relative rounded-[10px] row-2 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[2px] items-start p-[11px] relative size-full">
        <Container54 />
        <Container55 />
        <Background10 />
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[182px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[10px] gap-y-[10px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__89px_83px] relative size-full">
        <BackgroundBorder15 />
        <BackgroundBorder16 />
        <BackgroundBorder17 />
        <BackgroundBorder18 />
      </div>
    </div>
  );
}

function Demographics() {
  return (
    <div className="bg-[#fafaf8] col-1 justify-self-stretch relative rounded-[14px] row-1 self-start shrink-0" data-name="Demographics">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[17px] relative size-full">
        <Container43 />
        <Container47 />
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">{`Income & affluence`}</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap">
        <p className="leading-[16.5px]">HH-income bands vs benchmark</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[148px]" data-name="Container">
      <Container58 />
      <Container59 />
    </div>
  );
}

function Container56() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container57 />
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">{`<$80k`}</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">0.6×</p>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_76%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[10px] gap-y-[10px] grid grid-cols-[___74px_minmax(0,1fr)_44px] grid-rows-[_18px] pt-[3px] relative size-full">
        <Container61 />
        <Container62 />
        <Background11 />
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">$80–120k</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">0.9×</p>
      </div>
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_42%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[10px] gap-y-[10px] grid grid-cols-[___74px_minmax(0,1fr)_44px] grid-rows-[_18px] relative size-full">
        <Container64 />
        <Container65 />
        <Background12 />
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">$120–200k</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.5×</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container69 />
    </div>
  );
}

function Background13() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#6b3c72] inset-[0_10%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[10px] gap-y-[10px] grid grid-cols-[___74px_minmax(0,1fr)_44px] grid-rows-[_18px] relative size-full">
        <Container67 />
        <Container68 />
        <Background13 />
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">$200k+</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.4×</p>
      </div>
    </div>
  );
}

function Background14() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_38%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container70() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[10px] gap-y-[10px] grid grid-cols-[___74px_minmax(0,1fr)_44px] grid-rows-[_18px] relative size-full">
        <Container71 />
        <Container72 />
        <Background14 />
      </div>
    </div>
  );
}

function Income() {
  return (
    <div className="bg-[#fafaf8] col-2 justify-self-stretch relative rounded-[14px] row-1 self-start shrink-0" data-name="Income">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[9px] items-start pb-[100px] pt-[17px] px-[17px] relative size-full">
        <Container56 />
        <Container60 />
        <Container63 />
        <Container66 />
        <Container70 />
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">Lifestage mix</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap">
        <p className="leading-[16.5px]">Helix-style segments</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[99px]" data-name="Container">
      <Container75 />
      <Container76 />
    </div>
  );
}

function Container73() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container74 />
      </div>
    </div>
  );
}

function Background15() {
  return (
    <div className="bg-[#6b3c72] h-full relative shrink-0 w-[88.66px]" data-name="Background">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[3px] pt-[2px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white whitespace-nowrap">
            <p className="leading-[15px]">31%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background16() {
  return (
    <div className="bg-[#bebde7] h-full relative shrink-0 w-[77.22px]" data-name="Background">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[3px] pt-[2px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[10px] text-center whitespace-nowrap">
            <p className="leading-[15px]">27%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background17() {
  return (
    <div className="bg-[#cdb6d2] h-full relative shrink-0 w-[54.33px]" data-name="Background">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[3px] pt-[2px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white whitespace-nowrap">
            <p className="leading-[15px]">19%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background18() {
  return (
    <div className="bg-[#e0d2e3] h-full relative shrink-0 w-[65.77px]" data-name="Background">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[3px] pt-[2px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[10px] text-center whitespace-nowrap">
            <p className="leading-[15px]">23%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Border1() {
  return (
    <div className="h-[24px] relative rounded-[7px] shrink-0 w-full" data-name="Border">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip pb-px pt-[3px] px-px relative rounded-[inherit] size-full">
        <Background15 />
        <Background16 />
        <Background17 />
        <Background18 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
    </div>
  );
}

function Container78() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute bg-[#6b3c72] left-0 rounded-[3px] size-[9px] top-[4.12px]" data-name="Background" />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] left-[14px] text-[#6b6b6b] text-[11px] top-[7.5px] w-[125.195px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">Established Professionals · 2.1×</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute bg-[#bebde7] left-0 rounded-[3px] size-[9px] top-[4.12px]" data-name="Background" />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] left-[14px] text-[#6b6b6b] text-[11px] top-[7.5px] w-[145.115px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">Aspirational Climbers · 1.7×</p>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute bg-[#cdb6d2] left-0 rounded-[3px] size-[9px] top-[4.12px]" data-name="Background" />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] left-[14px] text-[#6b6b6b] text-[11px] top-[7.5px] w-[116.18px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">Growing Families · 1.3×</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[5px] items-start relative size-full">
        <Container78 />
        <Container79 />
        <Container80 />
      </div>
    </div>
  );
}

function Lifestage() {
  return (
    <div className="bg-[#fafaf8] col-3 justify-self-stretch relative rounded-[14px] row-1 self-start shrink-0" data-name="Lifestage">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[10px] items-start pb-[107.5px] pt-[17px] px-[17px] relative size-full">
        <Container73 />
        <Border1 />
        <Container77 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_267.50px] h-[281.5px] pt-[14px] relative shrink-0 w-full" data-name="Container">
      <Demographics />
      <Income />
      <Lifestage />
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">Top segments by index</p>
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">Leading buyergraphic segments · vs metro baseline</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[242px]" data-name="Container">
      <Container84 />
      <Container85 />
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

function BackgroundBorder19() {
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

function Background19() {
  return (
    <div className="bg-[#f1e9ff] relative self-stretch shrink-0" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-[4.5px] pt-[3.5px] px-[9px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap">
            <p className="leading-[15px]">Snapshot</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Svg11() {
  return (
    <div className="relative shrink-0 size-[11px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
        <g id="SVG">
          <path d={svgPaths.p2a738c60} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeWidth="0.916667" />
        </g>
      </svg>
    </div>
  );
}

function Container87() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center pb-[4.5px] pt-[3.5px] px-[9px] relative size-full">
          <Svg11 />
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[10px] whitespace-nowrap">
            <p className="leading-[15px]">Trend</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Border2() {
  return (
    <div className="h-[25px] relative rounded-[7px] shrink-0" data-name="Border">
      <div className="content-stretch flex items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Background19 />
        <Container87 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[4px] relative shrink-0" data-name="Margin">
      <Border2 />
    </div>
  );
}

function Svg12() {
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

function BackgroundBorder20() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg12 />
    </div>
  );
}

function Svg13() {
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

function BackgroundBorder21() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg13 />
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <BackgroundBorder19 />
      <Margin3 />
      <BackgroundBorder20 />
      <BackgroundBorder21 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="flex-[1_0_0] min-w-[236.3300018310547px] relative" data-name="Margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[469.781px] relative size-full">
          <Container86 />
        </div>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.999px] items-start relative size-full">
        <Container83 />
        <Margin2 />
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

function Container89() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg14 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[9px] tracking-[1.08px] uppercase whitespace-nowrap">
        <p className="leading-[13.5px]">Takeaway</p>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6px] relative size-full">
        <Container89 />
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] w-full" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[18.6px] mb-0">The four leading segments all reflect high-income professional lifestyles, with Premium Vehicle Owners and Wealth Management Users clustering</p>
          <p className="leading-[18.6px] mb-0">together. Premium Vehicle Owners rose versus last quarter; Business Class</p>
          <p className="leading-[18.6px] mb-0">Travellers declined slightly as travel normalised post-</p>
          <p className="leading-[18.6px]">pandemic.</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundVerticalBorder() {
  return (
    <div className="bg-[#f1e9ff] col-1 justify-self-stretch relative rounded-[10px] row-1 self-start shrink-0" data-name="Background+VerticalBorder">
      <div aria-hidden className="absolute border-[#6b3c72] border-l-3 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pb-[12px] pl-[16px] pr-[13px] pt-[11px] relative size-full">
          <Margin4 />
          <Container90 />
        </div>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Premium Vehicle Owners</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.7×</p>
      </div>
    </div>
  );
}

function Background20() {
  return (
    <div className="bg-[#e7f3ec] content-stretch flex items-center justify-end px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2f7d4f] text-[10px] text-right whitespace-nowrap">
        <p className="leading-[15px]">▲</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="col-3 content-stretch flex gap-[5px] h-[19px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container95 />
      <Background20 />
    </div>
  );
}

function Background21() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#6b3c72] inset-[0_4%_0_0] rounded-[6px]" data-name="Background" />
      <div className="absolute bg-[#9a9a9a] inset-[0_11.54%_0_88%] opacity-65 rounded-[2px]" data-name="Vertical Divider" />
    </div>
  );
}

function Container92() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___150px_minmax(0,1fr)_84px] grid-rows-[_19px] h-[19px] relative shrink-0 w-full" data-name="Container">
      <Container93 />
      <Container94 />
      <Background21 />
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container92 />
    </div>
  );
}

function Container97() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Wealth Management Users</p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.7×</p>
      </div>
    </div>
  );
}

function Background22() {
  return (
    <div className="bg-[#e7f3ec] content-stretch flex items-center justify-end px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2f7d4f] text-[10px] text-right whitespace-nowrap">
        <p className="leading-[15px]">▲</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="col-3 content-stretch flex gap-[5px] h-[19px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container99 />
      <Background22 />
    </div>
  );
}

function Background23() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#6b3c72] inset-[0_7%_0_0] rounded-[6px]" data-name="Background" />
      <div className="absolute bg-[#9a9a9a] inset-[0_9.54%_0_90%] opacity-65 rounded-[2px]" data-name="Vertical Divider" />
    </div>
  );
}

function Container96() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___150px_minmax(0,1fr)_84px] grid-rows-[_19px] h-[19px] relative shrink-0 w-full" data-name="Container">
      <Container97 />
      <Container98 />
      <Background23 />
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container96 />
    </div>
  );
}

function Container101() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Premium Retail Shoppers</p>
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.6×</p>
      </div>
    </div>
  );
}

function Background24() {
  return (
    <div className="bg-[#f3f3f1] content-stretch flex items-center justify-end px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[10px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">–</p>
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="col-3 content-stretch flex gap-[5px] h-[19px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container103 />
      <Background24 />
    </div>
  );
}

function Background25() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_12%_0_0] rounded-[6px]" data-name="Background" />
      <div className="absolute bg-[#9a9a9a] inset-[0_13.54%_0_86%] opacity-65 rounded-[2px]" data-name="Vertical Divider" />
    </div>
  );
}

function Container100() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___150px_minmax(0,1fr)_84px] grid-rows-[_19px] h-[19px] relative shrink-0 w-full" data-name="Container">
      <Container101 />
      <Container102 />
      <Background25 />
    </div>
  );
}

function Margin7() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container100 />
    </div>
  );
}

function Container105() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Business Class Travellers</p>
      </div>
    </div>
  );
}

function Container107() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.5×</p>
      </div>
    </div>
  );
}

function Background26() {
  return (
    <div className="bg-[#f6ece2] content-stretch flex items-center justify-end px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a65a2e] text-[10px] text-right whitespace-nowrap">
        <p className="leading-[15px]">▼</p>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="col-3 content-stretch flex gap-[4.99px] h-[19px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container107 />
      <Background26 />
    </div>
  );
}

function Background27() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_21%_0_0] rounded-[6px]" data-name="Background" />
      <div className="absolute bg-[#9a9a9a] inset-[0_16.54%_0_83%] opacity-65 rounded-[2px]" data-name="Vertical Divider" />
    </div>
  );
}

function Container104() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___150px_minmax(0,1fr)_84px] grid-rows-[_19px] h-[19px] relative shrink-0 w-full" data-name="Container">
      <Container105 />
      <Container106 />
      <Background27 />
    </div>
  );
}

function Margin8() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container104 />
    </div>
  );
}

function Container91() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-center justify-self-stretch pb-[39.63px] pt-[39.62px] relative row-1 self-start shrink-0" data-name="Container">
      <Margin5 />
      <Margin6 />
      <Margin7 />
      <Margin8 />
    </div>
  );
}

function Container88() {
  return (
    <div className="h-[191.25px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[16px] gap-y-[16px] grid grid-cols-[__250px_minmax(0,1fr)] grid-rows-[_191.25px] relative size-full">
        <BackgroundVerticalBorder />
        <Container91 />
      </div>
    </div>
  );
}

function TopSegments() {
  return (
    <div className="bg-white col-[1/span_2] justify-self-stretch relative rounded-[14px] row-1 self-start shrink-0" data-name="Top segments">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[17px] relative size-full">
        <Container82 />
        <Container88 />
      </div>
    </div>
  );
}

function Background28() {
  return (
    <div className="absolute bg-[#f1e9ff] h-[11px] left-[121.83px] rounded-[5px] top-[5.22px] w-[87.09px]" data-name="Background">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-[6px] not-italic text-[#6b3c72] text-[9px] top-[5.5px] tracking-[0.36px] w-[75.118px]">
        <p className="leading-[13.5px]">TRANSACTIONAL</p>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#1a1a1a] text-[14px] top-[10px] w-[114.107px]">
        <p className="leading-[21px]">{`Purchase patterns `}</p>
      </div>
      <Background28 />
    </div>
  );
}

function Container111() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">What they buy · category spend indexed</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start min-w-[208.9199981689453px] relative shrink-0 w-[208.92px]" data-name="Container">
      <Container110 />
      <Container111 />
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

function BackgroundBorder22() {
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

function Svg16() {
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

function BackgroundBorder23() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg16 />
    </div>
  );
}

function Svg17() {
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

function BackgroundBorder24() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg17 />
    </div>
  );
}

function Container112() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <BackgroundBorder22 />
      <BackgroundBorder23 />
      <BackgroundBorder24 />
    </div>
  );
}

function Margin9() {
  return (
    <div className="flex-[1_0_0] min-w-[109.37999725341797px] relative" data-name="Margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[629.703px] relative size-full">
          <Container112 />
        </div>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8.007px] items-start relative size-full">
        <Container109 />
        <Margin9 />
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

function Container114() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg18 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[9px] tracking-[1.08px] uppercase whitespace-nowrap">
        <p className="leading-[13.5px]">Takeaway</p>
      </div>
    </div>
  );
}

function Margin10() {
  return (
    <div className="mb-[-0.61px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6px] relative size-full">
        <Container114 />
      </div>
    </div>
  );
}

function Container115() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] w-full" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="mb-0">
            <span className="leading-[18.6px]">Premium automotive (1.9×)</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[18.6px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{` and `}</span>
            <span className="leading-[18.6px]">financial services</span>
          </p>
          <p className="mb-0">
            <span className="leading-[18.6px]">(1.8×)</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[18.6px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{` lead category spend. Average HHI is`}</span>
          </p>
          <p className="mb-0">
            <span className="leading-[18.6px]">$148k</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[18.6px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{`, split `}</span>
            <span className="leading-[18.6px]">72% dealership / in-person / 28%</span>
          </p>
          <p>
            <span className="leading-[18.6px]">online</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[18.6px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              .
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function BackgroundVerticalBorder1() {
  return (
    <div className="bg-[#f1e9ff] col-1 justify-self-stretch relative rounded-[10px] row-1 self-start shrink-0" data-name="Background+VerticalBorder">
      <div aria-hidden className="absolute border-[#6b3c72] border-l-3 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pb-[17.81px] pl-[16px] pr-[13px] pt-[16.81px] relative size-full">
          <Margin10 />
          <Container115 />
        </div>
      </div>
    </div>
  );
}

function Container118() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Premium automotive</p>
      </div>
    </div>
  );
}

function Container120() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.9×</p>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container120 />
    </div>
  );
}

function Background29() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#6b3c72] inset-[0_4%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container117() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___160px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container118 />
      <Container119 />
      <Background29 />
    </div>
  );
}

function Margin11() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container117 />
    </div>
  );
}

function Container122() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Financial &amp; investment services</p>
      </div>
    </div>
  );
}

function Container124() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.8×</p>
      </div>
    </div>
  );
}

function Container123() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container124 />
    </div>
  );
}

function Background30() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#6b3c72] inset-[0_10%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container121() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___160px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container122 />
      <Container123 />
      <Background30 />
    </div>
  );
}

function Margin12() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container121 />
    </div>
  );
}

function Container126() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">Business travel &amp; hospitality</p>
      </div>
    </div>
  );
}

function Container128() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.6×</p>
      </div>
    </div>
  );
}

function Container127() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container128 />
    </div>
  );
}

function Background31() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_18%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container125() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___160px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container126 />
      <Container127 />
      <Background31 />
    </div>
  );
}

function Margin13() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container125 />
    </div>
  );
}

function Container130() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Health &amp; wellness</p>
      </div>
    </div>
  );
}

function Container132() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.5×</p>
      </div>
    </div>
  );
}

function Container131() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container132 />
    </div>
  );
}

function Background32() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_24%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container129() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___160px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container130 />
      <Container131 />
      <Background32 />
    </div>
  );
}

function Margin14() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container129 />
    </div>
  );
}

function Container134() {
  return (
    <div className="relative self-stretch shrink-0 w-[76.31px]" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#6b6b6b] text-[11px] top-[7.5px] w-[77.114px]">
        <p>
          <span className="leading-[16.5px]">{`Avg HHI `}</span>
          <span className="[word-break:break-word] font-['Jua:Regular',sans-serif] leading-[16.5px] not-italic text-[#1a1a1a]">$148k</span>
        </p>
      </div>
    </div>
  );
}

function Container135() {
  return (
    <div className="relative self-stretch shrink-0 w-[128.28px]" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] left-0 text-[#6b6b6b] text-[11px] top-[7.5px] w-[128.101px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">Dealership / in-person 72% · Online 28%</p>
      </div>
    </div>
  );
}

function Container133() {
  return (
    <div className="content-stretch flex flex-wrap gap-[0px_10px] h-[16.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container134 />
      <Container135 />
    </div>
  );
}

function Margin15() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container133 />
    </div>
  );
}

function Container116() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-center justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <Margin11 />
      <Margin12 />
      <Margin13 />
      <Margin14 />
      <Margin15 />
    </div>
  );
}

function Container113() {
  return (
    <div className="h-[128.5px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[16px] gap-y-[16px] grid grid-cols-[__250px_minmax(0,1fr)] grid-rows-[_128.50px] relative size-full">
        <BackgroundVerticalBorder1 />
        <Container116 />
      </div>
    </div>
  );
}

function PurchasePatterns() {
  return (
    <div className="bg-white col-[1/span_2] justify-self-stretch relative rounded-[14px] row-2 self-start shrink-0" data-name="Purchase patterns">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[17px] relative size-full">
        <Container108 />
        <Container113 />
      </div>
    </div>
  );
}

function Background33() {
  return (
    <div className="absolute bg-[#f1e9ff] h-[11px] left-[171.83px] rounded-[5px] top-[5.22px] w-[73.34px]" data-name="Background">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-[6px] not-italic text-[#6b3c72] text-[9px] top-[5.5px] tracking-[0.36px] w-[61.197px]">
        <p className="leading-[13.5px]">BEHAVIOURAL</p>
      </div>
    </div>
  );
}

function Container138() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#1a1a1a] text-[14px] top-[10px] w-[164.146px]">
        <p className="leading-[21px]">{`Weekend & lifestyle signals `}</p>
      </div>
      <Background33 />
    </div>
  );
}

function Container139() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">What they do outside work · venue visitation</p>
      </div>
    </div>
  );
}

function Container137() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start min-w-[245.1699981689453px] relative shrink-0 w-[245.17px]" data-name="Container">
      <Container138 />
      <Container139 />
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

function BackgroundBorder25() {
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

function BackgroundBorder26() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg20 />
    </div>
  );
}

function Svg21() {
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

function BackgroundBorder27() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg21 />
    </div>
  );
}

function Container140() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <BackgroundBorder25 />
      <BackgroundBorder26 />
      <BackgroundBorder27 />
    </div>
  );
}

function Margin16() {
  return (
    <div className="flex-[1_0_0] min-w-[109.37999725341797px] relative" data-name="Margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[593.453px] relative size-full">
          <Container140 />
        </div>
      </div>
    </div>
  );
}

function Container136() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8.007px] items-start relative size-full">
        <Container137 />
        <Margin16 />
      </div>
    </div>
  );
}

function Svg22() {
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

function Container142() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg22 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[9px] tracking-[1.08px] uppercase whitespace-nowrap">
        <p className="leading-[13.5px]">Takeaway</p>
      </div>
    </div>
  );
}

function Margin17() {
  return (
    <div className="mb-[-0.61px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6px] relative size-full">
        <Container142 />
      </div>
    </div>
  );
}

function Container143() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] w-full" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="mb-0">
            <span className="leading-[18.6px]">{`Car show & expo attendance`}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[18.6px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{` over-index highest`}</span>
          </p>
          <p className="mb-0">
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[18.6px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{`at `}</span>
            <span className="leading-[18.6px]">2.1×</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[18.6px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{`, ahead of fine dining & restaurants (1.7×),`}</span>
          </p>
          <p className="leading-[18.6px] mb-0 text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
            golf courses (1.5×) and premium fitness
          </p>
          <p className="leading-[18.6px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
            &amp; wellness (1.5×).
          </p>
        </div>
      </div>
    </div>
  );
}

function BackgroundVerticalBorder2() {
  return (
    <div className="bg-[#f1e9ff] col-1 justify-self-stretch relative rounded-[10px] row-1 self-start shrink-0" data-name="Background+VerticalBorder">
      <div aria-hidden className="absolute border-[#6b3c72] border-l-3 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pb-[12px] pl-[16px] pr-[13px] pt-[11px] relative size-full">
          <Margin17 />
          <Container143 />
        </div>
      </div>
    </div>
  );
}

function Container146() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Car show &amp; expo attendance</p>
      </div>
    </div>
  );
}

function Container148() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">2.1×</p>
      </div>
    </div>
  );
}

function Container147() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container148 />
    </div>
  );
}

function Background34() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#6b3c72] inset-[0_2%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container145() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___160px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container146 />
      <Container147 />
      <Background34 />
    </div>
  );
}

function Margin18() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container145 />
    </div>
  );
}

function Container150() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">Fine dining &amp; restaurants</p>
      </div>
    </div>
  );
}

function Container152() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.7×</p>
      </div>
    </div>
  );
}

function Container151() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container152 />
    </div>
  );
}

function Background35() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_20%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container149() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___160px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container150 />
      <Container151 />
      <Background35 />
    </div>
  );
}

function Margin19() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container149 />
    </div>
  );
}

function Container154() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Golf courses</p>
      </div>
    </div>
  );
}

function Container156() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.5×</p>
      </div>
    </div>
  );
}

function Container155() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container156 />
    </div>
  );
}

function Background36() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_28%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container153() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___160px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container154 />
      <Container155 />
      <Background36 />
    </div>
  );
}

function Margin20() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container153 />
    </div>
  );
}

function Container158() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Premium fitness &amp; wellness</p>
      </div>
    </div>
  );
}

function Container160() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.5×</p>
      </div>
    </div>
  );
}

function Container159() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container160 />
    </div>
  );
}

function Background37() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_32%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container157() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___160px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container158 />
      <Container159 />
      <Background37 />
    </div>
  );
}

function Margin21() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container157 />
    </div>
  );
}

function Container144() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-center justify-self-stretch py-[4.44px] relative row-1 self-start shrink-0" data-name="Container">
      <Margin18 />
      <Margin19 />
      <Margin20 />
      <Margin21 />
    </div>
  );
}

function Container141() {
  return (
    <div className="h-[116.88px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[16px] gap-y-[16px] grid grid-cols-[__250px_minmax(0,1fr)] grid-rows-[_116.88px] relative size-full">
        <BackgroundVerticalBorder2 />
        <Container144 />
      </div>
    </div>
  );
}

function WeekendLifestyle() {
  return (
    <div className="bg-white col-[1/span_2] justify-self-stretch relative rounded-[14px] row-3 self-start shrink-0" data-name="Weekend & lifestyle">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[17px] relative size-full">
        <Container136 />
        <Container141 />
      </div>
    </div>
  );
}

function Container163() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">{`Interests & brand affinity`}</p>
      </div>
    </div>
  );
}

function Container164() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap">
        <p className="leading-[16.5px]">{`Categories & brands they over-index for`}</p>
      </div>
    </div>
  );
}

function Container162() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[198px]" data-name="Container">
      <Container163 />
      <Container164 />
    </div>
  );
}

function Svg23() {
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

function BackgroundBorder28() {
  return (
    <div className="bg-[#f1e9ff] content-stretch flex gap-[5px] h-[24px] items-center pb-[5px] pt-[4px] px-[10px] relative rounded-[7px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#bebde7] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg23 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[10px] tracking-[0.2px] whitespace-nowrap">
        <p className="leading-[15px]">Ask</p>
      </div>
    </div>
  );
}

function Svg24() {
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

function BackgroundBorder29() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg24 />
    </div>
  );
}

function Svg25() {
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

function BackgroundBorder30() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg25 />
    </div>
  );
}

function Container165() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <BackgroundBorder28 />
      <BackgroundBorder29 />
      <BackgroundBorder30 />
    </div>
  );
}

function Margin22() {
  return (
    <div className="flex-[1_0_0] min-w-[109.37999725341797px] relative" data-name="Margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[640.766px] relative size-full">
          <Container165 />
        </div>
      </div>
    </div>
  );
}

function Container161() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8.004px] items-start relative size-full">
        <Container162 />
        <Margin22 />
      </div>
    </div>
  );
}

function Svg26() {
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

function Container167() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg26 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[9px] tracking-[1.08px] uppercase whitespace-nowrap">
        <p className="leading-[13.5px]">Takeaway</p>
      </div>
    </div>
  );
}

function Margin23() {
  return (
    <div className="mb-[-0.61px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6px] relative size-full">
        <Container167 />
      </div>
    </div>
  );
}

function Container168() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] w-full" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[18.6px] mb-0">Affinity is strongest for premium automotive and financial services brands.</p>
          <p className="mb-0">
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[18.6px] text-[#6b3c72]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              CarousellAuto
            </span>
            <span className="leading-[18.6px]">{` and `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[18.6px] text-[#6b3c72]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              BMW
            </span>
            <span className="leading-[18.6px]">{` cluster together. `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[18.6px] text-[#6b3c72]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              Mercedes-Benz
            </span>
            <span className="leading-[18.6px]">{` and `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[18.6px] text-[#6b3c72]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              Porsche
            </span>
            <span className="leading-[18.6px]">{` also`}</span>
          </p>
          <p className="leading-[18.6px]">over-index.</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundVerticalBorder3() {
  return (
    <div className="bg-[#f1e9ff] col-1 justify-self-stretch relative rounded-[10px] row-1 self-start shrink-0" data-name="Background+VerticalBorder">
      <div aria-hidden className="absolute border-[#6b3c72] border-l-3 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pb-[12px] pl-[16px] pr-[13px] pt-[11px] relative size-full">
          <Margin23 />
          <Container168 />
        </div>
      </div>
    </div>
  );
}

function Container172() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">CarousellAuto</p>
      </div>
    </div>
  );
}

function Container174() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">2.1×</p>
      </div>
    </div>
  );
}

function Container173() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container174 />
    </div>
  );
}

function Background38() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#6b3c72] inset-[0_2.01%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container171() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___110px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container172 />
      <Container173 />
      <Background38 />
    </div>
  );
}

function Margin24() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch pb-[9px] relative row-1 self-start shrink-0" data-name="Margin">
      <Container171 />
    </div>
  );
}

function Container176() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">BMW</p>
      </div>
    </div>
  );
}

function Container178() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.8×</p>
      </div>
    </div>
  );
}

function Container177() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container178 />
    </div>
  );
}

function Background39() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_16.01%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container175() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___110px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container176 />
      <Container177 />
      <Background39 />
    </div>
  );
}

function Margin25() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch pb-[9px] relative row-1 self-start shrink-0" data-name="Margin">
      <Container175 />
    </div>
  );
}

function Container180() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Mercedes-Benz</p>
      </div>
    </div>
  );
}

function Container182() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.9×</p>
      </div>
    </div>
  );
}

function Container181() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container182 />
    </div>
  );
}

function Background40() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#6b3c72] inset-[0_10.01%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container179() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___110px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container180 />
      <Container181 />
      <Background40 />
    </div>
  );
}

function Margin26() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch pb-[9px] relative row-2 self-start shrink-0" data-name="Margin">
      <Container179 />
    </div>
  );
}

function Container184() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Porsche</p>
      </div>
    </div>
  );
}

function Container186() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.7×</p>
      </div>
    </div>
  );
}

function Container185() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container186 />
    </div>
  );
}

function Background41() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_20%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container183() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___110px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container184 />
      <Container185 />
      <Background41 />
    </div>
  );
}

function Margin27() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch pb-[9px] relative row-2 self-start shrink-0" data-name="Margin">
      <Container183 />
    </div>
  );
}

function Container170() {
  return (
    <div className="gap-x-[28px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__27px_27px] h-[54px] relative shrink-0 w-full" data-name="Container">
      <Margin24 />
      <Margin25 />
      <Margin26 />
      <Margin27 />
    </div>
  );
}

function Container169() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-center justify-self-stretch py-[31.44px] relative row-1 self-start shrink-0" data-name="Container">
      <Container170 />
    </div>
  );
}

function Container166() {
  return (
    <div className="h-[116.88px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[16px] gap-y-[16px] grid grid-cols-[__250px_minmax(0,1fr)] grid-rows-[_116.88px] relative size-full">
        <BackgroundVerticalBorder3 />
        <Container169 />
      </div>
    </div>
  );
}

function BrandAffinity() {
  return (
    <div className="bg-white col-[1/span_2] justify-self-stretch relative rounded-[14px] row-4 self-start shrink-0" data-name="Brand affinity">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[17px] relative size-full">
        <Container161 />
        <Container166 />
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[____276.75px_214px_202.38px_202.38px] h-[960px] relative shrink-0 w-full" data-name="Container">
      <TopSegments />
      <PurchasePatterns />
      <WeekendLifestyle />
      <BrandAffinity />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <BackgroundBorder1 />
      <BackgroundBorder9 />
      <GlobalFilterBar />
      <AiKeyTakeawayHero />
      <Container42 />
      <Container81 />
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

function Margin28() {
  return <div className="h-[53px] max-w-[1280px] relative shrink-0 w-[1278.96px]" data-name="Margin" />;
}

export default function Screen1Profile() {
  return (
    <div className="content-stretch flex flex-col items-center relative size-full" data-name="SCREEN 1 — PROFILE">
      <BackgroundBorder />
      <Margin28 />
    </div>
  );
}