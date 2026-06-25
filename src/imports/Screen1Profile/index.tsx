import svgPaths from "./svg-yptu59m6vc";

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
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
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
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
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
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
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
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
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
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
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
    <div className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] h-[27px] leading-[0] relative shrink-0 w-[328.81px]" data-name="Paragraph">
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
    <div className="absolute bg-[#e7f3ec] content-stretch flex items-center left-[50.81px] px-[6px] py-[2px] rounded-[999px] top-[6px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#2f7d4f] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">▲ +3% vs Q4</p>
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
    <div className="relative self-stretch shrink-0 flex-1" data-name="VerticalBorder">
      <div aria-hidden className="absolute border-[#e5e5e2] border-r border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3px] items-start px-[16px] py-[14px] relative size-full">
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
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#2f7d4f] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">▲ +0.2×</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[25px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] left-0 text-[#1a1a1a] text-[21px] top-[11.5px] w-[38.106px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[23.1px]">1.8×</p>
        </div>
        <Background7 />
      </div>
    </div>
  );
}

function VerticalBorder2() {
  return (
    <div className="relative self-stretch shrink-0 flex-1" data-name="VerticalBorder">
      <div aria-hidden className="absolute border-[#e5e5e2] border-r border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3px] items-start px-[16px] py-[14px] relative size-full">
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
      <div className="-translate-y-1/2 absolute flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center left-[39.42px] text-[#6b6b6b] text-[12px] top-[14px] w-[35.117px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[13.2px]">7–9am</p>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="absolute bg-[#f1e9ff] content-stretch flex items-center left-[82.81px] px-[7px] py-[2px] rounded-[999px] top-[6px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
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
    <div className="relative self-stretch shrink-0 flex-1" data-name="VerticalBorder">
      <div aria-hidden className="absolute border-[#e5e5e2] border-r border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3px] items-start px-[16px] py-[14px] relative size-full">
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
    <div className="relative self-stretch shrink-0 flex-1" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3px] items-start px-[16px] py-[14px] relative size-full">
        <Container32 />
        <Container33 />
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="relative rounded-[10px] shrink-0 w-full" data-name="Border">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-stretch justify-center overflow-clip p-px relative rounded-[inherit] w-full">
        <VerticalBorder1 />
        <VerticalBorder2 />
        <VerticalBorder3 />
        <Container31 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function BackgroundBorder9() {
  return (
    <div className="absolute bg-[#f3f3f1] bottom-[33.5px] content-stretch flex flex-col items-start left-0 pb-[5.5px] pt-[4px] px-[11px] rounded-[999px] top-[13px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p>
          <span className="leading-[16.5px]">Filters:</span>
          <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[16.5px] text-[#6b6b6b]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{` Running-app users · park/trail dwell`}</span>
        </p>
      </div>
    </div>
  );
}

function BackgroundBorder10() {
  return (
    <div className="absolute bg-[#f3f3f1] bottom-[33.5px] content-stretch flex flex-col items-start left-[239.59px] pb-[5.5px] pt-[4px] px-[11px] rounded-[999px] top-[13px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p>
          <span className="leading-[16.5px]">Sources:</span>
          <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[16.5px] text-[#6b6b6b]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{` LUMOS panels · GWI · Telco · Card & loyalty`}</span>
        </p>
      </div>
    </div>
  );
}

function BackgroundBorder11() {
  return (
    <div className="absolute bg-[#f3f3f1] bottom-[33.5px] content-stretch flex flex-col items-start left-[526.64px] pb-[5.5px] pt-[4px] px-[11px] rounded-[999px] top-[13px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p>
          <span className="leading-[16.5px]">Window:</span>
          <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[16.5px] text-[#6b6b6b]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{` Mar–May 2026 · rolling 90d`}</span>
        </p>
      </div>
    </div>
  );
}

function BackgroundBorder12() {
  return (
    <div className="absolute bg-[#f3f3f1] bottom-[33.5px] content-stretch flex flex-col items-start left-[733.09px] pb-[5.5px] pt-[4px] px-[11px] rounded-[999px] top-[13px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[11px] whitespace-nowrap">
        <p>
          <span className="leading-[16.5px]">Geo:</span>
          <span className="[word-break:break-word] font-['Jua:Regular',sans-serif] leading-[16.5px] not-italic text-[#6b6b6b]">{` Greater Melbourne`}</span>
        </p>
      </div>
    </div>
  );
}

function BackgroundBorder13() {
  return (
    <div className="absolute bg-[#f3f3f1] bottom-0 content-stretch flex flex-col items-start left-0 pb-[5.5px] pt-[4px] px-[11px] rounded-[999px] top-[46.5px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p>
          <span className="leading-[16.5px]">Confidence:</span>
          <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[16.5px] text-[#6b6b6b]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{` ±2.1% @ 95% CI`}</span>
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
        <BackgroundBorder9 />
        <BackgroundBorder10 />
        <BackgroundBorder11 />
        <BackgroundBorder12 />
        <BackgroundBorder13 />
      </div>
    </div>
  );
}

function BackgroundBorder6() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-[27px] pt-[15px] px-[17px] relative size-full">
        <Container23 />
        <Border />
        <HorizontalBorder />
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
            <p className="leading-[19.5px]">Audience Profile</p>
          </div>
        </div>
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
            <p className="leading-[19.5px]">{`Mobility & Movement`}</p>
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
          <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[13px] text-center whitespace-nowrap">
            <p className="leading-[19.5px]">Digital Twin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder14() {
  return (
    <div className="bg-white h-[50px] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-start justify-center p-[5px] relative size-full">
          <Background10 />
          <Container34 />
          <Container35 />
          <Container36 />
        </div>
      </div>
    </div>
  );
}

function Container37() {
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

function BackgroundBorder15() {
  return (
    <div className="-translate-y-1/2 absolute bg-white content-stretch flex gap-[9px] items-center left-0 px-[13px] py-[8px] rounded-[10px] top-[calc(50%+6px)]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container37 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">Mar–May 2026</p>
      </div>
      <Svg9 />
    </div>
  );
}

function Container38() {
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

function BackgroundBorder16() {
  return (
    <div className="-translate-y-1/2 absolute bg-white content-stretch flex gap-[9px] items-center left-[169.42px] px-[13px] py-[8px] rounded-[10px] top-[calc(50%+6px)]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container38 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Greater Melbourne</p>
      </div>
      <Svg10 />
    </div>
  );
}

function Container39() {
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

function BackgroundBorder17() {
  return (
    <div className="-translate-y-1/2 absolute bg-white content-stretch flex gap-[9px] items-center left-[387.23px] px-[13px] py-[8px] rounded-[10px] top-[calc(50%+6px)]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container39 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
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

function Container40() {
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

function BackgroundBorder18() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#f1e9ff] content-stretch flex gap-[9px] items-center left-[584.47px] px-[13px] py-[8px] rounded-[10px] top-[calc(50%+6px)]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#bebde7] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Svg12 />
      <Container40 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">vs previous quarter</p>
      </div>
    </div>
  );
}

function Background11() {
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

function Container41() {
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

function Container42() {
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

function BackgroundBorder19() {
  return (
    <div className="-translate-y-1/2 absolute bg-white h-[32.5px] left-[853.72px] rounded-[9px] top-[calc(50%+6px)]" data-name="Background+Border">
      <div className="content-stretch flex items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Background11 />
        <Container41 />
        <Container42 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[9px]" />
    </div>
  );
}

function GlobalFilterBar() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="GLOBAL FILTER BAR">
      <BackgroundBorder15 />
      <BackgroundBorder16 />
      <BackgroundBorder17 />
      <BackgroundBorder18 />
      <BackgroundBorder19 />
    </div>
  );
}

function Svg13() {
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

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.4px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">Updated for Mar–May 2026</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex h-[15px] items-start relative shrink-0" data-name="Container">
      <Container45 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="flex-[1_0_0] min-w-[146.30999755859375px] relative" data-name="Margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[616.875px] relative size-full">
          <Container44 />
        </div>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Svg13 />
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] tracking-[1.2px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[15px]">Takeaway · who they are</p>
        </div>
        <Margin2 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="max-w-[807.8389892578125px] relative shrink-0 w-[807.83px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] pt-[1.3px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[20px] whitespace-nowrap">
          <p className="leading-[26px] mb-0">Affluent inner-city professionals who over-index across fitness retail, food and active</p>
          <p className="leading-[26px]">brands.</p>
        </div>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="max-w-[652.3930053710938px] relative shrink-0 w-[652.39px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] pb-[7.3px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="mb-0">
            <span className="leading-[20.8px]">{`Weekend Runners over-index highest on `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              sports nutrition (1.9×)
            </span>
            <span className="leading-[20.8px]">{` and `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{`athleisure & footwear (1.8×)`}</span>
            <span className="leading-[20.8px]">, with an average</span>
          </p>
          <p className="mb-0">
            <span className="leading-[20.8px]">{`basket of `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              $48
            </span>
            <span className="leading-[20.8px]">{` and 64% of spend in-store. They skew `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              professional (1.4×)
            </span>
            <span className="leading-[20.8px]">{` and slightly female (54%), and`}</span>
          </p>
          <p className="mb-0">
            <span className="leading-[20.8px]">{`concentrate in the `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              $120–160k
            </span>
            <span className="leading-[20.8px]">{` household band. Their strongest brand affinities are `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              Strava (2.1×)
            </span>
            <span className="leading-[20.8px]">{`, `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              lululemon (1.9×)
            </span>
          </p>
          <p>
            <span className="leading-[20.8px]">{`and `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[20.8px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              On Running (1.8×)
            </span>
            <span className="leading-[20.8px]">.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[18px] whitespace-nowrap">
        <p className="leading-[27px]">612k</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">People</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="relative self-stretch shrink-0 flex-1" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container49 />
        <Container50 />
      </div>
    </div>
  );
}

function Background12() {
  return (
    <div className="absolute bg-[#e7f3ec] content-stretch flex items-center left-[37.97px] px-[6px] py-[2px] rounded-[999px] top-[6px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#2f7d4f] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">▲ +0.2×</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] left-0 text-[#6b3c72] text-[18px] top-[13px] w-[32.199px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[27px]">1.8×</p>
      </div>
      <Background12 />
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Index vs metro</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="relative self-stretch shrink-0 flex-1" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container52 />
        <Container53 />
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[18px] whitespace-nowrap">
        <p className="leading-[27px]">$48</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Avg basket</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="relative self-stretch shrink-0 flex-1" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container55 />
        <Container56 />
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[18px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[27px]">1.9×</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[10px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Sports nutrition</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="relative self-stretch shrink-0 flex-1" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container58 />
        <Container59 />
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[#bebde7] border-dashed border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between gap-[0px_40px] pt-[20px] pb-[4px] relative w-full">
        <Container48 />
        <Container51 />
        <Container54 />
        <Container57 />
      </div>
    </div>
  );
}

function Svg14() {
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

function Container61() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[73.45px]" data-name="Container">
      <Svg14 />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-[19px] not-italic text-[#6b3c72] text-[11px] top-[calc(50%-0.75px)] w-[55.162px]">
        <p className="leading-[16.5px]">Regenerate</p>
      </div>
    </div>
  );
}

function Svg15() {
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

function Container62() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[94.27px]" data-name="Container">
      <Svg15 />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-[19px] not-italic text-[#6b3c72] text-[11px] top-[calc(50%-0.75px)] w-[76.112px]">
        <p className="leading-[16.5px]">Ask a follow-up</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14px] items-center pt-[14px] relative size-full">
        <Container61 />
        <Container62 />
      </div>
    </div>
  );
}

function AiKeyTakeawayHero() {
  return (
    <div className="bg-gradient-to-b from-[#f7f1ff] relative rounded-[14px] shrink-0 to-[#fbfaff] w-full" data-name="AI KEY TAKEAWAY HERO">
      <div aria-hidden className="absolute border border-[#bebde7] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-[24px] pt-[33px] px-[21px] relative size-full">
        <Container43 />
        <Container46 />
        <Container47 />
        <HorizontalBorder1 />
        <Container60 />
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">{`Demographics & occupation`}</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap">
        <p className="leading-[16.5px]">Indexed vs metro</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[168px]" data-name="Container">
      <Container66 />
      <Container67 />
    </div>
  );
}

function Container64() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container65 />
      </div>
    </div>
  );
}

function Container69() {
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

function Container70() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[18px] w-full" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[27px]">25–44</p>
        </div>
      </div>
    </div>
  );
}

function Background13() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[7px] py-[2px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[15px]">1.4×</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder20() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative rounded-[10px] row-1 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[2px] items-start p-[11px] relative size-full">
        <Container69 />
        <Container70 />
        <Background13 />
      </div>
    </div>
  );
}

function Container71() {
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

function Container72() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[18px] w-full">
          <p className="leading-[27px]">54%</p>
        </div>
      </div>
    </div>
  );
}

function Background14() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[7px] py-[2px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[15px]">1.1×</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder21() {
  return (
    <div className="bg-white col-2 justify-self-stretch relative rounded-[10px] row-1 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[2px] items-start p-[11px] relative size-full">
        <Container71 />
        <Container72 />
        <Background14 />
      </div>
    </div>
  );
}

function Container73() {
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

function Container74() {
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

function Background15() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[7px] py-[2px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[15px]">1.4×</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder22() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative rounded-[10px] row-2 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[2px] items-start p-[11px] relative size-full">
        <Container73 />
        <Container74 />
        <Background15 />
      </div>
    </div>
  );
}

function Container75() {
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

function Container76() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] w-full">
          <p className="leading-[21px]">Parents 47%</p>
        </div>
      </div>
    </div>
  );
}

function Background16() {
  return (
    <div className="bg-[#f1e9ff] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[7px] py-[2px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[15px]">1.6×</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder23() {
  return (
    <div className="bg-white col-2 justify-self-stretch relative rounded-[10px] row-2 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[2px] items-start p-[11px] relative size-full">
        <Container75 />
        <Container76 />
        <Background16 />
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="h-[182px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[10px] gap-y-[10px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__89px_83px] relative size-full">
        <BackgroundBorder20 />
        <BackgroundBorder21 />
        <BackgroundBorder22 />
        <BackgroundBorder23 />
      </div>
    </div>
  );
}

function Demographics() {
  return (
    <div className="bg-[#fafaf8] col-1 justify-self-stretch relative rounded-[14px] row-1 self-start shrink-0" data-name="Demographics">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[17px] relative size-full">
        <Container64 />
        <Container68 />
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">{`Income & affluence`}</p>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap">
        <p className="leading-[16.5px]">HH-income bands vs benchmark</p>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[148px]" data-name="Container">
      <Container79 />
      <Container80 />
    </div>
  );
}

function Container77() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container78 />
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">{`<$60k`}</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">0.7×</p>
      </div>
    </div>
  );
}

function Background17() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_76%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container81() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[10px] gap-y-[10px] grid grid-cols-[___74px_minmax(0,1fr)_44px] grid-rows-[_18px] pt-[3px] relative size-full">
        <Container82 />
        <Container83 />
        <Background17 />
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">$60–120k</p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.0×</p>
      </div>
    </div>
  );
}

function Background18() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_42%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container84() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[10px] gap-y-[10px] grid grid-cols-[___74px_minmax(0,1fr)_44px] grid-rows-[_18px] relative size-full">
        <Container85 />
        <Container86 />
        <Background18 />
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">$120–160k</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.3×</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container90 />
    </div>
  );
}

function Background19() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#6b3c72] inset-[0_10%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container87() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[10px] gap-y-[10px] grid grid-cols-[___74px_minmax(0,1fr)_44px] grid-rows-[_18px] relative size-full">
        <Container88 />
        <Container89 />
        <Background19 />
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">$160k+</p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.2×</p>
      </div>
    </div>
  );
}

function Background20() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_38%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container91() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[10px] gap-y-[10px] grid grid-cols-[___74px_minmax(0,1fr)_44px] grid-rows-[_18px] relative size-full">
        <Container92 />
        <Container93 />
        <Background20 />
      </div>
    </div>
  );
}

function Income() {
  return (
    <div className="bg-[#fafaf8] col-2 justify-self-stretch relative rounded-[14px] row-1 self-start shrink-0" data-name="Income">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[9px] items-start pb-[100px] pt-[17px] px-[17px] relative size-full">
        <Container77 />
        <Container81 />
        <Container84 />
        <Container87 />
        <Container91 />
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">Lifestage mix</p>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap">
        <p className="leading-[16.5px]">Helix-style segments</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[99px]" data-name="Container">
      <Container96 />
      <Container97 />
    </div>
  );
}

function Container94() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container95 />
      </div>
    </div>
  );
}

function Background21() {
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

function Background22() {
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

function Background23() {
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

function Background24() {
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
        <Background21 />
        <Background22 />
        <Background23 />
        <Background24 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
    </div>
  );
}

function Container99() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute bg-[#6b3c72] left-0 rounded-[3px] size-[9px] top-[4.12px]" data-name="Background" />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] left-[14px] text-[#6b6b6b] text-[11px] top-[7.5px] w-[125.195px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">Establishing Families · 1.8×</p>
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute bg-[#bebde7] left-0 rounded-[3px] size-[9px] top-[4.12px]" data-name="Background" />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] left-[14px] text-[#6b6b6b] text-[11px] top-[7.5px] w-[145.115px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">Aspirational Young Pros · 1.5×</p>
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute bg-[#cdb6d2] left-0 rounded-[3px] size-[9px] top-[4.12px]" data-name="Background" />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] left-[14px] text-[#6b6b6b] text-[11px] top-[7.5px] w-[116.18px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">Independent Youth · 1.1×</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[5px] items-start relative size-full">
        <Container99 />
        <Container100 />
        <Container101 />
      </div>
    </div>
  );
}

function Lifestage() {
  return (
    <div className="bg-[#fafaf8] col-3 justify-self-stretch relative rounded-[14px] row-1 self-start shrink-0" data-name="Lifestage">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[10px] items-start pb-[107.5px] pt-[17px] px-[17px] relative size-full">
        <Container94 />
        <Border1 />
        <Container98 />
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_267.50px] h-[281.5px] pt-[14px] relative shrink-0 w-full" data-name="Container">
      <Demographics />
      <Income />
      <Lifestage />
    </div>
  );
}

function Container105() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">Top segments by index</p>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">Leading buyergraphic segments · vs metro baseline</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[242px]" data-name="Container">
      <Container105 />
      <Container106 />
    </div>
  );
}

function Svg16() {
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

function BackgroundBorder24() {
  return (
    <div className="bg-[#f1e9ff] content-stretch flex gap-[5px] h-[24px] items-center pb-[5px] pt-[4px] px-[10px] relative rounded-[7px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#bebde7] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg16 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[10px] tracking-[0.2px] whitespace-nowrap">
        <p className="leading-[15px]">Ask</p>
      </div>
    </div>
  );
}

function Background25() {
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

function Svg17() {
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

function Container108() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center pb-[4.5px] pt-[3.5px] px-[9px] relative size-full">
          <Svg17 />
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
        <Background25 />
        <Container108 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[4px] relative shrink-0" data-name="Margin">
      <Border2 />
    </div>
  );
}

function Svg18() {
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

function BackgroundBorder25() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg18 />
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

function BackgroundBorder26() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg19 />
    </div>
  );
}

function Container107() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <BackgroundBorder24 />
      <Margin4 />
      <BackgroundBorder25 />
      <BackgroundBorder26 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="flex-[1_0_0] min-w-[236.3300018310547px] relative" data-name="Margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[469.781px] relative size-full">
          <Container107 />
        </div>
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.999px] items-start relative size-full">
        <Container104 />
        <Margin3 />
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

function Container110() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg20 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[9px] tracking-[1.08px] uppercase whitespace-nowrap">
        <p className="leading-[13.5px]">Takeaway</p>
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6px] relative size-full">
        <Container110 />
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] w-full" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[18.6px] mb-0">The four leading segments are all health-</p>
          <p className="mb-0">
            <span className="leading-[18.6px]">{`related: `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[18.6px] text-[#6b3c72]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              Frequent Fitness Shoppers
            </span>
          </p>
          <p className="mb-0">
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[18.6px] text-[#6b3c72]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              (1.7×)
            </span>
            <span className="leading-[18.6px]">{`, `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[18.6px] text-[#6b3c72]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              Health Food Buyers (1.7×)
            </span>
            <span className="leading-[18.6px]">{` and`}</span>
          </p>
          <p className="mb-0">
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[18.6px] text-[#6b3c72]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              Activewear Shoppers (1.6×)
            </span>
            <span className="leading-[18.6px]">{` over-index`}</span>
          </p>
          <p className="leading-[18.6px] mb-0">together. Frequent Fitness Shoppers</p>
          <p className="leading-[18.6px] mb-0">rose versus last quarter; Premium Coffee</p>
          <p className="mb-0">
            <span className="leading-[18.6px]">{`Drinkers fell. `}</span>
            <span className="leading-[18.6px] text-[#9a9a9a]">Dotted mark = previous</span>
          </p>
          <p className="leading-[18.6px] text-[#9a9a9a]">quarter.</p>
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
          <Margin5 />
          <Container111 />
        </div>
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Frequent Fitness Shoppers</p>
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.7×</p>
      </div>
    </div>
  );
}

function Background26() {
  return (
    <div className="bg-[#e7f3ec] content-stretch flex items-center justify-end px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#2f7d4f] text-[10px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">▲</p>
      </div>
    </div>
  );
}

function Container115() {
  return (
    <div className="col-3 content-stretch flex gap-[5px] h-[19px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container116 />
      <Background26 />
    </div>
  );
}

function Background27() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#6b3c72] inset-[0_4%_0_0] rounded-[6px]" data-name="Background" />
      <div className="absolute bg-[#9a9a9a] inset-[0_11.54%_0_88%] opacity-65 rounded-[2px]" data-name="Vertical Divider" />
    </div>
  );
}

function Container113() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___150px_minmax(0,1fr)_84px] grid-rows-[_19px] h-[19px] relative shrink-0 w-full" data-name="Container">
      <Container114 />
      <Container115 />
      <Background27 />
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container113 />
    </div>
  );
}

