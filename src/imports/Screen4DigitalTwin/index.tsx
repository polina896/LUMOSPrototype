import svgPaths from "./svg-nrlgex52fq";

function Background() {
  return (
    <div className="bg-[#6b3c72] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[26px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-white whitespace-nowrap">
        <p className="leading-[19.5px]">KC</p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d="M3.5 5.25L7 8.75L10.5 5.25" id="Vector" stroke="var(--stroke-0, #9A9A9A)" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Svg />
    </div>
  );
}

function Margin() {
  return (
    <div className="flex-[1_0_0] min-w-[14px] relative" data-name="Margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[79.203px] relative size-full">
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pb-[14px] pt-[2px] px-[8px] relative size-full">
          <Background />
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
            <p className="leading-[21px]">Koala Cola</p>
          </div>
          <Margin />
        </div>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p38233680} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center px-[10px] py-[8px] relative size-full">
          <Svg1 />
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[13px] whitespace-nowrap">
            <p className="leading-[19.5px]">Home</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p2ffa4080} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center px-[10px] py-[8px] relative size-full">
          <Svg2 />
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[13px] whitespace-nowrap">
            <p className="leading-[19.5px]">Data Explorer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p2eba19f0} id="Vector" stroke="var(--stroke-0, #6B3C72)" strokeWidth="1.33333" />
          <path d={svgPaths.p291e4000} id="Vector_2" stroke="var(--stroke-0, #6B3C72)" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center px-[10px] py-[8px] relative size-full">
          <Svg3 />
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[13px] whitespace-nowrap">
            <p className="leading-[19.5px]">Audiences</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container4 />
        <Container5 />
        <Background1 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[10px] tracking-[0.8px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">4</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[8px] pt-[15.5px] px-[8px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.8px] uppercase whitespace-nowrap">
            <p className="leading-[15px]">Your audiences</p>
          </div>
          <Container7 />
        </div>
      </div>
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p2725de00} id="Vector" stroke="var(--stroke-0, #9A9A9A)" strokeWidth="1.16667" />
          <path d="M12.25 12.25L9.91667 9.91667" id="Vector_2" stroke="var(--stroke-0, #9A9A9A)" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[11px] py-[9px] relative size-full">
          <Svg4 />
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
            <p className="leading-[18px]">Search audiences…</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#6b3c72] relative rounded-[7px] shrink-0 size-[26px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[6px] pt-[5px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white whitespace-nowrap">
          <p className="leading-[15px]">WR</p>
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[14.4px] mb-0">Weekend Runners —</p>
        <p className="leading-[14.4px]">Melbourne</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[13px] whitespace-nowrap">
        <p className="leading-[19.5px]">612k</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="min-w-[160px] relative shrink-0 w-[160px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start min-w-[inherit] relative size-full">
        <Container10 />
        <Container11 />
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[10px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#6b3c72] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[9px] items-center px-[11px] py-[10px] relative size-full">
          <Background2 />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#f3f3f1] relative rounded-[7px] shrink-0 size-[26px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[6px] pt-[5px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[10px] text-center whitespace-nowrap">
          <p className="leading-[15px]">GZ</p>
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[14.4px]">Gen Z Women — Melbourne</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[13px] whitespace-nowrap">
        <p className="leading-[19.5px]">560k</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 w-[142px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container13 />
        <Container14 />
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-white relative rounded-[10px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[9px] items-center px-[11px] py-[10px] relative size-full">
          <Background3 />
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#f3f3f1] relative rounded-[7px] shrink-0 size-[26px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[6px] pt-[5px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[10px] text-center whitespace-nowrap">
          <p className="leading-[15px]">TU</p>
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[14.4px]">{`Tradies & Utes — National`}</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[13px] whitespace-nowrap">
        <p className="leading-[19.5px]">1.2M</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 w-[143px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container16 />
        <Container17 />
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="bg-white relative rounded-[10px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[9px] items-center px-[11px] py-[10px] relative size-full">
          <Background4 />
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#f3f3f1] relative rounded-[7px] shrink-0 size-[26px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[6px] pt-[5px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[10px] text-center whitespace-nowrap">
          <p className="leading-[15px]">EV</p>
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[14.4px] mb-0">Premium EV Intenders —</p>
        <p className="leading-[14.4px]">Sydney</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[13px] whitespace-nowrap">
        <p className="leading-[19.5px]">284k</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="min-w-[160px] relative shrink-0 w-[160px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start min-w-[inherit] relative size-full">
        <Container19 />
        <Container20 />
      </div>
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="bg-white relative rounded-[10px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[9px] items-center px-[11px] py-[10px] relative size-full">
          <Background5 />
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start pt-[10px] relative size-full">
        <BackgroundBorder2 />
        <BackgroundBorder3 />
        <BackgroundBorder4 />
        <BackgroundBorder5 />
      </div>
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p3cabda00} id="Vector" stroke="var(--stroke-0, #6B3C72)" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7px] items-center pb-[8px] pt-[18px] px-[10px] relative size-full">
          <Svg5 />
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[12px] whitespace-nowrap">
            <p className="leading-[18px]">New audience</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function VerticalBorder() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[15px] relative shrink-0 w-[232px]" data-name="VerticalBorder">
      <div aria-hidden className="absolute border-[#e5e5e2] border-r border-solid inset-0 pointer-events-none" />
      <Container1 />
      <Container3 />
      <Container6 />
      <BackgroundBorder1 />
      <Container8 />
      <Container21 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] h-[27px] leading-[0] relative shrink-0 w-[328.81px]" data-name="Paragraph">
      <div className="-translate-y-1/2 absolute flex flex-col justify-center left-0 text-[#1a1a1a] text-[18px] top-[13px] w-[244.106px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[27px]">{`Weekend Runners — Melbourne `}</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col justify-center left-[248.69px] text-[#9a9a9a] text-[11px] top-[14.5px] w-[80.126px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">· updated 2d ago</p>
      </div>
    </div>
  );
}

