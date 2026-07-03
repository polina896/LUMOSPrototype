import svgPaths from "./svg-j76tss0hbz";

function Background() {
  return (
    <div className="bg-[#6b3c72] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[26px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-white whitespace-nowrap">
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
          <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
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
          <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[13px] whitespace-nowrap">
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
          <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[13px] whitespace-nowrap">
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
          <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[13px] whitespace-nowrap">
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
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[10px] tracking-[0.8px] uppercase whitespace-nowrap">
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
          <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.8px] uppercase whitespace-nowrap">
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
          <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
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
        <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white whitespace-nowrap">
          <p className="leading-[15px]">WR</p>
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[14.4px] mb-0">Weekend Runners —</p>
        <p className="leading-[14.4px]">Melbourne</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[13px] whitespace-nowrap">
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
        <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[10px] text-center whitespace-nowrap">
          <p className="leading-[15px]">GZ</p>
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[14.4px]">Gen Z Women — Melbourne</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[13px] whitespace-nowrap">
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
        <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[10px] text-center whitespace-nowrap">
          <p className="leading-[15px]">TU</p>
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[14.4px]">{`Tradies & Utes — National`}</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[13px] whitespace-nowrap">
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
        <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[10px] text-center whitespace-nowrap">
          <p className="leading-[15px]">EV</p>
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[14.4px] mb-0">Premium EV Intenders —</p>
        <p className="leading-[14.4px]">Sydney</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[13px] whitespace-nowrap">
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
          <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[12px] whitespace-nowrap">
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
    <div className="[word-break:break-word] font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] h-[27px] leading-[0] relative shrink-0 w-[328.81px]" data-name="Paragraph">
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
      <div className="[word-break:break-word] flex flex-col font-['Inter',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[11.4px] text-center whitespace-nowrap">
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
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
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
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">
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
        <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.6px] uppercase w-full">
          <p className="leading-[15px]">{`Peak day & hour`}</p>
        </div>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="[word-break:break-word] absolute h-[23.09px] leading-[0] left-0 top-0 w-[74.97px]" data-name="Paragraph">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Jua',sans-serif] justify-center left-0 not-italic text-[#1a1a1a] text-[21px] top-[11.5px] w-[34.104px]">
        <p className="leading-[23.1px]">{`Sat `}</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center left-[39.42px] text-[#6b6b6b] text-[12px] top-[14px] w-[35.12px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.2px]">6–9am</p>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="absolute bg-[#f1e9ff] content-stretch flex items-center left-[82.97px] px-[7px] py-[2px] rounded-[999px] top-[6px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">2.3×</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[25px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph1 />
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
        <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.6px] uppercase w-full">
          <p className="leading-[15px]">Weekly reach</p>
        </div>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="absolute bg-[#e7f3ec] content-stretch flex items-center left-[50.94px] px-[6px] py-[2px] rounded-[999px] top-[6px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#2f7d4f] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">▲ +14% vs Q4</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[25px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua',sans-serif] justify-center leading-[0] left-0 not-italic text-[#1a1a1a] text-[21px] top-[11.5px] w-[43.133px]">
          <p className="leading-[23.1px]">418k</p>
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
        <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.6px] uppercase w-full">
          <p className="leading-[15px]">Best channel</p>
        </div>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[17.59px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-baseline flex flex-wrap items-baseline pb-[1.59px] relative size-full">
        <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] min-w-px relative text-[#1a1a1a] text-[16px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[17.6px]">OOH · early AM</p>
        </div>
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
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.6px] uppercase w-full">
        <p className="leading-[15px]">Biggest event</p>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="absolute bg-[#f1e9ff] content-stretch flex items-center left-[74.88px] px-[7px] py-[2px] rounded-[999px] top-px" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">+58%</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua',sans-serif] justify-center leading-[0] left-0 not-italic text-[#1a1a1a] text-[16px] top-[8px] w-[67.104px]">
        <p className="leading-[17.6px]">Marathon</p>
      </div>
      <Background8 />
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
    <div className="absolute bg-white content-stretch flex flex-col gap-[12px] items-start left-0 px-[17px] py-[15px] right-0 rounded-[14px] top-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container23 />
      <Border />
    </div>
  );
}

function Container34() {
  return (
    <div className="flex-[1_0_0] min-w-px relative rounded-[9px] self-stretch" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center p-[10px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[13px] text-center whitespace-nowrap">
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
          <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[13px] text-center whitespace-nowrap">
            <p className="leading-[19.5px]">{`Mobility & Movement`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#f1e9ff] flex-[1_0_0] min-w-px relative rounded-[9px] self-stretch" data-name="Background">
      <div className="flex flex-col items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center p-[10px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[13px] text-center whitespace-nowrap">
            <p className="leading-[19.5px]">{`Temporal & Seasonal`}</p>
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
          <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[13px] text-center whitespace-nowrap">
            <p className="leading-[19.5px]">Digital Twin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder9() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[4px] h-[50px] items-start justify-center left-0 p-[5px] right-0 rounded-[12px] top-[153px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container34 />
      <Container35 />
      <Background9 />
      <Container36 />
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[9px] tracking-[0.54px] uppercase whitespace-nowrap">
          <p className="leading-[13.5px]">Date</p>
        </div>
      </div>
    </div>
  );
}

function Svg9() {
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
    <div className="-translate-y-1/2 absolute bg-white content-stretch flex gap-[9px] items-center left-0 px-[13px] py-[8px] rounded-[10px] top-1/2" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container38 />
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">Mar–May 2026</p>
      </div>
      <Svg9 />
    </div>
  );
}

function Container39() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[9px] tracking-[0.54px] uppercase whitespace-nowrap">
          <p className="leading-[13.5px]">Geography</p>
        </div>
      </div>
    </div>
  );
}