function Container118() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Health Food Buyers</p>
      </div>
    </div>
  );
}

function Container120() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.7×</p>
      </div>
    </div>
  );
}

function Background28() {
  return (
    <div className="bg-[#e7f3ec] content-stretch flex items-center justify-end px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#2f7d4f] text-[10px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">▲</p>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="col-3 content-stretch flex gap-[5px] h-[19px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container120 />
      <Background28 />
    </div>
  );
}

function Background29() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#6b3c72] inset-[0_7%_0_0] rounded-[6px]" data-name="Background" />
      <div className="absolute bg-[#9a9a9a] inset-[0_9.54%_0_90%] opacity-65 rounded-[2px]" data-name="Vertical Divider" />
    </div>
  );
}

function Container117() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___150px_minmax(0,1fr)_84px] grid-rows-[_19px] h-[19px] relative shrink-0 w-full" data-name="Container">
      <Container118 />
      <Container119 />
      <Background29 />
    </div>
  );
}

function Margin7() {
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
        <p className="leading-[18px]">Activewear Shoppers</p>
      </div>
    </div>
  );
}

function Container124() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.6×</p>
      </div>
    </div>
  );
}

function Background30() {
  return (
    <div className="bg-[#f3f3f1] content-stretch flex items-center justify-end px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[10px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">–</p>
      </div>
    </div>
  );
}