function Svg6() {
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
      <Svg6 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[11.4px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Defined by</p>
      </div>
    </div>
  );
}

function Svg7() {
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

function BackgroundBorder7() {
  return (
    <div className="bg-white content-stretch flex gap-[6px] items-center px-[13px] py-[8px] relative rounded-[8px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Svg7 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Export</p>
      </div>
    </div>
  );
}

function Svg8() {
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

function BackgroundBorder8() {
  return (
    <div className="bg-[#6b3c72] content-stretch flex gap-[6px] items-center px-[13px] py-[8px] relative rounded-[8px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#6b3c72] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Svg8 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">
        <p className="leading-[18px]">Ask Lumos</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Button />
      <BackgroundBorder7 />
      <BackgroundBorder8 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="flex-[1_0_0] min-w-[300.04998779296875px] relative" data-name="Margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[315.141px] relative size-full">
          <Container24 />
        </div>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.999px] items-center relative size-full">
        <Paragraph />
        <Margin1 />
      </div>
    </div>
  );
}

function Container25() {
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

function Background6() {
  return (
    <div className="absolute bg-[#f3f3f1] content-stretch flex items-center left-[50.81px] px-[7px] py-[2px] rounded-[999px] top-[6px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">Gtr Melbourne</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[25px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#1a1a1a] text-[21px] top-[11.5px] w-[43.131px]">
          <p className="leading-[23.1px]">612k</p>
        </div>
        <Background6 />
      </div>
    </div>
  );
}

function VerticalBorder1() {
  return (
    <div className="relative self-stretch shrink-0 w-[238.75px]" data-name="VerticalBorder">
      <div aria-hidden className="absolute border-[#e5e5e2] border-r border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3px] items-start pl-[14px] pr-[15px] py-[10px] relative size-full">
        <Container25 />
        <Container26 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.6px] uppercase w-full">
          <p className="leading-[15px]">Index vs metro</p>
        </div>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="absolute bg-[#e7f3ec] content-stretch flex items-center left-[45.3px] px-[6px] py-[2px] rounded-[999px] top-[6px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#2f7d4f] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">▲ +0.2×</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[25px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] left-0 text-[#1a1a1a] text-[21px] top-[11.5px] w-[38.106px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[23.1px]">1.8×</p>
        </div>
        <Background7 />
      </div>
    </div>
  );
}

function VerticalBorder2() {
  return (
    <div className="relative self-stretch shrink-0 w-[238.75px]" data-name="VerticalBorder">
      <div aria-hidden className="absolute border-[#e5e5e2] border-r border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3px] items-start pl-[14px] pr-[15px] py-[10px] relative size-full">
        <Container27 />
        <Container28 />
      </div>
    </div>
  );
}

function Container29() {
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
        <p className="leading-[13.2px]">7–9am</p>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="absolute bg-[#f1e9ff] content-stretch flex items-center left-[82.81px] px-[7px] py-[2px] rounded-[999px] top-[6px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">2.3×</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[25px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph1 />
        <Background8 />
      </div>
    </div>
  );
}

function VerticalBorder3() {
  return (
    <div className="relative self-stretch shrink-0 w-[238.75px]" data-name="VerticalBorder">
      <div aria-hidden className="absolute border-[#e5e5e2] border-r border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3px] items-start pl-[14px] pr-[15px] py-[10px] relative size-full">
        <Container29 />
        <Container30 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.6px] uppercase w-full">
        <p className="leading-[15px]">Distinctive</p>
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="absolute bg-[#f1e9ff] content-stretch flex items-center left-[48.58px] px-[7px] py-[2px] rounded-[999px] top-[6px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">run local</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[25px] relative shrink-0 w-full" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#1a1a1a] text-[21px] top-[11.5px] w-[41.12px]">
        <p className="leading-[23.1px]">58%</p>
      </div>
      <Background9 />
    </div>
  );
}

function Container31() {
  return (
    <div className="relative self-stretch shrink-0 w-[237.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3px] items-start px-[14px] py-[10px] relative size-full">
        <Container32 />
        <Container33 />
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Border">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <VerticalBorder1 />
        <VerticalBorder2 />
        <VerticalBorder3 />
        <Container31 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function BackgroundBorder6() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start px-[17px] py-[15px] relative size-full">
        <Container23 />
        <Border />
      </div>
    </div>
  );
}

function Container34() {
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

function Container35() {
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

function Container36() {
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

function Background10() {
  return (
    <div className="bg-[#f1e9ff] flex-[1_0_0] min-w-px relative rounded-[9px] self-stretch" data-name="Background">
      <div className="flex flex-col items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center p-[10px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[13px] text-center whitespace-nowrap">
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
          <Container34 />
          <Container35 />
          <Container36 />
          <Background10 />
        </div>
      </div>
    </div>
  );
}

function Svg9() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.pff358a0} id="Vector" stroke="var(--stroke-0, #6B3C72)" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container37() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Svg9 />
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] tracking-[1.2px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[15px]">Takeaway · talk to a synthetic stand-in</p>
        </div>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="max-w-[807.8389892578125px] relative shrink-0 w-[807.83px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] pt-[1.1px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[20px] whitespace-nowrap">
          <p className="leading-[26px]">A synthetic stand-in of this audience, built from the measured data in the other three tabs.</p>
        </div>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="max-w-[652.3930053710938px] relative shrink-0 w-[652.39px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] pb-[0.69px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="mb-0">
            <span className="leading-[20.8px]">{`Ask it about messaging, product or price and it answers in-character. Every answer shows what’s `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              measured
            </span>
            <span className="leading-[20.8px]">{` vs`}</span>
          </p>
          <p>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              modelled
            </span>
            <span className="leading-[20.8px]">, so you can see where the data ends and the model begins.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function TakeawayFramedAsIfThisAudienceWereAPerson() {
  return (
    <div className="bg-gradient-to-b from-[#f7f1ff] relative rounded-[14px] shrink-0 to-[#fbfaff] w-full" data-name="Takeaway framed as 'if this audience were a person">
      <div aria-hidden className="absolute border border-[#bebde7] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[7.9px] items-start px-[21px] py-[19px] relative size-full">
        <Container37 />
        <Container38 />
        <Container39 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">Who do you want to talk to?</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap">
        <p className="leading-[16.5px]">Synthetic personas, modelled from the measured atoms</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[265px]" data-name="Container">
      <Container42 />
      <Container43 />
    </div>
  );
}

function Container40() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container41 />
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#6b3c72] relative rounded-[15px] shrink-0 size-[30px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans_Math:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-white whitespace-nowrap">
          <p className="leading-[19.5px]">∑</p>
        </div>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Whole audience</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">612k · blended</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="relative shrink-0 w-[79px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container46 />
        <Container47 />
      </div>
    </div>
  );
}

function BackgroundBorder10() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[10px] self-stretch shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#6b3c72] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[9px] items-center px-[13px] py-[10px] relative size-full">
          <Background11 />
          <Container45 />
        </div>
      </div>
    </div>
  );
}

function Background12() {
  return (
    <div className="relative rounded-[15px] shrink-0 size-[30px] overflow-hidden" data-name="Background">
      <img
        src="https://images.unsplash.com/photo-1759476532615-aadb5fc0a4fe?crop=faces&fit=crop&w=60&h=60&auto=format&q=80"
        alt="Mara, 34"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Mara, 34</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">Weekend Runner · Brunswick</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="relative shrink-0 w-[122px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container49 />
        <Container50 />
      </div>
    </div>
  );
}

function BackgroundBorder11() {
  return (
    <div className="bg-[#fafaf8] relative rounded-[10px] self-stretch shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[9px] items-center px-[13px] py-[10px] relative size-full">
          <Background12 />
          <Container48 />
        </div>
      </div>
    </div>
  );
}

function Background13() {
  return (
    <div className="relative rounded-[15px] shrink-0 size-[30px] overflow-hidden" data-name="Background">
      <img
        src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?crop=faces&fit=crop&w=60&h=60&auto=format&q=80"
        alt="Daniel, 41"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Daniel, 41</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">Family Trailgoer · Sandringham</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="relative shrink-0 w-[135px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container52 />
        <Container53 />
      </div>
    </div>
  );
}

function BackgroundBorder12() {
  return (
    <div className="bg-[#fafaf8] relative rounded-[10px] self-stretch shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[9px] items-center px-[13px] py-[10px] relative size-full">
          <Background13 />
          <Container51 />
        </div>
      </div>
    </div>
  );
}

function Background14() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[15px] shrink-0 size-[30px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[13px] text-center whitespace-nowrap">
          <p className="leading-[19.5px]">+</p>
        </div>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">New persona</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">from a segment</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="relative shrink-0 w-[68px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container55 />
        <Container56 />
      </div>
    </div>
  );
}

function BackgroundBorder13() {
  return (
    <div className="bg-[#fafaf8] relative rounded-[10px] self-stretch shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[9px] items-center px-[13px] py-[10px] relative size-full">
          <Background14 />
          <Container54 />
        </div>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[53px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-wrap gap-[0px_10px] items-start relative size-full">
        <BackgroundBorder10 />
        <BackgroundBorder11 />
        <BackgroundBorder12 />
        <BackgroundBorder13 />
      </div>
    </div>
  );
}

function WhoYoureTalkingTo() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 w-full" data-name="Who you're talking to">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[10px] items-start pb-[17px] pt-[19px] px-[17px] relative size-full">
        <Container40 />
        <Container44 />
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">Talk to the digital twin of this audience</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap">
        <p className="leading-[16.5px]">{`Pressure-test messaging, products & price in natural language`}</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[302px]" data-name="Container">
      <Container59 />
      <Container60 />
    </div>
  );
}

function Svg10() {
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

function BackgroundBorder14() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg10 />
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <BackgroundBorder14 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="flex-[1_0_0] min-w-[24px] relative" data-name="Margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[622.406px] relative size-full">
          <Container61 />
        </div>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8.004px] items-start relative size-full">
        <Container58 />
        <Margin2 />
      </div>
    </div>
  );
}

