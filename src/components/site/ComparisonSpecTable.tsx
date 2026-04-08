export type ComparisonSpecRow = { label: string; values: string[] };

type ComparisonSpecTableProps = {
  rows: ComparisonSpecRow[];
  /**
   * 可选：首行各列标题（如型号、容量档位），使用 th scope="col"，仍置于 tbody 中。
   */
  headerRow?: { cornerLabel: string; titles: string[] };
  /** 单元格水平对齐，默认左对齐 */
  cellAlign?: "left" | "center";
  /**
   * 首列（参数名）背景：default 为更深 slate-950；slate800 为略亮的 slate-800 条带。
   */
  labelColumnStyle?: "default" | "slate800" | "slate900";
};

function labelCellClass(align: "left" | "center", variant: "default" | "slate800" | "slate900") {
  const bg =
    variant === "slate800"
      ? "bg-slate-800/95"
      : variant === "slate900"
        ? "bg-slate-900/95"
        : "bg-slate-950/95";
  const al = align === "center" ? "text-center" : "text-left";
  return `sticky left-0 z-10 w-[min(11rem,38vw)] min-w-[9.5rem] max-w-[13rem] border border-slate-700/90 ${bg} px-4 py-3.5 ${al} text-sm font-bold text-slate-100 shadow-[2px_0_8px_rgba(0,0,0,0.35)] backdrop-blur-sm`;
}

function valueCellClass(align: "left" | "center") {
  const al = align === "center" ? "text-center" : "text-left";
  return `min-w-[132px] border border-slate-700/90 px-4 py-3.5 ${al} text-sm leading-snug text-slate-300 sm:min-w-[148px]`;
}

function headerTitleCellClass(align: "left" | "center") {
  const al = align === "center" ? "text-center" : "text-left";
  return `min-w-[132px] border border-slate-700/90 bg-slate-800/85 px-4 py-3.5 ${al} text-xs font-bold uppercase tracking-wide text-solar-300 sm:min-w-[148px] sm:text-sm`;
}

/**
 * 侧边参数名 + 多列对比（无传统 thead；首列为行标签，可带可选列标题行）。
 */
export function ComparisonSpecTable({
  rows,
  headerRow,
  cellAlign = "left",
  labelColumnStyle = "default",
}: ComparisonSpecTableProps) {
  if (!rows.length) return null;

  const width = rows[0].values.length;
  const minTableWidth = Math.max(480, 168 + width * 152);

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700/80 bg-slate-900/40 shadow-inner">
      <table
        className={
          cellAlign === "center"
            ? "w-full border-collapse text-center"
            : "w-full border-collapse text-left"
        }
        style={{ minWidth: minTableWidth }}
      >
        <tbody>
          {headerRow ? (
            <tr className="bg-slate-900/60">
              <th scope="row" className={labelCellClass(cellAlign, labelColumnStyle)}>
                {headerRow.cornerLabel}
              </th>
              {headerRow.titles.map((t) => (
                <th key={t} scope="col" className={headerTitleCellClass(cellAlign)}>
                  {t}
                </th>
              ))}
            </tr>
          ) : null}
          {rows.map((row, i) => (
            <tr
              key={`${row.label}-${i}`}
              className={i % 2 === 0 ? "bg-slate-800/25" : "bg-slate-800/10"}
            >
              <th scope="row" className={labelCellClass(cellAlign, labelColumnStyle)}>
                {row.label}
              </th>
              {row.values.map((v, j) => (
                <td key={j} className={valueCellClass(cellAlign)}>
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