function Container123() {
  return (
    <div className="col-3 content-stretch flex gap-[5px] h-[19px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container124 />
      <Background30 />
    </div>
  );
}

function Background31() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_12%_0_0] rounded-[6px]" data-name="Background" />
      <div className="absolute bg-[#9a9a9a] inset-[0_13.54%_0_86%] opacity-65 rounded-[2px]" data-name="Vertical Divider" />
    </div>
  );
}

function Container121() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___150px_minmax(0,1fr)_84px] grid-rows-[_19px] h-[19px] relative shrink-0 w-full" data-name="Container">
      <Container122 />
      <Container123 />
      <Background31 />
    </div>
  );
}

function Margin8() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container121 />
    </div>
  );
}

function Container126() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Premium Coffee Drinkers</p>
      </div>
    </div>
  );
}

function Container128() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.5×</p>
      </div>
    </div>
  );
}

function Background32() {
  return (
    <div className="bg-[#f6ece2] content-stretch flex items-center justify-end px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#a65a2e] text-[10px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[15px]">▼</p>
      </div>
    </div>
  );
}

function Container127() {
  return (
    <div className="col-3 content-stretch flex gap-[4.99px] h-[19px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container128 />
      <Background32 />
    </div>
  );
}

function Background33() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_21%_0_0] rounded-[6px]" data-name="Background" />
      <div className="absolute bg-[#9a9a9a] inset-[0_16.54%_0_83%] opacity-65 rounded-[2px]" data-name="Vertical Divider" />
    </div>
  );
}