function Background15() {
  return (
    <div className="bg-[#f1e9ff] max-w-[745.6799926757812px] relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[12px] py-[10px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[12px] whitespace-nowrap">
          <p className="leading-[18px]">What do they actually buy, and which competitor stores do they visit?</p>
        </div>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="content-stretch flex flex-col items-start pl-[560.547px] relative size-full">
        <Background15 />
      </div>
    </div>
  );
}

function BackgroundBorder16() {
  return (
    <div className="bg-[#f3f3f1] content-stretch flex flex-col items-start px-[7px] py-[2px] relative rounded-[5px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[9px] whitespace-nowrap">
        <p className="leading-[13.5px]">measured</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-center flex flex-wrap gap-[0px_6px] items-center relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[15px]">{`Grounded in: Purchase patterns · Competitor & POI visitation`}</p>
        </div>
        <BackgroundBorder16 />
      </div>
    </div>
  );
}

function BackgroundBorder15() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex flex-col gap-[7px] items-start max-w-[745.6799926757812px] px-[13px] py-[11px] relative rounded-[12px] shrink-0 w-[745.67px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px] mb-0">They skew heavily to sports nutrition (1.9×) and athleisure (1.8×), avg basket $48, mostly in-store. On visitation, 42% have been to</p>
        <p className="leading-[18px] mb-0">rebel Sport in the last 3 months (1.6× metro), 31% a lululemon store, 27% Nike or a specialty running store — so they’re actively</p>
        <p className="leading-[18px]">shopping the category, not just browsing.</p>
      </div>
      <Container63 />
    </div>
  );
}