function Svg10() {
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
    <div className="-translate-y-1/2 absolute bg-white content-stretch flex gap-[9px] items-center left-[169.42px] px-[13px] py-[8px] rounded-[10px] top-1/2" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container39 />
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Greater Melbourne</p>
      </div>
      <Svg10 />
    </div>
  );
}

function Container40() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[9px] tracking-[0.54px] uppercase whitespace-nowrap">
          <p className="leading-[13.5px]">Indexed vs</p>
        </div>
      </div>
    </div>
  );
}

function Svg11() {
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
    <div className="-translate-y-1/2 absolute bg-white content-stretch flex gap-[9px] items-center left-[387.23px] px-[13px] py-[8px] rounded-[10px] top-1/2" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container40 />
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Metro average</p>
      </div>
      <Svg11 />
    </div>
  );
}

function Svg12() {
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

function Container41() {
  return (
    <div className="opacity-70 relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[9px] tracking-[0.54px] uppercase whitespace-nowrap">
          <p className="leading-[13.5px]">Compare</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder13() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#f1e9ff] content-stretch flex gap-[9px] items-center left-[584.47px] px-[13px] py-[8px] rounded-[10px] top-1/2" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#bebde7] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Svg12 />
      <Container41 />
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">vs same period last year</p>
      </div>
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#f1e9ff] relative self-stretch shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[7.5px] pt-[6px] px-[12px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[11px] whitespace-nowrap">
          <p className="leading-[16.5px]">Index</p>
        </div>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[7.5px] pt-[6px] px-[12px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[11px] whitespace-nowrap">
          <p className="leading-[16.5px]">%</p>
        </div>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[7.5px] pt-[6px] px-[12px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[11px] whitespace-nowrap">
          <p className="leading-[16.5px]">Count</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder14() {
  return (
    <div className="-translate-y-1/2 absolute bg-white h-[32.5px] left-[853.72px] rounded-[9px] top-1/2" data-name="Background+Border">
      <div className="content-stretch flex items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Background10 />
        <Container42 />
        <Container43 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[9px]" />
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute h-[34px] left-0 right-0 top-[214.5px]" data-name="Container">
      <BackgroundBorder10 />
      <BackgroundBorder11 />
      <BackgroundBorder12 />
      <BackgroundBorder13 />
      <BackgroundBorder14 />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">{`Peak days & dayparts`}</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">Weekday × daypart · indexed density · densest Sat 6–9am (2.3×)</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[311px]" data-name="Container">
      <Container47 />
      <Container48 />
    </div>
  );
}

function Svg13() {
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
      <Svg13 />
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[10px] tracking-[0.2px] whitespace-nowrap">
        <p className="leading-[15px]">Ask</p>
      </div>
    </div>
  );
}

function Svg14() {
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

function BackgroundBorder16() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg14 />
    </div>
  );
}

function Svg15() {
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

function BackgroundBorder17() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg15 />
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <BackgroundBorder15 />
      <BackgroundBorder16 />
      <BackgroundBorder17 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="flex-[1_0_0] min-w-[109.37999725341797px] relative" data-name="Margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[526.016px] relative size-full">
          <Container49 />
        </div>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8.004px] items-start relative size-full">
        <Container46 />
        <Margin2 />
      </div>
    </div>
  );
}

function Svg16() {
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

function Container51() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg16 />
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[9px] tracking-[1.08px] uppercase whitespace-nowrap">
        <p className="leading-[13.5px]">Takeaway</p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="mb-[-0.61px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6px] relative size-full">
        <Container51 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] w-full" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="mb-0">
            <span className="leading-[18.6px]">{`Density peaks at `}</span>
            <span className="[word-break:break-word] font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[18.6px] text-[#6b3c72]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              Saturday 6–9am (2.3×)
            </span>
            <span className="leading-[18.6px]">,</span>
          </p>
          <p className="mb-0">
            <span className="leading-[18.6px]">{`with `}</span>
            <span className="[word-break:break-word] font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[18.6px] text-[#6b3c72]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              Sunday 6–9am
            </span>
            <span className="leading-[18.6px]">{` the next highest.`}</span>
          </p>
          <p className="leading-[18.6px] mb-0">Weekday mornings index moderately;</p>
          <p className="leading-[18.6px]">midday and late dayparts are lowest.</p>
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
        <div className="content-stretch flex flex-col items-start justify-center pb-[23.56px] pl-[16px] pr-[13px] pt-[22.56px] relative size-full">
          <Margin3 />
          <Container52 />
        </div>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="col-2 content-stretch flex h-[15.5px] items-center justify-center justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[15px]">Mon</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="col-3 content-stretch flex h-[15.5px] items-center justify-center justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[15px]">Tue</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="col-4 content-stretch flex h-[15.5px] items-center justify-center justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[15px]">Wed</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="col-5 content-stretch flex h-[15.5px] items-center justify-center justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[15px]">Thu</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="col-6 content-stretch flex h-[15.5px] items-center justify-center justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[15px]">Fri</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="col-7 content-stretch flex h-[15.5px] items-center justify-center justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[15px]">Sat</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="col-8 content-stretch flex h-[15.5px] items-center justify-center justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[15px]">Sun</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="col-1 content-stretch flex h-[22px] items-center justify-self-stretch pb-[4px] pt-[3px] relative row-2 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">6–9a</p>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#e6dbe9] col-2 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-2 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-[#d8c6dc] col-3 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-2 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background13() {
  return (
    <div className="bg-[#e6dbe9] col-4 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-2 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background14() {
  return (
    <div className="bg-[#d8c6dc] col-5 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-2 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background15() {
  return (
    <div className="bg-[#cdb6d2] col-6 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-2 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background16() {
  return (
    <div className="bg-[#6b3c72] col-7 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-2 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9px] text-center text-white whitespace-nowrap">
        <p className="leading-[13.5px]">★</p>
      </div>
    </div>
  );
}

function Background17() {
  return (
    <div className="bg-[#9a6ba1] col-8 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-2 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[9px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="col-1 content-stretch flex h-[22px] items-center justify-self-stretch pb-[4px] pt-[3px] relative row-3 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">9–12</p>
      </div>
    </div>
  );
}

function Background18() {
  return (
    <div className="bg-[#f1eaf3] col-2 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-3 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background19() {
  return (
    <div className="bg-[#efe7f1] col-3 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-3 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background20() {
  return (
    <div className="bg-[#f1eaf3] col-4 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-3 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background21() {
  return (
    <div className="bg-[#efe7f1] col-5 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-3 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background22() {
  return (
    <div className="bg-[#e6dbe9] col-6 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-3 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background23() {
  return (
    <div className="bg-[#b890bd] col-7 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-3 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[9px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background24() {
  return (
    <div className="bg-[#a679ac] col-8 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-3 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[9px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="col-1 content-stretch flex h-[22px] items-center justify-self-stretch pb-[4px] pt-[3px] relative row-4 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">12–3p</p>
      </div>
    </div>
  );
}

function Background25() {
  return (
    <div className="bg-[#f7f3f8] col-2 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-4 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background26() {
  return (
    <div className="bg-[#f7f3f8] col-3 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-4 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background27() {
  return (
    <div className="bg-[#f7f3f8] col-4 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-4 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background28() {
  return (
    <div className="bg-[#f1eaf3] col-5 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-4 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background29() {
  return (
    <div className="bg-[#efe7f1] col-6 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-4 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background30() {
  return (
    <div className="bg-[#cdb6d2] col-7 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-4 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background31() {
  return (
    <div className="bg-[#cdb6d2] col-8 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-4 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="col-1 content-stretch flex h-[22px] items-center justify-self-stretch pb-[4px] pt-[3px] relative row-5 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">3–6p</p>
      </div>
    </div>
  );
}

function Background32() {
  return (
    <div className="bg-[#e6dbe9] col-2 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-5 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background33() {
  return (
    <div className="bg-[#d8c6dc] col-3 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-5 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background34() {
  return (
    <div className="bg-[#d8c6dc] col-4 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-5 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background35() {
  return (
    <div className="bg-[#cdb6d2] col-5 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-5 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background36() {
  return (
    <div className="bg-[#c0a3c6] col-6 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-5 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[9px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background37() {
  return (
    <div className="bg-[#d8c6dc] col-7 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-5 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background38() {
  return (
    <div className="bg-[#e6dbe9] col-8 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-5 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="col-1 content-stretch flex h-[22px] items-center justify-self-stretch pb-[4px] pt-[3px] relative row-6 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">6–9p</p>
      </div>
    </div>
  );
}

function Background39() {
  return (
    <div className="bg-[#d8c6dc] col-2 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-6 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background40() {
  return (
    <div className="bg-[#cdb6d2] col-3 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-6 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background41() {
  return (
    <div className="bg-[#c0a3c6] col-4 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-6 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[9px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background42() {
  return (
    <div className="bg-[#cdb6d2] col-5 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-6 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background43() {
  return (
    <div className="bg-[#efe7f1] col-6 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-6 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background44() {
  return (
    <div className="bg-[#f1eaf3] col-7 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-6 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background45() {
  return (
    <div className="bg-[#f1eaf3] col-8 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-6 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="gap-x-[3px] gap-y-[3px] grid grid-cols-[________70px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] grid-rows-[______15px_22px_22px_22px_22px_22px] h-[140px] relative shrink-0 w-full" data-name="Container">
      <Container55 />
      <Container56 />
      <Container57 />
      <Container58 />
      <Container59 />
      <Container60 />
      <Container61 />
      <Container62 />
      <Background11 />
      <Background12 />
      <Background13 />
      <Background14 />
      <Background15 />
      <Background16 />
      <Background17 />
      <Container63 />
      <Background18 />
      <Background19 />
      <Background20 />
      <Background21 />
      <Background22 />
      <Background23 />
      <Background24 />
      <Container64 />
      <Background25 />
      <Background26 />
      <Background27 />
      <Background28 />
      <Background29 />
      <Background30 />
      <Background31 />
      <Container65 />
      <Background32 />
      <Background33 />
      <Background34 />
      <Background35 />
      <Background36 />
      <Background37 />
      <Background38 />
      <Container66 />
      <Background39 />
      <Background40 />
      <Background41 />
      <Background42 />
      <Background43 />
      <Background44 />
      <Background45 />
    </div>
  );
}

function Container53() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-center justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <Container54 />
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[140px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[16px] gap-y-[16px] grid grid-cols-[__250px_minmax(0,1fr)] grid-rows-[_140px] relative size-full">
        <BackgroundVerticalBorder />
        <Container53 />
      </div>
    </div>
  );
}

function PeakDaysDayparts() {
  return (
    <div className="bg-white col-[1/span_2] justify-self-stretch relative rounded-[14px] row-1 self-start shrink-0" data-name="Peak days & dayparts">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[17px] relative size-full">
        <Container45 />
        <Container50 />
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">Volume over time</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">Weekly reach · this year vs last year · events annotated</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[272px]" data-name="Container">
      <Container69 />
      <Container70 />
    </div>
  );
}

function Svg17() {
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

function BackgroundBorder18() {
  return (
    <div className="bg-[#f1e9ff] content-stretch flex gap-[5px] h-[24px] items-center pb-[5px] pt-[4px] px-[10px] relative rounded-[7px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#bebde7] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg17 />
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[10px] tracking-[0.2px] whitespace-nowrap">
        <p className="leading-[15px]">Ask</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-[4.5px] pt-[3.5px] px-[9px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[10px] whitespace-nowrap">
            <p className="leading-[15px]">Snapshot</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Svg18() {
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

function Background46() {
  return (
    <div className="bg-[#f1e9ff] relative self-stretch shrink-0" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center pb-[4.5px] pt-[3.5px] px-[9px] relative size-full">
          <Svg18 />
          <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap">
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
        <Container72 />
        <Background46 />
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

function Svg19() {
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

function BackgroundBorder19() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg19 />
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <BackgroundBorder18 />
      <Margin5 />
      <BackgroundBorder19 />
    </div>
  );
}

function Margin4() {
  return (
    <div className="flex-[1_0_0] min-w-[208.3300018310547px] relative" data-name="Margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[466.203px] relative size-full">
          <Container71 />
        </div>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.997px] items-start relative size-full">
        <Container68 />
        <Margin4 />
      </div>
    </div>
  );
}

function Svg20() {
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

function Container74() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg20 />
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[9px] tracking-[1.08px] uppercase whitespace-nowrap">
        <p className="leading-[13.5px]">Takeaway</p>
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6px] relative size-full">
        <Container74 />
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] w-full">
          <p className="mb-0">
            <span className="leading-[18.6px]">{`Weekly reach runs `}</span>
            <span className="[word-break:break-word] font-['Jua',sans-serif] leading-[18.6px] not-italic text-[#6b3c72]">+14%</span>
            <span className="leading-[18.6px]">{` above the same`}</span>
          </p>
          <p className="leading-[18.6px] mb-0">period last year, and the gap widens into</p>
          <p className="mb-0">
            <span className="leading-[18.6px]">{`spring. Event spikes: `}</span>
            <span className="[word-break:break-word] font-['Jua',sans-serif] leading-[18.6px] not-italic text-[#6b3c72]">Run Melbourne</span>
          </p>
          <p className="mb-0">
            <span className="[word-break:break-word] font-['Jua',sans-serif] leading-[18.6px] not-italic text-[#6b3c72]">(+39%)</span>
            <span className="leading-[18.6px]">{` and the `}</span>
            <span className="[word-break:break-word] font-['Jua',sans-serif] leading-[18.6px] not-italic text-[#6b3c72]">Melbourne Marathon</span>
          </p>
          <p>
            <span className="[word-break:break-word] font-['Jua',sans-serif] leading-[18.6px] not-italic text-[#6b3c72]">(+58%)</span>
            <span className="leading-[18.6px]">.</span>
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
        <div className="content-stretch flex flex-col items-start justify-center pb-[31.51px] pl-[16px] pr-[13px] pt-[30.52px] relative size-full">
          <Margin6 />
          <Container75 />
        </div>
      </div>
    </div>
  );
}

function Svg21() {
  return (
    <div className="h-[150px] overflow-clip relative shrink-0 w-full" data-name="SVG">
      <div className="absolute inset-[80%_6.52%_20%_6.52%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 600 1">
            <path d="M0 0.5H600" id="Vector" stroke="var(--stroke-0, #E5E5E2)" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[49.33%_6.52%_30.67%_6.52%]" data-name="Vector">
        <div className="absolute inset-[-3.35%_0_-3.32%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 600.112 32.0026">
            <path d={svgPaths.paceaac0} id="Vector" opacity="0.7" stroke="var(--stroke-0, #9A9A9A)" strokeDasharray="5 4" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[26.67%_6.52%_36%_6.52%]" data-name="Vector">
        <div className="absolute inset-[-2.73%_0_-2.66%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 600.282 59.0224">
            <path d={svgPaths.pd3ac3c0} id="Vector" stroke="var(--stroke-0, #6B3C72)" strokeWidth="3" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[36%_61.01%_58.67%_37.83%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <path d={svgPaths.p65069f0} fill="var(--fill-0, #6B3C72)" id="Vector" />
        </svg>
      </div>
      <p className="[word-break:break-word] absolute font-['Jua',sans-serif] inset-[25.33%_55.51%_66%_34.93%] leading-[normal] not-italic text-[#6b3c72] text-[10px] whitespace-nowrap">Run Melb +39%</p>
      <div className="absolute inset-[24%_21.16%_70.67%_77.68%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <path d={svgPaths.p65069f0} fill="var(--fill-0, #6B3C72)" id="Vector" />
        </svg>
      </div>
      <p className="[word-break:break-word] absolute font-['Jua',sans-serif] inset-[13.33%_15.22%_78%_74.64%] leading-[normal] not-italic text-[#6b3c72] text-[10px] whitespace-nowrap">Marathon +58%</p>
      <p className="[word-break:break-word] absolute font-['Jua',sans-serif] inset-[88.67%_91.3%_4%_6.52%] leading-[normal] not-italic text-[#9a9a9a] text-[9px] whitespace-nowrap">Jun</p>
      <p className="[word-break:break-word] absolute font-['Jua',sans-serif] inset-[88.67%_49.86%_4%_47.83%] leading-[normal] not-italic text-[#9a9a9a] text-[9px] whitespace-nowrap">Nov</p>
      <p className="[word-break:break-word] absolute font-['Jua',sans-serif] inset-[88.67%_7.83%_4%_89.86%] leading-[normal] not-italic text-[#9a9a9a] text-[9px] whitespace-nowrap">May</p>
      <div className="absolute inset-[61.33%_7.39%_25.33%_74.64%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 124 20">
          <path d={svgPaths.p31a6a8f0} fill="var(--fill-0, #E7F3EC)" id="Vector" />
        </svg>
      </div>
      <p className="[word-break:break-word] absolute font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] inset-[64%_10.72%_27.33%_75.8%] leading-[normal] text-[#2f7d4f] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        ▲ +14% vs last year
      </p>
    </div>
  );
}

function Container78() {
  return (
    <div className="relative self-stretch shrink-0 w-[59.66px]" data-name="Container">
      <div className="absolute bg-[#6b3c72] left-0 rounded-[3px] size-[9px] top-[4.13px]" data-name="Background" />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua',sans-serif] justify-center leading-[0] left-[14px] not-italic text-[#6b6b6b] text-[11px] top-[7.5px] w-[46.137px]">
        <p className="leading-[16.5px]">This year</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="relative self-stretch shrink-0 w-[61.94px]" data-name="Container">
      <div className="absolute bg-[#9a9a9a] left-0 rounded-[3px] size-[9px] top-[4.13px]" data-name="Background" />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua',sans-serif] justify-center leading-[0] left-[14px] not-italic text-[#6b6b6b] text-[11px] top-[7.5px] w-[48.149px]">
        <p className="leading-[16.5px]">Last year</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex flex-wrap gap-[0px_10px] h-[16.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container78 />
      <Container79 />
    </div>
  );
}

function Margin7() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container77 />
    </div>
  );
}

function Container76() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-center justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <Svg21 />
      <Margin7 />
    </div>
  );
}

function Container73() {
  return (
    <div className="h-[174.5px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[16px] gap-y-[16px] grid grid-cols-[__250px_minmax(0,1fr)] grid-rows-[_174.50px] relative size-full">
        <BackgroundVerticalBorder1 />
        <Container76 />
      </div>
    </div>
  );
}

function VolumeOverTimeTheTrendChartWithYoYCompare() {
  return (
    <div className="bg-white col-[1/span_2] justify-self-stretch relative rounded-[14px] row-2 self-start shrink-0" data-name="Volume over time — THE trend chart with YoY compare">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[17px] relative size-full">
        <Container67 />
        <Container73 />
      </div>
    </div>
  );
}

function Background47() {
  return (
    <div className="absolute bg-[#f1e9ff] h-[11px] left-[194.44px] rounded-[5px] top-[5.22px] w-[73.34px]" data-name="Background">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua',sans-serif] justify-center leading-[0] left-[6px] not-italic text-[#6b3c72] text-[9px] top-[5.5px] tracking-[0.36px] w-[61.197px]">
        <p className="leading-[13.5px]">BEHAVIOURAL</p>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua',sans-serif] justify-center leading-[0] left-0 not-italic text-[#1a1a1a] text-[14px] top-[10px] w-[187.162px]">
        <p className="leading-[21px]">{`Best time to reach, by channel `}</p>
      </div>
      <Background47 />
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">When this audience is most reachable on each channel · indexed</p>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[301px]" data-name="Container">
      <Container82 />
      <Container83 />
    </div>
  );
}

function Svg22() {
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

function BackgroundBorder20() {
  return (
    <div className="bg-[#f1e9ff] content-stretch flex gap-[5px] h-[24px] items-center pb-[5px] pt-[4px] px-[10px] relative rounded-[7px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#bebde7] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg22 />
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[10px] tracking-[0.2px] whitespace-nowrap">
        <p className="leading-[15px]">Ask</p>
      </div>
    </div>
  );
}

function Svg23() {
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

function BackgroundBorder21() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg23 />
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex gap-[3.99px] items-center relative shrink-0" data-name="Container">
      <BackgroundBorder20 />
      <BackgroundBorder21 />
    </div>
  );
}

function Margin8() {
  return (
    <div className="flex-[1_0_0] min-w-[81.37999725341797px] relative" data-name="Margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[565.297px] relative size-full">
          <Container84 />
        </div>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8.003px] items-start relative size-full">
        <Container81 />
        <Margin8 />
      </div>
    </div>
  );
}

function Svg24() {
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

function Container86() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg24 />
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[9px] tracking-[1.08px] uppercase whitespace-nowrap">
        <p className="leading-[13.5px]">Takeaway</p>
      </div>
    </div>
  );
}

function Margin9() {
  return (
    <div className="mb-[-0.61px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6px] relative size-full">
        <Container86 />
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] w-full">
          <p className="leading-[18.6px] mb-0">Each channel peaks in a different window</p>
          <p className="mb-0">
            <span className="leading-[18.6px]">{`(★): `}</span>
            <span className="[word-break:break-word] font-['Jua',sans-serif] leading-[18.6px] not-italic text-[#6b3c72]">OOH early morning</span>
            <span className="leading-[18.6px]">{`, `}</span>
            <span className="[word-break:break-word] font-['Jua',sans-serif] leading-[18.6px] not-italic text-[#6b3c72]">social weekday</span>
          </p>
          <p className="mb-0">
            <span className="[word-break:break-word] font-['Jua',sans-serif] leading-[18.6px] not-italic text-[#6b3c72]">evenings</span>
            <span className="leading-[18.6px]">{`, `}</span>
            <span className="[word-break:break-word] font-['Jua',sans-serif] leading-[18.6px] not-italic text-[#6b3c72]">retail media weekends</span>
            <span className="leading-[18.6px]">{` and`}</span>
          </p>
          <p>
            <span className="[word-break:break-word] font-['Jua',sans-serif] leading-[18.6px] not-italic text-[#6b3c72]">BVOD/CTV late</span>
            <span className="leading-[18.6px]">.</span>
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
          <Margin9 />
          <Container87 />
        </div>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="col-2 content-stretch flex h-[15.5px] items-center justify-center justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[15px]">Early AM</p>
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="col-3 content-stretch flex h-[15.5px] items-center justify-center justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[15px]">Daytime</p>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="col-4 content-stretch flex h-[15.5px] items-center justify-center justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[15px]">Evening</p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="col-5 content-stretch flex h-[15.5px] items-center justify-center justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[15px]">Late</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="col-6 content-stretch flex h-[15.5px] items-center justify-center justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[15px]">Weekend</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="col-1 content-stretch flex h-[22px] items-center justify-self-stretch pb-[4px] pt-[3px] relative row-2 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">OOH (panels)</p>
      </div>
    </div>
  );
}

function Background48() {
  return (
    <div className="bg-[#6b3c72] col-2 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-2 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9px] text-center text-white whitespace-nowrap">
        <p className="leading-[13.5px]">★</p>
      </div>
    </div>
  );
}

function Background49() {
  return (
    <div className="bg-[#cdb6d2] col-3 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-2 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background50() {
  return (
    <div className="bg-[#d8c6dc] col-4 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-2 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background51() {
  return (
    <div className="bg-[#f1eaf3] col-5 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-2 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background52() {
  return (
    <div className="bg-[#9a6ba1] col-6 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-2 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[9px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="col-1 content-stretch flex h-[22px] items-center justify-self-stretch pb-[4px] pt-[3px] relative row-3 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">Social</p>
      </div>
    </div>
  );
}

function Background53() {
  return (
    <div className="bg-[#e6dbe9] col-2 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-3 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background54() {
  return (
    <div className="bg-[#cdb6d2] col-3 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-3 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background55() {
  return (
    <div className="bg-[#6b3c72] col-4 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-3 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9px] text-center text-white whitespace-nowrap">
        <p className="leading-[13.5px]">★</p>
      </div>
    </div>
  );
}

function Background56() {
  return (
    <div className="bg-[#b890bd] col-5 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-3 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[9px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background57() {
  return (
    <div className="bg-[#cdb6d2] col-6 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-3 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="col-1 content-stretch flex h-[22px] items-center justify-self-stretch pb-[4px] pt-[3px] relative row-4 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">Retail media</p>
      </div>
    </div>
  );
}

function Background58() {
  return (
    <div className="bg-[#f1eaf3] col-2 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-4 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background59() {
  return (
    <div className="bg-[#b890bd] col-3 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-4 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[9px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background60() {
  return (
    <div className="bg-[#cdb6d2] col-4 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-4 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background61() {
  return (
    <div className="bg-[#efe7f1] col-5 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-4 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background62() {
  return (
    <div className="bg-[#6b3c72] col-6 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-4 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9px] text-center text-white whitespace-nowrap">
        <p className="leading-[13.5px]">★</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="col-1 content-stretch flex h-[22px] items-center justify-self-stretch pb-[4px] pt-[3px] relative row-5 shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">BVOD / CTV</p>
      </div>
    </div>
  );
}

function Background63() {
  return (
    <div className="bg-[#f7f3f8] col-2 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-5 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background64() {
  return (
    <div className="bg-[#efe7f1] col-3 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-5 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background65() {
  return (
    <div className="bg-[#9a6ba1] col-4 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-5 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[9px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Background66() {
  return (
    <div className="bg-[#6b3c72] col-5 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-5 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9px] text-center text-white whitespace-nowrap">
        <p className="leading-[13.5px]">★</p>
      </div>
    </div>
  );
}

function Background67() {
  return (
    <div className="bg-[#cdb6d2] col-6 content-stretch flex h-[22px] items-center justify-center justify-self-stretch relative rounded-[4px] row-5 shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.5px]">·</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="gap-x-[3px] gap-y-[3px] grid grid-cols-[______120px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] grid-rows-[_____15px_22px_22px_22px_22px] h-[115px] relative shrink-0 w-full" data-name="Container">
      <Container90 />
      <Container91 />
      <Container92 />
      <Container93 />
      <Container94 />
      <Container95 />
      <Background48 />
      <Background49 />
      <Background50 />
      <Background51 />
      <Background52 />
      <Container96 />
      <Background53 />
      <Background54 />
      <Background55 />
      <Background56 />
      <Background57 />
      <Container97 />
      <Background58 />
      <Background59 />
      <Background60 />
      <Background61 />
      <Background62 />
      <Container98 />
      <Background63 />
      <Background64 />
      <Background65 />
      <Background66 />
      <Background67 />
    </div>
  );
}

function Container88() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-center justify-self-stretch py-[0.94px] relative row-1 self-start shrink-0" data-name="Container">
      <Container89 />
    </div>
  );
}

function Container85() {
  return (
    <div className="h-[116.88px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[16px] gap-y-[16px] grid grid-cols-[__250px_minmax(0,1fr)] grid-rows-[_116.88px] relative size-full">
        <BackgroundVerticalBorder2 />
        <Container88 />
      </div>
    </div>
  );
}

function BestTimeByChannel() {
  return (
    <div className="bg-white col-[1/span_2] justify-self-stretch relative rounded-[14px] row-3 self-start shrink-0" data-name="Best time by channel">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[17px] relative size-full">
        <Container80 />
        <Container85 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[___225.50px_260px_202.38px] h-[711.88px] left-0 right-0 top-[539.39px]" data-name="Container">
      <PeakDaysDayparts />
      <VolumeOverTimeTheTrendChartWithYoYCompare />
      <BestTimeByChannel />
    </div>
  );
}

function Container102() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">Composition by daypart</p>
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap">
        <p className="leading-[16.5px]">How the segment mix changes through the day</p>
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[223px]" data-name="Container">
      <Container102 />
      <Container103 />
    </div>
  );
}

function Container100() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container101 />
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[7px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[11px] w-full" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[16.5px]">Early AM (6–9)</p>
        </div>
      </div>
    </div>
  );
}

function Background68() {
  return (
    <div className="bg-[#6b3c72] h-full relative shrink-0 w-[289.91px]" data-name="Background">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[3px] pt-[2px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white whitespace-nowrap">
            <p className="leading-[15px]">Pre-work fitness 64%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background69() {
  return (
    <div className="bg-[#bebde7] h-full relative shrink-0 w-[163.08px]" data-name="Background">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[3px] pt-[2px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[10px] text-center whitespace-nowrap">
            <p className="leading-[15px]">Leisure 36%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Border2() {
  return (
    <div className="h-[22px] relative rounded-[7px] shrink-0 w-full" data-name="Border">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Background68 />
        <Background69 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
    </div>
  );
}

function Container105() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[5px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[11px] w-full" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[16.5px]">Midday (12–3)</p>
        </div>
      </div>
    </div>
  );
}

function Background70() {
  return (
    <div className="bg-[#6b3c72] h-full relative shrink-0 w-[135.89px]" data-name="Background">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[3px] pt-[2px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white whitespace-nowrap">
            <p className="leading-[15px]">Pre-work 30%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background71() {
  return (
    <div className="bg-[#bebde7] h-full relative shrink-0 w-[317.09px]" data-name="Background">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[3px] pt-[2px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[10px] text-center whitespace-nowrap">
            <p className="leading-[15px]">Leisure / family 70%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Border3() {
  return (
    <div className="h-[22px] relative rounded-[7px] shrink-0 w-full" data-name="Border">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Background70 />
        <Background71 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
    </div>
  );
}

function BackgroundBorder22() {
  return (
    <div className="bg-[#fafaf8] col-1 justify-self-stretch relative rounded-[14px] row-1 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-[50px] pt-[17px] px-[17px] relative size-full">
        <Container100 />
        <Container104 />
        <Border2 />
        <Container105 />
        <Border3 />
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">Event moments</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">Spikes that lift the audience — and by how much</p>
      </div>
    </div>
  );
}

function Container107() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[234px]" data-name="Container">
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

function Cell() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8.5px] pt-[7px] px-[8px] relative shrink-0 w-[118.97px]" data-name="Cell">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[normal]">Event moment</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8.5px] pt-[7px] px-[8px] relative shrink-0 w-[71.45px]" data-name="Cell">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[normal]">Window</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8.5px] pt-[7px] px-[8px] relative shrink-0 w-[67.81px]" data-name="Cell">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[normal]">Lift</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8.5px] pt-[7px] px-[8px] relative shrink-0 w-[196.77px]" data-name="Cell">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[normal]">Who lifts most</p>
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
    <div className="content-stretch flex flex-col items-start pb-[11.5px] pt-[10.5px] px-[8px] relative shrink-0 w-[118.97px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[normal]">F1 Grand Prix</p>
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[11.5px] pt-[10.5px] px-[8px] relative shrink-0 w-[71.45px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[12px] whitespace-nowrap">
        <p className="leading-[normal]">Mar</p>
      </div>
    </div>
  );
}

function Background72() {
  return (
    <div className="bg-[#e7f3ec] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-[4px] pt-[3px] px-[6px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2f7d4f] text-[10px] whitespace-nowrap">
          <p className="leading-[normal]">+47%</p>
        </div>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] pt-[8px] px-[8px] relative shrink-0 w-[67.81px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <Background72 />
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[11.5px] pt-[10.5px] px-[8px] relative shrink-0 w-[196.77px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[normal]">Males 21–54 · Albert Park</p>
      </div>
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
    <div className="content-stretch flex flex-col items-start pb-[11.5px] pt-[10.5px] px-[8px] relative shrink-0 w-[118.97px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[normal]">Run Melbourne</p>
      </div>
    </div>
  );
}

function Data5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[11.5px] pt-[10.5px] px-[8px] relative shrink-0 w-[71.45px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[12px] whitespace-nowrap">
        <p className="leading-[normal]">Jul</p>
      </div>
    </div>
  );
}

function Background73() {
  return (
    <div className="bg-[#e7f3ec] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-[4px] pt-[3px] px-[6px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2f7d4f] text-[10px] whitespace-nowrap">
          <p className="leading-[normal]">+39%</p>
        </div>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] pt-[8px] px-[8px] relative shrink-0 w-[67.81px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <Background73 />
    </div>
  );
}

function Data7() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[11.5px] pt-[10.5px] px-[8px] relative shrink-0 w-[196.77px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[normal]">Est. Families · CBD</p>
      </div>
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
    <div className="content-stretch flex flex-col items-start pb-[11.5px] pt-[10.5px] px-[8px] relative shrink-0 w-[118.97px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[normal]">Melb Marathon</p>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[11.5px] pt-[10.5px] px-[8px] relative shrink-0 w-[71.45px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[12px] whitespace-nowrap">
        <p className="leading-[normal]">Oct</p>
      </div>
    </div>
  );
}

function Background74() {
  return (
    <div className="bg-[#e7f3ec] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-[4px] pt-[3px] px-[6px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2f7d4f] text-[10px] whitespace-nowrap">
          <p className="leading-[normal]">+58%</p>
        </div>
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] pt-[8px] px-[8px] relative shrink-0 w-[67.81px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <Background74 />
    </div>
  );
}

function Data11() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[11.5px] pt-[10.5px] px-[8px] relative shrink-0 w-[196.77px]" data-name="Data">
      <div aria-hidden className="absolute border-[#e5e5e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[normal]">Young Pros · bayside</p>
      </div>
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

function BackgroundBorder23() {
  return (
    <div className="bg-[#fafaf8] col-2 justify-self-stretch relative rounded-[14px] row-1 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[17px] relative size-full">
        <Container106 />
        <Table />
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="absolute gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_213.50px] h-[213.5px] left-0 right-0 top-[1251.27px]" data-name="Container">
      <BackgroundBorder22 />
      <BackgroundBorder23 />
    </div>
  );
}

function Svg25() {
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

function Container110() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Svg25 />
        <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] tracking-[1.2px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[15px]">Takeaway · when to reach them</p>
        </div>
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="max-w-[807.8389892578125px] relative shrink-0 w-[807.83px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] pt-[1.2px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[20px] whitespace-nowrap">
          <p className="leading-[26px]">Density peaks sharply on Saturday morning, and weekly reach is up year on year.</p>
        </div>
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="max-w-[652.3930053710938px] relative shrink-0 w-[652.39px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] pb-[7.795px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="mb-0">
            <span className="leading-[20.8px]">{`Density peaks `}</span>
            <span className="[word-break:break-word] font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              Saturday 6–9am at 2.3×
            </span>
            <span className="leading-[20.8px]">, with a smaller Sunday-morning peak. By channel, OOH indexes highest in</span>
          </p>
          <p className="mb-0">
            <span className="leading-[20.8px]">{`the `}</span>
            <span className="[word-break:break-word] font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              early morning
            </span>
            <span className="leading-[20.8px]">{`, social on `}</span>
            <span className="[word-break:break-word] font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              weekday evenings
            </span>
            <span className="leading-[20.8px]">{` and retail media on `}</span>
            <span className="[word-break:break-word] font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              weekends
            </span>
            <span className="leading-[20.8px]">{`. Weekly reach is `}</span>
            <span className="[word-break:break-word] font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              +14%
            </span>
            <span className="leading-[20.8px]">{` on the same`}</span>
          </p>
          <p>
            <span className="leading-[20.8px]">{`period last year, with event spikes at `}</span>
            <span className="[word-break:break-word] font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              Run Melbourne (+39%)
            </span>
            <span className="leading-[20.8px]">{` and the `}</span>
            <span className="[word-break:break-word] font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              Melbourne Marathon (+58%)
            </span>
            <span className="leading-[20.8px]">.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[18px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[27px]">Sat 6–9am</p>
      </div>
    </div>
  );
}

function Container115() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Peak window</p>
      </div>
    </div>
  );
}

function Container113() {
  return (
    <div className="relative self-stretch shrink-0 w-[87px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container114 />
        <Container115 />
      </div>
    </div>
  );
}

function Container117() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[18px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[27px]">2.3×</p>
      </div>
    </div>
  );
}

function Container118() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Peak index</p>
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="relative self-stretch shrink-0 w-[59px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container117 />
        <Container118 />
      </div>
    </div>
  );
}

function Background75() {
  return (
    <div className="absolute bg-[#e7f3ec] content-stretch flex items-center left-[42.79px] px-[6px] py-[2px] rounded-[999px] top-[6px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#2f7d4f] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">▲ +14%</p>
      </div>
    </div>
  );
}

function Container120() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua',sans-serif] justify-center leading-[0] left-0 not-italic text-[#6b3c72] text-[18px] top-[13px] w-[37.112px]">
        <p className="leading-[27px]">418k</p>
      </div>
      <Background75 />
    </div>
  );
}

function Container121() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Weekly reach YoY</p>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="relative self-stretch shrink-0 w-[98px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container120 />
        <Container121 />
      </div>
    </div>
  );
}

function Container123() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[18px] whitespace-nowrap">
        <p className="leading-[27px]">+58%</p>
      </div>
    </div>
  );
}

function Container124() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Marathon lift</p>
      </div>
    </div>
  );
}

function Container122() {
  return (
    <div className="relative self-stretch shrink-0 w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container123 />
        <Container124 />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="h-[59px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[#bebde7] border-dashed border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-wrap gap-[0px_26px] items-start pt-[15px] relative size-full">
        <Container113 />
        <Container116 />
        <Container119 />
        <Container122 />
      </div>
    </div>
  );
}

function Svg26() {
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

function Container126() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[73.45px]" data-name="Container">
      <Svg26 />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua',sans-serif] justify-center leading-[0] left-[19px] not-italic text-[#6b3c72] text-[11px] top-[calc(50%-0.75px)] w-[55.162px]">
        <p className="leading-[16.5px]">Regenerate</p>
      </div>
    </div>
  );
}

function Svg27() {
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

function Container127() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[94.27px]" data-name="Container">
      <Svg27 />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua',sans-serif] justify-center leading-[0] left-[19px] not-italic text-[#6b3c72] text-[11px] top-[calc(50%-0.75px)] w-[76.112px]">
        <p className="leading-[16.5px]">Ask a follow-up</p>
      </div>
    </div>
  );
}

function Container125() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14px] items-center pt-[5.2px] relative size-full">
        <Container126 />
        <Container127 />
      </div>
    </div>
  );
}

function BackgroundBorder24() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#f7f1ff] gap-[7.8px] items-start left-0 px-[21px] py-[19px] right-0 rounded-[14px] to-[#fbfaff] top-[262.5px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#bebde7] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container110 />
      <Container111 />
      <Container112 />
      <HorizontalBorder />
      <Container125 />
    </div>
  );
}

function Container22() {
  return (
    <div className="flex-[1_0_0] h-[1464.77px] min-w-px relative" data-name="Container">
      <BackgroundBorder6 />
      <BackgroundBorder9 />
      <Container37 />
      <Container44 />
      <Container99 />
      <BackgroundBorder24 />
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

function Margin10() {
  return <div className="h-[34px] max-w-[1280px] relative shrink-0 w-[1117px]" data-name="Margin" />;
}

export default function Screen3Temporal() {
  return (
    <div className="content-stretch flex flex-col items-center relative size-full" data-name="SCREEN 3 — TEMPORAL">
      <BackgroundBorder />
      <Margin10 />
    </div>
  );
}