function Container125() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___150px_minmax(0,1fr)_84px] grid-rows-[_19px] h-[19px] relative shrink-0 w-full" data-name="Container">
      <Container126 />
      <Container127 />
      <Background33 />
    </div>
  );
}

function Margin9() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container125 />
    </div>
  );
}

function Container112() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-center justify-self-stretch pb-[39.63px] pt-[39.62px] relative row-1 self-start shrink-0" data-name="Container">
      <Margin6 />
      <Margin7 />
      <Margin8 />
      <Margin9 />
    </div>
  );
}

function Container109() {
  return (
    <div className="h-[191.25px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[16px] gap-y-[16px] grid grid-cols-[__250px_minmax(0,1fr)] grid-rows-[_191.25px] relative size-full">
        <BackgroundVerticalBorder />
        <Container112 />
      </div>
    </div>
  );
}

function TopSegments() {
  return (
    <div className="bg-white col-[1/span_2] justify-self-stretch relative rounded-[14px] row-1 self-start shrink-0" data-name="Top segments">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[17px] relative size-full">
        <Container103 />
        <Container109 />
      </div>
    </div>
  );
}

function Background34() {
  return (
    <div className="absolute bg-[#f1e9ff] h-[11px] left-[121.83px] rounded-[5px] top-[5.22px] w-[87.09px]" data-name="Background">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-[6px] not-italic text-[#6b3c72] text-[9px] top-[5.5px] tracking-[0.36px] w-[75.118px]">
        <p className="leading-[13.5px]">TRANSACTIONAL</p>
      </div>
    </div>
  );
}

function Container131() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#1a1a1a] text-[14px] top-[10px] w-[114.107px]">
        <p className="leading-[21px]">{`Purchase patterns `}</p>
      </div>
      <Background34 />
    </div>
  );
}