function Background16() {
  return (
    <div className="bg-[#f1e9ff] max-w-[745.6799926757812px] relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[12px] py-[10px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[12px] whitespace-nowrap">
          <p className="leading-[18px]">Best way and time to reach them for a launch?</p>
        </div>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="content-stretch flex flex-col items-start pl-[684.172px] relative size-full">
        <Background16 />
      </div>
    </div>
  );
}

function BackgroundBorder18() {
  return (
    <div className="bg-[#f3f3f1] content-stretch flex flex-col items-start px-[7px] py-[2px] relative rounded-[5px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[9px] whitespace-nowrap">
        <p className="leading-[13.5px]">measured</p>
      </div>
    </div>
  );
}

function Background17() {
  return (
    <div className="bg-[#f1e9ff] content-stretch flex flex-col items-start px-[6px] py-px relative rounded-[5px] shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[9px] whitespace-nowrap">
        <p className="leading-[13.5px]">modelled</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-center flex flex-wrap gap-[0px_6px] items-center relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[15px]">Grounded in: Peak dayparts · Best time by channel · Brand affinity</p>
        </div>
        <BackgroundBorder18 />
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[15px]">· phrasing</p>
        </div>
        <Background17 />
      </div>
    </div>
  );
}

function BackgroundBorder17() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex flex-col gap-[7px] items-start max-w-[745.6799926757812px] px-[13px] py-[11px] relative rounded-[12px] shrink-0 w-[745.67px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px] mb-0">OOH around home at Sat 6–9am is your strongest single window (2.3×). Pair it with social on weekday evenings and retail media on</p>
        <p className="leading-[18px]">weekends. A “tested on your weekend route” message will land better than race-day performance for this crowd.</p>
      </div>
      <Container64 />
    </div>
  );
}

