import svgPaths from "./svg-mpdnar12cx";

function Frame() {
  return (
    <div className="bg-[#bdbde7] content-stretch flex gap-[4px] h-[28px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="eye">
        <div className="absolute inset-[20.84%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-5.36%_-3.75%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.334 10.3325">
              <g id="Vector">
                <path d={svgPaths.p312380c0} stroke="var(--stroke-0, #2B2A33)" strokeLinecap="round" strokeLinejoin="round" />
                <path d={svgPaths.pc8e2e72} stroke="var(--stroke-0, #2B2A33)" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-['Geist:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#2b2a33] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">Preview</p>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-[#e2e2e2] content-stretch flex gap-[4px] h-[28px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="database">
        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector">
          <div className="absolute inset-[-3.75%_-4.17%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 14.3333">
              <path d={svgPaths.p256dd780} id="Vector" stroke="var(--stroke-0, #2B2A33)" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-['Geist:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#2b2a33] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">Data Explorer</p>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
      <Frame />
      <Frame23 />
    </div>
  );
}

function Elements() {
  return (
    <div className="absolute inset-[16.67%_4.17%]" data-name="elements">
      <div className="absolute inset-[-4.69%_-3.41%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.5001 17.5">
          <g id="elements">
            <path d={svgPaths.p15816600} id="Vector" stroke="var(--stroke-0, #4B5565)" strokeLinecap="round" strokeWidth="1.5" />
            <path d={svgPaths.pe5f8a00} id="Vector_2" stroke="var(--stroke-0, #4B5565)" strokeLinecap="round" strokeWidth="1.5" />
            <path d={svgPaths.p33f9d380} id="Vector_3" stroke="var(--stroke-0, #4B5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p3f8cce00} id="Ellipse 1381" stroke="var(--stroke-0, #4B5565)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#655d4b] text-[14px] whitespace-nowrap">Draft</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0 w-[383px]">
      <div className="relative shrink-0 size-[24px]" data-name="Audiences">
        <div className="absolute inset-0 overflow-clip" data-name="user-group">
          <Elements />
        </div>
      </div>
      <p className="[word-break:break-word] font-['Jua:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1e163c] text-[20px] whitespace-nowrap">Weekend Warrior</p>
      <div className="bg-[#fafbda] content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[4px] relative rounded-[8px] shrink-0" data-name="Pills">
        <Frame1 />
      </div>
    </div>
  );
}

function Elements1() {
  return (
    <div className="absolute inset-[18.75%_16.67%]" data-name="elements">
      <div className="absolute inset-[-5%_-4.69%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11">
          <g id="elements">
            <path d={svgPaths.p2f3a7700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p169b1280} id="Vector 7173" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ButtonContent() {
  return (
    <div className="bg-[#732d93] relative rounded-[16px] shrink-0 w-full" data-name="Button Content">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[6px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
            <Elements1 />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Save audience</p>
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame11 />
      <div className="content-stretch flex flex-col items-start py-[6px] relative shrink-0 w-[134px]" data-name="Button">
        <ButtonContent />
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame10 />
      <p className="[word-break:break-word] font-['Jua:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#686868] text-[20px] w-full">Active 25-44 health enthusiasts who are always doing outdoor or active activities on the weekends.</p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['Jua:Regular',sans-serif] items-center justify-between not-italic relative shrink-0 w-full whitespace-nowrap">
      <p className="leading-[20px] relative shrink-0 text-[#686868] text-[14px]">INDUSTRY</p>
      <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[16px] text-black">
        <p className="leading-[normal]">Consumer Goods</p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Jua:Regular',sans-serif] gap-[6px] items-start not-italic relative shrink-0 w-full">
      <p className="leading-[20px] relative shrink-0 text-[#686868] text-[14px] w-full">DEMOGRAPHIC</p>
      <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[#140934] text-[16px] w-full">
        <p className="leading-[normal]">Age: 25-44</p>
      </div>
      <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[#140934] text-[16px] w-full">
        <p className="leading-[normal]">Income: $100k+</p>
      </div>
      <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[#140934] text-[16px] w-full">
        <p className="leading-[normal]">Gender: 60% women | 40% men</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#732d93] text-[14px] whitespace-nowrap">Camping</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#732d93] text-[14px] whitespace-nowrap">Rock climbing</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#732d93] text-[14px] whitespace-nowrap">Hiking</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#732d93] text-[14px] whitespace-nowrap">Hyrox</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#732d93] text-[14px] whitespace-nowrap">Barry’s</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#732d93] text-[14px] whitespace-nowrap">Run Clubs</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#565656] text-[14px] whitespace-nowrap">+ Add</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0">
      <div className="bg-[#efe6ff] content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[4px] relative rounded-[8px] shrink-0" data-name="Pills">
        <div aria-hidden className="absolute border-0 border-[#d4ace5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Frame3 />
      </div>
      <div className="bg-[#efe6ff] content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[4px] relative rounded-[8px] shrink-0" data-name="Pills">
        <div aria-hidden className="absolute border-0 border-[#d4ace5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Frame4 />
      </div>
      <div className="bg-[#efe6ff] content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[4px] relative rounded-[8px] shrink-0" data-name="Pills">
        <div aria-hidden className="absolute border-0 border-[#d4ace5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Frame5 />
      </div>
      <div className="bg-[#efe6ff] content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[4px] relative rounded-[8px] shrink-0" data-name="Pills">
        <div aria-hidden className="absolute border-0 border-[#d4ace5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Frame6 />
      </div>
      <div className="bg-[#efe6ff] content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[4px] relative rounded-[8px] shrink-0" data-name="Pills">
        <div aria-hidden className="absolute border-0 border-[#d4ace5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Frame7 />
      </div>
      <div className="bg-[#efe6ff] content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[4px] relative rounded-[8px] shrink-0" data-name="Pills">
        <div aria-hidden className="absolute border-0 border-[#d4ace5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Frame8 />
      </div>
      <div className="bg-[#f5f5f5] content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[4px] relative rounded-[8px] shrink-0" data-name="Pills">
        <div aria-hidden className="absolute border-0 border-[#e3e8ef] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Frame2 />
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Jua:Regular',sans-serif] leading-[20px] min-w-full not-italic relative shrink-0 text-[#686868] text-[14px] w-[min-content]">INTERESTS</p>
      <Frame15 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-white h-[81px] relative rounded-[5px] shrink-0 w-full">
      <div aria-hidden className="absolute border border-[#d3d3d3] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="[word-break:break-word] content-stretch flex flex-col font-['Jua:Regular',sans-serif] gap-[9px] items-start leading-[0] not-italic pb-[17px] pl-[20px] pr-[110px] pt-[15px] relative size-full text-[16px] whitespace-nowrap">
        <div className="flex flex-col justify-center relative shrink-0 text-black">
          <p className="leading-[normal]">Social exercisers</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 text-[#7c7c7c]">
          <p className="leading-[normal]">Exercising is part of their social life.</p>
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="bg-white h-[81px] relative rounded-[5px] shrink-0 w-full">
      <div aria-hidden className="absolute border border-[#d3d3d3] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="[word-break:break-word] content-stretch flex flex-col font-['Jua:Regular',sans-serif] gap-[9px] items-start leading-[0] not-italic pb-[17px] pl-[20px] pr-[110px] pt-[15px] relative size-full text-[16px] whitespace-nowrap">
        <div className="flex flex-col justify-center relative shrink-0 text-black">
          <p className="leading-[normal]">Health conscious</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 text-[#7c7c7c]">
          <p className="leading-[normal]">Not only exercising, but they are likely to be macro counting.</p>
        </div>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Jua:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#686868] text-[14px] w-full">BEHAVIOURS</p>
      <Frame16 />
      <Frame18 />
    </div>
  );
}

function ButtonContent1() {
  return (
    <div className="bg-[#732d93] relative rounded-[16px] shrink-0 w-full" data-name="Button Content">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[6px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
            <div className="absolute inset-[12.5%]" data-name="Vector">
              <div className="absolute inset-[-2.78%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.6667 12.6667">
                  <path d={svgPaths.p2dac2d00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
                </svg>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Explore</p>
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Jua:Regular',sans-serif] leading-[20px] mr-[-87px] not-italic relative shrink-0 text-[#686868] text-[14px] w-[600px]">ESTIMATED TOTAL REACH</p>
      <div className="content-stretch flex flex-col items-start py-[6px] relative shrink-0 w-[87px]" data-name="Button">
        <ButtonContent1 />
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['Jua:Regular',sans-serif] gap-[24px] items-start leading-[20px] not-italic relative shrink-0 w-[600px] whitespace-nowrap">
      <p className="relative shrink-0 text-[36px] text-black">~870k</p>
      <p className="relative shrink-0 text-[#686868] text-[14px]">Across Australia</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame19 />
      <Frame21 />
    </div>
  );
}

export default function Frame9() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[12px] size-full">
      <Frame24 />
      <Frame12 />
      <Frame22 />
      <Frame13 />
      <Frame14 />
      <Frame17 />
      <Frame20 />
    </div>
  );
}