function Container132() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">What they buy · category spend indexed</p>
      </div>
    </div>
  );
}

function Container130() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start min-w-[208.9199981689453px] relative shrink-0 w-[208.92px]" data-name="Container">
      <Container131 />
      <Container132 />
    </div>
  );
}

function Svg21() {
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

function BackgroundBorder27() {
  return (
    <div className="bg-[#f1e9ff] content-stretch flex gap-[5px] h-[24px] items-center pb-[5px] pt-[4px] px-[10px] relative rounded-[7px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#bebde7] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg21 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[10px] tracking-[0.2px] whitespace-nowrap">
        <p className="leading-[15px]">Ask</p>
      </div>
    </div>
  );
}

function Svg22() {
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

function BackgroundBorder28() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg22 />
    </div>
  );
}

function Svg23() {
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

function BackgroundBorder29() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg23 />
    </div>
  );
}

function Container133() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <BackgroundBorder27 />
      <BackgroundBorder28 />
      <BackgroundBorder29 />
    </div>
  );
}

function Margin10() {
  return (
    <div className="flex-[1_0_0] min-w-[109.37999725341797px] relative" data-name="Margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[629.703px] relative size-full">
          <Container133 />
        </div>
      </div>
    </div>
  );
}

function Container129() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8.007px] items-start relative size-full">
        <Container130 />
        <Margin10 />
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

function Container135() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg24 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[9px] tracking-[1.08px] uppercase whitespace-nowrap">
        <p className="leading-[13.5px]">Takeaway</p>
      </div>
    </div>
  );
}