function Background18() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[999px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col items-start pb-[5.5px] pt-[4px] px-[11px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[11px] whitespace-nowrap">
          <p className="leading-[16.5px]">What do they buy?</p>
        </div>
      </div>
    </div>
  );
}

function Background19() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[999px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col items-start pb-[5.5px] pt-[4px] px-[11px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[11px] whitespace-nowrap">
          <p className="leading-[16.5px]">Which competitor stores do they visit?</p>
        </div>
      </div>
    </div>
  );
}

function Background20() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[999px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col items-start pb-[5.5px] pt-[4px] px-[11px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[11px] whitespace-nowrap">
          <p className="leading-[16.5px]">{`Best channel & time to reach them?`}</p>
        </div>
      </div>
    </div>
  );
}

function Background21() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[999px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col items-start pb-[5.5px] pt-[4px] px-[11px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[11px] whitespace-nowrap">
          <p className="leading-[16.5px]">How would they react to a $260 launch?</p>
        </div>
      </div>
    </div>
  );
}

function Background22() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[999px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col items-start pb-[5.5px] pt-[4px] px-[11px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[11px] whitespace-nowrap">
          <p className="leading-[16.5px]">Stress-test message A vs B</p>
        </div>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-wrap gap-[0px_6px] h-[36.5px] items-start pt-[10px] relative shrink-0 w-full" data-name="Container">
      <Background18 />
      <Background19 />
      <Background20 />
      <Background21 />
      <Background22 />
    </div>
  );
}

function Container62() {
  return (
    <div className="min-h-[300px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start min-h-[inherit] pt-[4px] relative size-full">
        <Margin3 />
        <BackgroundBorder15 />
        <Margin4 />
        <BackgroundBorder17 />
        <Container65 />
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[12px] w-full" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[18px]">Ask the audience anything — message, product, price, channel…</p>
        </div>
      </div>
    </div>
  );
}

function Svg11() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_10016_817)" id="SVG">
          <path d={svgPaths.ped1e00} id="Vector" stroke="var(--stroke-0, #6B3C72)" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_10016_817">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BackgroundBorder19() {
  return (
    <div className="bg-[#fafaf8] relative rounded-[10px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#6b3c72] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[14px] py-[12px] relative size-full">
          <Container66 />
          <Svg11 />
        </div>
      </div>
    </div>
  );
}

function TheConversation() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 w-full" data-name="The conversation">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[17px] relative size-full">
        <Container57 />
        <Container62 />
        <BackgroundBorder19 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px relative" data-name="Container">
      <BackgroundBorder6 />
      <BackgroundBorder9 />
      <TakeawayFramedAsIfThisAudienceWereAPerson />
      <WhoYoureTalkingTo />
      <TheConversation />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative size-full">
        <VerticalBorder />
        <Container22 />
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

function Margin5() {
  return <div className="h-[34px] max-w-[1280px] relative shrink-0 w-[1078px]" data-name="Margin" />;
}

export default function Screen4DigitalTwin() {
  return (
    <div className="content-stretch flex flex-col items-center relative size-full" data-name="SCREEN 4 — DIGITAL TWIN">
      <BackgroundBorder />
      <Margin5 />
    </div>
  );
}