function Margin11() {
  return (
    <div className="mb-[-0.61px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6px] relative size-full">
        <Container135 />
      </div>
    </div>
  );
}

function Container136() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] w-full" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="mb-0">
            <span className="leading-[18.6px]">Sports nutrition (1.9×)</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[18.6px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{` and `}</span>
            <span className="leading-[18.6px]">athleisure</span>
          </p>
          <p className="mb-0">
            <span className="leading-[18.6px]">(1.8×)</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[18.6px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{` lead category card spend. Average`}</span>
          </p>
          <p className="mb-0">
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[18.6px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{`basket is `}</span>
            <span className="leading-[18.6px]">$48</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[18.6px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{`, split `}</span>
            <span className="leading-[18.6px]">64% in-store / 36%</span>
          </p>
          <p>
            <span className="leading-[18.6px]">online</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[18.6px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
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
          <Margin11 />
          <Container136 />
        </div>
      </div>
    </div>
  );
}

function Container139() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">{`Sports nutrition & supps`}</p>
      </div>
    </div>
  );
}

function Container141() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.9×</p>
      </div>
    </div>
  );
}

function Container140() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container141 />
    </div>
  );
}

function Background35() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#6b3c72] inset-[0_4%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container138() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___160px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container139 />
      <Container140 />
      <Background35 />
    </div>
  );
}

function Margin12() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container138 />
    </div>
  );
}

function Container143() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">{`Athleisure & footwear`}</p>
      </div>
    </div>
  );
}

function Container145() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.8×</p>
      </div>
    </div>
  );
}

function Container144() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container145 />
    </div>
  );
}

function Background36() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#6b3c72] inset-[0_10%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container142() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___160px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container143 />
      <Container144 />
      <Background36 />
    </div>
  );
}

function Margin13() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container142 />
    </div>
  );
}

function Container147() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">{`Specialty coffee & cafés`}</p>
      </div>
    </div>
  );
}

function Container149() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.6×</p>
      </div>
    </div>
  );
}

function Container148() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container149 />
    </div>
  );
}

function Background37() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_18%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container146() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___160px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container147 />
      <Container148 />
      <Background37 />
    </div>
  );
}

function Margin14() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container146 />
    </div>
  );
}

function Container151() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">{`Health & organic grocery`}</p>
      </div>
    </div>
  );
}

function Container153() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.5×</p>
      </div>
    </div>
  );
}

function Container152() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container153 />
    </div>
  );
}

function Background38() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_24%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container150() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___160px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container151 />
      <Container152 />
      <Background38 />
    </div>
  );
}

function Margin15() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container150 />
    </div>
  );
}

function Container155() {
  return (
    <div className="relative self-stretch shrink-0 w-[76.31px]" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#6b6b6b] text-[11px] top-[7.5px] w-[77.114px]">
        <p>
          <span className="leading-[16.5px]">{`Avg basket `}</span>
          <span className="[word-break:break-word] font-['Jua:Regular',sans-serif] leading-[16.5px] not-italic text-[#1a1a1a]">$48</span>
        </p>
      </div>
    </div>
  );
}

function Container156() {
  return (
    <div className="relative self-stretch shrink-0 w-[128.28px]" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] left-0 text-[#6b6b6b] text-[11px] top-[7.5px] w-[128.101px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">In-store 64% · Online 36%</p>
      </div>
    </div>
  );
}

function Container154() {
  return (
    <div className="content-stretch flex flex-wrap gap-[0px_10px] h-[16.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container155 />
      <Container156 />
    </div>
  );
}

function Margin16() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container154 />
    </div>
  );
}

function Container137() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-center justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <Margin12 />
      <Margin13 />
      <Margin14 />
      <Margin15 />
      <Margin16 />
    </div>
  );
}

function Container134() {
  return (
    <div className="h-[128.5px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[16px] gap-y-[16px] grid grid-cols-[__250px_minmax(0,1fr)] grid-rows-[_128.50px] relative size-full">
        <BackgroundVerticalBorder1 />
        <Container137 />
      </div>
    </div>
  );
}

function PurchasePatterns() {
  return (
    <div className="bg-white col-[1/span_2] justify-self-stretch relative rounded-[14px] row-2 self-start shrink-0" data-name="Purchase patterns">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[17px] relative size-full">
        <Container129 />
        <Container134 />
      </div>
    </div>
  );
}

function Background39() {
  return (
    <div className="absolute bg-[#f1e9ff] h-[11px] left-[171.83px] rounded-[5px] top-[5.22px] w-[73.34px]" data-name="Background">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-[6px] not-italic text-[#6b3c72] text-[9px] top-[5.5px] tracking-[0.36px] w-[61.197px]">
        <p className="leading-[13.5px]">BEHAVIOURAL</p>
      </div>
    </div>
  );
}

function Container159() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#1a1a1a] text-[14px] top-[10px] w-[164.146px]">
        <p className="leading-[21px]">{`Weekend & lifestyle signals `}</p>
      </div>
      <Background39 />
    </div>
  );
}

function Container160() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[16.5px]">What they do outside work · venue visitation</p>
      </div>
    </div>
  );
}

function Container158() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start min-w-[245.1699981689453px] relative shrink-0 w-[245.17px]" data-name="Container">
      <Container159 />
      <Container160 />
    </div>
  );
}

function Svg25() {
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

function BackgroundBorder30() {
  return (
    <div className="bg-[#f1e9ff] content-stretch flex gap-[5px] h-[24px] items-center pb-[5px] pt-[4px] px-[10px] relative rounded-[7px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#bebde7] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg25 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[10px] tracking-[0.2px] whitespace-nowrap">
        <p className="leading-[15px]">Ask</p>
      </div>
    </div>
  );
}

function Svg26() {
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

function BackgroundBorder31() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg26 />
    </div>
  );
}

function Svg27() {
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

function BackgroundBorder32() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg27 />
    </div>
  );
}

function Container161() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <BackgroundBorder30 />
      <BackgroundBorder31 />
      <BackgroundBorder32 />
    </div>
  );
}

function Margin17() {
  return (
    <div className="flex-[1_0_0] min-w-[109.37999725341797px] relative" data-name="Margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[593.453px] relative size-full">
          <Container161 />
        </div>
      </div>
    </div>
  );
}

function Container157() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8.007px] items-start relative size-full">
        <Container158 />
        <Margin17 />
      </div>
    </div>
  );
}

function Svg28() {
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

function Container163() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg28 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[9px] tracking-[1.08px] uppercase whitespace-nowrap">
        <p className="leading-[13.5px]">Takeaway</p>
      </div>
    </div>
  );
}

function Margin18() {
  return (
    <div className="mb-[-0.61px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6px] relative size-full">
        <Container163 />
      </div>
    </div>
  );
}

function Container164() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] w-full" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="mb-0">
            <span className="leading-[18.6px]">{`parkrun & run events`}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[18.6px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{` over-index highest`}</span>
          </p>
          <p className="mb-0">
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[18.6px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{`at `}</span>
            <span className="leading-[18.6px]">2.1×</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[18.6px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>{`, ahead of brunch & cafés (1.7×),`}</span>
          </p>
          <p className="leading-[18.6px] mb-0 text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
            farmers markets (1.5×) and boutique gyms
          </p>
          <p className="leading-[18.6px] text-[#1a1a1a]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
            / pilates (1.5×).
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
          <Margin18 />
          <Container164 />
        </div>
      </div>
    </div>
  );
}

function Container167() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">parkrun / run events</p>
      </div>
    </div>
  );
}

function Container169() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">2.1×</p>
      </div>
    </div>
  );
}

function Container168() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container169 />
    </div>
  );
}

function Background40() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#6b3c72] inset-[0_2%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container166() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___160px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container167 />
      <Container168 />
      <Background40 />
    </div>
  );
}

function Margin19() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container166 />
    </div>
  );
}

function Container171() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">{`Brunch & cafés`}</p>
      </div>
    </div>
  );
}

function Container173() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.7×</p>
      </div>
    </div>
  );
}

function Container172() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container173 />
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

function Container170() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___160px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container171 />
      <Container172 />
      <Background41 />
    </div>
  );
}

function Margin20() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container170 />
    </div>
  );
}

function Container175() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Farmers markets</p>
      </div>
    </div>
  );
}

function Container177() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.5×</p>
      </div>
    </div>
  );
}

function Container176() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container177 />
    </div>
  );
}

function Background42() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_28%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container174() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___160px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container175 />
      <Container176 />
      <Background42 />
    </div>
  );
}

function Margin21() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container174 />
    </div>
  );
}

function Container179() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Boutique gyms / pilates</p>
      </div>
    </div>
  );
}

function Container181() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.5×</p>
      </div>
    </div>
  );
}

function Container180() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container181 />
    </div>
  );
}

function Background43() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_32%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container178() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___160px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container179 />
      <Container180 />
      <Background43 />
    </div>
  );
}

function Margin22() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Margin">
      <Container178 />
    </div>
  );
}

function Container165() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-center justify-self-stretch py-[4.44px] relative row-1 self-start shrink-0" data-name="Container">
      <Margin19 />
      <Margin20 />
      <Margin21 />
      <Margin22 />
    </div>
  );
}

function Container162() {
  return (
    <div className="h-[116.88px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[16px] gap-y-[16px] grid grid-cols-[__250px_minmax(0,1fr)] grid-rows-[_116.88px] relative size-full">
        <BackgroundVerticalBorder2 />
        <Container165 />
      </div>
    </div>
  );
}

function WeekendLifestyle() {
  return (
    <div className="bg-white col-[1/span_2] justify-self-stretch relative rounded-[14px] row-3 self-start shrink-0" data-name="Weekend & lifestyle">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[17px] relative size-full">
        <Container157 />
        <Container162 />
      </div>
    </div>
  );
}

function Container184() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">{`Interests & brand affinity`}</p>
      </div>
    </div>
  );
}

function Container185() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9a] text-[11px] whitespace-nowrap">
        <p className="leading-[16.5px]">{`Categories & brands they over-index for`}</p>
      </div>
    </div>
  );
}

function Container183() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[198px]" data-name="Container">
      <Container184 />
      <Container185 />
    </div>
  );
}

function Svg29() {
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

function BackgroundBorder33() {
  return (
    <div className="bg-[#f1e9ff] content-stretch flex gap-[5px] h-[24px] items-center pb-[5px] pt-[4px] px-[10px] relative rounded-[7px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#bebde7] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg29 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[10px] tracking-[0.2px] whitespace-nowrap">
        <p className="leading-[15px]">Ask</p>
      </div>
    </div>
  );
}

function Svg30() {
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

function BackgroundBorder34() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg30 />
    </div>
  );
}

function Svg31() {
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

function BackgroundBorder35() {
  return (
    <div className="bg-[#fafaf8] content-stretch flex items-center justify-center p-px relative rounded-[7px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Svg31 />
    </div>
  );
}

function Container186() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <BackgroundBorder33 />
      <BackgroundBorder34 />
      <BackgroundBorder35 />
    </div>
  );
}

function Margin23() {
  return (
    <div className="flex-[1_0_0] min-w-[109.37999725341797px] relative" data-name="Margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[640.766px] relative size-full">
          <Container186 />
        </div>
      </div>
    </div>
  );
}

function Container182() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8.004px] items-start relative size-full">
        <Container183 />
        <Margin23 />
      </div>
    </div>
  );
}

function Svg32() {
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

function Container188() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg32 />
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b3c72] text-[9px] tracking-[1.08px] uppercase whitespace-nowrap">
        <p className="leading-[13.5px]">Takeaway</p>
      </div>
    </div>
  );
}

function Margin24() {
  return (
    <div className="mb-[-0.61px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6px] relative size-full">
        <Container188 />
      </div>
    </div>
  );
}

function Container189() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[12px] w-full" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          <p className="leading-[18.6px] mb-0">Affinity is strongest for performance</p>
          <p className="mb-0">
            <span className="leading-[18.6px]">{`brands — `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[18.6px] text-[#6b3c72]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              Strava (2.1×)
            </span>
            <span className="leading-[18.6px]">{`, `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[18.6px] text-[#6b3c72]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              lululemon (1.9×)
            </span>
            <span className="leading-[18.6px]">,</span>
          </p>
          <p className="mb-0">
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[18.6px] text-[#6b3c72]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              On Running (1.8×)
            </span>
            <span className="leading-[18.6px]">{` and `}</span>
            <span className="[word-break:break-word] font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[18.6px] text-[#6b3c72]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
              HOKA (1.7×)
            </span>
            <span className="leading-[18.6px]">{` all`}</span>
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
          <Margin24 />
          <Container189 />
        </div>
      </div>
    </div>
  );
}

function Container193() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Strava</p>
      </div>
    </div>
  );
}

function Container195() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">2.1×</p>
      </div>
    </div>
  );
}

function Container194() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container195 />
    </div>
  );
}

function Background44() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#6b3c72] inset-[0_2.01%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container192() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___110px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container193 />
      <Container194 />
      <Background44 />
    </div>
  );
}

function Margin25() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch pb-[9px] relative row-1 self-start shrink-0" data-name="Margin">
      <Container192 />
    </div>
  );
}

function Container197() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">On Running</p>
      </div>
    </div>
  );
}

function Container199() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.8×</p>
      </div>
    </div>
  );
}

function Container198() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container199 />
    </div>
  );
}

function Background45() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_16.01%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container196() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___110px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container197 />
      <Container198 />
      <Background45 />
    </div>
  );
}

function Margin26() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch pb-[9px] relative row-1 self-start shrink-0" data-name="Margin">
      <Container196 />
    </div>
  );
}

function Container201() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">lululemon</p>
      </div>
    </div>
  );
}

function Container203() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.9×</p>
      </div>
    </div>
  );
}

function Container202() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container203 />
    </div>
  );
}

function Background46() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#6b3c72] inset-[0_10.01%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container200() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___110px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container201 />
      <Container202 />
      <Background46 />
    </div>
  );
}

function Margin27() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch pb-[9px] relative row-2 self-start shrink-0" data-name="Margin">
      <Container200 />
    </div>
  );
}

function Container205() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip relative row-1 self-center shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">HOKA</p>
      </div>
    </div>
  );
}

function Container207() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Jua:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#6b3c72] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[18px]">1.7×</p>
      </div>
    </div>
  );
}

function Container206() {
  return (
    <div className="col-3 content-stretch flex h-[18px] items-center justify-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Container207 />
    </div>
  );
}

function Background47() {
  return (
    <div className="bg-[#f3f3f1] col-2 h-[16px] justify-self-stretch overflow-clip relative rounded-[6px] row-1 self-center shrink-0" data-name="Background">
      <div className="absolute bg-[#bebde7] inset-[0_20%_0_0] rounded-[6px]" data-name="Background" />
    </div>
  );
}

function Container204() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[___110px_minmax(0,1fr)_50px] grid-rows-[_18px] h-[18px] relative shrink-0 w-full" data-name="Container">
      <Container205 />
      <Container206 />
      <Background47 />
    </div>
  );
}

function Margin28() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch pb-[9px] relative row-2 self-start shrink-0" data-name="Margin">
      <Container204 />
    </div>
  );
}

function Container191() {
  return (
    <div className="gap-x-[28px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__27px_27px] h-[54px] relative shrink-0 w-full" data-name="Container">
      <Margin25 />
      <Margin26 />
      <Margin27 />
      <Margin28 />
    </div>
  );
}

function Container190() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-center justify-self-stretch py-[31.44px] relative row-1 self-start shrink-0" data-name="Container">
      <Container191 />
    </div>
  );
}

function Container187() {
  return (
    <div className="h-[116.88px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[16px] gap-y-[16px] grid grid-cols-[__250px_minmax(0,1fr)] grid-rows-[_116.88px] relative size-full">
        <BackgroundVerticalBorder3 />
        <Container190 />
      </div>
    </div>
  );
}

function BrandAffinity() {
  return (
    <div className="bg-white col-[1/span_2] justify-self-stretch relative rounded-[14px] row-4 self-start shrink-0" data-name="Brand affinity">
      <div aria-hidden className="absolute border border-[#e5e5e2] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[17px] relative size-full">
        <Container182 />
        <Container187 />
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[____276.75px_214px_202.38px_202.38px] h-[960px] relative shrink-0 w-full" data-name="Container">
      <TopSegments />
      <PurchasePatterns />
      <WeekendLifestyle />
      <BrandAffinity />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <BackgroundBorder6 />
      <BackgroundBorder14 />
      <GlobalFilterBar />
      <AiKeyTakeawayHero />
      <Container63 />
      <Container102 />
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

function Margin29() {
  return <div className="h-[53px] max-w-[1280px] relative shrink-0 w-[1278.96px]" data-name="Margin" />;
}

export default function Screen1Profile() {
  return (
    <div className="content-stretch flex flex-col items-center relative size-full" data-name="SCREEN 1 — PROFILE">
      <BackgroundBorder />
      <Margin29 />
    </div>
  );
}